import {
  TripInput,
  FullTripPlan,
  TripFeasibility,
  BudgetBreakdown,
  TravelOption,
  FamousPlace,
  DayItinerary,
  AccommodationOption,
  FoodAndExperiences,
  WeatherInfo,
  AlternativeDestination,
  ChecklistItem
} from '../types/trip';

// Destination specific asset database with real travel intelligence
interface DestinationData {
  name: string;
  tagline: string;
  heroImage: string;
  vibe: string;
  idealSeason: string;
  type: 'beach' | 'hill' | 'heritage' | 'metro' | 'nature';
  avgBaseCostPerDayPerPerson: number;
  places: FamousPlace[];
  foods: { name: string; description: string; approxCost: string; bestPlaces: string }[];
  foodAreas: string[];
  experiences: { title: string; description: string; estimatedCost: string; duration: string }[];
  shopping: { market: string; items: string; tips: string }[];
  weather: {
    temperature: string;
    condition: string;
    conditionDescription: string;
    rainPossibility: string;
    humidity: string;
    bestTimeToVisit: string;
    travelTips: string[];
  };
  sampleItineraryIdeas: { title: string; activities: string[] }[];
}

const DESTINATION_DATABASE: Record<string, DestinationData> = {
  goa: {
    name: 'Goa',
    tagline: 'Sun, Sand, Portuguese Castles & Coastal Celebrations',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80',
    vibe: 'Laid-back, vibrant, coastal colonial charm',
    idealSeason: 'November to February (Pleasant winter sunshine)',
    type: 'beach',
    avgBaseCostPerDayPerPerson: 1800,
    places: [
      {
        id: 'p1',
        name: 'Baga Beach',
        description: 'Vibrant shoreline renowned for watersports, beach shacks, lively sunset music, and bustling flea stalls.',
        distance: '15 km from Panaji',
        entryFee: 'Free (Watersports: ₹500 - ₹1,500)',
        openingHours: 'Open 24 Hours (Shacks until 11:30 PM)',
        recommendedTime: '4:00 PM – 8:00 PM (Sunset & Vibe)',
        thingsToDo: ['Parasailing & Jet Ski', 'Sunset Shack Dining', 'Beach Walk', 'Live Music'],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        category: 'Beach & Watersports'
      },
      {
        id: 'p2',
        name: 'Calangute Beach',
        description: 'Dubbed the "Queen of Beaches", boasting a sweeping golden crescent popular with family travelers and swimming enthusiasts.',
        distance: '16 km from Panaji',
        entryFee: 'Free',
        openingHours: 'Open 24 Hours',
        recommendedTime: '7:00 AM – 11:00 AM or Late Afternoon',
        thingsToDo: ['Morning Swims', 'Souvenir Shopping', 'Banana Boat Rides', 'Seafood Tasting'],
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        category: 'Beach & Leisure'
      },
      {
        id: 'p3',
        name: 'Fort Aguada & Lighthouse',
        description: 'Well-preserved 17th-century Portuguese coastal bastion overlooking the majestic Arabian Sea confluence with Mandovi River.',
        distance: '18 km from Panaji',
        entryFee: '₹25 for Indians, ₹300 for Foreigners',
        openingHours: '9:30 AM – 5:30 PM',
        recommendedTime: '4:00 PM – 5:30 PM (Golden Hour)',
        thingsToDo: ['Panoramic Photography', 'Explore Bastions', 'Lighthouse View', 'Historical Walk'],
        image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80',
        category: 'Historic Landmark'
      },
      {
        id: 'p4',
        name: 'Dudhsagar Waterfalls',
        description: 'Spectacular four-tiered waterfall cascading through the Western Ghats jungle, famous for its roaring milky-white spray.',
        distance: '60 km from Panaji',
        entryFee: 'Jeep Safari: ₹500/person + Forest entry ₹50',
        openingHours: '7:00 AM – 5:00 PM',
        recommendedTime: 'Early Morning (8:00 AM Departure)',
        thingsToDo: ['4x4 Jungle Safari', 'Freshwater Dip', 'Bird Watching', 'Railway Bridge Photography'],
        image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=80',
        category: 'Nature & Adventure'
      },
      {
        id: 'p5',
        name: 'Basilica of Bom Jesus',
        description: 'UNESCO World Heritage landmark in Old Goa holding the sacred mortal remains of St. Francis Xavier, featuring baroque architecture.',
        distance: '10 km from Panaji',
        entryFee: 'Free',
        openingHours: '9:00 AM – 6:30 PM (Sun 10:30 AM – 6:30 PM)',
        recommendedTime: '10:00 AM – 1:00 PM',
        thingsToDo: ['Baroque Art Tour', 'Explore Sacred Relics', 'Visit Nearby Se Cathedral', 'Photography of Red Laterite Walls'],
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        category: 'UNESCO Heritage'
      },
      {
        id: 'p6',
        name: 'Anjuna Flea Market & Curlies',
        description: 'Bohemian open-air cliffside market bustling with handmade jewelry, tapestries, spices, and relaxed seaside sunset beats.',
        distance: '21 km from Panaji',
        entryFee: 'Free',
        openingHours: 'Wednesdays 9:00 AM – 7:00 PM',
        recommendedTime: '4:30 PM – 7:30 PM',
        thingsToDo: ['Curio Shopping', 'Sunset Chill', 'Live Acoustic Music', 'Café Hopping'],
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        category: 'Culture & Shopping'
      }
    ],
    foods: [
      { name: 'Goan Fish Curry & Rice', description: 'Fresh kingfish or pomfret stewed in tangy coconut, kokum and red chili paste.', approxCost: '₹220 - ₹380', bestPlaces: 'Fisherman\'s Wharf, Ritz Classic, Martin\'s Corner' },
      { name: 'Pork Vindaloo / Chicken Xacuti', description: 'Deeply aromatic Portuguese-influenced curry infused with roasted spices, poppy seeds, and coconut.', approxCost: '₹280 - ₹420', bestPlaces: 'Mum\'s Kitchen, Florentine Bar' },
      { name: 'Bebinca', description: 'Traditional multi-layered Goan dessert made with coconut milk, ghee, and nutmeg.', approxCost: '₹120 - ₹180', bestPlaces: 'Simonia Stores, Confiteria 31 De Janeiro' },
      { name: 'Poi Sandwiches & Ros Omelette', description: 'Street-style fluffy omelette smothered in spicy chicken or chickpea xacuti gravy inside warm crusty poi bread.', approxCost: '₹60 - ₹100', bestPlaces: 'Panaji Church Square Carts, Mapusa market' }
    ],
    foodAreas: ['Fontainhas (Latin Quarter)', 'Candolim Strip', 'Panaji Church Square', 'Anjuna Cliff Cafes'],
    experiences: [
      { title: 'Mandovi River Sunset Cruise', description: '1-hour evening cruise with Goan folk dances, live DJ, and river views.', estimatedCost: '₹500 / person', duration: '1.5 hours' },
      { title: 'Rent Scooters to Explore Fontainhas', description: 'Glide past vibrant yellow, sky-blue Portuguese villas and art cafes.', estimatedCost: '₹350 - ₹500 / day', duration: 'Half day' },
      { title: 'Scuba Diving at Grande Island', description: 'Boat ride with snorkeling/scuba diving, dolphin sighting, and beach barbecue.', estimatedCost: '₹1,600 / person', duration: '6 hours' }
    ],
    shopping: [
      { market: 'Anjuna Wednesday Market & Saturday Night Market', items: 'Boho apparel, silver jewelry, handmade hammocks, leather bags', tips: 'Haggling is customary; offer 40-50% lower initially.' },
      { market: 'Mapusa Friday Market', items: 'Spices, Goan chorizo sausages, cashews, feni liquor bottles', tips: 'Visit early morning for fresh vacuum-packed cashew nuts.' }
    ],
    weather: {
      temperature: '28°C - 32°C (Day) / 22°C (Evening)',
      condition: 'Sunny & Tropical',
      conditionDescription: 'Warm, breezy sunny skies ideal for beaches and open-air exploration.',
      rainPossibility: '10% (Low)',
      humidity: '65%',
      bestTimeToVisit: 'October to March',
      travelTips: [
        'Pack high-SPF sunscreen, polarized sunglasses, and breathable linen or cotton clothing.',
        'Rent scooters or self-drive cars at the station/airport to halve your intra-city taxi costs.',
        'Carry cash for beach shacks and flea stalls as cellular internet can be spotty near water.'
      ]
    },
    sampleItineraryIdeas: [
      { title: 'North Goa Beach & Watersports', activities: ['Baga & Calangute Beach', 'Fort Aguada', 'Anjuna Sunset'] },
      { title: 'Old Goa Heritage & South Goa Peace', activities: ['Basilica of Bom Jesus', 'Mangueshi Temple', 'Colva / Palolem Beach', 'Mandovi Cruise'] },
      { title: 'Hidden Waterfalls & Latin Quarters', activities: ['Fontainhas walking tour', 'Miramar beach sunset', 'Dinner at beach shack'] }
    ]
  },

  manali: {
    name: 'Manali',
    tagline: 'Snow-Capped Peaks, Coniferous Forests & Alpine Thrills',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80',
    vibe: 'Serene, alpine, adventurous and cozy',
    idealSeason: 'October to June (Snow from Dec–Feb; green meadows in summer)',
    type: 'hill',
    avgBaseCostPerDayPerPerson: 2000,
    places: [
      {
        id: 'm1',
        name: 'Solang Valley',
        description: 'High altitude adventure sports hub famous for paragliding, zorbing, quad biking, and winter snow skiing.',
        distance: '14 km from Manali Center',
        entryFee: 'Free (Activities ₹500 - ₹3,000)',
        openingHours: '9:00 AM – 6:00 PM',
        recommendedTime: '9:30 AM – 2:00 PM',
        thingsToDo: ['Paragliding', 'Ropeway Cable Car', 'Snow Tubing', 'Yak Rides'],
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        category: 'Adventure'
      },
      {
        id: 'm2',
        name: 'Hadimba Devi Temple',
        description: 'Unique 16th-century four-tiered pagoda wooden shrine nestled inside an enchanting deodar cedar forest.',
        distance: '2.5 km from Mall Road',
        entryFee: 'Free',
        openingHours: '8:00 AM – 6:00 PM',
        recommendedTime: '10:00 AM – 12:00 PM',
        thingsToDo: ['Cedar Woods Walk', 'Traditional Himachali Photo in Attire', 'Architectural Appreciation'],
        image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80',
        category: 'Spiritual & Architecture'
      },
      {
        id: 'm3',
        name: 'Old Manali & Cafe Street',
        description: 'Charming village vibe lined with bohemian wooden bakeries, live acoustic music joints, and apple orchards.',
        distance: '3 km from Mall Road',
        entryFee: 'Free',
        openingHours: 'Cafes open till 11:00 PM',
        recommendedTime: '5:00 PM – 10:00 PM',
        thingsToDo: ['Cafe Hopping', 'Live Music', 'Try Trout Fish', 'Artisanal Bakery Treats'],
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
        category: 'Culture & Nightlife'
      },
      {
        id: 'm4',
        name: 'Jogini Waterfalls Trek',
        description: 'Scenic gentle trek starting from Vashisht village meandering through apple orchards, pine trees, and cascading mountain water.',
        distance: '4.5 km from Manali',
        entryFee: 'Free',
        openingHours: 'Sunrise to Sunset',
        recommendedTime: '8:30 AM – 1:00 PM',
        thingsToDo: ['Nature Trekking', 'Natural Pool Dip', 'Panoramic Valley Views'],
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
        category: 'Hiking & Nature'
      }
    ],
    foods: [
      { name: 'Siddu with Ghee', description: 'Traditional steamed wheat yeast dough bread stuffed with crushed walnuts, poppy seeds and spices.', approxCost: '₹90 - ₹150', bestPlaces: 'Himalayan Trout House, Old Manali Cafes' },
      { name: 'Pan-fried River Trout', description: 'Freshly caught mountain trout marinated in mild garlic butter and mountain herbs.', approxCost: '₹350 - ₹550', bestPlaces: 'Johnson\'s Cafe, Cafe 1947' },
      { name: 'Thukpa & Steamed Tingmo', description: 'Comforting piping hot Tibetan noodle soup accompanied by fluffy steamed flower buns.', approxCost: '₹120 - ₹200', bestPlaces: 'Chopsticks Restaurant on Mall Road' }
    ],
    foodAreas: ['Old Manali Bridge', 'Mall Road Food Alley', 'Vashisht Temple lane'],
    experiences: [
      { title: 'Dip in Vashisht Natural Sulfur Hot Springs', description: 'Therapeutic natural mineral springs opposite historic wooden temple.', estimatedCost: 'Free', duration: '1 hour' },
      { title: 'Drive through Atal Tunnel to Sissu Valley', description: 'Engineering wonder leading into magical Lahaul landscape and waterfalls.', estimatedCost: '₹2,500 / cab split', duration: 'Half day' }
    ],
    shopping: [
      { market: 'Mall Road & Tibetan Market', items: 'Kullu shawls, wooden handicrafts, dried apricots, apple wine and prayer flags', tips: 'Check for authentic Kullu handloom weave seals.' }
    ],
    weather: {
      temperature: '8°C - 18°C (Pleasant) / Drops to 2°C at night',
      condition: 'Crisp Mountain Air',
      conditionDescription: 'Clear alpine breeze with cool daytime temperatures and chilly nights.',
      rainPossibility: '15%',
      humidity: '48%',
      bestTimeToVisit: 'March to June or December for snow',
      travelTips: [
        'Pack layers: thermal inners, a windbreaker jacket, woolen beanie, and sturdy walking shoes.',
        'Book the Atal Tunnel or Rohtang cab permit a day in advance through local taxi union.'
      ]
    },
    sampleItineraryIdeas: [
      { title: 'Arrival & Mall Road Walk', activities: ['Hadimba Temple', 'Vashisht Hot Springs', 'Old Manali Cafes'] },
      { title: 'High Altitude Thrills', activities: ['Solang Valley Zorbing / Paragliding', 'Atal Tunnel drive to Sissu waterfall'] },
      { title: 'Waterfalls & Apple Orchards', activities: ['Jogini Waterfall Trek', 'Naggar Castle day excursion'] }
    ]
  },

  jaipur: {
    name: 'Jaipur',
    tagline: 'The Regal Pink City of Forts, Bazaars & Palatial Splendor',
    heroImage: 'https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=1600&q=80',
    vibe: 'Regal, grand, colorful, historically rich',
    idealSeason: 'October to March (Pleasant mild winter)',
    type: 'heritage',
    avgBaseCostPerDayPerPerson: 1600,
    places: [
      {
        id: 'j1',
        name: 'Amer Fort (Amber Fort)',
        description: 'Colossal hilltop fortress of yellow and pink sandstone, housing the world-famous Sheesh Mahal (Mirror Palace).',
        distance: '11 km from Jaipur Center',
        entryFee: '₹100 for Indians, ₹500 for Foreigners',
        openingHours: '8:00 AM – 5:30 PM (Light & Sound at 7:30 PM)',
        recommendedTime: '8:30 AM – 12:00 PM',
        thingsToDo: ['Explore Sheesh Mahal', 'Elephant / Jeep Ride up hill', 'Sound & Light Show', 'Panoramic Bastion Views'],
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        category: 'Palaces & Forts'
      },
      {
        id: 'j2',
        name: 'Hawa Mahal (Palace of Winds)',
        description: 'Iconic five-story pink honeycomb facade featuring 953 intricately carved jharokha stone windows.',
        distance: 'City Center (Badi Choupad)',
        entryFee: '₹50 for Indians, ₹200 for Foreigners',
        openingHours: '9:00 AM – 5:00 PM',
        recommendedTime: 'Early Morning (8:00 AM for rooftop coffee photo)',
        thingsToDo: ['Rooftop Cafe View', 'Explore Interior Passages', 'Wind Tunnel Architecture'],
        image: 'https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=800&q=80',
        category: 'Iconic Architecture'
      },
      {
        id: 'j3',
        name: 'Nahargarh Fort Sunset Point',
        description: 'Perched on the Aravalli hills, offering breathtaking 360-degree aerial views of the entire lit-up Pink City.',
        distance: '15 km from Center',
        entryFee: '₹50 for Indians',
        openingHours: '10:00 AM – 6:00 PM',
        recommendedTime: '4:30 PM – 6:30 PM (Sunset)',
        thingsToDo: ['Sunset over Jaipur', 'Visit Padao Open-Air Cafe', 'Wax Museum Walk'],
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        category: 'Viewpoint & History'
      },
      {
        id: 'j4',
        name: 'City Palace & Jantar Mantar',
        description: 'Magnificent residence of the royal family alongside the UNESCO astronomical observatory with the world’s largest stone sundial.',
        distance: 'City Center',
        entryFee: '₹200 - ₹700 depending on courtyard access',
        openingHours: '9:30 AM – 5:00 PM',
        recommendedTime: '1:00 PM – 4:00 PM',
        thingsToDo: ['Pritam Niwas Chowk peacock gate', 'Royal Armory Museum', 'Astronomical Calculations'],
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        category: 'Royal Heritage'
      }
    ],
    foods: [
      { name: 'Authentic Dal Baati Churma', description: 'Crispy ghee-soaked baked wheat dumplings with spiced 5-lentil curry and sweet crushed wheat dessert.', approxCost: '₹250 - ₹450 / thali', bestPlaces: 'Chokhi Dhani, Rawat Mishthan Bhandar, Laxmi Mishthan' },
      { name: 'Pyaaz Ki Kachori & Lassi', description: 'Flaky deep-fried pastry bursting with caramelized spicy onion masala, served with thick earthen-pot malai lassi.', approxCost: '₹60 - ₹110', bestPlaces: 'Rawat Mishthan Bhandar, Lassiwala MI Road' },
      { name: 'Laal Maas', description: 'Fiery royal mutton curry infused with authentic Mathania red chillies and smoked charcoal.', approxCost: '₹350 - ₹550', bestPlaces: 'Handi Restaurant, Niros' }
    ],
    foodAreas: ['MI Road (Lassi & sweets)', 'Johari Bazaar street food', 'C-Scheme modern cafes'],
    experiences: [
      { title: 'Chokhi Dhani Cultural Village Evening', description: 'Immersive Rajasthani village fair with puppet shows, folk dancing, camel rides and royal feast.', estimatedCost: '₹950 / person', duration: '4 hours' },
      { title: 'Block Printing Workshop in Sanganer', description: 'Try wooden hand-block printing your own scarf with natural indigo dyes.', estimatedCost: '₹500 / person', duration: '2 hours' }
    ],
    shopping: [
      { market: 'Johari Bazaar & Bapu Bazaar', items: 'Jaipuri quilts (rajai), Kundan jewelry, mojari leather shoes, blue pottery', tips: 'Always bargain politely in Bapu Bazaar for textiles.' }
    ],
    weather: {
      temperature: '24°C - 30°C (Day) / 14°C (Night)',
      condition: 'Sunny & Crisp',
      conditionDescription: 'Pleasant dry weather with cool evenings and golden desert sunlight.',
      rainPossibility: '5%',
      humidity: '35%',
      bestTimeToVisit: 'October to March',
      travelTips: [
        'Buy the Composite Entry Ticket (₹300 for Indians) covering Amer, Hawa Mahal, Jantar Mantar, Nahargarh and Albert Hall to save 40% on tickets.',
        'Start fort visits before 9:30 AM to beat tour buses.'
      ]
    },
    sampleItineraryIdeas: [
      { title: 'Royal Forts & Palaces', activities: ['Amer Fort & Sheesh Mahal', 'Jaigarh & Nahargarh Sunset', 'Jal Mahal photo stop'] },
      { title: 'Pink City Bazaars & Heritage', activities: ['Hawa Mahal sunrise', 'City Palace & Jantar Mantar', 'Bapu Bazaar shopping', 'Lassiwala'] },
      { title: 'Culture & Village Life', activities: ['Albert Hall Museum', 'Patrika Gate photo shoot', 'Chokhi Dhani Cultural Village'] }
    ]
  },

  araku: {
    name: 'Araku Valley',
    tagline: 'Misty Coffee Plantations, Ancient Caves & Tribal Cascades',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80',
    vibe: 'Eco-friendly, untouched, budget-friendly and lush',
    idealSeason: 'September to March',
    type: 'hill',
    avgBaseCostPerDayPerPerson: 1100,
    places: [
      {
        id: 'a1',
        name: 'Borra Caves',
        description: 'Million-year-old limestone karst caves illuminated with vibrant colored lights, holding dramatic stalactites and stalagmites.',
        distance: '35 km from Araku',
        entryFee: '₹80 for Adults, ₹25 Camera',
        openingHours: '10:00 AM – 5:00 PM',
        recommendedTime: '11:00 AM – 1:30 PM',
        thingsToDo: ['Marvel at Shiva Lingam formation', 'Walk underground boardwalk', 'Explore Gosthani river gorge'],
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        category: 'Geological Wonder'
      },
      {
        id: 'a2',
        name: 'Araku Coffee Plantations & Museum',
        description: 'Vast slopes of organic Arabica coffee beans cultivated by indigenous tribal farmers, with coffee tasting bars.',
        distance: 'Town Center',
        entryFee: '₹20 (Museum)',
        openingHours: '9:00 AM – 7:00 PM',
        recommendedTime: '3:00 PM – 5:00 PM',
        thingsToDo: ['Sample freshly brewed Araku espresso', 'Coffee processing demo', 'Buy organic coffee and chocolates'],
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
        category: 'Agritourism & Tasting'
      },
      {
        id: 'a3',
        name: 'Katiki Waterfalls',
        description: 'Spectacular 50-foot cascading mountain fall accessed through an exciting rugged 4x4 jeep trail and bamboo grove.',
        distance: '4 km from Borra Caves',
        entryFee: 'Jeep ride: ₹250/person split',
        openingHours: '6:00 AM – 6:00 PM',
        recommendedTime: 'Morning or Early Afternoon',
        thingsToDo: ['Jeep jungle offroading', 'Natural cold shower', 'Bamboo chicken tasting at base'],
        image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=80',
        category: 'Waterfalls & Trek'
      },
      {
        id: 'a4',
        name: 'Chaparai Water Cascades',
        description: 'A wide smooth sloping rock bed with gentle natural streams where travelers can safely wade and picnic.',
        distance: '15 km from Araku',
        entryFee: '₹10 / person',
        openingHours: '8:00 AM – 5:30 PM',
        recommendedTime: '12:00 PM – 2:30 PM',
        thingsToDo: ['Water wading', 'Picnic on smooth boulders', 'Eat freshly roasted corn'],
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
        category: 'Scenic Picnic'
      }
    ],
    foods: [
      { name: 'Bongu Chicken (Bamboo Chicken)', description: 'Tender chicken marinated in crushed local hill spices stuffed inside raw green bamboo culm and fire-roasted without oil or water.', approxCost: '₹180 - ₹250', bestPlaces: 'Roadside stalls near Borra Caves & Chaparai' },
      { name: 'Araku Organic Tribal Coffee', description: 'World-renowned shade-grown single-origin arabica coffee with mild citrus and chocolate notes.', approxCost: '₹50 - ₹90 / cup', bestPlaces: 'Araku Coffee Museum Cafe' },
      { name: 'Madugula Halwa', description: 'Historic century-old wheat milk ghee halwa made near the foothills.', approxCost: '₹100 / box', bestPlaces: 'Local town sweet shops' }
    ],
    foodAreas: ['Coffee Museum Road', 'Borra Caves tribal food shacks', 'Araku Bus Stand market'],
    experiences: [
      { title: 'Vistadome Glass-Dome Train Ride from Vizag to Araku', description: 'Scenic railway journey through 58 tunnels and 84 bridges over mountain gorges with transparent roof views.', estimatedCost: '₹670 / seat in Vistadome', duration: '3.5 hours' },
      { title: 'Dhimsa Tribal Folk Dance at Padmapuram Gardens', description: 'Watch local tribal dancers in traditional costumes and join the circle.', estimatedCost: '₹30 - ₹50', duration: '1 hour' }
    ],
    shopping: [
      { market: 'Tribal Cooperative (GIRIDJAN) Store', items: 'Organic Araku coffee powder, pure wild honey, handmade soaps, bamboo crafts', tips: 'Government certified prices—best value in the valley.' }
    ],
    weather: {
      temperature: '18°C - 26°C (Pleasant day) / 12°C (Chilly night)',
      condition: 'Misty & Refreshing',
      conditionDescription: 'Cool mountain air with morning mist hovering over green coffee hills.',
      rainPossibility: '10%',
      humidity: '60%',
      bestTimeToVisit: 'September to March',
      travelTips: [
        'Take the early morning 6:45 AM train (Vistadome) from Visakhapatnam for the ultimate cinematic tunnel journey.',
        'Very budget friendly: group bamboo chicken, guesthouses, and auto rides are extremely affordable.'
      ]
    },
    sampleItineraryIdeas: [
      { title: 'Vistadome Arrival & Borra Caves', activities: ['Vizag to Borra train ride', 'Borra Caves exploration', 'Katiki Waterfall off-road ride'] },
      { title: 'Coffee Aromas & Valley Cascades', activities: ['Araku Coffee Museum', 'Padmapuram Gardens', 'Chaparai Water Cascade picnic'] },
      { title: 'Tribal Heritage & Return', activities: ['Tribal Museum', 'Coffee estate walk', 'Scenic drive return to Vizag'] }
    ]
  },

  pondicherry: {
    name: 'Pondicherry (Puducherry)',
    tagline: 'French Boulevards, Mustard Mansions, Bohemian Cafes & Coastal Peace',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80',
    vibe: 'Franco-Tamil fusion, seaside tranquility, spiritual and chic',
    idealSeason: 'October to March',
    type: 'beach',
    avgBaseCostPerDayPerPerson: 1500,
    places: [
      {
        id: 'po1',
        name: 'White Town (French Quarter)',
        description: 'Vibrant colonial neighborhood with pastel yellow and pink villas, bougainvillea blooms, and quaint French bakeries.',
        distance: 'Town Center',
        entryFee: 'Free',
        openingHours: 'Open 24 hours (Boutiques 10 AM - 8 PM)',
        recommendedTime: 'Early morning or 4:30 PM on foot/bicycle',
        thingsToDo: ['Heritage cycling', 'Architecture photography', 'Art galleries', 'French cafe hopping'],
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        category: 'Heritage & Lifestyle'
      },
      {
        id: 'po2',
        name: 'Promenade Beach (Rock Beach)',
        description: '1.5-km pedestrian-only seaside promenade bordered by the Gandhi statue, French war memorial, and sea breeze.',
        distance: 'Walking distance from White Town',
        entryFee: 'Free',
        openingHours: 'Vehicle-free from 6 PM to 7:30 AM',
        recommendedTime: '5:30 AM (Sunrise) or 6:30 PM (Evening stroll)',
        thingsToDo: ['Watch sunrise over Bay of Bengal', 'Evening gelato walk', 'Visit Le Cafe on the rocks'],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        category: 'Coastal Promenade'
      },
      {
        id: 'po3',
        name: 'Auroville & Matrimandir',
        description: 'Experimental universal township with the famous golden geodesic globe surrounded by peaceful meditation parks.',
        distance: '12 km north of town',
        entryFee: 'Free (Inner Chamber requires 2-day advance online pass)',
        openingHours: '9:00 AM – 5:30 PM (Sun till 1 PM)',
        recommendedTime: '9:00 AM – 1:00 PM',
        thingsToDo: ['View Golden Matrimandir Sphere', 'Auroville Visitors Centre', 'Shop handmade incense and spiral candles'],
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
        category: 'Spiritual Community'
      },
      {
        id: 'po4',
        name: 'Paradise Beach (Chunnambar Boat House)',
        description: 'Pristine golden sand spit separated by backwaters, reached via a delightful 15-minute ferry boat cruise.',
        distance: '8 km south of Pondicherry',
        entryFee: 'Ferry ticket: ₹350 / person',
        openingHours: '9:00 AM – 5:00 PM',
        recommendedTime: '10:00 AM – 2:00 PM',
        thingsToDo: ['Backwater ferry ride', 'Beach volleyball', 'Swimming in designated zones', 'Tender coconut by shacks'],
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        category: 'Beach & Watersports'
      }
    ],
    foods: [
      { name: 'Fresh French Croissants & Baguettes', description: 'Flaky butter croissants baked fresh in wood-fired ovens.', approxCost: '₹90 - ₹160', bestPlaces: 'Baker Street, Cafe des Arts, Coromandel Cafe' },
      { name: 'Crepes & Quiches', description: 'Savory buckwheat galettes and sweet Nutella strawberry crepes.', approxCost: '₹180 - ₹320', bestPlaces: 'Crepe in Touch, Cafe des Arts' },
      { name: 'Franco-Tamil Seafood Thali', description: 'Fresh tiger prawns and meen kuzhambu cooked with French wine and southern spices.', approxCost: '₹220 - ₹400', bestPlaces: 'Maison Perumal, Surguru' }
    ],
    foodAreas: ['White Town Romain Rolland St', 'Mission Street', 'Goubert Avenue seafront'],
    experiences: [
      { title: 'Rent a Pastel Vintage Bicycle', description: 'Pedal through the quiet cobblestone alleys of White Town under bougainvillea canopies.', estimatedCost: '₹100 - ₹150 / day', duration: 'Full day' },
      { title: 'Surfing Lesson at Serenity Beach', description: '1.5-hour beginner surf lesson with certified wave riders.', estimatedCost: '₹1,200 / person', duration: '2 hours' }
    ],
    shopping: [
      { market: 'Mission Street & Casablanca', items: 'Auroville aromatherapy oils, handmade marbled paper, pottery, organic linen wear', tips: 'Casablanca offers lovely fixed-price local designer wear.' }
    ],
    weather: {
      temperature: '26°C - 31°C',
      condition: 'Tropical Coastal Breeze',
      conditionDescription: 'Sunny coastal weather with refreshing afternoon ocean winds.',
      rainPossibility: '15%',
      humidity: '72%',
      bestTimeToVisit: 'October to March',
      travelTips: [
        'Explore White Town on foot or bicycle—narrow streets have very limited parking for cars.',
        'Rock Beach is closed to all vehicular traffic in the evenings, making it peaceful for walks.'
      ]
    },
    sampleItineraryIdeas: [
      { title: 'White Town French Charm', activities: ['Bicycle tour of French Quarter', 'Sri Aurobindo Ashram', 'Sunset at Promenade Rock Beach', 'Baker Street treats'] },
      { title: 'Golden Matrimandir & Serenity', activities: ['Auroville exploration', 'Matrimandir viewpoint', 'Serenity Beach surfing', 'Coromandel Cafe dinner'] },
      { title: 'Ferry to Paradise Island', activities: ['Chunnambar boat cruise', 'Paradise beach day', 'Mission street souvenir shopping'] }
    ]
  },

  hyderabad: {
    name: 'Hyderabad',
    tagline: 'City of Nizams, Royal Fortresses & Fragrant Biryani Heritage',
    heroImage: 'https://images.unsplash.com/photo-1605807914041-3bb7c0415306?auto=format&fit=crop&w=1600&q=80',
    vibe: 'Historic, grand, foodie-paradise, high-tech meets old-world',
    idealSeason: 'October to February',
    type: 'heritage',
    avgBaseCostPerDayPerPerson: 1300,
    places: [
      {
        id: 'h1',
        name: 'Golconda Fort',
        description: 'Imposing fortress complex famed for ingenious acoustic architecture, royal palaces, and ancient diamond vaults.',
        distance: '11 km from Center',
        entryFee: '₹25 for Indians, ₹300 for Foreigners',
        openingHours: '9:00 AM – 5:30 PM (Sound & Light 6:30 PM)',
        recommendedTime: '3:30 PM – 6:30 PM (Catch sunset & light show)',
        thingsToDo: ['Acoustic clap test at Fateh Darwaza', 'Trek to highest Baradari bastion', 'Watch evening sound & light show'],
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        category: 'Fortress & Acoustics'
      },
      {
        id: 'h2',
        name: 'Charminar & Laad Bazaar',
        description: '1591 monument with four towering minarets standing at the historic crossroads, surrounded by sparkling bangle shops.',
        distance: 'Old City Center',
        entryFee: '₹25 for Indians',
        openingHours: '9:30 AM – 5:30 PM (Bazaars open till 11 PM)',
        recommendedTime: '4:00 PM – 9:00 PM',
        thingsToDo: ['Climb first level minaret view', 'Shop lacquer bangles & pearls', 'Nimrah Cafe Irani chai & Osmania biscuits'],
        image: 'https://images.unsplash.com/photo-1605807914041-3bb7c0415306?auto=format&fit=crop&w=800&q=80',
        category: 'Iconic Heritage'
      },
      {
        id: 'h3',
        name: 'Chowmahalla Palace',
        description: 'Opulent seat of the Asaf Jahi dynasty featuring grand Durbar halls, 1912 Rolls Royce, and crystal chandeliers.',
        distance: '1 km from Charminar',
        entryFee: '₹100 for Indians',
        openingHours: '10:00 AM – 5:00 PM (Closed Fridays)',
        recommendedTime: '11:00 AM – 2:00 PM',
        thingsToDo: ['Grand Khilwat Durbar Hall', 'Vintage royal car collection', 'Palace gardens walk'],
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        category: 'Palatial Royalty'
      },
      {
        id: 'h4',
        name: 'Hussain Sagar Lake & Buddha Statue',
        description: 'Heart-shaped historic lake featuring a monolithic 18-meter granite Buddha statue installed on Gibraltar Rock.',
        distance: 'Center of Twin Cities',
        entryFee: 'Boat ride: ₹80 - ₹120',
        openingHours: '8:00 AM – 10:00 PM',
        recommendedTime: '5:30 PM – 7:30 PM',
        thingsToDo: ['Speedboat to Buddha statue', 'Lumbini Park laser show', 'Stroll along Necklace Road'],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        category: 'Scenic & Lake'
      }
    ],
    foods: [
      { name: 'Hyderabadi Dum Biryani', description: 'Fragrant basmati rice slow-cooked on dum with saffron, marinated tender goat or chicken, served with mirchi ka salan and dahi chutney.', approxCost: '₹220 - ₹380', bestPlaces: 'Bawarchi (RTC X Roads), Shadab, Cafe Bahar, Paradise' },
      { name: 'Irani Chai with Osmania Biscuits', description: 'Sweet, rich condensed milk tea paired with traditional savory-sweet crumbly butter biscuits.', approxCost: '₹30 - ₹50', bestPlaces: 'Nimrah Cafe (facing Charminar), Niloufer Cafe' },
      { name: 'Double Ka Meetha & Qubani Ka Meetha', description: 'Classic royal Nizam desserts made of fried bread soaked in saffron milk or stewed apricots topped with malai.', approxCost: '₹90 - ₹150', bestPlaces: 'Shadab, Pista House' },
      { name: 'Haleem (Seasonal/Available in specialty restaurants)', description: 'Slow-cooked stew of pounded meat, lentils, wheat, and pure ghee.', approxCost: '₹180 - ₹280', bestPlaces: 'Pista House, Cafe 555' }
    ],
    foodAreas: ['Old City Charminar', 'RTC X Roads', 'Banjara Hills / Jubilee Hills'],
    experiences: [
      { title: 'Sunset from Golconda Baradari', description: 'Watch the sun dip behind the ancient ramparts while evening lights illuminate Hyderabad.', estimatedCost: '₹25', duration: '2 hours' },
      { title: 'Ramoji Film City Day Tour', description: 'World\'s largest film studio complex with Hollywood & Bollywood sets and live stunts.', estimatedCost: '₹1,350 / adult', duration: 'Full day' }
    ],
    shopping: [
      { market: 'Laad Bazaar & Begum Bazaar', items: 'Lacquer bangles, Hyderabad freshwater pearls, ittar perfumes, Bidriware metal crafts', tips: 'Always ask for pearl authenticity certificate for valuable jewelry.' }
    ],
    weather: {
      temperature: '24°C - 31°C (Pleasant winter/autumn)',
      condition: 'Sunny & Dry',
      conditionDescription: 'Warm daytime with dry breezy evenings.',
      rainPossibility: '5%',
      humidity: '40%',
      bestTimeToVisit: 'October to February',
      travelTips: [
        'Use Hyderabad Metro for quick transfers between Secunderabad, Ameerpet, and Hitec City to avoid traffic.',
        'Extremely budget friendly: world-class heritage and famous food cost a fraction of other tier-1 cities.'
      ]
    },
    sampleItineraryIdeas: [
      { title: 'The Nizami Royalty Trail', activities: ['Golconda Fort climbing & acoustics', 'Qutb Shahi Tombs', 'Evening Biryani feast at Bawarchi'] },
      { title: 'Old City Colors & Charminar', activities: ['Chowmahalla Palace', 'Charminar & Laad Bazaar shopping', 'Nimrah Cafe Irani Chai'] },
      { title: 'Lakes & Modern Vibes', activities: ['Hussain Sagar boat ride', 'Buddha Statue', 'Birla Mandir marble temple', 'Jubilee Hills nightlife'] }
    ]
  },

  bengaluru: {
    name: 'Bengaluru (Bangalore)',
    tagline: 'The Garden City of Lush Parks, Craft Breweries & Tech Cafes',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80',
    vibe: 'Pleasant, cosmopolitan, green, youthful brewery culture',
    idealSeason: 'September to March',
    type: 'metro',
    avgBaseCostPerDayPerPerson: 1600,
    places: [
      {
        id: 'b1',
        name: 'Lalbagh Botanical Gardens',
        description: '240-acre historic garden commissioned by Hyder Ali, housing century-old trees and the famous London-inspired Glass House.',
        distance: 'South Bengaluru Center',
        entryFee: '₹30 for Adults',
        openingHours: '6:00 AM – 7:00 PM',
        recommendedTime: '6:30 AM – 9:30 AM (Morning stroll)',
        thingsToDo: ['Glass House visit', 'Lalbagh lake walk', 'Bonsai garden exploration', 'Kempegowda rock view'],
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
        category: 'Gardens & Flora'
      },
      {
        id: 'b2',
        name: 'Bangalore Palace',
        description: '19th-century Tudor-style royal palace featuring fortified towers, wooden carvings, and Tudor architectural grandeur.',
        distance: 'Vasanth Nagar',
        entryFee: '₹250 for Indians, ₹480 for Foreigners',
        openingHours: '10:00 AM – 5:30 PM',
        recommendedTime: '11:00 AM – 2:00 PM',
        thingsToDo: ['Audio tour of royal quarters', 'Maharaja coat of arms gallery', 'Sprawling palace grounds walk'],
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        category: 'Royal Palace'
      },
      {
        id: 'b3',
        name: 'Cubbon Park & Vidhana Soudha',
        description: '300-acre green lung in the heart of the metropolis, facing the grand Neo-Dravidian state legislature palace.',
        distance: 'Central Bengaluru',
        entryFee: 'Free',
        openingHours: '6:00 AM – 6:00 PM',
        recommendedTime: '4:00 PM – 6:30 PM',
        thingsToDo: ['Bamboo groves walk', 'Photography of lit-up Vidhana Soudha', 'Visit nearby State Central Library'],
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        category: 'City Park & Architecture'
      },
      {
        id: 'b4',
        name: 'Indiranagar & Koramangala Craft Breweries',
        description: 'Vibrant neighborhood streets famous for Asia’s most celebrated microbreweries, indie music, and quirky cafes.',
        distance: 'East / South East Bengaluru',
        entryFee: 'Free to enter cafes',
        openingHours: '12:00 PM – 11:30 PM',
        recommendedTime: '6:00 PM onwards',
        thingsToDo: ['Try craft mango witbier / IPA samplers', 'Indie live music', 'Bookstore cafe browsing'],
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
        category: 'Nightlife & Cafes'
      }
    ],
    foods: [
      { name: 'Crispy Benne Masala Dosa', description: 'Golden, butter-crisped fermented rice crepe filled with spiced mashed potato and coconut chutney.', approxCost: '₹80 - ₹130', bestPlaces: 'CTR (Shri Sagar), Vidyarthi Bhavan, Taaza Thindi' },
      { name: 'Filter Kaapi (South Indian Coffee)', description: 'Frothed chicory-blended decoction coffee poured in traditional stainless steel dabarah.', approxCost: '₹30 - ₹50', bestPlaces: 'Brahmin\'s Coffee Bar, Hatti Kaapi' },
      { name: 'Mangalorean Ghee Roast Prawns / Paneer', description: 'Succulent morsels roasted in homemade clarified butter and fiery red Byadgi chillies.', approxCost: '₹320 - ₹480', bestPlaces: 'Kudla, Maravanthe, Coast To Coast' }
    ],
    foodAreas: ['VV Puram Food Street', 'Indiranagar 100ft Road', 'Malleswaram Heritage Eateries'],
    experiences: [
      { title: 'VV Puram Thindi Beedi (Food Street) Safari', description: 'Evening vegetarian culinary crawl with Congress bun, paddus, and dahi puri.', estimatedCost: '₹200 - ₹300', duration: '2 hours' },
      { title: 'Microbrewery Beer Tasting Flight', description: 'Sample fresh wheat, stout, and cider brews crafted on-site.', estimatedCost: '₹600 / person', duration: '2.5 hours' }
    ],
    shopping: [
      { market: 'Commercial Street & Brigade Road', items: 'Mysore silk sarees, sandalwood carvings, electronics, trendy fashion', tips: 'Check Cauvery Government Arts & Crafts Emporium for genuine sandalwood.' }
    ],
    weather: {
      temperature: '20°C - 28°C',
      condition: 'Pleasant & Breezy',
      conditionDescription: 'Famously comfortable year-round climate with cool morning and evening breezes.',
      rainPossibility: '20%',
      humidity: '55%',
      bestTimeToVisit: 'September to March',
      travelTips: [
        'Utilize Namma Metro to glide past traffic between Majestic, MG Road, Indiranagar and Whitefield.',
        'Start mornings early at Lalbagh or Cubbon Park when the air is crispest.'
      ]
    },
    sampleItineraryIdeas: [
      { title: 'Gardens & South Indian Flavors', activities: ['Lalbagh morning walk', 'CTR Benne Dosa breakfast', 'Bangalore Palace', 'Vidhana Soudha evening'] },
      { title: 'Tech, Art & Microbreweries', activities: ['Cubbon Park stroll', 'National Gallery of Modern Art', 'Indiranagar craft brewery tour'] },
      { title: 'Day Excursion to Nandi Hills', activities: ['Sunrise at Nandi Hills', 'Chola period Bhoga Nandeeshwara temple', 'VV Puram street food feast'] }
    ]
  }
};

