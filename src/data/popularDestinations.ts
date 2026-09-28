export interface PopularDestination {
  id: string;
  name: string;
  stateOrCountry: string;
  category: 'Trending' | 'Budget-Friendly' | 'Beach & Coastal' | 'Hills & Nature' | 'Heritage & Culture';
  rating: number;
  reviewsCount: string;
  startingPrice: number;
  idealDays: number;
  bestFor: string;
  image: string;
  tagline: string;
  description: string;
}

export const POPULAR_DESTINATIONS: PopularDestination[] = [
  {
    id: 'goa',
    name: 'Goa',
    stateOrCountry: 'India',
    category: 'Beach & Coastal',
    rating: 4.8,
    reviewsCount: '24.5k',
    startingPrice: 3500,
    idealDays: 4,
    bestFor: 'Beaches, Nightlife & Water Sports',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Sun-kissed beaches, Portuguese heritage & vibrant beach shacks',
    description: 'India\'s premier coastal paradise boasting golden beaches, colonial architecture, vibrant night markets, and thrilling water activities.'
  },
  {
    id: 'manali',
    name: 'Manali',
    stateOrCountry: 'Himachal Pradesh, India',
    category: 'Hills & Nature',
    rating: 4.7,
    reviewsCount: '19.2k',
    startingPrice: 4200,
    idealDays: 5,
    bestFor: 'Snow Valleys, Solang & Rohtang Pass',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Majestic Himalayan peaks, apple orchards and roaring river valleys',
    description: 'A picturesque hill station in Himachal Pradesh nestled by the Beas river, famous for skiing, paragliding, cafes, and mountain trails.'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    stateOrCountry: 'Rajasthan, India',
    category: 'Heritage & Culture',
    rating: 4.9,
    reviewsCount: '31.8k',
    startingPrice: 2800,
    idealDays: 3,
    bestFor: 'Royal Palaces, Forts & Rajasthani Cuisine',
    image: 'https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=1200&q=80',
    tagline: 'The iconic Pink City of royal Maharajas and grand historic bastions',
    description: 'Known worldwide for the Hawa Mahal, Amer Fort, vibrant bazaars filled with handcrafted textiles, gems, and spicy culinary feasts.'
  },
  {
    id: 'araku',
    name: 'Araku Valley',
    stateOrCountry: 'Andhra Pradesh, India',
    category: 'Budget-Friendly',
    rating: 4.6,
    reviewsCount: '8.4k',
    startingPrice: 2100,
    idealDays: 3,
    bestFor: 'Coffee Plantations, Borra Caves & Waterfalls',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Lush Eastern Ghats, tribal heritage & aromatic organic coffee estates',
    description: 'An enchanting hill retreat reachable via scenic train tunnels, featuring ancient million-year-old Borra caves and Katiki cascades.'
  },
  {
    id: 'pondicherry',
    name: 'Pondicherry',
    stateOrCountry: 'Tamil Nadu / UT, India',
    category: 'Trending',
    rating: 4.7,
    reviewsCount: '15.6k',
    startingPrice: 3000,
    idealDays: 3,
    bestFor: 'French Quarter, Promenade Beach & Auroville',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    tagline: 'French colonial boulevards, pastel villas and serene coastal tranquility',
    description: 'Experience quaint French cafes, seaside promenades, cobblestone streets, and the international spiritual township of Auroville.'
  },
  {
    id: 'kerala',
    name: 'Kerala (Munnar & Alleppey)',
    stateOrCountry: 'India',
    category: 'Trending',
    rating: 4.9,
    reviewsCount: '28.1k',
    startingPrice: 4500,
    idealDays: 5,
    bestFor: 'Houseboats, Backwaters & Misty Tea Gardens',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    tagline: 'God\'s Own Country with tranquil emerald backwaters and rolling hills',
    description: 'Cruise along palm-fringed canals on a private houseboat, stroll through misty tea gardens in Munnar, and rejuvenate with Ayurvedic rituals.'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    stateOrCountry: 'Telangana, India',
    category: 'Budget-Friendly',
    rating: 4.8,
    reviewsCount: '22.0k',
    startingPrice: 2400,
    idealDays: 3,
    bestFor: 'Authentic Dum Biryani, Golconda Fort & Pearls',
    image: 'https://images.unsplash.com/photo-1605807914041-3bb7c0415306?auto=format&fit=crop&w=1200&q=80',
    tagline: 'The City of Pearls blending 400-year Nizami heritage with buzzing tech modernism',
    description: 'Home to the iconic Charminar, the historic acoustic marvel Golconda Fort, Ramoji Film City, and world-renowned Hyderabadi culinary crafts.'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    stateOrCountry: 'Karnataka, India',
    category: 'Budget-Friendly',
    rating: 4.6,
    reviewsCount: '16.9k',
    startingPrice: 2600,
    idealDays: 3,
    bestFor: 'Lush Botanical Gardens, Microbreweries & Tech Vibes',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    tagline: 'The Garden City with pleasant weather, buzzing cafe culture & vibrant nightlife',
    description: 'Explore sprawling green spaces like Lalbagh, visit the Tudor-style Bangalore Palace, and enjoy Asia\'s finest craft brewery culture.'
  },
  {
    id: 'leh',
    name: 'Leh Ladakh',
    stateOrCountry: 'Ladakh, India',
    category: 'Trending',
    rating: 4.9,
    reviewsCount: '17.4k',
    startingPrice: 8500,
    idealDays: 6,
    bestFor: 'Pangong Tso, Khardung La & High Passes',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Rugged moonscapes, crystalline azure lakes and ancient Buddhist monasteries',
    description: 'A bucket-list destination for road trips, bike rides over the highest motorable passes, and surreal starlit Himalayan night skies.'
  }
];
