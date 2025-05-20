import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const YELP_API_KEY = process.env.YELP_API_KEY;

const YELP_API_URL_DETAIL_BASE = 'https://api.yelp.com/v3/businesses/'; // No /search

export async function GET(request: NextRequest) {
  // Manually parse businessId from the URL
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  // Assuming path structure /api/businesses/[id]
  // segments will be like ['', 'api', 'businesses', 'business_id_value']
  // So, businessId is at index segments.length - 1
  const businessId = segments.length > 3 ? segments[segments.length - 1] : null; 

  if (!YELP_API_KEY) {
    console.error('Yelp API key is not configured for detail view.');
    return NextResponse.json(
      { error: 'API key not configured. Please check server logs.' }, 
      { status: 500 }
    );
  }

  if (!businessId) {
    return NextResponse.json({ error: 'Business ID is required' }, { status: 400 });
  }

  const YELP_BUSINESS_DETAIL_URL = `${YELP_API_URL_DETAIL_BASE}${businessId}`;

  try {
    const response = await axios.get(YELP_BUSINESS_DETAIL_URL, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    });
    
    // The response.data should be the detailed business object from Yelp
    return NextResponse.json(response.data);

  } catch (error: unknown) {
    let errorMessage = 'Failed to fetch business details from Yelp API.';
    let errorCode = 'UNKNOWN_ERROR';
    let errorStatus = 500;

    if (axios.isAxiosError(error)) {
      console.error(`Error fetching details for business ${businessId} from Yelp API:`, error.response?.data || error.message);
      const yelpError = error.response?.data?.error;
      errorMessage = yelpError?.description || error.message || errorMessage;
      errorCode = yelpError?.code || errorCode;
      errorStatus = error.response?.status || errorStatus;
    } else if (error instanceof Error) {
      console.error(`Error fetching details for business ${businessId} from Yelp API:`, error.message);
      errorMessage = error.message;
    } else {
      console.error(`Unknown error fetching details for business ${businessId} from Yelp API:`, error);
    }

    return NextResponse.json(
      { error: errorMessage, code: errorCode }, 
      { status: errorStatus }
    );
  }
} 