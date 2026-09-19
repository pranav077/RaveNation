import { City, Venue, ArtistProfile, RaveEvent, MusicTrack, NewsArticle, Booking, NotificationItem, ArtistUpdate } from '../types';

export const CITIES: City[] = [
  {
    id: 'warsaw',
    slug: 'warsaw',
    name: 'Warsaw',
    region: 'Mazovia',
    description: 'The pulsating heart of Poland’s underground techno movement, famous for uncompromising safe spaces, industrial raves, and world-class sound systems.',
    heroImage: '/assets/cities/warsaw.jpg',
    famousClubs: ['Jasna 1', 'Smolna', 'K-Bar Powiśle', 'Luzztro'],
    activeEventsCount: 14,
    topVenuesCount: 8,
    coordinates: { lat: 52.2297, lng: 21.0122 }
  },
  {
    id: 'krakow',
    slug: 'krakow',
    name: 'Kraków',
    region: 'Lesser Poland',
    description: 'Subterranean medieval brick vaults meet forward-thinking experimental electronics, home to Unsound Festival and legendary basement raves.',
    heroImage: '/assets/cities/krakow.jpg',
    famousClubs: ['Prozak 2.0', 'Szpitalna 1', 'Hype Park', 'STK 47'],
    activeEventsCount: 9,
    topVenuesCount: 6,
    coordinates: { lat: 50.0647, lng: 19.945 }
  },
  {
    id: 'wroclaw',
    slug: 'wroclaw',
    name: 'Wrocław',
    region: 'Lower Silesia',
    description: 'Raw concrete architecture and heavy hypnotic techno. Wrocław boasts an intimate, dedicated community centered around Ciało and Transformator.',
    heroImage: '/assets/cities/wroclaw.jpg',
    famousClubs: ['Ciało', 'Transformator', 'Wyspa Tamka', 'Ciemna Strona Księżyca'],
    activeEventsCount: 8,
    topVenuesCount: 5,
    coordinates: { lat: 51.1079, lng: 17.0385 }
  },
  {
    id: 'poznan',
    slug: 'poznan',
    name: 'Poznań',
    region: 'Greater Poland',
    description: 'Home to historic railway halls and converted wartime fallout shelters. Renowned across Europe for Tama and Schron.',
    heroImage: '/assets/cities/poznan.jpg',
    famousClubs: ['Tama', 'Schron', 'Projekt LAB', 'Hangar 4'],
    activeEventsCount: 11,
    topVenuesCount: 5,
    coordinates: { lat: 52.4064, lng: 16.9252 }
  },
  {
    id: 'gdansk',
    slug: 'gdansk',
    name: 'Gdańsk',
    region: 'Pomerania',
    description: 'Raw shipyard cranes, industrial naval docks, and misty Baltic raves. The Tri-City underground thrives on hard warehouse techno and breakbeats.',
    heroImage: '/assets/cities/gdansk.jpg',
    famousClubs: ['Crackhouse', 'B90', 'Drizzly Grizzly', 'Ziemia'],
    activeEventsCount: 7,
    topVenuesCount: 4,
    coordinates: { lat: 54.352, lng: 18.6466 }
  },
  {
    id: 'gdynia',
    slug: 'gdynia',
    name: 'Gdynia',
    region: 'Pomerania',
    description: 'Modernist port town with outdoor summer beach parties, bunker nights, and energetic post-industrial rave collectives.',
    heroImage: '/assets/cities/gdynia.jpg',
    famousClubs: ['Ucho Club', 'Hala Rybna Warehouse', 'Podwórko.art'],
    activeEventsCount: 4,
    topVenuesCount: 3,
    coordinates: { lat: 54.5189, lng: 18.5305 }
  },
  {
    id: 'lodz',
    slug: 'lodz',
    name: 'Łódź',
    region: 'Łódź Voivodeship',
    description: 'Poland’s Manchester: red-brick textile factories and dystopian post-industrial monoliths hosting dark electro and industrial techno marathons.',
    heroImage: '/assets/cities/lodz.jpg',
    famousClubs: ['Klub Wytwórnia', 'Fabryka Sztuki', 'Soda Underground', 'Lordis'],
    activeEventsCount: 6,
    topVenuesCount: 4,
    coordinates: { lat: 51.7592, lng: 19.456 }
  },
  {
    id: 'katowice',
    slug: 'katowice',
    name: 'Katowice',
    region: 'Silesia',
    description: 'Former coal mines and porcelain factories transformed into sound sanctuaries. Silesian ravers are famous for stamina and relentless 145+ BPM energy.',
    heroImage: '/assets/cities/katowice.jpg',
    famousClubs: ['P23 Katowice', 'InQbator', 'Fabryka Porcelany', 'Walcownia'],
    activeEventsCount: 9,
    topVenuesCount: 5,
    coordinates: { lat: 50.2649, lng: 19.0238 }
  },
  {
    id: 'szczecin',
    slug: 'szczecin',
    name: 'Szczecin',
    region: 'West Pomerania',
    description: 'Cross-border corridor connected directly to Berlin’s club bloodstream. Famous for extended afterhours and heavy acid sound.',
    heroImage: '/assets/cities/szczecin.jpg',
    famousClubs: ['After Ego', 'Hala Odra', 'K4 Kolumba 4'],
    activeEventsCount: 5,
    topVenuesCount: 3,
    coordinates: { lat: 53.4285, lng: 14.5528 }
  },
  {
    id: 'lublin',
    slug: 'lublin',
    name: 'Lublin',
    region: 'Lublin Voivodeship',
    description: 'Eastern Poland’s rising underground enclave, driven by youth collectives, vinyl selectors, and warehouse pop-ups.',
    heroImage: '/assets/cities/lublin.jpg',
    famousClubs: ['Dom Kultury', 'Tektura DIY', 'Klub Radość'],
    activeEventsCount: 4,
    topVenuesCount: 3,
    coordinates: { lat: 51.2465, lng: 22.5684 }
  },
  {
    id: 'bialystok',
    slug: 'bialystok',
    name: 'Białystok',
    region: 'Podlaskie',
    description: 'Spiritual hometown of Up To Date Festival and Polish ambient/techno pioneers. Deep musical integrity and forest rave traditions.',
    heroImage: '/assets/cities/bialystok.jpg',
    famousClubs: ['FOMO Klub', 'Węglowa Warehouse', 'Klub Metro'],
    activeEventsCount: 3,
    topVenuesCount: 2,
    coordinates: { lat: 53.1325, lng: 23.1688 }
  },
  {
    id: 'torun',
    slug: 'torun',
    name: 'Toruń',
    region: 'Kuyavia-Pomerania',
    description: 'Gothic brick walls reverberating with deep hypnotic techno, student collectives, and psychedelic visual gatherings.',
    heroImage: '/assets/cities/torun.jpg',
    famousClubs: ['Klub NRD', 'Od Nowa', 'Bunkier Toruń'],
    activeEventsCount: 3,
    topVenuesCount: 2,
    coordinates: { lat: 53.0138, lng: 18.5984 }
  },
  {
    id: 'rzeszow',
    slug: 'rzeszow',
    name: 'Rzeszów',
    region: 'Subcarpathia',
    description: 'Subcarpathian bassheads and techno enthusiasts gathering in intimate club basements and forest raves near the Bieszczady foothills.',
    heroImage: '/assets/cities/rzeszow.jpg',
    famousClubs: ['Vinyl Club', 'Kultura', 'Grand Underground'],
    activeEventsCount: 2,
    topVenuesCount: 2,
    coordinates: { lat: 50.0412, lng: 21.9991 }
  },
  {
    id: 'olsztyn',
    slug: 'olsztyn',
    name: 'Olsztyn',
    region: 'Warmia-Masuria',
    description: 'Masurian lake raves and open-air psytrance gatherings combined with local bunker nights.',
    heroImage: '/assets/cities/olsztyn.jpg',
    famousClubs: ['Carpenter Inn Basement', 'Aura Underground', 'Kortowo Hangar'],
    activeEventsCount: 2,
    topVenuesCount: 2,
    coordinates: { lat: 53.7784, lng: 20.4801 }
  }
];

