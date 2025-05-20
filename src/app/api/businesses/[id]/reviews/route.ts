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
      // params: { limit: 3, sort_by: 'yelp_sort' } // Example params if needed
    });
    
    // The response.data.reviews should be an array of review objects from Yelp
    return NextResponse.json(response.data.reviews || []); // Ensure an array is returned

  } catch (error: any) {
    console.error(`Error fetching reviews for business ${businessId} from Yelp API:`, error.response?.data || error.message);
    const yelpError = error.response?.data?.error;
    const errorMessage = yelpError?.description || 'Failed to fetch business reviews from Yelp API.';
    const errorStatus = error.response?.status || 500;

    return NextResponse.json(
      { error: errorMessage, code: yelpError?.code }, 
      { status: errorStatus }
    );
  }
} 