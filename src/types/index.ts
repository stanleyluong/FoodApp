export interface YelpCategory {
  alias: string;
  title: string;
}

export interface YelpCoordinates {
  latitude: number;
  longitude: number;
}

export interface YelpLocation {
  address1: string | null;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
}

// This is the main Business type we'll use, adapted for Yelp API fields
export interface Business {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: YelpCategory[];
  rating: number;
  coordinates: YelpCoordinates;
  transactions: string[];
  price?: string; // Price level e.g. "$", "$$"
  location: YelpLocation;
  phone: string;
  display_phone: string;
  // Fields from our old mock data that we might want to map or are similar:
  // description?: string; // Yelp has no direct long description in search, details might.
  // hours?: Record<string, string>; // Yelp provides hours on the details endpoint
  // amenities?: string[]; // Yelp has 'attributes' or transactions, less direct mapping here
}

// Review type (Yelp review structure)
export interface YelpReviewUser {
  id: string;
  profile_url: string;
  image_url: string | null;
  name: string;
}

export interface Review {
  id: string;
  url: string;
  text: string;
  rating: number; // 1-5
  time_created: string; // ISO 8601 date string
  user: YelpReviewUser;
  // For our internal use, if needed, when fetching reviews for a specific business
  businessId?: string; 
} 