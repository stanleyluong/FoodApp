import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// const YELP_API_KEY = process.env.YELP_API_KEY; // Will use process.env.YELP_API_KEY directly
const YELP_API_URL_BASE = 'https://api.yelp.com/v3/businesses';

export async function GET(request: NextRequest) {
  console.log('[API /api/business-reviews] Handler called.');
  console.log('[API /api/business-reviews] YELP_API_KEY defined? ', typeof process.env.YELP_API_KEY !== 'undefined');
  console.log('[API /api/business-reviews] YELP_API_KEY empty? ', process.env.YELP_API_KEY === '');

  const businessId = request.nextUrl.searchParams.get('id');
  console.log(`[API /api/business-reviews] Parsed businessId from query: ${businessId}`);

  if (!process.env.YELP_API_KEY) {
    console.error('[API /api/business-reviews] Yelp API key is not configured or empty.');
    return NextResponse.json(
      { error: 'API key not configured. Please check server logs.' }, 
      { status: 500 }
    );
  }

  if (!businessId) {
    console.warn('[API /api/business-reviews] Business ID is required in query but missing.');
    return NextResponse.json({ error: 'Business ID is required for reviews' }, { status: 400 });
  }

  // Yelp API for reviews. Note: sometimes it might be paginated or limited to e.g. 3 reviews.
  // https://docs.developer.yelp.com/reference/v3_business_reviews
  // It also supports a `locale` parameter.
  const YELP_REVIEWS_URL = `${YELP_API_URL_BASE}/${businessId}/reviews`;
  console.log(`[API /api/business-reviews] Fetching from URL: ${YELP_REVIEWS_URL}`);

  try {
    console.log('[API /api/business-reviews] Attempting to fetch reviews from Yelp API...');
    const response = await axios.get(YELP_REVIEWS_URL, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: { limit: 5, sort_by: 'yelp_sort' } // Request up to 5 reviews, sorted by Yelp's default sort
    });
    
    console.log('[API /api/business-reviews] Yelp API request successful for reviews.');
    // The response.data.reviews should be an array of review objects from Yelp
    return NextResponse.json(response.data.reviews || []); // Ensure an array is returned

  } catch (error: unknown) {
    console.error('[API /api/business-reviews] Error in handler:', error);
    let errorMessage = 'Failed to fetch business reviews from Yelp API.';
    let errorCode = 'UNKNOWN_ERROR';
    let errorStatus = 500;
    let errorDetailMessage: string | undefined = undefined;

    if (axios.isAxiosError(error)) {
      console.error('[API /api/business-reviews] Axios error details:', error.response?.data || error.message);
      const yelpError = error.response?.data as { error?: { code?: string, description?: string } } | undefined;
      errorMessage = yelpError?.error?.description || error.message || errorMessage;
      errorCode = yelpError?.error?.code || errorCode;
      errorStatus = error.response?.status || errorStatus;
      errorDetailMessage = yelpError?.error?.description;
      if (error.response?.status === 401) {
        errorMessage = "Unauthorized - Check Yelp API Key permissions or value for reviews API.";
      }
    } else if (error instanceof Error) {
      console.error('[API /api/business-reviews] Generic error details:', error.message);
      errorMessage = error.message;
      errorDetailMessage = error.message;
    } else {
      console.error('[API /api/business-reviews] Unknown error structure.');
    }

    return NextResponse.json(
      { error: errorMessage, code: errorCode, details: errorDetailMessage }, 
      { status: errorStatus }
    );
  }
} 