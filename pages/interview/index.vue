<template>
  <!-- INTRO QUESTIONS -->
  <UModal v-model="intro_questions" :ui="{ container: 'flex items-center justify-center min-h-screen' }">
    <UCard>
      <template #header>
        <h2 class="font-bold text-2xl text-left">Welcome to the Interview</h2>
        <p class="text-gray-500 text-left">Please answer the following introductory questions to proceed.</p>
      </template>

      <div class="flex flex-col gap-0">
        <span v-if="slide_error" class="text-red-500 pb-3">{{ slide_error }}</span>
        <!-- {{ questions }} -->
        <div class="flex flex-col gap-6" v-if="current_question_slide === 0">
          <UFormGroup label="Fullname">
            <UInput v-model="questions.fullname" placeholder="John Doe" />
          </UFormGroup>
          <div class=" flex gap-3 flex-1">
            <UFormGroup label="Nationality" class=" flex-1">
              <USelectMenu searchable searchable-placeholder="Search a country..." class="!w-full lg:w-48"
                placeholder="Select country" v-model="questions.nationality" model-value="Nigeria"
                :options="countryList" value-attribute="name" option-attribute="name" />
            </UFormGroup>
            <UFormGroup label="Target country" class=" flex-1">
              <!-- <USelectMenu searchable searchable-placeholder="Search a country..." class="!w-full lg:w-48"
                placeholder="Select country" v-model="questions.country_applying_to" :options="countryList"
                value-attribute="name" option-attribute="name" /> -->
              <USelectMenu class="!w-full lg:w-48"
                placeholder="Select country" v-model="questions.country_applying_to" :options="countryList"
                value-attribute="name" option-attribute="name" />
            </UFormGroup>
          </div>
          <UFormGroup label="Visa type">
            <USelectMenu searchable searchable-placeholder="Search a visa type" class=" !w-full lg:w-48"
              placeholder="Select visa type" v-model="questions.visa_type" :options="visaTypes" />
          </UFormGroup>
        </div>

        <div class="flex flex-col gap-6" v-if="current_question_slide === 1">

          <UFormGroup label="Ever travelled before?">
            <USelectMenu placeholder="Select an option" v-model="questions.ever_travelled_before"
              :options="yes_no_options" />
          </UFormGroup>
          <UFormGroup label="Ever Had a Visa Refusal?">
            <USelectMenu placeholder="Select an option" v-model="questions.ever_had_visa_refusal"
              :options="yes_no_options" />
          </UFormGroup>
          <UFormGroup label="How would you fund your travel expenses?">
            <USelectMenu placeholder="Select an option" v-model="questions.how_fund_trip" value-attribute="value"
              option-attribute="label" :options="visaFundOptions" />
          </UFormGroup>
        </div>
      </div>

      <template #footer>
        <div :class="current_question_slide > 0 ? 'justify-between' : 'justify-end'" class="flex items-center">
          <UButton v-if="current_question_slide > 0" 
            @click="current_question_slide--" label="Previous" variant="soft"
            icon="heroicons:arrow-small-left-20-solid" />

          <UButton color="primary"
            @click="nextSlide()"
            :label="current_question_slide === 1 ? 'Contnue' : 'Next'"
            icon="heroicons:arrow-small-right-20-solid"
            :trailing="true" />
        </div>
      </template>
    </UCard>
  </UModal>

  <!-- VISA STATUS -->
  <UModal v-model="visa_status_modal" prevent-close
    :ui="{ container: 'flex items-center justify-center min-h-screen' }">
    <UCard>
      <template #header>
        <h2 class="font-bold text-2xl text-left">
          <span v-if="decision?.status == 'APPROVED'">Congratulations!</span>
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

  <!-- TRIAL ENDED -->
  <UModal v-model="trial_ended" prevent-close :ui="{ container: 'flex items-center justify-center min-h-screen' }">
    <UCard>
      <template #header>
        <h2 class="font-bold text-2xl text-left">
          <span>Demo ended</span>
        </h2>
      </template>
      <div class="flex flex-col gap-3 p-5 text-center justify-center items-center">
        <div class=" flex flex-col justify-center items-center">
          <img src="../../assets/images/trial_end.png" class=" size-[150px]" />
          <span class="font-bold">Oops! The demo session just took a nap. Time to log in and wake it up! 😄</span>
        </div>
        <UButton color="green" @click="navigateTo('/login')" label="Sign In & continue" class="w-fit" />
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

    
      <div class=" w-full flex flex-col gap-3 h-full ">

        <!-- inter view details tab -->
        <div class=" py-3 flex justify-between items-center">
          <div class=" flex gap-3 justify-center items-center">
            <UAvatar size="lg"/>
            <div class=" flex flex-col">
              <span>Student Visa Interview - USA</span>
              <div class=" flex gap-3 items-center">
                <small>Inteview in progress</small>
                <span class=" bg-blue-500/20 text-blue-500 px-2 rounded-full flex items-center gap-1"><UIcon name="hugeicons:clock-04"/> 00:00</span>
              </div>
            </div>
          </div>

          <div class=" flex gap-3 items-center">
            <UButton icon="hugeicons:volume-high" variant="ghost" color="blue"/>
            <UButton icon="hugeicons:message-multiple-01" variant="ghost" color="blue"/>
          </div>

        </div>
        <!-- <UDivider/> -->

        <!-- CHAT CONTAINER -->
        <div class=" w-full  overflow-y-auto flex flex-col gap-3 h-full" ref="messagesContainer">

          <!-- default message -->
          <div v-if="messages.length == 0 && !completed_intro_questions"
            class=" flex-1 flex flex-col gap-3 justify-center items-center rounded-xl text-center p-5">
            <div class=" w-[150px]">
              <img src="../../assets/images/woman.png" />
            </div>
            
            <div v-if="hasTriedDemo()" class="flex flex-col justify-center items-center gap-3">
              <h1 class=" font-bold text-2xl">Hold up!</h1>
                <p>You have already tried the free demo. Please sign in to continue enjoying the full experience.</p>
              <UButton label="Sign In" color="green" class="w-fit" @click="navigateTo('/login')" />
            </div>
            <div v-else class="flex flex-col justify-center items-center gap-3">
              <h1 class=" font-bold text-2xl">Hold up!</h1>
              <p>Before we begin the interview, please fill out the following form with your personal and visa-related
                information. This will help us tailor the interview process to your specific needs and ensure a smooth
                experience.</p>
              <UButton label="Continue" class="w-fit" color="blue" @click="openIntroQuestions" />
            </div>

          </div>

          <!-- completed intro questions -->
          <div v-if="completed_intro_questions && !interview_started"
            class=" flex-1 flex flex-col gap-3 justify-center items-center rounded-xl text-center p-5">
            <div class=" w-[200px]">
              <img src="../../assets/images/complete.png" />
            </div>
            <h1 class=" font-bold text-2xl">Ready, Set, Go!</h1>
            <p>You have successfully completed the form. Click "Start Interview" to start your interview with our Visa Officer.</p>
            <UButton label="Start Interview" color="green" @click="getNextQuestion()" />
          </div>
          
          <!-- trial ended -->
          <div v-if="trial_ended"
            class=" flex-1 flex flex-col gap-3 justify-center items-center rounded-xl text-center p-5">
            <div class=" w-[200px]">
              <img src="../../assets/images/woman.png" />
            </div>
            <h1 class=" font-bold text-2xl">Hold up!</h1>
            <p>Before we begin the interview, please fill out the following form with your personal and visa-related
              information. This will help us tailor the interview process to your specific needs and ensure a smooth
              experience.</p>
            <UButton label="Sign Up" @click="navigateTo('/login')" />
          </div>


          <!-- MESSAGES -->
          <div v-if="settings.show_prev_msg" v-for="chat in messages"
            class=" p-3 rounded-md max-w-[65%] bg-blue-500 w-fit shadow-sm"
            :class="chat.sender == 'bot' ? 'bg-opacity-10 self-start' : ' text-white self-end'">
            <span>{{ chat.message }}</span>
          </div>

          <!-- typing status -->
          <div v-if="loading_q" class=" flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
              viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE -->
              <circle cx="4" cy="12" r="3" fill="currentColor">
                <animate id="svgSpinners3DotsBounce0" attributeName="cy" begin="0;svgSpinners3DotsBounce1.end+0.25s"
                  calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" />
              </circle>
              <circle cx="12" cy="12" r="3" fill="currentColor">
                <animate attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.1s" calcMode="spline" dur="0.6s"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" />
              </circle>
              <circle cx="20" cy="12" r="3" fill="currentColor">
                <animate id="svgSpinners3DotsBounce1" attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.2s"
                  calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" />
              </circle>
            </svg>
            <span class=" p-3">V.O is typing...</span>
          </div>

        </div>



        <!-- Chat input area -->
        <div class="bg-inherit ">
          <!-- TYPING AREA/BOX -->
          <!-- Q&A AREA -->
          <div class=" flex flex-col gap-3 min-w-full max-w-2xl md:w-[400px] mx-auto !border-red-500 ">
            <!-- <UAlert  color="primary" variant="soft" title="Expert Suggestion"
              :description="expert_suggestion" icon="heroicons:sparkles-16-solid" /> -->
            <div class=" flex overflow-x-auto">
              <span @click="[userAnswer = expert_suggestion]" v-if="expert_suggestion" class=" rounded-full bg-slate-50/20 py-2 px-3 cursor-pointer text-nowrap truncate">{{expert_suggestion}}</span>
            </div>
            <div class="flex flex-col gap-3 w-full mx-auto p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl">
              <audio v-if="!loading_q && audioSrc" controls ref="audio" :src="audioSrc" autoplay class="hidden"></audio>
              <!-- <div class="flex gap-3"> -->
              <div class="flex flex-col gap-3 items-start w-full">
                <form @submit.prevent="getNextQuestion" class="flex flex-col gap-2 w-full items-center">
                  <div class="flex flex-col justify-center w-full">
                    <textarea :disabled="!interview_started || trial_ended" v-model="userAnswer"
                      class=" !w-full outline-none !bg-inherit" placeholder="Type your answer here..."></textarea>

                    <div class=" flex justify-end items-center gap-3">
                      <UButton color="blue" :disabled="!interview_started || trial_ended"
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

