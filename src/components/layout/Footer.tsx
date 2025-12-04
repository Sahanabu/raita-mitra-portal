import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-brown-earth text-primary-foreground py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌾</span>
              <span className={`text-xl font-bold ${language === 'kn' ? 'font-kannada' : ''}`}>
                {t('brandName')}
              </span>
            </div>
            <p className={`text-primary-foreground/80 ${language === 'kn' ? 'font-kannada' : ''}`}>
              {t('footerTagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/crops" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                {t('navCrops')}
              </Link>
              <Link to="/tips" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                {t('navTips')}
              </Link>
              <Link to="/calendar" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                {t('navCalendar')}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Connect</h4>
            <div className="flex gap-4">
              <span className="text-2xl hover:scale-125 transition-transform cursor-pointer">📧</span>
              <span className="text-2xl hover:scale-125 transition-transform cursor-pointer">📱</span>
              <span className="text-2xl hover:scale-125 transition-transform cursor-pointer">🌐</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6 text-center">
          <p className={`text-primary-foreground/70 ${language === 'kn' ? 'font-kannada' : ''}`}>
            {t('footerText')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
