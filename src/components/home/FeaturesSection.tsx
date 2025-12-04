import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: '🌾',
    titleKey: 'featureCrops' as const,
    descKey: 'featureCropsDesc' as const,
    link: '/crops',
    gradient: 'from-green-light/20 to-primary/20',
    borderColor: 'border-primary/30',
  },
  {
    icon: '💡',
    titleKey: 'featureTips' as const,
    descKey: 'featureTipsDesc' as const,
    link: '/tips',
    gradient: 'from-secondary/30 to-yellow-gold/20',
    borderColor: 'border-secondary/50',
  },
  {
    icon: '📅',
    titleKey: 'featureCalendar' as const,
    descKey: 'featureCalendarDesc' as const,
    link: '/calendar',
    gradient: 'from-accent/20 to-brown-light/20',
    borderColor: 'border-accent/30',
  },
  {
    icon: '🤖',
    titleKey: 'featureBot' as const,
    descKey: 'featureBotDesc' as const,
    link: '#',
    gradient: 'from-leaf/20 to-primary/20',
    borderColor: 'border-leaf/30',
  },
];

const FeaturesSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="features" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 
            className={cn(
              'text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient-hero',
              language === 'kn' && 'font-kannada'
            )}
          >
            {t('featuresTitle')}
          </h2>
          <p 
            className={cn(
              'text-lg text-muted-foreground',
              language === 'kn' && 'font-kannada'
            )}
          >
            {t('featuresSubtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Link
              key={feature.titleKey}
              to={feature.link}
              className={cn(
                'group relative p-6 lg:p-8 rounded-2xl border-2 transition-all duration-500',
                'bg-gradient-to-br',
                feature.gradient,
                feature.borderColor,
                'hover:shadow-xl hover:-translate-y-2 hover:rotate-1',
                'animate-fade-in-up'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="text-5xl lg:text-6xl mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 
                className={cn(
                  'text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors',
                  language === 'kn' && 'font-kannada'
                )}
              >
                {t(feature.titleKey)}
              </h3>

              {/* Description */}
              <p 
                className={cn(
                  'text-muted-foreground leading-relaxed',
                  language === 'kn' && 'font-kannada'
                )}
              >
                {t(feature.descKey)}
              </p>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                <span className="text-2xl">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