import { ref, onMounted, nextTick, watch, computed } from 'vue';
import { countries } from 'countries-list';
import { UButton } from '#components';
const countryList = Object.entries(countries).map(([code, data]) => ({ code, name: data.name }));


const messages = ref([]);
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

const messagesContainer = ref(null);

const user = ref(null);
const expert_suggestion = ref('');
const visa_status_modal = ref(false);

const isListening = ref(false);
const recognition = ref(null);
const trial_ended = ref(false);

const slide_error = ref('');

const settings = reactive({
  show_prev_msg: true,
  show_rec_answers: true,
});

const completed_intro_questions = ref(false);
const openIntroQuestions = () => {
  intro_questions.value = true
}

const hasTriedDemo =()=>{
  return localStorage.getItem('demo')
}

const interview_started = ref(false);
const nextSlide =()=>{
  if(current_question_slide.value == 0 
  && questions.fullname == ''
  || questions.nationality == ''
  || questions.country_applying_to == ''
  || questions.visa_type == ''
  ){
    // slide_error.value = 'all fields are required' 
    return
  } else {
    current_question_slide.value += 1;
    slide_error.value = null
  }

  if(current_question_slide.value == 1
    && questions.ever_travelled_before == ''
    || questions.ever_had_visa_refusal == ''
    || questions.how_fund_trip == ''
  ){
    // slide_error.value = 'all fields are required' 
    return
  } else {
    // current_question_slide === 1 ? (intro_questions = false, storeTempUserData(), completed_intro_questions = true) : 
    completed_intro_questions.value = true
    intro_questions.value = false;
    
    storeTempUserData()
    slide_error.value = null
  }
}

