# LIA — A Little World of Magic

Experiencia web premium de cumpleaños para **Lia** (28 de noviembre).

No es una tarjeta convencional: es un **viaje cinematográfico vertical** — un pequeño universo de rosas, cariño y magia que se descubre escena a escena mientras se desliza.

## Dirección artística

**Identidad:** Romanticismo cinematográfico · editorial de lujo · jardín nocturno de rosas.

| Token | Valor | Uso |
| --- | --- | --- |
| Night | `#1A0A10` | Fondo principal |
| Burgundy | `#5C1227` | Profundidad, botones |
| Ruby | `#C41E3A` | Acento floral |
| Dusty rose | `#D4A5A5` | Textos suaves |
| Warm cream | `#F7F0E8` | Tipografía primaria |
| Champagne gold | `#C9A962` | Detalles preciosos |

**Tipografía**

- Display: *Cormorant Garamond*
- Script emocional: *Great Vibes*
- UI: *Outfit*

**Recursos visuales**

- Rosas, beagle, pajarito, peluchito y gatito: **ilustraciones SVG originales** creadas para esta experiencia (sin material oficial protegido).
- Fotografías personales con tratamiento editorial cálido (ver [Fotografías](#fotografías)). Para personalizar los textos alternativos, edita los `alt` en `index.html`.

## Las seis escenas

1. **Bienvenida** — rosa iluminada, partículas doradas y el texto *"Lia, hay un pequeño universo preparado para ti"*. Botón **Descubrir sorpresa**.
2. **Jardín nocturno** — capas de rosas con parallax, pétalos, luciérnagas y un recuerdo enmarcado.
3. **Rincón de cariño** — ilustraciones originales y fotografías en una composición editorial asimétrica.
4. **Carta** — sobre con sello de cera que se abre y revela un mensaje personalizado.
5. **El 28** — número monumental en degradado champagne, rosas y destellos.
6. **Celebración final** — *"FELIZ CUMPLEAÑOS, LIA"*, *"Que tu mundo siempre esté lleno de magia"*, confeti, pétalos y corazones.

## Tecnologías

- HTML5 · CSS3 · JavaScript (módulos por archivo)
- Tailwind CSS vía CDN (configuración de tema en línea)
- Sin backend, sin build
- Compatible con **GitHub Pages**

## Cómo verla

### Local

```bash
cd lia-birthday
python3 -m http.server 8080
```

Abre `http://localhost:8080`.

### GitHub Pages

1. Sube este directorio a un repositorio.
2. En Settings → Pages, publica la rama `main` desde la raíz (o `/docs` si lo mueves allí).
3. La URL será `https://<usuario>.github.io/<repo>/`.

Los paths son relativos; no requiere configuración extra. `.nojekyll` ya está incluido.

## Controles

- **Descubrir sorpresa** — inicia el recorrido desde la bienvenida
- **Scroll** — navegación libre entre escenas (no se bloquea el desplazamiento)
- **Puntos de escena** — saltar a cualquier escena (laterales en escritorio, inferiores en móvil)
- **Flechas ← / →** — escena anterior / siguiente
- **Música** — pad ambiental sintetizado con Web Audio, silencioso hasta que el usuario lo activa
- **Sobre** — abre la carta
- **Volver a vivir la magia** — reinicia el recorrido y la carta

Todo respeta `prefers-reduced-motion`.

## Música

La música es **opcional y controlada por el usuario**. Por defecto se genera un pad ambiental cálido con la Web Audio API (`js/audio.js`), sin archivos externos: no hay autoplay y la página permanece en silencio hasta pulsar el botón.

### Usar una pista MP3 (opcional)

Si prefieres una canción concreta, colócala en `assets/audio/birthday-music.mp3` y sustituye el pad por un reproductor `HTMLAudioElement`. La pista debe ser libre de derechos o de tu titularidad. Completa la atribución antes de publicar:

| Campo | Valor |
| --- | --- |
| Título de la pista | _(por completar)_ |
| Artista / autor | _(por completar)_ |
| Fuente / sitio | _(por completar)_ |
| URL de descarga | _(por completar)_ |
| Licencia | _(por completar — p. ej. CC0, CC-BY, dominio público, licencia personal)_ |

Fuentes recomendadas: [Pixabay Music](https://pixabay.com/music/), [Free Music Archive](https://freemusicarchive.org/), [YouTube Audio Library](https://studio.youtube.com/).

> `js/external-media.js` existe como módulo opcional de integración con APIs externas y **no está cargado por `index.html`**; la experiencia funciona 100 % con recursos locales.

## Estructura

```
lia-birthday/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js           · orquestación de escenas
│   ├── motion.js         · reveals, parallax, navegación
│   ├── particles.js      · polvo, luciérnagas, pétalos, confeti
│   ├── letter.js         · apertura del sobre
│   ├── audio.js          · pad ambiental (Web Audio)
│   └── external-media.js · módulo opcional no cargado
├── assets/
│   ├── svg/              · ilustraciones originales
│   └── lia/opt/          · fotografías optimizadas (WebP)
├── .nojekyll
└── README.md
```

## Fotografías

La experiencia usa **seis fotografías** (de las siete imágenes proporcionadas) con tratamiento editorial cálido, distribuidas entre las escenas:

- Jardín (`moment-02`), Rincón de cariño (`moment-01`, `moment-03`, `moment-04`) y Celebración final (`moment-05`, `moment-06`).
- **Ubicación:** `assets/lia/opt/` (WebP). Las imágenes originales se conservan en `assets/lia/` como fuente.
- **Optimización:** recompresión a WebP con Pillow, lado mayor ≤ 1100 px y calidad 78 (de ~3.7 MB a ~500 KB, −86 %).
- **Carga diferida:** `loading="lazy"`, `decoding="async"` y dimensiones explícitas.
- La imagen con marca de agua (`watermarked_img_*.webp`) no se usa, para preservar la estética premium.

## Rendimiento

- Fotografías recompresas a WebP (de ~3.7 MB a ~500 KB, −86 %).
- Carga diferida y dimensiones explícitas para evitar saltos de layout.
- Partículas en canvas pausadas cuando quedan fuera del viewport.
- Animaciones limitadas a `transform` y `opacity`.
- Sin dependencias de build ni de backend.

## Accesibilidad

- HTML semántico y enlace de salto.
- Controles con `aria-*`, navegación por teclado (incluidas flechas ← / →) y foco visible.
- Escenas con `aria-labelledby`; iconografía decorativa con `aria-hidden`.
- Movimiento reducido respetado en CSS y JavaScript.
- Contraste editorial sobre fondo nocturno.

---

Hecho con cuidado para Lia · 28 · XI
