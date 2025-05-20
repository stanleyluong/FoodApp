'use client';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';
import { Business } from '@/types';
import { Terminal } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import BusinessCard from './BusinessCard';
import SearchBar from './SearchBar';

const ITEMS_PER_PAGE = 9; // Example pagination

export default function BusinessList() {
  const searchParams = useSearchParams();
  const initialSearchTermFromUrl = searchParams.get('term') || '';

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTermFromUrl);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true); // Start true, assume initial load/fetch

  // Ref to track if the fetch for the current view (term + location) has been initiated
  const fetchInitiatedForCurrentViewRef = useRef(false);
  // Ref to store the previous search term to detect actual changes
  const prevSearchTermRef = useRef(initialSearchTermFromUrl);

  const fetchBusinesses = useCallback(async (currentSearchTerm: string, currentLocation: string, currentCategory: string) => {
    // No need to setIsLoading(true) here; the caller (useEffect or handleSearch) will manage it.
    setError(null);

    if (!currentLocation && !currentSearchTerm) {
      setIsLoading(false); // No location, no term, not loading.
      return;
    }
    if (currentSearchTerm && !currentLocation) {
      setIsLoading(false); // Term but no location yet (geolocation pending/failed), not loading for API call.
      return;
    }

    // If we are here, it means we are attempting a fetch, so ensure loading is true IF the caller didn't already.
    // However, the primary setIsLoading(true) should be before calling fetchBusinesses.
    // This is more of a safeguard if somehow it was missed.
    // setIsLoading(true); // Let's rely on caller to set this.

    try {
      const params = new URLSearchParams();
      if (currentSearchTerm) params.append('term', currentSearchTerm);
      if (currentLocation) params.append('location', currentLocation);
      if (currentCategory && currentCategory !== 'all') params.append('category', currentCategory);
      
      const response = await fetch(`/api/businesses?${params.toString()}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed with status ${response.status}`);
      }
      const data: Business[] = await response.json();
      setBusinesses(data);
    } catch (e: any) {
      console.error("Failed to fetch businesses:", e);
      setError(e.message || "An unexpected error occurred.");
      setBusinesses([]);
    } finally {
      setIsLoading(false);
    }
  }, []); // setError is stable

  useEffect(() => {
    const termFromUrl = searchParams.get('term') || '';

    if (termFromUrl !== prevSearchTermRef.current) {
      // Search term from URL has changed, this is a new search.
      setSearchTerm(termFromUrl);
      setIsLoading(true); // Indicate loading for the new search term.
      fetchInitiatedForCurrentViewRef.current = false; // Reset for the new search context.
      prevSearchTermRef.current = termFromUrl;
      // Location will be resolved by geolocation or fallback, then fetch will occur.
    } else if (!fetchInitiatedForCurrentViewRef.current && !location && businesses.length === 0) {
      // Initial mount, no term from URL (or same as previous), no location yet, no businesses.
      // We expect geolocation to run and then fetch.
      setIsLoading(true);
    }

    let locationHasResolvedThisEffectRun = false;

    if (!location) { // Only run geolocation if location is not yet set
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
              .then(response => response.json())
              .then(data => {
                const city = data.address?.city || data.address?.town || data.address?.village || "Current Location";
                setLocation(city);
                locationHasResolvedThisEffectRun = true;
                if (!fetchInitiatedForCurrentViewRef.current) {
                  setIsLoading(true); // Ensure loading is true before this first fetch
                  fetchBusinesses(termFromUrl, city, category);
                  fetchInitiatedForCurrentViewRef.current = true;
                }
              })
              .catch(() => {
                const fallbackCity = 'New York City';
                setLocation(fallbackCity);
                locationHasResolvedThisEffectRun = true;
                if (!fetchInitiatedForCurrentViewRef.current) {
                  setIsLoading(true);
                  fetchBusinesses(termFromUrl, fallbackCity, category);
                  fetchInitiatedForCurrentViewRef.current = true;
                }
              });
          },
          () => { // Geolocation failed or denied
            const fallbackCity = 'New York City';
            setLocation(fallbackCity);
            locationHasResolvedThisEffectRun = true;
            if (!fetchInitiatedForCurrentViewRef.current) {
              setIsLoading(true);
              fetchBusinesses(termFromUrl, fallbackCity, category);
              fetchInitiatedForCurrentViewRef.current = true;
            }
          }
        );
      } else { // Geolocation not supported
        const fallbackCity = 'New York City';
        setLocation(fallbackCity);
        locationHasResolvedThisEffectRun = true;
        if (!fetchInitiatedForCurrentViewRef.current) {
          setIsLoading(true);
          fetchBusinesses(termFromUrl, fallbackCity, category);
          fetchInitiatedForCurrentViewRef.current = true;
        }
      }
    } else if (location && !fetchInitiatedForCurrentViewRef.current && (termFromUrl || businesses.length === 0)){
        // Location is already set (e.g. from previous state or quick resolution),
        // but fetch hasn't been initiated for this view yet, and there's a term or no businesses.
        setIsLoading(true);
        fetchBusinesses(termFromUrl, location, category);
        fetchInitiatedForCurrentViewRef.current = true;
    }

    // Timeout for initial load if geolocation is very slow and no search term
    if (!termFromUrl && businesses.length === 0 && !locationHasResolvedThisEffectRun) {
      const timer = setTimeout(() => {
        if (!location && !fetchInitiatedForCurrentViewRef.current) { // If location still not set and fetch not started
          setIsLoading(false); // Avoid indefinite loading
        }
      }, 5000); // Increased timeout
      return () => clearTimeout(timer);
    }

  }, [searchParams, category, fetchBusinesses, location, searchTerm]); // location and searchTerm are key dependencies

  const handleSearch = (newSearchTerm: string, newLocation: string, newCategory: string) => {
    setSearchTerm(newSearchTerm);
    setLocation(newLocation);
    setCategory(newCategory);
    fetchBusinesses(newSearchTerm, newLocation, newCategory);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <SearchBar onSearch={handleSearch} initialLocation={location} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-10 w-full mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <SearchBar onSearch={handleSearch} initialLocation={location} />
      {error && (
        <Alert variant="destructive" className="mb-6">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Fetching Businesses</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!error && businesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        !error && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No Businesses Found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria, or ensure the location is specific enough.
            </p>
          </div>
        )
      )}
      {/* TODO: Add Pagination controls here if implementing pagination */}
    </div>
  );
} 