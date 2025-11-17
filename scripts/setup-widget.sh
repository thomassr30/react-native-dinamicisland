#!/bin/bash

# Script para configurar automáticamente el Widget Extension
# Uso: npm run setup-widget

set -e

echo "🏝️ Configurando Dynamic Island Widget..."

# Verificar que estamos en un proyecto Expo
if [ ! -f "app.json" ] && [ ! -f "app.config.ts" ]; then
    echo "❌ Error: Este script debe ejecutarse desde la raíz de tu proyecto Expo"
    exit 1
fi

# Verificar que existe la carpeta ios
if [ ! -d "ios" ]; then
    echo "⚠️  No se encontró la carpeta ios. Ejecutando prebuild..."
    npx expo prebuild -p ios
fi

# Obtener el nombre del proyecto
PROJECT_NAME=$(ls ios/*.xcodeproj 2>/dev/null | head -n 1 | xargs -n 1 basename | sed 's/.xcodeproj//')

if [ -z "$PROJECT_NAME" ]; then
    echo "❌ No se pudo encontrar el proyecto Xcode"
    exit 1
fi

echo "📦 Proyecto encontrado: $PROJECT_NAME"

# Crear el directorio del Widget si no existe
WIDGET_DIR="ios/DinamicIslandWidget"
mkdir -p "$WIDGET_DIR"

echo "📝 Creando archivos del Widget..."

# Copiar archivos desde node_modules
NODE_MODULES_PATH="node_modules/react-native-dinamicisland"

if [ ! -d "$NODE_MODULES_PATH" ]; then
    echo "❌ No se encontró react-native-dinamicisland. ¿Está instalado?"
    exit 1
fi

# Copiar archivos Swift del widget
cp "$NODE_MODULES_PATH/ios/Widgets/DinamicIslandWidget.swift" "$WIDGET_DIR/"
cp "$NODE_MODULES_PATH/ios/Widgets/DinamicIslandWidgetBundle.swift" "$WIDGET_DIR/"
cp "$NODE_MODULES_PATH/ios/DinamicIslandActivityAttributes.swift" "ios/"

# Crear Info.plist para el widget
cat > "$WIDGET_DIR/Info.plist" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>$(DEVELOPMENT_LANGUAGE)</string>
    <key>CFBundleDisplayName</key>
    <string>DinamicIslandWidget</string>
    <key>CFBundleExecutable</key>
    <string>$(EXECUTABLE_NAME)</string>
    <key>CFBundleIdentifier</key>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>$(PRODUCT_NAME)</string>
    <key>CFBundlePackageType</key>
    <string>$(PRODUCT_BUNDLE_PACKAGE_TYPE)</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>NSExtension</key>
    <dict>
        <key>NSExtensionPointIdentifier</key>
        <string>com.apple.widgetkit-extension</string>
    </dict>
    <key>NSSupportsLiveActivities</key>
    <true/>
</dict>
</plist>
EOF

echo "✅ Archivos del Widget creados"
echo ""
echo "⚠️  IMPORTANTE: Aún necesitas completar estos pasos manualmente en Xcode:"
echo ""
echo "1. Abre el proyecto: open ios/$PROJECT_NAME.xcworkspace"
echo "2. File → New → Target → Widget Extension"
echo "3. Nombre: DinamicIslandWidget"
echo "4. Elimina los archivos template que crea Xcode"
echo "5. Arrastra los archivos de ios/DinamicIslandWidget/ al proyecto"
echo "6. Marca el target DinamicIslandWidget para estos archivos"
echo ""
echo "📖 Documentación completa: https://github.com/thomassr30/react-native-dinamicisland#setup"
