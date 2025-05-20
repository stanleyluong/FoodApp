import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// const YELP_API_KEY = process.env.YELP_API_KEY; // Will use process.env.YELP_API_KEY directly
const YELP_API_URL_DETAIL_BASE = 'https://api.yelp.com/v3/businesses/';

export async function GET(request: NextRequest) {
  console.log('[API /api/businesses/[id]] Handler called.');
  console.log('[API /api/businesses/[id]] YELP_API_KEY defined? ', typeof process.env.YELP_API_KEY !== 'undefined');
  console.log('[API /api/businesses/[id]] YELP_API_KEY empty? ', process.env.YELP_API_KEY === '');

  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  const businessId = segments.length > 3 ? segments[segments.length - 1] : null;
  console.log(`[API /api/businesses/[id]] Parsed businessId: ${businessId}`);

  if (!process.env.YELP_API_KEY) {
    console.error('[API /api/businesses/[id]] Yelp API key is not configured or empty for detail view.');
    return NextResponse.json(
      { error: 'API key not configured. Please check server logs.' }, 
      { status: 500 }
    );
  }

  if (!businessId) {
    console.warn('[API /api/businesses/[id]] Business ID is required but missing from URL.');
    return NextResponse.json({ error: 'Business ID is required' }, { status: 400 });
  }

  const YELP_BUSINESS_DETAIL_URL = `${YELP_API_URL_DETAIL_BASE}${businessId}`;
  console.log(`[API /api/businesses/[id]] Fetching from URL: ${YELP_BUSINESS_DETAIL_URL}`);

  try {
    console.log('[API /api/businesses/[id]] Attempting to fetch details from Yelp API...');
    const response = await axios.get(YELP_BUSINESS_DETAIL_URL, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });
    
    console.log('[API /api/businesses/[id]] Yelp API request successful for details.');
    return NextResponse.json(response.data);

  } catch (error: unknown) {
    console.error('[API /api/businesses/[id]] Error in handler:', error);
    let errorMessage = 'Failed to fetch business details from Yelp API.';
    let errorCode = 'UNKNOWN_ERROR';
    let errorStatus = 500;
    let errorDetailMessage: string | undefined = undefined;

    if (axios.isAxiosError(error)) {
      console.error('[API /api/businesses/[id]] Axios error details:', error.response?.data || error.message);
      const yelpError = error.response?.data as { error?: { code?: string, description?: string } } | undefined;
      errorMessage = yelpError?.error?.description || error.message || errorMessage;
      errorCode = yelpError?.error?.code || errorCode;
      errorStatus = error.response?.status || errorStatus;
      errorDetailMessage = yelpError?.error?.description;
      if (error.response?.status === 401) {
        errorMessage = "Unauthorized - Check Yelp API Key permissions or value for details API.";
      }
    } else if (error instanceof Error) {
      console.error('[API /api/businesses/[id]] Generic error details:', error.message);
      errorMessage = error.message;
      errorDetailMessage = error.message;
    } else {
      console.error('[API /api/businesses/[id]] Unknown error structure.');
    }

    return NextResponse.json(
      { error: errorMessage, code: errorCode, details: errorDetailMessage }, 
      { status: errorStatus }
    );
  }
} 