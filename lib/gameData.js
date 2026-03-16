// ── FRIENDS ──────────────────────────────────────────────────────────────────
export const CORE_FRIENDS = [
  "LAKSHIN","ASHWI","NITHIN","PAVAN","SUBRAMANIAM","KARTHIKEYAN","NIRANJAN",
  "SAANTHA","MOHITH","NAVEEN","SHAASHWAT","DISHAN","KAUSHEEK","ABHA","TAVISHA",
  "PREETHIKA","PRAGDEESH","SAARTAK","ANISHA","SHIVAKUMAR","TANUSHREE","SREEJA",
  "ROHINI","PALLAVI","MITHUN","JAIKISHAN","SUMANTH","JASU","TANVI","STARP",
  "VAAJU","ROWDY","PICHI","TANU","ASHWIN","AMI","AMITHA","PAVI","ASHU",
];

const FILLER_SI = [
  "KAVYA","DEEPIKA","HARISH","VISHNU","PRIYA","ARUN","MEENA","RAVI",
  "KEERTHI","SURYA","DIVYA","POOJA","VIKRAM","LAKSHMI",
];

// Build batches: each batch has mostly core friends, with 1-2 filler names
function chunkFriends() {
  const core = [...CORE_FRIENDS].map(n => n.toUpperCase().replace(/\s/g,''));
  const filler = [...FILLER_SI].map(n => n.toUpperCase());
  const batches = [];

  // Shuffle core friends
  for (let i = core.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [core[i], core[j]] = [core[j], core[i]];
  }

  // Build batches of 7: 5-6 core + 1-2 filler
  for (let i = 0; i < core.length; i += 5) {
    const chunk = core.slice(i, i + 5).filter(n => n.length >= 3 && n.length <= 12);
    const extra = filler.slice((i / 5 % filler.length), (i / 5 % filler.length) + 2);
    const batch = [...chunk, ...extra].slice(0, 7);
    if (batch.length >= 4) batches.push(batch);
  }

  // Also add some all-core batches so core names appear more often
  for (let i = 0; i < core.length; i += 7) {
    const batch = core.slice(i, i + 7).filter(n => n.length >= 3 && n.length <= 12);
    if (batch.length >= 4) batches.push(batch);
  }

  return batches;
}
export const FRIENDS_BATCHES = chunkFriends();

// ── HARD ENGLISH ──────────────────────────────────────────────────────────────
export const HARD_ENGLISH_CATS = [
  { cat: "OBSCURE ENGLISH WORDS", emoji: "📖",
    words: ["SONDER","VELLICHOR","KENOPSIA","HIRAETH","LIMERENCE","TOSKA","PETRICHOR"] },
  { cat: "EXTREMELY HARD WORDS", emoji: "🧠",
    words: ["MELLIFLUOUS","PERSPICACIOUS","LOQUACIOUS","OBSEQUIOUS","SYCOPHANT","TRUCULENT","EPHEMERAL"] },
  { cat: "HARD VOCABULARY II", emoji: "🎓",
    words: ["PUSILLANIMOUS","PROPITIOUS","LUGUBRIOUS","INEFFABLE","RECONDITE","ABSTRUSE","SOLIPSISM"] },
  { cat: "FUNNY HARD WORDS", emoji: "😤",
    words: ["DISCOMBOBULATE","LOLLYGAG","SNOLLYGOSTER","BUMFUZZLE","TARADIDDLE","FLUMMOX","KERFUFFLE"] },
  { cat: "RARE ADJECTIVES", emoji: "💬",
    words: ["QUIXOTIC","PANGLOSSIAN","VELLEITY","APOPHENIA","NOCTIVAGANT","LIMINAL","INEFFABLE"] },
  { cat: "LATIN LOANWORDS", emoji: "🏛️",
    words: ["AURORA","NEXUS","APEX","VORTEX","MATRIX","NUCLEUS","RADIUS","CORPUS"] },
  { cat: "ARCHAIC ENGLISH", emoji: "🕯️",
    words: ["FORSOOTH","PERCHANCE","MAYHAPS","HITHERTO","WHEREFORE","PRITHEE","SOOTH"] },
  { cat: "CONFUSING WORDS", emoji: "🤯",
    words: ["AFFECT","PRINCIPAL","STATIONARY","COMPLEMENT","EMINENT","ELICIT","DISCRETE"] },
  { cat: "SESQUIPEDALIAN WORDS", emoji: "📚",
    words: ["SERENDIPITY","SESQUIPEDALIAN","PHANTASMAGORIC","MELANCHOLIA","EPHEMERAL","LABYRINTHINE","CREPUSCULAR"] },
  { cat: "POETIC WORDS", emoji: "🌙",
    words: ["ELEGY","SONNET","HAIKU","QUATRAIN","STANZA","COUPLET","LIMERICK","BALLAD"] },
];

