import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const YELP_API_KEY = process.env.YELP_API_KEY;

const YELP_API_URL_DETAIL_BASE = 'https://api.yelp.com/v3/businesses/'; // No /search

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const businessId = params.id;

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

  } catch (error: any) {
    console.error(`Error fetching details for business ${businessId} from Yelp API:`, error.response?.data || error.message);
    // Check if Yelp returned a specific error structure
    const yelpError = error.response?.data?.error;
    const errorMessage = yelpError?.description || 'Failed to fetch business details from Yelp API.';
    const errorStatus = error.response?.status || 500;

    return NextResponse.json(
      { error: errorMessage, code: yelpError?.code }, 
      { status: errorStatus }
    );
  }
} 