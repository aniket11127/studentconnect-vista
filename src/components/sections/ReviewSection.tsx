
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Star } from 'lucide-react';

// Define review type
interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  content: string;
  date: Date;
  studentInfo?: string;
}

// Initial sample reviews
const initialReviews: Review[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
    rating: 5,
    content: "SGK14's courses have completely transformed my approach to learning. The practical projects and personalized feedback helped me build a strong foundation in programming. Now I'm confident in my skills and ready for future challenges.",
    date: new Date(2023, 9, 15),
    studentInfo: 'Grade 12, MP Board'
  },
  {
    id: '2',
    name: 'Nisha Patel',
    avatar: 'https://images.unsplash.com/photo-1501286353178-1ec881214838',
    rating: 4,
    content: "The public speaking module was exactly what I needed to overcome my fear of presentations. The instructors were supportive and the practice sessions helped me gain confidence. I've already used these skills for my school projects.",
    date: new Date(2023, 10, 3),
    studentInfo: 'Grade 11, MP Board'
  },
  {
    id: '3',
    name: 'Rohan Mehra',
    avatar: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369',
    rating: 5,
    content: "I joined SGK14 to improve my MS Office skills, but gained so much more. The career guidance sessions helped me understand different career paths and how to prepare for them. Highly recommend their comprehensive approach!",
    date: new Date(2023, 11, 20),
    studentInfo: 'Grade 10, MP Board'
  },
];

// Star Rating Component
const StarRating = ({ 
  rating, 
  onChange 
}: { 
  rating: number; 
  onChange?: (rating: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`p-1 focus:outline-none ${onChange ? 'cursor-pointer' : 'cursor-default'}`}
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => onChange && setHoverRating(star)}
          onMouseLeave={() => onChange && setHoverRating(0)}
        >
          <Star
            size={20}
            className={`${
              star <= (hoverRating || rating)
                ? 'text-primary fill-primary'
                : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

// Review Form
const ReviewForm = ({ 
  onSubmit 
}: { 
  onSubmit: (review: Omit<Review, 'id' | 'date'>) => void;
}) => {
  const [rating, setRating] = useState(0);
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<{
    name: string;
    content: string;
    studentInfo: string;
  }>();

  const submitReview = handleSubmit((data) => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    onSubmit({
      name: data.name,
      content: data.content,
      studentInfo: data.studentInfo,
      rating,
    });

    // Reset form
    reset();
    setRating(0);
  });

  return (
    <form onSubmit={submitReview} className="space-y-4 glass p-6 rounded-xl">
      <h3 className="text-xl font-medium mb-4">Share Your Experience</h3>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
        <input
          id="name"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register('name', { required: true })}
        />
        {errors.name && <p className="text-destructive text-sm mt-1">Name is required</p>}
      </div>
      
      <div>
        <label htmlFor="studentInfo" className="block text-sm font-medium mb-1">Class & Board (optional)</label>
        <input
          id="studentInfo"
          placeholder="e.g., Grade 11, MP Board"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...register('studentInfo')}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Rating</label>
        <StarRating rating={rating} onChange={setRating} />
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">Your Review</label>
        <Textarea
          id="content"
          placeholder="Share your experience with SGK14..."
          className="w-full"
          {...register('content', { required: true, minLength: 10 })}
        />
        {errors.content && (
          <p className="text-destructive text-sm mt-1">
            {errors.content.type === 'required' 
              ? 'Review content is required' 
              : 'Review must be at least 10 characters'}
          </p>
        )}
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};

// Format date
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Main Review Section Component
const ReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Load reviews from localStorage on component mount
  useEffect(() => {
    try {
      const savedReviews = localStorage.getItem('sgk14_reviews');
      if (savedReviews) {
        const parsedReviews = JSON.parse(savedReviews).map((review: any) => ({
          ...review,
          date: new Date(review.date)
        }));
        setReviews(parsedReviews);
      } else {
        // Set initial reviews if no saved reviews exist
        setReviews(initialReviews);
        localStorage.setItem('sgk14_reviews', JSON.stringify(initialReviews));
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews(initialReviews);
    }
  }, []);

  // Add a new review
  const addReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const review: Review = {
      ...newReview,
      id: crypto.randomUUID(),
      date: new Date(),
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    
    // Save to localStorage
    try {
      localStorage.setItem('sgk14_reviews', JSON.stringify(updatedReviews));
      toast.success('Your review has been submitted!');
    } catch (error) {
      console.error('Error saving review:', error);
      toast.error('Failed to save your review. Please try again.');
    }
  };

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Student Reviews
          </h2>
          <p className="text-muted-foreground text-lg">
            Read what our students have to say about their learning journey with SGK14
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ReviewForm onSubmit={addReview} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {reviews.length > 0 ? (
                reviews.slice(0, 4).map((review) => (
                  <Card key={review.id} className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {review.avatar ? (
                            <AvatarImage src={review.avatar} alt={review.name} />
                          ) : null}
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.name}</div>
                          {review.studentInfo && (
                            <div className="text-xs text-muted-foreground">{review.studentInfo}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(review.date)}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <StarRating rating={review.rating} />
                    </div>
                    
                    <p className="text-sm flex-1 mb-4">{review.content}</p>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
