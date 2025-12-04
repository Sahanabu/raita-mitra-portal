// Crops Data
const crops = [
  {
    id: 'rice',
    name: 'Rice',
    nameKn: 'ಭತ್ತ',
    season: 'Kharif',
    seasonKn: 'ಖರೀಫ್',
    waterNeed: 'High',
    months: [6, 7, 8],
    image: '🌾',
    description: 'Rice is a staple food crop requiring abundant water. Best grown in monsoon season with good irrigation.',
    descriptionKn: 'ಭತ್ತವು ಹೆಚ್ಚು ನೀರು ಬೇಕಾಗುವ ಮುಖ್ಯ ಆಹಾರ ಬೆಳೆ. ಉತ್ತಮ ನೀರಾವರಿಯೊಂದಿಗೆ ಮಳೆಗಾಲದಲ್ಲಿ ಬೆಳೆಯಲು ಉತ್ತಮ.'
  },
  {
    id: 'wheat',
    name: 'Wheat',
    nameKn: 'ಗೋಧಿ',
    season: 'Rabi',
    seasonKn: 'ರಬಿ',
    waterNeed: 'Medium',
    months: [10, 11, 12],
    image: '🌿',
    description: 'Wheat is a major winter crop. Requires cool weather for germination and moderate water.',
    descriptionKn: 'ಗೋಧಿಯು ಪ್ರಮುಖ ಚಳಿಗಾಲದ ಬೆಳೆ. ಮೊಳಕೆಯೊಡೆಯಲು ತಂಪಾದ ಹವಾಮಾನ ಮತ್ತು ಮಧ್ಯಮ ನೀರು ಬೇಕು.'
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    nameKn: 'ಜೋಳ',
    season: 'Kharif',
    seasonKn: 'ಖರೀಫ್',
    waterNeed: 'Medium',
    months: [5, 6, 7],
    image: '🌽',
    description: 'Maize is a versatile crop used for food, fodder, and industrial purposes. Grows well in warm weather.',
    descriptionKn: 'ಜೋಳವು ಆಹಾರ, ಮೇವು ಮತ್ತು ಕೈಗಾರಿಕೆಗಳಿಗೆ ಬಳಸುವ ಬಹುಮುಖ ಬೆಳೆ. ಬೆಚ್ಚಗಿನ ಹವಾಮಾನದಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ.'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    nameKn: 'ಹತ್ತಿ',
    season: 'Kharif',
    seasonKn: 'ಖರೀಫ್',
    waterNeed: 'Medium',
    months: [4, 5, 6],
    image: '☁️',
    description: 'Cotton is a major cash crop. Requires warm climate and well-drained soil for optimal growth.',
    descriptionKn: 'ಹತ್ತಿಯು ಪ್ರಮುಖ ವಾಣಿಜ್ಯ ಬೆಳೆ. ಉತ್ತಮ ಬೆಳವಣಿಗೆಗೆ ಬೆಚ್ಚಗಿನ ಹವಾಮಾನ ಮತ್ತು ಚೆನ್ನಾಗಿ ಬರಿದಾಗುವ ಮಣ್ಣು ಬೇಕು.'
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    nameKn: 'ಕಬ್ಬು',
    season: 'Kharif',
    seasonKn: 'ಖರೀಫ್',
    waterNeed: 'High',
    months: [2, 3, 10],
    image: '🎋',
    description: 'Sugarcane is a tropical crop requiring high water and hot climate. Takes 12-18 months to mature.',
    descriptionKn: 'ಕಬ್ಬು ಹೆಚ್ಚು ನೀರು ಮತ್ತು ಬಿಸಿ ಹವಾಮಾನ ಬೇಕಾದ ಉಷ್ಣವಲಯದ ಬೆಳೆ. ಪಕ್ವವಾಗಲು 12-18 ತಿಂಗಳು ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ.'
  },
  {
    id: 'groundnut',
    name: 'Groundnut',
    nameKn: 'ಕಡಲೆಕಾಯಿ',
    season: 'Kharif',
    seasonKn: 'ಖರೀಫ್',
    waterNeed: 'Low',
    months: [6, 7],
    image: '🥜',
    description: 'Groundnut is an important oilseed crop. Drought-tolerant and suitable for sandy loam soil.',
    descriptionKn: 'ಕಡಲೆಕಾಯಿ ಮುಖ್ಯ ಎಣ್ಣೆಕಾಳು ಬೆಳೆ. ಬರ ಸಹಿಷ್ಣು ಮತ್ತು ಮರಳು ಮಿಶ್ರಿತ ಮಣ್ಣಿಗೆ ಸೂಕ್ತ.'
  },
  {
    id: 'mustard',
    name: 'Mustard',
    nameKn: 'ಸಾಸಿವೆ',
    season: 'Rabi',
    seasonKn: 'ರಬಿ',
    waterNeed: 'Low',
    months: [10, 11],
    image: '🌻',
    description: 'Mustard is a major oilseed crop grown in winter. Requires cool and dry climate.',
    descriptionKn: 'ಸಾಸಿವೆ ಚಳಿಗಾಲದಲ್ಲಿ ಬೆಳೆಯುವ ಪ್ರಮುಖ ಎಣ್ಣೆಕಾಳು ಬೆಳೆ. ತಂಪು ಮತ್ತು ಒಣ ಹವಾಮಾನ ಬೇಕು.'
  },
  {
    id: 'chickpea',
    name: 'Chickpea (Chana)',
    nameKn: 'ಕಡಲೆ',
    season: 'Rabi',
    seasonKn: 'ರಬಿ',
    waterNeed: 'Low',
    months: [10, 11],
    image: '🫘',
    description: 'Chickpea is a major pulse crop. Drought-resistant and improves soil fertility.',
    descriptionKn: 'ಕಡಲೆ ಪ್ರಮುಖ ಬೇಳೆ ಬೆಳೆ. ಬರ ನಿರೋಧಕ ಮತ್ತು ಮಣ್ಣಿನ ಫಲವತ್ತತೆಯನ್ನು ಸುಧಾರಿಸುತ್ತದೆ.'
  },
  {
    id: 'mango',
    name: 'Mango',
    nameKn: 'ಮಾವು',
    season: 'Zaid',
    seasonKn: 'ಜೈದ್',
    waterNeed: 'Medium',
    months: [3, 4, 5],
    image: '🥭',
    description: 'Mango is the king of fruits. Flowering occurs in winter, fruiting in summer.',
    descriptionKn: 'ಮಾವು ಹಣ್ಣುಗಳ ರಾಜ. ಚಳಿಗಾಲದಲ್ಲಿ ಹೂ ಬಿಡುತ್ತದೆ, ಬೇಸಿಗೆಯಲ್ಲಿ ಹಣ್ಣು ಕೊಡುತ್ತದೆ.'
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    nameKn: 'ಕಲ್ಲಂಗಡಿ',
    season: 'Zaid',
    seasonKn: 'ಜೈದ್',
    waterNeed: 'Medium',
    months: [2, 3, 4],
    image: '🍉',
    description: 'Watermelon is a summer fruit requiring warm weather and moderate irrigation.',
    descriptionKn: 'ಕಲ್ಲಂಗಡಿ ಬೇಸಿಗೆ ಹಣ್ಣು. ಬೆಚ್ಚಗಿನ ಹವಾಮಾನ ಮತ್ತು ಮಧ್ಯಮ ನೀರಾವರಿ ಬೇಕು.'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    nameKn: 'ಟೊಮೆಟೊ',
    season: 'Rabi',
    seasonKn: 'ರಬಿ',
    waterNeed: 'Medium',
    months: [9, 10, 11],
    image: '🍅',
    description: 'Tomato is a major vegetable crop grown year-round. Requires moderate water and good drainage.',
    descriptionKn: 'ಟೊಮೆಟೊ ವರ್ಷವಿಡೀ ಬೆಳೆಯುವ ಪ್ರಮುಖ ತರಕಾರಿ ಬೆಳೆ. ಮಧ್ಯಮ ನೀರು ಮತ್ತು ಉತ್ತಮ ಬರಿದಾಗುವಿಕೆ ಬೇಕು.'
  },
  {
    id: 'onion',
    name: 'Onion',
    nameKn: 'ಈರುಳ್ಳಿ',
    season: 'Rabi',
    seasonKn: 'ರಬಿ',
    waterNeed: 'Medium',
    months: [10, 11, 12],
    image: '🧅',
    description: 'Onion is an essential vegetable crop. Grows best in cool weather with well-drained soil.',
    descriptionKn: 'ಈರುಳ್ಳಿ ಅಗತ್ಯ ತರಕಾರಿ ಬೆಳೆ. ತಂಪಾದ ಹವಾಮಾನ ಮತ್ತು ಚೆನ್ನಾಗಿ ಬರಿದಾಗುವ ಮಣ್ಣಿನಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ.'
  }
];

