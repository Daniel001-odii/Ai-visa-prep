<template>
  <!-- Introductory questions modal -->
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
            @click="current_question_slide === 2 ? (intro_questions = false, getNextQuestion2()) : current_question_slide++"
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
          <!-- <ClientOnly>
            <Vue3Lottie :animationData="approvedAnimation" :height="200" :width="200" :autoplay="false"
              :speed="1" />
          </ClientOnly> -->
          <img src="../../assets/images/ok.png" class=" size-[200px]" />
          <span class="font-bold text-md text-green-500">VISA APPROVED</span>
          <span class="text-gray-500">Your visa application has been approved. You will receive an email with further
            instructions.</span>
        </div>
        <div v-else class=" flex flex-col justify-center items-center">
          <!-- <ClientOnly>
            <Vue3Lottie :animationData="deniedAnimation" :height="200" :width="200" :autoplay="false"
              :speed="1" />
          </ClientOnly> -->
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



  <!-- CONTAINer -->
  <div class="flex flex-col !h-full pb-12">

    <!-- CHAT AREA -->
    <div class="!h-[700px] flex flex-col gap-4 overflow-y-auto relative border !border-red-500 max-w-[400px] mx-auto p-3" ref="chatContainer" >

      <div class="flex flex-col p-5 text-center">
        <span class="font-bold">{{ questions.visa_type }} Interview</span>
        <span class="text-gray-500">Please provide detailed answers to all questions.</span>
      </div>

      <!-- VO AREA -->
      <div>
        <ClientOnly>
          <div class=" mb-3">
            <Vue3Lottie ref="lottieRef" :animationData="robotAnimation" :height="150" :width="150" :autoplay="false"
              :speed="1" />
          </div>
        </ClientOnly>
      </div>

      <!-- RECOMMENDED ANSWER -->
      <Transition name="fade">
        <div class="">
          <UAlert 
          class=" blur-[1.8px] max-w-[400px]"
          v-if="rec_answer" icon="iconoir:chat-lines" color="green" variant="solid" :description="rec_answer"
            title="Expert Suggetion" />
        </div>
      </Transition>

    </div>

    <!-- TYPING AREA/BOX -->
    <div class=" p-5">
      <!-- Q&A AREA -->
      <div class=" flex flex-col gap-3 min-w-full max-w-[400px] md:min-w-[400px] mx-auto !border-red-500 ">
        <div class="flex flex-col gap-3 w-full border mx-auto p-4 bg-slate-100 dark:bg-slate-800 rounded-3xl !h-[200px]">
          <audio v-if="!loading_q && audioSrc" controls ref="audio" :src="audioSrc" autoplay></audio>
          <div class="flex gap-3 items-start">

            <div class="flex flex-col gap-3 items-start w-full">
              <div class="flex">
                <div v-if="loading_q" class="flex items-center gap-2 w-full">
                  <UIcon name="svg-spinners:3-dots-bounce" />
                  <span class="italic font-bold">VO is typing...</span>
                </div>
                <div v-else class="font-bold text-md flex items-start gap-3">
                  <span>
                    <UButton icon="heroicons:speaker-wave-solid" color="blue" variant="soft" size="[10px]"
                      @click="playAudio" /> {{ currentQuestion }}
                  </span>
                </div>
              </div>

              <form @submit.prevent="getNextQuestion2" class="flex flex-col gap-2 w-full items-start">
                <div class="flex flex-col w-full">
                  <input type="textarea" v-model="userAnswer" placeholder="Your answer here..."
                    class=" outline-none bg-transparent max-h-[200px]"/>
                  <!-- <UTextarea v-model="userAnswer" class=" !w-full outline-none" placeholder="Type your answer here..." /> -->
                  <div class=" flex justify-end items-center gap-3 py-3">
                    <UButton color="blue" :icon="isListening ? 'svg-spinners:bars-scale' : 'heroicons:microphone-solid'"
                      variant="ghost" @click="toggleSpeech" class="w-fit" />
                    <UButton color="blue" class="w-fit" icon="iconoir:arrow-up" type="submit"
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

