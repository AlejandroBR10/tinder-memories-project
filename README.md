# ROMantic - Tinder de Memorias Digitales

ROMantic es una aplicación web interactiva que simula una app de citas, pero en vez de personas, los "perfiles" son distintos tipos de memorias digitales (RAM, ROM, EEPROM, etc). El objetivo es aprender sobre hardware y almacenamiento de manera divertida y visual, haciendo "match" con tus memorias favoritas.

---

## Índice

- [Descripción General](#descripción-general)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Funcionalidades Principales](#funcionalidades-principales)
- [Archivos Clave](#archivos-clave)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Autores y Contacto](#autores-y-contacto)
- [Documentación Adicional](#documentación-adicional)

---

## Descripción General

ROMantic permite explorar diferentes tipos de memorias digitales a través de una interfaz moderna y responsiva. Los usuarios pueden deslizar tarjetas, ver detalles técnicos, guardar sus memorias favoritas y consultar información adicional sobre el proyecto y el equipo.

---

## Estructura de Carpetas

```
├── index.html                # Página principal (explora memorias)
├── index_Inicio.html         # Landing page de bienvenida
├── indexFavs.html            # Página de favoritos
├── index_Acerca_De.html      # Información sobre el proyecto y contacto
├── index_perfil.html         # Ejemplo de perfil tipo "usuario"
├── package.json              # Configuración de dependencias y scripts
├── public/
│   └── vite.svg              # Icono Vite (usado por el build system)
└── src/
    ├── assets/
    │   └── images/           # Imágenes de memorias, artistas, logos, etc.
    ├── memories/
    │   └── memories.json     # Base de datos de memorias (perfiles)
    ├── scripts/
    │   ├── main.js           # Lógica principal de tarjetas y swipe
    │   ├── favs.js           # Lógica de favoritos
    │   └── main_perfil.js    # Animaciones y efectos para perfil
    └── styles/
        ├── main.css          # Estilos generales y tarjetas
        ├── favs.css          # Estilos para favoritos
        ├── perfil.css        # Estilos para perfil de usuario
        ├── acercaStyle.css   # Estilos para página "Acerca de"
        └── inicio.css        # Estilos para landing page
```

---

## Instalación y Ejecución

1. **Requisitos**:  
   - Node.js y npm instalados.

2. **Instalación**:  
   Ejecuta en la raíz del proyecto:
   ```sh
   npm install
   ```

3. **Modo desarrollo**:  
   ```sh
   npm run dev
   ```
   Esto inicia el servidor local con Vite. Accede a la URL que aparece en consola.

4. **Build para producción**:  
   ```sh
   npm run build
   ```
   Los archivos finales se generan en la carpeta `dist/`.

---

## Funcionalidades Principales

- **Explorar memorias**:  
  En [index.html](index.html), desliza tarjetas para ver diferentes memorias, sus características, usos y curiosidades.

- **Favoritos**:  
  Haz "match" (❤) con una memoria para guardarla en favoritos. Consulta tus favoritos en [indexFavs.html](indexFavs.html).

- **Modal de información**:  
  Haz clic en el botón ℹ️ para ver detalles ampliados de cada memoria.

- **Perfil de usuario**:  
  [index_perfil.html](index_perfil.html) muestra un ejemplo de perfil tipo "usuario", con galería, intereses y artistas favoritos.

- **Página de inicio**:  
  [index_Inicio.html](index_Inicio.html) es la landing page con acceso a la exploración.

- **Acerca de**:  
  [index_Acerca_De.html](index_Acerca_De.html) contiene información sobre el proyecto, contacto y el equipo.

---

## Archivos Clave

- [`src/memories/memories.json`](src/memories/memories.json):  
  Base de datos de memorias digitales, con campos como nombre, características, capacidades, usos, imagen y asignado.

- [`src/scripts/main.js`](src/scripts/main.js):  
  Lógica para cargar memorias, mostrar tarjetas, swipe, animaciones y gestión de favoritos.

- [`src/scripts/favs.js`](src/scripts/favs.js):  
  Renderiza y gestiona la lista de favoritos usando localStorage.

- [`src/scripts/main_perfil.js`](src/scripts/main_perfil.js):  
  Animaciones y efectos visuales para el perfil de usuario.

- [`src/styles/`](src/styles/):  
  Carpeta con todos los estilos CSS organizados por página/funcionalidad.

---

## Tecnologías Utilizadas

- **HTML5** y **CSS3** (moderno, responsivo)
- **JavaScript** (vanilla, sin frameworks)
- **Vite** (build system y servidor de desarrollo)
- **LocalStorage** (para favoritos)
- **Imágenes y SVG** para visualización

---

## Autores y Contacto

**Equipo ROMantic (AIRA):**  
- Alan  
- Alejandro  
- Ian  
- Roberto

**Contacto:**  
- Email: [ROMantic777@outlook.com](mailto:ROMantic777@outlook.com)

**Redes sociales:**  
- Instagram: [Enlace](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vavel.com%2Fes%2Ffutbol%2F2020%2F05%2F02%2Ffc-barcelona%2F1020239-la-msn-un-tridente-de-ensueno.html&psig=AOvVaw23e7KsKhskk5_D-fVj3clf&ust=1759904771458000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPDowqe6kZADFQAAAAAdAAAAABAE)

---

## Licencia

Proyecto académico, uso libre para fines educativos.

---

## Notas

- Las imágenes y datos de memorias están en [`src/assets/images/`](src/assets/images/).
- El proyecto es completamente estático y no requiere backend.
- Los favoritos se guardan en el navegador del usuario.
- Puedes personalizar los perfiles y memorias editando los archivos correspondientes en `src/`.

---

## Documentación Adicional

### 1. Estructura de Datos de Memorias

El archivo [`src/memories/memories.json`](src/memories/memories.json) contiene objetos con la siguiente estructura:

```json
{
  "id": 1,
  "nombre": "DRAM",
  "descripcion": "Memoria de acceso aleatorio dinámico...",
  "caracteristicas": ["Volátil", "Alta velocidad", "Usada en computadoras"],
  "capacidad": "Varias capacidades disponibles",
  "usos": "Memoria principal en PCs y servidores",
  "imagen": "dram.png",
  "asignado": false
}
```
- **id**: Identificador único.
- **nombre**: Nombre de la memoria.
- **descripcion**: Breve explicación.
- **caracteristicas**: Array de características principales.
- **capacidad**: Información sobre tamaños disponibles.
- **usos**: Aplicaciones típicas.
- **imagen**: Nombre del archivo en `assets/images/`.
- **asignado**: Indica si está en favoritos.

---

### 2. Gestión de Favoritos

- Los favoritos se almacenan en `localStorage` bajo la clave `memoriasFavoritas`.
- Al hacer "match", el objeto de memoria se guarda y se puede consultar en la página de favoritos.
- Para limpiar favoritos, hay un botón en la página de favoritos que elimina la clave de `localStorage`.

---

### 3. Navegación entre Páginas

- **index_Inicio.html**: Landing page, acceso a exploración y otras secciones.
- **index.html**: Página principal, muestra tarjetas de memorias.
- **indexFavs.html**: Lista de memorias favoritas.
- **index_Acerca_De.html**: Información del proyecto y contacto.
- **index_perfil.html**: Perfil de usuario ficticio.

La navegación se realiza mediante enlaces `<a>` y botones en la interfaz.

---

### 4. Personalización y Extensión

- Puedes agregar nuevas memorias editando `memories.json` y añadiendo imágenes en `assets/images/`.
- Los estilos pueden modificarse en la carpeta `styles/` para adaptar la apariencia.
- El sistema de tarjetas puede extenderse para otros tipos de hardware o componentes.

---

### 5. Accesibilidad y Responsividad

- El diseño es responsivo y se adapta a dispositivos móviles y escritorio.
- Los botones tienen etiquetas y roles para facilitar la navegación con teclado.
- Las imágenes incluyen atributos `alt` descriptivos.

---

### 6. Buenas Prácticas

- El código JavaScript está modularizado por funcionalidad.
- Los estilos están separados por página para facilitar el mantenimiento.
- Se recomienda mantener las imágenes optimizadas para mejorar el rendimiento.

---

### 7. Preguntas Frecuentes (FAQ)

**¿Cómo agrego una nueva memoria?**  
Agrega un nuevo objeto en `memories.json` y sube la imagen correspondiente a `assets/images/`.

**¿Dónde se guardan mis favoritos?**  
En el navegador, usando `localStorage`. No se comparten entre dispositivos.

**¿Puedo usar este proyecto para otros fines?**  
Sí, es de uso libre para fines educativos y personales.

---