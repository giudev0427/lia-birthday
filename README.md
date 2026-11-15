# LIA — A Little World of Magic

Experiencia web premium de cumpleaños para **Lia**: el **28 de noviembre de 2026** cumple **21 años**.

No es una tarjeta convencional: es un **libro digital 3D** íntimo, cinematográfico y editorial — un pequeño universo de rosas, cariño y magia que se abre página a página.

## Dirección artística

**Identidad:** Romanticismo cinematográfico · editorial de lujo · libro encantado de rosas.

| Token | Valor | Uso |
| --- | --- | --- |
| Night | `#1A0A10` | Fondo principal del universo |
| Burgundy | `#5C1227` | Terciopelo de la encuadernación, acentos |
| Ruby | `#C41E3A` | Rosas y detalles florales |
| Dusty rose | `#D4A5A5` | Textos suaves |
| Warm cream | `#F7F0E8` | Papel artesanal y tipografía primaria |
| Champagne gold | `#C9A962` | Marcos dorados, sellos y detalles preciosos |

**Tipografía**

- Display: *Cormorant Garamond*
- Script emocional: *Great Vibes*
- UI: *Outfit*

**Recursos visuales**

- Rosas ilustradas, Snoopy y rosas reales acompañan la experiencia; la galería de Lia conserva sus fotografías optimizadas.
- Fotografías personales de Lia con marcos editoriales y optimización WebP.

## Experiencia del Libro

1. **Portada cerrada (3D)** — encuadernación en terciopelo noche y burdeos con marco de oro, rosa central con animación de respiración y botón **Abrir el libro**.
2. **Apertura cinematográfica** — la tapa gira en perspectiva 3D revelando el spread a doble página.
3. **Hoja izquierda** — dedicatoria poética *«Para Lia — Un pequeño universo»* con rosa floreciente.
4. **Capítulo I · Jardín nocturno** — rosas rojas, lluvia de pétalos flotantes, cita emocional, recuerdo enmarcado (`moment-02.webp`) y cinco enlaces de búsqueda en Spotify: «Por Ti» (3AM), «San Cipriano» (La Santa), «EL CIELO» (Rels B), «Eres la herida más bonita» y «Eres mi más hermosa canción» (Mr. Yeff).
5. **Capítulo II · Tu rincón de cariño** — galería de Snoopy inspirada en el tablero de Pinterest indicado, tres fotografías reales de rosas y recuerdos de Lia (`moment-01.webp`, `moment-03.webp`, `moment-04.webp`).
6. **Capítulo III · Una carta para ti** — sobre interactivo 3D con sello de cera «L» que al tocarlo se abre y despliega la carta con dedicatoria íntima.
7. **Capítulo IV · El 28** — fecha completa (28/11/2026), contador regresivo local, mención de los 21 años, rosas y destellos dorados titilantes.
8. **Última página · Celebración final** — *«FELIZ CUMPLEAÑOS, LIA»* con mensajes cálidos en español, inglés e italiano, lluvia de confeti, pétalos y corazones, recuerdos finales (`moment-05.webp`, `moment-06.webp`) y botón para cerrar y volver a abrir.

## Tecnologías

- HTML5 · CSS3 3D Transforms · JavaScript nativo (módulos por archivo)
- Tailwind CSS vía CDN
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
2. En Settings → Pages, publica la rama `main` (o `develop`) desde la raíz.
3. Los paths son relativos; no requiere configuración extra. `.nojekyll` ya está incluido.

## Controles

- **Abrir el libro** / tocar la portada — animación 3D de apertura
- **Anterior / Siguiente** o flechas del teclado `←` / `→` — pasar hojas con efecto 3D
- **Puntos de página** — saltar directamente a cualquier capítulo
- **Música** — pad ambiental sintetizado con Web Audio API (opcional y controlado por el usuario)
- **Canciones para ti** — cada botón abre una búsqueda en Spotify del tema y artista indicados; no se presupone una URI de pista concreta.
- **Sobre** — abre la carta interactiva con animación 3D
- **Cerrar y volver a abrir** — reinicia el recorrido del libro y la carta

Todo respeta `prefers-reduced-motion`.

El contador llega a cero a la medianoche del **28/11/2026**, según la zona horaria local del navegador.

## Licencias y atribuciones de imágenes

- Las cuatro imágenes de Snoopy se incluyen localmente a partir del [tablero «Snupy» de Jenna en Pinterest](https://cl.pinterest.com/jennafcn/snupy/). No se verificó la autoría ni la licencia de los pines originales; confirma los derechos antes de publicar el sitio.
- `assets/roses/rose-red.jpg` — [Casuarez85, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Red_Rose.JPG), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), redimensionada a 960 × 720.
- `assets/roses/rose-closeup.jpg` — [Benjamint444, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Rose_-_difinitive.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), redimensionada a 602 × 400.
- `assets/roses/rose-garden.jpg` — [Nonsenseferret, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Red_rose_in_the_Rose_Garden_of_Regent%27s_Park,_London.JPG), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), redimensionada a 960 × 640.

## Estructura

```
lia-birthday/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js           · orquestación del libro
│   ├── book.js           · apertura 3D y pase de páginas
│   ├── letter.js         · interactividad del sobre
│   ├── particles.js      · polvo, pétalos, destellos, confeti
│   ├── audio.js          · pad ambiental (Web Audio)
│   └── external-media.js · módulo opcional
├── assets/
│   ├── snoopy/           · imágenes seleccionadas del tablero de Pinterest
│   ├── roses/            · fotografías con licencia CC BY-SA y atribución
│   ├── svg/              · ilustraciones originales
│   └── lia/opt/          · fotografías optimizadas (WebP)
├── .nojekyll
└── README.md
```

---

Hecho con cuidado para Lia · 28 · XI 


[7:18 p.m., 9/11/2026] Giussepe TC: https://music.youtube.com/watch?v=tKzIltxndOs&si=MEsfLGiy6P-jKT-n
[7:18 p.m., 9/11/2026] Giussepe TC: https://music.youtube.com/watch?v=IZv01yy36A0&si=P7feT-qv_ZWQuoSj
[7:18 p.m., 9/11/2026] Giussepe TC: https://music.youtube.com/watch?v=4eANPr_2OoM&si=aDlc2aVhT_nVPm50
[7:18 p.m., 9/11/2026] Giussepe TC: https://music.youtube.com/watch?v=7RtUjmNh_ek&si=D3z9fRXMuGAEcJux
[7:18 p.m., 9/11/2026] Giussepe TC: https://music.youtube.com/watch?v=UFNhG4_NAlQ&si=XKupVP_bMZZnm0RX
