# Animated product demos

Every mockup is a stageshow scene. Read the `stageshow-js` skill first and follow its workflow (plan, copy the closest gold example, build, film, export). This file adds only what a real marketing site needs on top.

Install the skill once if it is missing:

```sh
npx skills add rizaardiyanto1412/stageshow-js --skill stageshow-js
```

Then `npm install` in the installed folder for its preview, filming and export tools.

## Which scenes to build

One scene per place a screenshot would have gone. Take the story of each from the copy next to it.

| Place | Scene | Plays |
|---|---|---|
| Hero | The core action of the product, three beats and a payoff, with a cursor (Ansa: take a conversation, add an internal note, set its status) | Loop |
| Feature list | What the system does on its own, no cursor (a new item arrives, a teammate is on it, it leaves) | Loop |
| Reports or analytics | A cursor changes one control; figures roll and a chart changes shape | Once |
| AI or integrations | The tool people use (a terminal or chat client) calling the product, then the result appearing as the product's own card | Once |
| Import or migration | A close-up card: one press, progress, a count, done | Once |

- Model the scene on the real product: open its screenshots and copy its layout, names, colours and icon set. Realistic fidelity at hero scale.
- The hero's reset needs a cause. "The next item arrives" (the column fades and swaps, a count goes back up) is one; values never rewind in view.
- A scene that plays once starts from a believable earlier state, never from zeros, because that first frame is what loads before the script and what a no-JavaScript visitor sees.

## Colours: follow the page

Custom properties inherit into the scene's shadow root. Define scene tokens from the page's tokens, with the light values as fallbacks, then map the kit's tokens to them:

```css
.demo .ss-stage {
  --a-canvas: var(--canvas, #fff);
  --a-line: var(--line, #e4e4e9);
  --a-fg: var(--fg, #18181d);
  --ss-surface: var(--a-canvas);
  --ss-line: var(--a-line);
  --ss-text-strong: var(--a-fg);
  --ss-font: Inter, ui-sans-serif, system-ui, sans-serif;
}
```

The scene then follows the page's light and dark modes with no script. The fallbacks make it render in stageshow's own preview. A terminal stays dark in both modes.

## Framing on a marketing page

- **Hero:** the stage is transparent (the page is the ground). A wide window, inset a little, running off the bottom, masked out over its last 100px so it dissolves into the page.
- **Half-width panels:** the scene sits in a panel that carries one of the art plates. Either a whole card with padding all round, or a window flush to the top that runs off the bottom of the panel (`padding: 6.5% 6.5% 0`).
- **Phone:** give every scene a `compact` design. Drop sidebars and side panels, shorten the text, and make sure the payoff is still inside the frame. Film it at 390.

## Export and wiring

Keep scene sources in the site repo (`site/scenes/<name>/index.tsx` plus its CSS, importing from `stageshow-js`) and commit the exported files.

```sh
node scripts/export.mjs <repo>/site/scenes/hero/index.tsx <repo>/site/scenes/reports/index.tsx \
  --outdir <repo>/site/assets/scenes --base /assets/scenes/
```

With `--outdir`, all scenes share one engine file and one stylesheet, and each scene gets `<name>.html` (the first frame) and `<name>.js` (a module). In the site build:

- Inline `<name>.html` where the mockup goes, wrapped in an element with `role="img"` and an `aria-label` that says what the demo shows. Add `data-scene="<name>"` to the `<stageshow-scene>` tag.
- On pages that hold scenes, preload the stylesheet and load `assets/scenes.js` (this skill) as a module. It starts each scene when it comes within 400px of the screen.
- Replace the export's first-line comment: it contains the absolute path of the machine it ran on.
- After a re-export, delete the previous hashed engine file.

## The policy exception

Scenes set positions with `style` attributes, in the first frame and while they play. A site with `style-src 'self'` blocks them.

- Add `style-src-attr 'unsafe-inline'` only for the paths that hold scenes. Scripts and stylesheets stay same-origin.
- If the project has a test for "no inline code", change it to allow exactly that directive on exactly those paths, and assert that other pages still have none.
- Check it for real: serve the built pages with the full policy header and watch a scene play.
- This weakens a rule someone chose. Say so at the top of the report and get the owner's approval before it reaches production.

## Checks that caught real faults

- Text cut off in a title or a terminal line: fit the content, or let it wrap.
- A cursor resting on words: move its rest point to empty surface.
- A sidebar or pane with a void under its content: add a second group the product really has.
- The payoff landing below the frame at phone width: shorten the narrow design.
- A rolling number that looks broken in a still: slow the updates so each roll finishes before the next.
- Action buttons sitting in the fade at the foot: make the stage taller.
