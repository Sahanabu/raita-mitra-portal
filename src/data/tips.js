const tips = [
  {
    id: 'soil-1',
    title: 'Test Your Soil Regularly',
    titleKn: 'ನಿಮ್ಮ ಮಣ್ಣನ್ನು ನಿಯಮಿತವಾಗಿ ಪರೀಕ್ಷಿಸಿ',
    category: 'soil',
    description: 'Get your soil tested every 2-3 years to understand pH levels and nutrient content. This helps in applying the right fertilizers.',
    descriptionKn: 'pH ಮಟ್ಟಗಳು ಮತ್ತು ಪೋಷಕಾಂಶ ಅಂಶವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಪ್ರತಿ 2-3 ವರ್ಷಗಳಿಗೊಮ್ಮೆ ನಿಮ್ಮ ಮಣ್ಣನ್ನು ಪರೀಕ್ಷಿಸಿ. ಇದು ಸರಿಯಾದ ಗೊಬ್ಬರಗಳನ್ನು ಹಾಕಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.'
  },
  {
    id: 'soil-2',
    title: 'Add Organic Matter',
    titleKn: 'ಸಾವಯವ ವಸ್ತುಗಳನ್ನು ಸೇರಿಸಿ',
    category: 'soil',
    description: 'Add compost, farmyard manure, or green manure to improve soil structure and water retention capacity.',
    descriptionKn: 'ಮಣ್ಣಿನ ರಚನೆ ಮತ್ತು ನೀರು ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವ ಸಾಮರ್ಥ್ಯವನ್ನು ಸುಧಾರಿಸಲು ಕಾಂಪೋಸ್ಟ್, ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ, ಅಥವಾ ಹಸಿರು ಗೊಬ್ಬರವನ್ನು ಸೇರಿಸಿ.'
  },
  {
    id: 'soil-3',
    title: 'Practice Crop Rotation',
    titleKn: 'ಬೆಳೆ ಸರದಿ ಅಭ್ಯಾಸ ಮಾಡಿ',
    category: 'soil',
    description: 'Rotate crops each season to prevent soil depletion and reduce pest buildup. Alternate between legumes and cereals.',
    descriptionKn: 'ಮಣ್ಣಿನ ಸವಕಳಿ ತಡೆಯಲು ಮತ್ತು ಕೀಟಗಳ ಸಂಗ್ರಹವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಪ್ರತಿ ಋತುವಿನಲ್ಲಿ ಬೆಳೆಗಳನ್ನು ಬದಲಾಯಿಸಿ.'
  },
  {
    id: 'water-1',
    title: 'Use Drip Irrigation',
    titleKn: 'ಹನಿ ನೀರಾವರಿ ಬಳಸಿ',
    category: 'water',
    description: 'Drip irrigation saves up to 60% water compared to flood irrigation and delivers water directly to plant roots.',
    descriptionKn: 'ಹನಿ ನೀರಾವರಿ ಪ್ರವಾಹ ನೀರಾವರಿಗೆ ಹೋಲಿಸಿದರೆ 60% ವರೆಗೆ ನೀರನ್ನು ಉಳಿಸುತ್ತದೆ ಮತ್ತು ನೀರನ್ನು ನೇರವಾಗಿ ಸಸ್ಯದ ಬೇರುಗಳಿಗೆ ತಲುಪಿಸುತ್ತದೆ.'
  },
  {
    id: 'water-2',
    title: 'Mulching Conserves Water',
    titleKn: 'ಹೊದಿಕೆ ನೀರನ್ನು ಸಂರಕ್ಷಿಸುತ್ತದೆ',
    category: 'water',
    description: 'Apply organic mulch around plants to reduce evaporation and maintain soil moisture during hot weather.',
    descriptionKn: 'ಆವಿಯಾಗುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ಬಿಸಿ ಹವಾಮಾನದಲ್ಲಿ ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಲು ಸಸ್ಯಗಳ ಸುತ್ತಲೂ ಸಾವಯವ ಹೊದಿಕೆಯನ್ನು ಹಾಕಿ.'
  },
  {
    id: 'water-3',
    title: 'Water Early Morning',
    titleKn: 'ಬೆಳಿಗ್ಗೆ ಬೇಗ ನೀರು ಹಾಕಿ',
    category: 'water',
    description: 'Water your crops in early morning to minimize evaporation and allow plants to absorb moisture before heat.',
    descriptionKn: 'ಆವಿಯಾಗುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ಬಿಸಿಯಾಗುವ ಮೊದಲು ಸಸ್ಯಗಳು ತೇವಾಂಶವನ್ನು ಹೀರಿಕೊಳ್ಳಲು ಅನುವು ಮಾಡಿಕೊಡಲು ಬೆಳಿಗ್ಗೆ ಬೇಗ ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ನೀರು ಹಾಕಿ.'
  },
  {
    id: 'pest-1',
    title: 'Use Neem-Based Pesticides',
    titleKn: 'ಬೇವಿನ ಆಧಾರಿತ ಕೀಟನಾಶಕಗಳನ್ನು ಬಳಸಿ',
    category: 'pest',
    description: 'Neem oil is a natural pesticide effective against many pests. Mix 5ml neem oil per liter of water and spray.',
    descriptionKn: 'ಬೇವಿನ ಎಣ್ಣೆ ಅನೇಕ ಕೀಟಗಳ ವಿರುದ್ಧ ಪರಿಣಾಮಕಾರಿಯಾದ ನೈಸರ್ಗಿಕ ಕೀಟನಾಶಕ. ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 5ml ಬೇವಿನ ಎಣ್ಣೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.'
  },
  {
    id: 'pest-2',
    title: 'Install Yellow Sticky Traps',
    titleKn: 'ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ',
    category: 'pest',
    description: 'Yellow sticky traps attract and catch whiteflies, aphids, and other flying pests. Place 8-10 traps per acre.',
    descriptionKn: 'ಹಳದಿ ಅಂಟು ಬಲೆಗಳು ಬಿಳಿ ನೊಣಗಳು, ಹೇನುಗಳು ಮತ್ತು ಇತರ ಹಾರುವ ಕೀಟಗಳನ್ನು ಆಕರ್ಷಿಸಿ ಹಿಡಿಯುತ್ತವೆ. ಪ್ರತಿ ಎಕರೆಗೆ 8-10 ಬಲೆಗಳನ್ನು ಇಡಿ.'
  },
  {
    id: 'pest-3',
    title: 'Encourage Beneficial Insects',
    titleKn: 'ಉಪಯುಕ್ತ ಕೀಟಗಳನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಿ',
    category: 'pest',
    description: 'Ladybugs, lacewings, and parasitic wasps are natural pest controllers. Plant flowers to attract them.',
    descriptionKn: 'ಲೇಡಿಬಗ್ಗಳು, ಲೇಸ್ವಿಂಗ್ಗಳು ಮತ್ತು ಪರಾವಲಂಬಿ ಕಣಜಗಳು ನೈಸರ್ಗಿಕ ಕೀಟ ನಿಯಂತ್ರಕಗಳು. ಅವುಗಳನ್ನು ಆಕರ್ಷಿಸಲು ಹೂವುಗಳನ್ನು ನೆಡಿ.'
  },
  {
    id: 'harvest-1',
    title: 'Harvest at Right Maturity',
    titleKn: 'ಸರಿಯಾದ ಪಕ್ವತೆಯಲ್ಲಿ ಕೊಯ್ಲು ಮಾಡಿ',
    category: 'harvest',
    description: 'Harvest crops at proper maturity stage for best quality and longer storage life. Check crop-specific indicators.',
    descriptionKn: 'ಉತ್ತಮ ಗುಣಮಟ್ಟ ಮತ್ತು ದೀರ್ಘ ಶೇಖರಣಾ ಜೀವನಕ್ಕಾಗಿ ಸರಿಯಾದ ಪಕ್ವತೆಯ ಹಂತದಲ್ಲಿ ಬೆಳೆಗಳನ್ನು ಕೊಯ್ಲು ಮಾಡಿ.'
  },
  {
    id: 'harvest-2',
    title: 'Harvest in Cool Hours',
    titleKn: 'ತಂಪಾದ ಸಮಯದಲ್ಲಿ ಕೊಯ್ಲು ಮಾಡಿ',
    category: 'harvest',
    description: 'Harvest vegetables and fruits during early morning when temperatures are cool to maintain freshness.',
    descriptionKn: 'ತಾಜಾತನವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಲು ತಾಪಮಾನ ತಂಪಾಗಿರುವ ಬೆಳಿಗ್ಗೆ ತರಕಾರಿ ಮತ್ತು ಹಣ್ಣುಗಳನ್ನು ಕೊಯ್ಲು ಮಾಡಿ.'
  },
  {
    id: 'harvest-3',
    title: 'Proper Drying Before Storage',
    titleKn: 'ಶೇಖರಣೆಯ ಮೊದಲು ಸರಿಯಾಗಿ ಒಣಗಿಸಿ',
    category: 'harvest',
    description: 'Dry grains to 12-14% moisture content before storage to prevent fungal growth and pest infestation.',
    descriptionKn: 'ಶಿಲೀಂಧ್ರ ಬೆಳವಣಿಗೆ ಮತ್ತು ಕೀಟ ಮುತ್ತಿಕೊಳ್ಳುವಿಕೆಯನ್ನು ತಡೆಯಲು ಶೇಖರಣೆಯ ಮೊದಲು ಧಾನ್ಯಗಳನ್ನು 12-14% ತೇವಾಂಶಕ್ಕೆ ಒಣಗಿಸಿ.'
  },
  {
    id: 'general-1',
    title: 'Keep Weather Records',
    titleKn: 'ಹವಾಮಾನ ದಾಖಲೆಗಳನ್ನು ಇಡಿ',
    category: 'general',
    description: 'Maintain records of rainfall, temperature, and weather events to plan future farming activities better.',
    descriptionKn: 'ಭವಿಷ್ಯದ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳನ್ನು ಉತ್ತಮವಾಗಿ ಯೋಜಿಸಲು ಮಳೆ, ತಾಪಮಾನ ಮತ್ತು ಹವಾಮಾನ ಘಟನೆಗಳ ದಾಖಲೆಗಳನ್ನು ಇಡಿ.'
  },
  {
    id: 'general-2',
    title: 'Join Farmer Groups',
    titleKn: 'ರೈತ ಗುಂಪುಗಳನ್ನು ಸೇರಿ',
    category: 'general',
    description: 'Join local farmer producer organizations to get better prices for your produce and access to resources.',
    descriptionKn: 'ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳಿಗೆ ಉತ್ತಮ ಬೆಲೆ ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳಿಗೆ ಪ್ರವೇಶ ಪಡೆಯಲು ಸ್ಥಳೀಯ ರೈತ ಉತ್ಪಾದಕ ಸಂಸ್ಥೆಗಳನ್ನು ಸೇರಿ.'
  },
  {
    id: 'general-3',
    title: 'Diversify Your Crops',
    titleKn: 'ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ವೈವಿಧ್ಯಗೊಳಿಸಿ',
    category: 'general',
    description: 'Grow multiple crops to reduce risk from crop failure and ensure steady income throughout the year.',
    descriptionKn: 'ಬೆಳೆ ವೈಫಲ್ಯದಿಂದ ಅಪಾಯವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ವರ್ಷವಿಡೀ ಸ್ಥಿರ ಆದಾಯವನ್ನು ಖಚಿತಪಡಿಸಲು ಹಲವಾರು ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯಿರಿ.'
  }
];

const tipCategories = [
  { id: 'soil', icon: '🌱', nameKey: 'tipsCategorySoil' },
  { id: 'water', icon: '💧', nameKey: 'tipsCategoryWater' },
  { id: 'pest', icon: '🐛', nameKey: 'tipsCategoryPest' },
  { id: 'harvest', icon: '🌾', nameKey: 'tipsCategoryHarvest' },
  { id: 'general', icon: '📋', nameKey: 'tipsCategoryGeneral' }
];