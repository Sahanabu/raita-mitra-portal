import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const { t, language } = useLanguage();

  const impacts = [
    t('aboutImpact1'),
    t('aboutImpact2'),
    t('aboutImpact3'),
  ];

  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative animate-fade-in-up">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder farm image using gradient */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/40 via-secondary/50 to-accent/40 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <span className="text-9xl animate-float">👨‍🌾</span>
                  <div className="flex justify-center gap-4 text-5xl">
                    <span className="animate-float delay-100">🌾</span>
                    <span className="animate-float delay-200">🌻</span>
                    <span className="animate-float delay-300">🌽</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-full opacity-50 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary rounded-full opacity-30 blur-3xl" />
          </div>

          {/* Content Side */}
          <div className="space-y-8 animate-fade-in-up delay-200">
            <div>
              <h2 
                className={cn(
                  'text-3xl md:text-4xl lg:text-5xl font-bold mb-4',
                  language === 'kn' && 'font-kannada'
                )}
              >
                <span className="text-gradient-accent">{t('aboutTitle')}</span>
              </h2>
              <p 
                className={cn(
                  'text-xl text-muted-foreground mb-6',
                  language === 'kn' && 'font-kannada'
                )}
              >
                {t('aboutSubtitle')}
              </p>
              <p 
                className={cn(
                  'text-lg text-muted-foreground leading-relaxed',
                  language === 'kn' && 'font-kannada'
                )}
              >
                {t('aboutDesc')}
              </p>
            </div>

            {/* Impact Points */}
            <div className="space-y-4">
              <h3 
                className={cn(
                  'text-xl font-semibold text-foreground',
                  language === 'kn' && 'font-kannada'
                )}
              >
                {t('aboutImpact')}
              </h3>
              <ul className="space-y-3">
                {impacts.map((impact, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span 
                      className={cn(
                        'text-foreground',
                        language === 'kn' && 'font-kannada'
                      )}
                    >
                      {impact}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
