<template>
  <div class="flex flex-col h-[100dvh] max-h-[100dvh] bg-inherit text-white font-sans"
    :class="{ 'opacity-80': isThinking }">
    <!-- Chat header (if needed) -->
   <!--  <div class="flex items-center p-4 border-b border-gray-800">
      <div class="mr-4 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
          class="fill-none stroke-current stroke-2">
          <circle cx="12" cy="12" r="10" />
          <line x1="7" y1="12" x2="17" y2="12" />
        </svg>
      </div>
      <div class="flex flex-col justify-center">
        <div class="text-lg font-medium">Good evening</div>
        <div class="text-sm text-gray-400">How can I help you today?</div>
      </div>
    </div>
 -->
    <TheNavbar/>

    <!-- Chat messages container with scroll -->
    <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-4" ref="messagesContainer">

      <!-- Default/permanent messages -->
      <!-- VO AREA -->
      <div class=" flex justify-center items-center">
        <span>New Student Visa Interview</span>
      </div>


    </div>

    <!-- Chat input area -->
    <div class="border-t border-gray-800 p-4">
      <div class="flex flex-col">

        <!-- TYPING AREA/BOX -->
        
        <!-- Q&A AREA -->
        <div class=" flex flex-col gap-3 min-w-full max-w-2xl md:min-w-[400px] mx-auto !border-red-500 ">
          <div class="flex flex-col gap-3 w-full border mx-auto p-4 bg-slate-100 dark:bg-slate-800 rounded-3xl">
            <audio v-if="!loading_q && audioSrc" controls ref="audio" :src="audioSrc" autoplay></audio>
            <div class="flex gap-3">

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
                      class=" outline-none bg-transparent max-h-[200px]" />
                    <!-- <UTextarea v-model="userAnswer" class=" !w-full outline-none" placeholder="Type your answer here..." /> -->
                    <div class=" flex justify-end items-center gap-3">
                      <UButton color="blue"
                        :icon="isListening ? 'svg-spinners:bars-scale' : 'heroicons:microphone-solid'" variant="ghost"
                        @click="toggleSpeech" class="w-fit" />
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
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'plain',
});

import { ref, onMounted, nextTick, watch, computed } from 'vue';
import { countries } from 'countries-list';


;

// Computed properties
/* const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${props.userName}`;
  if (hour < 18) return `Good afternoon, ${props.userName}`;
  return `Good evening, ${props.userName}`;
});
 */

// Methods
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
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

// Watch for changes in messages to auto-scroll
/* watch(messages, () => {
  scrollToBottom();
}, { deep: true }); */

// Lifecycle hook
onMounted(() => {
  scrollToBottom();
});
</script>