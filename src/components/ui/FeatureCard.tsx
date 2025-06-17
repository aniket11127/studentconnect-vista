
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        'group card-padding-mobile rounded-2xl border border-border bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 flex flex-col items-center justify-center text-center gap-4 sm:gap-5 min-h-[200px] h-full',
        className
      )}
    >
      <div className="p-2.5 sm:p-3 rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors flex-shrink-0">
        <Icon size={20} className="sm:w-6 sm:h-6" />
      </div>
      <div className="space-y-2 flex-grow flex flex-col justify-center">
        <h3 className="font-medium text-base sm:text-lg text-center">{title}</h3>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
