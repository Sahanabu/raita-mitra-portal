import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { tips, tipCategories } from '@/data/tips';
import { cn } from '@/lib/utils';

const Tips = () => {
  const { t, language } = useLanguage();
  const [openCategories, setOpenCategories] = useState<string[]>(['soil']);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getTipsByCategory = (categoryId: string) => {
    return tips.filter(tip => tip.category === categoryId);
  };

  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 
              className={cn(
                'text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient-hero animate-fade-in-up',
                language === 'kn' && 'font-kannada'
              )}
            >
              {t('tipsPageTitle')}
            </h1>
            <p 
              className={cn(
                'text-lg text-muted-foreground animate-fade-in-up delay-100',
                language === 'kn' && 'font-kannada'
              )}
            >
              {t('tipsPageSubtitle')}
            </p>
          </div>

          {/* Accordion */}
          <div className="max-w-3xl mx-auto space-y-4">
            {tipCategories.map((category, catIndex) => {
              const isOpen = openCategories.includes(category.id);
              const categoryTips = getTipsByCategory(category.id);

              return (
                <div
                  key={category.id}
                  className={cn(
                    'bg-card rounded-2xl border-2 overflow-hidden transition-all duration-300 animate-fade-in-up',
                    isOpen ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
                  )}
                  style={{ animationDelay: `${catIndex * 100}ms` }}
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{category.icon}</span>
                      <h3 
                        className={cn(
                          'text-xl font-bold text-foreground',
                          language === 'kn' && 'font-kannada'
                        )}
                      >
                        {t(category.nameKey)}
                      </h3>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {categoryTips.length}
                      </span>
                    </div>
                    <ChevronDown 
                      className={cn(
                        'h-6 w-6 text-muted-foreground transition-transform duration-300',
                        isOpen && 'rotate-180'
                      )} 
                    />
                  </button>

                  {/* Tips List */}
                  <div 
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <div className="px-5 pb-5 space-y-3">
                      {categoryTips.map((tip, tipIndex) => (
                        <div
                          key={tip.id}
                          className={cn(
                            'relative pl-6 py-4 pr-4 bg-muted/50 rounded-xl',
                            'border-l-4 border-primary',
                            'hover:bg-muted/80 transition-colors',
                            'animate-fade-in-up'
                          )}
                          style={{ animationDelay: `${tipIndex * 50}ms` }}
                        >
                          <h4 
                            className={cn(
                              'font-semibold text-foreground mb-2',
                              language === 'kn' && 'font-kannada'
                            )}
                          >
                            {language === 'kn' ? tip.titleKn : tip.title}
                          </h4>
                          <p 
                            className={cn(
                              'text-muted-foreground leading-relaxed',
                              language === 'kn' && 'font-kannada'
                            )}
                          >
                            {language === 'kn' ? tip.descriptionKn : tip.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tips;
