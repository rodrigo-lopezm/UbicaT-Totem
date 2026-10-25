# 🏛️ UPV Campus Guía & Waze Accesible · Prototipo v4

Prototipo de señalética digital inclusiva y plataforma colaborativa en tiempo real para el **Campus de Vera de la Universitat Politècnica de València (UPV)**.

Conecta tótems informativos físicos (con orientación accesible a cota cero, navegación multinivel y sensores ambientales) con una herramienta comunitaria abierta tipo Waze vinculada a las incidencias de mantenimiento (Gregal UPV).

---

## 📂 Estructura del Proyecto

El código está desacoplado siguiendo buenas prácticas de desarrollo web estándar:

```text
├── index.html         # Estructura semántica, accesibilidad y SVG vectorial
├── css/
│   └── style.css      # Variables de tema, modo solar (WCAG AAA), accesibilidad y animaciones
├── js/
│   └── app.js         # Lógica cartográfica, zoom/pan interactivo, rutas dinámicas y Waze
├── .gitignore         # Configuración de exclusión para control de versiones
└── README.md          # Documentación del proyecto
```

---

## 🚀 Despliegue en GitHub Pages

1. Sube estos archivos a tu repositorio en GitHub.
2. Ve a **Settings** > **Pages** en tu repositorio.
3. En **Source**, selecciona `Deploy from a branch` y elige la rama `main` (carpeta `/root`).
4. Haz clic en **Save**. En un par de minutos estará visible públicamente en `https://<tu-usuario>.github.io/<tu-repo>/`.

---

## ♿ Características Clave de Accesibilidad e Inclusión
- **Búsqueda por intención ("¿Vienes de visita?"):** Permite navegar sin conocer la nomenclatura técnica de los edificios de la UPV.
- **Navegación Multinivel:** Distinción clara entre accesos a Cota Cero (Planta 0) y pasarelas elevadas (Planta 1).
- **Sensor de Luz Solar:** Activa de manera automática el contraste solar (WCAG AAA) con más de 5000 lux para evitar reflejos.
- **Modo Alcance PMR:** Desplaza los controles interactivos hacia abajo para garantizar el alcance en silla de ruedas (normativa EN 301 549).
- **Modo "¿Sin móvil?":** Muestra tres referencias visuales y simula la impresión de un ticket de orientación física sin recogida de datos personales.