// Fallback generator for any custom destination entered by user
function generateDynamicDestinationData(destinationName: string, budget: number, travelers: number): DestinationData {
  const cleanName = destinationName.trim();
  const lower = cleanName.toLowerCase();

  // Check matching in predefined DB
  for (const key of Object.keys(DESTINATION_DATABASE)) {
    if (lower.includes(key) || key.includes(lower)) {
      return DESTINATION_DATABASE[key];
    }
  }

  // Generic dynamic fallback
  return {
    name: cleanName,
    tagline: `Discover the captivating sights, vibrant culture & local flavors of ${cleanName}`,
    heroImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80',
    vibe: 'Scenic, culturally rich and inviting',
    idealSeason: 'September to April (Pleasant travel weather)',
    type: 'nature',
    avgBaseCostPerDayPerPerson: Math.max(1200, Math.round(budget / (travelers * 3))),
    places: [
      {
        id: 'dp1',
        name: `${cleanName} Central Landmark & Promenade`,
        description: `The iconic heart of ${cleanName} showcasing landmark architecture, local gathering spaces, and vibrant street life.`,
        distance: 'City Center',
        entryFee: 'Free - ₹100',
        openingHours: '9:00 AM – 7:00 PM',
        recommendedTime: '4:00 PM – 7:00 PM',
        thingsToDo: ['Sightseeing', 'Photography', 'Local shopping', 'Street cafe experience'],
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
        category: 'Landmark'
      },
      {
        id: 'dp2',
        name: `${cleanName} Historic Heritage Quarter`,
        description: `Ancient monuments and timeless alleyways revealing the rich regional heritage, history, and craft traditions.`,
        distance: '3.5 km from Center',
        entryFee: '₹50 - ₹200',
        openingHours: '9:30 AM – 5:30 PM',
        recommendedTime: '10:00 AM – 1:00 PM',
        thingsToDo: ['Heritage walk', 'Architecture photography', 'Museum tour', 'Artisanal crafts'],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        category: 'Historic'
      },
      {
        id: 'dp3',
        name: `${cleanName} Panoramic Viewpoint`,
        description: `Scenic high elevation overlook offering sweeping 360-degree vistas of the city skyline, surrounding hills, and sunset.`,
        distance: '7 km from Center',
        entryFee: 'Free',
        openingHours: '6:00 AM – 8:00 PM',
        recommendedTime: '5:00 PM – 6:45 PM',
        thingsToDo: ['Sunset viewing', 'Landscape photography', 'Tea/coffee stalls'],
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
        category: 'Scenic View'
      },
      {
        id: 'dp4',
        name: `${cleanName} Traditional Bazaar & Market`,
        description: `Bustling local marketplace brimming with regional textiles, authentic street food delicacies, spices, and handmade souvenirs.`,
        distance: 'Downtown',
        entryFee: 'Free',
        openingHours: '10:00 AM – 9:30 PM',
        recommendedTime: '5:00 PM – 8:30 PM',
        thingsToDo: ['Bargain shopping', 'Street food tasting', 'People watching'],
        image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80',
        category: 'Market & Culture'
      }
    ],
    foods: [
      { name: `Special ${cleanName} Regional Platter`, description: 'Signature traditional platter featuring slow-cooked regional gravies, local breads, and freshly spiced accompaniments.', approxCost: '₹180 - ₹320', bestPlaces: 'Old Town Heritage Restaurants' },
      { name: 'Local Sweet Delicacy', description: 'Famous traditional sweet confectionery crafted from milk, dry fruits, and regional spices.', approxCost: '₹80 - ₹150', bestPlaces: 'Central Market Confectionery' },
      { name: 'Street Food Specialty', description: 'Crispy savoury street snack served with tangy mint and tamarind chutneys.', approxCost: '₹40 - ₹80', bestPlaces: 'Bazaar Food Stalls' }
    ],
    foodAreas: ['Main Bazaar Lane', 'Heritage Quarter', 'Station Road Food Stalls'],
    experiences: [
      { title: `Guided Heritage Walk of ${cleanName}`, description: 'Learn fascinating folklore, royal history, and secret architectural gems from a local guide.', estimatedCost: '₹350 / person', duration: '2.5 hours' },
      { title: 'Local Artisan Workshop', description: 'Observe master artisans create authentic regional handicrafts and try your hand at crafting.', estimatedCost: '₹200 / person', duration: '1.5 hours' }
    ],
    shopping: [
      { market: `${cleanName} Central Bazaar`, items: 'Handmade crafts, regional spices, indigenous textiles, local dry fruits', tips: 'Friendly bargaining is welcomed in informal market lanes.' }
    ],
    weather: {
      temperature: '22°C - 29°C',
      condition: 'Sunny & Pleasant',
      conditionDescription: 'Comfortable weather with clear daytime skies and pleasant evenings.',
      rainPossibility: '12%',
      humidity: '52%',
      bestTimeToVisit: 'October to March',
      travelTips: [
        'Carry a light jacket for breezy evenings and comfortable walking sneakers.',
        'Keep digital copies of tickets and small denomination currency for local transit.'
      ]
    },
    sampleItineraryIdeas: [
      { title: 'Iconic Landmarks & Heritage', activities: [`${cleanName} Central Landmark`, 'Heritage Quarter tour', 'Traditional dinner'] },
      { title: 'Nature, Views & Local Markets', activities: ['Panoramic Viewpoint', 'Local Artisan Workshop', 'Central Bazaar food safari'] }
    ]
  };
}

