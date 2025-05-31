<template>
    <UModal v-model="exit_interview_modal">
    <UCard>
      <template #header>
        <b>Exit Interview?</b>
      </template>
      <div class=" flex flex-col">
        <div class=" flex flex-col ">
          <p class="font-bold text-lg ">Are you sure you want to exit this interview session?</p>
          <small>Exiting this interview session will automatically clear both the interview and the chats, this cannot be undone.</small>
        </div>
       
        <div class=" flex items-end justify-end gap-4 mt-6">
          <UButton @click="exit_interview_modal = !exit_interview_modal" label="Continue" variant="soft" color="blue" />
          <UButton 
          @click="deleteInterview(useRoute().params.id)" 
          label="Exit" 
          variant="solid" 
          color="red"
          class=" !text-white" />
        </div>
      </div>
    </UCard>
  </UModal>

  <!-- VISA STATUS -->
  <UModal
    v-model="visa_status_modal"
    prevent-close
    :ui="{ container: 'flex items-center justify-center min-h-screen' }"
  >
    <UCard>
      <template #header>
        <h2 class="font-bold text-2xl text-left">
          <span v-if="decision?.status == 'APPROVED'">Congratulations!</span>
          <span v-else>Sorry</span>
        </h2>
      </template>

      <div
        class="flex flex-col gap-3 p-5 text-center justify-center items-center"
      >
        <div
          v-if="decision.status == 'APPROVED'"
          class="flex flex-col justify-center items-center"
        >
          <img src="../../../assets/images/ok.png" class="size-[150px]" />
          <span class="font-bold text-md text-green-500">VISA APPROVED</span>
          <span class="text-gray-500"
            >Your visa application has been approved. You will receive an email
            with further instructions.</span
          >
        </div>
        <div v-else class="flex flex-col justify-center items-center">
          <img src="../../../assets/images/cancel.png" class="size-[150px]" />
          <span class="font-bold text-md text-red-500">VISA DENIED</span>
          <span class="text-gray-500"
            >Your visa application has been denied. Please review the reason
            below and try again later.</span
          >
        </div>
        <span>{{ decision.reason }}</span>
        <UButton
          color="green"
          @click="navigateTo('/in/interviews')"
          label="Continue"
          class="w-fit"
        />
      </div>
    </UCard>
  </UModal>

  <div
    class="flex flex-col h-[100dvh] max-h-[100dvh] bg-inherit dark:bg-inherit font-sans"
  >
    <!-- <TheNavbar /> -->

    <div
      class="h-[90%] flex-1 container mx-auto flex flex-col justify-center items-center p-2"
    >
      <div class="w-full flex flex-col gap-3 h-full">
        <!-- inter view details tab -->
        <div
          v-if="interview_started || interviewAlreadyExist"
          class="py-3 flex justify-between items-center"
        >
          <div class="flex gap-3 justify-center items-center">
            <!-- <UAvatar size="lg"/> -->
            <div class="flex flex-col">
              <span>{{ interview.visa_type }} Interview - {{ interview.country }}</span>
              <div class="flex gap-3 items-center">
                <small>Inteview in progress</small>
               
                  <UBadge
                    :icon="
                      interview?.status == 'approved'
                        ? 'lucide:circle-check'
                        : 'lucide:circle-x'
                    "
                    size="sm"
                    color="green"
                    variant="outline"
                    >{{ interview?.status }}</UBadge
                  >
                  <span v-if="!interviewAlreadyExist">{{ formattedTime }}</span>
                  <span v-else>{{ formattedDuration(interview?.duration) }}</span>
              </div>
            </div>
          </div>

          <div class="flex gap-3 items-center">
            <UButton
              icon="hugeicons:volume-high"
              variant="ghost"
              color="blue"
              :disabled="interviewAlreadyExist"
            />
            <UButton
              icon="heroicons:arrow-right-on-rectangle"
              variant="ghost"
              color="red"
              @click="[
                interviewAlreadyExist ? (navigateTo('/in/interviews')) : (exit_interview_modal = true)
              ]"
            />
          </div>
        </div>

        <!-- CHAT CONTAINER -->
        <div
          class="w-full overflow-y-auto flex flex-col gap-3 h-full p-3"
          ref="messagesContainer"
        >
          <!-- default message -->
          <div
            v-if="messages.length == 0 && !interview_started"
            class="flex-1 flex flex-col gap-3 justify-center items-center p-5"
          >
            <div
              class="flex flex-col-reverse justify-center items-center text-center"
            >
              <span class="font-bold text-3xl">Welcome Back!</span>
            </div>

            <div
              class="flex justify-center items-center text-center w-full rounded-lg p-5"
            >
              
              <UButton
                label="Start Now"
                class="w-fit"
                color="blue"
                trailing-icon="i-lucide-arrow-right"
                size="xl"
                :disabled="loading"
                :loading="loading"
                @click="newInterview()"
              />
            </div>
          </div>

          <!-- MESSAGES -->
          <div
            v-for="chat in messages"
            class="flex gap-3 items-start  md:max-w-[65%] max-w-[80%]"
            :class="
              [chat.sender == 'bot'
                ? 'self-start'
                : 'self-end', chat.sender == 'bot'
                ? 'flex-row'
                : 'flex-row-reverse' ]"
          >
            <UAvatar :text="chat.sender == 'bot' ? 'VO' : null" 
            :src="chat.sender == 'bot' ? null : user?.profile_img"
            :alt="user?.name ? user?.name[0] : 'VO'" size="md"/>
            <div
            class="p-3 rounded-md bg-blue-500 w-fit shadow-sm"
            :class="
              chat.sender == 'bot'
                ? 'bg-opacity-10'
                : ' text-white'
            "
          >
            <span>{{ chat.message }}</span>
          </div>

          </div>
          <!-- <div
            v-for="chat in messages"
            class="p-3 rounded-md max-w-[65%] bg-blue-500 w-fit shadow-sm"
            :class="
              chat.sender == 'bot'
                ? 'bg-opacity-10 self-start'
                : ' text-white self-end'
            "
          >
            <span>{{ chat.message }}</span>
          </div>
 -->

          <!-- EXPERT SUGGESTION -->
          <div
            v-if="expert_suggestion && user?.settings?.expert_suggestions"
            class="p-3 rounded-md max-w-[65%] border-dashed border w-fit shadow-sm text-blue-500 bg-blue-500/5 border-blue-500 self-end flex gap-3"
          >
            <UIcon name="heroicons:sparkles-16-solid" class="flex-1" />
            <div class="flex flex-col">
              <span class="font-bold">Expert Suggestion</span>
              <span class="">{{ expert_suggestion }}</span>
              <div class="flex gap-3 justify-end items-end mt-4">
                <UButton
                  @click="acceptExpertSuggestion()"
                  label="Accept"
                  icon="heroicons:check-20-solid"
                  size="xs"
                  variant="soft"
                  color="green"
                />
                <UButton
                  @click="expert_suggestion = null"
                  label="Cancel"
                  icon="heroicons:x-mark-20-solid"
                  size="xs"
                  variant="soft"
                  color="red"
                />
              </div>
            </div>
          </div>

          <!-- typing status -->
          <div v-if="loading_q" class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE -->
              <circle cx="4" cy="12" r="3" fill="currentColor">
                <animate
                  id="svgSpinners3DotsBounce0"
                  attributeName="cy"
                  begin="0;svgSpinners3DotsBounce1.end+0.25s"
                  calcMode="spline"
                  dur="0.6s"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33"
                  values="12;6;12"
                />
              </circle>
              <circle cx="12" cy="12" r="3" fill="currentColor">
                <animate
                  attributeName="cy"
                  begin="svgSpinners3DotsBounce0.begin+0.1s"
                  calcMode="spline"
                  dur="0.6s"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33"
                  values="12;6;12"
                />
              </circle>
              <circle cx="20" cy="12" r="3" fill="currentColor">
                <animate
                  id="svgSpinners3DotsBounce1"
                  attributeName="cy"
                  begin="svgSpinners3DotsBounce0.begin+0.2s"
                  calcMode="spline"
                  dur="0.6s"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33"
                  values="12;6;12"
                />
              </circle>
            </svg>
            <span class="p-3">V.O is typing...</span>
          </div>
        </div>

        <!-- Chat input area -->
        <div class="bg-inherit">
          <!-- TYPING AREA/BOX -->
          <!-- Q&A AREA -->
          <div
            class="flex flex-col gap-3 min-w-full max-w-2xl md:w-[400px] mx-auto !border-red-500"
          >
            <div
              class="flex flex-col gap-3 w-full mx-auto p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl"
            >
              <audio
                v-if="!loading_q && audioSrc && user?.settings.voice_over"
                controls
                ref="audio"
                :src="audioSrc"
                autoplay
                class="hidden"
              ></audio>
              <!-- <div class="flex gap-3"> -->
              <div class="flex flex-col gap-3 items-start w-full">
                <form
                  @submit.prevent="getNextQuestion"
                  class="flex flex-col gap-2 w-full items-center"
                >
                  <div class="flex flex-col justify-center w-full">
                    <textarea
                      :disabled="!interview_started"
                      v-model="userAnswer"
                      class="!w-full outline-none !bg-inherit"
                      placeholder="Type your answer here..."
                    ></textarea>

                    <div class="flex justify-end items-center gap-3">
                      <UButton
                        color="blue"
                        :disabled="!interview_started"
                        :icon="
                          isListening
                            ? 'svg-spinners:bars-scale'
                            : 'heroicons:microphone-solid'
                        "
                        variant="ghost"
                        @click="toggleSpeech"
                        class="w-fit"
                      />
                      <UButton
                        color="blue"
                        class="w-fit"
                        icon="heroicons:arrow-up-solid"
                        type="submit"
                        :variant="userAnswer.trim() == '' ? 'ghost' : 'solid'"
                        :disabled="loading_q || userAnswer.trim() == ''"
                        loading-icon="svg-spinners:12-dots-scale-rotate"
                      />
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
  layout: "plain",
});