</template>

<script setup>
// import vo_image from '@/assets/images/table/vo_1.svg';
definePageMeta({
  layout: 'fixed',
});


import vo_image from '@/assets/images/robot.webm';
import { Vue3Lottie } from 'vue3-lottie';
import { countries } from 'countries-list';
import robotAnimation from '../../assets/lottie/robot.json'

import approvedAnimation from '../../assets/lottie/approved.json'
import deniedAnimation from '../../assets/lottie/denied.json'


import { ref, nextTick } from 'vue';

const rec_answer = ref('');

const chatContainer = ref(null);

const scrollToBottom = () => {
  if (chatContainer.value) {
    const { scrollTop, clientHeight, scrollHeight } = chatContainer.value;
    const wasAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (wasAtBottom) {
      nextTick(() => {
        chatContainer.value.scrollTop = scrollHeight - clientHeight;
        console.log("chat scrolled")
      });
    }
  }
};

watch(() => rec_answer, () => {
  // scrollToBottom();
});


// Create a ref to access the Lottie component
const lottieRef = ref(null);

const visa_status_modal = ref(false);


const retryInterView = () => {
  window?.location?.reload()
};

// Method to play the animation
const playAnimation = () => {
  if (lottieRef.value) {
    lottieRef.value.play();
  }
};

// Method to pause the animation
const pauseAnimation = () => {
  if (lottieRef.value) {
    lottieRef.value.pause();
  }
};

const countryList = Object.entries(countries).map(([code, data]) => ({ code, name: data.name }));


const show_answer_pane = ref(true);
const intro_questions = ref(false);
const current_question_slide = ref(0);
const loading_q = ref(false);
const currentQuestion = ref('');
const userAnswer = ref('');
const audioSrc = ref('');
const questionCount = ref(0);
const previousQuestions = ref([]);
const previousAnswers = ref([]);
const isFinal = ref(false);
const decision = ref(null);

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

const audio = ref(null);
const isListening = ref(false);
const recognition = ref(null);

const getNextQuestion2 = async () => {
  loading_q.value = true;
  rec_answer.value = '';
  // playAnimation()
  try {
    const { data, error } = await useFetch('/api/answer', {
      method: 'POST',
      body: {
        candidateData: questions,
        currentAnswer: userAnswer.value,
        questionCount: questionCount.value,
        previousQuestions: previousQuestions.value,
        previousAnswers: previousAnswers.value,
      },
    });

    console.log("returned: ", data);
    // pauseAnimation()

    if (error.value) {
      console.error('Error fetching question:', error.value);
      currentQuestion.value = 'Something went wrong. Please try again.';
    } else {
      currentQuestion.value = data.value.question;
      audioSrc.value = data.value.audio; // Now a URL
      questionCount.value = data.value.questionCount;
      previousQuestions.value = data.value.previousQuestions;
      previousAnswers.value = data.value.previousAnswers;
      isFinal.value = data.value.isFinal;
      decision.value = data.value.decision;
      rec_answer.value = data.value.recommendedReply;

      // scroll chat to bottom..
      // scrollToBottom();

      if (data.value.isFinal) {
        visa_status_modal.value = true;
      }
      // Autoplay handled by <audio> tag with autoplay attribute
      if (audio.value && audioSrc.value) {
        audio.value.load();
        audio.value.play().catch((err) => console.error('Audio playback failed:', err));
      }
      userAnswer.value = '';
    }
  } catch (err) {
    console.error(err);
  }
  loading_q.value = false;
};

const playAudio = () => {
  if (audio.value && audioSrc.value) {
    audio.value.play().catch((err) => console.error('Audio playback failed:', err));
  }
};

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
  getNextQuestion2();
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
  if (useRoute().query.modal) {
    intro_questions.value = true;
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
      // getNextQuestion2();
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
</script>

<style scoped>
/* Fade-Up Transition with Delay */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-up-enter-to,
.fade-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>