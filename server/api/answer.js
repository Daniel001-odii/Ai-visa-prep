// server/api/answer.ts
import { ofetch } from 'ofetch';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const candidateData = body.candidateData || {};
  const previousAnswer = body.previousAnswer || '';

  if (!candidateData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Candidate data is required',
    });
  }

  const geminiApiKey = useRuntimeConfig().googleApiKey;
  const playhtApiKey = useRuntimeConfig().playhtApiKey;
  const playhtUserId = useRuntimeConfig().playhtUserId;
  if (!geminiApiKey || !playhtApiKey || !playhtUserId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'API keys or User ID are missing in server configuration',
    });
  }

  // Define fields
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

  const nextField = fields.find((field) => !candidateData[field] || candidateData[field].trim() === '');
  const hasAllFieldsFilled = !nextField;

  // Generate question with Gemini
  let prompt = `You are a visa officer conducting an interview. Your tone is formal and professional. Based on the candidate's data below, ask a single, concise question to gather more information. Do not repeat questions unless clarification is needed. Here is the candidate's current data:\n\n`;
  prompt += JSON.stringify(candidateData, null, 2) + '\n\n';
  if (previousAnswer) prompt += `The candidate just answered: "${previousAnswer}". `;
  prompt += hasAllFieldsFilled
    ? `All required fields are filled. Ask a follow-up question to verify or clarify something specific from the data.`
    : `Ask a question to fill in the missing or empty field: "${nextField}".`;

  const geminiResponse = await ofetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiApiKey },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 50, temperature: 0.5, topP: 0.9 },
    }),
  });

  const question = geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Please provide your full name.';

  // Generate audio with PlayHT
  const voiceId = 'deedee'; // Example: Larry (mature male, American). Swap with any PlayHT voice ID
/*   const ttsResponse = await ofetch('https://api.play.ht/api/v2/tts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${playhtApiKey}`,
      'X-USER-ID': playhtUserId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: question,
      voice: voiceId,
      output_format: 'mp3',
      speed: 1.0, // 0.5 (slow) to 2.0 (fast)
      quality: 'high', // Options: draft, low, medium, high, premium
    }),
    responseType: 'arraybuffer', // Get raw MP3 bytes
  });
 */
  // const audioBase64 = Buffer.from(ttsResponse).toString('base64');

  return {
    question,
    // audio: `data:audio/mp3;base64,${audioBase64}`,
  };
});