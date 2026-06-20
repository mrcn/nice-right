export type StudyStatus = 'built' | 'candidate' | 'composed';

export type Study = {
  slug: string;
  title: string;
  eyebrow: string;
  status: StudyStatus;
  hypothesis: string;
  primaryObject: string;
  mentalModel: string;
  orca: string[];
  ixd: string[];
  ia: string;
  yagni: string[];
  plg: string;
  try: string[];
  decision: string;
};

export const builtStudies: Study[] = [
  {
    slug: 'retelling-style-fidelity',
    title: 'Retelling Style + Fidelity',
    eyebrow: 'Study 01 · Core transformation model',
    status: 'built',
    hypothesis: 'Users will understand the product better if Persona / Retelling Style and Fidelity are separate controls.',
    primaryObject: 'Retelling',
    mentalModel: 'Persona colors the medium; Fidelity controls distance from source.',
    orca: ['Retelling belongs to a Passage', 'Retelling has a Persona', 'Retelling has a Fidelity setting', 'Retelling produces output text'],
    ixd: ['Choose a persona', 'Move fidelity', 'Watch preview change', 'Apply and play'],
    ia: 'Retelling controls should be contextual to the Passage, not buried in Settings.',
    yagni: ['No voice picker in this study', 'No reading-grade bucket', 'No preset list mixing TikTok with 6th grade'],
    plg: 'A striking before/after retelling becomes the shareable product artifact after aha.',
    try: ['Pick Bedtime storyteller', 'Move from Close to Freer', 'Switch to TikTok influencer', 'Confirm Fidelity changes distance, not persona'],
    decision: 'Should Retelling Style + Fidelity become the core transformation UI?',
  },
  {
    slug: 'passage-stage',
    title: 'Passage-first Stage',
    eyebrow: 'Study 02 · Root object / IA spine',
    status: 'built',
    hypothesis: 'The app should organize around Passage, not Reader / History / Voice chrome.',
    primaryObject: 'Passage',
    mentalModel: 'A user brings in a Passage, compares Original and Understand, then listens.',
    orca: ['Passage has Original', 'Passage has Retellings', 'Passage has Performance', 'Passage has Listening Sessions'],
    ixd: ['Choose a sample', 'Enter Passage stage', 'Toggle Original / Understand', 'Generate then Play'],
    ia: 'Passage is the main stage; Continue/Library is secondary; Performance is contextual.',
    yagni: ['No bottom nav', 'No persistent voice bar', 'No Settings-first setup'],
    plg: 'Samples act as proof passages that create aha before paste/import.',
    try: ['Choose a proof sample', 'Generate Understand', 'Toggle back to Original', 'Play the retelling'],
    decision: 'Should Passage become the root app object?',
  },
  {
    slug: 'performance-capability',
    title: 'Performance Capability',
    eyebrow: 'Study 03 · Voice / premium model',
    status: 'built',
    hypothesis: 'Premium is more compelling when framed as expressive performance capability, not generic cloud voice quality.',
    primaryObject: 'Performance',
    mentalModel: 'Voice is the instrument; capability determines whether it can perform the selected style.',
    orca: ['Performance belongs to Retelling', 'Performance uses a Voice', 'Voice has capability', 'Premium unlocks some capabilities'],
    ixd: ['Compare local neutral read', 'Preview expressive performance', 'See capability boundary', 'Upgrade only after value is shown'],
    ia: 'Voice belongs inside Performance, not permanent app chrome.',
    yagni: ['No universal premium claim', 'No paywall before aha', 'No pretending all voices perform every style'],
    plg: 'Premium preview is a product-led upgrade moment triggered by perceived value.',
    try: ['Compare Local vs Expressive', 'Read the capability language', 'Check whether free still feels useful'],
    decision: 'Should premium be positioned around style-following expressive performance?',
  },
  {
    slug: 'sample-aha',
    title: 'Sample Aha',
    eyebrow: 'Study 04 · First-session proof',
    status: 'built',
    hypothesis: 'First-run should begin with curated proof passages before asking users to paste their own text.',
    primaryObject: 'Sample / Proof Passage',
    mentalModel: 'A Sample is a curated Passage designed to prove the app quickly.',
    orca: ['Sample is a Passage', 'Sample has recommended Style', 'Sample has recommended Fidelity', 'Sample produces proof quickly'],
    ixd: ['Tap sample', 'See before/after', 'Hear retelling', 'Then paste own text'],
    ia: 'Samples belong in the empty state and onboarding, not a buried demo gallery.',
    yagni: ['No account creation first', 'No blank paste-only start', 'No multi-step onboarding'],
    plg: 'Aha comes from a sample; the growth ask follows proof, not before it.',
    try: ['Tap each sample card', 'Notice the recommended retelling recipe', 'Use Paste your own only after seeing proof'],
    decision: 'Should samples be P0 onboarding objects?',
  },
  {
    slug: 'compare-trust',
    title: 'Compare / Trust',
    eyebrow: 'Study 05 · Trust model',
    status: 'built',
    hypothesis: 'Serious texts need enough Original ↔ Understand comparison to create trust without turning the app into a study tool.',
    primaryObject: 'Original / Retelling pair',
    mentalModel: 'Trust comes from controlled comparison: source on one side, listenable retelling on the other, with distance explained only when needed.',
    orca: ['Original belongs to Passage', 'Retelling belongs to Passage', 'Comparison relates Original to Retelling', 'Annotations explain meaningful transformations'],
    ixd: ['Toggle Original / Understand', 'Switch to side-by-side', 'Reveal change notes', 'Return to listening mode'],
    ia: 'Comparison is a trust affordance inside Passage, not the permanent app layout.',
    yagni: ['No diff engine as default UI', 'No academic annotation mode first', 'No forcing side-by-side for casual use'],
    plg: 'A trusted before/after pair becomes a shareable artifact: “look what it did to this passage.”',
    try: ['Start with toggle view', 'Switch to side-by-side', 'Reveal why the retelling changed wording', 'Decide whether trust improved or clutter increased'],
    decision: 'How much Original ↔ Understand comparison should the app expose by default?',
  },
  {
    slug: 'continue-loop',
    title: 'Continue Loop',
    eyebrow: 'Study 06 · Return / retention model',
    status: 'built',
    hypothesis: 'History should become Continue / Library, not primary navigation.',
    primaryObject: 'Listening Session',
    mentalModel: 'The user is not managing history; they are continuing something they were understanding.',
    orca: ['Listening Session belongs to Passage', 'Session has progress', 'Session remembers active Retelling', 'Library collects Passages'],
    ixd: ['Open as returning user', 'Resume active session', 'Open Library only if needed'],
    ia: 'Continue is surfaced; Library is secondary; History tab is avoided.',
    yagni: ['No History bottom tab', 'No database-feeling list first', 'No filters before enough content exists'],
    plg: 'Continuation creates habit; completed retellings can become shareable artifacts later.',
    try: ['Resume Genesis', 'Switch to another saved passage', 'Notice whether Library feels secondary but available'],
    decision: 'Should History be reframed as Continue / Library?',
  },
];

export const candidateStudies = [
  ['retelling-first', 'Retelling-first', 'Should the generated Retelling be the hero object?'],
  ['fidelity-first', 'Fidelity-first', 'Should source-distance be the primary first choice?'],
  ['persona-first', 'Persona / Medium-first', 'Should users choose the kind of telling before text?'],
  ['coach-first', 'Coach / Guide-first', 'Should the app act like a tutor/guide?'],
  ['narrator-first', 'Narrator-first', 'Should a narrator/host become the product face?'],
  ['workflow-first', 'Workflow-first', 'Is import/process/save/share the main frame?'],
] as const;

export const allStudyLinks = [...builtStudies.map(s => s.slug), 'composed-flow', 'decision-log'];
