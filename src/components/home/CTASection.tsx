import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const CTASection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 text-6xl opacity-20 animate-float">🌾</div>
        <div className="absolute bottom-10 right-1/4 text-7xl opacity-20 animate-float delay-200">🌿</div>
        <div className="absolute top-1/2 right-10 text-5xl opacity-20 animate-float delay-300">🌻</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            className={cn(
              'text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in-up',
              language === 'kn' && 'font-kannada'
            )}
          >
            {t('ctaTitle')}
          </h2>
          <p 
            className={cn(
              'text-lg md:text-xl text-primary-foreground/90 mb-10 animate-fade-in-up delay-100',
              language === 'kn' && 'font-kannada'
            )}
          >
            {t('ctaSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
            <Button
              asChild
              size="xl"
              className={cn(
                'bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:scale-105',
                language === 'kn' && 'font-kannada'
              )}
            >
              <Link to="/crops">{t('ctaBtn1')}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className={cn(
                'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary',
                language === 'kn' && 'font-kannada'
              )}
            >
              <Link to="/tips">{t('ctaBtn2')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