import { ref, onMounted, nextTick, watch } from "vue";
import { useUserStore } from "#imports";

const messages = ref([]);
const loading_q = ref(false);
const currentQuestion = ref("");
const userAnswer = ref("");

const audioSrc = ref("");
const audio = ref(null);

const questionCount = ref(0);
const previousQuestions = ref([]);
const previousAnswers = ref([]);

const isFinal = ref(false);
const decision = ref(null);

const messagesContainer = ref(null);
const expert_suggestion = ref("");
const visa_status_modal = ref(false);

const isListening = ref(false);
const recognition = ref(null);

const interview_started = ref(false);
const user = ref(null);
const visa_progress = ref(10);

const exit_interview_modal = ref(false);

const time = ref(0);
let timer = null
const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (time.value % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
})

function start() {
  timer = setInterval(() => {
    time.value++
  }, 1000)
}

function stop() {
  clearInterval(timer)
}
function reset() {
  stop()
  time.value = 0
}

const formattedDuration = (time) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (time % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
};


// Methods
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const acceptExpertSuggestion = () => {
  userAnswer.value = expert_suggestion.value;
  getNextQuestion();
};

const loading = ref(false);

const getNextQuestion = async () => {
  interview_started.value = true;
  loading_q.value = true;
  try {
    expert_suggestion.value = "";
    audioSrc.value = null;
    scrollToBottom();

    // add to messages array...
    if (messages.value.length > 0) {
      let chat = {
        message: userAnswer.value,
        sender: "user",
      };
      messages.value.push(chat);
    }
    previousAnswers.value.push(userAnswer.value);
    // previousQuestions.value.push(currentQuestion.value);

    const res = await useNuxtApp().$apiFetch(
      `/visa/interview/${useRoute().params.id}/start`,
      {
        method: "POST",
        body: {
          currentAnswer: userAnswer.value,
          questionCount: questionCount.value,
          previousQuestions: previousQuestions.value,
          previousAnswers: previousAnswers.value,
          current_time: time.value,
        },
      }
    );

    scrollToBottom();

    let bot_msg = {
      message: res.question,
      sender: "bot",
    };
    messages.value.push(bot_msg);
    audioSrc.value = res.audioPath;
    userAnswer.value = "";
    currentQuestion.value = res.question;
    questionCount.value = res.questionCount;
    previousQuestions.value = res.previousQuestions;
    isFinal.value = res.isFinal;
    decision.value = res.decision;
    expert_suggestion.value = res.recommendedReply;
    console.log("retunred res: ", res);

    if (res.isFinal) {
      visa_status_modal.value = true;
      reset();
    }
  } catch (err) {
    console.error("error getting questions: ", err);
    let bot_msg = {
      message: "An error occured",
      sender: "bot",
      error: true,
    };
    messages.value.push(bot_msg);
  }
  loading_q.value = false;
};

