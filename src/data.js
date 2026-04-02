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
    detailedDesc: "Sigourney Weaver's Ellen Ripley was cinema's first true female action hero. The Xenomorph — designed by Swiss surrealist H.R. Giger — remains one of the most terrifying creature designs ever committed to screen. The film's slow build, industrial aesthetic, and pitch-black ending set a standard for science-fiction horror that has never been surpassed.",
    pros: ["Masterpiece of slow-burn atmospheric tension", "H.R. Giger's creature design is timeless and viscerally disturbing", "Sigourney Weaver delivers a career-defining performance", "Every production detail — sound, lighting, set design — is meticulous"],
    cons: ["Deliberately slow pacing may frustrate modern viewers", "Some plot conveniences required for the story to function", "Ash's reveal may feel telegraphed on re-watch"],
    tags: ['Horror', 'Sci-Fi', 'Survival']
  },
  {
    id: 2, type: 'movie', title: 'Aliens', year: 1986, rating: 8.3,
    director: 'James Cameron',
    imageUrl: 'https://image.tmdb.org/t/p/w500/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg',
    desc: "Ellen Ripley returns to LV-426 alongside a squad of colonial marines — only to discover the colony has been overrun by an entire hive. James Cameron's sequel transforms intimate horror into a breathless action-war epic.",
    detailedDesc: "Widely regarded as one of the greatest sequels ever made. The colonial marines — each vividly characterized — bring a warmth that makes the horror hit harder. The final confrontation between Ripley in a power-loader and the Alien Queen is one of cinema's greatest climaxes.",
    pros: ["Perfect tonal shift from horror to action — both elements excel", "Unforgettable ensemble cast of colonial marines", "Power-loader vs Alien Queen is one of cinema's greatest sequences", "Ripley's maternal bond with Newt grounds the spectacle in emotion"],
    cons: ["Tonal shift from horror to action divides purists", "Some marines are broad archetypes rather than deep characters", "The theatrical cut feels rushed compared to the extended version"],
    tags: ['Action', 'Sci-Fi', 'Military']
  },
  {
    id: 3, type: 'movie', title: 'Alien 3', year: 1992, rating: 6.4,
    director: 'David Fincher',
    imageUrl: 'https://image.tmdb.org/t/p/w500/xh5wI0UoW7DfS1IyLy3d2CgrCEP.jpg',
    desc: "Ripley crash-lands on Fiorina 161, a maximum-security prison colony with no weapons. David Fincher's debut feature — made under brutal studio interference — remains a flawed but haunting film.",
    detailedDesc: "Fincher famously disowned the film due to extensive studio interference, yet both cuts contain sequences of genuine brilliance. The atmosphere is suffocating, and Weaver's performance is arguably her finest in the series. The controversial deaths of Hicks and Newt in the opening destroyed audience goodwill.",
    pros: ["Sigourney Weaver delivers her most nuanced Ripley performance", "The prison setting creates a genuinely claustrophobic horror atmosphere", "The self-sacrifice ending is brave and emotionally resonant", "Assembly cut vastly improves the theatrical version"],
    cons: ["Killing Hicks and Newt off-screen in the opening is deeply controversial", "Troubled production history is visible in the final cut", "CGI alien is severely dated and drags key sequences", "Characters are difficult to distinguish with their shaved heads"],
    tags: ['Horror', 'Drama', 'Sci-Fi']
  },
  {
    id: 4, type: 'movie', title: 'Alien Resurrection', year: 1997, rating: 6.2,
    director: 'Jean-Pierre Jeunet',
    imageUrl: 'https://image.tmdb.org/t/p/w500/9aRDMlU5Zwpysilm0WCWzU2PCFv.jpg',
    desc: '200 years after Alien 3, Ripley is cloned with xenomorph DNA so scientists can harvest the queen within her. A bizarre, campy, often mesmerizing entry in the series.',
    detailedDesc: "Written by Joss Whedon and directed by Jean-Pierre Jeunet, Alien Resurrection is a fascinatingly odd film. Its darkly comic tone divides audiences, but the production design is inventive and the underwater xenomorph sequence is genuinely stunning.",
    pros: ["Visually inventive with distinctive French New Wave aesthetic", "The underwater xenomorph chase sequence is spectacular", "Ron Perlman brings enormous energy and wit", "Dark humor gives the film a unique voice in the franchise"],
    cons: ["Tonally inconsistent — horror, comedy, and body-horror rarely cohere", "The Newborn alien design is widely regarded as the franchise's worst", "Joss Whedon publicly disowned the final film as a misreading of his script", "Clone-Ripley's identity crisis is intriguing but underdeveloped"],
    tags: ['Action', 'Sci-Fi', 'Dark Comedy']
  },
  {
    id: 5, type: 'movie', title: 'Prometheus', year: 2012, rating: 7.0,
    director: 'Ridley Scott',
    imageUrl: 'https://image.tmdb.org/t/p/w500/qsYQflQhOuhDpQ0W2aOcwqgDAeI.jpg',
    desc: "Scientists follow a star map found in ancient cave paintings to a distant moon, seeking the origins of humanity. What they find is something ancient, vast, and deeply hostile.",
    detailedDesc: "Prometheus is deeply ambitious but hampered by its script's failure to match its ideas with coherent character behavior. Michael Fassbender's David — a synthetic who wrestles with his own creation — is among the franchise's most complex characters.",
    pros: ["Stunning cinematography — visually the most beautiful film in the series", "Michael Fassbender's David is one of cinema's best synthetic characters", "Ambitious philosophical themes about creation and belief", "Noomi Rapace's self-surgery sequence is one of the franchise's most shocking moments"],
    cons: ["Characters make baffling, illogical decisions throughout", "Raises vast questions it never adequately answers", "The Alien connection feels forced and diminishes the mystery", "Many feel it deliberately obscures rather than explores its ideas"],
    tags: ['Sci-Fi', 'Mystery', 'Prequel']
  },
  {
    id: 6, type: 'movie', title: 'Alien: Covenant', year: 2017, rating: 6.4,
    director: 'Ridley Scott',
    imageUrl: 'https://image.tmdb.org/t/p/w500/zecMELPbU5YMQpC81Z8ImaaXuf9.jpg',
    desc: "The crew of the colony ship Covenant discover an uncharted paradise inhabited only by the rogue synthetic David, who has been conducting horrifying experiments for a decade.",
    detailedDesc: "Covenant course-corrects many of Prometheus's issues by delivering genuine xenomorph horror and fast-paced action. Fassbender's dual performance as both David and the newer model Walter is extraordinary. However, positioning David as the xenomorph's creator remains a divisive choice.",
    pros: ["Michael Fassbender's dual role is extraordinary — career-best work", "Returns the franchise to genuine horror with effective Xenomorph sequences", "Beautiful visuals continue the prequel trilogy's stunning cinematography", "David as engineer of xenomorphs is a bold and provocative idea"],
    cons: ["Abandons the fascinating Engineer mythology set up in Prometheus", "The colonists make implausible decisions throughout", "The twist ending is telegraphed far too early for careful viewers", "Danny McBride is miscast in a dramatic role"],
    tags: ['Sci-Fi', 'Horror', 'Prequel']
  },
  {
    id: 7, type: 'movie', title: 'Alien: Romulus', year: 2024, rating: 7.3,
    director: 'Fede Álvarez',
    imageUrl: 'https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg',
    desc: "A group of young colonial workers stumble onto an abandoned space station between the events of Alien and Aliens. Fede Álvarez strips the franchise back to pure survival horror with extraordinary results.",
    detailedDesc: "Alien: Romulus is arguably the most purely terrifying film since the original. Álvarez's direction is masterful — he understands Alien works best as a haunted house film set in space. Cailee Spaeny's Rain Carradine is an instantly compelling heroine.",
    pros: ["Returns the franchise to pure atmospheric horror with masterful tension", "Cailee Spaeny is an instantly iconic franchise heroine", "The space station setting provides perfect claustrophobic horror", "Practical effects and creature work are exceptional throughout"],
    cons: ["De-aging technology for one key character is divisive and unconvincing", "Some plot beats feel recycled from earlier entries", "The final act introduces a creature design that not all fans accepted", "A few characters are underdeveloped despite solid performances"],
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
    detailedDesc: "Creative Assembly studied hundreds of hours of footage from the original film to recreate its aesthetic with stunning accuracy. The Xenomorph's AI is procedurally driven — it learns from your behavior, making every hiding spot feel temporary. The sound design is extraordinary.",
    pros: ["The most faithful and atmospheric recreation of the original film's world", "The Xenomorph AI is genuinely revolutionary — learns and adapts to your tactics", "Sound design is among the finest in gaming history", "Amanda Ripley is a compelling and well-written protagonist"],
    cons: ["The game is significantly too long — later chapters dilute tension", "Repeated Xenomorph encounters become routine in the final third", "Human enemies in certain chapters are far less interesting than the alien", "High difficulty may frustrate players seeking a narrative experience"],
    tags: ['Survival Horror', 'Stealth', 'First-Person']
  },
  {
    id: 9, type: 'game', title: 'Alien vs. Predator (1999)', year: 1999, rating: 8.2,
    developer: 'Rebellion',
    rawgSearch: 'Aliens vs Predator 1999',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/3/31/AvP1.jpg/revision/latest?cb=20160418145935nnnj',
    desc: "Play as a Colonial Marine, Alien, or Predator in three distinct campaigns — each with entirely different gameplay mechanics. A landmark first-person shooter that remains a cult classic.",
    detailedDesc: "AvP 1999 was revolutionary for its era. The Marine campaign remains one of gaming's most effective horror experiences — the motion tracker's bleeping is genuinely terrifying. The Alien and Predator campaigns offered entirely different experiences that shaped the visual language of xenomorphs in games for decades.",
    pros: ["Three radically different gameplay experiences in one package", "The Marine campaign is one of gaming's great horror experiences", "Motion tracker audio cue is a masterpiece of tension design", "Franchise-defining aesthetic influence still felt in modern games"],
    cons: ["Severely dated by modern graphical standards", "Campaigns are relatively short by today's expectations", "Story depth is minimal across all three campaigns", "Some mechanics have aged poorly"],
    tags: ['FPS', 'Action', 'Classic']
  },
  {
    id: 10, type: 'game', title: 'Alien Trilogy', year: 1996, rating: 7.2,
    developer: 'Probe Entertainment',
    rawgSearch: 'Alien Trilogy',
    imageUrl: 'https://static.wikia.nocookie.net/alienanthology/images/b/b2/Alien_Trilogy.jpg/revision/latest/scale-to-width-down/300?cb=20190501162059',
    desc: "A first-person shooter adaptation of all three original Alien films — explore levels drawn from each movie while battling xenomorphs with a satisfying arsenal of period-authentic weapons.",
    detailedDesc: "Alien Trilogy was a landmark for the franchise in gaming, offering the first comprehensive tour through the world of all three films. Its atmosphere was remarkable for its era and its sound design — drawing directly from the films' audio libraries — gave it an authenticity later games would strive for.",
    pros: ["Comprehensive tour through all three original film environments", "Authentic sound design draws directly from the films", "Solid gunplay for its era with a well-chosen weapon selection", "A genuine piece of franchise gaming history"],
    cons: ["Graphically obsolete by modern standards", "Level design is linear and rarely surprising", "Enemy AI is rudimentary even by 1990s standards", "Little narrative depth beyond 'go here and shoot things'"],
    tags: ['FPS', 'Classic', 'Retro']
  },
  {
    id: 11, type: 'game', title: 'Alien: Infestation', year: 2011, rating: 7.8,
    developer: 'WayForward',
    rawgSearch: 'Alien Infestation',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/f/f5/Aliens-Infestation.jpg/revision/latest?cb=20111016091235',
    desc: "A 2D Metroidvania for Nintendo DS set after Aliens — command a squad of 19 Colonial Marines with permanent death and gorgeous pixel art. One of the franchise's most underrated entries.",
    detailedDesc: "WayForward brought their pixel-art mastery to this surprisingly deep Metroidvania. Each of the 19 marines has a name and personality — and when they die, they're gone for good. The weight this adds to every encounter is remarkable.",
    pros: ["Permanent death system makes every combat encounter genuinely tense", "19 individually named marines creates real emotional investment", "Gorgeous pixel art captures the franchise aesthetic beautifully", "Smart Metroidvania design with excellent exploration and backtracking"],
    cons: ["Limited to Nintendo DS — never received a wider release", "Permanent death can be devastating and frustrating for some players", "Short overall length compared to similar genre titles", "Story is thin despite its canonical ambitions"],
    tags: ['Metroidvania', '2D', 'Handheld']
  },
  {
    id: 12, type: 'game', title: 'Alien vs. Predator (2010)', year: 2010, rating: 5.8,
    developer: 'Rebellion',
    rawgSearch: 'Aliens vs Predator 2010',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/10680/header.jpg',
    desc: "Rebellion's 2010 reboot returns with three playable species and updated graphics — but fails to recapture the atmosphere or innovation of the 1999 original despite competent production values.",
    detailedDesc: "Anticipated as a triumphant return, AvP 2010 ultimately disappoints despite its technical proficiency. The three campaigns are shorter and less inventive than their predecessor.",
    pros: ["Three-species multiplayer offers genuinely unique asymmetric gameplay", "Predator campaign provides the best individual experience of the three", "Technically competent with solid controls and production values", "The honor system in multiplayer adds interesting strategic depth"],
    cons: ["Significantly inferior to the 1999 original in atmosphere and design", "Marine campaign lacks the terror that made the classic iconic", "Story across all three campaigns is thin and unmemorable", "Multiplayer servers are now largely inactive"],
    tags: ['FPS', 'Action', 'Multiplayer']
  },
  {
    id: 13, type: 'game', title: 'Aliens: Colonial Marines', year: 2013, rating: 4.5,
    developer: 'Gearbox Software',
    rawgSearch: 'Aliens Colonial Marines',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/c/c5/AliensColonialMarinesBox.png/revision/latest?cb=20120614111153',
    desc: "A squad-based first-person shooter set after Aliens — marketed aggressively as a canonical sequel. Became one of gaming's most infamous releases after the finished product diverged dramatically from pre-release demonstrations.",
    detailedDesc: "The Colonial Marines controversy centered on a pre-release demo that bore little resemblance to the shipping product. A notable modder later discovered the AI was broken by a single typo in the game's code. Even fixed, it remains a mediocre experience.",
    pros: ["Canonical story elements add genuine value to franchise lore", "Weapon and equipment designs are faithfully recreated from the films", "Co-op campaign offers moderate fun with friends despite its flaws", "Modding community has improved the experience significantly"],
    cons: ["Infamously misrepresented in pre-release marketing materials", "Xenomorph AI was literally broken by a coding error", "Visuals and animations are a significant step below contemporary titles", "The story, despite canonical ambitions, is thin and forgettable"],
    tags: ['FPS', 'Co-op', 'Controversial']
  },
  {
    id: 14, type: 'game', title: 'Aliens: Fireteam Elite', year: 2021, rating: 6.5,
    developer: 'Cold Iron Studios',
    rawgSearch: 'Aliens Fireteam Elite',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/7/7f/Aliens-_Fireteam_Elite.jpg/revision/latest?cb=20240120123757',
    desc: "A third-person co-operative shooter set 23 years after the original trilogy — three marines face waves of xenomorphs and synthetics across a four-chapter campaign.",
    detailedDesc: "Fireteam Elite knows exactly what it is — a competent co-op horde shooter in the Alien universe. It doesn't attempt to be Isolation. The class system is satisfying, enemy variety is impressive, and the xenomorph behavior is authentically threatening.",
    pros: ["Solid co-op gameplay with a well-designed class system", "Impressive enemy variety including multiple xenomorph types", "Genuinely faithful to the franchise's visual and audio identity", "Challenge mode adds significant replayability beyond the base campaign"],
    cons: ["Solo play exposes the game's design limitations starkly", "Narrative is thin and forgettable despite the canonical setting", "Repetition sets in during extended play sessions", "Microtransaction cosmetic system feels intrusive for a premium title"],
    tags: ['Co-op', 'TPS', 'Action']
  },
  {
    id: 15, type: 'game', title: 'Alien: Rogue Incursion', year: 2024, rating: 7.0,
    developer: 'Survios',
    rawgSearch: 'Alien Rogue Incursion',
    imageUrl: 'https://static.wikia.nocookie.net/avp/images/1/1d/Alien_Rogue_Incursion_%282024%29_cover.jpg/revision/latest?cb=20240728124042',
    desc: "The first major VR entry in the franchise plunges players into a Weyland-Yutani research facility overrun by xenomorphs — delivering an unparalleled sense of physical presence in the Alien universe.",
    detailedDesc: "Rogue Incursion is a genuine achievement for VR gaming — the sense of scale when a xenomorph looms over you is unlike anything achievable on a flat screen. The stealth mechanics translate exceptionally well to VR.",
    pros: ["Groundbreaking VR immersion — the xenomorph's scale is genuinely terrifying", "Faithful recreation of the franchise's aesthetic in an interactive VR space", "Stealth mechanics translate exceptionally well to the VR medium", "Strong original narrative that respects established franchise lore"],
    cons: ["Requires expensive VR hardware to experience", "Relatively short campaign for the price point at launch", "Some VR comfort issues during intense sequences", "Occasional jank in interaction systems disrupts immersion at key moments"],
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
    detailedDesc: "Alex White's debut franchise novel is a sophisticated thriller that uses the xenomorph as backdrop for a genuinely complex character study. Blue Marsalis — the terminally ill scientist who conducts her research through a synthetic proxy body — is one of the most morally fascinating protagonists in any Alien fiction.",
    pros: ["Blue Marsalis is one of the best-written protagonists in any Alien novel", "Corporate horror and xenomorph horror are balanced with equal skill", "Explores genuinely novel ideas about consciousness and proxy embodiment", "Alex White's prose is exceptional — literary quality above most franchise fiction"],
    cons: ["Dark and morally uncomfortable — not for readers seeking a straightforward adventure", "The corporate antagonist's arc is somewhat predictable", "Slower pace than action-focused entries may disappoint some readers", "The ending is bleak even by franchise standards"],
    tags: ['Novel', 'Thriller', 'Weyland-Yutani']
  },
  {
    id: 17, type: 'book', title: 'Alien: Into Charybdis', year: 2021, rating: 8.0,
    author: 'Alex White',
    isbn: '9781789091304',
    imageUrl: 'https://covers.openlibrary.org/b/id/10873660-M.jpg',
    desc: "A deep-space natural gas facility becomes a death trap when a xenomorph outbreak coincides with a corporate conspiracy — and survivors must navigate both threats to escape a planet-sized killing machine.",
    detailedDesc: "Alex White's second franchise novel is even more assured than The Cold Forge. The ensemble cast is exceptionally well-drawn, the pacing is tighter, and the corporate conspiracy plot dovetails beautifully with the creature horror.",
    pros: ["Alex White's writing continues to be the finest in the novel line", "Ensemble cast is exceptionally well-characterized", "Corporate conspiracy and creature horror are beautifully integrated", "The facility setting is vividly realized with exceptional spatial clarity"],
    cons: ["Continuity with The Cold Forge is helpful but not immediately obvious", "Some ensemble characters receive less development than they deserve", "The corporate antagonists are somewhat one-dimensional compared to the protagonists", "The climax feels slightly rushed given the careful build-up"],
    tags: ['Novel', 'Survival', 'Corporate']
  },
  {
    id: 18, type: 'book', title: 'Alien: Phalanx', year: 2020, rating: 7.8,
    author: 'Scott Sigler',
    isbn: '9781789091076',
    imageUrl: 'https://covers.openlibrary.org/b/id/13288948-M.jpg',
    desc: "On a planet where xenomorphs have wiped out technology, a pre-industrial human society survives by maintaining distance from the hive — until one brave runner discovers that salvation requires facing the darkness directly.",
    detailedDesc: "Sigler's utterly unique contribution to the franchise imagines a world stripped of technology, forcing humans to confront the xenomorph threat with medieval tools and tactics. The result is something thrilling and entirely new — part fantasy epic, part survival horror.",
    pros: ["The post-apocalyptic pre-industrial setting is genuinely unique in the franchise", "Sigler's action writing is kinetic and visceral", "The exploration of how humanity adapts to xenomorph coexistence is fascinating", "A genuinely original idea that expands what an Alien story can be"],
    cons: ["The hero's journey structure is familiar despite the inventive setting", "Some readers may find the fantasy-adjacent medieval world jarring", "World-building is sometimes dense at the expense of character depth", "The xenomorph threat feels slightly neutered by the normalizing premise"],
    tags: ['Novel', 'Post-Apocalyptic', 'Unique']
  },
  {
    id: 19, type: 'book', title: 'Aliens: Vasquez', year: 2023, rating: 7.7,
    author: 'V. Castro',
    isbn: '9781803362762',
    imageUrl: 'https://covers.openlibrary.org/b/id/13558565-M.jpg',
    desc: "The origin story of Private Jenette Vasquez — one of the most iconic characters in Aliens — tracing her life from childhood in Los Angeles through her enlistment and the events of LV-426.",
    detailedDesc: "V. Castro's passionate novel succeeds because it takes Vasquez seriously as a full human being rather than a badass archetype. Her Mexican-American heritage, her family history, and her complicated relationship with violence are all explored with depth.",
    pros: ["Vasquez is fully realized as a complex, three-dimensional character", "V. Castro's prose is passionate and emotionally intelligent throughout", "The cultural specificity enriches the character enormously", "The bridge into the events of Aliens is handled with admirable fidelity"],
    cons: ["Readers expecting action-heavy marine fiction may be surprised by the introspective tone", "Some sections of the backstory are more compelling than others", "The transition between origin story and film events can feel abrupt", "Some readers may miss the significance without knowing Aliens"],
    tags: ['Novel', 'Character Study', 'Vasquez']
  },
  {
    id: 20, type: 'book', title: 'Aliens: Bug Hunt', year: 2017, rating: 7.6,
    author: 'Jonathan Maberry (Ed.)',
    isbn: '9781785654572',
    imageUrl: 'https://covers.openlibrary.org/b/id/8742185-M.jpg',
    desc: "An anthology of 17 original stories by acclaimed horror and science fiction authors — marines, scientists, mercenaries, and colonists face the xenomorph threat across diverse settings and timelines.",
    detailedDesc: "Anthology collections live and die by variance in quality, and Bug Hunt is remarkably consistent. The best stories — particularly those by Yvonne Navarro and Dan Abnett — are among the finest short fiction in the franchise.",
    pros: ["Exceptional consistency across 17 stories — very few weak entries", "Diverse tones and settings show the franchise's narrative range", "Several stories are among the best franchise fiction in any format", "The anthology format allows experimental approaches impossible in novels"],
    cons: ["Unavoidable inconsistency in quality between contributors", "Short story format means few characters receive the depth of full novels", "Some stories feel franchise-adjacent rather than truly Alien in spirit", "The anthology structure prevents a sustained narrative throughline"],
    tags: ['Anthology', 'Short Stories', 'Military']
  },
  {
    id: 21, type: 'book', title: 'Alien: River of Pain', year: 2014, rating: 7.5,
    author: 'Christopher Golden',
    isbn: '9781781167526',
    imageUrl: 'https://covers.openlibrary.org/b/id/10203190-M.jpg',
    desc: "The untold story of the Hadley's Hope colonists on LV-426 — what happened to those families in the days and weeks before the Colonial Marines arrived in Aliens.",
    detailedDesc: "Christopher Golden centers on ordinary colonists — the parents, children, and workers who built their lives on LV-426. Seeing the colony's fall from a civilian perspective transforms what was background tragedy in Aliens into something genuinely devastating.",
    pros: ["A humanizing perspective on events previously shown only as aftermath", "The colonist characters are powerfully rendered — particularly the children", "Faithfully expands canonical events from Aliens with no contradictions", "Christopher Golden's emotional intelligence elevates franchise fiction"],
    cons: ["The outcome is known before page one, limiting dramatic tension", "Some readers may find the domestic focus slow compared to action entries", "A few character threads are underdeveloped given the ensemble size", "The xenomorph sequences break from the human drama that makes the book special"],
    tags: ['Novel', 'LV-426', 'Prequel']
  },
  {
    id: 22, type: 'book', title: 'Alien: Colony War', year: 2023, rating: 7.5,
    author: 'David Barnett',
    isbn: '9781803362236',
    imageUrl: 'https://imgcdn.saxo.com/_9781789098891',
    desc: "Caught between a brewing colonial independence movement and a catastrophic xenomorph outbreak, survivors must navigate a battlefield where humans are killing humans while something far worse hunts them all.",
    detailedDesc: "Colony War is an ambitious novel that uses the xenomorph threat as backdrop to political and military conflict — asking what happens when ideological warfare and species-level horror collide.",
    pros: ["The intersection of colonial politics and xenomorph horror is inventive and fresh", "Strong ensemble with diverse and well-differentiated character voices", "Barnett's action writing is confident and pacey", "Raises interesting questions about autonomy, ideology, and survival"],
    cons: ["Ambitious scope occasionally stretches the narrative thin", "Some political world-building requires more context than is provided", "Several characters are underdeveloped given the large ensemble", "The xenomorphs sometimes feel secondary to the human conflict"],
    tags: ['Novel', 'Colony', 'War']
  },
  {
    id: 23, type: 'book', title: 'Alien: Out of the Shadows', year: 2014, rating: 7.2,
    author: 'Tim Lebbon',
    isbn: '9781781167502',
    imageUrl: 'https://covers.openlibrary.org/b/id/10256324-M.jpg',
    desc: "A canonical novel set between Alien and Aliens — Ripley, still drifting in hypersleep, is awakened when a mining crew on a storm-wracked planet makes a catastrophic discovery.",
    detailedDesc: "Tim Lebbon has the difficult task of writing a story featuring Ripley between the two films without affecting her established arc. His canonical solution threads the needle with skill. The mining vessel setting and the storm-world planet are vividly realized.",
    pros: ["Skillfully navigates the canonical constraints of its between-films setting", "Captures the original film's dread and industrial atmosphere faithfully", "New characters are well-drawn and emotionally engaging", "Tim Lebbon's prose style suits the franchise's tone perfectly"],
    cons: ["The canonical solution for keeping Ripley's arc intact feels contrived", "Pacing sags in the middle section during the planet exploration", "Less inventive than some later entries in the novel line", "The resolution may frustrate rather than satisfy"],
    tags: ['Novel', 'Canon', 'Ripley']
  },
  {
    id: 24, type: 'book', title: 'Alien: Prototype', year: 2019, rating: 7.3,
    author: 'Tim Waggoner',
    isbn: '9781789090970',
    imageUrl: 'https://covers.openlibrary.org/b/id/10159644-M.jpg',
    desc: "A corporate geneticist at a rival company discovers a new xenomorph subspecies with enhanced intelligence — and must fight to stop it from escaping a research facility.",
    detailedDesc: "Tim Waggoner's contribution to the novel line is a propulsive, fast-paced thriller that prioritizes momentum over depth. The new subspecies concept is genuinely interesting — an alien that learns, adapts, and strategizes is terrifying in a way the standard creature cannot be.",
    pros: ["The evolved xenomorph subspecies concept is genuinely frightening and inventive", "Fast-paced thriller structure keeps the narrative moving effectively", "The rival corporation setting expands the franchise's corporate world interestingly", "A solid, reliable entry that delivers on its premise without overreaching"],
    cons: ["Character development is thin — the thriller pacing leaves little room for depth", "The new subspecies concept isn't explored to its full potential", "Prose style is functional rather than literary", "Predictable structural beats follow the survival thriller formula closely"],
    tags: ['Novel', 'Subspecies', 'Research']
  },
  {
    id: 25, type: 'book', title: 'Alien: The Weyland-Yutani Report', year: 2016, rating: 7.9,
    author: 'S.D. Perry',
    isbn: '9781608879434',
    imageUrl: 'https://covers.openlibrary.org/b/id/8883928-M.jpg',
    desc: "An in-universe classified dossier compiled by Weyland-Yutani's Special Services division — documenting all known xenomorph encounters, covert operations, Ripley's complete file, and extensive biological analysis.",
    detailedDesc: "The Weyland-Yutani Report is an exceptional piece of franchise world-building — a coffee-table book disguised as corporate espionage. The in-universe framing is handled with intelligence and wit, and the design work is outstanding.",
    pros: ["Extraordinary design work — the in-universe presentation is convincingly authentic", "Comprehensive synthesis of all film canon through Prometheus", "S.D. Perry's writing captures the corporate voice perfectly", "An essential reference for fans of the franchise's lore and world-building"],
    cons: ["Pre-dates Covenant, Romulus, and much of the expanded universe", "Some design elements prioritize aesthetic over readability", "The in-universe framing limits how certain franchise events can be addressed directly", "More reference book than narrative — not for readers seeking story"],
    tags: ['Reference', 'Lore', 'Art Book']
  },
  {
    id: 26, type: 'book', title: "Alien: Inferno's Fall", year: 2022, rating: 7.4,
    author: 'Philippa Ballantine & Clara Carija',
    isbn: '9781803362700',
    imageUrl: 'https://covers.openlibrary.org/b/id/13614874-M.jpg',
    desc: "The Jackals — a scrappy band of survivors — battle xenomorphs and the full force of Weyland-Yutani across the ruins of a fallen colony in a kinetic, character-driven action novel.",
    detailedDesc: "Ballantine and Carija bring a collaborative energy to the Jackals' story that gives the novel a distinctive rhythm. The team dynamic is well-established, the action sequences are kinetic and well-choreographed, and the corporate antagonism feels genuinely threatening.",
    pros: ["The Jackals ensemble is charismatic and well-differentiated", "Action sequences are kinetic, well-paced, and exciting throughout", "Corporate antagonism is handled with satisfying menace", "The collaborative authorship gives the novel an energetic, distinctive voice"],
    cons: ["Readers unfamiliar with previous Jackals entries may struggle with the established dynamics", "Some plot elements are dependent on prior novel knowledge", "The xenomorph threat feels familiar compared to more inventive entries", "Character growth follows somewhat predictable arcs"],
    tags: ['Novel', 'Action', 'Jackals']
  },
  {
    id: 27, type: 'book', title: 'Alien: Uncivil War', year: 2023, rating: 7.3,
    author: 'Brendan Deneen',
    isbn: '9781803362748',
    imageUrl: 'https://imgcdn.saxo.com/_9798874695385',
    desc: "A soldier unravels a vast conspiracy linking humanity's civil wars to a Weyland-Yutani xenomorph weaponization program — discovering that the most dangerous predator may be the one funding the conflict.",
    detailedDesc: "Uncivil War is a conspiracy thriller in the Alien universe that works better as a political narrative than a horror one. Deneen's background in storytelling gives him a strong handle on plot mechanics, and the central conspiracy is inventive.",
    pros: ["The conspiracy thriller structure is inventive and well-plotted", "Political dimensions add fresh thematic depth to franchise fiction", "The central mystery is genuinely engaging and well-paced", "Strong sense of the expanded universe's political geography"],
    cons: ["Xenomorphs feel secondary to the human conspiracy — horror fans may be disappointed", "Some characters lack the depth to carry the narrative weight placed on them", "The resolution of the conspiracy is slightly too neat", "Prose is competent but rarely reaches the literary quality of the line's best entries"],
    tags: ['Novel', 'Military', 'Conspiracy']
  },
  {
    id: 28, type: 'book', title: 'Alien: Covenant — Origins', year: 2017, rating: 6.8,
    author: 'Alan Dean Foster',
    isbn: '9781785657016',
    imageUrl: 'https://covers.openlibrary.org/b/id/10129303-M.jpg',
    desc: "A prequel to Alien: Covenant following the colony ship crew before they depart — exploring their relationships, motivations, and the opposition they face before ever leaving Earth's orbit.",
    detailedDesc: "Alan Dean Foster is the franchise's most experienced novelization hand — he wrote the original Alien novelization in 1979. Origins is a workmanlike entry that provides useful character context for Covenant's crew without being essential reading.",
    pros: ["Provides useful character background for the Covenant crew before their mission", "Alan Dean Foster's professional craft ensures reliable, smooth storytelling", "The Earth-based conspiracy subplot is an interesting addition to franchise lore", "Short and efficiently paced — doesn't outstay its welcome"],
    cons: ["Ultimately feels non-essential for viewers who've seen Covenant", "Character work doesn't transcend what the film itself provides", "The conspiracy elements are not resolved with full satisfaction", "Less inventive than the stronger entries in the novel line"],
    tags: ['Novel', 'Prequel', 'Covenant']
  },
  {
    id: 29, type: 'book', title: 'Alien: Resurrection (Novelization)', year: 1997, rating: 6.5,
    author: 'A.C. Crispin',
    isbn: '9780446604697',
    imageUrl: 'https://covers.openlibrary.org/b/id/6957542-M.jpg',
    desc: "A.C. Crispin's adaptation of the fourth film expands Joss Whedon's script with additional interiority, backstory for the supporting cast, and deeper exploration of the cloned Ripley's fractured psychology.",
    detailedDesc: "Crispin does honorable work here — Ripley's internal experience of her cloned existence is more fully explored, and several supporting characters receive welcome depth. It remains fundamentally tied to the film's weaknesses, but represents the best version of this story's potential.",
    pros: ["Deeper exploration of clone-Ripley's psychological disorientation than the film provides", "Supporting characters receive more development and backstory", "Crispin's prose is competent and moves efficiently", "Provides a more complete experience than the film alone"],
    cons: ["Fundamentally limited by the source material's weaknesses", "The Newborn's presence is no more palatable on the page", "Cannot transcend the film's tonal inconsistencies", "Less essential than novelizations of stronger films in the series"],
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
    detailedDesc: "James Stokoe spent years creating Dead Orbit, and every page demonstrates why. His artwork is incomprehensibly detailed — industrial textures, alien biomechanics, and zero-gravity horror rendered in pen-and-ink with obsessive precision. Dead Orbit is not just a great franchise comic — it is a great comic, period.",
    pros: ["James Stokoe's artwork is among the most detailed and beautiful in franchise history", "Non-linear structure creates genuine tension even when the protagonist's survival is known", "The space station setting is used with exceptional spatial intelligence", "A benchmark for what Alien comics can achieve — essential reading"],
    cons: ["Very slow release schedule as Stokoe works solo — patience required during publication", "Relatively short page count for the years it took to produce", "Some readers find the non-linear structure confusing on first read", "The intimate scale means the story's ambitions are narrow, if perfectly executed"],
    tags: ['Dark Horse', 'Masterpiece', 'Stokoe']
  },
  {
    id: 31, type: 'comic', title: 'Aliens (Dark Horse Original)', year: 1988, rating: 8.5,
    author: 'Mark Verheiden',
    cvSearch: 'Aliens',
    cvId: 4132,
    imageUrl: null,
    desc: "The landmark comic that defined the expanded universe — set years after Aliens, Hicks and Newt discover the xenomorphs have reached Earth. Brutal, visionary, and influential beyond measure.",
    detailedDesc: "Mark Verheiden's original Aliens comic was the first major canonical expansion of the franchise. The concept — bringing the xenomorph threat to Earth — was audacious. When the films later contradicted its continuity by killing Hicks and Newt, the comics were retroactively renamed — but their influence remained total.",
    pros: ["Foundational franchise text — shaped every expanded universe entry that followed", "The Earth invasion concept is brilliantly realized and genuinely terrifying", "Hicks and Newt are given the continuation many fans felt the films denied them", "Mark Nelson's art balances human drama and alien horror with consummate skill"],
    cons: ["Film continuity changes mean the story's canonical status is complicated", "Some 1980s comic storytelling conventions feel dated by modern standards", "The Earth invasion scale can sometimes overwhelm the personal narrative", "Later issues show signs of rushing toward a conclusion"],
    tags: ['Dark Horse', 'Classic', 'Hicks']
  },
  {
    id: 32, type: 'comic', title: 'Aliens: Outbreak', year: 1989, rating: 8.3,
    author: 'Mark Verheiden',
    cvSearch: 'Aliens Outbreak',
    cvId: 21126,
    imageUrl: null,
    desc: "The first canonical continuation of Aliens — Hicks and Newt years later, a rogue corporation's xenomorph weaponization program, and a confrontation with the alien queen mother.",
    detailedDesc: "Outbreak is historically significant as the first proof that the Alien franchise could support compelling narrative expansion beyond the films. The concept of an alien queen mother — a creature of vast scale and intelligence — is inspired.",
    pros: ["Historically foundational — proved the franchise's expanded universe potential", "The alien queen mother concept is a brilliant and terrifying escalation", "Hicks and Newt's characterization is faithful and emotionally resonant", "Sets the tone and visual language for decades of franchise comics"],
    cons: ["Retroactive film continuity changes undermine its canonical status", "Some story elements were superseded and contradicted by later franchise entries", "Pacing can feel rushed in places as events escalate rapidly", "The art quality varies across the collected issues"],
    tags: ['Dark Horse', 'Classic', 'Foundational']
  },
  {
    id: 33, type: 'comic', title: 'Aliens: Salvation', year: 1993, rating: 8.2,
    author: 'Dave Gibbons & Mike Mignola',
    cvSearch: 'Aliens Salvation',
    cvId: 21306,
    imageUrl: null,
    desc: "A missionary stranded on a xenomorph-infested world finds faith and fury in this gorgeous collaboration between Watchmen artist Dave Gibbons and Hellboy creator Mike Mignola.",
    detailedDesc: "Salvation uses the xenomorph threat to explore faith, sin, and redemption in genuinely thoughtful ways. The protagonist's crisis of belief — confronted with proof that the universe is capable of producing something as purely evil as the Alien — gives the comic a literary quality rare in franchise work.",
    pros: ["One of the most thematically serious and literary comics in the franchise", "The collaboration between Gibbons and Mignola produces exceptional visual storytelling", "The protagonist's faith journey is handled with intelligence and genuine feeling", "Mignola's pre-Hellboy artwork is a fascinating and powerful historical document"],
    cons: ["Very short — leaves readers wanting considerably more", "The philosophical themes come at the expense of horror action sequences", "Mignola's artwork, while distinctive, may not appeal to all readers", "The resolution of the faith narrative is somewhat abrupt given the depth of the setup"],
    tags: ['Dark Horse', 'Mignola', 'Standalone']
  },
  {
    id: 34, type: 'comic', title: 'Alien vs. Predator (Original)', year: 1990, rating: 8.0,
    author: 'Mark Verheiden & Mike Richardson',
    cvSearch: 'Alien vs Predator',
    cvId: 6812,
    imageUrl: null,
    desc: "The original AvP miniseries that launched one of pop culture's most enduring crossover concepts — a prospector on a remote world becomes the unwilling prize in an ancient ritual hunt.",
    detailedDesc: "The original AvP comic is a masterpiece of franchise world-building. The concept of the Predators using Alien hives as coming-of-age hunting grounds is inspired. The film adaptations never matched what was achieved here.",
    pros: ["The foundational AvP concept is brilliantly realized and internally consistent", "Pam is a compelling human perspective character caught between two apex species", "Randy Stradley's art renders both creatures with exceptional dynamism", "Created a crossover mythology that proved remarkably durable and influential"],
    cons: ["Film adaptations have since diluted the concept for many franchise fans", "Some plot conveniences required to facilitate the central crossover conceit", "The human story can feel underdeveloped compared to the two species' mythology", "Later expanded AvP universe fails to maintain the quality of this original"],
    tags: ['Dark Horse', 'AvP', 'Classic']
  },
  {
    id: 35, type: 'comic', title: 'Aliens: Defiance', year: 2016, rating: 7.9,
    author: 'Brian Wood',
    cvSearch: 'Aliens Defiance',
    cvId: 89910,
    imageUrl: null,
    desc: "Amanda Ripley and a synthetic named Zula Hendricks go rogue against Weyland-Yutani to investigate a derelict ship loaded with xenomorphs — a tense, character-driven series.",
    detailedDesc: "Brian Wood's Defiance is exemplary franchise comics work — Amanda Ripley is written with the complexity she deserves, and Zula Hendricks is one of the extended universe's best original characters. The synthetic rights subplot adds unexpected thematic depth.",
    pros: ["Amanda Ripley is written with depth and consistency with her Isolation characterization", "Zula Hendricks is among the best original characters in any franchise medium", "The synthetic rights theme adds genuine philosophical weight to the narrative", "Tristan Jones's art handles both character drama and creature horror excellently"],
    cons: ["Some narrative threads are left unresolved — leading directly into Resistance", "The derelict ship premise recalls elements of the original film closely", "Corporate antagonism is somewhat broad compared to the nuanced character work", "Completeness requires reading Resistance for full satisfaction"],
    tags: ['Dark Horse', 'Amanda Ripley', 'Zula']
  },
  {
    id: 36, type: 'comic', title: 'Alien (Marvel #1)', year: 2021, rating: 7.8,
    author: 'Phillip Kennedy Johnson',
    cvSearch: 'Alien Marvel 2021',
    cvId: 134778,
    imageUrl: null,
    desc: "Marvel's acclaimed relaunch follows a retired Weyland-Yutani operative whose grandson becomes embroiled in a conspiracy involving artificially engineered xenomorphs — a fresh direction that respects the franchise's legacy.",
    detailedDesc: "Phillip Kennedy Johnson's launch arc won over significant franchise skepticism. The grandfather-grandson dynamic gives the series an emotional grounding unusual in the franchise, and the engineered xenomorph subplot raises interesting questions about the species' nature.",
    pros: ["The intergenerational dynamic gives the series an emotional anchor unlike most franchise comics", "Phillip Kennedy Johnson demonstrates deep franchise knowledge and genuine affection", "Salvador Larroca's art is cinematic and well-suited to the franchise's visual language", "A confident fresh start that demonstrates Marvel's license is in capable hands"],
    cons: ["Some franchise loyalists felt the move from Dark Horse represented a loss of history", "The engineered xenomorph concept is intriguing but not fully realized in the opening arc", "The pacing is somewhat slow in the early issues as characters are established", "The conspiracy plot is not fully resolved, requiring subsequent volumes"],
    tags: ['Marvel', 'Relaunch', 'Modern']
  },
  {
    id: 37, type: 'comic', title: 'Aliens: Resistance', year: 2019, rating: 7.5,
    author: 'Brian Wood',
    cvSearch: 'Aliens Resistance',
    cvId: 116673,
    imageUrl: null,
    desc: "The direct sequel to Defiance — Amanda Ripley and Zula Hendricks continue their battle against Weyland-Yutani's xenomorph weapons program in a tense, action-driven continuation.",
    detailedDesc: "Resistance is a satisfying if slightly rushed conclusion to the threads left dangling at the end of Defiance. The action is well-executed, the character work maintains Defiance's high standard, and the canonical connections to the Isolation game universe are handled with care.",
    pros: ["Satisfying conclusion to the Amanda Ripley and Zula Hendricks story begun in Defiance", "Action sequences are well-choreographed and visually dynamic", "Canonical connections to Alien: Isolation are handled with accuracy and respect", "Brian Wood's character writing remains consistently excellent"],
    cons: ["Pacing is somewhat rushed compared to Defiance — feels compressed", "Works best as a conclusion rather than a standalone entry — Defiance is essential first", "Some of Defiance's thematic depth is sacrificed for propulsive action", "The resolution of certain character arcs may feel too tidy"],
    tags: ['Dark Horse', 'Amanda Ripley', 'Canon']
  },
  {
    id: 38, type: 'comic', title: 'Aliens: Genocide', year: 1991, rating: 7.6,
    author: 'John Arcudi',
    cvSearch: 'Aliens Genocide',
    cvId: 21237,
    imageUrl: null,
    desc: "Humanity discovers that two distinct xenomorph hive strains have gone to war with each other — and launches a desperate mission to harvest the warring queen's royal jelly, a potential cure for a drug crisis.",
    detailedDesc: "Genocide is one of the more inventive high concepts in franchise comics — the idea that xenomorphs could have intra-species conflict, and that humans would try to exploit it, is brilliant. John Arcudi's script handles the idea well.",
    pros: ["The hive-war concept is brilliantly inventive and expands xenomorph biology fascinatingly", "The royal jelly as drug substitute adds unexpected thematic depth about human desperation", "John Arcudi's script is confident and well-paced", "Expands the understanding of xenomorph society in meaningful ways"],
    cons: ["Damon Willis's art is competent but rarely exceptional — doesn't match the script's ambition", "The human characters are thinly drawn in comparison to the central concept's strength", "Some plot conveniences are required to make the central conceit function", "The resolution doesn't fully capitalize on the extraordinary premise"],
    tags: ['Dark Horse', 'War', 'Queen']
  },
  {
    id: 39, type: 'comic', title: "Aliens: Newt's Tale", year: 1992, rating: 7.8,
    author: 'Mike Richardson',
    cvSearch: "Aliens Newt's Tale",
    cvId: 39677,
    imageUrl: null,
    desc: "The complete story of Aliens retold from Newt's perspective — from the colony's first encounter with the xenomorphs through the fall of Hadley's Hope, her survival in the air ducts, and her rescue.",
    detailedDesc: "Newt's Tale transforms what was largely background tragedy in the film into a devastatingly intimate survival story. Seeing Newt's parents discover the derelict ship and watching the colony fall through child's eyes is genuinely heartbreaking.",
    pros: ["The perspective shift transforms familiar events into something genuinely affecting", "Newt's weeks of solo survival in the air ducts are vividly and sensitively portrayed", "The human scale of the colony's fall is rendered with devastating emotional detail", "Works as both a complement to the film and a compelling standalone story"],
    cons: ["Readers who haven't seen Aliens lack the context to appreciate the full emotional weight", "Some artistic choices date the book visually", "The pace necessarily mirrors the film's structure, limiting narrative surprise", "Newt's subsequent death in Alien 3 hangs over the book unavoidably"],
    tags: ['Dark Horse', 'Newt', 'Retelling']
  },
  {
    id: 40, type: 'comic', title: 'Aliens: Colonial Marines', year: 1993, rating: 7.1,
    author: 'Dan Abnett & Ian Edginton',
    cvSearch: 'Aliens Colonial Marines',
    cvId: 21236,
    imageUrl: null,
    desc: "Dan Abnett and Ian Edginton's seminal comics run follows a squad of Colonial Marines across increasingly desperate xenomorph containment missions in the outer colonies.",
    detailedDesc: "Abnett and Edginton bring their considerable craft for ensemble military fiction to the Alien universe with impressive results. The marines feel like real people rather than archetypes, and the escalating desperation as the mission goes wrong is handled with skill.",
    pros: ["Dan Abnett's military ensemble writing is perfectly suited to the franchise", "The marines feel distinctively characterized rather than generic", "Escalating tension across the arc is skillfully managed", "The military horror tone captures what makes Aliens compelling in comics form"],
    cons: ["Some issues show the rushed production values common to 1990s franchise comics", "Later issues are less consistent in quality than the opening chapters", "Characters who are killed off can feel dispensable rather than impactful", "Art quality varies across contributors to the run"],
    tags: ['Dark Horse', 'Marines', 'Abnett']
  },
  {
    id: 41, type: 'comic', title: 'Aliens: Havoc', year: 1997, rating: 7.3,
    author: 'Mark Schultz',
    cvSearch: 'Aliens Havoc',
    cvId: 19333,
    imageUrl: null,
    desc: "A renegade platoon of marines deployed into a xenomorph-overrun city with no support and dwindling supplies — a gritty, kinetic survival story that treats urban xenomorph infestation with unrelenting intensity.",
    detailedDesc: "Havoc is a stripped-down survival story — no corporate conspiracies, no canon complications, just marines trying to survive an impossible situation in an infested city. Mark Schultz's art has a gritty, industrial quality that suits the material perfectly.",
    pros: ["The urban xenomorph infestation setting is uniquely effective", "Mark Schultz's gritty art style perfectly matches the relentless survival tone", "Military tactics and problem-solving are handled with unusual authenticity", "A focused, no-nonsense story without franchise mythology weight"],
    cons: ["The stripped-down approach means limited character development", "Urban setting reduces the atmosphere of isolation that makes the franchise most effective", "Plot is relatively straightforward compared to more ambitious franchise entries", "The marines are competent but not distinctively memorable as individual characters"],
    tags: ['Dark Horse', 'Military', 'Urban']
  },
  {
    id: 42, type: 'comic', title: 'Aliens: Aftermath', year: 2021, rating: 7.4,
    author: 'David Lapham',
    cvSearch: 'Aliens Aftermath',
    cvId: 137603,
    imageUrl: null,
    desc: "30 years after the events on LV-426, a team returns to examine what the xenomorphs left behind — and discovers the aftermath of that catastrophe in ways no one anticipated.",
    detailedDesc: "Lapham's Aftermath is a quiet, contemplative standalone that uses the passage of time and the weight of history to create something genuinely melancholy. The idea of returning to LV-426 decades later — examining wreckage, traces, and consequences — gives the xenomorph threat a geological weight.",
    pros: ["The archaeological horror concept — examining aftermath decades later — is genuinely original", "Contemplative tone is distinct from most franchise comics", "The melancholy weight of LV-426's history is used with emotional intelligence", "Works perfectly as a standalone without requiring extensive franchise knowledge"],
    cons: ["Very short — the concept deserves more space than a single issue allows", "The restrained tone may frustrate readers expecting kinetic horror action", "Some of the mystery teased is not fully resolved within the short page count", "David Lapham's art style may not suit all readers' preferences"],
    tags: ['Marvel', 'Standalone', 'LV-426']
  },
  {
    id: 43, type: 'comic', title: 'Alien: Bloodlines', year: 2022, rating: 7.6,
    author: 'Phillip Kennedy Johnson',
    cvSearch: 'Alien Bloodlines',
    cvId: 139776,
    imageUrl: null,
    desc: "The continuation of Marvel's flagship Alien series deepens its conspiracy thriller roots — a family torn apart by xenomorph trauma confronts new engineered variants and an escalating existential threat.",
    detailedDesc: "Bloodlines successfully expands on the foundations built in Johnson's opening arc, deepening the family dynamics and raising the stakes of the engineered xenomorph conspiracy. The new creature variants introduced here are visually striking.",
    pros: ["Deepens character relationships and emotional stakes from the opening arc effectively", "New xenomorph variants are inventive and visually distinctive", "The conspiracy thriller structure creates sustained narrative tension", "Phillip Kennedy Johnson demonstrates growing command of the franchise's voice"],
    cons: ["Requires reading Volume 1 for full narrative context", "Some new plot elements are introduced without sufficient setup", "The escalation in scale loses some of the intimate horror of the opening arc", "Certain character arcs feel stretched to fill a longer run"],
    tags: ['Marvel', 'Sequel', 'Variants']
  },
  {
    id: 44, type: 'book', title: 'Aliens: Echoes', year: 2024, rating: 7.7,
    author: 'Julius Ohta',
    cvSearch: 'Aliens Echoes',
    cvId: 0, // Not listed on Comic Vine as of mid-2024
    imageUrl: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1538490798i/40776737.jpg",
    desc: "A survey crew arrives at an abandoned colony to document what happened — and discovers a living nightmare still very much in progress. A confidently crafted standalone from Marvel's modern Alien era.",
    detailedDesc: "Julius Ohta's Echoes is a lean, efficient, beautifully crafted standalone horror comic. The abandoned colony premise allows for environmental storytelling — the horror of what happened is communicated through what remains.",
    pros: ["Lean, efficient storytelling — not a page wasted across the run", "The environmental horror of the abandoned colony is used with intelligence", "Xenomorph sequences are inventively staged and genuinely tense", "A confident standalone that demonstrates Marvel's growing command of the franchise"],
    cons: ["The premise is not entirely new to franchise fiction", "Character development is limited by the story's focused, propulsive structure", "The mystery of the colony's fate is resolved somewhat faster than optimal tension would allow", "Some readers may want more ambition than the efficiently executed premise provides"],
    tags: ['Marvel', 'Modern', 'Survey']
  },
  {
    id: 45, type: 'comic', title: 'Aliens vs. Predator: Three World War', year: 2010, rating: 7.5,
    author: 'Randy Stradley',
    cvSearch: 'Aliens vs Predator Three World War',
    cvId: 31059,
    imageUrl: null,
    desc: "An epic crossover in which a Predator subspecies has turned xenomorphs into weapons of war — and humanity, the standard Predator clans, and the xenomorphs are caught in a three-way conflict with civilizational stakes.",
    detailedDesc: "Three World War is the most ambitious AvP story since the original comic, bringing back beloved characters and expanding the three-species mythology in satisfying ways. The concept of Predator subspecies using xenomorphs as directed weapons is inventive.",
    pros: ["Vast, ambitious scope gives the AvP mythology a genuinely epic dimension", "The Predator subspecies concept is inventive and internally consistent", "Three-way conflict creates novel tactical and narrative situations", "Returns beloved characters from earlier AvP continuity satisfyingly"],
    cons: ["The scale is occasionally too large — intimate character moments are sacrificed for spectacle", "Requires familiarity with prior AvP comics for full emotional impact", "Rick Leonardi's art, while dynamic, lacks the detail of the franchise's best visual work", "The resolution of the three-way conflict requires some convenient plotting"],
    tags: ['Dark Horse', 'AvP', 'Epic']
  },
  {
    id: 46, type: 'comic', title: 'Alien: The Illustrated Story', year: 1979, rating: 8.0,
    author: 'Archie Goodwin & Walt Simonson',
    cvSearch: 'Alien The Illustrated Story',
    cvId: 25089,
    imageUrl: null,
    desc: "The original 1979 comic adaptation of Ridley Scott's film — Archie Goodwin's script and Walt Simonson's raw, kinetic artwork capture the Giger-esque horror with astonishing fidelity for its era.",
    detailedDesc: "Produced in the same year as the film, The Illustrated Story has extraordinary historical significance — and beyond that, genuine artistic merit. Walt Simonson's art, while necessarily different from Giger's designs, captures the biomechanical horror through his own visual language.",
    pros: ["Invaluable historical document — produced simultaneously with the original film", "Walt Simonson's artwork captures the biomechanical horror in his own distinctive style", "Archie Goodwin's adaptation is intelligent — the compression serves rather than diminishes the story", "An essential artifact for any serious collector of franchise history"],
    cons: ["Inevitably constrained by what was known of Giger's designs during production", "Simonson's art style, while excellent, differs significantly from the film's visual language", "The adaptation necessarily omits or compresses key sequences from the film", "Historical significance may matter more to collectors than narrative value to new readers"],
    tags: ['Adaptation', 'Classic', '1979']
  },

  // ── NEW MOVIES ──
  {
    id: 47, type: 'movie', title: 'AVP: Alien vs. Predator', year: 2004, rating: 5.6,
    director: 'Paul W.S. Anderson',
    imageUrl: 'https://image.tmdb.org/t/p/w500/kQDuOKD5XUcWtgrdpeLpQmllNqT.jpg',
    desc: 'A team of scientists and mercenaries descend into an ancient pyramid buried beneath the Antarctic ice — unaware they have walked into the middle of a centuries-old war between two apex species.',
    detailedDesc: "Paul W.S. Anderson's crossover concept is inherently exciting, and the Antarctic pyramid setting is genuinely inventive. But a PG-13 rating defangs both creatures, and the film rushes through character establishment to reach action that never feels truly dangerous.",
    pros: ['The pyramid-as-hunting-ground concept is clever and well-realized', 'Sanaa Lathan is a compelling and capable lead', 'Both creature designs are faithfully recreated', 'Lance Henriksen brings gravitas as Weyland'],
    cons: ['PG-13 rating removes the visceral threat both franchises require', 'Character development is minimal despite a strong cast', 'Contradicts established lore from both franchises', 'Neither species feels genuinely terrifying'],
    tags: ['Action', 'Crossover', 'AvP']
  },
  {
    id: 48, type: 'movie', title: 'Aliens vs. Predator: Requiem', year: 2007, rating: 4.7,
    director: 'Colin Strause & Greg Strause',
    imageUrl: 'https://image.tmdb.org/t/p/w500/xR4Mslyum7bjzAF1rlUX2HrlwhZ.jpg',
    desc: 'A Predator ship crashes in a small Colorado town, releasing a Predalien hybrid and a swarm of xenomorphs on the unsuspecting population. A lone Predator arrives to clean up the mess.',
    detailedDesc: "Requiem overcorrects the first film's tame rating with extreme gore but substitutes brutality for storytelling. The film's notoriously dark cinematography — literally too dark to see in many sequences — became a franchise punchline. The small-town setting had potential that was entirely squandered.",
    pros: ['Returns to R-rated violence after the neutered first film', 'The Predalien hybrid is a visually interesting creature concept', 'Small-town setting offers a different visual palette', 'Some practical effects work is effective'],
    cons: ['Cinematography so dark key sequences are genuinely invisible', 'Human characters are hollow archetypes with zero development', 'The Predalien concept is wasted on a weak script', 'Widely regarded as one of the worst entries in either franchise'],
    tags: ['Horror', 'Crossover', 'AvP']
  },
  {
    id: 49, type: 'movie', title: 'Alien: Earth', year: 2025, rating: 7.8,
    director: 'Noah Hawley',
    imageUrl: 'https://image.tmdb.org/t/p/w500/3TkSMGKSbYBFlMlFzxDLfMf3mMB.jpg',
    desc: 'Set before the original film, a Weyland-Yutani spacecraft crash-lands on Earth carrying a deadly cargo. A young woman and a ragtag group must face the most terrifying life form in the universe — on their own planet.',
    detailedDesc: "Noah Hawley's series brings the Alien franchise to Earth for the first time, exploring how the xenomorph threat reshapes humanity on familiar ground. The show expands the franchise's corporate horror elements while delivering genuine creature terror, with strong performances anchoring its slower-burn approach.",
    pros: ['Brings the franchise to Earth with a fresh and effective perspective', 'Noah Hawley brings genuine craft and atmosphere to the material', 'Strong ensemble cast with well-developed characters', 'Expands the Weyland-Yutani corporate mythology meaningfully'],
    cons: ['Slower pacing in early episodes may frustrate action-focused viewers', 'Some creature sequences feel constrained by a TV budget', 'The Earth setting removes some of the isolation that defines the franchise', 'Not all subplots receive equal development across the season'],
    tags: ['TV Series', 'Prequel', 'Sci-Fi']
  },

  // ── NEW GAMES ──
  {
    id: 50, type: 'game', title: 'Aliens: Dark Descent', year: 2023, rating: 7.5,
    developer: 'Tindalos Interactive',
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1700740/header.jpg',
    desc: 'A real-time squad tactics game set on a moon overrun by xenomorphs. Command a team of Colonial Marines in tense, permadeath-driven missions against overwhelming odds.',
    detailedDesc: "Dark Descent is a confident and inventive entry in the franchise — a real-time tactics game that channels the tension of the films through strategic squad management rather than direct action. The permadeath system gives every decision genuine weight, and the xenomorph behavior is authentically terrifying.",
    pros: ['Real-time tactics gameplay is inventive and well-executed', 'Permadeath system makes every encounter genuinely tense', 'Authentic franchise aesthetic — sound, visuals and lore are all faithful', 'Campaign length and variety are impressive for the genre'],
    cons: ['Learning curve is steep and early missions can be punishing', 'Some UI elements are unintuitive on first playthrough', 'Story is serviceable but rarely reaches the franchise\'s dramatic heights', 'Later missions become somewhat repetitive in structure'],
    tags: ['Strategy', 'Tactics', 'Squad']
  },
  {
    id: 51, type: 'game', title: 'Alien 3: The Gun', year: 1993, rating: 6.8,
    developer: 'Sega AM1',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5v8s.jpg',
    desc: 'A light-gun arcade shooter set during the events of Alien 3 — players battle waves of xenomorphs across Fiorina 161 using a pump-action shotgun peripheral. A visceral and underrated arcade experience.',
    detailedDesc: "Sega's arcade light-gun game captures the claustrophobic horror of Alien 3 with surprising effectiveness. The shotgun peripheral adds tactile weight to every encounter, and the wave-based design keeps the tension high throughout.",
    pros: ['Innovative shotgun peripheral adds genuine physicality', 'Faithfully captures the dark atmosphere of Alien 3', 'Excellent arcade action that remains satisfying decades later', 'One of the better Alien arcade titles of the era'],
    cons: ['Extremely short — completable in one sitting', 'Essentially inaccessible outside of original arcade hardware', 'Story depth is minimal even by arcade standards', 'Enemy variety is limited across the campaign'],
    tags: ['Arcade', 'Light-Gun', 'Classic']
  },
  {
    id: 52, type: 'game', title: 'Alien: Blackout', year: 2019, rating: 6.2,
    developer: 'D3 Go!',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tq9.jpg',
    desc: 'A mobile strategy-horror game set between Alien: Isolation and Aliens — Amanda Ripley must guide a crew through a crippled space station using only limited camera feeds and station systems.',
    detailedDesc: "Alien: Blackout is a thoughtful mobile title that distills the tension of Isolation into a purely strategic format. Managing power, cameras, and crew movement with a single xenomorph stalking the corridors creates genuine dread — a rare achievement for mobile gaming.",
    pros: ['Clever adaptation of Isolation\'s tension into a mobile format', 'Amanda Ripley\'s continued story adds meaningful franchise continuity', 'Power management mechanics create authentic resource anxiety', 'Surprisingly deep for a mobile title'],
    cons: ['Free-to-play monetization elements are intrusive', 'Relatively short campaign with limited replay variety', 'Touch controls can be imprecise during intense sequences', 'Graphics are functional rather than impressive'],
    tags: ['Mobile', 'Strategy', 'Amanda Ripley']
  },

  // ── NEW BOOKS ──
  {
    id: 53, type: 'book', title: 'Alien: Sea of Sorrows', year: 2014, rating: 7.4,
    author: 'James A. Moore',
    imageUrl: 'https://covers.openlibrary.org/b/id/7892519-M.jpg',
    desc: 'A descendant of Ellen Ripley discovers a vast underground xenomorph nest beneath a colony world — and Weyland-Yutani will sacrifice anything to weaponize what lies beneath.',
    detailedDesc: "The second entry in the original trilogy of Titan novels (following Out of the Shadows), Sea of Sorrows is a propulsive, action-heavy thriller. Moore's pacing is relentless and the underground colony setting creates effective claustrophobia.",
    pros: ['Relentless pacing keeps the narrative momentum high throughout', 'The underground colony setting is effectively claustrophobic', 'The Ripley lineage concept adds meaningful franchise continuity', 'Strong action sequences throughout'],
    cons: ['Character depth is sacrificed for pace', 'Less thematically ambitious than the best entries in the novel line', 'The Weyland-Yutani antagonists are somewhat one-dimensional', 'Resolution is somewhat abrupt given the scale of the threat'],
    tags: ['Novel', 'Action', 'Ripley']
  },
  {
    id: 54, type: 'book', title: 'Alien: Echo', year: 2019, rating: 7.1,
    author: 'Mira Grant',
    imageUrl: 'https://covers.openlibrary.org/b/id/9257847-M.jpg',
    desc: 'A young adult novel following teenage twins on a colony world who discover a xenomorph outbreak — a fresh perspective that brings the franchise\'s horror to a new generation of readers.',
    detailedDesc: "Mira Grant's YA entry in the franchise is a confident and thoughtful novel that uses the xenomorph threat to explore themes of identity, disability, and sisterhood. The twin protagonists are well-drawn and the horror is handled with intelligence.",
    pros: ['A genuinely fresh perspective on franchise horror from a YA lens', 'Twin protagonists are well-characterized and emotionally engaging', 'Disability representation is handled with care and authenticity', 'Mira Grant\'s genre craft is evident throughout'],
    cons: ['YA tone may not satisfy readers seeking the franchise\'s adult horror', 'The xenomorph threat is somewhat secondary to character drama', 'Shorter and less complex than the mainline adult novels', 'Some franchise lore is simplified for accessibility'],
    tags: ['Novel', 'YA', 'Coming of Age']
  },
  {
    id: 55, type: 'book', title: 'Aliens: Bishop', year: 2023, rating: 7.6,
    author: 'T. R. Napper',
    imageUrl: 'https://covers.openlibrary.org/b/id/13558566-M.jpg',
    desc: 'The first novel to centre entirely on Bishop — the synthetic survivor of Aliens and Alien 3 — exploring his existence, his encounters with xenomorphs, and what it means to be artificial in a hostile universe.',
    detailedDesc: "T. R. Napper's novel gives Bishop the full character study he has always deserved. The exploration of synthetic consciousness through the lens of someone who has survived two xenomorph encounters is genuinely moving, and Napper's prose is among the finest in the franchise's novel line.",
    pros: ['Bishop finally receives the character depth his screen appearances promised', 'Napper\'s prose is literary quality — genuinely excellent franchise fiction', 'The philosophical exploration of synthetic consciousness is thoughtful and original', 'Faithfully draws on both Aliens and Alien 3 while adding meaningfully to both'],
    cons: ['Readers unfamiliar with the films may lack context for key emotional beats', 'Pacing is contemplative — action fans may want more creature sequences', 'Some sections risk over-explaining Bishop\'s established screen characterisation', 'The ending is somewhat open, leaving threads for a potential sequel'],
    tags: ['Novel', 'Bishop', 'Synthetic']
  },
  {
    id: 56, type: 'book', title: 'Alien: Enemy of My Enemy', year: 2023, rating: 7.2,
    author: 'Mary SanGiovanni',
    imageUrl: 'https://covers.openlibrary.org/b/id/13558567-M.jpg',
    desc: 'When a remote research station becomes overrun, a marine and a Predator must form an uneasy alliance to survive — an Alien vs. Predator novel that plays the crossover concept with unexpected seriousness.',
    detailedDesc: "Mary SanGiovanni treats the AvP crossover with the tonal seriousness it rarely receives, using the uneasy human-Predator alliance as a genuine exploration of honour, survival, and what constitutes personhood.",
    pros: ['Takes the AvP crossover more seriously than either film managed', 'The human-Predator alliance dynamic is handled with intelligence', 'SanGiovanni\'s creature horror writing is visceral and effective', 'A lean, propulsive thriller that never outstays its welcome'],
    cons: ['The Predator characterization may not satisfy fans of the dedicated Predator lore', 'Supporting characters receive limited development', 'The resolution is somewhat tidy given the scale of the threat', 'Less thematically ambitious than the franchise\'s best standalone novels'],
    tags: ['Novel', 'AvP', 'Action']
  },
  {
    id: 57, type: 'book', title: 'Alien (Alan Dean Foster Novelization)', year: 1979, rating: 7.3,
    author: 'Alan Dean Foster',
    imageUrl: 'https://covers.openlibrary.org/b/id/8739161-M.jpg',
    desc: "Alan Dean Foster's novelization of Ridley Scott's original film — published simultaneously with the movie and containing additional scenes and character detail not present in the theatrical cut.",
    detailedDesc: "Foster's novelization is historically significant as one of the first major franchise expansions — published before the film was widely seen. Additional scenes cut from the final film are preserved here, and Foster's prose captures the industrial dread of the Nostromo with skill.",
    pros: ['Contains scenes cut from the final film — essential for completionists', 'Foster\'s prose captures the film\'s dread with surprising fidelity', 'Historically significant as one of the earliest franchise expansions', 'Character interiority adds depth absent from the minimalist film'],
    cons: ['Necessarily limited by the source material\'s own constraints', 'Foster\'s prose style is functional rather than literary', 'Less essential for those already intimately familiar with the film', 'Some additional scenes feel cut for good reason'],
    tags: ['Novelization', 'Film Tie-In', 'Classic']
  },
  {
    id: 58, type: 'book', title: 'Aliens (Alan Dean Foster Novelization)', year: 1986, rating: 7.1,
    author: 'Alan Dean Foster',
    imageUrl: 'https://covers.openlibrary.org/b/id/8739162-M.jpg',
    desc: "Foster's adaptation of James Cameron's sequel — capturing the action-war epic on the page with additional character moments that flesh out the Colonial Marines beyond the film's already strong ensemble.",
    detailedDesc: "Foster's Aliens novelization is among the best in his franchise work — the marines receive additional backstory that enriches their screen counterparts, and the pacing of Cameron's kinetic action translates surprisingly well to prose.",
    pros: ['Marines receive additional backstory that enriches the film\'s ensemble', 'Cameron\'s kinetic action translates well to Foster\'s efficient prose', 'Ripley\'s maternal bond with Newt is given additional interiority', 'A solid companion to one of cinema\'s great sequels'],
    cons: ['Cannot replicate the visceral impact of Cameron\'s direction', 'Foster\'s prose style prioritises efficiency over literary ambition', 'Less essential given how comprehensively the film tells its own story', 'Some additional scenes feel like padding rather than enrichment'],
    tags: ['Novelization', 'Film Tie-In', 'Action']
  },
  {
    id: 59, type: 'book', title: 'Alien 3 (Alan Dean Foster Novelization)', year: 1992, rating: 6.9,
    author: 'Alan Dean Foster',
    imageUrl: 'https://covers.openlibrary.org/b/id/348538-M.jpg',
    desc: "Foster's novelization of the troubled third film — uniquely valuable because it adapts a substantially different version of the screenplay, preserving story elements that never made it to screen.",
    detailedDesc: "The Alien 3 novelization is more interesting than most because it adapts an earlier draft of the screenplay with significant differences from the finished film. For fans interested in the film's tortured development history, Foster's version offers a fascinating parallel text.",
    pros: ['Adapts an earlier screenplay draft with significant differences from the film', 'Preserves story elements cut from the theatrical and assembly cuts', 'Historically fascinating document of the film\'s troubled development', 'Foster handles the prison-planet atmosphere with genuine skill'],
    cons: ['The underlying story\'s weaknesses are present regardless of draft', 'Less polished than his work on the first two films', 'Readers who love the assembly cut may find the discrepancies jarring', 'Limited literary ambition beyond faithful adaptation'],
    tags: ['Novelization', 'Film Tie-In', 'Alternate Version']
  },
  {
    id: 60, type: 'book', title: 'Prometheus (Novelization)', year: 2012, rating: 6.7,
    author: 'Jon Spaihts & Damon Lindelof (adapted by Foster)',
    imageUrl: 'https://covers.openlibrary.org/b/id/7888691-M.jpg',
    desc: "Alan Dean Foster's novelization of Prometheus expands the film's philosophical ambitions with additional interiority and scenes that clarify some of the script's more deliberately opaque moments.",
    detailedDesc: "Foster's Prometheus novelization is useful primarily as a companion text for those who found the film's storytelling frustratingly elliptical. Additional scenes and character thoughts clarify motivations that the film deliberately obscured, though not always to the story's benefit.",
    pros: ['Clarifies some of the film\'s more opaque character motivations', 'Additional scenes expand the Engineer mythology meaningfully', 'Foster\'s adaptation captures the film\'s visual grandeur in prose', 'A useful companion for those who wanted more from the film'],
    cons: ['Cannot recreate the film\'s extraordinary visual language', 'Some clarifications reduce the intended mystery of the material', 'The script\'s fundamental weaknesses remain present on the page', 'Less essential than novelizations of the original trilogy'],
    tags: ['Novelization', 'Film Tie-In', 'Prequel']
  },

  // ── NEW COMICS ──
  {
    id: 61, type: 'comic', title: 'Aliens: Life and Death', year: 2016, rating: 7.7,
    author: 'Dan Abnett',
    cvSearch: 'Aliens Life and Death',
    cvId: 95571,
    imageUrl: null,
    desc: 'A squad of Colonial Marines barely escapes an Alien-overrun world, only to find themselves stranded on a Predator hunting ground. Dan Abnett weaves together the Alien, Predator, and Engineer mythologies in this ambitious crossover arc.',
    detailedDesc: "Part of Dark Horse's Fire and Stone/Life and Death crossover initiative, Aliens: Life and Death is Abnett at his best — juggling multiple species, a large ensemble, and genuinely high stakes with the confidence of a veteran military fiction writer.",
    pros: ['Abnett handles the multi-species crossover with remarkable confidence', 'Ensemble cast is well-differentiated despite the large number of characters', 'Raises genuine stakes — no character feels safe', 'Connects meaningfully to the broader Dark Horse crossover mythology'],
    cons: ['Full appreciation requires reading the broader Fire and Stone/Life and Death cycle', 'Some character arcs are left to other volumes in the crossover', 'The crossover structure occasionally fragments the narrative momentum', 'Engineer mythology is used but not deeply explored'],
    tags: ['Dark Horse', 'Crossover', 'Marines']
  },
  {
    id: 62, type: 'comic', title: 'Alien: Black, White & Blood', year: 2023, rating: 7.5,
    author: 'Various',
    cvSearch: 'Alien Black White Blood',
    cvId: 149557,
    imageUrl: null,
    desc: "A Marvel anthology series presenting new Alien stories in stark black-and-white with isolated red highlights — a format that strips the xenomorph back to its most visually terrifying and elemental form.",
    detailedDesc: "The Black, White & Blood format — used across several Marvel franchises — suits the Alien universe exceptionally well. Stripped of colour, the xenomorph's design is more unsettling than ever, and several entries rank among the finest short-form Alien comics produced under the Marvel banner.",
    pros: ['The high-contrast black-and-white format is extraordinarily effective for Alien horror', 'Anthology format allows experimental approaches and diverse creative voices', 'Several standout entries rank among Marvel\'s best Alien work', 'Visually distinctive from any previous franchise comic'],
    cons: ['Anthology quality variance is unavoidable — some entries are stronger than others', 'Short story format limits narrative depth', 'The format concept works better for some stories than others', 'Less accessible for readers unfamiliar with Marvel\'s Alien run'],
    tags: ['Marvel', 'Anthology', 'Modern']
  },
  {
    id: 63, type: 'comic', title: 'Aliens: Apocalypse — The Destroying Angels', year: 1999, rating: 7.4,
    author: 'Mark Schultz',
    cvSearch: 'Aliens Apocalypse Destroying Angels',
    cvId: 18431,
    imageUrl: null,
    desc: 'A scientist obsessed with xenomorph biology attempts to engineer a perfect human-alien hybrid — a dark, philosophically unsettling story that asks what humanity is willing to sacrifice in the name of evolution.',
    detailedDesc: "Mark Schultz's Apocalypse is one of the more intellectually ambitious entries in the Dark Horse Aliens line — a body-horror meditation on evolution, obsession, and the cost of transcendence. Its ideas are more interesting than most franchise comics.",
    pros: ['Philosophically ambitious — rare for franchise comics', 'Body horror elements are handled with genuine craft', 'The scientist antagonist is one of the more complex villains in the franchise', 'Schultz\'s art is exceptional throughout'],
    cons: ['Dense and slow-paced compared to action-oriented franchise entries', 'The philosophical themes are sometimes overstated', 'Limited action may disappoint readers seeking creature horror', 'The conclusion is somewhat abrupt given the scope of the ideas'],
    tags: ['Dark Horse', 'Body Horror', 'Philosophical']
  },
  {
    id: 64, type: 'comic', title: 'Alien: Paradiso', year: 2024, rating: 7.3,
    author: 'Declan Shalvey',
    cvSearch: 'Alien Paradiso',
    cvId: 155000,
    imageUrl: null,
    desc: "A new Marvel series following survivors on a seemingly idyllic colony world that harbours a devastating secret — Declan Shalvey brings his distinctive visual style to the franchise with confident results.",
    detailedDesc: "Shalvey's entry into the Marvel Alien line demonstrates a clear vision — the colony setting is rendered with unusual warmth before the horror intrudes, making the xenomorph threat land with greater impact than most franchise comics manage.",
    pros: ['Shalvey\'s distinctive art style gives the series a strong visual identity', 'The idyllic colony setting makes the horror more impactful when it arrives', 'Strong character work in the early issues establishes genuine investment', 'A confident new direction for Marvel\'s Alien comics line'],
    cons: ['Ongoing series — full assessment requires completion of the arc', 'Some early issues prioritise atmosphere over plot momentum', 'The xenomorph threat takes time to fully materialise', 'Continuity with prior Marvel Alien runs is loose'],
    tags: ['Marvel', 'Modern', 'Colony']
  },
];