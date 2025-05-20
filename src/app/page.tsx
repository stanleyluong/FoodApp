import BusinessList from "@/components/businesses/BusinessList";
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">Loading...</div>}>
      <BusinessList />
    </Suspense>
  );
}
