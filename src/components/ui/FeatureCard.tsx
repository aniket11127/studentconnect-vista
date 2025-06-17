
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
        'group p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 flex flex-col items-center text-center gap-5',
        className
      )}
    >
      <div className="p-3 rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors">
        <Icon size={24} />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
