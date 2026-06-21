export type StudyStatus = 'built' | 'candidate' | 'composed';

export type Study = {
  slug: string;
  title: string;
  eyebrow: string;
  status: StudyStatus;
  hypothesis: string;
  problem: string;
  whyItMatters: string;
  primaryObject: string;
  mentalModel: string;
  orca: string[];
  ixd: string[];
  ia: string;
  yagni: string[];
  plg: string;
  try: string[];
  success: string[];
  failure: string[];
  recommendation: string;
  value: 'Highest' | 'Very high' | 'High' | 'Medium-high' | 'Medium';
  decision: string;
};

export const builtStudies: Study[] = [
  {
    slug: 'retelling-style-fidelity',
    title: 'Retelling Style + Fidelity',
    eyebrow: 'Study 01 · Core transformation model',
    status: 'built',
    value: 'Highest',
    hypothesis: 'Users will understand the product better if Retelling Style and Fidelity are separate controls.',
    problem: 'The current category language can collapse very different decisions into one “style” bucket. TikTok, bedtime, grade level, summarization, voice, and source accuracy are not the same kind of choice. If they are presented together, the product feels like a settings utility instead of a retelling engine.',
    whyItMatters: 'This is the product soul. It determines whether Understand feels like “AI TTS settings” or like “make this hard text become a listenable retelling I can control and trust.”',
    primaryObject: 'Retelling',
    mentalModel: 'Retelling Style colors the medium; Fidelity controls distance from source.',
    orca: ['Retelling belongs to a Passage', 'Retelling has a Style / medium', 'Retelling has Fidelity / source-distance', 'Retelling produces output text that can be heard, compared, saved, or shared'],
    ixd: ['See the source text', 'Choose a retelling style', 'Move fidelity', 'Watch output change', 'Apply and play'],
    ia: 'Retelling controls should live near the active Passage, not in Settings or a generic voice panel.',
    yagni: ['No voice picker in this study', 'No reading-grade bucket as “style”', 'No preset list mixing TikTok with 6th grade', 'No advanced prompt editor'],
    plg: 'A striking before/after retelling becomes the shareable product artifact after the user has the aha.',
    try: ['Read the source text first', 'Pick Bedtime storyteller', 'Move from Close to Freer', 'Switch to TikTok influencer', 'Confirm Fidelity changes distance, not persona'],
    success: ['A reviewer can explain the difference between Retelling Style and Fidelity in one sentence', 'Changing Fidelity feels like changing permission to diverge, not changing the voice', 'The output makes the product feel desirable, not merely configurable'],
    failure: ['Reviewer thinks Fidelity means reading level, tone, or voice', 'The controls feel like AI prompt settings', 'The output contrast is too subtle to teach the model'],
    recommendation: 'Adopt this as the core transformation model unless user testing shows we need a simpler starter preset layer on top.',
    decision: 'Should Retelling Style + Fidelity become the core transformation UI?',
  },
  {
    slug: 'passage-stage',
    title: 'Passage-first Stage',
    eyebrow: 'Study 02 · Root object / IA spine',
    status: 'built',
    value: 'Very high',
    hypothesis: 'The app should organize around Passage, not Reader / History / Voice chrome.',
    problem: 'A generic reader/history/voice structure makes the app feel like a TTS utility. The user’s job is not “manage a reader”; it is “bring something hard or annoying and make it understandable enough to keep listening.”',
    whyItMatters: 'This decides the app’s root object. If Passage wins, Original, Retelling, Performance, Continue, and Share all orbit the active text instead of competing as separate destinations.',
    primaryObject: 'Passage',
    mentalModel: 'A user brings in a Passage, compares Original and Understand, then listens.',
    orca: ['Passage has Original text', 'Passage has one or more Retellings', 'Passage has Performances', 'Passage has Listening Sessions', 'Passage can become a shareable artifact'],
    ixd: ['Choose a proof sample', 'Enter Passage stage', 'Toggle Original / Understand', 'Generate retelling', 'Play active version'],
    ia: 'Passage is the main stage; Continue/Library is secondary; Performance is contextual.',
    yagni: ['No bottom nav as default', 'No persistent voice bar', 'No Settings-first setup', 'No history list before a user has anything to continue'],
    plg: 'Passage-first supports PLG indirectly: a transformed passage becomes the proof object people can save, continue, or share.',
    try: ['Choose a proof sample', 'Generate Understand', 'Toggle back to Original', 'Play the retelling', 'Notice whether you miss Reader/History/Voice chrome'],
    success: ['The first action feels obvious', 'The user can tell what object they are acting on', 'Original and Understand feel like states of the same Passage'],
    failure: ['The app still feels like a generic reader', 'The user looks for History or Voice before understanding the passage', 'The passage stage does not make the transformation feel central'],
    recommendation: 'Likely adopt as the IA spine, then test how much Library/Continue needs to surface for returning users.',
    decision: 'Should Passage become the root app object?',
  },
  {
    slug: 'performance-capability',
    title: 'Performance Capability',
    eyebrow: 'Study 03 · Voice / premium model',
    status: 'built',
    value: 'High',
    hypothesis: 'Premium is more compelling when framed as expressive performance capability, not generic cloud voice quality.',
    problem: 'If voice is shown as a permanent picker, users may confuse voice, style, and fidelity. If premium is sold as “better voice,” the upgrade feels generic. The more truthful distinction is capability: some voices can actually perform a selected style and some mostly read neutrally.',
    whyItMatters: 'This shapes monetization and product truth. It tells us whether premium belongs at the moment of hearing a retelling rather than before the user has experienced value.',
    primaryObject: 'Performance',
    mentalModel: 'Voice is the instrument; capability determines whether it can perform the selected style.',
    orca: ['Performance belongs to Retelling', 'Performance uses a Voice', 'Voice has capability', 'Premium unlocks some capabilities', 'Playback demonstrates the difference'],
    ixd: ['Compare local neutral read', 'Preview expressive performance', 'See capability boundary', 'Upgrade only after value is shown'],
    ia: 'Voice belongs inside Performance, not permanent app chrome.',
    yagni: ['No universal premium claim', 'No paywall before aha', 'No pretending all voices perform every style', 'No audio marketplace in the first pass'],
    plg: 'Premium preview is a product-led upgrade moment triggered by perceived value, not an abstract paywall.',
    try: ['Compare Local vs Expressive', 'Read the capability language', 'Check whether free still feels useful', 'Notice whether the upgrade appears after value'],
    success: ['Reviewer understands voice is not style', 'Premium feels like added expressive performance, not a forced gate', 'Capability language feels honest'],
    failure: ['Premium feels like generic cloud TTS', 'The page implies all voices can perform all styles', 'The local/free path feels broken or intentionally weakened'],
    recommendation: 'Keep premium tied to expressive capability, but verify actual provider support before making strong claims in-product.',
    decision: 'Should premium be positioned around style-following expressive performance?',
  },
  {
    slug: 'sample-aha',
    title: 'Sample Aha',
    eyebrow: 'Study 04 · First-session proof',
    status: 'built',
    value: 'Very high',
    hypothesis: 'First-run should begin with curated proof passages before asking users to paste their own text.',
    problem: 'A blank paste box asks the user to supply both effort and imagination before the app has earned trust. Samples can prove the transformation instantly and teach what kinds of text Understand is for.',
    whyItMatters: 'This is the PLG entry point. If samples create an immediate “oh, I want this for my own text” reaction, onboarding can become shorter, warmer, and more viral.',
    primaryObject: 'Sample / Proof Passage',
    mentalModel: 'A Sample is a curated Passage designed to prove the app quickly.',
    orca: ['Sample is a Passage', 'Sample has a reason for being chosen', 'Sample has recommended Style', 'Sample has recommended Fidelity', 'Sample produces proof quickly'],
    ixd: ['Tap sample', 'See why this sample matters', 'See before/after', 'Hear retelling', 'Then paste own text'],
    ia: 'Samples belong in the empty state and onboarding, not a buried demo gallery.',
    yagni: ['No account creation first', 'No blank paste-only start', 'No multi-step onboarding', 'No giant sample library before we know the winning examples'],
    plg: 'Aha comes from a sample; paste/share/invite asks follow proof, not before it.',
    try: ['Tap each sample card', 'Notice the recommended retelling recipe', 'Ask whether the sample proves a real job', 'Use Paste your own only after seeing proof'],
    success: ['Reviewer wants to try their own text after one sample', 'Each sample demonstrates a distinct job', 'The sample page explains the product without a tutorial'],
    failure: ['Samples feel like filler content', 'Before/after contrast is too weak', 'User still asks what the app is for after trying a sample'],
    recommendation: 'Upgrade sample quality and make samples P0 onboarding if they consistently create the fastest aha.',
    decision: 'Should samples be P0 onboarding objects?',
  },
  {
    slug: 'compare-trust',
    title: 'Compare / Trust',
    eyebrow: 'Study 05 · Trust model',
    status: 'built',
    value: 'Very high',
    hypothesis: 'Serious texts need enough Original ↔ Understand comparison to create trust without turning the app into a study tool.',
    problem: 'AI retelling can feel magical, but it can also create anxiety: did it distort the source? This is especially true for old, sacred, legal, medical, academic, or emotionally important text.',
    whyItMatters: 'If users do not trust the retelling, they will not listen deeply, share it, or use it for serious material. But if comparison dominates, the app becomes homework instead of a listening experience.',
    primaryObject: 'Original / Retelling pair',
    mentalModel: 'Trust comes from controlled comparison: source on one side, listenable retelling on the other, with distance explained only when needed.',
    orca: ['Original belongs to Passage', 'Retelling belongs to Passage', 'Comparison relates Original to Retelling', 'Annotations explain meaningful transformations', 'Trust level may vary by text type'],
    ixd: ['Toggle Original / Understand', 'Switch to side-by-side', 'Reveal change notes', 'Return to listening mode'],
    ia: 'Comparison is a trust affordance inside Passage, not the permanent app layout.',
    yagni: ['No diff engine as default UI', 'No academic annotation mode first', 'No forcing side-by-side for casual use', 'No claim of authoritative translation'],
    plg: 'A trusted before/after pair becomes a shareable artifact: “look what it did to this passage.”',
    try: ['Start with toggle view', 'Switch to side-by-side', 'Reveal why the retelling changed wording', 'Decide whether trust improved or clutter increased'],
    success: ['Comparison increases trust without killing momentum', 'Reviewer can name when notes are needed', 'Toggle feels sufficient for casual text but expandable for serious text'],
    failure: ['The app feels defensive or academic', 'User still does not trust the transformation', 'Side-by-side becomes the default mental model for everything'],
    recommendation: 'Default to Original/Understand toggle; offer side-by-side and change notes contextually for high-trust material.',
    decision: 'How much Original ↔ Understand comparison should the app expose by default?',
  },
  {
    slug: 'continue-loop',
    title: 'Continue Loop',
    eyebrow: 'Study 06 · Return / retention model',
    status: 'built',
    value: 'Medium-high',
    hypothesis: 'History should become Continue / Library, not primary navigation.',
    problem: '“History” sounds like a database of past items. The user’s return job is usually more active: keep listening, finish understanding, replay something useful, or share a completed retelling.',
    whyItMatters: 'This matters for retention, but it should not outrank first-session aha. It tells us how the product should feel after the user has multiple passages.',
    primaryObject: 'Listening Session',
    mentalModel: 'The user is not managing history; they are continuing something they were understanding.',
    orca: ['Listening Session belongs to Passage', 'Session has progress', 'Session remembers active Retelling', 'Library collects Passages', 'Completed retellings can be replayed or shared'],
    ixd: ['Open as returning user', 'Resume active session', 'Reopen completed item', 'Open Library only if needed'],
    ia: 'Continue is surfaced; Library is secondary; History tab is avoided.',
    yagni: ['No History bottom tab', 'No database-feeling list first', 'No filters before enough content exists', 'No collection management in first run'],
    plg: 'Continuation creates habit; completed retellings can become shareable artifacts later.',
    try: ['Resume Genesis', 'Switch to another saved passage', 'Imagine reopening a completed item to share', 'Notice whether Library feels secondary but available'],
    success: ['Return state feels action-oriented', 'Continue and Library are clearly different', 'The user can resume without navigating a file manager'],
    failure: ['It still feels like history/storage', 'Library competes with the active passage', 'Retention surface appears before users have anything worth continuing'],
    recommendation: 'Keep as a retention model, but defer deep polish until the first-session loop is stronger.',
    decision: 'Should History be reframed as Continue / Library?',
  },
];

