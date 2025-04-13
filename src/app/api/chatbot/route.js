// src/app/api/chatbot/route.js
import { callGeminiAPI } from '../../../lib/geminiClient';

export async function POST(request) {
  try {
    console.log('Received chat request'); // Debugging
    const body = await request.json();
    const { userInput } = body;

    console.log('User input:', userInput); // Debugging

    if (!userInput) {
      console.log('Missing userInput'); // Debugging
      return new Response(JSON.stringify({ error: 'Missing userInput in request body' }), { status: 400 });
    }

    const prompt = `
      You are a helpful assistant for Swayam 2024, the annual cultural fest of MVJ College of Engineering. 
      Here are some key details about the event:
      
      - Event Name: Swayam 2024
      - Location: MVJ College of Engineering, Bangalore
      - Dates: [Insert Event Dates]
      - Main Events: Monoacting, Dance, Music, Drama, Fashion Show, etc.
      
      When users ask about:
      - Event details: Provide specific information about the event
      - Registration: Explain how to register
      - Schedule: Provide the event schedule
      - General queries: Answer in a friendly, helpful manner
      
      User's question: ${userInput}
      
      Please provide a helpful response.
    `;

    console.log('Generated prompt:', prompt); // Debugging

    const result = await callGeminiAPI({ userInput: prompt });
    console.log('API Response:', result); // Debugging

    const chatbotReply = result || 'No response from Gemini';
    return new Response(JSON.stringify({ reply: chatbotReply }), { status: 200 });
  } catch (error) {
    console.error('API Route Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

