import type { MockKey } from '../../content/types'
import {
  ACCENT,
  Avatar,
  Bar,
  Bars,
  Btn,
  Chip,
  Col,
  Dial,
  FAINT,
  GROUND,
  Graduation,
  INK,
  Label,
  Lines,
  PAPER,
  Panel,
  RULE,
  RULE_SOFT,
  Row,
  Spark,
  Text,
  Thumb,
  type Tone,
} from './primitives'

/* ═══════════════════════════════════════════════════════════════════════════
   DRAWN MOCKUPS
   Twenty interface studies, built from the shared primitive vocabulary. No
   image files: nothing to optimise, nothing to break, and every one is
   editable. Replace any of these with your real screens by swapping the
   component body — the registry key stays the same.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface MockProps {
  tone: Tone
  mobile: boolean
}

const pad = (mobile: boolean) => (mobile ? 16 : 26)

/* ── Chrome helpers ────────────────────────────────────────────────────── */

function TopBar({ tone, title, mobile }: MockProps & { title: string }) {
  if (mobile) {
    return (
      <Row justify="space-between" style={{ padding: '14px 16px 10px' }}>
        <Text size={15} weight={600} track={-0.02}>
          {title}
        </Text>
        <Row gap={10}>
          <Bar w={16} h={2} color={RULE} />
          <Bar w={16} h={2} color={RULE} />
        </Row>
      </Row>
    )
  }
  return (
    <Row
      justify="space-between"
      style={{
        padding: '0 26px',
        height: 52,
        borderBottom: `1px solid ${RULE_SOFT}`,
        background: PAPER,
      }}
    >
      <Row gap={22}>
        <Row gap={7}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              background: ACCENT[tone],
            }}
          />
          <Text size={12} weight={600} track={-0.02}>
            {title}
          </Text>
        </Row>
        <Row gap={16}>
          {['Discover', 'Library', 'Insights'].map((n, i) => (
            <Text key={n} size={11} color={i === 0 ? INK : FAINT} weight={i === 0 ? 500 : 400}>
              {n}
            </Text>
          ))}
        </Row>
      </Row>
      <Row gap={10}>
        <Bar w={110} h={24} color={GROUND} r={6} />
        <Avatar i={2} size={24} />
      </Row>
    </Row>
  )
}

function Sidebar({ tone, items }: { tone: Tone; items: string[] }) {
  return (
    <Col
      gap={16}
      style={{
        width: 196,
        borderRight: `1px solid ${RULE_SOFT}`,
        padding: 20,
        flexShrink: 0,
      }}
    >
      {items.map((group, gi) => (
        <Col key={group} gap={9}>
          <Label size={9}>{group}</Label>
          <Col gap={7}>
            {Array.from({ length: gi === 0 ? 4 : 3 }).map((_, i) => (
              <Row key={i} gap={8}>
                <div
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 3,
                    border: `1px solid ${gi === 0 && i === 1 ? ACCENT[tone] : RULE}`,
                    background: gi === 0 && i === 1 ? ACCENT[tone] : 'transparent',
                  }}
                />
                <Bar w={i % 3 === 0 ? 96 : 74} h={5} color={gi === 0 && i === 1 ? '#c7c3f5' : RULE} />
              </Row>
            ))}
          </Col>
        </Col>
      ))}
    </Col>
  )
}

/* ── 01 · Feed / discovery grid ────────────────────────────────────────── */

function Feed(p: MockProps) {
  const cols = p.mobile ? 2 : 4
  const rows = p.mobile ? 4 : 3
  return (
    <Col gap={0} style={{ height: '100%' }}>
      <TopBar {...p} title="Cemetric" />
      <Row align="stretch" style={{ flex: 1, minHeight: 0 }}>
        {!p.mobile && <Sidebar tone={p.tone} items={['Position', 'Level', 'Region']} />}
        <Col gap={14} style={{ flex: 1, padding: pad(p.mobile), minWidth: 0 }}>
          <Row justify="space-between">
            <Col gap={6}>
              <Text size={p.mobile ? 14 : 17} weight={600} track={-0.025}>
                Discover athletes
              </Text>
              <Label size={9}>384 profiles · 12 regions</Label>
            </Col>
            {!p.mobile && <Graduation w={150} tone={p.tone} />}
          </Row>
          <Row gap={6} style={{ flexWrap: 'wrap' }}>
            <Chip active tone={p.tone} removable>
              Midfield
            </Chip>
            <Chip tone={p.tone}>U18</Chip>
            <Chip tone={p.tone}>Region 04</Chip>
            {!p.mobile && <Chip tone={p.tone}>Recently added</Chip>}
          </Row>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: 12,
              flex: 1,
              minHeight: 0,
            }}
          >
            {Array.from({ length: cols * rows }).map((_, i) => (
              <Panel key={i} pad={8} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Thumb h={p.mobile ? 62 : 86} tone={p.tone} play seed={i} />
                <Col gap={5}>
                  <Bar w="72%" h={5} color="#dfe3ea" />
                  <Label size={8}>{['MID · U18', 'FWD · U21', 'DEF · U16', 'GK · U18'][i % 4]}</Label>
                </Col>
              </Panel>
            ))}
          </div>
        </Col>
      </Row>
    </Col>
  )
}

/* ── 02 · Upload — transfer first ──────────────────────────────────────── */

function Upload(p: MockProps) {
  return (
    <Col gap={0} style={{ height: '100%' }}>
      <TopBar {...p} title="Upload" />
      <Col gap={16} style={{ padding: pad(p.mobile), flex: 1, minHeight: 0 }}>
        <Panel pad={14}>
          <Col gap={10}>
            <Row justify="space-between">
              <Label size={9} color={ACCENT[p.tone]}>
                ● Transferring
              </Label>
              <Label size={9}>68% · ~40s</Label>
            </Row>
            <div style={{ height: 5, borderRadius: 99, background: GROUND, overflow: 'hidden' }}>
              <div style={{ width: '68%', height: '100%', background: ACCENT[p.tone] }} />
            </div>
            <Text size={11} color="var(--m-body)" lh={1.45}>
              Your video is uploading. It's safe to leave this page — we'll keep going.
            </Text>
          </Col>
        </Panel>

        <Col gap={9}>
          <Label size={9}>Details · optional</Label>
          {['Title', 'Sport', 'Date recorded'].map((f, i) => (
            <Col key={f} gap={5}>
              <Text size={10} color={FAINT}>
                {f}
              </Text>
              <div
                style={{
                  height: 32,
                  borderRadius: 9,
                  border: `1px solid ${i === 0 ? ACCENT[p.tone] : RULE}`,
                  background: PAPER,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px',
                }}
              >
                <Bar w={i === 0 ? 120 : 78} h={5} color={i === 0 ? '#c7c3f5' : RULE} />
              </div>
            </Col>
          ))}
        </Col>

        <Col gap={8}>
          <Label size={9}>Tags</Label>
          <Row gap={6} style={{ flexWrap: 'wrap' }}>
            <Chip active tone={p.tone} removable>
              Midfield
            </Chip>
            <Chip active tone={p.tone} removable>
              U18
            </Chip>
            <Chip tone={p.tone}>+ Region</Chip>
          </Row>
        </Col>

        <div style={{ flex: 1, minHeight: 8 }} />

        <Col gap={9} style={{ background: GROUND, borderRadius: 11, padding: 12 }}>
          <Label size={9}>What happens next</Label>
          {[
            ['Queued', 'done'],
            ['Transferring', 'now'],
            ['Processing', 'next'],
            ['Published', 'next'],
          ].map(([state, phase], i) => (
            <Row key={state} gap={9}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  marginTop: 3,
                  borderRadius: 99,
                  background:
                    phase === 'done'
                      ? ACCENT.positive
                      : phase === 'now'
                        ? ACCENT[p.tone]
                        : 'transparent',
                  border: phase === 'next' ? `1px solid ${RULE}` : 'none',
                }}
              />
              <Text size={10} weight={phase === 'now' ? 500 : 400} color={phase === 'next' ? FAINT : INK}>
                {state}
              </Text>
              {i === 2 && <Label size={7}>~2 MIN</Label>}
            </Row>
          ))}
          <Text size={9.5} color="var(--m-body)" lh={1.5}>
            You can close this. We'll tell you when it's live.
          </Text>
        </Col>

        <Row gap={8}>
          <Btn tone={p.tone} w="100%">
            Publish when ready
          </Btn>
        </Row>
      </Col>
    </Col>
  )
}

