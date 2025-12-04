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

const monthNames = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  kn: ['ಜನ', 'ಫೆಬ್ರ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿ', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗ', 'ಸೆಪ್ಟೆ', 'ಅಕ್ಟೋ', 'ನವೆ', 'ಡಿಸೆ']
};