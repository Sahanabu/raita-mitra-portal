import { ArrowDown, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t, language } = useLanguage();

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-8xl animate-float opacity-20">🌾</div>
        <div className="absolute top-40 right-20 text-7xl animate-float delay-200 opacity-20">🌻</div>
        <div className="absolute bottom-32 left-1/4 text-6xl animate-float delay-300 opacity-20">🌽</div>
        <div className="absolute bottom-20 right-1/3 text-8xl animate-float delay-100 opacity-20">🚜</div>
        <div className="absolute top-1/3 left-1/2 text-5xl animate-float delay-400 opacity-20">💧</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-8 animate-fade-in-down">
            <Sprout className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              {language === 'kn' ? 'ರೈತರಿಗೆ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ' : 'Smart Farming Assistant for Farmers'}
            </span>
          </div>

          {/* Main Heading */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight animate-fade-in-up ${
              language === 'kn' ? 'font-kannada' : ''
            }`}
          >
            <span className="text-gradient-hero">{t('heroTitle')}</span>
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200 ${
              language === 'kn' ? 'font-kannada' : ''
            }`}
          >
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Button
              variant="hero"
              size="xl"
              onClick={scrollToFeatures}
              className={language === 'kn' ? 'font-kannada' : ''}
            >
              {t('heroBtn')}
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              asChild
              className={language === 'kn' ? 'font-kannada' : ''}
            >
              <Link to="/crops">{t('heroExplore')}</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in-up delay-400">
            {[
              { value: '12+', label: language === 'kn' ? 'ಬೆಳೆಗಳು' : 'Crops' },
              { value: '15+', label: language === 'kn' ? 'ಸಲಹೆಗಳು' : 'Tips' },
              { value: '24/7', label: language === 'kn' ? 'AI ಸಹಾಯ' : 'AI Help' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className={`text-muted-foreground ${language === 'kn' ? 'font-kannada' : ''}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
