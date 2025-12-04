// Google AI Studio integration for chatbot
class AIChat {
    constructor() {
        this.apiKey = CONFIG.GOOGLE_AI_API_KEY;
        this.apiUrl = CONFIG.GOOGLE_AI_API_URL;
    }

    async generateResponse(message, language = 'en') {
        console.log('Generating AI response for:', message);
        console.log('API Key:', this.apiKey ? 'Present' : 'Missing');
        
        try {
            const systemPrompt = SYSTEM_PROMPT[language];
            const prompt = `${systemPrompt}\n\nUser question: ${message}\n\nPlease respond in ${language === 'kn' ? 'Kannada' : 'English'}:`;

            console.log('Making API call to:', this.apiUrl);
            
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            console.log('API Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`API request failed: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('API Response data:', data);
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                console.log('AI Response:', aiResponse);
                return aiResponse;
            } else {
                throw new Error('Invalid response format');
            }

        } catch (error) {
            console.error('AI API Error:', error);
            console.log('Falling back to predefined response');
            return this.getFallbackResponse(message, language);
        }
    }

    getFallbackResponse(message, language) {
        const lowerMsg = message.toLowerCase();
        const kb = knowledgeBase[language];
        
        // Enhanced fallback responses
        if (lowerMsg.includes('rice') || lowerMsg.includes('ಭತ್ತ')) return kb.rice;
        if (lowerMsg.includes('wheat') || lowerMsg.includes('ಗೋಧಿ')) return kb.wheat;
        if (lowerMsg.includes('pest') || lowerMsg.includes('insect') || lowerMsg.includes('ಕೀಟ')) return kb.pest;
        if (lowerMsg.includes('water') || lowerMsg.includes('irrigation') || lowerMsg.includes('ನೀರು')) return kb.water;
        if (lowerMsg.includes('soil') || lowerMsg.includes('ಮಣ್ಣು')) return kb.soil;
        
        // Additional farming topics
        if (lowerMsg.includes('fertilizer') || lowerMsg.includes('ಗೊಬ್ಬರ')) {
            return language === 'kn' ? 
                'ಸಾವಯವ ಗೊಬ್ಬರಗಳನ್ನು ಬಳಸಿ - ಕಾಂಪೋಸ್ಟ್, ಹಸುವಿನ ಗೊಬ್ಬರ, ಮತ್ತು ಹಸಿರು ಗೊಬ್ಬರ. ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯ ಆಧಾರದ ಮೇಲೆ NPK ಗೊಬ್ಬರಗಳನ್ನು ಬಳಸಿ.' :
                'Use organic fertilizers - compost, cow dung, and green manure. Apply NPK fertilizers based on soil test results.';
        }
        
        if (lowerMsg.includes('weather') || lowerMsg.includes('ಹವಾಮಾನ')) {
            return language === 'kn' ? 
                'ಹವಾಮಾನ ಮುನ್ನೋಟವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ. ಮಳೆಗಾಲದ ಮೊದಲು ಬೀಜ ಬಿತ್ತನೆ ಮಾಡಿ ಮತ್ತು ಬರಗಾಲದಲ್ಲಿ ನೀರಿನ ಸಂರಕ್ಷಣೆ ಮಾಡಿ.' :
                'Check weather forecasts regularly. Plant before monsoon and conserve water during dry periods.';
        }
        
        return kb.default;
    }
}

// Initialize AI Chat instance
const aiChat = new AIChat();