export const VENUES: Venue[] = [
  {
    id: 'jasna-1',
    slug: 'jasna-1',
    name: 'Jasna 1',
    cityId: 'warsaw',
    cityName: 'Warsaw',
    address: 'ul. Jasna 1, 00-013 Warszawa',
    description: 'A subterranean sanctum in the centre of Warsaw. Known for its custom Void Acoustics sound rig, strict no-camera policy, curated international bookings, and unwavering dedication to safe clubbing and LGBTQ+ awareness.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    capacity: 650,
    soundSystem: 'Custom Void Acoustics Air Motion System',
    rules: ['Strict No Camera Policy (Stickers on lenses)', 'Zero Tolerance for Discrimination', 'Safe Space Awareness Team on Duty', '18+ ID Check at Door'],
    links: { website: 'https://jasna1.com', instagram: 'https://instagram.com/jasna1poland' }
  },
  {
    id: 'smolna',
    slug: 'smolna',
    name: 'Smolna',
    cityId: 'warsaw',
    cityName: 'Warsaw',
    address: 'ul. Smolna 38, 00-375 Warszawa',
    description: 'Set inside a multi-story historical town palace, Smolna features 3 indoor dance floors, a lush open-air patio, and dark labyrinthine corridors hosting Europe’s most revered underground selectors.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80',
    capacity: 1200,
    soundSystem: 'Funktion-One Resolution 4 Floor Rig',
    rules: ['Selective Door Policy', 'No Photos / No Flash', 'Dress Code: Club / All Black / Expressive', '21+'],
    links: { website: 'https://smolna38.com', instagram: 'https://instagram.com/smolna38' }
  },
  {
    id: 'tama',
    slug: 'tama',
    name: 'Tama',
    cityId: 'poznan',
    cityName: 'Poznań',
    address: 'ul. Niezłomnych 1B, 61-894 Poznań',
    description: 'A monolithic 19th-century railway water pumping station converted into a cathedral of modern techno. High ceilings, sweeping arches, and bone-shattering acoustics.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
    capacity: 1500,
    soundSystem: 'd&b audiotechnik J-Series Line Array',
    rules: ['Awareness Team Present', 'No Harassment', 'Coat Check Mandatory', '18+'],
    links: { website: 'https://tamaklub.pl', instagram: 'https://instagram.com/tama_poznan' }
  },
  {
    id: 'cialo',
    slug: 'cialo',
    name: 'Ciało',
    cityId: 'wroclaw',
    cityName: 'Wrocław',
    address: 'ul. Joannitów 13, 50-525 Wrocław',
    description: 'Tucked beneath the historic railway tracks in Wrocław, Ciało is a raw concrete chamber where deep, hypnotic, and industrial techno thrive in pitch-black atmosphere.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    capacity: 500,
    soundSystem: 'L-Acoustics K2 Sound Rig',
    rules: ['Strict Respect for Personal Boundaries', 'No Strobe Photos', 'Awareness Crew on Site', '18+'],
    links: { website: 'https://klubcialo.pl', instagram: 'https://instagram.com/klubcialo' }
  },
  {
    id: 'schron',
    slug: 'schron',
    name: 'Schron',
    cityId: 'poznan',
    cityName: 'Poznań',
    address: 'ul. Kościuszki 68, 61-891 Poznań',
    description: 'An authentic World War II nuclear fallout shelter repurposed as an impenetrable underground rave redoubt. Thick concrete walls, claustrophobic chillout chambers, and raw acid.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80',
    capacity: 600,
    soundSystem: 'TurboSound & Custom Sub Bass Bunkers',
    rules: ['Hard Underground Spirit', 'No Flash Photography', 'Safe Rave Code in Effect', '18+'],
    links: { website: 'https://schron.art', instagram: 'https://instagram.com/schron_poznan' }
  },
  {
    id: 'p23',
    slug: 'p23',
    name: 'P23 Katowice',
    cityId: 'katowice',
    cityName: 'Katowice',
    address: 'ul. Porcelanowa 23, 40-246 Katowice',
    description: 'Located in the historic Bogucice porcelain factory, P23 is a sprawling post-industrial warehouse known for intense marathon sets, hard dance, and raw energy.',
    image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=1000&q=80',
    capacity: 1800,
    soundSystem: 'Meyer Sound Leo Family System',
    rules: ['Respect the Industrial Heritage', 'Hydration Stations Available', 'Zero Discrimination', '18+'],
    links: { website: 'https://p23.pl', instagram: 'https://instagram.com/p23katowice' }
  },
  {
    id: 'prozak-2',
    slug: 'prozak-2',
    name: 'Prozak 2.0',
    cityId: 'krakow',
    cityName: 'Kraków',
    address: 'pl. Dominikański 6, 31-043 Kraków',
    description: 'Three underground levels of ancient brick cellars hidden directly beneath Kraków’s Old Town. Funktion-One sound and continuous music until Sunday morning.',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1000&q=80',
    capacity: 900,
    soundSystem: 'Funktion-One Full Acoustic Matrix',
    rules: ['Selective Door Verification', 'No Harassment Policy', '18+'],
    links: { website: 'https://prozak20.pl', instagram: 'https://instagram.com/prozakdwazero' }
  },
  {
    id: 'transformator',
    slug: 'transformator',
    name: 'Transformator',
    cityId: 'wroclaw',
    cityName: 'Wrocław',
    address: 'ul. Tęczowa 57G, 53-601 Wrocław',
    description: 'Former industrial transformer station featuring two distinct dance chambers (Ostry and Szklarnia), visual laser mapping, and an eclectic mix of hard techno, electro, and jungle.',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80',
    capacity: 800,
    soundSystem: 'Custom KV2 Audio ES System',
    rules: ['Open Minded Atmosphere', 'Ear Protection Advised', 'Safe Space', '18+'],
    links: { website: 'https://transformator.com.pl', instagram: 'https://instagram.com/transformator_klub' }
  },
  {
    id: 'crackhouse',
    slug: 'crackhouse',
    name: 'Crackhouse',
    cityId: 'gdansk',
    cityName: 'Gdańsk',
    address: 'ul. Doki 1, 80-958 Gdańsk',
    description: 'Set inside the historic Gdańsk Imperial Shipyard amongst towering steel cranes. Gritty, uncompromising rave spirit with industrial techno, gabber, and acid.',
    image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=1000&q=80',
    capacity: 700,
    soundSystem: 'Custom Ground Stack B52 & Void Subs',
    rules: ['Warehouse Rules', 'No Intolerant Behavior', 'Water Points Free', '18+'],
    links: { website: 'https://crackhouse.pl', instagram: 'https://instagram.com/crackhouse_gdansk' }
  }
];

