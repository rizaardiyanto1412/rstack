---
name: scenic-landing
description: Design or redesign a marketing landing page (and its sign-up flow) to a high finish: one painted scene that runs down the whole page, product mockups that are animated demos instead of screenshots, and art that moves. Use when the user asks to design, redesign, refine or "make amazing" a landing page, hero, marketing site or sign-up form, asks for full-colour art backgrounds like sandywp.com or repile.app, asks for animated product mockups like mailcheap.ai, or names this skill. The art theme changes per brand (sky, ocean, city, forest, desert); the method stays the same.
---

# Scenic landing

A landing page that reads as one place. The hero opens a painted scene, the same scene continues behind later sections at other times of day, every product mockup plays instead of sitting still, and a few objects in the art drift. Worked example: helpansa.com (lavender sky, mail balloons, paper planes).

## The one idea

**One world, one product story, shown early and often to the person who owns it.** Most of the quality in the worked example came from the owner reacting to something real on screen ("too similar to the reference", "this does not look like an AI interface", "I can't read this"). Get a real page in front of them fast, then iterate. Never spend a long stretch building without a look.

## Order of work

Do the steps in this order. Each one is checked in a browser before the next starts.

1. **Read the site as it is.** Its build, its design tokens, its Content-Security-Policy, its tests. Note what is server-rendered. Screenshot the current pages in both colour modes and at phone width.
2. **Layout and copy pass.** Fix hierarchy, spacing, the form, the pricing block, before any art. A page that is weak in grey stays weak in colour.
3. **Pick the world.** One setting that carries the brand's promise as a picture (Ansa: mail carried calmly through a morning sky). Decide its times of day: one for the hero, one or two for mid-page bands, one for the closing section. See `references/art.md`.
4. **Generate the art.** Brief an image-capable agent. Light and night versions of every plate. See `references/art.md` for the briefs and for which provider can make images.
5. **Replace every screenshot with an animated demo.** Use the `stageshow-js` skill. One scene per mockup, each telling one small story of the product. See `references/demos.md`.
6. **Make the art move.** Split the hero plate into a clean plate and transparent sprites, then animate the sprites in CSS. See `references/motion.md`.
7. **Carry the world down the page.** Reuse the plates and sprites: a night band, a cloud (or wave, or skyline) bank between sections, a closing scene. No new art is usually needed.
8. **Copy against the competitor.** Verify the competitor's current pricing and pain points from its own pages before writing a word. See Copy below.
9. **Ship in slices.** One pull request per slice (layout, demos, motion, world), so a weak slice can be dropped without losing the rest.

## Rules that held up

- **Light mode is the default** unless the owner says otherwise. Dark applies only after the visitor chooses it (`data-theme` on `<html>`, saved in `localStorage`). Build every plate, sprite and demo for both.
- **The demos follow the page's colours.** Give each scene CSS variables with the page's token names as the source and light values as fallbacks; custom properties inherit into a shadow root, so one scene serves both modes.
- **Every mockup plays, but only one thing leads.** The hero demo loops. Demos lower on the page play once when they scroll into view and hold on their result. Drifting art near a playing demo is kept to one object or none.
- **First frames are real.** A demo's first frame is in the HTML and must make sense with no JavaScript: never open on zeros or an empty panel. Start from a plausible earlier state and animate to the result.
- **Nothing moves for `prefers-reduced-motion`.**
- **Readable at the size shown.** A screenshot scaled into a half-width panel is unreadable; build a close-up of the one card that matters instead.
- **An AI feature looks like the tool people use.** A terminal session or a chat client with real tool-call lines, not a generic "assistant" card. No sparkles, no purple-as-AI.
- **Never draw a logo.** Use the product's real mark or a text wordmark.
- **Phone:** hide drifting sprites where they would touch text; keep plates. Every demo needs its own narrow design, not a scaled-down wide one.

## Copy

- Look up the competitor's pricing page yourself, today. Memory and blog posts go stale: in the worked example the owner believed the competitor billed per conversation; it had changed back to per-user a year earlier.
- Build the comparison from what its own page says now (billing unit, per-seat price, AI fees, add-on fees) and put a dated source line under the claim.
- A claim you can confirm only from third-party posts stays out of the page until the owner decides.
- Offer headline options grouped by what they sell (price, teamwork, tone, against the competitor) and recommend one. Check that the same headline is not already used on another page.

## Verification, every slice

- Serve the built site with the site's real Content-Security-Policy header, not a plain static server; a missing policy hides breakage.
- Look at every changed section in light and dark, at desktop width, and at phone width. Scroll to it and take a second screenshot a few seconds later: the first one catches demos mid-change.
- Film each scene (stageshow's `film.mjs`) at the wide and the narrow width before exporting.
- Run the project's own checks.
- In the report, say plainly what was not looked at.

## Traps already paid for

- **Inline styles and CSP.** Stageshow scenes position parts with `style` attributes. Under `style-src 'self'` they render unstyled. The narrow fix is `style-src-attr 'unsafe-inline'` on only the pages that hold scenes. That weakens a deliberate rule: change it narrowly, update the test to assert exactly the exception, and tell the owner before merging.
- **A gap above the hero.** A plate sized by `vw` and a box sized by `%` disagree by the scrollbar width. Size the plate from its container (see `references/motion.md`).
- **Deploys that build from the working tree.** Do not let an art agent write into the checkout while a deploy runs.
- **Stale export chunks.** A re-export writes a new hashed engine file; delete the old one.
- **A health check that fails once right after a deploy** can be the app restarting on new code. Run it again before judging, and report both results.
- **Unused images** pile up after each slice. List them and ask before deleting.

## Files in this skill

- `references/art.md`: choosing the world, the image briefs, splitting a plate into layers.
- `references/motion.md`: the scene frame, sprite placement, the drift and glide keyframes, carrying the world down the page.
- `references/demos.md`: stageshow scenes for a real product, export, loading, colour tokens, the policy exception.
- `assets/scene-frame.css`: the hero frame, sprites and keyframes, ready to adapt.
- `assets/scenes.js`: loads each demo when it nears the screen.
- `assets/theme.js`: the light and dark switch.
- `assets/example-scene/`: one finished stageshow scene (a terminal assistant writing a note into the product) as a model.
