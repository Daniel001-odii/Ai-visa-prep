// server/api/answer.ts
import { ofetch } from 'ofetch';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const candidateData = body.candidateData || {};
  const currentAnswer = body.currentAnswer || '';
  const questionCount = body.questionCount || 0;
  const previousQuestions = body.previousQuestions || [];
  const previousAnswers = body.previousAnswers || [];

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

  // Build prompt
  let prompt = `You are a visa officer conducting an interview. Your tone is formal and professional. 
  Based on the candidate's data and previous answers below, ask a single, concise question from common visa interview topics 
  (e.g., purpose of travel, funding, ties to home country, past travel history) to assess their eligibility. 
  Do not repeat questions already asked. You must ask exactly 5 questions before making a decision. 
  After the 5th question, evaluate all data and answers, then provide a final response in this exact format: 
  "[APPROVED or DENIED]: [Brief reason]." 
  Here is the candidate's data:\n\n`;
  prompt += JSON.stringify(candidateData, null, 2) + '\n\n';

  if (previousQuestions.length > 0) {
    prompt += `Previous questions and answers:\n`;
    previousQuestions.forEach((q, i) => {
      prompt += `- Question ${i + 1}: "${q}"\n  Answer: "${previousAnswers[i]}"\n`;
    });
  }
  if (currentAnswer) prompt += `The candidate just answered: "${currentAnswer}" to the last question.\n`;

  const maxQuestions = 5;
  if (questionCount < maxQuestions) {
    prompt += `Ask question ${questionCount + 1} of 5. Return only the question text, nothing else.`;
  } else {
    prompt += `You have asked 5 questions. Now evaluate all data and answers, and return only the final decision in this format: "[APPROVED or DENIED]: [Brief reason]."`;
  }

  console.log('Prompt:', prompt);

  // Fetch question/decision from Gemini
  const geminiResponse = await ofetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiApiKey },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 100, temperature: 0.5, topP: 0.9 },
    }),
  });

  const responseText = geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Please provide your full name.';
  console.log('Gemini Response:', responseText);

  // Parse response
  let question = '';
  let decision = null;
  const isFinal = questionCount >= maxQuestions;

  if (isFinal) {
    const match = responseText.match(/^(?:\[)?(APPROVED|DENIED)(?:\])?: (.+)$/i);
    if (match) {
      decision = { status: match[1], reason: match[2] };
    } else {
      decision = { status: 'DENIED', reason: 'Unable to process final decision due to unexpected response format.' };
    }
  } else {
    question = responseText;
  }

  // Generate audio URL with PlayHT
  /* let audioUrl = '';
  try {
    const voiceId = "s3://voice-cloning-zero-shot/e5df2eb3-5153-40fa-9f6e-6e27bbb7a38e/original/manifest.json";
    const audioText = isFinal ? `${decision.status}: ${decision.reason}` : question;
    console.log('PlayHT Request Text:', audioText);

    // Request TTS generation and get SSE stream
    const ttsResponse = await fetch('https://api.play.ht/api/v2/tts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${playhtApiKey}`,
        'X-USER-ID': playhtUserId,
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify({
        text: audioText,
        voice: voiceId,
        output_format: 'mp3',
        speed: 1.0,
        quality: 'medium',
      }),
    });

    if (!ttsResponse.ok) {
      const errorText = await ttsResponse.text();
      console.error('PlayHT Initial Error:', errorText);
      throw new Error(`PlayHT TTS request failed: ${errorText}`);
    }

    // Parse SSE stream to get the audio URL
    const text = await ttsResponse.text();
    console.log('PlayHT SSE Response:', text);
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.startsWith('data:') && line.includes('"url"')) {
        const data = JSON.parse(line.replace('data: ', ''));
        audioUrl = data.url;
        break;
      }
    }

    if (!audioUrl) {
      throw new Error('No audio URL found in PlayHT SSE response');
    }
    console.log('PlayHT Audio URL:', audioUrl);
  } catch (error) {
    console.error('TTS Error:', error.message);
    audioUrl = ''; // Fallback to empty string if TTS fails
  }
 */
  // Update state
  const updatedQuestionCount = questionCount + 1;
  const updatedPreviousQuestions = isFinal ? previousQuestions : [...previousQuestions, question];
  const updatedPreviousAnswers = currentAnswer ? [...previousAnswers, currentAnswer] : previousAnswers;

  return {
    question: isFinal ? '' : question,
    decision: isFinal ? decision : null,
    // audio: audioUrl, // Return URL directly
    questionCount: updatedQuestionCount,
    previousQuestions: updatedPreviousQuestions,
    previousAnswers: updatedPreviousAnswers,
    isFinal,
  };
});