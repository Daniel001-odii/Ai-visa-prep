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
              placeholder="Select visa type" v-model="questions.visa_type" :options="visaTypes" />
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
          <!-- <div class="flex flex-col gap-3 text-orange-500 p-5 bg-orange-500 bg-opacity-10">
            <span class="font-bold">Show expert suggestions in interview?</span>
            <UCheckbox 
              default-value
              v-model="show_expert_suggestions"
              label="Expert Suggestions"
              color="orange"
              description="Show Expert Suggested Answers to Interview Questions"
            />
          </div> -->
        </div>
      </div>

      <template #footer>
        <div :class="current_question_slide > 0 ? 'justify-between' : 'justify-end'" class="flex items-center">
          <UButton v-if="current_question_slide > 0" @click="current_question_slide--" label="Previous" variant="soft"
            icon="heroicons:arrow-small-left-20-solid" />
          <UButton
          :color="current_question_slide === 2 ? 'blue':'primary'"
            @click="current_question_slide === 2 ? (intro_questions = false, getNextQuestion()) : current_question_slide++"
            :label="current_question_slide === 2 ? 'Start Interview' : 'Next'"
            :icon="current_question_slide === 2 ? 'hugeicons:presentation-line-chart-02' : 'heroicons:arrow-small-right-20-solid'" :trailing="true" />
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
          <span v-else>Sorry</span>
        </h2>
      </template>

      <div class="flex flex-col gap-3 p-5 text-center justify-center items-center">

        <div v-if="decision.status == 'APPROVED'" class=" flex flex-col justify-center items-center">
          <img src="../../assets/images/ok.png" class=" size-[150px]" />
          <span class="font-bold text-md text-green-500">VISA APPROVED</span>
          <span class="text-gray-500">Your visa application has been approved. You will receive an email with further
            instructions.</span>
        </div>
        <div v-else class=" flex flex-col justify-center items-center">
          <img src="../../assets/images/cancel.png" class=" size-[150px]" />
          <span class="font-bold text-md text-red-500">VISA DENIED</span>
          <span class="text-gray-500">Your visa application has been denied. Please review the reason below and try
            again
            later.</span>
        </div>
        <span>{{ decision.reason }}</span>
        <UButton color="green" @click="resetInterview()" label="Start New Interview" class="w-fit" />
      </div>
    </UCard>
  </UModal>


  <div class="flex flex-col h-[100dvh] max-h-[100dvh] bg-inherit dark:bg-inherit font-sans">
    <TheNavbar />

    <div class="h-[90%] container mx-auto flex flex-col justify-center items-center p-4 ">

     <!--  <div class=" flex justify-center items-center flex-col h-[350px]">
          <AudioVisualizer ref="visualizer" :audioData="audioSrc" v-if="audioSrc" class=" " />
          <UButton icon="heroicons:speaker-wave-solid" class=" w-fit" v-if="audioSrc" label="play audio" @click="playAudio" />
      </div> -->

      <div class=" w-full md:w-[500px] flex flex-col gap-3 h-full ">

        <!-- CHAT CONTAINER -->
        <div class=" w-full  overflow-y-auto flex flex-col gap-3 h-full" ref="messagesContainer">

          <!-- default message -->
          <div v-if="messages.length == 0"
            class=" flex-1 flex flex-col gap-3 justify-center items-center rounded-xl text-center p-5">
            <div class=" w-[200px]">
              <img src="../../assets/images/woman.png"/>
            </div>
            <!-- <UIcon name="heroicons:information-circle" class=" text-4xl"/> -->
             <h1 class=" font-bold text-2xl">Hold up!</h1>
            <p>Before we begin the interview, please fill out the following form with your personal and visa-related information. This will help us tailor the interview process to your specific needs and ensure a smooth experience.</p>
           <UButton label="Continue" color="yellow" @click="intro_questions = true"/>
          </div>

          <!-- MESSAGES -->
          <div v-if="settings.show_prev_msg" v-for="chat in messages"
            class=" p-3 rounded-md max-w-[65%] bg-slate-500 w-fit"
            :class="chat.sender == 'bot' ? 'bg-opacity-10 self-start' : ' bg-opacity-30 self-end'">
            <span>{{ chat.message }}</span>
          </div>

          <!-- typing status -->
          <div v-if="loading_q" class=" flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE --><circle cx="4" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsBounce0" attributeName="cy" begin="0;svgSpinners3DotsBounce1.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/></circle><circle cx="12" cy="12" r="3" fill="currentColor"><animate attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/></circle><circle cx="20" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsBounce1" attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"/></circle></svg>
            <span class=" p-3">V.O is typing...</span>
          </div>
         
        </div>

        

        <!-- Chat input area -->
        <div class="bg-inherit ">
          <!-- TYPING AREA/BOX -->
          <!-- Q&A AREA -->
          <div v-if="!questions.fullname == ''" class=" flex flex-col gap-3 min-w-full max-w-2xl md:w-[400px] mx-auto !border-red-500 ">
            <UAlert
              v-if="expert_suggestion"
              color="primary"
              variant="soft"
              title="Expert Suggestion"
              :description="expert_suggestion"
              icon="heroicons:sparkles-16-solid"
            />
            <div class="flex flex-col gap-3 w-full mx-auto p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl">
              <audio v-if="!loading_q && audioSrc" controls ref="audio" :src="audioSrc" autoplay class="hidden"></audio>
              <!-- <div class="flex gap-3"> -->
              <div class="flex flex-col gap-3 items-start w-full">
                <form @submit.prevent="getNextQuestion" class="flex flex-col gap-2 w-full items-center">
                  <div class="flex flex-col justify-center w-full">
                    <textarea v-model="userAnswer"
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

import { AVWaveform } from 'vue-audio-visual'
// import { MsEdgeTTS, OUTPUT_FORMAT } from "edge-tts-node";
import audioTrack from '../../tmpfolder/audio.webm'
import { ref, onMounted, nextTick, watch, computed } from 'vue';
import { countries } from 'countries-list';
import { UButton } from '#components';
const countryList = Object.entries(countries).map(([code, data]) => ({ code, name: data.name }));


const messages = ref([]);
const show_message_train = ref(false);
const show_expert_suggestions = ref(false);

const settings = reactive({
  show_prev_msg: true,
  show_rec_answers: true,
});

const isPlaying = ref(false)
const visualizer = ref(null);
const playAudio = async () => {
  if (!isPlaying.value) {
    await nextTick(); // Wait for the DOM to update
    visualizer.value.play();
  }
};


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
  fullname: '',
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
  "Tourist Visa",
  "Work Visa",
  "Student Visa",
  "Transit Visa",
  "Business Visa",
  "Immigrant Visa",
  "Visitor Visa"
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
    audioSrc.value = null;
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

    if(res.isFinal){
      visa_status_modal.value = true;
    }
 
  } catch (err) {
    console.error("error getting questions: ", err);
    let bot_msg = {
      message: "An error occured",
      sender: 'bot',
      error: true,
    };
    messages.value.push(bot_msg);
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

  messages.value = []
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