// Generate realistic travel options comparison
function generateTravelOptions(from: string, to: string, travelers: number, preference: string): TravelOption[] {
  // Approximate base distance estimation based on city length
  const approxDistanceKm = 650; // standard intercity benchmark

  // Bus calculation
  const busCostPerPerson = Math.round(750 + Math.random() * 300);
  const busTotal = busCostPerPerson * travelers;

  // Train calculation
  const trainCostPerPerson = Math.round(550 + Math.random() * 400);
  const trainTotal = trainCostPerPerson * travelers;

  // Flight calculation
  const flightCostPerPerson = Math.round(3400 + Math.random() * 1200);
  const flightTotal = flightCostPerPerson * travelers;

  // Car calculation (fuel + toll + rental split)
  const carRentalPerTrip = Math.round(5800 + Math.random() * 1400);
  const carCostPerPerson = Math.round(carRentalPerTrip / travelers);

  const options: TravelOption[] = [
    {
      mode: 'Train',
      icon: '🚆',
      title: `Express Train (${from} ➔ ${to})`,
      approxCost: trainTotal,
      approxCostPerPerson: trainCostPerPerson,
      duration: '11 - 14 hrs (Overnight Sleeper/3AC)',
      distance: `~${approxDistanceKm} km`,
      convenience: 'Budget Best',
      convenienceRating: 4.4,
      pros: ['Saves one night of hotel stay with overnight berths', 'Extremely economical for groups', 'Comfortable stretching room & luggage space'],
      cons: ['Requires advance IRCTC booking for confirmed berths'],
      isRecommended: preference === 'Train' || preference === 'Bus'
    },
    {
      mode: 'Bus',
      icon: '🚌',
      title: `AC Sleeper Volvo Bus (${from} ➔ ${to})`,
      approxCost: busTotal,
      approxCostPerPerson: busCostPerPerson,
      duration: '12 - 15 hrs',
      distance: `~${approxDistanceKm} km`,
      convenience: 'Moderate',
      convenienceRating: 3.9,
      pros: ['High frequency of evening departures', 'Direct drop-off at popular tourist stops', 'Easy last-minute ticket availability'],
      cons: ['Can feel bumpy on hilly stretches', 'Limited restroom stops compared to train'],
      isRecommended: preference === 'Bus'
    },
    {
      mode: 'Flight',
      icon: '✈️',
      title: `Direct / 1-Stop Flight (${from} ➔ ${to})`,
      approxCost: flightTotal,
      approxCostPerPerson: flightCostPerPerson,
      duration: '1 hr 45 min (Total 4 hrs with airport)',
      distance: `~${Math.round(approxDistanceKm * 0.8)} km (Air)`,
      convenience: 'Fastest',
      convenienceRating: 4.8,
      pros: ['Saves maximum vacation time', 'Highest comfort and speed', 'Ideal for short 2-3 day getaways'],
      cons: ['Higher cost eats into activity/hotel budget', 'Baggage restrictions'],
      isRecommended: preference === 'Flight'
    },
    {
      mode: 'Car',
      icon: '🚗',
      title: `Self-Drive / Outstation Cab Rental`,
      approxCost: carRentalPerTrip,
      approxCostPerPerson: carCostPerPerson,
      duration: '10 - 13 hrs driving',
      distance: `~${approxDistanceKm} km via Highway`,
      convenience: 'High',
      convenienceRating: 4.2,
      pros: ['Complete freedom of schedule & scenic pitstops', 'Cost-effective when split among 4-6 travelers', 'Car stays with you for local sightseeing'],
      cons: ['Driver fatigue on long highway stretches', 'Toll charges & parking hassles in crowded tourist areas'],
      isRecommended: preference === 'Car'
    }
  ];

  return options;
}

