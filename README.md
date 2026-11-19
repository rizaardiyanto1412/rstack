# rstack

Skills for AI coding agents (Claude Code, Codex and others), written from real projects.

## Skills

| Skill | What it does |
|---|---|
| [scenic-landing](skills/scenic-landing/SKILL.md) | Designs a marketing landing page to a high finish: one painted scene that runs down the whole page, product mockups that are animated demos instead of screenshots, and art that moves. The art theme changes per brand; the method stays the same. Worked example: [helpansa.com](https://helpansa.com). |

## Install

```sh
npx skills add rizaardiyanto1412/rstack --skill scenic-landing
```

Then ask your agent to design or redesign a landing page, or name the skill.

`scenic-landing` builds its product demos with
[stageshow-js](https://github.com/rizaardiyanto1412/stageshow-js) and needs an
agent that can generate images for the art. The skill explains both.

## Status

`scenic-landing` was written from one project and has not yet been run on a
second site. Expect gaps, and please open an issue when you find one.

## License

MIT. See [LICENSE](LICENSE).
