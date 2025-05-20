import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const YELP_API_KEY = process.env.YELP_API_KEY;
const YELP_API_URL = 'https://api.yelp.com/v3/businesses/search';

export async function GET(request: NextRequest) {
  if (!YELP_API_KEY) {
    console.error('Yelp API key is not configured.');
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

  if (!location) {
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

    const response = await axios.get(YELP_API_URL, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: params,
    });

    // We might want to transform the Yelp API response to match our existing Business type
    // For now, let's return the businesses array directly from Yelp's response
    return NextResponse.json(response.data.businesses);

  } catch (error: any) {
    console.error('Error fetching from Yelp API:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch data from Yelp API.', details: error.response?.data?.error?.description || error.message }, 
      { status: error.response?.status || 500 }
    );
  }
} 