const resetInterview = () => {
  visa_status_modal.value = false;
  questionCount.value = 0;
  previousQuestions.value = [];
  previousAnswers.value = [];
  isFinal.value = false;
  decision.value = null;
  currentQuestion.value = "";
  userAnswer.value = "";
  audioSrc.value = "";

  messages.value = [];
  getNextQuestion();
};

const toggleSpeech = () => {
  if (!recognition.value) {
    alert("Speech recognition is not supported in your browser.");
    return;
  }

  if (isListening.value) {
    recognition.value.stop();
  } else {
    recognition.value.start();
    isListening.value = true;
  }
};

const greeting = () => {
  // Get the current hour (0-23)
  const currentHour = new Date().getHours();

  // Determine the greeting based on time
  let timeGreeting;
  if (currentHour >= 5 && currentHour < 12) {
    timeGreeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    timeGreeting = "Good Afternoon";
  } else if (currentHour >= 17 && currentHour < 22) {
    timeGreeting = "Good Evening";
  } else {
    timeGreeting = "Good Night";
  }

  // Return the personalized greeting
  return timeGreeting;
};

const interviewAlreadyExist = ref(false);
const interview = reactive({
  visa_type: "",
  country: "",
  status: "",
  duration: "",
  createdAt: "",
});

const getInterviewMessages = async () => {
  try {
    const res = await useNuxtApp().$apiFetch(
      `/visa/interview/${useRoute().params.id}/messages`,
      {
        method: "GET",
      }
    );
    console.log("interview messages: ", res);
    const chats = res.messages.map((msg) => {
      return {
        message: msg.text,
        sender: msg.sender == "vo_bot" ? "bot" : "user",
      };
    });
    messages.value = chats;
    if (res.messages.length > 0) {
      interviewAlreadyExist.value = true;
    } else {
      interviewAlreadyExist.value = false;
      getNextQuestion();
    }
  
    interview.visa_type = res.interview.visa_type;
    interview.country = res.interview.country;
    interview.status = res.interview.status;
    interview.duration = res.interview.duration;
    interview.createdAt = res.interview.createdAt;

   
  } catch (err) {
    console.error("error getting messages: ", err);
  }
};
getInterviewMessages();

const deleteInterview = async (id) => {
  const res = await useNuxtApp().$apiFetch(`/visa/interview/${id}/delete`, {
    method: "DELETE",
  });
  console.log("deleted interview: ", res);
  navigateTo("/in/interviews")
};

onMounted(async () => {
  if(interviewAlreadyExist.value == true){
    reset();
  } else {
    start();
  }
 
  // Initialize SpeechRecognition
  await useUserStore().fetchUser();
  user.value = useUserStore().user;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition.value = new SpeechRecognition();
    recognition.value.continuous = false;
    recognition.value.interimResults = false;
    recognition.value.lang = "en-US";

    recognition.value.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      userAnswer.value = transcript;
    };

    recognition.value.onend = () => {
      isListening.value = false;
    };

    recognition.value.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      isListening.value = false;
      alert("Speech recognition failed. Please try again or type your answer.");
    };
  } else {
    console.warn("SpeechRecognition not supported in this browser.");
  }
});

onUnmounted(() => {
  if (recognition.value) recognition.value.stop();
});

// Watch for changes in messages to auto-scroll
watch(
  messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);

// Lifecycle hook
onMounted(() => {
  scrollToBottom();
});
</script>
