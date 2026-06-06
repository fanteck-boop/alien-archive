// data.js — Static franchise data.
// pros/cons and detailedDesc removed — fetched live from APIs via Netlify functions.
// Cover image strategy per type:
//
//  Movies  → imageUrl: pre-resolved TMDB URLs (no runtime fetch needed)
//  Books   → imageUrl: Open Library ISBN cover URLs (no key, no fetch)
//  Comics  → imageUrl: Wikipedia fallback
//             cvSearch: name passed to Comic Vine search
//             cvId:     Comic Vine volume ID for exact lookup (more reliable)
//  Games   → imageUrl: Wikipedia fallback
//             rawgSearch: title passed to RAWG (uncomment in api.js when ready)

export const data = [

  // ── MOVIES ──
  // Posters sourced from TMDB — already resolved, no runtime fetch needed.
  {
    id: 1, type: 'movie', title: 'Alien', year: 1979, rating: 8.4,
    director: 'Ridley Scott',
    imageUrl: 'https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg',
    desc: 'The commercial starship Nostromo receives a distress signal from a remote moon. What the crew discovers — and what follows them back — will become the most iconic horror in cinematic history.',
    tags: ['Horror', 'Sci-Fi', 'Survival']
  },
  {
    id: 2, type: 'movie', title: 'Aliens', year: 1986, rating: 8.3,
    director: 'James Cameron',
    imageUrl: 'https://image.tmdb.org/t/p/w500/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg',
    desc: "Ellen Ripley returns to LV-426 alongside a squad of colonial marines — only to discover the colony has been overrun by an entire hive. James Cameron's sequel transforms intimate horror into a breathless action-war epic.",
    tags: ['Action', 'Sci-Fi', 'Military']
  },
  {
    id: 3, type: 'movie', title: 'Alien 3', year: 1992, rating: 6.4,
    director: 'David Fincher',
    imageUrl: 'https://image.tmdb.org/t/p/w500/xh5wI0UoW7DfS1IyLy3d2CgrCEP.jpg',
    desc: "Ripley crash-lands on Fiorina 161, a maximum-security prison colony with no weapons. David Fincher's debut feature — made under brutal studio interference — remains a flawed but haunting film.",
    tags: ['Horror', 'Drama', 'Sci-Fi']
  },
  {
    id: 4, type: 'movie', title: 'Alien Resurrection', year: 1997, rating: 6.2,
    director: 'Jean-Pierre Jeunet',
    imageUrl: 'https://image.tmdb.org/t/p/w500/9aRDMlU5Zwpysilm0WCWzU2PCFv.jpg',
    desc: '200 years after Alien 3, Ripley is cloned with xenomorph DNA so scientists can harvest the queen within her. A bizarre, campy, often mesmerizing entry in the series.',
    tags: ['Action', 'Sci-Fi', 'Dark Comedy']
  },
  {
    id: 5, type: 'movie', title: 'Prometheus', year: 2012, rating: 7.0,
    director: 'Ridley Scott',
    imageUrl: 'https://image.tmdb.org/t/p/w500/qsYQflQhOuhDpQ0W2aOcwqgDAeI.jpg',
    desc: "Scientists follow a star map found in ancient cave paintings to a distant moon, seeking the origins of humanity. What they find is something ancient, vast, and deeply hostile.",
    tags: ['Sci-Fi', 'Mystery', 'Prequel']
  },
  {
    id: 6, type: 'movie', title: 'Alien: Covenant', year: 2017, rating: 6.4,
    director: 'Ridley Scott',
    imageUrl: 'https://image.tmdb.org/t/p/w500/zecMELPbU5YMQpC81Z8ImaaXuf9.jpg',
    desc: "The crew of the colony ship Covenant discover an uncharted paradise inhabited only by the rogue synthetic David, who has been conducting horrifying experiments for a decade.",
    tags: ['Sci-Fi', 'Horror', 'Prequel']
  },
  {
    id: 7, type: 'movie', title: 'Alien: Romulus', year: 2024, rating: 7.3,
    director: 'Fede Álvarez',
    imageUrl: 'https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg',
    desc: "A group of young colonial workers stumble onto an abandoned space station between the events of Alien and Aliens. Fede Álvarez strips the franchise back to pure survival horror with extraordinary results.",
    tags: ['Horror', 'Sci-Fi', 'Standalone']
  },

  // ── GAMES ──
  // rawgSearch field is ready — uncomment fetchAllGameCovers in api.js when you have the RAWG key.
  {
    id: 8, type: 'game', title: 'Alien: Isolation', year: 2014, rating: 8.5,
    developer: 'Creative Assembly',
    rawgSearch: 'Alien Isolation',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/214490/header.jpg',
    desc: "Amanda Ripley travels to the decaying Sevastopol Station to find answers about her mother's fate — unaware that a single Xenomorph has hunted the station's inhabitants to near-extinction.",
    tags: ['Survival Horror', 'Stealth', 'First-Person']
  },
  {
    id: 9, type: 'game', title: 'Alien vs. Predator (1999)', year: 1999, rating: 8.2,
    developer: 'Rebellion',
    rawgSearch: 'Aliens vs Predator 1999',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/3/31/AvP1.jpg/revision/latest?cb=20160418145935nnnj',
    desc: "Play as a Colonial Marine, Alien, or Predator in three distinct campaigns — each with entirely different gameplay mechanics. A landmark first-person shooter that remains a cult classic.",
    tags: ['FPS', 'Action', 'Classic']
  },
  {
    id: 10, type: 'game', title: 'Alien Trilogy', year: 1996, rating: 7.2,
    developer: 'Probe Entertainment',
    rawgSearch: 'Alien Trilogy',
    imageUrl: 'https://static.wikia.nocookie.net/alienanthology/images/b/b2/Alien_Trilogy.jpg/revision/latest/scale-to-width-down/300?cb=20190501162059',
    desc: "A first-person shooter adaptation of all three original Alien films — explore levels drawn from each movie while battling xenomorphs with a satisfying arsenal of period-authentic weapons.",
    tags: ['FPS', 'Classic', 'Retro']
  },
  {
    id: 11, type: 'game', title: 'Alien: Infestation', year: 2011, rating: 7.8,
    developer: 'WayForward',
    rawgSearch: 'Alien Infestation',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/f/f5/Aliens-Infestation.jpg/revision/latest?cb=20111016091235',
    desc: "A 2D Metroidvania for Nintendo DS set after Aliens — command a squad of 19 Colonial Marines with permanent death and gorgeous pixel art. One of the franchise's most underrated entries.",
    tags: ['Metroidvania', '2D', 'Handheld']
  },
  {
    id: 12, type: 'game', title: 'Alien vs. Predator (2010)', year: 2010, rating: 5.8,
    developer: 'Rebellion',
    rawgSearch: 'Aliens vs Predator 2010',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/10680/header.jpg',
    desc: "Rebellion's 2010 reboot returns with three playable species and updated graphics — but fails to recapture the atmosphere or innovation of the 1999 original despite competent production values.",
    tags: ['FPS', 'Action', 'Multiplayer']
  },
  {
    id: 13, type: 'game', title: 'Aliens: Colonial Marines', year: 2013, rating: 4.5,
    developer: 'Gearbox Software',
    rawgSearch: 'Aliens Colonial Marines',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/c/c5/AliensColonialMarinesBox.png/revision/latest?cb=20120614111153',
    desc: "A squad-based first-person shooter set after Aliens — marketed aggressively as a canonical sequel. Became one of gaming's most infamous releases after the finished product diverged dramatically from pre-release demonstrations.",
    tags: ['FPS', 'Co-op', 'Controversial']
  },
  {
    id: 14, type: 'game', title: 'Aliens: Fireteam Elite', year: 2021, rating: 6.5,
    developer: 'Cold Iron Studios',
    rawgSearch: 'Aliens Fireteam Elite',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/7/7f/Aliens-_Fireteam_Elite.jpg/revision/latest?cb=20240120123757',
    desc: "A third-person co-operative shooter set 23 years after the original trilogy — three marines face waves of xenomorphs and synthetics across a four-chapter campaign.",
    tags: ['Co-op', 'TPS', 'Action']
  },
  {
    id: 15, type: 'game', title: 'Alien: Rogue Incursion', year: 2024, rating: 7.0,
    developer: 'Survios',
    rawgSearch: 'Alien Rogue Incursion',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/1/1d/Alien_Rogue_Incursion_%282024%29_cover.jpg/revision/latest?cb=20240728124042',
    desc: "The first major VR entry in the franchise plunges players into a Weyland-Yutani research facility overrun by xenomorphs — delivering an unparalleled sense of physical presence in the Alien universe.",
    tags: ['VR', 'Horror', 'Survival']
  },

  // ── BOOKS ──
  // imageUrl uses Open Library ISBN covers — no API key, no fetch, works instantly.
  // isbn field is kept for reference and for fetchBookData() if you need metadata.
  {
    id: 16, type: 'book', title: 'Alien: The Cold Forge', year: 2018, rating: 8.1,
    author: 'Alex White',
    isbn: '9781785658037',
    imageUrl: 'https://covers.openlibrary.org/b/id/14303985-M.jpg',
    desc: "Aboard a remote research station, a terminally ill scientist races to weaponize xenomorph DNA before Weyland-Yutani shuts her program down — while a corporate hatchet-man arrives to evaluate which projects deserve survival.",
    tags: ['Novel', 'Thriller', 'Weyland-Yutani']
  },
  {
    id: 17, type: 'book', title: 'Alien: Into Charybdis', year: 2021, rating: 8.0,
    author: 'Alex White',
    isbn: '9781789091304',
    imageUrl: 'https://covers.openlibrary.org/b/id/10873660-M.jpg',
    desc: "A deep-space natural gas facility becomes a death trap when a xenomorph outbreak coincides with a corporate conspiracy — and survivors must navigate both threats to escape a planet-sized killing machine.",
    tags: ['Novel', 'Survival', 'Corporate']
  },
  {
    id: 18, type: 'book', title: 'Alien: Phalanx', year: 2020, rating: 7.8,
    author: 'Scott Sigler',
    isbn: '9781789091076',
    imageUrl: 'https://covers.openlibrary.org/b/id/13288948-M.jpg',
    desc: "On a planet where xenomorphs have wiped out technology, a pre-industrial human society survives by maintaining distance from the hive — until one brave runner discovers that salvation requires facing the darkness directly.",
    tags: ['Novel', 'Post-Apocalyptic', 'Unique']
  },
  {
    id: 19, type: 'book', title: 'Aliens: Vasquez', year: 2023, rating: 7.7,
    author: 'V. Castro',
    isbn: '9781803362762',
    imageUrl: 'https://covers.openlibrary.org/b/id/13558565-M.jpg',
    desc: "The origin story of Private Jenette Vasquez — one of the most iconic characters in Aliens — tracing her life from childhood in Los Angeles through her enlistment and the events of LV-426.",
    tags: ['Novel', 'Character Study', 'Vasquez']
  },
  {
    id: 20, type: 'book', title: 'Aliens: Bug Hunt', year: 2017, rating: 7.6,
    author: 'Jonathan Maberry (Ed.)',
    isbn: '9781785654572',
    imageUrl: 'https://covers.openlibrary.org/b/id/8742185-M.jpg',
    desc: "An anthology of 17 original stories by acclaimed horror and science fiction authors — marines, scientists, mercenaries, and colonists face the xenomorph threat across diverse settings and timelines.",
    tags: ['Anthology', 'Short Stories', 'Military']
  },
  {
    id: 21, type: 'book', title: 'Alien: River of Pain', year: 2014, rating: 7.5,
    author: 'Christopher Golden',
    isbn: '9781781167526',
    imageUrl: 'https://covers.openlibrary.org/b/id/10203190-M.jpg',
    desc: "The untold story of the Hadley's Hope colonists on LV-426 — what happened to those families in the days and weeks before the Colonial Marines arrived in Aliens.",
    tags: ['Novel', 'LV-426', 'Prequel']
  },
  {
    id: 22, type: 'book', title: 'Alien: Colony War', year: 2023, rating: 7.5,
    author: 'David Barnett',
    isbn: '9781803362236',
    imageUrl: 'https://imgcdn.saxo.com/_9781789098891',
    desc: "Caught between a brewing colonial independence movement and a catastrophic xenomorph outbreak, survivors must navigate a battlefield where humans are killing humans while something far worse hunts them all.",
    tags: ['Novel', 'Colony', 'War']
  },
  {
    id: 23, type: 'book', title: 'Alien: Out of the Shadows', year: 2014, rating: 7.2,
    author: 'Tim Lebbon',
    isbn: '9781781167502',
    imageUrl: 'https://covers.openlibrary.org/b/id/10256324-M.jpg',
    desc: "A canonical novel set between Alien and Aliens — Ripley, still drifting in hypersleep, is awakened when a mining crew on a storm-wracked planet makes a catastrophic discovery.",
    tags: ['Novel', 'Canon', 'Ripley']
  },
  {
    id: 24, type: 'book', title: 'Alien: Prototype', year: 2019, rating: 7.3,
    author: 'Tim Waggoner',
    isbn: '9781789090970',
    imageUrl: 'https://covers.openlibrary.org/b/id/10159644-M.jpg',
    desc: "A corporate geneticist at a rival company discovers a new xenomorph subspecies with enhanced intelligence — and must fight to stop it from escaping a research facility.",
    tags: ['Novel', 'Subspecies', 'Research']
  },
  {
    id: 25, type: 'book', title: 'Alien: The Weyland-Yutani Report', year: 2016, rating: 7.9,
    author: 'S.D. Perry',
    isbn: '9781608879434',
    imageUrl: 'https://covers.openlibrary.org/b/id/8883928-M.jpg',
    desc: "An in-universe classified dossier compiled by Weyland-Yutani's Special Services division — documenting all known xenomorph encounters, covert operations, Ripley's complete file, and extensive biological analysis.",
    tags: ['Reference', 'Lore', 'Art Book']
  },
  {
    id: 26, type: 'book', title: "Alien: Inferno's Fall", year: 2022, rating: 7.4,
    author: 'Philippa Ballantine & Clara Carija',
    isbn: '9781803362700',
    imageUrl: 'https://covers.openlibrary.org/b/id/13614874-M.jpg',
    desc: "The Jackals — a scrappy band of survivors — battle xenomorphs and the full force of Weyland-Yutani across the ruins of a fallen colony in a kinetic, character-driven action novel.",
    tags: ['Novel', 'Action', 'Jackals']
  },
  {
    id: 27, type: 'book', title: 'Alien: Uncivil War', year: 2023, rating: 7.3,
    author: 'Brendan Deneen',
    isbn: '9781803362748',
    imageUrl: 'https://imgcdn.saxo.com/_9798874695385',
    desc: "A soldier unravels a vast conspiracy linking humanity's civil wars to a Weyland-Yutani xenomorph weaponization program — discovering that the most dangerous predator may be the one funding the conflict.",
    tags: ['Novel', 'Military', 'Conspiracy']
  },
  {
    id: 28, type: 'book', title: 'Alien: Covenant — Origins', year: 2017, rating: 6.8,
    author: 'Alan Dean Foster',
    isbn: '9781785657016',
    imageUrl: 'https://covers.openlibrary.org/b/id/10129303-M.jpg',
    desc: "A prequel to Alien: Covenant following the colony ship crew before they depart — exploring their relationships, motivations, and the opposition they face before ever leaving Earth's orbit.",
    tags: ['Novel', 'Prequel', 'Covenant']
  },
  {
    id: 29, type: 'book', title: 'Alien: Resurrection (Novelization)', year: 1997, rating: 6.5,
    author: 'A.C. Crispin',
    isbn: '9780446604697',
    imageUrl: 'https://covers.openlibrary.org/b/id/6957542-M.jpg',
    desc: "A.C. Crispin's adaptation of the fourth film expands Joss Whedon's script with additional interiority, backstory for the supporting cast, and deeper exploration of the cloned Ripley's fractured psychology.",
    tags: ['Novelization', 'Film Tie-In']
  },

  // ── COMICS ──
  // imageUrl: Wikipedia fallback (shown until Comic Vine loads)
  // cvSearch:  name passed to Comic Vine volume search
  // cvId:      Comic Vine volume ID — used for exact lookup when known
  {
    id: 30, type: 'comic', title: 'Aliens: Dead Orbit', year: 2017, rating: 8.8,
    author: 'James Stokoe',
    cvSearch: 'Aliens Dead Orbit',
    cvId: 100960,
    imageUrl: null,
    desc: "Widely regarded as the finest Alien comic ever created — a lone engineer survives a catastrophic xenomorph outbreak aboard a space station, reconstructing events through memory and desperation in James Stokoe's extraordinarily dense artwork.",
    tags: ['Dark Horse', 'Masterpiece', 'Stokoe']
  },
  {
    id: 31, type: 'comic', title: 'Aliens (Dark Horse Original)', year: 1988, rating: 8.5,
    author: 'Mark Verheiden',
    cvSearch: 'Aliens',
    cvId: 4132,
    imageUrl: null,
    desc: "The landmark comic that defined the expanded universe — set years after Aliens, Hicks and Newt discover the xenomorphs have reached Earth. Brutal, visionary, and influential beyond measure.",
    tags: ['Dark Horse', 'Classic', 'Hicks']
  },
  {
    id: 32, type: 'comic', title: 'Aliens: Outbreak', year: 1989, rating: 8.3,
    author: 'Mark Verheiden',
    cvSearch: 'Aliens Outbreak',
    cvId: 21126,
    imageUrl: null,
    desc: "The first canonical continuation of Aliens — Hicks and Newt years later, a rogue corporation's xenomorph weaponization program, and a confrontation with the alien queen mother.",
    tags: ['Dark Horse', 'Classic', 'Foundational']
  },
  {
    id: 33, type: 'comic', title: 'Aliens: Salvation', year: 1993, rating: 8.2,
    author: 'Dave Gibbons & Mike Mignola',
    cvSearch: 'Aliens Salvation',
    cvId: 21306,
    imageUrl: null,
    desc: "A missionary stranded on a xenomorph-infested world finds faith and fury in this gorgeous collaboration between Watchmen artist Dave Gibbons and Hellboy creator Mike Mignola.",
    tags: ['Dark Horse', 'Mignola', 'Standalone']
  },
  {
    id: 34, type: 'comic', title: 'Alien vs. Predator (Original)', year: 1990, rating: 8.0,
    author: 'Mark Verheiden & Mike Richardson',
    cvSearch: 'Alien vs Predator',
    cvId: 6812,
    imageUrl: null,
    desc: "The original AvP miniseries that launched one of pop culture's most enduring crossover concepts — a prospector on a remote world becomes the unwilling prize in an ancient ritual hunt.",
    tags: ['Dark Horse', 'AvP', 'Classic']
  },
  {
    id: 35, type: 'comic', title: 'Aliens: Defiance', year: 2016, rating: 7.9,
    author: 'Brian Wood',
    cvSearch: 'Aliens Defiance',
    cvId: 89910,
    imageUrl: null,
    desc: "Amanda Ripley and a synthetic named Zula Hendricks go rogue against Weyland-Yutani to investigate a derelict ship loaded with xenomorphs — a tense, character-driven series.",
    tags: ['Dark Horse', 'Amanda Ripley', 'Zula']
  },
  {
    id: 36, type: 'comic', title: 'Alien (Marvel #1)', year: 2021, rating: 7.8,
    author: 'Phillip Kennedy Johnson',
    cvSearch: 'Alien Marvel 2021',
    cvId: 134778,
    imageUrl: null,
    desc: "Marvel's acclaimed relaunch follows a retired Weyland-Yutani operative whose grandson becomes embroiled in a conspiracy involving artificially engineered xenomorphs — a fresh direction that respects the franchise's legacy.",
    tags: ['Marvel', 'Relaunch', 'Modern']
  },
  {
    id: 37, type: 'comic', title: 'Aliens: Resistance', year: 2019, rating: 7.5,
    author: 'Brian Wood',
    cvSearch: 'Aliens Resistance',
    cvId: 116673,
    imageUrl: null,
    desc: "The direct sequel to Defiance — Amanda Ripley and Zula Hendricks continue their battle against Weyland-Yutani's xenomorph weapons program in a tense, action-driven continuation.",
    tags: ['Dark Horse', 'Amanda Ripley', 'Canon']
  },
  {
    id: 38, type: 'comic', title: 'Aliens: Genocide', year: 1991, rating: 7.6,
    author: 'John Arcudi',
    cvSearch: 'Aliens Genocide',
    cvId: 21237,
    imageUrl: null,
    desc: "Humanity discovers that two distinct xenomorph hive strains have gone to war with each other — and launches a desperate mission to harvest the warring queen's royal jelly, a potential cure for a drug crisis.",
    tags: ['Dark Horse', 'War', 'Queen']
  },
  {
    id: 39, type: 'comic', title: "Aliens: Newt's Tale", year: 1992, rating: 7.8,
    author: 'Mike Richardson',
    cvSearch: "Aliens Newt's Tale",
    cvId: 39677,
    imageUrl: null,
    desc: "The complete story of Aliens retold from Newt's perspective — from the colony's first encounter with the xenomorphs through the fall of Hadley's Hope, her survival in the air ducts, and her rescue.",
    tags: ['Dark Horse', 'Newt', 'Retelling']
  },
  {
    id: 40, type: 'comic', title: 'Aliens: Colonial Marines', year: 1993, rating: 7.1,
    author: 'Dan Abnett & Ian Edginton',
    cvSearch: 'Aliens Colonial Marines',
    cvId: 21236,
    imageUrl: null,
    desc: "Dan Abnett and Ian Edginton's seminal comics run follows a squad of Colonial Marines across increasingly desperate xenomorph containment missions in the outer colonies.",
    tags: ['Dark Horse', 'Marines', 'Abnett']
  },
  {
    id: 41, type: 'comic', title: 'Aliens: Havoc', year: 1997, rating: 7.3,
    author: 'Mark Schultz',
    cvSearch: 'Aliens Havoc',
    cvId: 19333,
    imageUrl: null,
    desc: "A renegade platoon of marines deployed into a xenomorph-overrun city with no support and dwindling supplies — a gritty, kinetic survival story that treats urban xenomorph infestation with unrelenting intensity.",
    tags: ['Dark Horse', 'Military', 'Urban']
  },
  {
    id: 42, type: 'comic', title: 'Aliens: Aftermath', year: 2021, rating: 7.4,
    author: 'David Lapham',
    cvSearch: 'Aliens Aftermath',
    cvId: 137603,
    imageUrl: null,
    desc: "30 years after the events on LV-426, a team returns to examine what the xenomorphs left behind — and discovers the aftermath of that catastrophe in ways no one anticipated.",
    tags: ['Marvel', 'Standalone', 'LV-426']
  },
  {
    id: 43, type: 'comic', title: 'Alien: Bloodlines', year: 2022, rating: 7.6,
    author: 'Phillip Kennedy Johnson',
    cvSearch: 'Alien Bloodlines',
    cvId: 139776,
    imageUrl: null,
    desc: "The continuation of Marvel's flagship Alien series deepens its conspiracy thriller roots — a family torn apart by xenomorph trauma confronts new engineered variants and an escalating existential threat.",
    tags: ['Marvel', 'Sequel', 'Variants']
  },
  {
    id: 45, type: 'comic', title: 'Aliens vs. Predator: Three World War', year: 2010, rating: 7.5,
    author: 'Randy Stradley',
    cvSearch: 'Aliens vs Predator Three World War',
    cvId: 31059,
    imageUrl: null,
    desc: "An epic crossover in which a Predator subspecies has turned xenomorphs into weapons of war — and humanity, the standard Predator clans, and the xenomorphs are caught in a three-way conflict with civilizational stakes.",
    tags: ['Dark Horse', 'AvP', 'Epic']
  },
  {
    id: 46, type: 'comic', title: 'Alien: The Illustrated Story', year: 1979, rating: 8.0,
    author: 'Archie Goodwin & Walt Simonson',
    cvSearch: 'Alien The Illustrated Story',
    cvId: 25089,
    imageUrl: null,
    desc: "The original 1979 comic adaptation of Ridley Scott's film — Archie Goodwin's script and Walt Simonson's raw, kinetic artwork capture the Giger-esque horror with astonishing fidelity for its era.",
    tags: ['Adaptation', 'Classic', '1979']
  },

  // ── NEW MOVIES ──
  {
    id: 47, type: 'movie', title: 'AVP: Alien vs. Predator', year: 2004, rating: 5.6,
    director: 'Paul W.S. Anderson',
    imageUrl: 'https://www.themoviedb.org/t/p/w1280/ySWu5bCnnmgV1cVacvFnFIhgOjp.jpg',
    desc: 'A team of scientists and mercenaries descend into an ancient pyramid buried beneath the Antarctic ice — unaware they have walked into the middle of a centuries-old war between two apex species.',
    tags: ['Action', 'Crossover', 'AvP']
  },
  {
    id: 48, type: 'movie', title: 'Aliens vs. Predator: Requiem', year: 2007, rating: 4.7,
    director: 'Colin Strause & Greg Strause',
    imageUrl: 'https://www.themoviedb.org/t/p/w1280/5iTwPDNtvK6ZZF607BHBbU3HO0B.jpg',
    desc: 'A Predator ship crashes in a small Colorado town, releasing a Predalien hybrid and a swarm of xenomorphs on the unsuspecting population. A lone Predator arrives to clean up the mess.',
    tags: ['Horror', 'Crossover', 'AvP']
  },
  {
    id: 49, type: 'movie', title: 'Alien: Earth', year: 2025, rating: 7.8,
    director: 'Noah Hawley',
    imageUrl: 'https://www.themoviedb.org/t/p/w1280/yueXS3q8BtoWekcHOATFHicLl3e.jpg',
    desc: 'Set before the original film, a Weyland-Yutani spacecraft crash-lands on Earth carrying a deadly cargo. A young woman and a ragtag group must face the most terrifying life form in the universe — on their own planet.',
    tags: ['TV Series', 'Prequel', 'Sci-Fi']
  },

  // ── NEW GAMES ──
  {
    id: 50, type: 'game', title: 'Aliens: Dark Descent', year: 2023, rating: 7.5,
    developer: 'Tindalos Interactive',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/7/7a/Aliens_Dark_Descent_cover.png/revision/latest?cb=20230426191712',
    desc: 'A real-time squad tactics game set on a moon overrun by xenomorphs. Command a team of Colonial Marines in tense, permadeath-driven missions against overwhelming odds.',
    tags: ['Strategy', 'Tactics', 'Squad']
  },
  {
    id: 51, type: 'game', title: 'Alien 3: The Gun', year: 1993, rating: 6.8,
    developer: 'Sega AM1',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/a/ab/Alien3-_The_Gun_%28World%29.jpg/revision/latest?cb=20120202133256',
    desc: 'A light-gun arcade shooter set during the events of Alien 3 — players battle waves of xenomorphs across Fiorina 161 using a pump-action shotgun peripheral. A visceral and underrated arcade experience.',
    tags: ['Arcade', 'Light-Gun', 'Classic']
  },
  {
    id: 52, type: 'game', title: 'Alien: Blackout', year: 2019, rating: 6.2,
    developer: 'D3 Go!',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/3/32/Alien_Blackout_Logo.png/revision/latest/scale-to-width-down/1000?cb=20190107194158',
    desc: 'A mobile strategy-horror game set between Alien: Isolation and Aliens — Amanda Ripley must guide a crew through a crippled space station using only limited camera feeds and station systems.',
    tags: ['Mobile', 'Strategy', 'Amanda Ripley']
  },

  // ── NEW BOOKS ──
  {
    id: 53, type: 'book', title: 'Alien: Sea of Sorrows', year: 2014, rating: 7.4,
    author: 'James A. Moore',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/f/f8/Sea_of_Sorrows_Cover.jpg/revision/latest?cb=20141224100849',
    desc: 'A descendant of Ellen Ripley discovers a vast underground xenomorph nest beneath a colony world — and Weyland-Yutani will sacrifice anything to weaponize what lies beneath.',
    tags: ['Novel', 'Action', 'Ripley']
  },
  {
    id: 54, type: 'book', title: 'Alien: Echo', year: 2019, rating: 7.1,
    author: 'Mira Grant',
    imageUrl: "https://static.wikia.nocookie.net/avp/images/0/01/Alien_Echo.jpg/revision/latest/scale-to-width-down/1000?cb=20180925083221",
    desc: 'A young adult novel following teenage twins on a colony world who discover a xenomorph outbreak — a fresh perspective that brings the franchise\'s horror to a new generation of readers.',
    tags: ['Novel', 'YA', 'Coming of Age']
  },
  {
    id: 55, type: 'book', title: 'Aliens: Bishop', year: 2023, rating: 7.6,
    author: 'T. R. Napper',
    imageUrl: "https://static.wikia.nocookie.net/avp/images/f/f9/Aliens-_Bishop.jpg/revision/latest/scale-to-width-down/1000?cb=20230819131057",
    desc: 'The first novel to centre entirely on Bishop — the synthetic survivor of Aliens and Alien 3 — exploring his existence, his encounters with xenomorphs, and what it means to be artificial in a hostile universe.',
    tags: ['Novel', 'Bishop', 'Synthetic']
  },
  {
    id: 56, type: 'book', title: 'Alien: Enemy of My Enemy', year: 2023, rating: 7.2,
    author: 'Mary SanGiovanni',
    imageUrl: "https://static.wikia.nocookie.net/avp/images/1/10/AlienEnemyofMyEnemy.jpg/revision/latest/scale-to-width-down/1000?cb=20220816195935",
    desc: 'When a remote research station becomes overrun, a marine and a Predator must form an uneasy alliance to survive — an Alien vs. Predator novel that plays the crossover concept with unexpected seriousness.',
    tags: ['Novel', 'AvP', 'Action']
  },
  {
    id: 57, type: 'book', title: 'Alien (Alan Dean Foster Novelization)', year: 1979, rating: 7.3,
    author: 'Alan Dean Foster',
    imageUrl: "https://static.wikia.nocookie.net/avp/images/c/c3/A1N.jpg/revision/latest?cb=20140226093747",
    desc: "Alan Dean Foster's novelization of Ridley Scott's original film — published simultaneously with the movie and containing additional scenes and character detail not present in the theatrical cut.",
    tags: ['Novelization', 'Film Tie-In', 'Classic']
  },
  {
    id: 58, type: 'book', title: 'Aliens (Alan Dean Foster Novelization)', year: 1986, rating: 7.1,
    author: 'Alan Dean Foster',
    imageUrl: "https://static.wikia.nocookie.net/avp/images/2/2f/A2N.jpg/revision/latest?cb=20140226093755",
    desc: "Foster's adaptation of James Cameron's sequel — capturing the action-war epic on the page with additional character moments that flesh out the Colonial Marines beyond the film's already strong ensemble.",
    tags: ['Novelization', 'Film Tie-In', 'Action']
  },
  {
    id: 59, type: 'book', title: 'Alien 3 (Alan Dean Foster Novelization)', year: 1992, rating: 6.9,
    author: 'Alan Dean Foster',
    imageUrl: "https://static.wikia.nocookie.net/avp/images/4/46/A3N.jpg/revision/latest?cb=20140226093801",
    desc: "Foster's novelization of the troubled third film — uniquely valuable because it adapts a substantially different version of the screenplay, preserving story elements that never made it to screen.",
    tags: ['Novelization', 'Film Tie-In', 'Alternate Version']
  },
  {
    id: 60, type: 'book', title: 'Prometheus (Novelization)', year: 2012, rating: 6.7,
    author: 'Jon Spaihts & Damon Lindelof (adapted by Foster)',
    imageUrl: "https://static.wikia.nocookie.net/avp/images/9/93/Prometheus_%28novel%29.jpg/revision/latest?cb=20140407001844",
    desc: "Alan Dean Foster's novelization of Prometheus expands the film's philosophical ambitions with additional interiority and scenes that clarify some of the script's more deliberately opaque moments.",
    tags: ['Novelization', 'Film Tie-In', 'Prequel']
  },

  // ── NEW COMICS ──
  {
    id: 61, type: 'comic', title: 'Aliens: Life and Death', year: 2016, rating: 7.7,
    author: 'Dan Abnett',
    cvSearch: 'Aliens Life and Death',
    cvId: 94247,
    imageUrl: "https://static.wikia.nocookie.net/avp/images/f/f8/Sea_of_Sorrows_Cover.jpg/revision/latest?cb=20141224100849",
    desc: 'A squad of Colonial Marines barely escapes an Alien-overrun world, only to find themselves stranded on a Predator hunting ground. Dan Abnett weaves together the Alien, Predator, and Engineer mythologies in this ambitious crossover arc.',
    tags: ['Dark Horse', 'Crossover', 'Marines']
  },
  {
    id: 62, type: 'comic', title: 'Alien: Black, White & Blood', year: 2023, rating: 7.5,
    author: 'Various',
    cvSearch: 'Alien Black White Blood',
    cvId: 156962,
    imageUrl: null,
    desc: "A Marvel anthology series presenting new Alien stories in stark black-and-white with isolated red highlights — a format that strips the xenomorph back to its most visually terrifying and elemental form.",
    tags: ['Marvel', 'Anthology', 'Modern']
  },
  {
    id: 63, type: 'comic', title: 'Aliens: Apocalypse — The Destroying Angels', year: 1999, rating: 7.4,
    author: 'Mark Schultz',
    cvSearch: 'Aliens Apocalypse Destroying Angels',
    cvId: 6366,
    imageUrl: null,
    desc: 'A scientist obsessed with xenomorph biology attempts to engineer a perfect human-alien hybrid — a dark, philosophically unsettling story that asks what humanity is willing to sacrifice in the name of evolution.',
    tags: ['Dark Horse', 'Body Horror', 'Philosophical']
  },
  {
    id: 64, type: 'comic', title: 'Alien: Paradiso', year: 2024, rating: 7.3,
    author: 'Declan Shalvey',
    cvSearch: 'Alien Paradiso',
    cvId: 161610,
    imageUrl: null,
    desc: "A new Marvel series following survivors on a seemingly idyllic colony world that harbours a devastating secret — Declan Shalvey brings his distinctive visual style to the franchise with confident results.",
    tags: ['Marvel', 'Modern', 'Colony']
  },
];