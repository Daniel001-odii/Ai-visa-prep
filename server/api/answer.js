// server/api/answer.ts
import { ofetch } from 'ofetch';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const candidateData = body.candidateData || {}; // Expecting the questions object
  const previousAnswer = body.previousAnswer || ''; // Optional: last answer provided by user

  if (!candidateData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Candidate data is required',
    });
  }

  const apiKey = useRuntimeConfig().googleApiKey;
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Google API key is missing in server configuration',
    });
  }

  // Define fields we care about (mirrors your reactive object)
  const fields = [
    'fullname',
    'nationality',
    'country_applying_to',
    'visa_type',
    'ever_travelled_before',
    'ever_had_visa_refusal',
    'how_fund_trip',
    'occupation',
    'have_all_documents',
  ];

  // Find the first unanswered or empty field
  const nextField = fields.find((field) => !candidateData[field] || candidateData[field].trim() === '');
  const hasAllFieldsFilled = !nextField;

  // Craft a prompt for the visa officer
  let prompt = `You are a visa officer conducting an interview. Your tone is formal and professional. Based on the candidate's data below, ask a single, concise question to gather more information. Do not repeat questions unless clarification is needed. Here is the candidate's current data:\n\n`;
  prompt += JSON.stringify(candidateData, null, 2) + '\n\n';
  
  if (previousAnswer) {
    prompt += `The candidate just answered: "${previousAnswer}". `;
  }

  if (hasAllFieldsFilled) {
    prompt += `All required fields are filled. Ask a follow-up question to verify or clarify something specific from the data.`;
  } else {
    prompt += `Ask a question to fill in the missing or empty field: "${nextField}".`;
  }

  try {
    const response = await ofetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 50, // Short, concise questions
          temperature: 0.5, // Less randomness for formal tone
          topP: 0.9,
        },
      }),
    });

    console.log('Gemini Response:', response);

    const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!generatedText) {
      return { question: 'Please provide your full name.' }; // Fallback
    }

    return { question: generatedText };
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: 'Failed to fetch question from Google Gemini API',
    });
  }
});