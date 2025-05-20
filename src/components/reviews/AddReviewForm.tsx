'use client';

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface AddReviewFormProps {
  // businessName: string; // Removed as it's not used
  businessUrl: string;
}

export default function AddReviewForm({ /* businessName, */ businessUrl }: AddReviewFormProps) {
  if (!businessUrl) {
    // Don't render the button if the URL isn't available for some reason
    return null;
  }

  return (
    <Button asChild className="w-full md:w-auto">
      <a href={businessUrl} target="_blank" rel="noopener noreferrer">
        Write a Review on Yelp
        <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );
} 