export const ARTISTS: ArtistProfile[] = [
  {
    id: 'vtss',
    slug: 'vtss',
    name: 'VTSS',
    realName: 'Martyna Maja',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=80',
    bio: 'Warsaw-born, London & Berlin-based trailblazer Martyna Maja has redefined European rave culture with ferocious 150+ BPM sets, crushing industrial techno, gabber elements, and raw hyper-energetic performance.',
    genres: ['Industrial Techno', 'Hardcore', 'Gabber', 'EBM'],
    city: 'Warsaw',
    labels: ['Ninja Tune', 'Hellcat', 'Intrepid Skin', 'SPFDJ / Intrepid'],
    socialLinks: {
      spotify: 'https://open.spotify.com',
      soundcloud: 'https://soundcloud.com',
      instagram: 'https://instagram.com',
      residentAdvisor: 'https://ra.co'
    },
    followersCount: 38400,
    isVerified: true,
    monthlyListeners: 185000,
    upcomingEventsCount: 4,
    latestRelease: 'In Sight of the Abyss EP'
  },
  {
    id: 'sept',
    slug: 'sept',
    name: 'Sept',
    realName: 'Michał Sept',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1400&q=80',
    bio: 'One of the driving architects of Poland’s hypnotic techno wave. Sept’s modular live sets and surgical studio productions have earned releases on Voxnox, Flash Recordings, and Tar Hallow.',
    genres: ['Hypnotic Techno', 'Modular Live', 'Raw Techno'],
    city: 'Warsaw',
    labels: ['Voxnox Berlin', 'Flash Recordings', 'Dystopian', 'Sonorous'],
    socialLinks: {
      spotify: 'https://open.spotify.com',
      soundcloud: 'https://soundcloud.com',
      instagram: 'https://instagram.com',
      residentAdvisor: 'https://ra.co'
    },
    followersCount: 16200,
    isVerified: true,
    monthlyListeners: 72000,
    upcomingEventsCount: 3,
    latestRelease: 'Modulation Vector LP'
  },
  {
    id: 'monster',
    slug: 'monster',
    name: 'Monster',
    realName: 'Dominika Monster',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80',
    bio: 'Discwoman affiliate and Poznań’s premier selector. Monster weaves playful acid house, breakbeat hardcore, trance mutations, and high-octane basslines with unmatched infectious technical precision.',
    genres: ['Acid House', 'Breakbeat', 'Oldschool Trance', 'Electro'],
    city: 'Poznań',
    labels: ['Discwoman', 'Oramics', 'Polena Records'],
    socialLinks: {
      spotify: 'https://open.spotify.com',
      soundcloud: 'https://soundcloud.com',
      instagram: 'https://instagram.com'
    },
    followersCount: 22100,
    isVerified: true,
    monthlyListeners: 94000,
    upcomingEventsCount: 3,
    latestRelease: 'Rave Is The Message (Live at Schron)'
  },
  {
    id: 'an-on-bast',
    slug: 'an-on-bast',
    name: 'An On Bast',
    realName: 'Anna Suda',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
    bio: 'Acclaimed modular synthesizer live performer and sound sculptor. Endorsed by Carl Cox and Red Bull Music Academy, Anna crafts lush, driving melodic & analog techno entirely hardware-live.',
    genres: ['Modular Live', 'Melodic Techno', 'Analog Dub'],
    city: 'Wrocław',
    labels: ['Awesome Soundwave', 'Ghostly International', 'Kompakt'],
    socialLinks: {
      spotify: 'https://open.spotify.com',
      soundcloud: 'https://soundcloud.com',
      youtube: 'https://youtube.com'
    },
    followersCount: 19800,
    isVerified: true,
    monthlyListeners: 61000,
    upcomingEventsCount: 2,
    latestRelease: 'From The Cloud To The Root'
  },
  {
    id: 'dtekk',
    slug: 'dtekk',
    name: 'Dtekk',
    realName: 'Jędrzej Dondziło',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1400&q=80',
    bio: 'Founder of the iconic Up To Date Festival and Polish ambient pioneer. A vinyl purist who commands hypnotic journeys from twilight ambient soundscapes to deep rolling electro.',
    genres: ['Deep Techno', 'Ambient', 'Electro', 'Vinyl Selector'],
    city: 'Białystok',
    labels: ['Up To Date', 'Pozdro Techno', 'Technokracja'],
    socialLinks: {
      soundcloud: 'https://soundcloud.com',
      instagram: 'https://instagram.com',
      residentAdvisor: 'https://ra.co'
    },
    followersCount: 14500,
    isVerified: true,
    monthlyListeners: 42000,
    upcomingEventsCount: 2,
    latestRelease: 'Salon Ambientu (Vol. IX)'
  },
  {
    id: 'carla-roca',
    slug: 'carla-roca',
    name: 'Carla Roca',
    realName: 'Karolina Rok',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=1400&q=80',
    bio: 'Legend of Polish techno culture since the late 1990s. Resident of Poznań’s Black Point, delivering uncompromising high-velocity hard techno with analog vinyl grit.',
    genres: ['Hard Techno', 'Schranz', 'Peak Time'],
    city: 'Poznań',
    labels: ['Black Point', 'Techno League Poland'],
    socialLinks: {
      soundcloud: 'https://soundcloud.com',
      instagram: 'https://instagram.com'
    },
    followersCount: 11200,
    isVerified: true,
    monthlyListeners: 35000,
    upcomingEventsCount: 1,
    latestRelease: 'Iron Foundry EP'
  },
  {
    id: 'olivia',
    slug: 'olivia',
    name: 'Olivia',
    realName: 'Olivia Ungaro',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1400&q=80',
    bio: 'Kraków’s Unsound Festival luminary and Radar party co-founder. Renowned across Panorama Bar and Tresor for her dark, cold-wave infused electro, italo-disco, and raw EBM cuts.',
    genres: ['EBM', 'Electro', 'Dark Wave', 'Acid Techno'],
    city: 'Kraków',
    labels: ['Pinkman', 'Killekill', 'Unsound'],
    socialLinks: {
      soundcloud: 'https://soundcloud.com',
      instagram: 'https://instagram.com',
      residentAdvisor: 'https://ra.co'
    },
    followersCount: 17400,
    isVerified: true,
    monthlyListeners: 54000,
    upcomingEventsCount: 3,
    latestRelease: 'Radiation Zone LP'
  }
];

