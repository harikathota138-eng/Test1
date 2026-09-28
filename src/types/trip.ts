export type TravelPreference = 'Bus' | 'Train' | 'Flight' | 'Car';

export interface TripInput {
  from: string;
  to: string;
  travelers: number;
  budget: number;
  days: number;
  travelPreference: TravelPreference;
  currency?: string;
}

export type FeasibilityStatus = 'feasible' | 'warning' | 'exceeded';

export interface TripFeasibility {
  status: FeasibilityStatus;
  statusTitle: string;
  statusBadge: string;
  message: string;
  costPerPerson: number;
  totalEstimatedCost: number;
  budgetDifference: number; // positive = under budget (savings), negative = deficit
  feasibilityScore: number; // 0 to 100
  recommendationTip: string;
}

export interface BudgetBreakdown {
  transportation: number;
  accommodation: number;
  food: number;
  localTransport: number;
  activities: number;
  miscellaneous: number;
  total: number;
  percentageUsed: number;
}

export interface TravelOption {
  mode: 'Train' | 'Bus' | 'Flight' | 'Car';
  icon: string;
  title: string;
  approxCost: number;
  approxCostPerPerson: number;
  duration: string;
  distance: string;
  convenience: 'High' | 'Moderate' | 'Budget Best' | 'Fastest';
  convenienceRating: number; // 1-5
  pros: string[];
  cons: string[];
  isRecommended?: boolean;
}

export interface FamousPlace {
  id: string;
  name: string;
  description: string;
  distance: string;
  entryFee: string;
  openingHours: string;
  recommendedTime: string;
  thingsToDo: string[];
  image: string;
  category: string;
}

export interface ItineraryActivity {
  timeSlot: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  timeRange: string;
  title: string;
  description: string;
  location: string;
  costEstimate: string;
  tips?: string;
  iconType?: string;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  theme: string;
  activities: ItineraryActivity[];
}

export interface AccommodationOption {
  tier: 'Budget stay' | 'Mid-range stay' | 'Premium stay';
  name: string;
  pricePerNight: number;
  totalStayCost: number;
  features: string[];
  bestFor: string;
  rating: number;
  isBestValue?: boolean;
}

export interface FoodItem {
  name: string;
  description: string;
  approxCost: string;
  bestPlaces: string;
}

export interface LocalExperience {
  title: string;
  description: string;
  estimatedCost: string;
  duration: string;
}

export interface FoodAndExperiences {
  famousFoods: FoodItem[];
  approxFoodCostPerDay: number;
  popularFoodAreas: string[];
  localExperiences: LocalExperience[];
  shoppingSuggestions: {
    market: string;
    items: string;
    tips: string;
  }[];
}

export interface WeatherInfo {
  temperature: string;
  condition: string;
  conditionDescription: string;
  rainPossibility: string;
  humidity?: string;
  bestTimeToVisit: string;
  travelTips: string[];
  isEstimated: boolean;
}

export interface AlternativeDestination {
  id: string;
  destination: string;
  stateOrCountry: string;
  estimatedTotalCost: number;
  costPerPerson: number;
  whyItFits: string;
  highlight: string;
  idealDays: number;
  savings: number;
  image: string;
}

export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  category: 'Transport' | 'Stay' | 'Food' | 'Activities' | 'Shopping' | 'Other';
  date: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: 'Essentials' | 'Clothing' | 'Electronics' | 'Health & Hygiene' | 'Destination Specific' | 'Documents';
  checked: boolean;
}

export interface FullTripPlan {
  id: string;
  createdAt: string;
  input: TripInput;
  destinationOverview: {
    name: string;
    tagline: string;
    heroImage: string;
    vibe: string;
    idealSeason: string;
  };
  feasibility: TripFeasibility;
  budgetBreakdown: BudgetBreakdown;
  travelOptions: TravelOption[];
  famousPlaces: FamousPlace[];
  itinerary: DayItinerary[];
  accommodations: AccommodationOption[];
  foodAndExperiences: FoodAndExperiences;
  weather: WeatherInfo;
  smartAlternatives: AlternativeDestination[];
  packingChecklist: ChecklistItem[];
}
