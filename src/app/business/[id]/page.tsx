'use client';

import StarRating from '@/components/businesses/StarRating';
import ReviewList from '@/components/reviews/ReviewList';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Business, Review } from '@/types'; // Using our Yelp-aligned types
import { AlertCircle, Camera, Clock, MapPin, Phone, Tag } from 'lucide-react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

// Yelp Business Detail can have more fields than search result, e.g. photos, hours array
interface YelpBusinessDetail extends Business {
  photos?: string[]; // Array of photo URLs
  hours?: Array<{
    open: Array<{
      is_overnight: boolean;
      start: string;
      end: string;
      day: number; // 0 = Monday
    }>;
    hours_type: string; // e.g. "REGULAR"
    is_open_now: boolean;
  }>;
}

export default function BusinessDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [business, setBusiness] = useState<YelpBusinessDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinessData = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);

    try {
      const [businessRes, reviewsRes] = await Promise.all([
        fetch(`/api/businesses/${id}`),
        fetch(`/api/businesses/${id}/reviews`)
      ]);

      if (!businessRes.ok) {
        const errData = await businessRes.json();
        throw new Error(errData.error || `Failed to fetch business details: ${businessRes.status}`);
      }
      const businessData: YelpBusinessDetail = await businessRes.json();
      setBusiness(businessData);

      if (!reviewsRes.ok) {
        // Non-critical error for reviews, log it but don't block page
        const errData = await reviewsRes.json();
        console.warn(`Failed to fetch reviews: ${errData.error || reviewsRes.status}`);
        setReviews([]);
      } else {
        const reviewsData: Review[] = await reviewsRes.json();
        setReviews(reviewsData);
      }

    } catch (e: unknown) {
      console.error("Error fetching business data:", e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
      setBusiness(null); // Ensure business is null on error to trigger notFound if appropriate
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBusinessData();
  }, [fetchBusinessData]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-64 w-full md:h-96 rounded-lg mb-8" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-6" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-8 w-1/4 mb-4" /> {/* Tabs Trigger Skeleton */}
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-8 w-1/4 mt-8 mb-4" /> {/* Review Title Skeleton */}
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-60 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error} Please try refreshing the page or contact support if the issue persists.</AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (!business) {
    // This should ideally be caught by error state, but as a fallback:
    notFound();
  }

  const getDayOfWeek = (dayNum: number): string => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[dayNum] || '';
  };

  const formatTime = (timeStr: string): string => {
    if (!timeStr || timeStr.length !== 4) return 'N/A';
    const hour = parseInt(timeStr.substring(0, 2), 10);
    const minute = timeStr.substring(2, 4);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert hour to 12-hour format, 0 becomes 12
    return `${formattedHour}:${minute} ${ampm}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section - using image_url from search result, or photos[0] from detail */}
      <div className="relative w-full h-64 md:h-[450px] rounded-lg overflow-hidden mb-8 shadow-2xl bg-secondary">
        {business.image_url || (business.photos && business.photos[0]) ? (
            <Image 
                src={business.photos?.[0] || business.image_url} 
                alt={business.name} 
                fill 
                className="object-cover"
                priority
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center">
                <Camera size={48} className="text-muted-foreground" />
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">{business.name}</h1>
          <div className="flex items-center mb-3">
            <StarRating rating={business.rating} size={24} />
            <span className="ml-3 text-lg text-gray-200">({business.review_count} reviews)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {business.categories?.map(cat => <Badge key={cat.alias} variant="secondary" className="text-sm backdrop-blur-sm bg-white/20 hover:bg-white/30 border-white/30 text-white">{cat.title}</Badge>)}
            {business.price && <Badge variant="outline" className="text-sm backdrop-blur-sm bg-white/20 hover:bg-white/30 border-white/30 text-white">{business.price}</Badge>}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-x-12 gap-y-10">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-6 bg-muted p-1 rounded-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Overview</TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="photos" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Photos ({business.photos?.length || 0})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8 pt-2">
              {/* Removed direct business.description rendering here */}
              {/* Business specific details like "About Us" usually come from Yelp business owner input or specific fields not always in general API */}
              {business.categories && business.categories.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-3 flex items-center"><Tag className="mr-2.5 h-6 w-6 text-primary"/>Cuisine & Info</h2>
                  <div className="flex flex-wrap gap-2">
                    {business.categories.map(c => <Badge key={c.alias} variant="outline">{c.title}</Badge>)}
                    {business.price && <Badge variant="outline">Price: {business.price}</Badge>}
                  </div>
                </div>
              )}
              {business.hours && business.hours[0]?.open && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4 flex items-center"><Clock className="mr-2.5 h-6 w-6 text-primary"/>Hours {business.hours[0].is_open_now ? <Badge className="ml-3 bg-green-500 hover:bg-green-600">Open Now</Badge> : <Badge variant="destructive" className="ml-3">Closed</Badge>}</h2>
                  <Card className="border-dashed">
                    <CardContent className="pt-6">
                    <ul className="space-y-2 text-muted-foreground">
                        {business.hours[0].open.map((h, idx) => (
                        <li key={idx} className="flex justify-between">
                            <span>{getDayOfWeek(h.day)}</span>
                            <span>{formatTime(h.start)} - {formatTime(h.end)} {h.is_overnight ? '(next day)' : ''}</span>
                        </li>
                        ))}
                    </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
              {/* TODO: Add other attributes like transactions, amenities if available and desired */}
            </TabsContent>

            <TabsContent value="reviews" className="pt-2">
              <ReviewList reviews={reviews} businessName={business.name} businessUrl={business.url} />
            </TabsContent>

            <TabsContent value="photos" className="pt-2">
              {business.photos && business.photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {business.photos.map((photoUrl, idx) => (
                    <div key={idx} className="aspect-square relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                       <Image src={photoUrl} alt={`${business.name} photo ${idx + 1}`} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"/>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No photos available for {business.name}.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <aside className="lg:col-span-1 space-y-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center"><MapPin className="mr-2.5 h-5 w-5 text-primary"/>Location & Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {business.location?.display_address?.join('\n') || 'Address not available'}
              </p>
              {business.coordinates && (
                <div className="h-60 bg-muted rounded-md overflow-hidden my-3 shadow-inner">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${business.coordinates.latitude},${business.coordinates.longitude}&zoom=15`}
                  >
                  </iframe>
                </div>
              )}
              {business.display_phone && 
                <p className="text-muted-foreground flex items-center">
                  <Phone className="mr-2.5 h-4 w-4 flex-shrink-0" /> {business.display_phone}
                </p>
              }
              {business.coordinates && (
                <Button asChild className="w-full mt-3">
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${business.coordinates.latitude},${business.coordinates.longitude}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Get Directions (on Google Maps)
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
} 