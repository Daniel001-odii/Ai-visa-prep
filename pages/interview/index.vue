<template>
  <UModal v-model="intro_questions" prevent-close>
    <UCard>
      <template #header>
        <h2 class="font-bold text-2xl text-left">Welcome to the Interview</h2>
        <p class="text-gray-500 text-left">Please answer the following introductory questions to proceed.</p>
      </template>

      <div class="flex flex-col gap-0">
        <div class="flex flex-col gap-6" v-if="current_question_slide === 0">
          <div class="flex flex-col gap-3 p-0">
            <span class="font-bold">Your Fullname?</span>
            <UInput v-model="questions.fullname" placeholder="Enter your name" />
          </div>
          <div class="flex flex-col gap-3">
            <span class="font-bold">Nationality {{ questions.nationality }}</span>
            <USelectMenu searchable searchable-placeholder="Search a country..." class="!w-full lg:w-48"
              placeholder="Select country" v-model="questions.nationality" :options="countryList" value-attribute="name"
              option-attribute="name" />
          </div>
          <div class="flex flex-col gap-3">
            <span class="font-bold">Country Applying to {{ questions.country_applying_to }}</span>
            <USelectMenu searchable searchable-placeholder="Search a country..." class="!w-full lg:w-48"
              placeholder="Select country" v-model="questions.country_applying_to" :options="countryList"
              value-attribute="name" option-attribute="name" />
          </div>
        </div>

        <div class="flex flex-col gap-6" v-if="current_question_slide === 1">
          <div class="flex flex-col gap-3">
            <span class="font-bold">Visa Type</span>
            <USelectMenu searchable searchable-placeholder="Search a visa type" class=" !w-full lg:w-48"
              placeholder="Select visa type" v-model="questions.visa_type" :options="visaTypes" value-attribute="type"
              option-attribute="type" />
          </div>
          <div class="flex flex-col gap-3">
            <span class="font-bold">Ever Travelled Before?</span>
            <USelectMenu placeholder="Select an option" v-model="questions.ever_travelled_before"
              :options="yes_no_options" />
          </div>
          <div class="flex flex-col gap-3">
            <span class="font-bold">Ever Had a Visa Refusal?</span>
            <USelectMenu placeholder="Select an option" v-model="questions.ever_had_visa_refusal"
              :options="yes_no_options" />
          </div>
        </div>

        <div class="flex flex-col gap-6" v-if="current_question_slide === 2">
          <div class="flex flex-col gap-3">
            <span class="font-bold">How will you fund your trip?</span>
            <USelectMenu placeholder="Select an option" v-model="questions.how_fund_trip" value-attribute="value"
              option-attribute="label" :options="visaFundOptions" />
          </div>
          <div class="flex flex-col gap-3">
            <span class="font-bold">What do you do for a living?</span>
            <UInput v-model="questions.occupation" placeholder="What do you do for a living?" />
          </div>
          <div class="flex flex-col gap-3">
            <span class="font-bold">Do you have all the required documents?</span>
            <USelectMenu placeholder="Select an option" v-model="questions.have_all_documents"
              :options="yes_no_options" />
          </div>
        </div>
      </div>

      <template #footer>
        <div :class="current_question_slide > 0 ? 'justify-between' : 'justify-end'" class="flex items-center">
          <UButton v-if="current_question_slide > 0" @click="current_question_slide--" label="Previous" variant="soft"
            icon="heroicons:arrow-small-left-20-solid" />
          <UButton
            @click="current_question_slide === 2 ? (intro_questions = false, getNextQuestion()) : current_question_slide++"
            :label="current_question_slide === 2 ? 'Start Interview' : 'Next'"
            :icon="current_question_slide === 2 ? '' : 'heroicons:arrow-small-right-20-solid'" :trailing="true" />
        </div>
      </template>
    </UCard>
  </UModal>

  <!-- VISA STATUS -->
  <UModal v-model="visa_status_modal" prevent-close>
    <UCard>
      <template #header>
        <h2 class="font-bold text-2xl text-left">
          <span v-if="decision.status == 'APPROVED'">Congratulations!</span>
          <span v-else>You can try again</span>
        </h2>
      </template>

      <div class="flex flex-col gap-3 p-5 text-center justify-center items-center">

        <div v-if="decision.status == 'APPROVED'" class=" flex flex-col justify-center items-center">
          <img src="../../assets/images/ok.png" class=" size-[200px]" />
          <span class="font-bold text-md text-green-500">VISA APPROVED</span>
          <span class="text-gray-500">Your visa application has been approved. You will receive an email with further
            instructions.</span>
        </div>
        <div v-else class=" flex flex-col justify-center items-center">
          <img src="../../assets/images/cancel.png" class=" size-[200px]" />
          <span class="font-bold text-md text-red-500">VISA DENIED</span>
          <span class="text-gray-500">Your visa application has been denied. Please review the reason below and try
            again
            later.</span>
        </div>
        <span>{{ decision.reason }}</span>
        <UButton color="green" @click="retryInterView()" label="Start New Interview" class="w-fit" />
      </div>
    </UCard>
  </UModal>


  <div class="flex flex-col h-[100dvh] max-h-[100dvh] bg-inherit dark:bg-inherit font-sans">
    <TheNavbar />

    <div class="h-[90%] container mx-auto flex flex-col justify-center items-center">

      <div class=" flex justify-center items-center flex-col">
        <AudioVisualizer :audio-base64="audioSrc" />
        <span>VISUALIZER HERE</span>
      </div>

      <div class=" w-full md:w-[500px] p-4 flex flex-col gap-3">

        <!-- CHAT CONTAINER -->
        <div class=" w-full h-[250px] overflow-y-auto flex flex-col gap-3 " ref="messagesContainer">

          <!-- MESSAGES -->
          <div v-if="settings.show_prev_msg" v-for="chat in messages" class=" p-3 rounded-md max-w-[65%] bg-slate-500 w-fit border"
            :class="chat.sender == 'bot' ? 'bg-opacity-10 self-start' : ' bg-opacity-30 self-end'">
            <span>{{ chat.message }}</span>
          </div>

          <span v-if="loading_q" class=" p-3">VO is typing...</span>


        </div>


        <!-- Chat input area -->
        <div class="bg-inherit ">
          <!-- TYPING AREA/BOX -->
          <!-- Q&A AREA -->
          <div class=" flex flex-col gap-3 min-w-full max-w-2xl md:w-[400px] mx-auto !border-red-500 ">
            <div class="flex flex-col gap-3 w-full mx-auto p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl">
              <audio v-if="!loading_q && audioSrc" controls ref="audio" :src="audioSrc" autoplay class="hidden"></audio>
              <!-- <div class="flex gap-3"> -->
              <div class="flex flex-col gap-3 items-start w-full">
                <form @submit.prevent="getNextQuestion" class="flex flex-col gap-2 w-full items-center">
                  <div class="flex flex-col justify-center w-full">
                    <textarea @blur="userAnswer == '' ? (check_me = false) : (check_me = true)" v-model="userAnswer"
                      class=" !w-full outline-none !bg-inherit" placeholder="Type your answer here..."></textarea>

                    <div class=" flex justify-end items-center gap-3">
                      <UButton color="blue"
                        :icon="isListening ? 'svg-spinners:bars-scale' : 'heroicons:microphone-solid'" variant="ghost"
                        @click="toggleSpeech" class="w-fit" />
                      <UButton color="blue" class="w-fit" icon="heroicons:arrow-up-solid" type="submit"
                        :variant="userAnswer.trim() == '' ? 'ghost' : 'solid'"
                        :disabled="loading_q || userAnswer.trim() == ''"
                        loading-icon="svg-spinners:12-dots-scale-rotate" />
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'plain',
});


