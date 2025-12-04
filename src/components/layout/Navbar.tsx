import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('navHome') },
    { to: '/crops', label: t('navCrops') },
    { to: '/tips', label: t('navTips') },
    { to: '/calendar', label: t('navCalendar') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <span className="text-3xl animate-float">🌾</span>
            <span className={cn(
              "text-xl lg:text-2xl font-bold transition-colors duration-300",
              language === 'kn' ? 'font-kannada' : '',
              isScrolled ? 'text-foreground' : 'text-primary'
            )}>
              {t('brandName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'relative py-2 text-base font-medium transition-colors duration-300',
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300',
                  'hover:text-primary hover:after:scale-x-100',
                  location.pathname === link.to
                    ? 'text-primary after:scale-x-100'
                    : 'text-foreground/80'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 border-primary/30 hover:border-primary"
            >
              <Globe className="h-4 w-4" />
              <span className={language === 'kn' ? 'font-kannada' : ''}>
                {t('langToggle')}
              </span>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-out',
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-2 border-t border-border/50">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block py-3 px-4 rounded-lg text-base font-medium transition-all duration-200',
                  location.pathname === link.to
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/80 hover:bg-muted hover:text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
