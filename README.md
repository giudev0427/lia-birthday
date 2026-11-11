# LIA — A Little World of Magic

Experiencia web premium de cumpleaños para **Lia** (28 de noviembre).

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

- Rosas, beagle, pajarito, peluchito y gatito: **ilustraciones SVG originales** creadas para esta experiencia.
- Fotografías personales de Lia con marcos editoriales y optimización WebP.

## Experiencia del Libro

1. **Portada cerrada (3D)** — encuadernación en terciopelo noche y burdeos con marco de oro, rosa central con animación de respiración y botón **Abrir el libro**.
2. **Apertura cinematográfica** — la tapa gira en perspectiva 3D revelando el spread a doble página.
3. **Hoja izquierda** — dedicatoria poética *«Para Lia — Un pequeño universo»* con rosa floreciente.
4. **Capítulo I · Jardín nocturno** — rosas rojas, lluvia de pétalos flotantes, cita emocional y recuerdo enmarcado (`moment-02.webp`).
5. **Capítulo II · Tu rincón de cariño** — el beagle blanco soñador, el gatito travieso, el pajarito y el peluche junto a los recuerdos de Lia (`moment-01.webp`, `moment-03.webp`, `moment-04.webp`).
6. **Capítulo III · Una carta para ti** — sobre interactivo 3D con sello de cera «L» que al tocarlo se abre y despliega la carta con dedicatoria íntima.
7. **Capítulo IV · El 28** — número monumental en degradado champagne/rubí con flotación continua, rosas y destellos dorados titilantes.
8. **Última página · Celebración final** — *«FELIZ CUMPLEAÑOS, LIA»*, lluvia de confeti, pétalos y corazones, recuerdos finales (`moment-05.webp`, `moment-06.webp`) y botón para cerrar y volver a abrir.

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
- **Sobre** — abre la carta interactiva con animación 3D
- **Cerrar y volver a abrir** — reinicia el recorrido del libro y la carta

Todo respeta `prefers-reduced-motion`.

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
│   ├── svg/              · ilustraciones originales
│   └── lia/opt/          · fotografías optimizadas (WebP)
├── .nojekyll
└── README.md
```

---

Hecho con cuidado para Lia · 28 · XI
