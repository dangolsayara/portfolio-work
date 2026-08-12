import type { Project } from '../types'

/* ═══════════════════════════════════════════════════════════════════════════
   PLATE 02 — LEDGERLINE
   ▲ SAMPLE CASE STUDY. The structure is the deliverable; the copy is a
     placeholder written to show you the shape of a strong narrative. Replace
     the words, keep the eleven beats. All figures under `impact.metrics` are
     invented for layout purposes — swap them for measured results or delete
     them and keep `qualitative` only.
   ═══════════════════════════════════════════════════════════════════════════ */

export const ledgerline: Project = {
  slug: 'ledgerline',
  index: '02',
  title: 'Ledgerline',
  subtitle: 'Freelancers know exactly who owes them. They just will not ask twice.',
  tags: ['Product Design', 'UI/UX', 'Mobile'],
  meta: {
    role: 'Product Designer',
    platform: 'iOS + Android',
    year: '2025',
    industry: 'Fintech / Independent Work',
    team: '2 designers · 3 engineers',
    timeline: '10 weeks',
  },
  impactLine: 'Follow-ups went from a decision people avoided to one they made in advance — invoices paid 11 days sooner.',
  layout: 'split',
  cover: {
    kind: 'invoice',
    frame: 'mobile',
    tone: 'accent',
    label: 'FIG. 01 — INVOICE',
    alt: 'Ledgerline invoice screen on mobile: line items, an amount due, a payment status stripe and a scheduled reminder plan beneath it.',
  },

  study: {
    /* 01 ─────────────────────────────────────────────────────────────────── */
    challenge: {
      statement: 'The hardest part of getting paid is not the invoice. It is the second message.',
      body: [
        'Ledgerline is an invoicing and payment-tracking app for independent workers — designers, editors, translators, contractors. Send an invoice, watch it, get paid.',
        'The sending worked. People created invoices, the delivery rate was fine, the numbers were correct. What did not happen was anything after that. Overdue invoices sat overdue. The average unpaid invoice in our beta aged 41 days past its due date with no action taken on it at all.',
        'The team read that as a notification problem and had already specced a better reminders engine. I asked to spend two weeks finding out why people were ignoring the reminders we already sent them. The reminders were reaching the freelancer. The freelancer was the one refusing to forward the message on.',
      ],
    },

    /* 02 ─────────────────────────────────────────────────────────────────── */
    context: {
      body: [
        'Our users were sole operators with between two and eleven active clients. Invoicing was maybe twenty minutes of their month and the least professionalised part of their business. Most had no contract, no late fee clause, and no separate business email.',
        'The critical detail is relational. A freelancer with four clients does not have four accounts receivable; they have four relationships, one of which is usually paying the rent. Chasing a payment is not an administrative act to them. It is a risk to next quarter.',
        'I joined at the point where the roadmap said "automated reminders" and nobody had asked what a reminder costs the person sending it.',
      ],
      facts: [
        { label: 'My role', value: 'Product Designer — research, flows, UI, copy system, handoff' },
        { label: 'Timeline', value: '10 weeks, one release plus a controlled rollout' },
        { label: 'Team', value: 'Me and one other designer, three engineers, no dedicated PM' },
        { label: 'Surfaces', value: 'Native iOS and Android; a read-only web invoice for the client' },
      ],
      constraints: [
        'Reminders send from our domain on the user\'s behalf — legal required the user to approve every outgoing message',
        'No payment rail of our own; we link out to bank transfer or a card processor and receive webhooks with a lag of up to 90 minutes',
        'Clients never install anything. Everything on their side is one link, no account, no login',
        'Three engineers total, so the reminder scheduler had to reuse the existing notification service unchanged',
      ],
    },

    /* 03 ─────────────────────────────────────────────────────────────────── */
    understanding: {
      intro:
        'I needed to know what happens in the gap between "this invoice is overdue" and "I did nothing about it". Analytics could tell me the gap existed. Only interviews told me what people were feeling inside it.',
      methods: [
        {
          label: '14 freelancer interviews',
          detail:
            'Across six trades and three countries. I opened every session by asking them to show me their oldest unpaid invoice, then to draft the message they would send about it. Nine of the fourteen started typing, stopped, and deleted it.',
        },
        {
          label: '3-week diary study, 9 participants',
          detail:
            'A short prompt each time an invoice went overdue: what did you do, and what stopped you. The word that recurred was not "busy". It was "weird" — as in, "it felt weird to bring it up".',
        },
        {
          label: 'Beta account analysis',
          detail:
            'Looked at 1,240 invoices. Reminders were available and free. Fewer than one in five overdue invoices ever got one. The users who did send follow-ups sent them to their smallest clients.',
        },
        {
          label: 'Public forum audit',
          detail:
            'Read roughly 400 posts across freelancing communities about late payment. Almost none asked how to track an invoice. Nearly all asked for wording — "how do I say this without sounding rude".',
        },
        {
          label: 'Competitive teardown',
          detail:
            'Walked the overdue path in three invoicing tools. Each one could automate a chase and each one made the user write it or switch it on. The blank text field was everywhere.',
        },
      ],
      painPoints: [
        {
          title: 'Writing the message was the whole task',
          body: 'Our app got the user to a compose screen in two taps, then handed them an empty field. Every participant treated that field as a tone problem, not a typing problem. Drafting a four-line reminder took people upwards of ten minutes, and often ended in nothing being sent.',
        },
        {
          title: 'Sending felt like an accusation',
          body: 'Freelancers assumed a follow-up would be read as distrust. They would rather absorb a 40-day delay than risk being the person who implied a client was not good for the money. Several said they would only chase a client they had decided not to work with again.',
        },
        {
          title: 'Overdue had no useful middle',
          body: 'The app showed paid and overdue. Nothing in between. A client who was four days late looked identical to one who had gone quiet for two months, so the list gave no signal about which situation actually needed a person.',
        },
        {
          title: 'Automation was all or nothing',
          body: 'The one setting we had was a global toggle for auto-reminders. Nobody turned it on. Handing over every client at once, with no idea what would go out or when, was a bigger leap than writing the message by hand.',
        },
      ],
      competitors: [
        { name: 'Invoicing tool A', note: 'Full automation, buried in settings, phrased as a bulk rule. Powerful, and users could not picture what it would say to a specific client.' },
        { name: 'Invoicing tool B', note: 'Beautiful invoices, a blank compose box for follow-ups. Solves the part nobody was stuck on.' },
        { name: 'Spreadsheet plus email', note: 'What most participants actually used. Tracking was fine. The chase never happened here either, which told me the tool was not the variable.' },
      ],
      visual: {
        kind: 'journey',
        frame: 'bare',
        tone: 'neutral',
        label: 'FIG. 02 — THE GAP',
        caption:
          'The overdue path, annotated with what people said at each point. Effort falls after the due date; hesitation climbs. The two curves cross at the compose screen.',
        alt: 'A journey map of an invoice going overdue, with a rising hesitation curve peaking at the moment the freelancer must write a follow-up message.',
      },
    },

    /* 04 ─────────────────────────────────────────────────────────────────── */
    insight: {
      statement: 'Nobody was avoiding the work of chasing. They were avoiding authorship of it.',
      support: [
        'The blocker was social, not mechanical. Participants could describe the message they needed to send in one sentence out loud. Typing it made them the author of a demand, and authorship was the part they would not pay for.',
        'So the design question changed. Not "how do we make follow-ups easier to write", but "how do we make them not the user\'s to write". If the app is the sender and the user is the approver, the awkwardness has somewhere else to sit.',
        'The second half of the insight came from timing. Hesitation was near zero at the moment an invoice was created — the relationship was warm, the money was not yet late, and a reminder was a hypothetical. It peaked on day 30, exactly when we were asking for the decision. We were collecting consent at the worst possible moment.',
        'That gave us the move: get the decision made up front, when it is cheap, and reduce the overdue moment to a yes. A commitment made in advance, honoured by the app on the user\'s behalf.',
      ],
    },

    /* 05 ─────────────────────────────────────────────────────────────────── */
    experience: {
      intro:
        'I rebuilt the invoice around a reminder plan attached at creation. The user chooses when the app will follow up before there is anything to be awkward about, sees the exact wording it will use, and later gets a single approval card instead of a blank field. Two taps to honour a decision they already made.',
      flow: [
        { step: '01', label: 'Create', detail: 'Line items, amount, due date. Client details persist from last time, so a repeat invoice is three fields.' },
        { step: '02', label: 'Set the plan', detail: 'Three reminders proposed by default: due date, plus seven days, plus twenty-one. Each one shows its actual text. Any of them can be removed here.' },
        { step: '03', label: 'Send', detail: 'One link to the client. No account for them, no download, a visible way to pay on the same screen as the amount.' },
        { step: '04', label: 'Track', detail: 'Four states, not two: sent, viewed, due soon, overdue. Viewed matters — it separates "has not seen it" from "has seen it and not paid".' },
        { step: '05', label: 'Approve', detail: 'On the scheduled day, a card with the finished message. Send, edit, or skip this one. Skipping keeps the rest of the plan intact.' },
        { step: '06', label: 'Settle', detail: 'Payment marks the invoice paid, cancels every remaining reminder in the plan, and says so explicitly. Nothing goes out after the money arrives.' },
      ],
      ia: [
        { label: 'Invoices', children: ['Open', 'Overdue', 'Paid', 'Drafts', 'Recurring'] },
        { label: 'Clients', children: ['Contact details', 'Payment history', 'Average days to pay', 'Reminder preferences'] },
        { label: 'Reminders', children: ['Waiting for approval', 'Scheduled', 'Sent', 'Message library'] },
        { label: 'Money', children: ['Paid this month', 'Outstanding', 'Payment methods', 'Export'] },
      ],
      visual: {
        kind: 'flow',
        frame: 'bare',
        tone: 'accent',
        label: 'FIG. 03 — REMINDER PLAN',
        caption:
          'The decision moves left, to invoice creation. The overdue moment collapses from a writing task into an approval.',
        alt: 'A six-step flow diagram showing a reminder plan set at invoice creation and later surfaced as single approval cards.',
      },
    },

    /* 06 ─────────────────────────────────────────────────────────────────── */
    exploring: {
      intro:
        'Three structures got built far enough to test with real overdue invoices. One of the two I rejected is responsible for the single best part of the shipped design, which is why I keep it in the deck.',
      options: [
        {
          label: 'A',
          title: 'Tone ladder',
          body: 'Keep the compose screen, remove the blank page. Pick a tone — friendly, firm, final — and the app drafts the message. Later reminders climb the ladder automatically.',
          verdict: 'rejected',
          why: 'Choosing a tone turned out to be the same act as writing one. Participants deliberated over "firm" exactly as long as they had deliberated over a blank field, because the choice was still an accusation with their name on it. What it did teach me was that people would not commit to anything until they had read the actual sentence. Every draft after this one showed the literal message text, at plan-setting and again at approval. That came straight out of a failed concept.',
        },
        {
          label: 'B',
          title: 'Plan at creation, approve on the day',
          body: 'Reminders are scheduled when the invoice is written, with visible wording and a neutral register. On the scheduled day the user gets a card with a finished message and one tap to send it.',
          verdict: 'chosen',
          why: 'Hesitation at creation was almost nil — eleven of twelve testers accepted the default plan without editing it. On the day, approval took a median of nine seconds against ten-plus minutes to compose. And the framing did the real work: users described the reminder as something the app does, not something they did. One said "it is just the system, it is not me being difficult". That sentence is the product.',
        },
        {
          label: 'C',
          title: 'Full automation, silent',
          body: 'Switch it on once. The app chases every overdue invoice on a fixed schedule without telling the user in advance.',
          verdict: 'rejected',
          why: 'Legally impossible for us — approval of outgoing messages was a hard requirement — and wrong anyway. Testers wanted the veto, not for control but for one specific case each: the client going through something, the client they had already spoken to that morning. Silent automation would have sent exactly the message they most needed to hold back. It did make me add per-client pausing, which covers that case without removing the approval step.',
          visual: {
            kind: 'sketch',
            frame: 'bare',
            tone: 'neutral',
            label: 'FIG. 04 — EXPLORATION',
            caption: 'Concept sketches for the three overdue models. The middle column became the shipped plan.',
            alt: 'Rough concept sketches comparing a tone-selection compose screen, a scheduled reminder plan, and a silent automation toggle.',
          },
        },
      ],
    },

    /* 07 ─────────────────────────────────────────────────────────────────── */
    system: {
      intro:
        'This product talks about money to people who are anxious about money. Colour had to carry state without editorialising, and copy had to be part of the system rather than something written per screen. I specced the words with the same rigour as the components.',
      colors: [
        { name: 'Ground', hex: '#F7F8FA', role: 'App surface. Warm and paper-like so an invoice reads as a document rather than a banking dashboard.' },
        { name: 'Ink', hex: '#101828', role: 'Amounts, line items and all primary text. Off-black, because pure black at this size reads harsher than it needs to.' },
        { name: 'Indigo', hex: '#4F46E5', role: 'The single primary action per screen, and the current step in a reminder plan. One accent, so "this is the thing to do next" is never ambiguous.' },
        { name: 'Signal', hex: '#0E9384', role: 'Paid, and nothing else. It appears once in an invoice\'s life. Overdue deliberately gets no red — the state is communicated by position, label and elapsed days, because tinting a client\'s lateness red made testers less willing to act, not more.' },
        { name: 'Rule', hex: '#E4E7EC', role: 'Invoice rules, list dividers, table structure. Structure drawn with lines instead of shadows, matching the document metaphor.' },
      ],
      type: [
        { name: 'Display', role: 'Amounts and screen titles', sample: '£2,400.00 due' },
        { name: 'Body', role: 'Interface copy and reminder text, 16px baseline', sample: 'Just a note that invoice 118 was due on 3 March. Payment details are in the link below.' },
        { name: 'Apparatus', role: 'Labels, dates, states, tabular figures', sample: 'INV 118 · OVERDUE 12D · VIEWED' },
      ],
      components: [
        { name: 'Status stripe', note: 'Sent, viewed, due soon, overdue, paid. Each state has a shape and a word, never colour alone. Overdue also carries a day count, because "12 days" prompts action and "overdue" does not.' },
        { name: 'Reminder card', note: 'The approval unit. Full message text, recipient, scheduled date, and three actions: send, edit, skip. Never collapsed into a summary — the whole point is reading what will go out.' },
        { name: 'Plan timeline', note: 'The reminder sequence as a vertical rail on the invoice. Sent, scheduled and cancelled states. Visible on the invoice itself, not hidden in settings.' },
        { name: 'Amount field', note: 'Currency-aware, tabular figures, no spinner. Tax handled as a modifier row so the total never has to be calculated by the user.' },
        { name: 'Client row', note: 'Name, outstanding total, average days to pay. The average is the honest signal — it lets someone see a habitually slow payer without us labelling anyone.' },
        { name: 'Empty and quiet states', note: 'Written first. "Nothing overdue" is a real screen with a real sentence, because most days that is the screen users see.' },
      ],
      outcome:
        'Thirty-one components with documented states, and a message library of nine reminder templates reviewed by legal once rather than per feature. The template work was the load-bearing part: because tone was decided at the system level, no engineer or designer ever had to make a judgement call about how firm a sentence should be.',
    },

    /* 08 ─────────────────────────────────────────────────────────────────── */
    final: {
      intro:
        'The shipped app is quieter than what we started with. Most of the design effort went into two screens the user spends nine seconds in, and into the sentences printed on them.',
      screens: [
        {
          kind: 'invoice',
          frame: 'mobile',
          tone: 'accent',
          label: 'FIG. 05 — INVOICE',
          caption: 'The invoice carries its own reminder plan. Status, days elapsed and what happens next are all on one screen.',
          alt: 'Mobile invoice detail screen with line items, total due, a status stripe reading overdue 12 days, and a vertical reminder plan timeline.',
        },
        {
          kind: 'form',
          frame: 'mobile',
          tone: 'accent',
          label: 'FIG. 06 — APPROVAL',
          caption: 'The approval card. Full message text, no compose field, three choices. Skip affects this reminder only.',
          alt: 'Mobile approval card showing a complete pre-written reminder message with send, edit and skip actions.',
        },
        {
          kind: 'dashboard',
          frame: 'mobile',
          tone: 'neutral',
          label: 'FIG. 07 — OUTSTANDING',
          caption: 'Money owed, grouped by how late it is rather than by client. Reminders waiting for approval sit at the top.',
          alt: 'Mobile dashboard listing outstanding invoices grouped by lateness, with a section of reminders awaiting approval.',
        },
        {
          kind: 'checkout',
          frame: 'mobile',
          tone: 'positive',
          label: 'FIG. 08 — CLIENT VIEW',
          caption: 'What the client sees: one link, the amount, and a way to pay it on the same screen. No account, no app.',
          alt: 'Client-facing payment page showing the invoice amount, payment options and a bank transfer reference, with no login required.',
        },
      ],
    },

    /* 09 ─────────────────────────────────────────────────────────────────── */
    prototype: {
      intro:
        'I prototyped the approval moment before anything else, because the whole argument was about how it felt to press send. You cannot review nine seconds of relief in a static frame.',
      interactions: [
        { name: 'Plan defaults', detail: 'Three reminders appear pre-filled at invoice creation, already valid. Doing nothing produces the recommended behaviour; the work is only in removing one.' },
        { name: 'Message reveal', detail: 'Tapping a scheduled reminder expands the literal text in 200ms. No summarising, no placeholder tokens left unresolved — what you read is what sends.' },
        { name: 'Send confirmation', detail: 'The button commits immediately, then the plan timeline marks that step sent. No modal asking if you are sure. Asking twice reintroduces the hesitation we removed.' },
        { name: 'Skip without penalty', detail: 'Skip dismisses one reminder and states in words that the rest of the plan continues. The undo window is eight seconds and does not require a dialog.' },
        { name: 'Paid arrives late', detail: 'Payment webhooks can lag 90 minutes, so the paid state animates in whenever it lands and cancels remaining reminders with an explicit line: "2 reminders cancelled." Silence here would be unforgivable.' },
        { name: 'Reduced motion', detail: 'Every transition has an instant equivalent. The status stripe never relies on animation to communicate a change of state.' },
      ],
    },

    /* 10 ─────────────────────────────────────────────────────────────────── */
    impact: {
      intro:
        'Measured across the twelve weeks after rollout, compared with the twelve weeks before, on accounts active in both windows.',
      metrics: [
        { value: '−11 days', label: 'Average time to payment', note: 'From due date to funds received' },
        { value: '76%', label: 'Invoices with a plan attached', note: 'Against 19% of overdue invoices ever receiving a manual reminder' },
        { value: '81%', label: 'Reminders approved as written', note: 'Edited 12%, skipped 7%' },
        { value: '9s', label: 'Median time to approve', note: 'Previously 10+ minutes to compose, frequently abandoned' },
      ],
      qualitative: [
        'Users stopped describing follow-ups as confrontations. In post-release calls the recurring framing was that the app had sent it, and several said the reminder was easier to defend to a client precisely because it read as automatic.',
        'The per-client pause — added only because a rejected concept exposed the need — turned out to be used by nearly a third of accounts. People wanted a way to protect one relationship without switching the system off.',
        'Removing red from the overdue state was the change I expected to be argued with and never was. Nobody missed the alarm, and support saw no confusion about which invoices needed attention.',
      ],
    },

    /* 11 ─────────────────────────────────────────────────────────────────── */
    reflection: {
      worked:
        'Asking people to draft the message in front of me. Watching nine of fourteen delete what they had typed was worth more than any survey, and it reframed the project from a scheduling problem into an authorship problem in a single afternoon.',
      didnt:
        'I wrote the reminder templates for a client who is merely forgetful. They are neutral, brief, and completely useless at day 60, when the situation is no longer a misunderstanding. We shipped with no escalation at all, and support started fielding "what do I send now" within a fortnight — the exact question I thought I had solved. I had over-corrected against option A\'s tone ladder and thrown out the part of it that was right.',
      improve:
        'I would design the late stages of the plan first, not last. Day 60 is where the product is genuinely needed and it is the case I gave the least thought to. I would also test the plan defaults with a client the user is afraid of, rather than an average one — our sample of relationships was too comfortable.',
      learned:
        'That a blank field is a design decision, and usually a way of handing the hardest part of a task back to the user. When someone stalls in a flow, the useful question is not what step they are on but what the step is asking them to be responsible for. Since this project I write the sentence the product will say before I draw the screen it says it on.',
    },
  },
}
