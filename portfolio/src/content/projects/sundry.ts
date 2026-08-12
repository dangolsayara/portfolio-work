import type { Project } from '../types'

/* ═══════════════════════════════════════════════════════════════════════════
   PLATE 05 — SUNDRY
   ▲ SAMPLE CASE STUDY. The structure is the deliverable; the copy is a
     placeholder written to show you the shape of a strong narrative. Replace
     the words, keep the eleven beats. All figures under `impact.metrics` are
     invented for layout purposes — swap them for measured results or delete
     them and keep `qualitative` only.
   ═══════════════════════════════════════════════════════════════════════════ */

export const sundry: Project = {
  slug: 'sundry',
  index: '05',
  title: 'Sundry',
  subtitle: 'The same shop, every week, treated as a first visit every time.',
  tags: ['Research', 'Product Design', 'UI/UX', 'Mobile'],
  meta: {
    role: 'Product Designer (Research-led)',
    platform: 'iOS + Android',
    year: '2024',
    industry: 'E-commerce / Grocery',
    team: '1 designer · 1 researcher · 5 engineers',
    timeline: '12 weeks',
  },
  impactLine: 'Rebuilt around recall rather than search — repeat shops finished in half the time, with fewer forgotten staples.',
  layout: 'full',
  cover: {
    kind: 'search',
    frame: 'mobile',
    tone: 'positive',
    label: 'FIG. 01 — RE-FINDING',
    alt: 'Sundry mobile search screen showing previously purchased items ranked first, each stamped with when it was last bought.',
  },

  study: {
    /* 01 ─────────────────────────────────────────────────────────────────── */
    challenge: {
      statement: 'The weekly shop is a habit. The app kept asking people to invent it from scratch.',
      body: [
        'Sundry is a grocery app for a regional supermarket chain: order a basket, pick a delivery slot, receive it the next morning. Most of its revenue comes from households who order most weeks, buying largely the same forty or so items.',
        'The product did not know that. Every session opened on a merchandised catalogue — seasonal banners, offers, a search field — as though the customer had arrived to discover food. Customers responded by using search as a manual index of their own past, typing "oat milk" for the fortieth time.',
        'Retention past the fourth order was where the business hurt, and it was framed internally as a relevance problem: better search, better recommendations. I was brought in to run the research that would justify that roadmap. It did not.',
      ],
    },

    /* 02 ─────────────────────────────────────────────────────────────────── */
    context: {
      body: [
        'The chain had 68 stores and a picking operation that ran between 05:00 and 09:00, staff walking the aisles with handheld scanners filling customer baskets from real shelves. Anything the customer had not decided by midnight became a decision the picker made for them.',
        'The customer base skewed older and more habitual than the team pictured. Two-thirds of orders came from households on their fifth order or later, and those households bought a median 71% of the same items as their previous shop. The app was tuned for the first order and the first order alone.',
        'I joined with a research-led remit and twelve weeks: five to understand, four to explore and test, three to specify and hand off. The mandate was explicitly to disconfirm — the head of product asked me to try to kill the search-relevance plan before engineering spent two quarters on it.',
      ],
      facts: [
        { label: 'My role', value: 'Product Designer — research design, synthesis, IA, flows, UI, handoff' },
        { label: 'Timeline', value: '12 weeks; research through specification' },
        { label: 'Team', value: 'Me, one researcher, five engineers (three mobile, two backend)' },
        { label: 'Research base', value: '14 diary households · 9 in-home visits · 11 shop-alongs · 240k baskets' },
        { label: 'Surfaces', value: 'Native iOS and Android; shared design spec, platform-native patterns' },
      ],
      constraints: [
        'Stock and pricing came from the retailer’s inventory system on a 20-minute refresh — the app could never promise live availability',
        'Substitution decisions had to be captured before the 05:00 pick, so every choice belonged in the ordering flow, not in a notification later',
        'Purchase history existed for 18 months but only at SKU level; a packaging change read as an entirely new product',
        'No new backend service in scope — purchase cadence had to be derived from existing order history in the BFF layer',
        'The retailer’s own accessibility standard required legibility at 200% text scale, which ruled out the dense product grids the category defaults to',
      ],
    },

    /* 03 ─────────────────────────────────────────────────────────────────── */
    understanding: {
      intro:
        'A grocery shop is not done in an app. It is done in a kitchen, from memory, in ten interrupted minutes. So I refused to study it in a lab — every method here was built to catch people mid-habit, and two of them were designed specifically to prove me wrong.',
      methods: [
        {
          label: 'Two-week diary study · 14 households',
          detail:
            'Participants sent a voice note at the moment they added anything to a basket or a paper list, plus a photo of the shelf or fridge they were standing in front of. I asked for the moment, not the day, because reconstructed shopping is fiction — people remember planning a shop they actually assembled in fragments across four days. The voice notes were the single most valuable artefact of the project: two-thirds of them contained a sentence of the form "I think we still have…".',
        },
        {
          label: 'In-home observation · 9 households',
          detail:
            'Kitchen walkthroughs. I mapped where staples lived, what "running low" physically looked like, and what people checked before ordering. Nobody made a list from the cupboard; they made it from a mental model of the cupboard, and were wrong about it roughly a fifth of the time. Four households kept a duplicate of something they had bought twice because neither person could remember whether the other had.',
        },
        {
          label: 'Shop-alongs · 11 sessions',
          detail:
            'Six in-app, five in the physical store with the same customers, thinking aloud. The comparison was the point. In-store, substitution is a two-second glance — the shelf shows you the alternative and you accept or reject it standing there. In-app, that decision had no home, so people either abandoned the item or accepted whatever arrived. Watching the same person do both made the missing interaction obvious.',
        },
        {
          label: 'Quantitative basket analysis · 240k baskets, 18 months',
          detail:
            'Sitting with the analyst, I looked at three things: how often each item repeated per household, the interval between repeats, and what search queries actually resolved to. 68% of searches ended on an item the household had bought before. Repeat intervals were tight and item-specific — milk every 5–8 days, washing powder every 6–9 weeks — which meant cadence was predictable from history without any new model.',
        },
        {
          label: 'Substitution and refusal log review',
          detail:
            'Nine months of picker substitution records cross-read against refunds and driver notes. Refusals were not random: customers accepted a different size of the same thing readily and refused a different brand of anything they cooked with. The log told me what the interface needed to let people say, and in what vocabulary — brand, size, or "anything equivalent" — before I designed a control for it.',
        },
      ],
      painPoints: [
        {
          title: 'Every visit began at zero',
          body: 'The home screen was merchandising. A household’s forty-item staple set had no representation anywhere in the product, so it was reassembled by hand, by search, every single week. The app’s most valuable knowledge about a customer was in the database and nowhere in the interface.',
        },
        {
          title: '"Do I already have this?" was the real work',
          body: 'The hard part of ordering groceries is not finding the product. It is remembering the state of your kitchen. People stood in front of open cupboards mid-order, or guessed and got it wrong — buying a third jar of paprika, or missing the one thing the week depended on.',
        },
        {
          title: 'Substitution was a decision made in someone else’s absence',
          body: 'When an item was out, a picker chose at 06:20 and the customer found out at the door. Even good substitutions read as an imposition, because nobody had asked. The interface had opinions about product photography and none about the moment that generated most of the complaints.',
        },
        {
          title: 'Saved lists stored SKUs, not intentions',
          body: 'The existing "favourites" list pinned exact product IDs. When the dairy supplier changed a carton, a customer’s milk quietly became unavailable and the list showed an error where a staple used to be. People stopped trusting the feature and went back to typing.',
        },
      ],
      competitors: [
        {
          name: 'National supermarket app',
          note: 'Has a genuine repeat-order feature and buries it three taps deep beneath promotions. Capability without placement — customers in our sessions did not know it existed.',
        },
        {
          name: 'Rapid-delivery app',
          note: 'Excellent for a forgotten top-up in twenty minutes. No concept of a weekly rhythm at all, so it competes for the gap, not the shop.',
        },
        {
          name: 'Recipe-first meal planner',
          note: 'Generates a basket from a meal plan, which is elegant and ignores the cupboard entirely. It will happily sell you cumin you already own — the same blind spot we had, arrived at from the opposite direction.',
        },
      ],
      visual: {
        kind: 'journey',
        frame: 'bare',
        tone: 'neutral',
        label: 'FIG. 02 — THE SHAPE OF A WEEK',
        caption:
          'Diary data plotted as one household’s week. The shop is not an event; it accumulates in fragments, mostly while standing in the kitchen.',
        alt: 'A journey map of one household’s week showing basket additions scattered across four days, clustered around meal times and kitchen visits.',
      },
    },

    /* 04 ─────────────────────────────────────────────────────────────────── */
    insight: {
      statement: 'People don’t shop from a list of products. They shop from a memory of their kitchen.',
      support: [
        'This contradicted the assumption the whole team held, mine included: that search was the bottleneck. It was not — search was the workaround. 68% of queries were re-finds, and the heaviest searchers were our most loyal customers, not our most confused ones. We had mistaken a symptom of good retention for a discovery failure, and were about to spend two quarters making the workaround faster.',
        'It also contradicted a study the company had run the previous year, which concluded that customers wanted a richer catalogue and more inspiration. That research was not sloppy; it was set in a lab, with a fictional shopping list, on first-time baskets. It measured the only mode it could create. When we looked at real fifth-plus orders, inspiration browsing was a real but separate behaviour — a small Sunday-evening mode, not the weekly shop. I wrote that reconciliation up explicitly rather than quietly overriding it, because the previous study was right about the situation it observed.',
        'The two costs customers actually carry are recall ("what do we need?") and substitution ("is this close enough?"). Neither is a retrieval problem, and neither gets cheaper with better ranking. So the brief changed: build an interface that remembers on the customer’s behalf, and let them pre-answer the substitution question while they still care about the item.',
      ],
    },

    /* 05 ─────────────────────────────────────────────────────────────────── */
    experience: {
      intro:
        'I restructured the app around one rule: the customer should never have to hold in their head anything the system already knows. The home screen stopped being a shop window and became a working surface — their items, ordered by how overdue each one is, with the substitution question asked at the point of adding rather than left to a stranger at dawn.',
      flow: [
        {
          step: '01',
          label: 'Open',
          detail: 'The app opens on "Your usual" — the household’s own items, ranked by purchase cadence, not by margin. Merchandising moves one tab across, where it still performs for the Sunday-evening browse.',
        },
        {
          step: '02',
          label: 'Recall',
          detail: 'Every row carries a plain stamp: "last bought 12 days ago · usually every 7". The app holds the kitchen inventory the customer was previously holding in their head, and says it in words rather than implying it with a badge.',
        },
        {
          step: '03',
          label: 'Add or skip',
          detail: 'One tap adds; one tap skips for this week. Skipping is a first-class action because it is information — it teaches cadence and quietly demotes the item next time instead of nagging.',
        },
        {
          step: '04',
          label: 'Substitute',
          detail: 'Each added item takes a substitution preference inline: exact item only, any size of this brand, or anything equivalent. Set once, remembered per item, in the customer’s own vocabulary rather than the picker’s.',
        },
        {
          step: '05',
          label: 'Gaps',
          detail: 'Before checkout, at most six items the household usually buys in this shop and has not added. A recall prompt, capped and dismissible — it is a question, not a cross-sell, and nothing sponsored is ever allowed in it.',
        },
        {
          step: '06',
          label: 'Confirm',
          detail: 'The order summary states what will happen if something is out of stock, item by item, before the pick runs. Nothing about the delivery should be a surprise the customer did not authorise.',
        },
      ],
      ia: [
        { label: 'Your shop', children: ['Your usual', 'Gaps', 'Lists', 'Past orders'] },
        { label: 'Browse', children: ['Aisles', 'Offers', 'Seasonal', 'Recipes'] },
        { label: 'Basket', children: ['Items', 'Substitutions', 'Delivery slot', 'Payment'] },
        { label: 'Account', children: ['Orders', 'Dietary & allergens', 'Addresses', 'Preferences'] },
      ],
      visual: {
        kind: 'flow',
        frame: 'bare',
        tone: 'positive',
        label: 'FIG. 03 — REPEAT-SHOP FLOW',
        caption:
          'The revised path for a returning household. Substitution is answered at add time; the recall prompt sits before checkout, where it is still actionable.',
        alt: 'A six-step flow diagram of the repeat grocery shop, beginning at a cadence-ranked list of usual items and ending at an order confirmation stating substitution rules.',
      },
    },

    /* 06 ─────────────────────────────────────────────────────────────────── */
    exploring: {
      intro:
        'Three structures came out of sketching and each one tested a different theory of the problem: retrieval, recall, or prediction. I prototyped all three with eight households doing a real shop, and the one I rejected changed the final design more than the one I kept.',
      options: [
        {
          label: 'A',
          title: 'Better search, history-weighted',
          body: 'Leave the structure alone. Fix ranking so previously bought items surface first, add typo tolerance, remember recent queries.',
          verdict: 'rejected',
          why: 'It worked exactly as intended and missed the point. Taps per item dropped, and the number of forgotten staples did not move at all — participants still finished the shop without the thing they had run out of. Faster retrieval cannot solve a recall problem. It shipped anyway, later, as a small improvement rather than a strategy.',
          visual: {
            kind: 'search',
            frame: 'mobile',
            tone: 'neutral',
            label: 'FIG. 04 — OPTION A',
            caption: 'History-weighted search. Measurably faster per item, and no help with the items nobody thought to type.',
            alt: 'Mobile search results with previously purchased products ranked at the top and recent queries listed below the field.',
          },
        },
        {
          label: 'B',
          title: 'Usual-first home, ranked by cadence',
          body: 'The household’s own items become the landing surface, ordered by how overdue each is. Add, skip, and a substitution preference per item.',
          verdict: 'chosen',
          why: 'Participants stopped narrating what they needed and started reacting to what they saw — the recall work moved out of their heads and onto the screen. Two people finished a full weekly shop without opening search once, which had not happened in any earlier session. It also needed no new infrastructure: cadence fell out of order history we already had.',
          visual: {
            kind: 'feed',
            frame: 'mobile',
            tone: 'positive',
            label: 'FIG. 05 — OPTION B',
            caption: 'Cadence-ranked usual items with plain-language recall stamps. Merchandising still exists — one tab across.',
            alt: 'Mobile home screen listing a household’s regular grocery items, each with a note saying when it was last bought and how often it is usually bought.',
          },
        },
        {
          label: 'C',
          title: 'Predicted basket, ready to edit',
          body: 'The app assembles the whole weekly basket from cadence before the customer arrives. They review, remove what they do not want, and check out.',
          verdict: 'rejected',
          why: 'Rejected on trust, not accuracy. Participants would not audit a basket they had not assembled — three of eight checked out with an item they did not want because scanning felt like someone else’s admin, and two abandoned when they found a wrong item early and stopped believing the rest. But it is the most useful thing I built: the cadence model written for the prediction became the ranking behind "Your usual", and its leftover "you usually buy these" panel became the pre-checkout recall prompt. The prediction was right; presenting it as a finished decision was wrong.',
          visual: {
            kind: 'sketch',
            frame: 'bare',
            tone: 'accent',
            label: 'FIG. 06 — OPTION C',
            caption: 'The rejected auto-basket. Its prediction logic survived; its framing as a completed basket did not.',
            alt: 'Sketch of a pre-filled grocery basket concept with predicted items and remove controls, annotated with test observations.',
          },
        },
      ],
    },

    /* 07 ─────────────────────────────────────────────────────────────────── */
    system: {
      intro:
        'Grocery interfaces default to density: small photographs, promotional colour everywhere, six typefaces of urgency. That is unreadable at 200% text scale and it makes status invisible, because when everything shouts, "this will be substituted" cannot be heard. I built a restrained vocabulary first, so each colour and weight had exactly one job.',
      colors: [
        {
          name: 'Ground',
          hex: '#F7F8FA',
          role: 'App surface behind every screen. Warm and low-contrast so product photography and price are the brightest things present, and long lists do not glare in a dark kitchen.',
        },
        {
          name: 'Ink',
          hex: '#101828',
          role: 'Product names, prices and all recall stamps. Carries the entire information hierarchy through weight and size alone, so nothing critical depends on hue.',
        },
        {
          name: 'Indigo',
          hex: '#4F46E5',
          role: 'The one interactive accent: add, adjust, and current selection. Restricted to things the customer can act on, which keeps promotional surfaces from borrowing it.',
        },
        {
          name: 'Signal',
          hex: '#0E9384',
          role: 'Confirmed and in-stock states only — item added, substitution rule set, order placed. It appears at most twice per screen; it is a status colour, never a brand one.',
        },
        {
          name: 'Rule',
          hex: '#E4E7EC',
          role: 'Row dividers, sheet edges and basket structure. Does the work shadows and cards usually do, so a hundred-item list stays legible without a hundred containers.',
        },
      ],
      type: [
        { name: 'Display', role: 'Screen titles and section headers', sample: 'Your usual' },
        { name: 'Body', role: 'Product names and interface copy, 17px baseline, scales to 200%', sample: 'Semi-skimmed milk, 2 pints' },
        { name: 'Apparatus', role: 'Recall stamps, prices, quantities, unit costs', sample: 'LAST BOUGHT 12 DAYS AGO · USUALLY EVERY 7' },
      ],
      components: [
        { name: 'Product row', note: 'One component across usual, search, aisle and basket. Comfortable and compact densities; states for in-stock, low, unavailable and discontinued.' },
        { name: 'Recall stamp', note: 'The cadence sentence. Four variants — due, overdue, recently bought, not enough history — with copy written before the visual, and no variant that implies blame.' },
        { name: 'Substitution selector', note: 'Three-way inline control: exact only, any size of this brand, anything equivalent. Defaults per category, overridable per item, and always shown as text as well as position.' },
        { name: 'Quantity stepper', note: 'Handles units, weights and multipacks from one control. 48px targets, hold-to-repeat, and an undo window instead of a confirmation on removal.' },
        { name: 'Recall sheet', note: 'The pre-checkout gap prompt. Hard cap of six items, dismissible, never sponsored — a constraint written into the component so it cannot be quietly monetised later.' },
        { name: 'Allergen flag', note: 'Set from account dietary preferences and surfaced on the row, not behind a tap. Uses icon, text and position together; never colour alone.' },
      ],
      outcome:
        'Thirty-one components with documented states replaced two parallel platform libraries that had drifted apart over three years. The measurable benefit was in review time: the substitution flow shipped on both platforms from one spec, and the engineers stopped filing tickets asking which positive meant "in stock".',
    },

    /* 08 ─────────────────────────────────────────────────────────────────── */
    final: {
      intro:
        'The finished app is quieter than what it replaced and does less per screen. A returning customer sees their own shopping habits first and the catalogue second, which is the inversion the research paid for.',
      screens: [
        {
          kind: 'feed',
          frame: 'mobile',
          tone: 'positive',
          label: 'FIG. 07 — YOUR USUAL',
          caption: 'The landing surface: the household’s own items, ranked by how overdue each is, with add and skip weighted equally.',
          alt: 'Mobile screen titled Your usual, listing regular grocery items with recall stamps and add or skip controls on each row.',
        },
        {
          kind: 'search',
          frame: 'mobile',
          tone: 'neutral',
          label: 'FIG. 08 — RE-FINDING',
          caption: 'Search still exists and now behaves like a memory aid: previously bought items first, each stamped with when it was last bought.',
          alt: 'Mobile search results screen with previously purchased items grouped at the top under a bought before heading.',
        },
        {
          kind: 'checkout',
          frame: 'mobile',
          tone: 'accent',
          label: 'FIG. 09 — BASKET & SUBSTITUTIONS',
          caption: 'Every line states what happens if the item is out. The customer answers the substitution question while they still care about the item.',
          alt: 'Mobile basket screen where each item shows its substitution rule, above a delivery slot and total.',
        },
        {
          kind: 'profile',
          frame: 'mobile',
          tone: 'neutral',
          label: 'FIG. 10 — HOUSEHOLD PREFERENCES',
          caption: 'Dietary needs, allergens and default substitution rules per category. Set once, applied to every row thereafter.',
          alt: 'Mobile account preferences screen listing dietary requirements, allergen flags and default substitution rules by category.',
        },
      ],
    },

    /* 09 ─────────────────────────────────────────────────────────────────── */
    prototype: {
      intro:
        'I prototyped in full on a phone rather than in a review tool, because the whole argument lives in one-handed, interrupted use — someone standing at an open fridge with a toddler talking. Anything that needed two hands or full attention failed on contact.',
      interactions: [
        { name: 'Add without leaving the row', detail: 'Tapping add commits in place with a 160ms settle and no navigation. The list never re-sorts under the finger; re-ranking waits until the next session so the surface stays predictable mid-shop.' },
        { name: 'Skip as an equal action', detail: 'Skip sits beside add at the same visual weight and dismisses the row for the week. It records the interval, so a fortnightly item stops presenting weekly instead of being ignored weekly.' },
        { name: 'Substitution in a half sheet', detail: 'The three-way control opens over the row without losing place. Choosing dismisses immediately; not choosing leaves the category default, which is stated in the sheet rather than assumed.' },
        { name: 'Recall prompt before checkout', detail: 'Six items maximum, presented as a question with add and not-this-week on each. Dismissing is one tap and it does not return in the same session — a prompt that reappears is a prompt nobody trusts.' },
        { name: 'Optimistic adds, queued offline', detail: 'Kitchens have poor signal. Adds apply locally at once and reconcile when the connection returns; a failed add surfaces as a specific, retryable line rather than a lost tap.' },
        { name: 'Reduced motion and 200% text', detail: 'Every transition has an instant equivalent, and the sheet, the stepper and every row were tested at 200% scale before sign-off. Nothing depends on motion or truncation to be understood.' },
      ],
    },

    /* 10 ─────────────────────────────────────────────────────────────────── */
    impact: {
      intro:
        'Measured over the ten weeks after release against the ten before, limited to households on their fifth order or later — the group the redesign was aimed at.',
      metrics: [
        { value: '−52%', label: 'Time to complete a repeat shop', note: 'Median, app open to order placed, fifth-plus orders' },
        { value: '−41%', label: 'Searches per shop', note: 'Almost entirely the re-finding of items already bought before' },
        { value: '+27%', label: 'Staples recalled before checkout', note: 'Usual items reaching the basket without a search, including via the recall prompt' },
        { value: '−34%', label: 'Substitution refusals', note: 'Delivered substitutes refused at the door or refunded afterwards' },
      ],
      qualitative: [
        'Customer-service calls about missing items changed character rather than only dropping in volume: the remaining ones were about stock, not about surprise, because the substitution rule had already been agreed.',
        'Pickers reported the rules were more useful than the old free-text "notes to picker" field, which they had largely stopped reading. Designing for the customer’s vocabulary happened to fix an internal tool nobody had asked me to look at.',
        'The research reconciliation outlasted the project. Writing down why the previous year’s study reached a different conclusion — and where it was still right — gave the team a way to hold two findings at once instead of declaring the older one wrong.',
      ],
    },

    /* 11 ─────────────────────────────────────────────────────────────────── */
    reflection: {
      worked:
        'Studying the habit where it happens. Diary voice notes and kitchen visits produced the insight that reframed the whole roadmap, and neither would have surfaced in a moderated session — "I think we still have some" is not a sentence anyone says in a lab.',
      didnt:
        'I pushed a manual "Cupboard" feature into the first release: let people record what they already own. It was a straight contradiction of my own insight — I had spent five weeks proving that tracking your kitchen is the work people want removed, then shipped a screen asking them to do it by hand. Under 4% of households added a second item and I cut it in the following release. I built it because it was the tidiest answer to the problem statement, not because anyone in the research wanted it.',
      improve:
        'My cadence model assumed a weekly rhythm, and I recruited weekly shoppers, so my sample cheerfully confirmed it. Shift-work households and people splitting a shop across two homes got told they were overdue for milk they had bought elsewhere. I would recruit for irregularity on purpose next time, and I would let people mute the cadence on an item instead of only skipping it.',
      learned:
        'That recall and retrieval are different problems, and most products confuse them — a faster search is the wrong answer to "what do we need?". I now ask what the person is holding in their head, and treat every one of those things as something the interface has been offered the chance to carry.',
    },
  },
}
