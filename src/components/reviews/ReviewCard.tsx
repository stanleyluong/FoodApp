'use client';

import StarRating from '@/components/businesses/StarRating'; // Re-using StarRating
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Review } from '@/types';
import { format } from 'date-fns'; // For date formatting
import { useEffect, useState } from 'react'; // Import useEffect and useState

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [formattedDate, setFormattedDate] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after hydration
    setIsClient(true);
    try {
      setFormattedDate(format(new Date(review.time_created), 'MMMM d, yyyy'));
    } catch (e) {
      console.error("Error formatting date:", e);
      setFormattedDate("Invalid date"); // Fallback for invalid date strings
    }
  }, [review.time_created]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-x-4 pb-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={review.user?.image_url || undefined} alt={review.user?.name} />
          <AvatarFallback>{review.user?.name?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-lg">{review.user?.name || 'Anonymous'}</CardTitle>
          <div className="flex items-center mt-1">
            <StarRating rating={review.rating} size={16} />
            {isClient && formattedDate && (
              <span className="ml-2 text-xs text-muted-foreground">
                {formattedDate}
              </span>
            )}
            {!isClient && (
                // Placeholder or loading state for SSR to avoid mismatch, can be empty or a styled skeleton
                <span className="ml-2 text-xs text-muted-foreground h-4 w-20 inline-block animate-pulse bg-muted rounded-sm" /> 
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {review.text}
        </p>
      </CardContent>
    </Card>
  );
} 