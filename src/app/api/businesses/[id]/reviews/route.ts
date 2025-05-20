import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const YELP_API_KEY = process.env.YELP_API_KEY;
const YELP_API_URL_BASE = 'https://api.yelp.com/v3/businesses';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const businessId = params.id;

  if (!YELP_API_KEY) {
    console.error('Yelp API key is not configured.');
    return NextResponse.json(
      { error: 'API key not configured. Please check server logs.' }, 
      { status: 500 }
    );
  }

  if (!businessId) {
    return NextResponse.json({ error: 'Business ID is required for reviews' }, { status: 400 });
  }

  // Yelp API for reviews. Note: sometimes it might be paginated or limited to e.g. 3 reviews.
  // https://docs.developer.yelp.com/reference/v3_business_reviews
  // It also supports a `locale` parameter.
  const YELP_REVIEWS_URL = `${YELP_API_URL_BASE}/${businessId}/reviews`;

  try {
    const response = await axios.get(YELP_REVIEWS_URL, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: { limit: 5, sort_by: 'yelp_sort' } // Request up to 5 reviews, sorted by Yelp's default sort
    });
    
    // The response.data.reviews should be an array of review objects from Yelp
    return NextResponse.json(response.data.reviews || []); // Ensure an array is returned

  } catch (error: unknown) {
    let errorMessage = 'Failed to fetch business reviews from Yelp API.';
    let errorCode = 'UNKNOWN_ERROR';
    let errorStatus = 500;

    if (axios.isAxiosError(error)) {
      console.error(`Error fetching reviews for business ${businessId} from Yelp API:`, error.response?.data || error.message);
      const yelpError = error.response?.data?.error;
      errorMessage = yelpError?.description || error.message || errorMessage;
      errorCode = yelpError?.code || errorCode;
      errorStatus = error.response?.status || errorStatus;
    } else if (error instanceof Error) {
      console.error(`Error fetching reviews for business ${businessId} from Yelp API:`, error.message);
      errorMessage = error.message;
    } else {
      console.error(`Unknown error fetching reviews for business ${businessId} from Yelp API:`, error);
    }

    return NextResponse.json(
      { error: errorMessage, code: errorCode }, 
      { status: errorStatus }
    );
  }
} 