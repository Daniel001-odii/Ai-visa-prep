import { ofetch } from 'ofetch';
// import { MsEdgeTTS, OUTPUT_FORMAT } from "edge-tts-node";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";


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
    prompt += `Ask question ${questionCount + 1} of 5, and provide a recommended reply that would be a correct and appropriate answer to that question. Return the question and the recommended reply separated by ' || '. For example: 'What is your purpose of travel? || I am traveling for a business conference.'`;
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
  let recommendedReply = '';
  const isFinal = questionCount >= maxQuestions;

  if (isFinal) {
    const match = responseText.match(/^(?:\[)?(APPROVED|DENIED)(?:\])?: (.+)$/i);
    if (match) {
      decision = { status: match[1], reason: match[2] };
    } else {
      decision = { status: 'DENIED', reason: 'Unable to process final decision due to unexpected response format.' };
    }
  } else {
    const parts = responseText.split(' || ');
    if (parts.length === 2) {
      question = parts[0].trim();
      recommendedReply = parts[1].trim();
    } else {
      question = responseText;
      recommendedReply = 'Unable to generate recommended reply.';
    }
  }

  // Update state
  const updatedQuestionCount = questionCount + 1;
  const updatedPreviousQuestions = isFinal ? previousQuestions : [...previousQuestions, question];
  const updatedPreviousAnswers = currentAnswer ? [...previousAnswers, currentAnswer] : previousAnswers;


  // AUDIO...
  // let audioBase64 = "";
  const createAudio = async()=>{
    try{
      const tts = new MsEdgeTTS();
      await tts.setMetadata("en-US-MichelleNeural", OUTPUT_FORMAT.WEBM_24KHZ_16BIT_MONO_OPUS);
      const { audioFilePath } = await tts.toFile("./tmpfolder", `${isFinal ? '':question}`);  
      // audioBase64 = audioFilePath;
      return audioFilePath;
    }catch(error){
      console.error('error in EDGETTS ', error);
    }
  }
  const audio = createAudio();
/*   try{
    (async () => {
      
  })();
  }catch(error){
   
  } */


  return {
    question: isFinal ? '' : question,
    decision: isFinal ? decision : null,
    recommendedReply: isFinal ? '' : recommendedReply,
    audio,
    questionCount: updatedQuestionCount,
    previousQuestions: updatedPreviousQuestions,
    previousAnswers: updatedPreviousAnswers,
    isFinal,
  };
});