// import { MsEdgeTTS, OUTPUT_FORMAT } from "edge-tts-node";
import audioTrack from '../../tmpfolder/audio.webm'
import { ref, onMounted, nextTick, watch, computed } from 'vue';
import { countries } from 'countries-list';
import { UButton } from '#components';
const countryList = Object.entries(countries).map(([code, data]) => ({ code, name: data.name }));

const check_me = ref(false)
const messages = ref([]);
const show_message_train = ref(false);

const settings = reactive({
  show_prev_msg: true,
  show_rec_answers: true,
});

/* const playAudioMain = () => {
  if (audio.value && audioSrc.value) {
    audio.value.play().catch((err) => console.error('Audio playback failed:', err));
  }
}; */


// Methods
const messagesContainer = ref(null);
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const intro_questions = ref(false);
const current_question_slide = ref(0);
const loading_q = ref(false);
const currentQuestion = ref('');
const userAnswer = ref('');

const audioSrc = ref('');
const audio = ref(null);

const questionCount = ref(0);
const previousQuestions = ref([]);
const previousAnswers = ref([]);
const isFinal = ref(false);
const decision = ref(null);

/* const questions = reactive({
  fullname: '',
  nationality: '',
  country_applying_to: '',
  visa_type: '',
  ever_travelled_before: '',
  ever_had_visa_refusal: '',
  how_fund_trip: '',
  occupation: '',
  have_all_documents: ''
}); */

