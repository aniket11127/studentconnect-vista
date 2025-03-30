
import { Clock, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: number;
  lessons: number;
  featured?: boolean;
  className?: string;
}

const CourseCard = ({
  id,
  title,
  description,
  image,
  category,
  level,
  duration,
  students,
  lessons,
  featured = false,
  className,
}: CourseCardProps) => {
  return (
    <div 
      className={cn(
        'group rounded-2xl overflow-hidden border border-border bg-card transition-all duration-300',
        'hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover-card-effect',
        featured && 'ring-1 ring-primary/30',
        className
      )}
    >
      {/* Course Image */}
      <div className="relative h-[180px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full">
            {category}
          </span>
        </div>
        {featured && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-medium bg-primary text-white rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium text-lg leading-tight tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>

        {/* Course Meta */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-primary" />
            <span>{students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen size={14} className="text-primary" />
            <span>{lessons} lessons</span>
          </div>
        </div>

        {/* Course Level and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary">
              {level}
            </span>
            <span className="text-xs font-medium text-green-600">
              Free
            </span>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="group-hover:bg-primary group-hover:text-white transition-colors"
            asChild
          >
            <Link to={`/course/${id}`}>View Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
