'use client';

import { Separator } from '@/components/ui/separator';
import { Review } from '@/types';
import AddReviewForm from './AddReviewForm';
import ReviewCard from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
  businessName: string;
  businessUrl: string;
}

export default function ReviewList({ reviews, businessName, businessUrl }: ReviewListProps) {
  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-4 md:mb-0">
          Reviews ({reviews.length})
        </h2>
        <AddReviewForm businessName={businessName} businessUrl={businessUrl} />
      </div>
      <Separator className="mb-6" />
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No reviews yet for {businessName}. Be the first to write one!</p>
        </div>
      )}
    </div>
  );
} 