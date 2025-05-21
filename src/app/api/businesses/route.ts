import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_YELP_API_URL = 'https://api.yelp.com/v3/businesses/search';

export async function GET(request: NextRequest) {
  // Debugging logs
  console.log('[API /api/businesses] Handler called.');
  console.log('[API /api/businesses] NEXT_PUBLIC_YELP_API_KEY defined? ', typeof process.env.NEXT_PUBLIC_YELP_API_KEY !== 'undefined');
  console.log('[API /api/businesses] NEXT_PUBLIC_YELP_API_KEY empty? ', process.env.NEXT_PUBLIC_YELP_API_KEY === '');
  // IMPORTANT: Do NOT log the actual key value in production or shared logs.
  // For temporary, very controlled debugging, you could log a snippet or length:
  // console.log('[API /api/businesses] NEXT_PUBLIC_YELP_API_KEY length (if defined): ', process.env.NEXT_PUBLIC_YELP_API_KEY?.length);

  if (!process.env.NEXT_PUBLIC_YELP_API_KEY) { // Directly use process.env here
    console.error('[API /api/businesses] Yelp API key is not configured or empty.');
    return NextResponse.json(
      { error: 'API key not configured. Please check server logs.' }, 
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term') || 'food'; // Default search term
  const location = searchParams.get('location');
  const category = searchParams.get('category'); // Yelp uses 'categories' alias for a single category filter
  const limit = searchParams.get('limit') || '20';
  const offset = searchParams.get('offset') || '0';

  console.log(`[API /api/businesses] Request params: term=${term}, location=${location}, category=${category}, limit=${limit}, offset=${offset}`);

  if (!location) {
    console.warn('[API /api/businesses] Location parameter is required but missing.');
    return NextResponse.json(
      { error: 'Location parameter is required.' }, 
      { status: 400 }
    );
  }

  try {
    const params: Record<string, string> = {
      term,
      location,
      limit,
      offset,
    };
    if (category && category !== 'all') {
      params.categories = category;
    }

    console.log('[API /api/businesses] Attempting to fetch from Yelp API...');
    const response = await axios.get(NEXT_PUBLIC_YELP_API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API_KEY}`, // Use process.env directly
      },
      params: params,
    });

    console.log('[API /api/businesses] Yelp API request successful.');
    return NextResponse.json(response.data.businesses);

  } catch (error: unknown) {
    console.error('[API /api/businesses] Error in handler:', error); // Log the whole error object for more details
    let errorMessage = 'Failed to fetch data from Yelp API.';
    let errorCode = 'UNKNOWN_ERROR';
    let errorStatus = 500;
    let errorDetailMessage: string | undefined = undefined;

    if (axios.isAxiosError(error)) {
      console.error('[API /api/businesses] Axios error details:', error.response?.data || error.message);
      const yelpError = error.response?.data as { error?: { code?: string, description?: string } } | undefined;
      errorMessage = yelpError?.error?.description || error.message || errorMessage;
      errorCode = yelpError?.error?.code || errorCode;
      errorStatus = error.response?.status || errorStatus;
      errorDetailMessage = yelpError?.error?.description;
      if (error.response?.status === 401) {
        errorMessage = "Unauthorized - Check Yelp API Key permissions or value.";
      }
    } else if (error instanceof Error) {
      console.error('[API /api/businesses] Generic error details:', error.message);
      errorMessage = error.message;
      errorDetailMessage = error.message;
    } else {
      console.error('[API /api/businesses] Unknown error structure.');
    }

    return NextResponse.json(
      { error: errorMessage, code: errorCode, details: errorDetailMessage }, 
      { status: errorStatus }
    );
  }
} 