const questions = reactive({
  fullname: 'Odii chibuikem daniel',
  nationality: 'Nigeria',
  country_applying_to: 'United States',
  visa_type: 'Student visa',
  ever_travelled_before: 'no',
  ever_had_visa_refusal: 'no',
  how_fund_trip: '',
  occupation: 'Software Engineering',
  have_all_documents: 'yes'
});





const expert_suggestion = ref('');
const visa_status_modal = ref(false);
const retryInterView = () => {
  window?.location?.reload()
};

const visaTypes = [
  { type: "Tourist Visa", description: "For leisure travel and short visits." },
  { type: "Business Visa", description: "For business meetings and professional activities." },
  { type: "Student Visa", description: "For studying in an educational institution abroad." },
  { type: "Work Visa", description: "For employment in a foreign country." },
  { type: "Transit Visa", description: "For short stays while traveling to another destination." }
];

const visaFundOptions = [
  { value: "self_funded", label: "Self-Funded (Personal Savings)" },
  { value: "family_sponsor", label: "Sponsored by Family/Relative" },
  { value: "employer_sponsor", label: "Sponsored by Employer" },
  { value: "scholarship", label: "Scholarship or Grant" },
  { value: "education_loan", label: "Education Loan" },
  { value: "government_sponsor", label: "Government Sponsorship" },
  { value: "business_funds", label: "Business or Corporate Sponsorship" },
  { value: "crowdfunding", label: "Crowdfunding or Public Donations" },
  { value: "combination", label: "Combination of Multiple Sources" }
];

const yes_no_options = ["Yes", "No"];


const isListening = ref(false);
const recognition = ref(null);

const getNextQuestion = async () => {
  loading_q.value = true;
  try {

    expert_suggestion.value = '';
    scrollToBottom();


    // add to messages array...
    let chat = {
      message: userAnswer.value,
      sender: 'user'
    };
    messages.value.push(chat);

    const res = await useNuxtApp().$apiFetch('/visa/question', {
      method: 'POST',
      body: {
        candidateData: questions,
        currentAnswer: userAnswer.value,
        questionCount: questionCount.value,
        previousQuestions: previousQuestions.value,
        previousAnswers: previousAnswers.value,
      }
    });

    scrollToBottom();

    let bot_msg = {
      message: res.question,
      sender: 'bot'
    };
    messages.value.push(bot_msg);
    audioSrc.value = res.audioPath;
    userAnswer.value = '';
    currentQuestion.value = res.question;
    questionCount.value = res.questionCount;
    previousQuestions.value = res.previousQuestions;
    isFinal.value = res.isFinal;
    decision.value = res.decision;
    expert_suggestion.value = res.recommendedReply;

    console.log("retunred res: ", res);

  /*   currentQuestion.value = data.value.question;
      audioSrc.value = `${audioTrack}`; // Now a URL
      questionCount.value = data.value.questionCount;
      previousQuestions.value = data.value.previousQuestions;
      previousAnswers.value = data.value.previousAnswers;
      isFinal.value = data.value.isFinal;
      decision.value = data.value.decision;
      expert_suggestion.value = data.value.recommendedReply; */

  } catch (err) {
    console.error("error getting questions: ", err)
  }
  loading_q.value = false;
}

const resetInterview = () => {
  visa_status_modal.value = false;
  questionCount.value = 0;
  previousQuestions.value = [];
  previousAnswers.value = [];
  isFinal.value = false;
  decision.value = null;
  currentQuestion.value = '';
  userAnswer.value = '';
  audioSrc.value = '';
  getNextQuestion();
};

const toggleSpeech = () => {
  if (!recognition.value) {
    alert('Speech recognition is not supported in your browser.');
    return;
  }

  if (isListening.value) {
    recognition.value.stop();
  } else {
    recognition.value.start();
    isListening.value = true;
  }
};

onMounted(() => {


  /*   if (useRoute().query.modal) {
      intro_questions.value = true;
    } */

  // Initialize SpeechRecognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition.value = new SpeechRecognition();
    recognition.value.continuous = false;
    recognition.value.interimResults = false;
    recognition.value.lang = 'en-US';

    recognition.value.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      userAnswer.value = transcript;
    };

    recognition.value.onend = () => {
      isListening.value = false;
      // Optionally auto-submit after speech
      // getNextQuestion();
    };

    recognition.value.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      isListening.value = false;
      alert('Speech recognition failed. Please try again or type your answer.');
    };
  } else {
    console.warn('SpeechRecognition not supported in this browser.');
  }
});

onUnmounted(() => {
  if (recognition.value) recognition.value.stop();
});

// Watch for changes in messages to auto-scroll
watch(messages, () => {
  scrollToBottom();
}, { deep: true });

// Lifecycle hook
onMounted(() => {
  scrollToBottom();
  // getNextQuestion()
});

</script>