// Tips Data
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

// Month names
const monthNames = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  kn: ['ಜನ', 'ಫೆಬ್ರ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿ', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗ', 'ಸೆಪ್ಟೆ', 'ಅಕ್ಟೋ', 'ನವೆ', 'ಡಿಸೆ']
};

// Chatbot knowledge base
const knowledgeBase = {
  en: {
    rice: 'Rice is a Kharif crop best planted in June-August. It requires high water (flooding) and grows well in temperatures of 20-35°C. Harvest after 4-5 months when grains are golden.',
    wheat: 'Wheat is a Rabi crop planted in October-December. It needs moderate water and cool temperatures (10-25°C). Harvest in 4-5 months when stalks turn golden brown.',
    pest: 'For natural pest control, try neem oil spray (5ml per liter water), marigold companion planting, or yellow sticky traps. Avoid chemical pesticides when possible.',
    water: 'Use drip irrigation to save 60% water. Water early morning to reduce evaporation. Apply mulch to retain soil moisture.',
    soil: 'Test soil every 2-3 years. Add organic compost to improve structure. Practice crop rotation with legumes to restore nitrogen.',
    default: 'I can help with questions about crops, planting seasons, pest control, water management, and farming tips. What would you like to know?'
  },
  kn: {
    rice: 'ಭತ್ತ ಖರೀಫ್ ಬೆಳೆ, ಜೂನ್-ಆಗಸ್ಟ್ನಲ್ಲಿ ನೆಡಲು ಉತ್ತಮ. ಹೆಚ್ಚು ನೀರು (ಪ್ರವಾಹ) ಬೇಕು ಮತ್ತು 20-35°C ತಾಪಮಾನದಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ. ಕಾಳುಗಳು ಚಿನ್ನದ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿದಾಗ 4-5 ತಿಂಗಳ ನಂತರ ಕೊಯ್ಲು.',
    wheat: 'ಗೋಧಿ ರಬಿ ಬೆಳೆ, ಅಕ್ಟೋಬರ್-ಡಿಸೆಂಬರ್ನಲ್ಲಿ ನೆಡಲಾಗುತ್ತದೆ. ಮಧ್ಯಮ ನೀರು ಮತ್ತು ತಂಪು ತಾಪಮಾನ (10-25°C) ಬೇಕು. ತಂಡುಗಳು ಚಿನ್ನದ ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿದಾಗ 4-5 ತಿಂಗಳಲ್ಲಿ ಕೊಯ್ಲು.',
    pest: 'ನೈಸರ್ಗಿಕ ಕೀಟ ನಿಯಂತ್ರಣಕ್ಕೆ, ಬೇವಿನ ಎಣ್ಣೆ ಸ್ಪ್ರೇ (ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 5ml), ಚೆಂಡು ಹೂವು ಸಹ ನೆಡುವಿಕೆ, ಅಥವಾ ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ.',
    water: 'ಹನಿ ನೀರಾವರಿ ಬಳಸಿ 60% ನೀರನ್ನು ಉಳಿಸಿ. ಆವಿಯಾಗುವಿಕೆ ಕಡಿಮೆ ಮಾಡಲು ಬೆಳಿಗ್ಗೆ ಬೇಗ ನೀರು ಹಾಕಿ. ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಉಳಿಸಿಕೊಳ್ಳಲು ಹೊದಿಕೆ ಹಾಕಿ.',
    soil: 'ಪ್ರತಿ 2-3 ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಮಣ್ಣು ಪರೀಕ್ಷಿಸಿ. ರಚನೆ ಸುಧಾರಿಸಲು ಸಾವಯವ ಕಾಂಪೋಸ್ಟ್ ಸೇರಿಸಿ. ಸಾರಜನಕ ಪುನಃಸ್ಥಾಪಿಸಲು ದ್ವಿದಳ ಧಾನ್ಯಗಳೊಂದಿಗೆ ಬೆಳೆ ಸರದಿ ಅಭ್ಯಾಸ ಮಾಡಿ.',
    default: 'ನಾನು ಬೆಳೆಗಳು, ನೆಡುವ ಋತುಗಳು, ಕೀಟ ನಿಯಂತ್ರಣ, ನೀರು ನಿರ್ವಹಣೆ ಮತ್ತು ಕೃಷಿ ಸಲಹೆಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನೀವು ಏನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?'
  }
};