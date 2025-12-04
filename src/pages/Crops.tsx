import { useState, useMemo } from 'react';
import { Search, Droplets } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { crops, monthNames } from '@/data/crops';
import { cn } from '@/lib/utils';

const Crops = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [seasonFilter, setSeasonFilter] = useState<string>('all');

  const filteredCrops = useMemo(() => {
    return crops.filter(crop => {
      const name = language === 'kn' ? crop.nameKn : crop.name;
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeason = seasonFilter === 'all' || crop.season === seasonFilter;
      return matchesSearch && matchesSeason;
    });
  }, [searchQuery, seasonFilter, language]);

  const waterNeedColors = {
    Low: 'bg-green-light/20 text-green-dark',
    Medium: 'bg-secondary/30 text-brown-earth',
    High: 'bg-blue-100 text-blue-700'
  };

  const seasonColors = {
    Kharif: 'bg-primary/20 text-primary',
    Rabi: 'bg-accent/20 text-accent',
    Zaid: 'bg-secondary/30 text-brown-earth'
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
              {t('cropsPageTitle')}
            </h1>
            <p 
              className={cn(
                'text-lg text-muted-foreground animate-fade-in-up delay-100',
                language === 'kn' && 'font-kannada'
              )}
            >
              {t('cropsPageSubtitle')}
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 animate-fade-in-up delay-200">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-input',
                  'focus:outline-none focus:ring-2 focus:ring-primary',
                  'transition-all duration-200',
                  language === 'kn' && 'font-kannada'
                )}
              />
            </div>
            <div className="flex gap-2">
              {['all', 'Kharif', 'Rabi', 'Zaid'].map((season) => (
                <button
                  key={season}
                  onClick={() => setSeasonFilter(season)}
                  className={cn(
                    'px-4 py-3 rounded-xl font-medium transition-all duration-200',
                    seasonFilter === season
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-input hover:border-primary',
                    language === 'kn' && 'font-kannada'
                  )}
                >
                  {season === 'all' ? t('filterAll') : t(`filter${season}` as any)}
                </button>
              ))}
            </div>
          </div>

          {/* Crops Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCrops.map((crop, index) => (
              <div
                key={crop.id}
                className={cn(
                  'group bg-card rounded-2xl border border-border overflow-hidden',
                  'hover:shadow-xl hover:-translate-y-2 hover:border-primary/50',
                  'transition-all duration-300 animate-fade-in-up'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Crop Image/Emoji */}
                <div className="h-32 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                    {crop.image}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <h3 
                    className={cn(
                      'text-xl font-bold text-foreground group-hover:text-primary transition-colors',
                      language === 'kn' && 'font-kannada'
                    )}
                  >
                    {language === 'kn' ? crop.nameKn : crop.name}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className={cn('px-3 py-1 rounded-full text-sm font-medium', seasonColors[crop.season])}>
                      {t('season')}: {language === 'kn' ? crop.seasonKn : crop.season}
                    </span>
                    <span className={cn('px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1', waterNeedColors[crop.waterNeed])}>
                      <Droplets className="h-3 w-3" />
                      {t(`water${crop.waterNeed}` as any)}
                    </span>
                  </div>

                  {/* Description */}
                  <p 
                    className={cn(
                      'text-sm text-muted-foreground line-clamp-2',
                      language === 'kn' && 'font-kannada'
                    )}
                  >
                    {language === 'kn' ? crop.descriptionKn : crop.description}
                  </p>

                  {/* Planting Months */}
                  <div className="pt-3 border-t border-border">
                    <p className={cn('text-xs text-muted-foreground mb-2', language === 'kn' && 'font-kannada')}>
                      {t('months')}:
                    </p>
                    <div className="flex gap-1.5">
                      {crop.months.map((month) => (
                        <span
                          key={month}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded"
                        >
                          {monthNames[language][month - 1]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCrops.length === 0 && (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🔍</span>
              <p className="text-xl text-muted-foreground">
                {language === 'kn' ? 'ಯಾವುದೇ ಬೆಳೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ' : 'No crops found'}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Crops;
