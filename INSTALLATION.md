# 📦 Guía de Instalación - react-native-dinamicisland

Esta guía te ayudará a instalar y configurar la librería en **5 minutos**.

## ⚡ Instalación Rápida

### 1. Instalar la librería

```bash
npm install react-native-dinamicisland
# o
yarn add react-native-dinamicisland
```

### 2. Configurar el plugin en tu app.json

```json
{
  "expo": {
    "plugins": [
      [
        "react-native-dinamicisland",
        {
          "enableLiveActivities": true
        }
      ]
    ]
  }
}
```

### 3. Hacer prebuild

```bash
npx expo prebuild -p ios --clean
```

### 4. Configurar el Widget Extension en Xcode (SOLO UNA VEZ)

Este es el único paso manual, pero solo lo haces **una vez por proyecto**:

#### A. Abrir Xcode

```bash
npx expo run:ios
# Esto abrirá Xcode automáticamente
```

O manualmente:
```bash
cd ios
open *.xcworkspace
```

#### B. Crear Widget Extension Target

1. En Xcode, ve a **File → New → Target**
2. Busca y selecciona **Widget Extension**
3. Configuración:
   - Product Name: `DinamicIslandWidget`
   - Language: Swift
   - Include Configuration Intent: ❌ **NO marcar**
4. Click **Finish**
5. Cuando pregunte "Activate scheme?", click **Cancel**

#### C. Configurar los archivos

1. **Elimina** la carpeta `DinamicIslandWidget` que creó Xcode (la que tiene archivos template)

2. Click derecho en el proyecto → **Add Files to "TuProyecto"...**

3. Navega a: `node_modules/react-native-dinamicisland/ios/Widgets/`

4. Selecciona **AMBOS archivos**:
   - ✅ `DinamicIslandWidget.swift`
   - ✅ `DinamicIslandWidgetBundle.swift`

5. **IMPORTANTE**: En el diálogo:
   - ✅ Marca **"Copy items if needed"**
   - ✅ Marca el target **"DinamicIslandWidget"** en "Add to targets"
   - Click **Add**

6. Repite el proceso para agregar `DinamicIslandActivityAttributes.swift`:
   - Click derecho → **Add Files to "TuProyecto"...**
   - Navega a: `node_modules/react-native-dinamicisland/ios/`
   - Selecciona `DinamicIslandActivityAttributes.swift`
   - **IMPORTANTE**: Marca **AMBOS targets**:
     - ✅ Tu app principal
     - ✅ DinamicIslandWidget
   - Click **Add**

#### D. Configurar Info.plist del Widget

1. En Xcode, selecciona el target **DinamicIslandWidget**
2. Ve a la pestaña **Info**
3. Busca o agrega la key: **NSSupportsLiveActivities**
4. Asegúrate que sea de tipo **Boolean** y valor **YES**

### 5. ¡Listo! 🎉

Ahora puedes usar la librería:

```typescript
import { useDynamicIslandActivity } from 'react-native-dinamicisland';

function MyComponent() {
  const { start, update, end } = useDynamicIslandActivity();

  const handleStart = async () => {
    await start({
      activityId: 'my-activity',
      title: 'Now Playing',
      subtitle: 'My Song',
      progress: 0.5
    });
  };

  return <Button title="Start" onPress={handleStart} />;
}
```

## 🔄 Actualizaciones Futuras

Después de la configuración inicial, las actualizaciones de la librería son automáticas:

```bash
npm update react-native-dinamicisland
npx expo prebuild -p ios --clean
npx expo run:ios
```

No necesitas repetir los pasos de Xcode.

## 🐛 Troubleshooting

### "Widget not found" o "No such module"

1. Verifica que el target `DinamicIslandWidget` existe
2. Asegúrate que los archivos Swift estén agregados al target correcto
3. Limpia el build: En Xcode → Product → Clean Build Folder

### "Live Activities not showing"

1. Verifica iOS 16.1+ en un dispositivo físico con Dynamic Island
2. Ajustes → Face ID y código → Activa "Live Activities"
3. Verifica que los entitlements estén configurados (el plugin lo hace automáticamente)

### "Module 'react_native_dinamicisland' not found"

```bash
cd ios
pod install
cd ..
npx expo run:ios
```

## 📚 Próximos Pasos

- Lee la [documentación completa](./README.md)
- Ve los [ejemplos de uso](./example/App.tsx)
- Revisa los [casos de uso](./README.md#-use-cases)

## 💡 ¿Por qué es necesario Xcode?

Apple requiere que los Widget Extensions sean targets separados en Xcode. No es posible crearlos automáticamente via código. Sin embargo:

- ✅ Solo lo haces **una vez por proyecto**
- ✅ El plugin configura todo lo demás automáticamente
- ✅ Actualizaciones futuras son automáticas
- ✅ Es el mismo proceso que usan todas las librerías de widgets en iOS

---

¿Problemas? [Abre un issue](https://github.com/thomassr30/react-native-dinamicisland/issues)
