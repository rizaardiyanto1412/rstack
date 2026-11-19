# Art

## Choosing the world

Pick one setting and one recurring object that carries the product's promise.

| Product promise | Setting | Recurring objects |
|---|---|---|
| Calm shared email (Ansa) | Morning sky over clouds and far mountains | Hot-air balloons carrying mail satchels, paper planes |
| Fast hosting, deploys | Coastline or harbour at dawn | Small boats, lighthouses, gulls |
| Finance, invoicing | Terraced hillside town | Lanterns, kites, market awnings |
| Developer tooling | Night city seen from a rooftop | Trains, lit windows, drones |
| Health, wellbeing | Forest clearing | Lanterns, birds, drifting seeds |

Rules for the choice:

- It must not be the reference site's world. If the owner points at sandywp.com or repile.app, name what those use (towers, stairs, arches, a central inlet, mirrored framing) and forbid each in the brief.
- The recurring object must be able to float, drift or glide, so it can move later without looking wrong.
- Plan the times of day now: hero (morning), a dark band (night), a closing scene (sunset). Light mode and night mode of the hero count as two more.

## Who can make images

Use an agent with a built-in image tool. In T3 Code that is the direct Codex login (`delegate_task` with provider `codex`, model `gpt-6.2-sol`). The Codex proxy provider has no image tool: a task sent there stops with nothing written. Computer use cannot drive the Codex desktop app. Check a project memory note for the current answer before dispatching.

Every brief says: "If you have no image tool in this session, stop at once and say so; write no files."

## Brief: hero plate

Give the agent: the product in one sentence, the world, the palette (the site's token hex values), the reference screenshots as files, and this:

- 16:9, about 1680 wide. Painted, soft, storybook texture; no text, no logos, no people's faces, no UI.
- Scenery and objects sit on the left and right thirds. The centre is open sky (or water, or wall) so a headline and buttons read over it.
- The bottom fifth fades toward the page colour, because the page masks the plate out at its foot.
- A night version with the same composition: darker sky, lit objects, a few stars.
- Forbidden list (everything the references use).
- Output: PNG masters in a scratch folder, WebP at quality about 82 in the site's assets folder, each under about 120 KB. Report sizes and any defects honestly.

Ask for two candidate worlds (A and B) in one run. Use one for the landing page and the other for the sign-up flow.

## Brief: panels behind mockups

Three small plates in the same world at three times of day (morning, golden hour, dusk), 3:2, with all detail at the top edge and corners and a calm middle, because a product window covers the middle. Demos sit on these.

## Brief: splitting a plate into layers

Needed before anything can move. Ask for, in light and night versions:

1. **A clean plate**: the same picture with every moving object removed and the background painted in, with no ghost or seam. Prefer inpainting the source over generating a new picture, so everything else matches.
2. **Transparent sprites** of each object, tightly cropped, real alpha, no fringe, at about twice their on-page size. One sprite per kind is enough; mirror and reuse it. Remove thin trails: a trail cannot travel with a flat sprite.
3. **A placement file**: each object's bounding box as fractions of the plate (`x`, `y`, `w`, `h`), which sprite it uses, and whether it is mirrored.
4. **A proof**: the sprites composited over the plate at those positions, to compare with the source. Check each sprite on white and on a dark backdrop.

Then read the plates and the alpha check yourself before building. Expect small faults (a rough edge on the largest object, faint ropes); they do not show at page size, but report them.

## After the art arrives

- View every file. Never wire in art you have not looked at.
- Put the placement numbers into CSS and delete the placement file from the shipped assets.
- Keep the PNG masters outside the repo.