// Generate smart alternative destinations
function getSmartAlternatives(currentDest: string, budget: number, travelers: number): AlternativeDestination[] {
  const alternativesList: AlternativeDestination[] = [
    {
      id: 'alt-araku',
      destination: 'Araku Valley',
      stateOrCountry: 'Andhra Pradesh, India',
      estimatedTotalCost: Math.min(budget, Math.round(travelers * 1800 * 2.5)),
      costPerPerson: Math.round(1800 * 2.5),
      whyItFits: 'Inexpensive scenic train ride, ultra-cheap tribal homestays, and free waterfall hikes make it 50% cheaper than coastal spots.',
      highlight: 'Million-year-old Borra Caves, misty coffee gardens & bamboo chicken feasts.',
      idealDays: 3,
      savings: Math.max(2500, Math.round(budget * 0.25)),
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'alt-hyderabad',
      destination: 'Hyderabad',
      stateOrCountry: 'Telangana, India',
      estimatedTotalCost: Math.min(budget, Math.round(travelers * 1600 * 2.5)),
      costPerPerson: Math.round(1600 * 2.5),
      whyItFits: 'Massive world-class monuments have nominal entry fees (₹25), world-famous biryanis cost only ₹250, and budget hotel density is high.',
      highlight: 'Acoustic Golconda fort, evening boat on Hussain Sagar & midnight Charminar bazaar.',
      idealDays: 3,
      savings: Math.max(3000, Math.round(budget * 0.3)),
      image: 'https://images.unsplash.com/photo-1605807914041-3bb7c0415306?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'alt-pondicherry',
      destination: 'Pondicherry',
      stateOrCountry: 'Tamil Nadu / UT, India',
      estimatedTotalCost: Math.min(budget, Math.round(travelers * 2200 * 2.5)),
      costPerPerson: Math.round(2200 * 2.5),
      whyItFits: 'Coastal charm without exorbitant beach taxi rates—renting bicycles for ₹100/day covers the entire French quarter and promenade.',
      highlight: 'French colonial streets, peaceful Rock Beach, Matrimandir & quaint bohemian bakeries.',
      idealDays: 3,
      savings: Math.max(2000, Math.round(budget * 0.2)),
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'alt-bengaluru',
      destination: 'Bengaluru',
      stateOrCountry: 'Karnataka, India',
      estimatedTotalCost: Math.min(budget, Math.round(travelers * 2000 * 2.5)),
      costPerPerson: Math.round(2000 * 2.5),
      whyItFits: 'Efficient Namma Metro makes transport cheap, iconic parks cost just ₹30, and famous dosa spots are under ₹100.',
      highlight: 'Lalbagh botanical glass house, Bangalore Palace, and thriving indie cafe street culture.',
      idealDays: 3,
      savings: Math.max(2200, Math.round(budget * 0.22)),
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Filter out if user already typed one of these
  return alternativesList.filter(
    a => !a.destination.toLowerCase().includes(currentDest.toLowerCase())
  );
}

// Generate smart customized packing list
function generatePackingList(destType: string, days: number, destName: string): ChecklistItem[] {
  const baseItems: ChecklistItem[] = [
    { id: 'c1', text: 'Government ID Cards (Aadhaar / Passport / Driving License)', category: 'Documents', checked: true },
    { id: 'c2', text: 'Printed or Offline Saved Hotel & Travel Bookings', category: 'Documents', checked: true },
    { id: 'c3', text: 'Mobile Phone Charger & High-Capacity Power Bank (10,000+ mAh)', category: 'Electronics', checked: true },
    { id: 'c4', text: `${days + 1} Pairs of Comfortable Daily Clothes`, category: 'Clothing', checked: false },
    { id: 'c5', text: 'Comfortable Walking Sneakers / Hiking Shoes', category: 'Clothing', checked: false },
    { id: 'c6', text: 'Water Bottle (Reusable with filter / insulated)', category: 'Essentials', checked: false },
    { id: 'c7', text: 'Personal First-Aid & Emergency Meds (Paracetamol, ORS, band-aids)', category: 'Health & Hygiene', checked: false },
    { id: 'c8', text: 'Emergency Liquid Cash (₹2,000 - ₹5,000 in small bills)', category: 'Essentials', checked: false },
    { id: 'c9', text: 'Sunscreen Lotion (SPF 50+) & Polarized Sunglasses', category: 'Health & Hygiene', checked: false }
  ];

  if (destType === 'beach' || destName.toLowerCase().includes('goa') || destName.toLowerCase().includes('pondicherry')) {
    baseItems.push(
      { id: 'cb1', text: 'Quick-Dry Beach Shorts / Swimwear', category: 'Destination Specific', checked: false },
      { id: 'cb2', text: 'Waterproof Phone Pouch for Watersports', category: 'Destination Specific', checked: false },
      { id: 'cb3', text: 'Flip-flops / Breathable Crocs for sandy shores', category: 'Destination Specific', checked: false },
      { id: 'cb4', text: 'Aloe Vera Gel for Sunburn Relief', category: 'Destination Specific', checked: false }
    );
  } else if (destType === 'hill' || destName.toLowerCase().includes('manali') || destName.toLowerCase().includes('shimla')) {
    baseItems.push(
      { id: 'ch1', text: 'Warm Fleece or Down Puffer Jacket', category: 'Destination Specific', checked: false },
      { id: 'ch2', text: 'Thermal Innerwear (Top & Bottom)', category: 'Destination Specific', checked: false },
      { id: 'ch3', text: 'Woolen Beanie Cap & Gloves', category: 'Destination Specific', checked: false },
      { id: 'ch4', text: 'Lip Balm & Heavy Moisturizer for dry mountain wind', category: 'Destination Specific', checked: false }
    );
  } else {
    baseItems.push(
      { id: 'cg1', text: 'Foldable Umbrella / Rain Poncho', category: 'Destination Specific', checked: false },
      { id: 'cg2', text: 'Mosquito Repellent Cream (Odomos)', category: 'Destination Specific', checked: false }
    );
  }

  return baseItems;
}

// Main logic to calculate trip plan
export function planTripEngine(input: TripInput): FullTripPlan {
  const { from, to, travelers, budget, days, travelPreference } = input;
  const numTravelers = Math.max(1, travelers);
  const numDays = Math.max(1, days);

  const destData = generateDynamicDestinationData(to, budget, numTravelers);
  const travelOptions = generateTravelOptions(from, to, numTravelers, travelPreference);

  // Pick preferred mode
  const preferredOption = travelOptions.find(o => o.mode === travelPreference) || travelOptions[0];
  const totalTransportCost = preferredOption.approxCost;

  // Accommodation estimation (rooms needed: 1 room for 2 travelers)
  const roomsNeeded = Math.ceil(numTravelers / 2);
  const nights = Math.max(1, numDays - 1);

  // 3 accommodation tiers
  const budgetNightly = Math.round(1100 + Math.random() * 300);
  const midNightly = Math.round(2400 + Math.random() * 600);
  const premiumNightly = Math.round(6200 + Math.random() * 1500);

  const accommodations: AccommodationOption[] = [
    {
      tier: 'Budget stay',
      name: `${destData.name} Backpacker Hostel / Guesthouse`,
      pricePerNight: budgetNightly,
      totalStayCost: budgetNightly * roomsNeeded * nights,
      features: ['Air Conditioning & Clean Linen', 'Free High-speed Wi-Fi', 'Common Lounge & Luggage Storage', 'Central Walking Location'],
      bestFor: 'Solo travelers, student groups & budget travelers',
      rating: 4.3,
      isBestValue: budget < 25000
    },
    {
      tier: 'Mid-range stay',
      name: `${destData.name} Boutique Resort & Suites`,
      pricePerNight: midNightly,
      totalStayCost: midNightly * roomsNeeded * nights,
      features: ['Swimming Pool & Garden Patio', 'Complimentary Buffet Breakfast', 'Spacious Balcony Rooms', '24/7 Room Service'],
      bestFor: 'Couples, families & comfort seekers',
      rating: 4.7,
      isBestValue: budget >= 25000 && budget <= 70000
    },
    {
      tier: 'Premium stay',
      name: `Grand Heritage 5-Star Luxury Villa`,
      pricePerNight: premiumNightly,
      totalStayCost: premiumNightly * roomsNeeded * nights,
      features: ['Private Plunge Pool / Spa', 'Fine Dining Restaurant & Bar', 'Concierge & Private Airport Chauffeur', 'Bathtub & Scenic Panoramas'],
      bestFor: 'Luxury holidays, anniversaries & lavish groups',
      rating: 4.9,
      isBestValue: budget > 70000
    }
  ];

  // Pick accommodation tier based on available budget
  let selectedAccommodation = accommodations[0];
  if (budget / (numTravelers * numDays) > 3500) {
    selectedAccommodation = accommodations[1];
  }
  if (budget / (numTravelers * numDays) > 7500) {
    selectedAccommodation = accommodations[2];
  }

  // Food cost estimation
  const foodCostPerPersonPerDay = Math.round(600 + (selectedAccommodation.tier === 'Premium stay' ? 600 : selectedAccommodation.tier === 'Mid-range stay' ? 250 : 0));
  const totalFoodCost = foodCostPerPersonPerDay * numTravelers * numDays;

  // Local transport (scooter/auto/cab)
  const localTransportPerDay = Math.round(350 * numTravelers);
  const totalLocalTransport = localTransportPerDay * numDays;

  // Activities & Entry fees
  const activitiesPerPerson = Math.round(400 * numDays);
  const totalActivitiesCost = activitiesPerPerson * numTravelers;

  // Misc buffer (approx 6%)
  const subtotal = totalTransportCost + selectedAccommodation.totalStayCost + totalFoodCost + totalLocalTransport + totalActivitiesCost;
  const miscCost = Math.round(subtotal * 0.06);

  const totalEstimatedCost = subtotal + miscCost;
  const costPerPerson = Math.round(totalEstimatedCost / numTravelers);

  // Feasibility status determination
  const budgetDiff = budget - totalEstimatedCost;
  const budgetRatio = budget / totalEstimatedCost;

  let feasibilityStatus: 'feasible' | 'warning' | 'exceeded' = 'feasible';
  let statusTitle = '✅ Trip Possible';
  let statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  let message = `Great news! Your budget of ₹${budget.toLocaleString('en-IN')} comfortably covers the estimated cost of ₹${totalEstimatedCost.toLocaleString('en-IN')} for ${numTravelers} travelers.`;
  let feasibilityScore = 95;
  let recommendationTip = `You have an estimated cushion of ₹${Math.max(0, budgetDiff).toLocaleString('en-IN')} for extra souvenir shopping or special dining!`;

  if (budgetRatio < 0.75) {
    feasibilityStatus = 'exceeded';
    statusTitle = '❌ Trip may exceed your budget';
    statusBadge = 'bg-rose-50 text-rose-700 border-rose-200';
    message = `For ${numTravelers} people over ${numDays} days in ${to}, the realistic base expenditure is approx ₹${totalEstimatedCost.toLocaleString('en-IN')} (approx ₹${costPerPerson.toLocaleString('en-IN')} per person). Your budget of ₹${budget.toLocaleString('en-IN')} is short by approx ₹${Math.abs(budgetDiff).toLocaleString('en-IN')}.`;
    feasibilityScore = Math.max(25, Math.round(budgetRatio * 50));
    recommendationTip = `Consider taking an overnight sleeper train instead of flights, sharing dorm rooms/homestays, or check out our smart alternative destinations below that fit your ₹${budget.toLocaleString('en-IN')} budget perfectly!`;
  } else if (budgetRatio < 0.98) {
    feasibilityStatus = 'warning';
    statusTitle = '⚠️ Budget is slightly low';
    statusBadge = 'bg-amber-50 text-amber-800 border-amber-200';
    message = `Your budget of ₹${budget.toLocaleString('en-IN')} is slightly below the estimated ₹${totalEstimatedCost.toLocaleString('en-IN')} (₹${costPerPerson.toLocaleString('en-IN')}/person). The trip is definitely achievable with smart budget optimization!`;
    feasibilityScore = 75;
    recommendationTip = `Opt for budget guesthouses, eat at iconic local street food joints rather than fine-dining resorts, and book train tickets early to keep within budget.`;
  }

  const budgetBreakdown: BudgetBreakdown = {
    transportation: totalTransportCost,
    accommodation: selectedAccommodation.totalStayCost,
    food: totalFoodCost,
    localTransport: totalLocalTransport,
    activities: totalActivitiesCost,
    miscellaneous: miscCost,
    total: totalEstimatedCost,
    percentageUsed: Math.min(100, Math.round((totalEstimatedCost / budget) * 100))
  };

  const feasibility: TripFeasibility = {
    status: feasibilityStatus,
    statusTitle,
    statusBadge,
    message,
    costPerPerson,
    totalEstimatedCost,
    budgetDifference: budgetDiff,
    feasibilityScore,
    recommendationTip
  };

  // Generate detailed Day-Wise Itinerary
  const itinerary: DayItinerary[] = [];
  const placePool = destData.places.length > 0 ? destData.places : [
    {
      id: 'p_def1',
      name: `${destData.name} Landmark`,
      description: 'Historical centerpiece and scenic walkway.',
      distance: 'Center',
      entryFee: '₹50',
      openingHours: '9:00 AM - 6:00 PM',
      recommendedTime: 'Morning',
      thingsToDo: ['Explore', 'Photography'],
      image: destData.heroImage,
      category: 'Sightseeing'
    }
  ];

  for (let d = 1; d <= numDays; d++) {
    const p1 = placePool[(d * 2 - 2) % placePool.length];
    const p2 = placePool[(d * 2 - 1) % placePool.length];

    if (d === 1) {
      itinerary.push({
        dayNumber: 1,
        title: `Day 1: Arrival & Coastal / City Orientation`,
        theme: `Arrival from ${from}, check-in, sunset viewpoint & relaxing evening`,
        activities: [
          {
            timeSlot: 'Morning',
            timeRange: '08:30 AM – 11:30 AM',
            title: `Arrival at ${destData.name} & Hotel Check-in`,
            description: `Arrive via ${preferredOption.title}. Check into ${selectedAccommodation.name}, freshen up, and unpack travel luggage.`,
            location: `${destData.name} Station / Airport to Hotel`,
            costEstimate: 'Included in transport budget',
            tips: 'Request early check-in or leave luggage at reception if rooms are getting ready.'
          },
          {
            timeSlot: 'Afternoon',
            timeRange: '12:30 PM – 03:30 PM',
            title: `Traditional Lunch & Exploration of ${p1.name}`,
            description: `Savor regional delicacies followed by a relaxed visit to ${p1.name}. ${p1.description}`,
            location: p1.distance,
            costEstimate: p1.entryFee,
            tips: 'Wear comfortable walking footwear and keep sunscreen handy.'
          },
          {
            timeSlot: 'Evening',
            timeRange: '04:30 PM – 07:00 PM',
            title: `Golden Hour Sunset at ${p2.name}`,
            description: `Catch the spectacular evening sunset at ${p2.name}. Stroll along the vibrant promenade and soak in the evening atmosphere.`,
            location: p2.distance,
            costEstimate: 'Free',
            tips: 'Arrive 45 minutes prior to sunset for optimal golden hour photos.'
          },
          {
            timeSlot: 'Night',
            timeRange: '08:00 PM – 10:30 PM',
            title: `Welcome Dinner & Local Night Life`,
            description: `Dine at famous local food spots in ${destData.foodAreas[0] || 'the town center'}. Try signature dishes and soak in the live music vibe.`,
            location: destData.foodAreas[0] || 'Central Promenade',
            costEstimate: '₹400 - ₹600 / person',
            tips: 'Reserve popular rooftop tables in advance during peak weekends.'
          }
        ]
      });
    } else if (d === numDays) {
      itinerary.push({
        dayNumber: d,
        title: `Day ${d}: Morning Leisure, Souvenir Shopping & Departure`,
        theme: `Wrapping up memories, bazaar shopping, and return journey to ${from}`,
        activities: [
          {
            timeSlot: 'Morning',
            timeRange: '08:00 AM – 10:30 AM',
            title: 'Leisurely Breakfast & Final Sightseeing',
            description: `Start the day with a relaxed breakfast. Take a quiet morning walk around ${p1.name} or enjoy the hotel pool.`,
            location: 'Hotel & Surroundings',
            costEstimate: 'Included in breakfast',
            tips: 'Keep baggage packed and ready before checking out.'
          },
          {
            timeSlot: 'Afternoon',
            timeRange: '11:30 AM – 03:00 PM',
            title: `Souvenir Shopping at ${destData.shopping[0]?.market || 'Local Bazaars'}`,
            description: `Shop for authentic local souvenirs, artisanal handicrafts, spices, and regional sweets to bring back home.`,
            location: destData.shopping[0]?.market || 'Central Marketplace',
            costEstimate: 'Personal shopping',
            tips: destData.shopping[0]?.tips || 'Check for artisanal certificates on handmade goods.'
          },
          {
            timeSlot: 'Evening',
            timeRange: '04:30 PM – 06:30 PM',
            title: 'Farewell Tea & Boarding Return Journey',
            description: `Enjoy a final cup of local tea or coffee with snacks before heading to the departure terminal for your trip back to ${from}.`,
            location: `Depart to ${from}`,
            costEstimate: 'Included in return transport',
            tips: 'Arrive at transit hub 1.5 - 2 hours prior to scheduled departure.'
          },
          {
            timeSlot: 'Night',
            timeRange: '08:00 PM onwards',
            title: 'Arrival Back Home',
            description: `Safe return to ${from} carrying unforgettable photos, stories, and shared experiences!`,
            location: from,
            costEstimate: '₹0',
            tips: 'Back up trip photos to cloud storage while memories are fresh.'
          }
        ]
      });
    } else {
      itinerary.push({
        dayNumber: d,
        title: `Day ${d}: Deep Exploration of ${p1.name} & ${p2.name}`,
        theme: `Cultural heritage, outdoor adventure, and culinary trail`,
        activities: [
          {
            timeSlot: 'Morning',
            timeRange: '08:30 AM – 12:00 PM',
            title: `Excursion to ${p1.name}`,
            description: `${p1.description} Experience key highlights: ${p1.thingsToDo.slice(0, 3).join(', ')}.`,
            location: p1.distance,
            costEstimate: p1.entryFee,
            tips: p1.recommendedTime
          },
          {
            timeSlot: 'Afternoon',
            timeRange: '12:30 PM – 03:30 PM',
            title: `Regional Specialty Lunch & Relaxed Exploration`,
            description: `Enjoy local lunch at nearby traditional restaurants. Discover hidden artisan corners and local culture.`,
            location: 'Local District',
            costEstimate: '₹350 - ₹500 / person',
            tips: 'Try refreshing natural tender coconut water to stay hydrated.'
          },
          {
            timeSlot: 'Evening',
            timeRange: '04:00 PM – 07:30 PM',
            title: `Adventure & Sightseeing at ${p2.name}`,
            description: `${p2.description} Take part in: ${p2.thingsToDo.slice(0, 2).join(' & ')}.`,
            location: p2.distance,
            costEstimate: p2.entryFee,
            tips: 'Perfect timing for dramatic landscape lighting.'
          },
          {
            timeSlot: 'Night',
            timeRange: '08:00 PM – 10:30 PM',
            title: `Boutique Dinner & Starlit Social`,
            description: `Dine at charming open-air cafes. Review photos from the day with fellow travelers and plan tomorrow's escapades.`,
            location: 'Town Hub',
            costEstimate: '₹400 / person',
            tips: 'Recharge all camera and phone power banks overnight.'
          }
        ]
      });
    }
  }

  const foodAndExperiences: FoodAndExperiences = {
    famousFoods: destData.foods,
    approxFoodCostPerDay: foodCostPerPersonPerDay,
    popularFoodAreas: destData.foodAreas,
    localExperiences: destData.experiences,
    shoppingSuggestions: destData.shopping
  };

  const weather: WeatherInfo = {
    temperature: destData.weather.temperature,
    condition: destData.weather.condition,
    conditionDescription: destData.weather.conditionDescription,
    rainPossibility: destData.weather.rainPossibility,
    humidity: destData.weather.humidity,
    bestTimeToVisit: destData.weather.bestTimeToVisit,
    travelTips: destData.weather.travelTips,
    isEstimated: true
  };

  const smartAlternatives = getSmartAlternatives(to, budget, numTravelers);
  const packingChecklist = generatePackingList(destData.type, numDays, destData.name);

  return {
    id: `trip-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    destinationOverview: {
      name: destData.name,
      tagline: destData.tagline,
      heroImage: destData.heroImage,
      vibe: destData.vibe,
      idealSeason: destData.idealSeason
    },
    feasibility,
    budgetBreakdown,
    travelOptions,
    famousPlaces: destData.places,
    itinerary,
    accommodations,
    foodAndExperiences,
    weather,
    smartAlternatives,
    packingChecklist
  };
}
