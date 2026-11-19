# Motion in the art

All of this is CSS. No JavaScript, no change to a Content-Security-Policy. `assets/scene-frame.css` has the working rules.

## The frame

The plate and its sprites must share one set of coordinates at every width. Do not use a `background` on the hero and position sprites separately: they drift apart as the box changes shape.

- An outer box (`.hero-sky`) is absolutely placed behind the hero, masks out at its foot, hides overflow, and is a size container (`container-type: size`).
- An inner frame (`.hero-sky-frame`) is 16:9, anchored to the bottom centre, and sized `width: max(100cqw, 177.78cqh)`. It always covers the box, like `background-size: cover`, but it is an element, so children can be placed in it by percentage.
- The plate is the frame's background. Each sprite is an absolutely placed child with `left`, `top`, `width`, `height` in percent, taken from the placement file.

Sizing the frame from the container, not from `vw`, avoids a strip of page colour above the plate (the scrollbar makes `100vw` wider than `100%`).

## The sprites

- One base class sets `position: absolute` and `background: center / contain no-repeat`.
- Image URLs are custom properties on `:root`, overridden in the dark block, so every place that reuses a sprite follows the colour mode. A band that is always night uses the night files directly.
- Animate with the individual `translate`, `rotate` and `scale` properties. A mirrored sprite sets `scale: -1 1` and can still be moved with `translate`.

## The motion

Gentle, and different for each object so nothing moves in step.

| Object | Motion | Cycle |
|---|---|---|
| Large floating object | Rise and fall about 3% of its height, tilt about half a degree each way, pivot high (`transform-origin: 50% 20%`) | 11s, ease-in-out |
| Small floating objects | Rise and fall about 7%, sway about 3% | 8s and 9.5s, each with a negative delay |
| Tiny distant object | Slow drift sideways and back | 14s to 16s |
| Gliding object (plane, bird, boat) | Travel along a short path through its painted position, fading in at the start and out at the end, then restart | 18s to 24s, linear |

- A glider never travels backwards. It fades out and starts again.
- Negative `animation-delay` values start each object mid-cycle, so the first second is not a synchronised jump.
- `@media (prefers-reduced-motion: reduce) { .fly { animation: none } }`.
- On narrow screens most side objects are already outside the visible area, because the frame keeps its aspect ratio and is centred.

## Carrying the world down the page

Reuse what exists before asking for new art.

- **Night band.** A full-width dark section takes the night plate as a cover background (`center bottom`), a light gradient of the band colour over it, and two or three night sprites in the side margins outside the content column: `right: max(2%, calc(50% - 700px))`. Hide them below the width where the margins close (about 1320px).
- **Cloud bank.** A block between two sections with the day plate as `background: var(--sky) center bottom / 100% auto` and height `clamp(120px, 15vw, 250px)`: this shows the plate's bottom band. Mask it to transparent at the top and bottom so it floats on the page colour.
- **Closing scene.** The closing call to action becomes a centred card on the golden-hour panel (dusk panel with a dark overlay in dark mode), with a large sprite cropped by the card's bottom edge on one side, a small one on the other, and a glider. Hide the sprites below about 1100px.
- **Drifters beside text.** One small floater and one glider in real empty space next to a text block. They sit on the plain page colour, so they read more as stickers than the others; keep them small, and drop them if the space is tight.

Limit: one drifting object per section, none beside a demo that is playing.