export const candidateStudies = [
  ['retelling-first', 'Retelling-first', 'Should the generated Retelling be the hero object after generation?'],
  ['fidelity-first', 'Fidelity-first', 'Should source-distance be the first choice for high-trust material?'],
  ['persona-first', 'Persona / Medium-first', 'Should users choose the kind of telling before text in discovery or sample contexts?'],
  ['coach-first', 'Coach / Guide-first', 'Should the app act like a tutor/guide, or would that pull it away from listening?'],
  ['narrator-first', 'Narrator-first', 'Should a narrator/host become the product face, or is that too gimmicky before the core is clear?'],
  ['workflow-first', 'Workflow-first', 'Is import/process/save/share the main frame for power users, or a later utility layer?'],
] as const;

export const decisionFamilies = [
  ['Core transformation', 'Retelling Style + Fidelity', 'What kind of telling is this, and how far may it move from the source?'],
  ['IA / root object', 'Passage-first Stage', 'What is the app organized around?'],
  ['Trust', 'Compare / Trust', 'How much source comparison is needed before listening feels safe?'],
  ['Onboarding / PLG', 'Sample Aha', 'How does the product prove itself before asking for effort?'],
  ['Monetization', 'Performance Capability', 'What is premium actually improving?'],
  ['Retention', 'Continue Loop', 'What brings someone back after the first aha?'],
] as const;

export const allStudyLinks = [...builtStudies.map(s => s.slug), 'composed-flow', 'decision-log'];