export const EVENTS: RaveEvent[] = [
  {
    id: 'ev-jasna-24h',
    slug: 'obiekt-hypnotic-24h-rave-jasna-1',
    title: 'OBIEKT HYPNOTIC: 24-HOUR RAVE',
    subtitle: 'A non-stop subterranean ritual spanning deep hypnotic techno, live modular sessions, and ambient recovery.',
    date: '2026-09-19',
    startTime: '23:00',
    endTime: '23:00 (+1 day)',
    venueId: 'jasna-1',
    venueName: 'Jasna 1',
    cityId: 'warsaw',
    cityName: 'Warsaw',
    address: 'ul. Jasna 1, 00-013 Warszawa',
    description: 'Enter the blacked-out basement of Jasna 1 for our signature 24-hour continuous marathon. Room 1 will deliver driving hypnotic & modular techno driven through the Void acoustics rig. Room 2 offers an immersive ambient decompression chamber with herbal tea bar and visual ambient sculptures. Strict no camera policy in full effect.',
    genres: ['Hypnotic Techno', 'Modular Live', 'Ambient', 'Deep Techno'],
    lineup: [
      { artistId: 'sept', name: 'Sept (Live)', setTime: '02:00 - 04:30', isHeadliner: true },
      { artistId: 'dtekk', name: 'Dtekk', setTime: '04:30 - 08:00', isHeadliner: true },
      { artistId: 'an-on-bast', name: 'An On Bast (Hardware Live)', setTime: '14:00 - 16:30', isHeadliner: true },
      { name: 'Kovvalsky', setTime: '23:00 - 02:00' },
      { name: 'Chino (Live)', setTime: '08:00 - 11:00' },
      { name: 'Monster', setTime: '19:00 - 23:00', isHeadliner: true }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    ticketTiers: [
      { id: 't1', name: 'Early Bird Raver', price: 45, originalPrice: 60, description: 'Guaranteed entry before 01:00. Limited batch.', available: 12, total: 100, status: 'selling_fast' },
      { id: 't2', name: 'First Release (24h Full Access)', price: 65, description: 'Full 24h pass with re-entry permitted after 08:00.', available: 84, total: 250, status: 'available' },
      { id: 't3', name: 'Late Night Pass', price: 80, description: 'Valid anytime throughout the 24-hour window.', available: 110, total: 200, status: 'available' }
    ],
    minPrice: 45,
    status: 'selling_fast',
    organizerId: 'org-jasna',
    organizerName: 'Jasna 1 Collective',
    ageRestriction: '18+',
    dressCode: 'All Black / Expressive / Club Attire. No sportswear with offensive prints.',
    awarenessPolicy: 'Jasna 1 Awareness Angels are on patrol throughout the venue. Consent is mandatory. No photo stickers applied upon entry.',
    links: { residentAdvisor: 'https://ra.co/events/obiekt', facebook: 'https://facebook.com/events/obiekt' },
    isFeatured: true,
    isThisWeekend: true,
    attendeesCount: 420,
    approvalStatus: 'approved',
    createdAt: '2026-09-01T10:00:00Z'
  },
  {
    id: 'ev-smolna-vtss',
    slug: 'smolna-invites-vtss-hard-dance',
    title: 'SMOLNA: VTSS ALL NIGHT EXPEDITION',
    subtitle: 'High-velocity 150+ BPM industrial techno, raw gabber kicks, and relentless power.',
    date: '2026-09-20',
    startTime: '23:30',
    endTime: '08:00',
    venueId: 'smolna',
    venueName: 'Smolna',
    cityId: 'warsaw',
    cityName: 'Warsaw',
    address: 'ul. Smolna 38, 00-375 Warszawa',
    description: 'Martyna Maja aka VTSS returns to Warsaw for an exclusive headline appearance at Smolna’s main room. Expect breakneck tempos, distorted acid hooks, and an electric atmosphere charged with European rave rebellion.',
    genres: ['Industrial Techno', 'Hard Techno', 'Gabber', 'EBM'],
    lineup: [
      { artistId: 'vtss', name: 'VTSS', setTime: '02:00 - 05:30', isHeadliner: true },
      { name: 'Truant', setTime: '23:30 - 02:00' },
      { name: 'Kajko', setTime: '05:30 - 08:00' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    ticketTiers: [
      { id: 't1', name: 'Early Entry (before 00:30)', price: 50, originalPrice: 70, description: 'Must arrive before 00:30.', available: 4, total: 120, status: 'selling_fast' },
      { id: 't2', name: 'Standard General Admission', price: 70, description: 'Guaranteed queue bypass entry all night.', available: 160, total: 400, status: 'available' },
      { id: 't3', name: 'VIP Patio & Backstage Pass', price: 130, description: 'Access to private artist bar and covered terrace.', available: 18, total: 40, status: 'available' }
    ],
    minPrice: 50,
    status: 'selling_fast',
    organizerId: 'org-smolna',
    organizerName: 'Smolna Productions',
    ageRestriction: '21+',
    dressCode: 'Strict door selection. Underground aesthetic, rave wear, monochrome.',
    awarenessPolicy: 'Strict safe space policy. Respect fellow dancers. In case of discomfort contact bar or security staff.',
    isFeatured: true,
    isThisWeekend: true,
    attendeesCount: 680,
    approvalStatus: 'approved',
    createdAt: '2026-09-02T12:00:00Z'
  },
  {
    id: 'ev-tama-reverb',
    slug: 'tama-reverb-industrial-odyssey',
    title: 'TAMA: INDUSTRIAL REVERBERATION',
    subtitle: 'Massive scale techno inside Poznań’s historic 19th-century railway pumping palace.',
    date: '2026-09-26',
    startTime: '23:00',
    endTime: '07:30',
    venueId: 'tama',
    venueName: 'Tama',
    cityId: 'poznan',
    cityName: 'Poznań',
    address: 'ul. Niezłomnych 1B, 61-894 Poznań',
    description: 'An architectural acoustic ritual. Tama brings monumental sub-bass to Poznań with a masterclass lineup of driving European techno selectors and analog visual projection mapping across the 15-meter brick arches.',
    genres: ['Raw Techno', 'Peak Time Techno', 'Acid'],
    lineup: [
      { artistId: 'carla-roca', name: 'Carla Roca', setTime: '01:30 - 04:00', isHeadliner: true },
      { artistId: 'monster', name: 'Monster', setTime: '04:00 - 06:30', isHeadliner: true },
      { name: 'Joana', setTime: '23:00 - 01:30' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    ticketTiers: [
      { id: 't1', name: 'Phase 1 - Blind Faith', price: 40, available: 0, total: 150, status: 'sold_out' },
      { id: 't2', name: 'Phase 2 - Regular Ticket', price: 55, available: 140, total: 350, status: 'available' },
      { id: 't3', name: 'Phase 3 - Last Chance', price: 70, available: 80, total: 150, status: 'available' }
    ],
    minPrice: 55,
    status: 'available',
    organizerId: 'org-tama',
    organizerName: 'Tama Booking',
    ageRestriction: '18+',
    dressCode: 'Comfortable rave footwear recommended. Express yourself.',
    awarenessPolicy: 'Zero harassment tolerance. Dedicated medical and chillout space inside the gallery room.',
    isFeatured: true,
    isThisWeekend: false,
    attendeesCount: 520,
    approvalStatus: 'approved',
    createdAt: '2026-09-03T14:00:00Z'
  },
  {
    id: 'ev-cialo-hypnotic',
    slug: 'cialo-wroclaw-subterranean-hypnosis',
    title: 'CIAŁO: DEEP PRESSURE VOID',
    subtitle: 'Pitch-black concrete chamber, raw subfrequencies, and continuous hypnotic trance.',
    date: '2026-09-25',
    startTime: '23:00',
    endTime: '08:00',
    venueId: 'cialo',
    venueName: 'Ciało',
    cityId: 'wroclaw',
    cityName: 'Wrocław',
    address: 'ul. Joannitów 13, 50-525 Wrocław',
    description: 'Hidden beneath the rail lines, Ciało provides an intimate sanctuary for devotees of dark, rolling, hypnotic techno. Minimal lighting, maximum sensory focus.',
    genres: ['Hypnotic Techno', 'Dark Techno', 'Minimal'],
    lineup: [
      { artistId: 'sept', name: 'Sept', setTime: '02:00 - 05:00', isHeadliner: true },
      { name: 'Spectribe', setTime: '23:00 - 02:00' },
      { name: 'Vacos', setTime: '05:00 - 08:00' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    ticketTiers: [
      { id: 't1', name: 'Early Presale', price: 35, available: 10, total: 80, status: 'selling_fast' },
      { id: 't2', name: 'Standard Ticket', price: 50, available: 95, total: 180, status: 'available' }
    ],
    minPrice: 35,
    status: 'selling_fast',
    organizerId: 'org-cialo',
    organizerName: 'Klub Ciało Crew',
    ageRestriction: '18+',
    dressCode: 'Dark, understated, comfortable.',
    awarenessPolicy: 'No photo stickers on phone lenses at entrance. Treat everyone with dignity.',
    isFeatured: false,
    isThisWeekend: false,
    attendeesCount: 290,
    approvalStatus: 'approved',
    createdAt: '2026-09-04T09:00:00Z'
  },
  {
    id: 'ev-p23-factory',
    slug: 'p23-porcelain-factory-acid-surge',
    title: 'P23 RAW FACTORY: ACID SURGE',
    subtitle: 'Massive Silesian porcelain hall, 303 acid squelch, and heavy warehouse kicks.',
    date: '2026-10-02',
    startTime: '22:00',
    endTime: '08:00',
    venueId: 'p23',
    venueName: 'P23 Katowice',
    cityId: 'katowice',
    cityName: 'Katowice',
    address: 'ul. Porcelanowa 23, 40-246 Katowice',
    description: 'The historic factory floor turns into an acid battleground. 8 hours of pure Roland TB-303 synthesizers, industrial strobes, and energetic rave communion in Katowice.',
    genres: ['Acid Techno', 'Industrial Techno', 'Hard Dance'],
    lineup: [
      { artistId: 'monster', name: 'Monster', setTime: '01:30 - 04:00', isHeadliner: true },
      { artistId: 'carla-roca', name: 'Carla Roca', setTime: '04:00 - 06:30', isHeadliner: true },
      { name: 'Siasia', setTime: '22:00 - 01:30' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=1200&q=80',
    ticketTiers: [
      { id: 't1', name: 'Phase 1 Presale', price: 45, available: 60, total: 200, status: 'available' },
      { id: 't2', name: 'Phase 2 Regular', price: 60, available: 200, total: 400, status: 'available' }
    ],
    minPrice: 45,
    status: 'available',
    organizerId: 'org-p23',
    organizerName: 'P23 Silesia',
    ageRestriction: '18+',
    dressCode: 'Industrial, rave, leather, mesh, cyber.',
    awarenessPolicy: 'Free water stations. Safe space team wearing neon green armbands.',
    isFeatured: true,
    isThisWeekend: false,
    attendeesCount: 480,
    approvalStatus: 'approved',
    createdAt: '2026-09-05T11:00:00Z'
  },
  {
    id: 'ev-prozak-vaults',
    slug: 'prozak-subterranean-labyrinth-krakow',
    title: 'PROZAK: VAULT LABYRINTH SESSION',
    subtitle: 'Three underground brick levels echoing with EBM, dark wave, and driving techno.',
    date: '2026-09-26',
    startTime: '23:00',
    endTime: '07:00',
    venueId: 'prozak-2',
    venueName: 'Prozak 2.0',
    cityId: 'krakow',
    cityName: 'Kraków',
    address: 'pl. Dominikański 6, 31-043 Kraków',
    description: 'Beneath Kraków’s bustling market square lies a world of medieval brick vaults that have echoed electronic music for over two decades. Featuring Olivia curating Room -1 with razor-sharp EBM and acid techno.',
    genres: ['EBM', 'Acid Techno', 'Electro', 'Dark Wave'],
    lineup: [
      { artistId: 'olivia', name: 'Olivia (Extended 4h Set)', setTime: '01:00 - 05:00', isHeadliner: true },
      { name: 'Chino', setTime: '23:00 - 01:00' },
      { name: 'Kinzo Chrome', setTime: '05:00 - 07:00' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    ticketTiers: [
      { id: 't1', name: 'Early Bird', price: 30, available: 8, total: 80, status: 'selling_fast' },
      { id: 't2', name: 'Standard Club Entry', price: 45, available: 120, total: 200, status: 'available' }
    ],
    minPrice: 30,
    status: 'selling_fast',
    organizerId: 'org-prozak',
    organizerName: 'Prozak 2.0 Kraków',
    ageRestriction: '18+',
    dressCode: 'Open minded. No casual sportswear.',
    awarenessPolicy: 'Zero tolerance for unwanted contact or harassment.',
    isFeatured: false,
    isThisWeekend: false,
    attendeesCount: 310,
    approvalStatus: 'approved',
    createdAt: '2026-09-06T15:00:00Z'
  },
  {
    id: 'ev-crackhouse-stocznia',
    slug: 'crackhouse-gdansk-shipyard-rave',
    title: 'STOCZNIA UNDERGROUND: SHIPYARD ECHOES',
    subtitle: 'Baltic shipyard warehouse, salty sea air, crushing kicks, and raw post-industrial spirit.',
    date: '2026-10-03',
    startTime: '23:00',
    endTime: '08:00',
    venueId: 'crackhouse',
    venueName: 'Crackhouse',
    cityId: 'gdansk',
    cityName: 'Gdańsk',
    address: 'ul. Doki 1, 80-958 Gdańsk',
    description: 'Set right in the shipyard docks where historic Polish trade unions formed, Crackhouse turns the steel halls into an uncompromising gathering for lovers of fast, heavy, and sincere rave music.',
    genres: ['Hard Techno', 'Industrial', 'Gabber', 'Breakbeat'],
    lineup: [
      { artistId: 'vtss', name: 'VTSS', setTime: '02:30 - 05:00', isHeadliner: true },
      { name: 'Naked Relaxing', setTime: '23:00 - 02:30' },
      { name: 'Błażej Malinowski', setTime: '05:00 - 08:00' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=1200&q=80',
    ticketTiers: [
      { id: 't1', name: 'Dockworker Early Batch', price: 40, available: 22, total: 100, status: 'selling_fast' },
      { id: 't2', name: 'Regular Shipyard Pass', price: 60, available: 150, total: 300, status: 'available' }
    ],
    minPrice: 40,
    status: 'available',
    organizerId: 'org-crackhouse',
    organizerName: 'Crackhouse Collective',
    ageRestriction: '18+',
    dressCode: 'Grungy, dark, functional rave gear.',
    awarenessPolicy: 'We respect every raver. Safe team on duty. Test kits and free water available.',
    isFeatured: true,
    isThisWeekend: false,
    attendeesCount: 410,
    approvalStatus: 'approved',
    createdAt: '2026-09-07T12:00:00Z'
  },
  {
    id: 'ev-schron-bunker',
    slug: 'schron-poznan-fallout-acid-marathon',
    title: 'SCHRON: FALLOUT BUNKER ACID RITUAL',
    subtitle: 'Underground fallout shelter, 3-meter concrete walls, and thunderous analog acid vibrations.',
    date: '2026-09-19',
    startTime: '23:00',
    endTime: '09:00',
    venueId: 'schron',
    venueName: 'Schron',
    cityId: 'poznan',
    cityName: 'Poznań',
    address: 'ul. Kościuszki 68, 61-891 Poznań',
    description: 'Descend 10 meters beneath street level into Poznań’s historic bunker. No cell phone reception, no sunlight, just relentless low-end rumble and acid frequencies resonating through sealed blast doors.',
    genres: ['Acid Techno', 'Raw Techno', 'Hard Trance'],
    lineup: [
      { artistId: 'monster', name: 'Monster (B2B Special)', setTime: '02:00 - 06:00', isHeadliner: true },
      { name: 'Dr. Motte (Special Guest)', setTime: '06:00 - 09:00' },
      { name: 'Schron Resident Collective', setTime: '23:00 - 02:00' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
    ticketTiers: [
      { id: 't1', name: 'Bunker Pass (Presale)', price: 40, available: 15, total: 100, status: 'selling_fast' },
      { id: 't2', name: 'Door Batch Reserve', price: 55, available: 65, total: 150, status: 'available' }
    ],
    minPrice: 40,
    status: 'selling_fast',
    organizerId: 'org-schron',
    organizerName: 'Schron Association',
    ageRestriction: '18+',
    dressCode: 'Bunker chic, dark, no fancy dress.',
    awarenessPolicy: 'Intense environment: earplugs provided free at cloakroom. Respect the space.',
    isFeatured: true,
    isThisWeekend: true,
    attendeesCount: 380,
    approvalStatus: 'approved',
    createdAt: '2026-09-08T10:00:00Z'
  },
  {
    id: 'ev-transformator-hard',
    slug: 'transformator-wroclaw-hard-dance-assault',
    title: 'TRANSFORMATOR: HARD DANCE SPECTRUM',
    subtitle: 'Dual room clash: hard techno & industrial versus fast breakbeats and neo-rave.',
    date: '2026-10-09',
    startTime: '22:30',
    endTime: '08:00',
    venueId: 'transformator',
    venueName: 'Transformator',
    cityId: 'wroclaw',
    cityName: 'Wrocław',
    address: 'ul. Tęczowa 57G, 53-601 Wrocław',
    description: 'Transformator unleashes both main rooms: Room Ostry hosts relentless 150+ BPM industrial techno while Room Szklarnia transforms into a glowing neon greenhouse of jungle, drum & bass, and breaks.',
    genres: ['Hard Techno', 'Jungle / D&B', 'Neo-Rave', 'Industrial'],
    lineup: [
      { artistId: 'an-on-bast', name: 'An On Bast (Live)', setTime: '01:00 - 03:00', isHeadliner: true },
      { name: 'Kolektyw Transformator', setTime: '22:30 - 01:00' },
      { name: 'Wax Vandal', setTime: '03:00 - 06:00' },
      { name: 'Acid Chaser', setTime: '06:00 - 08:00' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    ticketTiers: [
      { id: 't1', name: 'Presale Phase 1', price: 35, available: 40, total: 150, status: 'available' },
      { id: 't2', name: 'Regular Pass', price: 50, available: 160, total: 300, status: 'available' }
    ],
    minPrice: 35,
    status: 'available',
    organizerId: 'org-trans',
    organizerName: 'Transformator Wrocław',
    ageRestriction: '18+',
    dressCode: 'Open, colorful, cyber, or all black.',
    awarenessPolicy: 'Inclusive venue. Discrimination or non-consensual behavior leads to immediate expulsion.',
    isFeatured: false,
    isThisWeekend: false,
    attendeesCount: 340,
    approvalStatus: 'approved',
    createdAt: '2026-09-09T14:00:00Z'
  }
];

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'tr-1',
    title: 'Relentless Surge (Original Mix)',
    artistId: 'vtss',
    artistName: 'VTSS',
    genre: 'Industrial Techno',
    duration: '06:14',
    bpm: 152,
    releaseDate: '2026-08-14',
    artworkUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/track-1.mp3',
    streamCount: 48200,
    format: 'Track',
    label: 'Hellcat Records'
  },
  {
    id: 'tr-2',
    title: 'Modular Oscillations live at Jasna 1',
    artistId: 'sept',
    artistName: 'Sept',
    genre: 'Hypnotic Techno',
    duration: '01:12:40',
    bpm: 138,
    releaseDate: '2026-09-02',
    artworkUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/track-2.mp3',
    streamCount: 31400,
    format: 'Live Set',
    label: 'Voxnox Berlin'
  },
  {
    id: 'tr-3',
    title: 'Acid Odyssey (Bunker Edit)',
    artistId: 'monster',
    artistName: 'Monster',
    genre: 'Acid House',
    duration: '05:48',
    bpm: 142,
    releaseDate: '2026-07-28',
    artworkUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/track-3.mp3',
    streamCount: 27900,
    format: 'Track',
    label: 'Discwoman Poland'
  },
  {
    id: 'tr-4',
    title: 'Analog Roots & Synthesizers',
    artistId: 'an-on-bast',
    artistName: 'An On Bast',
    genre: 'Melodic Techno',
    duration: '07:22',
    bpm: 134,
    releaseDate: '2026-08-30',
    artworkUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/track-4.mp3',
    streamCount: 19400,
    format: 'Track',
    label: 'Awesome Soundwave'
  },
  {
    id: 'tr-5',
    title: 'Dusk Ambient Sessions (Up To Date Mix)',
    artistId: 'dtekk',
    artistName: 'Dtekk',
    genre: 'Ambient',
    duration: '58:15',
    bpm: 110,
    releaseDate: '2026-09-10',
    artworkUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/track-5.mp3',
    streamCount: 14200,
    format: 'DJ Mix',
    label: 'Salon Ambientu'
  },
  {
    id: 'tr-6',
    title: 'Dark Wave Transmission in Kraków',
    artistId: 'olivia',
    artistName: 'Olivia',
    genre: 'EBM',
    duration: '06:05',
    bpm: 132,
    releaseDate: '2026-08-05',
    artworkUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=400&q=80',
    audioUrl: '/audio/track-6.mp3',
    streamCount: 22800,
    format: 'Track',
    label: 'Pinkman Records'
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'art-1',
    slug: 'the-rebirth-of-polish-rave-culture-inside-the-underground',
    title: 'Inside Poland’s Underground Rave Renaissance: From Post-Communist Bunkers to Europe’s Most Radical Safe Spaces',
    excerpt: 'How a generation of visionary Polish club owners, queer collectives, and modular synthesists turned Warsaw, Poznań, and Katowice into Europe’s most exciting nightlife destination.',
    content: `Across Poland’s major metropolitan hubs, a profound transformation has taken place over the past five years. Where warehouse parties once grappled with post-transitional economic constraints, an fiercely autonomous, internationally respected electronic music culture has crystallized.

From Jasna 1 in Warsaw—revered for its no-camera sanctuary and immaculate Void Acoustics fidelity—to Poznań’s Schron fallout bunker and the colossal brick arches of Tama, Polish clubs are setting benchmarks for sonic engineering and cultural integrity.

"Polish ravers come with an extraordinary degree of musical stamina and genuine hunger," explains Warsaw resident selector Sept. "People aren't clubbing here for social media clout—especially with sticker-sealed camera lenses. They are in the room to experience transcendence through sound."

Crucial to this renaissance is the alliance between musical innovation and harm reduction. Organizations such as SIN (Społeczna Inicjatywa Narkopolityki) and in-house awareness angels have established safe, inclusive environments where clubbers look out for each other. As international tourists flood Berlin and Amsterdam, Poland has emerged as the true beating heart of authentic, uncompromising European underground rave culture.`,
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Aleksandra Nowak',
      role: 'Head of Editorial, Rave Nation',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-09-15',
    category: 'Scene News',
    readingTime: '6 min read',
    isExclusive: false,
    tags: ['Warsaw Underground', 'Club Culture', 'Sound Systems', 'Safe Space']
  },
  {
    id: 'art-2',
    slug: 'harm-reduction-club-awareness-polish-scene-guide',
    title: 'Rave With Respect: The Definitive Polish Nightlife Harm Reduction & Awareness Guide',
    excerpt: 'Understanding awareness teams, hydration strategies, peer testing, and consent protocols across Poland’s leading club venues.',
    content: `Underground raving is founded on collective euphoria, bodily autonomy, and radical empathy. As tempo levels rise and parties frequently stretch past 24 hours in venues like Jasna 1, Schron, and Ciało, prioritizing personal and communal safety is paramount.

Here is what you need to know about navigating the Polish club landscape safely:

1. Look For The Awareness Team:
In modern Polish clubs, awareness teams wear glowing armbands or designated badges. They exist to intervene in situations of discomfort, harassment, or sensory overload. You can approach them at any point for water, earplugs, or confidential support.

2. Camera Policies Are Absolute:
In clubs like Jasna 1 and Smolna, colored tape will be placed across your phone camera lenses upon entry. Attempting to photograph or film fellow dancers violates club rules and results in immediate ejection. This ensures that every attendee feels liberated to dance without fear of exposure.

3. Hydration & Testing Initiatives:
Polish organizations like SIN (Społeczna Inicjatywa Narkopolityki) have fought tirelessly for evidence-based harm reduction. Drink water regularly (approx. 250-500ml per hour of dancing), take breaks in ambient chillout rooms, and never leave an incapacitated friend behind.

Remember: raving is not an escape from community; it is the ultimate expression of community.`,
    coverImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Piotr Wiśniewski',
      role: 'Harm Reduction Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-09-12',
    category: 'Harm Reduction',
    readingTime: '5 min read',
    isExclusive: false,
    tags: ['Harm Reduction', 'Safety', 'SIN', 'Awareness']
  },
  {
    id: 'art-3',
    slug: 'instytut-festival-inside-the-fortress-techno-cathedral',
    title: 'Instytut Festival: How a 19th-Century Fortress Became Poland’s Monument to Electronic Music',
    excerpt: 'Deep inside the gargantuan red-brick garrison of Twierdza Modlin, the legendary Polish techno brand celebrates monumental sound and historic architecture.',
    content: `Few festival locations on earth can rival Twierdza Modlin—the longest fortress building in Europe, constructed at the confluence of the Vistula and Narew rivers near Warsaw.

Every year, the team behind Instytut Festival converts these cavernous masonry tunnels, gunpowder chambers, and outdoor courtyards into an apocalyptic temple of sound.

With three dedicated stages—Main Stage, Rave Stage, and Underground Stage—the festival hosts over 100 international and domestic heavyweights. The acoustics inside the masonry vaults amplify sub-bass frequencies in ways that modern outdoor festival tents could never achieve.

"When you enter the fortress gates at 3 AM with fog rolling across the moats and laser arrays striking the centuries-old brickwork, you realize this isn't just another festival," says festival attendee Maciej from Gdańsk. "It feels like an ancient gathering repurposed for the electronic age."`,
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Marta Kowalczyk',
      role: 'Senior Music Journalist',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-09-08',
    category: 'Festival Guide',
    readingTime: '7 min read',
    isExclusive: true,
    tags: ['Instytut Festival', 'Festivals', 'Fortress Rave', 'Techno']
  },
  {
    id: 'art-4',
    slug: 'interview-vtss-on-tempo-acceleration-and-poland-roots',
    title: '“Energy Over Purism”: An Exclusive In-Depth Interview with VTSS',
    excerpt: 'Martyna Maja reflects on playing marathon sets at Jasna 1, the evolution from industrial purism to boundary-breaking cross-genre club speed, and why Poland remains her creative home.',
    content: `Few artists have shaped the sound of modern European high-energy dance floors quite like Martyna Maja, known globally as VTSS. Rising from the Warsaw basement scene to international festival headliner, she has consistently shattered techno orthodoxy by infusing her sets with gabber, hardcore, rap samples, and relentless 155 BPM fury.

We caught up with Martyna before her headline all-night session at Smolna to discuss her roots, evolving sound palette, and advice for the next generation of Polish producers.

"When I started playing in Poland, techno was very serious, very monochrome, very purist," Maja recalls. "I wanted something raw, unapologetic, sweaty, and fun. You don't have to choose between artistic depth and intense physical energy."

Speaking about the Warsaw scene: "Warsaw clubs gave me the space to fail, to experiment, and to discover what a true marathon set feels like. Coming back to play in Poland is always the most emotional stop on my tour. The crowds here don't hold back for a single second."`,
    coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Aleksandra Nowak',
      role: 'Head of Editorial, Rave Nation',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-09-01',
    category: 'Interviews',
    readingTime: '8 min read',
    isExclusive: true,
    tags: ['VTSS', 'Interview', 'Warsaw', 'High Energy Techno']
  }
];

export const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    orderRef: 'RN-WAW-84920',
    eventId: 'ev-jasna-24h',
    eventTitle: 'OBIEKT HYPNOTIC: 24-HOUR RAVE',
    eventDate: '2026-09-19',
    eventTime: '23:00 - 23:00 (+1 day)',
    eventVenue: 'Jasna 1',
    cityName: 'Warsaw',
    eventPoster: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    attendee: {
      fullName: 'Jan Kowalski',
      email: 'jan.kowalski@example.pl',
      phone: '+48 501 234 567'
    },
    items: [
      { tierId: 't2', tierName: 'First Release (24h Full Access)', quantity: 2, price: 65 }
    ],
    totalAmount: 130,
    currency: 'PLN',
    status: 'confirmed',
    bookedAt: '2026-09-10T18:42:00Z',
    qrCodeData: 'RAVENATION:RN-WAW-84920:EV-JASNA-24H:QTY2:CONFIRMED'
  },
  {
    id: 'book-102',
    orderRef: 'RN-POZ-39211',
    eventId: 'ev-schron-bunker',
    eventTitle: 'SCHRON: FALLOUT BUNKER ACID RITUAL',
    eventDate: '2026-09-19',
    eventTime: '23:00 - 09:00',
    eventVenue: 'Schron',
    cityName: 'Poznań',
    eventPoster: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80',
    attendee: {
      fullName: 'Jan Kowalski',
      email: 'jan.kowalski@example.pl',
      phone: '+48 501 234 567'
    },
    items: [
      { tierId: 't1', tierName: 'Bunker Pass (Presale)', quantity: 1, price: 40 }
    ],
    totalAmount: 40,
    currency: 'PLN',
    status: 'confirmed',
    bookedAt: '2026-09-12T14:15:00Z',
    qrCodeData: 'RAVENATION:RN-POZ-39211:EV-SCHRON-BUNKER:QTY1:CONFIRMED'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-demo',
    title: 'VTSS Just Announced a New Warsaw Tour Date',
    message: 'VTSS will headline Smolna on September 20. Tickets are moving fast!',
    type: 'artist_update',
    read: false,
    createdAt: '2026-09-17T09:30:00Z',
    link: 'event:ev-smolna-vtss'
  },
  {
    id: 'notif-2',
    userId: 'user-demo',
    title: 'Booking Confirmed: OBIEKT HYPNOTIC (Jasna 1)',
    message: 'Your ticket order RN-WAW-84920 is confirmed. QR pass is ready in your account.',
    type: 'ticket_booked',
    read: false,
    createdAt: '2026-09-10T18:42:00Z',
    link: 'user:tickets'
  },
  {
    id: 'notif-3',
    userId: 'user-demo',
    title: 'Sept Released a New Hypnotic Modular Live Set',
    message: 'Sept recorded a 72-minute live modular journey from Jasna 1. Stream it now in Music.',
    type: 'artist_update',
    read: true,
    createdAt: '2026-09-05T12:00:00Z',
    link: 'music:tr-2'
  }
];

export const ARTIST_UPDATES: ArtistUpdate[] = [
  {
    id: 'upd-1',
    artistId: 'vtss',
    artistName: 'VTSS',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: 'Warsaw! Returning this weekend for an extended high-speed set at Smolna. Preparing raw 155 BPM vinyl dubplates and unreleased edits. See you in the dark!',
    createdAt: '2026-09-17T14:20:00Z',
    likesCount: 342,
    tag: 'Tour Announcement'
  },
  {
    id: 'upd-2',
    artistId: 'sept',
    artistName: 'Sept',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'Just finished calibrating my Eurorack modular case for the 24-hour marathon at Jasna 1. We start at 02:00 sharp. Don’t miss the early morning transitions.',
    createdAt: '2026-09-16T18:05:00Z',
    likesCount: 189,
    tag: 'Live Set Preparation'
  },
  {
    id: 'upd-3',
    artistId: 'monster',
    artistName: 'Monster',
    artistAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    content: 'Poznań bunker crew! Schron this Saturday is going to be wild. Packed 3 crates of authentic 90s acid and fast breakbeats. Keep hydrated and dance hard.',
    createdAt: '2026-09-15T11:45:00Z',
    likesCount: 215,
    tag: 'Schron Poznań'
  }
];