/* ── 03 · Profile ──────────────────────────────────────────────────────── */

function Profile(p: MockProps) {
  return (
    <Col gap={0} style={{ height: '100%' }}>
      <TopBar {...p} title="Athlete" />
      <Row align="stretch" gap={0} style={{ flex: 1, minHeight: 0 }}>
        <Col gap={14} style={{ flex: 1, padding: pad(p.mobile), minWidth: 0 }}>
          <Row gap={12}>
            <Avatar i={0} size={p.mobile ? 40 : 52} />
            <Col gap={6}>
              <Text size={p.mobile ? 15 : 19} weight={600} track={-0.03}>
                A. Okonkwo
              </Text>
              <Label size={9}>MIDFIELD · U18 · REGION 04</Label>
            </Col>
          </Row>
          <Thumb h={p.mobile ? 150 : 220} tone={p.tone} play seed={3} />
          <Row gap={10}>
            {[0, 1, 2, 3].map((i) => (
              <Thumb key={i} h={p.mobile ? 42 : 56} tone={p.tone} seed={i + 5} />
            ))}
          </Row>
          <Lines rows={3} w={p.mobile ? 240 : 420} />
        </Col>
        {!p.mobile && (
          <Col
            gap={14}
            style={{
              width: 214,
              borderLeft: `1px solid ${RULE_SOFT}`,
              padding: 20,
              flexShrink: 0,
            }}
          >
            <Label size={9}>Measurables</Label>
            {[
              ['Height', '1.78 m'],
              ['Weight', '68 kg'],
              ['Foot', 'Left'],
              ['Sprint 30m', '4.12 s'],
              ['Clips', '14'],
            ].map(([k, v]) => (
              <Row key={k} justify="space-between" style={{ borderBottom: `1px solid ${RULE_SOFT}`, paddingBottom: 7 }}>
                <Text size={10} color={FAINT}>
                  {k}
                </Text>
                <Text size={10} weight={500}>
                  {v}
                </Text>
              </Row>
            ))}
            <Btn tone={p.tone} w="100%">
              Add to shortlist
            </Btn>
          </Col>
        )}
      </Row>
    </Col>
  )
}

/* ── 04 · Dashboard ────────────────────────────────────────────────────── */

function Dashboard(p: MockProps) {
  return (
    <Col gap={0} style={{ height: '100%' }}>
      <TopBar {...p} title="Overview" />
      <Row align="stretch" style={{ flex: 1, minHeight: 0 }}>
        {!p.mobile && <Sidebar tone={p.tone} items={['Workspace', 'Reports']} />}
        <Col gap={14} style={{ flex: 1, padding: pad(p.mobile), minWidth: 0 }}>
          <Row justify="space-between">
            <Text size={p.mobile ? 14 : 17} weight={600} track={-0.025}>
              This month
            </Text>
            <Row gap={6}>
              <Chip tone={p.tone}>30 days</Chip>
              <Chip active tone={p.tone}>
                Quarter
              </Chip>
            </Row>
          </Row>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: p.mobile ? '1fr 1fr' : 'repeat(3, 1fr)',
              gap: 12,
            }}
          >
            {[
              ['Outstanding', '£4,280', 1],
              ['Paid', '£11,940', 2],
              ['Overdue', '£620', 3],
            ]
              .slice(0, p.mobile ? 2 : 3)
              .map(([k, v, s]) => (
                <Panel key={k as string} pad={13}>
                  <Col gap={9}>
                    <Label size={9}>{k as string}</Label>
                    <Text size={p.mobile ? 16 : 20} weight={600} track={-0.03}>
                      {v as string}
                    </Text>
                    <Spark w={p.mobile ? 90 : 130} h={26} tone={p.tone} seed={s as number} />
                  </Col>
                </Panel>
              ))}
          </div>
          <Panel pad={14} style={{ flex: 1, minHeight: 0 }}>
            <Col gap={12} style={{ height: '100%' }}>
              <Row justify="space-between">
                <Label size={9}>Cash in · by week</Label>
                <Label size={9}>Q3</Label>
              </Row>
              <Bars w={p.mobile ? 300 : 700} h={p.mobile ? 90 : 150} n={p.mobile ? 12 : 20} tone={p.tone} seed={4} />
              <Graduation w={p.mobile ? 300 : 700} count={p.mobile ? 24 : 40} tone={p.tone} />
            </Col>
          </Panel>
        </Col>
      </Row>
    </Col>
  )
}

/* ── 05 · Dense table / shortlist ──────────────────────────────────────── */

