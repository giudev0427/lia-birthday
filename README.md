# LIA — A Little World of Magic

Experiencia web premium de cumpleaños para **Lia** (28 de noviembre).

No es una tarjeta convencional: es un **libro digital** íntimo, cinematográfico y editorial — un pequeño universo de rosas, cariño y magia que se abre página a página.

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

## Experiencia de libro

1. **Portada cerrada** — rosa, título y “Abrir el libro”
2. **Apertura 3D** — la tapa gira como un libro real
3. **Capítulo I** — jardín nocturno de rosas
4. **Capítulo II** — rincón de cariño (ilustraciones originales)
5. **Capítulo III** — carta dentro del sobre
6. **Capítulo IV** — el 28 de noviembre
7. **Última página** — celebración final

En escritorio el libro se abre a doble página; en móvil se lee como hoja única.

## Tecnologías

- HTML5 · CSS3 · JavaScript (módulos por archivo)
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
2. En Settings → Pages, publica la rama `main` desde la raíz (o `/docs` si lo mueves allí).
3. La URL será `https://<usuario>.github.io/<repo>/`.

Los paths son relativos; no requiere configuración extra.

## Controles

- **Abrir el libro** / tocar la portada — animación de apertura
- **Anterior / Siguiente** o flechas del teclado — pasar páginas
- **Puntos** — saltar a un capítulo
- **Música** — pad ambiental opcional (Web Audio)
- **Sobre** — abre la carta
- Respeta `prefers-reduced-motion`

## Estructura

```
lia-birthday/
├── index.html
├── css/styles.css
├── js/
│   ├── main.js
│   ├── book.js
│   ├── particles.js
│   ├── letter.js
│   └── audio.js
├── assets/svg/
└── README.md
```

## Notas creativas

Las figuras del rincón adorable son **ilustraciones originales** creadas para esta experiencia. Homenajean el espíritu tierno de compañeros queridos (inspiración en Snoopy / Woodstock) sin usar material oficial protegido.

## Accesibilidad

- HTML semántico y skip link
- Controles con `aria-*` adecuados
- Foco visible
- Movimiento reducido respetado
- Contraste editorial sobre fondo nocturno

---

Hecho con cuidado para Lia · 28 · XI 


[7:18 p.m., 9/11/2026] Giussepe TC: https://music.youtube.com/watch?v=tKzIltxndOs&si=MEsfLGiy6P-jKT-n
[7:18 p.m., 9/11/2026] Giussepe TC: https://music.youtube.com/watch?v=IZv01yy36A0&si=P7feT-qv_ZWQuoSj
[7:18 p.m., 9/11/2026] Giussepe TC: https://music.youtube.com/watch?v=4eANPr_2OoM&si=aDlc2aVhT_nVPm50
[7:18 p.m., 9/11/2026] Giussepe TC: https://music.youtube.com/watch?v=7RtUjmNh_ek&si=D3z9fRXMuGAEcJux
[7:18 p.m., 9/11/2026] Giussepe TC: https://music.youtube.com/watch?v=UFNhG4_NAlQ&si=XKupVP_bMZZnm0RX