// ── BASE LEVELS ───────────────────────────────────────────────────────────────
export const BASE_LEVELS = [
  { cat: "TYPES OF BEVERAGES", emoji: "☕", words: ["SMOOTHIE","MILK","COFFEE","TEA","WATER","SODA","JUICE"], size: 8 },
  { cat: "FRUITS", emoji: "🍎", words: ["APPLE","MANGO","GRAPE","LEMON","PEACH","PLUM","KIWI"], size: 8 },
  { cat: "ANIMALS", emoji: "🐶", words: ["CAT","DOG","LION","BEAR","WOLF","DEER","FROG"], size: 8 },
  { cat: "COLORS", emoji: "🎨", words: ["RED","BLUE","GREEN","GOLD","PINK","CYAN","GREY"], size: 8 },
  { cat: "SPORTS", emoji: "⚽", words: ["SOCCER","TENNIS","BOXING","RUGBY","POLO","GOLF","SWIM"], size: 9 },
  { cat: "COUNTRIES", emoji: "🌍", words: ["INDIA","JAPAN","FRANCE","ITALY","SPAIN","CHINA","EGYPT"], size: 9 },
  { cat: "MUSICAL INSTRUMENTS", emoji: "🎵", words: ["PIANO","GUITAR","FLUTE","DRUMS","VIOLIN","SITAR","HARP"], size: 9 },
  { cat: "OCEAN CREATURES", emoji: "🐠", words: ["SHARK","WHALE","SQUID","CRAB","LOBSTER","SEAL","OTTER"], size: 10 },
  { cat: "VEGETABLES", emoji: "🥦", words: ["CARROT","ONION","POTATO","TOMATO","GARLIC","CELERY","LEEK"], size: 10 },
  { cat: "PLANETS", emoji: "🪐", words: ["MERCURY","VENUS","EARTH","MARS","JUPITER","SATURN","NEPTUNE"], size: 10 },
];

export const CATEGORY_POOL = [
  { cat: "DESSERTS", emoji: "🍰", words: ["CAKE","PIE","BROWNIE","ECLAIR","TART","FUDGE","CREPE","SORBET"] },
  { cat: "WEATHER", emoji: "⛈️", words: ["RAIN","SNOW","HAIL","SLEET","FROST","CLOUD","FOG","THUNDER"] },
  { cat: "FABRICS", emoji: "🧵", words: ["SILK","LINEN","DENIM","VELVET","COTTON","SATIN","TWEED","FLEECE"] },
  { cat: "DANCES", emoji: "💃", words: ["TANGO","WALTZ","SAMBA","FOXTROT","JIVE","SALSA","BALLET","POLKA"] },
  { cat: "GEMSTONES", emoji: "💎", words: ["RUBY","PEARL","OPAL","TOPAZ","GARNET","JASPER","ONYX","BERYL"] },
  { cat: "TREES", emoji: "🌲", words: ["OAK","MAPLE","BIRCH","CEDAR","WILLOW","SPRUCE","POPLAR","BAMBOO"] },
  { cat: "CURRENCIES", emoji: "💰", words: ["DOLLAR","EURO","YEN","POUND","FRANC","DINAR","RUPEE","PESO"] },
  { cat: "EMOTIONS", emoji: "😊", words: ["JOY","FEAR","ANGER","LOVE","GRIEF","PRIDE","SHAME","ENVY"] },
  { cat: "TOOLS", emoji: "🔧", words: ["HAMMER","WRENCH","DRILL","CHISEL","PLIERS","TROWEL","CLAMP","LATHE"] },
  { cat: "FLOWERS", emoji: "🌸", words: ["ROSE","LILY","TULIP","DAISY","ORCHID","VIOLET","POPPY","LILAC"] },
  { cat: "SPICES", emoji: "🌶️", words: ["CUMIN","THYME","BASIL","GINGER","CLOVE","NUTMEG","PEPPER","SAFFRON"] },
  { cat: "BIRDS", emoji: "🦅", words: ["EAGLE","PARROT","FALCON","CRANE","SWIFT","WREN","ROBIN","FINCH"] },
  { cat: "INSECTS", emoji: "🦋", words: ["BEE","ANT","MOTH","WASP","APHID","CRICKET","BEETLE","MANTIS"] },
  { cat: "BOARD GAMES", emoji: "🎲", words: ["CHESS","RISK","CLUE","GO","OTHELLO","SCRABBLE","CHECKERS","DOMINOES"] },
  { cat: "LANGUAGES", emoji: "🗣️", words: ["ARABIC","FRENCH","HINDI","URDU","TAMIL","GREEK","LATIN","SWAHILI"] },
  { cat: "MOUNTAINS", emoji: "🏔️", words: ["EVEREST","FUJI","BLANC","ELBRUS","DENALI","OLYMPUS","LOGAN","VINSON"] },
  { cat: "COMPOSERS", emoji: "🎼", words: ["BACH","MOZART","HANDEL","CHOPIN","BRAHMS","VIVALDI","RAVEL","LISZT"] },
  { cat: "PHILOSOPHERS", emoji: "🤔", words: ["PLATO","HUME","KANT","LOCKE","MILL","NIETZSCHE","ARISTOTLE","HEGEL"] },
  { cat: "OCEANS", emoji: "🌊", words: ["PACIFIC","ATLANTIC","INDIAN","ARCTIC","SOUTHERN","CORAL","BERING","TASMAN"] },
  { cat: "SPACE OBJECTS", emoji: "🌟", words: ["COMET","NEBULA","GALAXY","PULSAR","QUASAR","ASTEROID","METEOR","CORONA"] },
  { cat: "PROGRAMMING", emoji: "💻", words: ["PYTHON","JAVA","SWIFT","KOTLIN","RUBY","RUST","ELIXIR","SCALA"] },
  { cat: "MYTHICAL CREATURES", emoji: "🐲", words: ["DRAGON","PHOENIX","UNICORN","GRIFFIN","SPHINX","KRAKEN","HYDRA","BANSHEE"] },
  { cat: "CHEMICAL ELEMENTS", emoji: "⚗️", words: ["CARBON","OXYGEN","HELIUM","NEON","ARGON","XENON","RADON","SILICON"] },
  { cat: "QUANTUM PHYSICS", emoji: "⚛️", words: ["QUARK","BOSON","LEPTON","HADRON","FERMION","PHOTON","NEUTRINO","GLUON"] },
  { cat: "RHETORICAL DEVICES", emoji: "📜", words: ["SIMILE","METAPHOR","HYPERBOLE","ANAPHORA","ELLIPSIS","CHIASMUS","LITOTES","SYNECDOCHE"] },
  { cat: "GEOLOGICAL EPOCHS", emoji: "🪨", words: ["HOLOCENE","PLEISTOCENE","PLIOCENE","MIOCENE","OLIGOCENE","EOCENE","PALEOCENE","JURASSIC"] },
  { cat: "LITERARY MOVEMENTS", emoji: "📚", words: ["ROMANTICISM","MODERNISM","SURREALISM","NATURALISM","SYMBOLISM","ABSURDISM","FUTURISM","DADAISM"] },
  { cat: "OPERA TERMS", emoji: "🎭", words: ["LIBRETTO","SOPRANO","CASTRATO","FALSETTO","OVERTURE","LEITMOTIF","RECITATIVE","COLORATURA"] },
  { cat: "BIOCHEMICAL TERMS", emoji: "🔬", words: ["ENZYME","PROTEIN","LIPID","GLYCOGEN","NUCLEOTIDE","RIBOSOME","PLASMID","CYTOKINE"] },
  { cat: "ARCHITECTURAL STYLES", emoji: "🏛️", words: ["DORIC","IONIC","CORINTHIAN","TUSCAN","COMPOSITE","PILASTER","ENTASIS","STYLOBATE"] },
];

