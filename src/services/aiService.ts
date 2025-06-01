// This is a simulated AI service for the MVP
// In a production app, this would connect to a real AI API like Gemini

const SIMULATED_RESPONSES: Record<string, string[]> = {
  'ask-anything': [
    'The Pacific Ocean is the largest and deepest ocean on Earth.',
    'A group of flamingos is called a flamboyance.',
    'The Great Wall of China is approximately 13,170 miles long.',
    'Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat!',
    'The tallest mountain in our solar system is Olympus Mons on Mars, which is about 16 miles high - nearly three times the height of Mount Everest.'
  ],
  'help-writing': [
    'Dear Friend,\n\nI hope this message finds you well. I\'ve been thinking about you and wanted to check in. Would you like to meet for coffee sometime next week?\n\nLooking forward to catching up!\n\nBest wishes',
    'Dear Doctor\'s Office,\n\nI need to reschedule my appointment that was set for Thursday, May 10th. Could I please have a new appointment sometime next week?\n\nThank you for your help.',
    'Happy Birthday to my wonderful grandson!\n\nI\'m so proud of the person you\'ve become. Wishing you a day filled with joy and a year of happiness ahead.\n\nWith all my love'
  ],
  'good-news': [
    'Community Comes Together: Volunteers planted over 500 trees in City Park last weekend, creating a new green space for everyone to enjoy.',
    'Local Grandmother Celebrates 100th Birthday: Martha Johnson marked her centennial surrounded by four generations of family. Her secret to longevity? "A daily walk and a little bit of chocolate."',
    'Lost Dog Reunited with Family: After missing for three weeks, Buddy the golden retriever was found safe and returned home. The community had organized search parties to help find him.'
  ],
  'hobby-ideas': [
    'Gardening is a wonderful hobby that gets you outdoors. You can start small with just a few potted plants on a windowsill or patio.',
    'Bird watching is a peaceful hobby that can be done right from your window. All you need is a simple bird guide and maybe some binoculars.',
    'Painting with watercolors is a relaxing creative outlet. You don\'t need to be an artist to enjoy mixing colors and creating simple landscapes or abstract designs.'
  ],
  'recipe-finder': [
    'Easy Vegetable Soup:\n\nIngredients:\n- 2 carrots, chopped\n- 2 celery stalks, chopped\n- 1 onion, diced\n- 4 cups vegetable broth\n- 1 cup frozen peas\n- Salt and pepper to taste\n\nDirections:\n1. Cook onions, carrots, and celery in a pot until softened.\n2. Add broth and bring to a simmer.\n3. Add peas and cook for 5 more minutes.\n4. Season with salt and pepper.',
    'Simple Fruit Salad:\n\nIngredients:\n- 1 apple, diced\n- 1 banana, sliced\n- 1 orange, peeled and sectioned\n- 1/4 cup grapes, halved\n- 2 tablespoons honey\n\nDirections:\n1. Combine all fruit in a bowl.\n2. Drizzle with honey and gently toss.\n3. Chill before serving if desired.'
  ],
  'daily-planner': [
    'Morning:\n- 8:00 AM: Breakfast\n- 9:00 AM: Light stretching or short walk\n- 10:00 AM: Doctor appointment\n\nAfternoon:\n- 12:00 PM: Lunch\n- 2:00 PM: Garden club meeting\n- 4:00 PM: Rest and read\n\nEvening:\n- 6:00 PM: Dinner\n- 7:30 PM: Call family\n- 9:00 PM: Bedtime routine',
    'Weekly Plan:\n\nMonday: Grocery shopping and library\nTuesday: Lunch with friend\nWednesday: Doctor appointment\nThursday: Community center class\nFriday: Rest day\nSaturday: Family visit\nSunday: Church and relaxation'
  ]
};

export const callAI = async (
  featureId: string, 
  userName: string, 
  message: string
): Promise<string> => {
  // In a real app, this would call an actual AI API
  // For demo purposes, we'll simulate responses
  
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // If we have canned responses for this feature, randomly select one
      if (SIMULATED_RESPONSES[featureId]) {
        const responses = SIMULATED_RESPONSES[featureId];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        resolve(randomResponse);
      } else {
        // Fallback generic response
        resolve(`I'm here to help you, ${userName}. What would you like to know more about?`);
      }
    }, 1500);
  });
};