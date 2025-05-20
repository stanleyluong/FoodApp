'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Business } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
// import { Badge } from '@/components/ui/badge'; // Badges can be added if needed for categories
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, MapPin, Tag } from 'lucide-react';
import StarRating from './StarRating';

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const categoriesText = business.categories?.map(cat => cat.title).join(', ') || 'N/A';
  const addressText = business.location?.display_address?.join(', ') || 'Address not available';

  return (
    <Card className="overflow-hidden flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/business/${business.id}`} className="block cursor-pointer">
          <AspectRatio ratio={16 / 9}>
            {business.image_url ? (
              <Image 
                src={business.image_url}
                alt={business.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-secondary text-muted-foreground">
                No Image Available
              </div>
            )}
          </AspectRatio>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl mb-1 hover:text-primary transition-colors">
          <Link href={`/business/${business.id}`}>{business.name}</Link>
        </CardTitle>
        <div className="flex items-center mb-2">
          <StarRating rating={business.rating} size={18} />
          <span className="ml-2 text-sm text-muted-foreground">({business.review_count} reviews)</span>
        </div>
        <div className="text-sm text-muted-foreground mb-1 flex items-start">
          <Tag className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0" />
          <span>{categoriesText} {business.price ? `- ${business.price}` : ''}</span>
        </div>
        <div className="text-sm text-muted-foreground flex items-start">
          <MapPin className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0" />
          <span>{addressText}</span>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-3 grid grid-cols-2 gap-2">
        <Button asChild variant="outline" className="w-full">
            <Link href={`/business/${business.id}`} >View Details</Link>
        </Button>
        <Button asChild variant="secondary" className="w-full">
            <a href={business.url} target="_blank" rel="noopener noreferrer">
                View on Yelp <ExternalLink className="h-4 w-4 ml-1.5" />
            </a>
        </Button>
      </CardFooter>
    </Card>
  );
} 