// ── LEVEL LOGIC ───────────────────────────────────────────────────────────────
export function isFriendsLevel(n) { return n > 0 && n % 10 === 9; }
export function isHardLevel(n)    { return n > 0 && n % 15 === 14; }

export function getDifficulty(n) {
  if (n < 10) return 1;
  if (n < 30) return 2;
  if (n < 100) return 3;
  if (n < 500) return 4;
  return 5;
}

export function getLevelData(n) {
  if (isFriendsLevel(n)) {
    const batchIdx = Math.floor(n / 10) % FRIENDS_BATCHES.length;
    const batch = FRIENDS_BATCHES[batchIdx] || FRIENDS_BATCHES[0];
    const wordCount = Math.min(6 + Math.floor(n / 50), batch.length);
    const words = batch.slice(0, wordCount);
    const maxLen = Math.max(...words.map(w => w.length));
    const size = Math.min(Math.max(maxLen + 2, 10), 16);
    return { cat: "FIND YOUR FRIENDS!", emoji: "👯", words, size, type: 'friends' };
  }
  if (isHardLevel(n)) {
    const idx = Math.floor(n / 15) % HARD_ENGLISH_CATS.length;
    const hcat = HARD_ENGLISH_CATS[idx];
    const diff = getDifficulty(n);
    const wordCount = Math.min(4 + Math.floor(diff / 2), hcat.words.length);
    const words = hcat.words.slice(0, wordCount).map(w => w.slice(0, 14));
    const maxLen = Math.max(...words.map(w => w.length));
    const size = Math.min(Math.max(maxLen + 2, 10), 16);
    return { cat: hcat.cat, emoji: hcat.emoji, words, size, type: 'hard' };
  }
  if (n < BASE_LEVELS.length) return { ...BASE_LEVELS[n], type: 'normal' };
  const poolIdx = (n - BASE_LEVELS.length) % CATEGORY_POOL.length;
  const cat = CATEGORY_POOL[poolIdx];
  const diff = Math.floor(n / 10);
  const base = Math.min(8 + Math.floor(diff / 3), 16);
  const wordCount = Math.min(6 + Math.floor(n / 20), cat.words.length);
  return { cat: cat.cat, emoji: cat.emoji, words: cat.words.slice(0, wordCount), size: base, type: 'normal' };
}
