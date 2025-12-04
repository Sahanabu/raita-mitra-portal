import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { crops, monthNames } from '@/data/crops';
import { cn } from '@/lib/utils';

const Calendar = () => {
  const { t, language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedCropData = crops.find(c => c.id === selectedCrop);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <Layout>
      <section className="py-12 lg:py-20 min-h-[80vh]">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 
              className={cn(
                'text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient-hero animate-fade-in-up',
                language === 'kn' && 'font-kannada'
              )}
            >
              {t('calendarPageTitle')}
            </h1>
            <p 
              className={cn(
                'text-lg text-muted-foreground animate-fade-in-up delay-100',
                language === 'kn' && 'font-kannada'
              )}
            >
              {t('calendarPageSubtitle')}
            </p>
          </div>

          {/* Crop Selector */}
          <div className="max-w-md mx-auto mb-12 animate-fade-in-up delay-200">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={cn(
                  'w-full flex items-center justify-between px-5 py-4 rounded-xl',
                  'bg-card border-2 border-primary/30 hover:border-primary',
                  'transition-all duration-200',
                  language === 'kn' && 'font-kannada'
                )}
              >
                <div className="flex items-center gap-3">
                  {selectedCropData ? (
                    <>
                      <span className="text-2xl">{selectedCropData.image}</span>
                      <span className="font-medium">
                        {language === 'kn' ? selectedCropData.nameKn : selectedCropData.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">🌱</span>
                      <span className="text-muted-foreground">{t('selectCrop')}</span>
                    </>
                  )}
                </div>
                <ChevronDown 
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform duration-200',
                    isDropdownOpen && 'rotate-180'
                  )} 
                />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute z-20 w-full mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-fade-in-down">
                  <div className="max-h-64 overflow-y-auto">
                    {crops.map((crop) => (
                      <button
                        key={crop.id}
                        onClick={() => {
                          setSelectedCrop(crop.id);
                          setIsDropdownOpen(false);
                        }}
                        className={cn(
                          'w-full flex items-center gap-3 px-5 py-3 hover:bg-muted transition-colors',
                          selectedCrop === crop.id && 'bg-primary/10',
                          language === 'kn' && 'font-kannada'
                        )}
                      >
                        <span className="text-2xl">{crop.image}</span>
                        <span className="font-medium">
                          {language === 'kn' ? crop.nameKn : crop.name}
                        </span>
                        <span className="ml-auto text-sm text-muted-foreground">
                          {crop.season}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="max-w-4xl mx-auto">
            {selectedCropData && (
              <div className="text-center mb-8 animate-fade-in-up">
                <p className={cn('text-lg text-muted-foreground', language === 'kn' && 'font-kannada')}>
                  {t('plantingMonths')}
                </p>
              </div>
            )}

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {months.map((month, index) => {
                const isActive = selectedCropData?.months.includes(month);
                
                return (
                  <div
                    key={month}
                    className={cn(
                      'relative aspect-square rounded-2xl flex flex-col items-center justify-center',
                      'border-2 transition-all duration-300 animate-fade-in-up',
                      isActive
                        ? 'bg-gradient-hero border-primary text-primary-foreground shadow-lg animate-pulse-glow'
                        : 'bg-card border-border text-foreground hover:border-primary/50'
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className={cn('text-lg font-bold', language === 'kn' && 'font-kannada')}>
                      {monthNames[language][month - 1]}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-2 text-xl animate-bounce">
                        🌱
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Crop Info */}
            {selectedCropData && (
              <div className="mt-12 p-6 bg-card rounded-2xl border border-border animate-fade-in-up">
                <div className="flex items-start gap-6">
                  <span className="text-6xl animate-float">{selectedCropData.image}</span>
                  <div className="flex-1">
                    <h3 
                      className={cn(
                        'text-2xl font-bold text-foreground mb-2',
                        language === 'kn' && 'font-kannada'
                      )}
                    >
                      {language === 'kn' ? selectedCropData.nameKn : selectedCropData.name}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {language === 'kn' ? selectedCropData.seasonKn : selectedCropData.season}
                      </span>
                      <span className="px-3 py-1 bg-secondary/30 text-brown-earth rounded-full text-sm font-medium">
                        {t('waterNeed')}: {t(`water${selectedCropData.waterNeed}` as any)}
                      </span>
                    </div>
                    <p 
                      className={cn(
                        'text-muted-foreground leading-relaxed',
                        language === 'kn' && 'font-kannada'
                      )}
                    >
                      {language === 'kn' ? selectedCropData.descriptionKn : selectedCropData.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!selectedCropData && (
              <div className="text-center py-12 animate-fade-in">
                <span className="text-8xl mb-4 block opacity-30">📅</span>
                <p className={cn('text-xl text-muted-foreground', language === 'kn' && 'font-kannada')}>
                  {language === 'kn' 
                    ? 'ಕ್ಯಾಲೆಂಡರ್ ನೋಡಲು ಮೇಲಿನಿಂದ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ' 
                    : 'Select a crop above to see the planting calendar'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Calendar;