// Methods

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};



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
  country_applying_to: '',
  visa_type: 'Student visa',
  ever_travelled_before: 'yes',
  ever_had_visa_refusal: 'yes',
  how_fund_trip: '',
  occupation: 'Software Engineering',
  have_all_documents: 'yes'
});


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

const storeTempUserData =()=>{
  localStorage.setItem('anon_user_data', JSON.stringify(questions));
  console.log("anon user data stored...")
}
const yes_no_options = ["yes", "no"];


const getNextQuestion = async () => {
  interview_started.value = true;
  loading_q.value = true;
  try {
    storeTempUserData()
    expert_suggestion.value = '';
    audioSrc.value = null;
    scrollToBottom();


    // add to messages array...
    if(messages.value.length > 0){
      let chat = {
        message: userAnswer.value,
        sender: 'user'
      };
      messages.value.push(chat);
    }
    

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

    if (res.isFinal) {
      visa_status_modal.value = true;
      localStorage.setItem('demo', true);
    }

  } catch (err) {
    console.error("error getting questions: ", err);
    let bot_msg = {
      message: "An error occured",
      sender: 'bot',
      error: true,
    };
    messages.value.push(bot_msg);
    if (err.status == '403') {
      trial_ended.value = true;
    }
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
import { useUserStore } from '#imports';

onMounted(() => {
  user.value = useUserStore().user;
  if (useUserStore().user) {
    questions.fullname = user.name;
    questions.country_applying_to = user.target_country;
    questions.nationality = user.nationality;
    questions.visa_type = user.visa_type;
  }
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