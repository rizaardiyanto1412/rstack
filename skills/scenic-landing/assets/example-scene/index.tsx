import { Lock } from 'stageshow-js/icons'
import { Caret, Collapse, Stage, Window, type Act } from 'stageshow-js'
import './assistant.css'

// An assistant in a terminal, connected to Ansa by MCP. No cursor: the system
// does the work. The request is on screen from the first frame; three tool
// calls run in turn, each a blinking mark that turns green with its result,
// and the third puts an internal note into Ansa: the note card that arrives
// over the terminal's edge. Plays once and holds on the note.

type S = { step: number; done: number; note: boolean }

const TOOLS: [string, string][] = [
  ['list_conversations', '3 unanswered billing questions'],
  ['get_customer', 'Charged twice on Oct 14'],
  ['add_note', 'Note added to #131'],
]

const initial: S = { step: 0, done: 0, note: false }
const poster: S = { step: 3, done: 3, note: true }

async function script(a: Act<S>) {
  await a.wait(800)
  for (let i = 1; i <= 3; i++) {
    a.mark(`tool-${i}`)
    a.put({ step: i })
    await a.wait(i === 3 ? 900 : 1100)
    a.put({ done: i })
    await a.wait(350)
  }
  a.mark('note')
  a.put({ note: true })
  await a.wait(2600)
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" width={18} height={18} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#5448e2" />
      <path d="M8 22 14 10h4l6 12M11 18h10" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AnsaAssistant() {
  return (
    <Stage<S> width={480} height={436} compact={{ below: 400, width: 330, height: 500 }} fidelity="realistic" accent="#5448e2" initial={initial} poster={poster} script={script} play="once" className="aa">
      {(s) => (
        <>
          <Window chrome="terminal" title="claude — support" className="aa-term">
            <div className="aa-you">
              <span className="aa-you__sigil">&gt;</span>
              <span>Find the unanswered billing questions and add a note with the context.</span>
            </div>
            {TOOLS.map(([tool, result], i) => (
              <Collapse key={tool} open={s.step > i} solid className="aa-fold">
                <div className="aa-tool">
                  <span className="aa-tool__dot" data-done={s.done > i || undefined} />
                  <span>
                    <span className="aa-tool__server">ansa</span> · {tool} <span className="dim">(MCP)</span>
                  </span>
                </div>
                <div className="aa-result" data-show={s.done > i || undefined}>
                  <span className="dim">⎿</span>
                  <span>{result}</span>
                </div>
              </Collapse>
            ))}
            <div className="aa-input">
              <span className="aa-you__sigil">&gt;</span>
              <Caret />
            </div>
          </Window>
          <div className="aa-note" data-show={s.note || undefined}>
            <div className="aa-note__head">
              <Mark />
              <span className="aa-note__title">Internal note</span>
              <span className="aa-note__meta">
                <Lock size={12} strokeWidth={1.8} />
                Team only
              </span>
            </div>
            <p className="aa-note__text">Charged twice on Oct 14. Second charge refunded on Oct 15. Customer has not seen the refund yet.</p>
          </div>
        </>
      )}
    </Stage>
  )
}
