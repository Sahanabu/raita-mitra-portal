import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';

const NotFound = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <span className="text-9xl mb-6 block animate-float">🌾</span>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className={`text-xl text-muted-foreground mb-8 ${language === 'kn' ? 'font-kannada' : ''}`}>
            {language === 'kn' 
              ? 'ಓಹ್! ಈ ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ' 
              : 'Oops! This page could not be found'}
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/">
              {language === 'kn' ? 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ' : 'Return to Home'}
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