function Table(p: MockProps) {
  const cols = p.mobile ? 3 : 6
  const rows = p.mobile ? 8 : 11
  const heads = ['Name', 'Pos', 'Level', 'Region', 'Rating', 'Note'].slice(0, cols)
  return (
    <Col gap={0} style={{ height: '100%' }}>
      <TopBar {...p} title="Shortlist" />
      <Col gap={12} style={{ padding: pad(p.mobile), flex: 1, minHeight: 0 }}>
        <Row justify="space-between">
          <Text size={p.mobile ? 14 : 17} weight={600} track={-0.025}>
            Comparison
          </Text>
          <Row gap={6}>
            <Chip tone={p.tone}>Density</Chip>
            <Chip active tone={p.tone}>
              Compact
            </Chip>
          </Row>
        </Row>
        <div style={{ border: `1px solid ${RULE_SOFT}`, borderRadius: 11, overflow: 'hidden', flex: 1 }}>
          <Row
            style={{
              background: GROUND,
              borderBottom: `1px solid ${RULE}`,
              padding: '9px 12px',
            }}
          >
            {heads.map((h, i) => (
              <div key={h} style={{ flex: i === 0 ? 2 : 1 }}>
                <Label size={8}>{h}</Label>
              </div>
            ))}
          </Row>
          {Array.from({ length: rows }).map((_, r) => (
            <Row
              key={r}
              style={{
                padding: '9px 12px',
                borderBottom: r === rows - 1 ? 'none' : `1px solid ${RULE_SOFT}`,
                background: r === 2 ? (p.tone === 'positive' ? '#effcf9' : '#eef2ff') : PAPER,
              }}
            >
              <Row gap={8} style={{ flex: 2 }}>
                <Avatar i={r} size={16} />
                <Bar w={64} h={5} color="#dfe3ea" />
              </Row>
              {Array.from({ length: cols - 1 }).map((_, c) => (
                <div key={c} style={{ flex: 1 }}>
                  {c === cols - 2 && !p.mobile ? (
                    <Row gap={3}>
                      {[0, 1, 2, 3, 4].map((s) => (
                        <div
                          key={s}
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: 99,
                            background: s <= (r % 5) ? ACCENT[p.tone] : RULE,
                          }}
                        />
                      ))}
                    </Row>
                  ) : (
                    <Bar w={c % 2 === 0 ? 40 : 30} h={5} color={RULE} />
                  )}
                </div>
              ))}
            </Row>
          ))}
        </div>
      </Col>
    </Col>
  )
}

/* ── 06 · Form ─────────────────────────────────────────────────────────── */

function Form(p: MockProps) {
  return (
    <Col gap={0} style={{ height: '100%' }}>
      <TopBar {...p} title="New invoice" />
      <Col gap={14} style={{ padding: pad(p.mobile), flex: 1, minHeight: 0 }}>
        <Row gap={7}>
          {['Client', 'Items', 'Reminders', 'Review'].map((s, i) => (
            <Col key={s} gap={6} style={{ flex: 1 }}>
              <Bar w="100%" h={3} color={i <= 1 ? ACCENT[p.tone] : RULE} />
              {!p.mobile && <Label size={8}>{s}</Label>}
            </Col>
          ))}
        </Row>
        <Col gap={11} style={{ flex: 1 }}>
          {['Client name', 'Amount', 'Due date'].map((f, i) => (
            <Col key={f} gap={5}>
              <Text size={10} color={FAINT}>
                {f}
              </Text>
              <div
                style={{
                  height: 34,
                  borderRadius: 9,
                  border: `1px solid ${i === 1 ? ACCENT[p.tone] : RULE}`,
                  background: PAPER,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 11px',
                }}
              >
                <Bar w={i === 1 ? 90 : 130} h={5} color={i === 1 ? '#c7c3f5' : RULE} />
              </div>
              {i === 1 && (
                <Text size={9} color={ACCENT[p.tone]}>
                  Includes 20% VAT
                </Text>
              )}
            </Col>
          ))}
          <Panel pad={12} style={{ background: GROUND }}>
            <Col gap={8}>
              <Label size={9}>Reminder plan</Label>
              {['Day 0 · sent', 'Day 14 · gentle nudge', 'Day 30 · firm follow-up'].map((t, i) => (
                <Row key={t} gap={8}>
                  <div
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: 4,
                      background: i < 2 ? ACCENT[p.tone] : 'transparent',
                      border: `1px solid ${i < 2 ? ACCENT[p.tone] : RULE}`,
                    }}
                  />
                  <Text size={10} color="var(--m-body)">
                    {t}
                  </Text>
                </Row>
              ))}
            </Col>
          </Panel>
        </Col>
        <Row gap={8} justify="flex-end">
          <Btn variant="ghost">Back</Btn>
          <Btn tone={p.tone}>Continue</Btn>
        </Row>
      </Col>
    </Col>
  )
}

/* ── 07 · Calendar / rota ──────────────────────────────────────────────── */

