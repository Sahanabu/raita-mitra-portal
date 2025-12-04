// Configuration for Google AI Studio
const CONFIG = {
    // Replace with your actual Google AI Studio API key
    GOOGLE_AI_API_KEY: 'AIzaSyBjEkcIuApJXTtyrZ91XonGn2A6WgwR2y4',
    GOOGLE_AI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
};

// Knowledge base builder function
function buildKnowledgeBase(language = 'en') {
    let knowledge = `You are AgroBot, a farming assistant with access to specific crop and farming tip data. Use this knowledge to answer questions:\n\n`;
    
    // Add crops data
    knowledge += `AVAILABLE CROPS:\n`;
    crops.forEach(crop => {
        const name = language === 'kn' ? crop.nameKn : crop.name;
        const desc = language === 'kn' ? crop.descriptionKn : crop.description;
        const season = language === 'kn' ? crop.seasonKn : crop.season;
        const months = crop.months.map(m => monthNames[language][m-1]).join(', ');
        knowledge += `- ${name}: ${desc} Season: ${season}, Water: ${crop.waterNeed}, Months: ${months}\n`;
    });
    
    // Add tips data
    knowledge += `\nFARMING TIPS:\n`;
    tips.forEach(tip => {
        const title = language === 'kn' ? tip.titleKn : tip.title;
        const desc = language === 'kn' ? tip.descriptionKn : tip.description;
        knowledge += `- ${tip.category.toUpperCase()}: ${title} - ${desc}\n`;
    });
    
    knowledge += `\nProvide practical advice based on this data. If asked about crops/tips not in the database, use general farming principles. Keep responses concise and farmer-friendly.`;
    
    return knowledge;
}

// System prompt for the farming assistant
const SYSTEM_PROMPT = {
    en: buildKnowledgeBase('en'),
    kn: buildKnowledgeBase('kn')
};