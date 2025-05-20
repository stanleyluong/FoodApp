import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
}

export default function StarRating({ 
  rating, 
  totalStars = 5, 
  size = 20, 
  className 
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="#FFC107" strokeWidth={0} size={size} />
      ))}
      {halfStar && <Star key="half" fill="#FFC107" strokeWidth={0} size={size} style={{ clipPath: 'inset(0 50% 0 0)'}} />}
      {/* For the other half of the half-star to appear empty or background */}
      {halfStar && <Star key="half-empty" fill="#E0E0E0" strokeWidth={0} size={size} style={{ clipPath: 'inset(0 0 0 50%)', marginLeft: -size }} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} fill="#E0E0E0" strokeWidth={0} size={size} />
      ))}
    </div>
  );
} 