function Calendar(p: MockProps) {
  const days = p.mobile ? 3 : 7
  return (
    <Col gap={0} style={{ height: '100%' }}>
      <TopBar {...p} title="Rota" />
      <Row align="stretch" style={{ flex: 1, minHeight: 0 }}>
        {!p.mobile && <Sidebar tone={p.tone} items={['Teams', 'Filters']} />}
        <Col gap={12} style={{ flex: 1, padding: pad(p.mobile), minWidth: 0 }}>
          <Row justify="space-between">
            <Col gap={5}>
              <Text size={p.mobile ? 14 : 17} weight={600} track={-0.025}>
                Week 32
              </Text>
              <Label size={9}>18 carers · 214 visits · 3 unassigned</Label>
            </Col>
            <Row gap={6}>
              <Chip tone={p.tone}>Auto-fill</Chip>
              <Chip active tone={p.tone}>
                Manual
              </Chip>
            </Row>
          </Row>
          <Row gap={0} style={{ borderBottom: `1px solid ${RULE}`, paddingBottom: 7 }}>
            <div style={{ width: p.mobile ? 54 : 84 }} />
            {Array.from({ length: days }).map((_, i) => (
              <div key={i} style={{ flex: 1 }}>
                <Label size={8}>{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i]}</Label>
              </div>
            ))}
          </Row>
          <Col gap={0} style={{ flex: 1, minHeight: 0 }}>
            {Array.from({ length: p.mobile ? 7 : 9 }).map((_, r) => (
              <Row
                key={r}
                gap={0}
                align="stretch"
                style={{
                  flex: 1,
                  borderBottom: `1px solid ${RULE_SOFT}`,
                  minHeight: 0,
                }}
              >
                <Row gap={6} style={{ width: p.mobile ? 54 : 84, paddingTop: 8 }}>
                  {!p.mobile && <Avatar i={r} size={14} />}
                  <Bar w={p.mobile ? 40 : 44} h={5} color={RULE} />
                </Row>
                {Array.from({ length: days }).map((_, c) => {
                  const filled = (r * 3 + c * 5) % 4 !== 0
                  const flagged = (r + c) % 11 === 3
                  return (
                    <div key={c} style={{ flex: 1, padding: '5px 3px' }}>
                      {filled && (
                        <div
                          style={{
                            height: '100%',
                            minHeight: 16,
                            borderRadius: 4,
                            background: flagged ? PAPER : `${ACCENT[p.tone]}1c`,
                            borderLeft: `2px solid ${ACCENT[p.tone]}`,
                            border: flagged ? `1px dashed ${ACCENT[p.tone]}` : undefined,
                            borderLeftWidth: 2,
                            borderLeftStyle: 'solid',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: 4,
                          }}
                        >
                          <Bar w="55%" h={3} color={`${ACCENT[p.tone]}66`} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </Row>
            ))}
          </Col>
        </Col>
      </Row>
    </Col>
  )
}

/* ── 08 · Chat / handover notes ────────────────────────────────────────── */

function Chat(p: MockProps) {
  return (
    <Col gap={0} style={{ height: '100%' }}>
      <TopBar {...p} title="Handover" />
      <Col gap={12} style={{ padding: pad(p.mobile), flex: 1, minHeight: 0 }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const mine = i % 2 === 1
          return (
            <Row key={i} gap={9} justify={mine ? 'flex-end' : 'flex-start'} align="flex-start">
              {!mine && <Avatar i={i} size={22} />}
              <Col
                gap={6}
                style={{
                  maxWidth: '68%',
                  background: mine ? `${ACCENT[p.tone]}14` : PAPER,
                  border: `1px solid ${mine ? 'transparent' : RULE_SOFT}`,
                  borderRadius: 11,
                  padding: 11,
                }}
              >
                <Label size={8}>{mine ? 'YOU · 09:14' : 'COORDINATOR · 09:11'}</Label>
                <Lines rows={i % 3 === 0 ? 3 : 2} w={p.mobile ? 170 : 300} h={4} />
              </Col>
            </Row>
          )
        })}
        <div style={{ flex: 1 }} />
        <Row gap={8}>
          <div
            style={{
              flex: 1,
              height: 34,
              borderRadius: 8,
              border: `1px solid ${RULE}`,
              background: PAPER,
              display: 'flex',
              alignItems: 'center',
              padding: '0 11px',
            }}
          >
            <Bar w={100} h={5} color={RULE} />
          </div>
          <Btn tone={p.tone}>Send</Btn>
        </Row>
      </Col>
    </Col>
  )
}

/* ── 09 · Onboarding ───────────────────────────────────────────────────── */

function Onboarding(p: MockProps) {
  return (
    <Col gap={0} style={{ height: '100%', background: GROUND }}>
      <Col gap={18} style={{ padding: p.mobile ? 22 : 40, flex: 1 }}>
        <Row gap={5}>
          {[0, 1, 2].map((i) => (
            <Bar key={i} w={i === 0 ? 26 : 12} h={3} color={i === 0 ? ACCENT[p.tone] : RULE} />
          ))}
        </Row>
        <Col gap={10}>
          <Label size={9}>Step 01 of 03</Label>
          <Text size={p.mobile ? 20 : 27} weight={600} track={-0.035} lh={1.15}>
            What do you buy most weeks?
          </Text>
          <Text size={11} color="var(--m-body)" lh={1.5}>
            Pick a few and we'll build your first list. You can change everything later.
          </Text>
        </Col>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: p.mobile ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: 10,
            flex: 1,
          }}
        >
          {Array.from({ length: p.mobile ? 8 : 9 }).map((_, i) => (
            <Panel
              key={i}
              pad={10}
              style={{
                border: `1px solid ${[0, 3, 4].includes(i) ? ACCENT[p.tone] : RULE_SOFT}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                justifyContent: 'space-between',
              }}
            >
              <Thumb h={34} tone={p.tone} seed={i} r={5} />
              <Bar w="62%" h={4} color="#dfe3ea" />
            </Panel>
          ))}
        </div>
        <Btn tone={p.tone} w="100%">
          Continue
        </Btn>
      </Col>
    </Col>
  )
}

/* ── 10 · Checkout ─────────────────────────────────────────────────────── */

function Checkout(p: MockProps) {
  return (
    <Col gap={0} style={{ height: '100%' }}>
      <TopBar {...p} title="Basket" />
      <Col gap={12} style={{ padding: pad(p.mobile), flex: 1, minHeight: 0 }}>
        <Panel pad={12} style={{ background: `${ACCENT[p.tone]}0d`, border: `1px solid ${ACCENT[p.tone]}33` }}>
          <Col gap={7}>
            <Label size={9} color={ACCENT[p.tone]}>
              Before you check out
            </Label>
            <Text size={11} lh={1.45}>
              You usually buy <strong>milk</strong> and <strong>bread</strong> around now. Still needed?
            </Text>
            <Row gap={6}>
              <Chip active tone={p.tone}>
                Add both
              </Chip>
              <Chip tone={p.tone}>Not this week</Chip>
            </Row>
          </Col>
        </Panel>
        <Col gap={0} style={{ flex: 1, minHeight: 0 }}>
          {Array.from({ length: p.mobile ? 5 : 7 }).map((_, i) => (
            <Row
              key={i}
              gap={11}
              style={{ padding: '10px 0', borderBottom: `1px solid ${RULE_SOFT}` }}
            >
              <Thumb w={38} h={38} tone={p.tone} seed={i} r={6} />
              <Col gap={5} style={{ flex: 1 }}>
                <Bar w="52%" h={5} color="#dfe3ea" />
                <Label size={8}>{i === 1 ? 'SUBSTITUTED · OWN BRAND' : '500 G'}</Label>
              </Col>
              <Row gap={7}>
                <Bar w={18} h={18} color={GROUND} r={5} />
                <Text size={11} weight={500}>
                  {i + 1}
                </Text>
                <Bar w={18} h={18} color={GROUND} r={5} />
              </Row>
            </Row>
          ))}
        </Col>
        <Panel pad={13}>
          <Col gap={9}>
            <Row justify="space-between">
              <Text size={11} color={FAINT}>
                Subtotal
              </Text>
              <Text size={11}>£48.20</Text>
            </Row>
            <Row justify="space-between">
              <Text size={12} weight={600}>
                Total
              </Text>
              <Text size={14} weight={600} track={-0.02}>
                £51.70
              </Text>
            </Row>
            <Btn tone={p.tone} w="100%">
              Book a slot
            </Btn>
          </Col>
        </Panel>
      </Col>
    </Col>
  )
}

/* ── 11 · Search ───────────────────────────────────────────────────────── */

function Search(p: MockProps) {
  return (
    <Col gap={0} style={{ height: '100%' }}>
      <Col gap={11} style={{ padding: `${p.mobile ? 16 : 24}px ${pad(p.mobile)}px 0` }}>
        <Row gap={9}>
          <div
            style={{
              flex: 1,
              height: 36,
              borderRadius: 99,
              border: `1px solid ${ACCENT[p.tone]}`,
              background: PAPER,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 13px',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 99,
                border: `1.5px solid ${FAINT}`,
              }}
            />
            <Text size={11}>oat milk</Text>
          </div>
        </Row>
        <Row gap={6} style={{ flexWrap: 'wrap' }}>
          <Chip active tone={p.tone}>
            Bought before
          </Chip>
          <Chip tone={p.tone}>On offer</Chip>
          <Chip tone={p.tone}>Dairy free</Chip>
          {!p.mobile && <Chip tone={p.tone}>Own brand</Chip>}
        </Row>
      </Col>
      <Col gap={10} style={{ padding: pad(p.mobile), flex: 1, minHeight: 0 }}>
        <Label size={9}>Bought before · 4</Label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: p.mobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: 11,
          }}
        >
          {Array.from({ length: p.mobile ? 4 : 4 }).map((_, i) => (
            <Panel key={i} pad={9} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Thumb h={p.mobile ? 66 : 84} tone={p.tone} seed={i} />
              <Col gap={5}>
                <Bar w="78%" h={5} color="#dfe3ea" />
                <Row justify="space-between">
                  <Text size={11} weight={600}>
                    £1.{40 + i * 5}
                  </Text>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      background: ACCENT[p.tone],
                      display: 'grid',
                      placeItems: 'center',
                      color: PAPER,
                      fontSize: 11,
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    +
                  </div>
                </Row>
              </Col>
            </Panel>
          ))}
        </div>
        <Label size={9}>Other results · 38</Label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: p.mobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: 11,
            flex: 1,
            minHeight: 0,
          }}
        >
          {Array.from({ length: p.mobile ? 4 : 8 }).map((_, i) => (
            <Panel key={i} pad={9} style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <Thumb h={p.mobile ? 54 : 70} tone="neutral" seed={i + 4} />
              <Bar w="66%" h={4} color={RULE} />
            </Panel>
          ))}
        </div>
      </Col>
    </Col>
  )
}

/* ── 12 · Settings / governance ────────────────────────────────────────── */

function Settings(p: MockProps) {
  return (
    <Col gap={0} style={{ height: '100%' }}>
      <TopBar {...p} title="Atlas" />
      <Row align="stretch" style={{ flex: 1, minHeight: 0 }}>
        {!p.mobile && <Sidebar tone={p.tone} items={['Foundations', 'Governance']} />}
        <Col gap={14} style={{ flex: 1, padding: pad(p.mobile), minWidth: 0 }}>
          <Col gap={6}>
            <Text size={p.mobile ? 14 : 17} weight={600} track={-0.025}>
              Contribution
            </Text>
            <Label size={9}>RFC 041 · Proposed · 3 reviewers</Label>
          </Col>
          {[
            ['Proposal', 'Complete'],
            ['Design review', 'Complete'],
            ['Accessibility check', 'In review'],
            ['Engineering spike', 'Not started'],
            ['Documentation', 'Not started'],
          ].map(([step, state], i) => (
            <Panel key={step} pad={12}>
              <Row justify="space-between">
                <Row gap={10}>
                  <Label size={9}>{`0${i + 1}`}</Label>
                  <Text size={11} weight={500}>
                    {step}
                  </Text>
                </Row>
                <Row gap={7}>
                  {i < 2 && (
                    <div
                      style={{
                        width: 13,
                        height: 13,
                        borderRadius: 99,
                        background: ACCENT.positive,
                      }}
                    />
                  )}
                  <Label size={8} color={i < 2 ? ACCENT.positive : FAINT}>
                    {state}
                  </Label>
                </Row>
              </Row>
            </Panel>
          ))}
          <Panel pad={13} style={{ flex: 1, background: GROUND }}>
            <Col gap={10}>
              <Label size={9}>Adoption · by product</Label>
              {[
                ['Product A', 0.92],
                ['Product B', 0.74],
                ['Product C', 0.41],
              ].map(([n, v]) => (
                <Col key={n as string} gap={5}>
                  <Row justify="space-between">
                    <Text size={10} color="var(--m-body)">
                      {n as string}
                    </Text>
                    <Label size={8}>{Math.round((v as number) * 100)}%</Label>
                  </Row>
                  <div style={{ height: 4, borderRadius: 99, background: RULE }}>
                    <div
                      style={{
                        width: `${(v as number) * 100}%`,
                        height: '100%',
                        borderRadius: 99,
                        background: ACCENT[p.tone],
                      }}
                    />
                  </div>
                </Col>
              ))}
            </Col>
          </Panel>
        </Col>
      </Row>
    </Col>
  )
}

/* ── 13 · Tokens plate ─────────────────────────────────────────────────── */

function Tokens(p: MockProps) {
  const swatches: [string, string, string][] = [
    ['surface.page', '#FAF7F2', 'Ground'],
    ['content.primary', '#17161B', 'Ink'],
    ['content.secondary', '#45424B', 'Ink soft'],
    ['accent.default', '#5C3A6D', 'Plum'],
    ['status.success', '#35624A', 'Signal'],
    ['border.subtle', '#DED6C9', 'Rule'],
  ]
  return (
    <Col gap={p.mobile ? 14 : 20} style={{ height: '100%', padding: p.mobile ? 18 : 30 }}>
      <Row justify="space-between">
        <Label size={9}>Foundations · colour</Label>
        <Label size={9}>Semantic → raw</Label>
      </Row>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: p.mobile ? '1fr 1fr' : 'repeat(3, 1fr)',
          gap: p.mobile ? 10 : 14,
        }}
      >
        {swatches.map(([name, hex, raw]) => (
          <Col key={name} gap={8}>
            <div
              style={{
                height: p.mobile ? 46 : 64,
                borderRadius: 8,
                background: hex,
                border: `1px solid ${RULE}`,
              }}
            />
            <Col gap={4}>
              <Label size={8} color={INK} track={0.1}>
                {name}
              </Label>
              <Row justify="space-between">
                <Label size={8}>{hex}</Label>
                <Label size={8}>{raw}</Label>
              </Row>
            </Col>
          </Col>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: p.mobile ? 12 : 18 }}>
        <Col gap={p.mobile ? 10 : 14}>
          <Label size={9}>Foundations · type & space</Label>
          <Col gap={9}>
            {[
              ['display.lg', 22, 'Designing the system'],
              ['heading.md', 15, 'Component states'],
              ['body.default', 12, 'Interface copy at a comfortable reading size'],
              ['apparatus', 10, 'LABEL · METADATA · COUNT'],
            ].map(([n, s, sample]) => (
              <Row key={n as string} gap={14} align="baseline">
                <div style={{ width: p.mobile ? 74 : 104, flexShrink: 0 }}>
                  <Label size={8}>{n as string}</Label>
                </div>
                {n === 'apparatus' ? (
                  <Label size={10} color={INK}>
                    {sample as string}
                  </Label>
                ) : (
                  <Text size={s as number} weight={n === 'display.lg' ? 600 : 400} track={-0.025}>
                    {sample as string}
                  </Text>
                )}
              </Row>
            ))}
          </Col>
          <Row gap={7} align="flex-end">
            {[4, 8, 12, 16, 24, 32, 48].map((s) => (
              <Col key={s} gap={5} style={{ alignItems: 'center' }}>
                <div
                  style={{
                    width: s,
                    height: s,
                    background: `${ACCENT[p.tone]}22`,
                    border: `1px solid ${ACCENT[p.tone]}55`,
                    borderRadius: 2,
                  }}
                />
                <Label size={7}>{s}</Label>
              </Col>
            ))}
          </Row>
        </Col>
      </div>
    </Col>
  )
}

/* ── 14 · Component sheet ──────────────────────────────────────────────── */

function Components(p: MockProps) {
  return (
    <Col gap={p.mobile ? 14 : 20} style={{ height: '100%', padding: p.mobile ? 18 : 30 }}>
      <Row justify="space-between">
        <Label size={9}>Component · Button</Label>
        <Label size={9}>v2.4 · 6 states</Label>
      </Row>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: p.mobile ? '1fr 1fr' : 'repeat(3, 1fr)',
          gap: p.mobile ? 10 : 16,
        }}
      >
        {['Default', 'Hover', 'Focus', 'Loading', 'Disabled', 'Destructive'].map((s, i) => (
          <Panel key={s} pad={12}>
            <Col gap={10}>
              <Label size={8}>{s}</Label>
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '7px 13px',
                    borderRadius: 9,
                    background: i === 4 ? '#f2f4f7' : i === 5 ? '#b42318' : ACCENT[p.tone],
                    opacity: i === 1 ? 0.86 : 1,
                    color: i === 4 ? '#667085' : PAPER,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 11,
                    fontWeight: 500,
                    outline: i === 2 ? `2px solid ${ACCENT[p.tone]}` : 'none',
                    outlineOffset: 2,
                  }}
                >
                  {i === 3 && (
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 99,
                        border: '1.5px solid #ffffff',
                        borderTopColor: 'transparent',
                        display: 'inline-block',
                      }}
                    />
                  )}
                  Save changes
                </span>
              </div>
            </Col>
          </Panel>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: p.mobile ? 12 : 18, flex: 1 }}>
        <Row gap={p.mobile ? 12 : 22} align="flex-start" style={{ flexWrap: 'wrap' }}>
          <Col gap={9}>
            <Label size={8}>Inputs</Label>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: p.mobile ? 140 : 190,
                  height: 32,
                  borderRadius: 9,
                  border: `1px solid ${i === 1 ? '#d92d20' : RULE}`,
                  background: PAPER,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px',
                }}
              >
                <Bar w={i === 1 ? 84 : 110} h={5} color={RULE} />
              </div>
            ))}
            <Label size={7} color="#d92d20">
              Enter a valid email
            </Label>
          </Col>
          <Col gap={9}>
            <Label size={8}>Chips</Label>
            <Row gap={6} style={{ flexWrap: 'wrap', maxWidth: p.mobile ? 150 : 210 }}>
              <Chip active tone={p.tone} removable>
                Selected
              </Chip>
              <Chip tone={p.tone}>Default</Chip>
              <Chip tone={p.tone}>Disabled</Chip>
            </Row>
          </Col>
          {!p.mobile && (
            <Col gap={9}>
              <Label size={8}>Status</Label>
              {[
                ['Published', ACCENT.positive],
                ['In review', ACCENT.accent],
                ['Archived', FAINT],
              ].map(([t, c]) => (
                <Row key={t as string} gap={7}>
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 2,
                      background: c as string,
                      transform: 'rotate(45deg)',
                    }}
                  />
                  <Text size={10} color="var(--m-body)">
                    {t as string}
                  </Text>
                </Row>
              ))}
            </Col>
          )}
          {!p.mobile && (
            <Col gap={9} style={{ flex: 1, minWidth: 200 }}>
              <Label size={8}>Card · densities</Label>
              <Row gap={10} align="stretch">
                {['Comfortable', 'Compact'].map((d, i) => (
                  <Panel key={d} pad={i === 0 ? 11 : 7} style={{ flex: 1 }}>
                    <Col gap={i === 0 ? 8 : 5}>
                      <Row gap={7}>
                        <Avatar i={i + 2} size={i === 0 ? 20 : 14} />
                        <Bar w={i === 0 ? 74 : 58} h={4} color="#dfe3ea" />
                      </Row>
                      <Lines rows={2} w={i === 0 ? 130 : 104} h={3.5} gap={i === 0 ? 6 : 4} />
                      <Label size={7}>{d.toUpperCase()}</Label>
                    </Col>
                  </Panel>
                ))}
              </Row>
            </Col>
          )}
        </Row>
      </div>
      <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: p.mobile ? 12 : 16 }}>
        <Row justify="space-between" align="flex-end">
          <Col gap={8}>
            <Label size={8}>Focus order</Label>
            <Row gap={6}>
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    border: `1px ${n === 2 ? 'solid' : 'dashed'} ${n === 2 ? ACCENT[p.tone] : RULE}`,
                    display: 'grid',
                    placeItems: 'center',
                    outline: n === 2 ? `2px solid ${ACCENT[p.tone]}` : 'none',
                    outlineOffset: 2,
                  }}
                >
                  <Label size={7} color={n === 2 ? ACCENT[p.tone] : FAINT} track={0}>
                    {n}
                  </Label>
                </div>
              ))}
            </Row>
          </Col>
          {!p.mobile && (
            <Row gap={16} align="flex-end">
              <Col gap={6} style={{ alignItems: 'center' }}>
                <Label size={7}>Motion</Label>
                <Graduation w={110} count={22} tone={p.tone} />
              </Col>
              <Label size={8}>AA · 4.5:1 verified</Label>
            </Row>
          )}
        </Row>
      </div>
    </Col>
  )
}

/* ── 15 · Wireframe ────────────────────────────────────────────────────── */

function Wireframe(p: MockProps) {
  const stroke = '#98a2b3'
  return (
    <Col gap={0} style={{ height: '100%', background: GROUND, padding: p.mobile ? 16 : 28 }}>
      <Col gap={12} style={{ height: '100%' }}>
        <Row justify="space-between">
          <Label size={9}>Low fidelity · v3</Label>
          <Label size={9}>Not final</Label>
        </Row>
        <Row gap={12} align="stretch" style={{ flex: 1, minHeight: 0 }}>
          {!p.mobile && (
            <Col
              gap={9}
              style={{ width: 150, border: `1px dashed ${stroke}`, borderRadius: 6, padding: 12 }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <Bar key={i} w={i % 2 ? 88 : 106} h={7} color="#dfe3ea" />
              ))}
            </Col>
          )}
          <Col gap={12} style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                border: `1px dashed ${stroke}`,
                borderRadius: 6,
                height: p.mobile ? 90 : 130,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Label size={9}>HERO / KEY CONTENT</Label>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: p.mobile ? '1fr 1fr' : 'repeat(3, 1fr)',
                gap: 12,
                flex: 1,
              }}
            >
              {Array.from({ length: p.mobile ? 4 : 6 }).map((_, i) => (
                <Col
                  key={i}
                  gap={8}
                  style={{ border: `1px dashed ${stroke}`, borderRadius: 6, padding: 10 }}
                >
                  <div style={{ height: p.mobile ? 34 : 44, background: '#e9ecf1', borderRadius: 4 }} />
                  <Bar w="80%" h={5} color="#dfe3ea" />
                  <Bar w="55%" h={5} color="#e4e7ec" />
                </Col>
              ))}
            </div>
          </Col>
        </Row>
        <Row gap={9} align="flex-start">
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 99,
              border: `1px solid ${ACCENT[p.tone]}`,
              color: ACCENT[p.tone],
              display: 'grid',
              placeItems: 'center',
              fontSize: 9,
              fontFamily: 'var(--font-mono)',
              flexShrink: 0,
            }}
          >
            1
          </div>
          <Text size={10} color="var(--m-body)" lh={1.5}>
            Annotation: the primary action stays fixed here at every breakpoint — nothing below the
            fold is required to complete the task.
          </Text>
        </Row>
      </Col>
    </Col>
  )
}

/* ── 16 · Flow diagram ─────────────────────────────────────────────────── */

function Flow(p: MockProps) {
  const steps = ['Select', 'Transfer', 'Describe', 'Tag', 'Process', 'Live']
  return (
    <Col gap={p.mobile ? 14 : 22} style={{ height: '100%', padding: p.mobile ? 18 : 32 }}>
      <Row justify="space-between">
        <Label size={9}>Revised flow</Label>
        <Label size={9}>6 steps · 3 required fields</Label>
      </Row>
      <Col gap={p.mobile ? 10 : 0} style={{ flex: 1, justifyContent: 'center' }}>
        <div
          style={{
            display: p.mobile ? 'grid' : 'flex',
            gridTemplateColumns: p.mobile ? '1fr 1fr' : undefined,
            alignItems: 'center',
            gap: p.mobile ? 10 : 0,
          }}
        >
          {steps.map((s, i) => (
            <Row key={s} gap={0} align="center" style={{ flex: p.mobile ? undefined : 1 }}>
              <Col
                gap={7}
                style={{
                  flex: 1,
                  border: `1px solid ${i === 1 ? ACCENT[p.tone] : RULE}`,
                  background: i === 1 ? `${ACCENT[p.tone]}0f` : PAPER,
                  borderRadius: 8,
                  padding: p.mobile ? 10 : 13,
                }}
              >
                <Label size={8} color={i === 1 ? ACCENT[p.tone] : FAINT}>
                  {`0${i + 1}`}
                </Label>
                <Text size={p.mobile ? 11 : 12} weight={500}>
                  {s}
                </Text>
              </Col>
              {!p.mobile && i < steps.length - 1 && (
                <svg width="30" height="10" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <line x1="0" y1="5" x2="24" y2="5" stroke={RULE} strokeWidth="1" />
                  <path d="M24,2 L29,5 L24,8" fill="none" stroke={RULE} strokeWidth="1" />
                </svg>
              )}
            </Row>
          ))}
        </div>
      </Col>
      <Col gap={11} style={{ borderTop: `1px solid ${RULE}`, paddingTop: p.mobile ? 12 : 18 }}>
        {[
          ['Parallel', 'Metadata is captured while the file transfers — never before it.'],
          ['Recoverable', 'Leaving at any step preserves progress, including partial input.'],
        ].map(([k, v]) => (
          <Row key={k} gap={12} align="flex-start">
            <div style={{ width: p.mobile ? 68 : 92, flexShrink: 0 }}>
              <Label size={8} color={ACCENT[p.tone]}>
                {k}
              </Label>
            </div>
            <Text size={10} color="var(--m-body)" lh={1.5}>
              {v}
            </Text>
          </Row>
        ))}
      </Col>
    </Col>
  )
}

/* ── 17 · Journey map ──────────────────────────────────────────────────── */

function Journey(p: MockProps) {
  const stages = p.mobile
    ? ['Start', 'Details', 'Wait', 'Done']
    : ['Open', 'Select', 'Form', 'Upload', 'Wait', 'Publish']
  const emotion = p.mobile ? [0.62, 0.28, 0.14, 0.72] : [0.62, 0.5, 0.22, 0.34, 0.14, 0.72]
  const w = p.mobile ? 320 : 900
  const h = p.mobile ? 100 : 150
  const pts = emotion.slice(0, stages.length).map((v, i) => [
    (i * w) / (stages.length - 1),
    h - v * h,
  ])
  const d = pts
    .map((pt, i) => {
      if (i === 0) return `M${pt[0]},${pt[1]}`
      const prev = pts[i - 1]
      const cx = (prev[0] + pt[0]) / 2
      return `C${cx},${prev[1]} ${cx},${pt[1]} ${pt[0]},${pt[1]}`
    })
    .join(' ')
  return (
    <Col gap={p.mobile ? 12 : 20} style={{ height: '100%', padding: p.mobile ? 18 : 32 }}>
      <Row justify="space-between">
        <Label size={9}>Journey · current state</Label>
        <Label size={9}>Drop-off marked ▽</Label>
      </Row>
      <Row gap={0} style={{ borderBottom: `1px solid ${RULE}`, paddingBottom: 8 }}>
        {stages.map((s) => (
          <div key={s} style={{ flex: 1 }}>
            <Label size={8}>{s}</Label>
          </div>
        ))}
      </Row>
      <div style={{ position: 'relative', flex: 1 }}>
        <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" y1={h * g} x2={w} y2={h * g} stroke={RULE_SOFT} strokeWidth="1" />
          ))}
          <path d={`${d} L${w},${h} L0,${h} Z`} fill={ACCENT[p.tone]} opacity="0.07" />
          <path d={d} fill="none" stroke={ACCENT[p.tone]} strokeWidth="1.75" />
          {pts.map((pt, i) => (
            <circle
              key={i}
              cx={pt[0]}
              cy={pt[1]}
              r={emotion[i] < 0.25 ? 5 : 3.5}
              fill={emotion[i] < 0.25 ? '#d92d20' : PAPER}
              stroke={emotion[i] < 0.25 ? '#d92d20' : ACCENT[p.tone]}
              strokeWidth="1.75"
            />
          ))}
        </svg>
      </div>
      <Col gap={9} style={{ borderTop: `1px solid ${RULE}`, paddingTop: p.mobile ? 11 : 16 }}>
        {[
          ['▽ 01', 'Fourteen fields before anything begins transferring.'],
          ['▽ 02', 'Processing with no state — silence reads as failure.'],
        ].map(([k, v]) => (
          <Row key={k} gap={12} align="flex-start">
            <div style={{ width: 46, flexShrink: 0 }}>
              <Label size={8} color="#d92d20">
                {k}
              </Label>
            </div>
            <Text size={10} color="var(--m-body)" lh={1.5}>
              {v}
            </Text>
          </Row>
        ))}
      </Col>
    </Col>
  )
}

/* ── 18 · Information architecture ─────────────────────────────────────── */

function IA(p: MockProps) {
  const tree: [string, string[]][] = [
    ['Discover', ['By position', 'By level', 'By region', 'Saved searches']],
    ['Athlete', ['Profile', 'Highlights', 'Measurables']],
    ['Upload', ['Transfer', 'Details', 'Status']],
    ['Scout tools', ['Shortlists', 'Comparisons', 'Notes']],
  ]
  return (
    <Col gap={p.mobile ? 14 : 22} style={{ height: '100%', padding: p.mobile ? 18 : 32 }}>
      <Row justify="space-between">
        <Label size={9}>Information architecture</Label>
        <Label size={9}>4 top-level · 14 nodes</Label>
      </Row>
      <Row gap={p.mobile ? 10 : 18} align="flex-start" style={{ flex: 1, flexWrap: 'wrap' }}>
        {tree.slice(0, p.mobile ? 2 : 4).map(([root, kids], gi) => (
          <Col key={root} gap={10} style={{ flex: 1, minWidth: p.mobile ? 120 : 0 }}>
            <div
              style={{
                border: `1px solid ${gi === 0 ? ACCENT[p.tone] : RULE}`,
                background: gi === 0 ? `${ACCENT[p.tone]}0f` : PAPER,
                borderRadius: 9,
                padding: '9px 11px',
              }}
            >
              <Text size={11} weight={500}>
                {root}
              </Text>
            </div>
            <Col gap={7} style={{ paddingLeft: 12, borderLeft: `1px solid ${RULE}` }}>
              {kids.map((k) => (
                <div
                  key={k}
                  style={{
                    border: `1px solid ${RULE_SOFT}`,
                    background: PAPER,
                    borderRadius: 6,
                    padding: '7px 9px',
                  }}
                >
                  <Text size={10} color="var(--m-body)">
                    {k}
                  </Text>
                </div>
              ))}
            </Col>
          </Col>
        ))}
      </Row>
    </Col>
  )
}

/* ── 19 · Sketch ───────────────────────────────────────────────────────── */

function Sketch(p: MockProps) {
  const s = '#98a2b3'
  return (
    <Col gap={p.mobile ? 12 : 18} style={{ height: '100%', padding: p.mobile ? 18 : 32, background: '#f2f4f7' }}>
      <Row justify="space-between">
        <Label size={9}>Sketch · exploration</Label>
        <Label size={9}>3 of 11</Label>
      </Row>
      <Row gap={p.mobile ? 10 : 18} align="stretch" style={{ flex: 1 }}>
        {[0, 1, 2].slice(0, p.mobile ? 2 : 3).map((i) => (
          <Col
            key={i}
            gap={9}
            style={{
              flex: 1,
              border: `1px solid ${RULE}`,
              borderRadius: 8,
              padding: p.mobile ? 11 : 15,
              background: '#ffffff',
            }}
          >
            <Label size={8} color={i === 1 ? ACCENT[p.tone] : FAINT}>
              {['OPTION A', 'OPTION B', 'OPTION C'][i]}
            </Label>
            <svg width="100%" height={p.mobile ? 120 : 190} aria-hidden="true">
              <rect x="4" y="4" width="88%" height="26" rx="3" fill="none" stroke={s} strokeWidth="1.1" />
              {i === 1 && (
                <rect x="4" y="36" width="88%" height="12" rx="6" fill={`${ACCENT[p.tone]}33`} stroke={ACCENT[p.tone]} strokeWidth="1" />
              )}
              {Array.from({ length: 3 }).map((_, r) => (
                <rect
                  key={r}
                  x="4"
                  y={(i === 1 ? 58 : 40) + r * 34}
                  width="88%"
                  height="26"
                  rx="3"
                  fill="none"
                  stroke={s}
                  strokeWidth="1.1"
                  strokeDasharray={i === 2 && r === 2 ? '4 3' : undefined}
                />
              ))}
              <line
                x1="8"
                y1={p.mobile ? 108 : 172}
                x2="60%"
                y2={p.mobile ? 108 : 172}
                stroke={s}
                strokeWidth="1.1"
              />
            </svg>
            <Text size={9} color="var(--m-body)" lh={1.5}>
              {
                [
                  'Sequential — shorter, still gated.',
                  'Parallel — transfer starts first.',
                  'Deferred — publish now, tag later.',
                ][i]
              }
            </Text>
          </Col>
        ))}
      </Row>
    </Col>
  )
}

/* ── 20 · Invoice / document ───────────────────────────────────────────── */

function Invoice(p: MockProps) {
  return (
    <Col gap={0} style={{ height: '100%' }}>
      <TopBar {...p} title="Invoice 041" />
      <Col gap={13} style={{ padding: pad(p.mobile), flex: 1, minHeight: 0 }}>
        <Panel pad={13} style={{ border: `1px solid ${ACCENT[p.tone]}44`, background: `${ACCENT[p.tone]}0b` }}>
          <Col gap={9}>
            <Row justify="space-between">
              <Label size={9} color={ACCENT[p.tone]}>
                Overdue · 6 days
              </Label>
              <Dial size={26} pct={0.62} tone={p.tone} />
            </Row>
            <Text size={11} lh={1.45}>
              A firm follow-up is ready to send. Nothing goes out until you approve it.
            </Text>
            <Row gap={7}>
              <Btn tone={p.tone}>Approve &amp; send</Btn>
              <Btn variant="ghost">Edit wording</Btn>
            </Row>
          </Col>
        </Panel>
        <Panel pad={13} style={{ flex: 1, minHeight: 0 }}>
          <Col gap={11} style={{ height: '100%' }}>
            <Row justify="space-between">
              <Col gap={5}>
                <Label size={9}>Billed to</Label>
                <Bar w={92} h={5} color="#dfe3ea" />
              </Col>
              <Col gap={5} style={{ alignItems: 'flex-end' }}>
                <Label size={9}>Due</Label>
                <Text size={11} weight={500}>
                  14 Jul
                </Text>
              </Col>
            </Row>
            <div style={{ borderTop: `1px solid ${RULE_SOFT}` }} />
            {Array.from({ length: p.mobile ? 5 : 4 }).map((_, i) => (
              <Row key={i} justify="space-between" style={{ paddingBottom: 8, borderBottom: `1px solid ${RULE_SOFT}` }}>
                <Col gap={5}>
                  <Bar w={p.mobile ? 92 : 150} h={5} color="#dfe3ea" />
                  <Label size={8}>{`${4 + i} DAYS · DESIGN`}</Label>
                </Col>
                <Text size={11}>£{(480 + i * 120).toLocaleString()}</Text>
              </Row>
            ))}
            <div style={{ flex: 1 }} />
            <Col gap={7} style={{ background: GROUND, borderRadius: 8, padding: 11 }}>
              <Label size={8}>Reminder log</Label>
              {[
                ['Day 0', 'Invoice sent'],
                ['Day 14', 'Gentle nudge · approved'],
                ['Day 30', 'Firm follow-up · awaiting you'],
              ].map(([d, t], i) => (
                <Row key={d} gap={9}>
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 99,
                      marginTop: 3,
                      background: i < 2 ? ACCENT.positive : ACCENT[p.tone],
                      opacity: i < 2 ? 1 : 0.45,
                    }}
                  />
                  <Label size={7} color={FAINT}>
                    {d}
                  </Label>
                  <Text size={9.5} color="var(--m-body)">
                    {t}
                  </Text>
                </Row>
              ))}
            </Col>
            <Row justify="space-between">
              <Text size={12} weight={600}>
                Total due
              </Text>
              <Text size={15} weight={600} track={-0.02}>
                £2,140
              </Text>
            </Row>
          </Col>
        </Panel>
      </Col>
    </Col>
  )
}

/* ── Registry ──────────────────────────────────────────────────────────── */

export const MOCKS: Record<MockKey, (p: MockProps) => React.ReactElement> = {
  feed: Feed,
  upload: Upload,
  profile: Profile,
  dashboard: Dashboard,
  table: Table,
  form: Form,
  calendar: Calendar,
  chat: Chat,
  onboarding: Onboarding,
  checkout: Checkout,
  search: Search,
  settings: Settings,
  tokens: Tokens,
  components: Components,
  wireframe: Wireframe,
  flow: Flow,
  journey: Journey,
  ia: IA,
  sketch: Sketch,
  invoice: Invoice,
}
