<template>
  <!-- selecting VO modal here -->
  <UModal v-model="select_vo_modal">
    <UCard>
      <template #header>
        <h2 class="font-bold text-2xl">Select Your Visa Officer</h2>
      </template>

      <div class="flex flex-col justify-center items-center gap-3">
        <div class="">
          <div class="avatar-container" :class="{ revealed: isRevealed }">
            <img v-if="!isRevealed" :src="placeholderImages[currentPlaceholder]" alt="Placeholder"
              class="avatar placeholder" />
            <img v-else :src="selectedUserImage" alt="Selected User" class="avatar" />
          </div>

          <div class="flex flex-col gap-2 justify-center items-center mt-4">
            <span class="font-bold">Meet Your Visa Officer</span>
            <UButton @click="isRevealed ? (useRouter().push('/Interview')) : (startSelection())" :disabled="isAnimating"
              :label="isRevealed ? 'Start Interview' : 'Select Visa Officer'" color="green" class="w-fit"
              :loading="isAnimating" loading-icon="svg-spinners:12-dots-scale-rotate" />
          </div>
          <!--   <button @click="startSelection" :disabled="isAnimating">
            Pick a Random User
          </button> -->
        </div>
      </div>
    </UCard>
  </UModal>

  <div class="flex flex-col justify-start items-center min-h-screen p-5 ">

    <div class="flex flex-col justify-center items-center mt-[100px] gap-6">
      <span class=" text-black dark:text-white text-opacity-50 text-sm border rounded-3xl bg-white dark:bg-slate-700 px-4 py-2">Currently
        for Nigerian based immigrants
      </span>
      <h1 class="text-5xl text-center">Master Your Visa Interview<br/> with AI-Powered Precision</h1>
      <p class="text-lg text-center mt-2 max-w-[650px]">Preparing for a visa interview can be stressful, but with Visalify AI, you gain a competitive edge. <br/>Our intelligent simulator replicates real visa interviews, offering tailored feedback, dynamic practice sessions, and expert guidance to boost your confidence and success rate.
      </p>

      <div class="flex gap-4 mt-4">
        <UButton size="xl" color="blue" label="Start free trial" @click="useRouter().push('/Interview?modal=true')" :trailing="true" icon="hugeicons:arrow-right-02" />
        <UButton label="Pricing" variant="ghost" size="xl" class=" bg-inherit" color="black" />
      </div>

      <!-- hero image -->
      <div class=" rounded-3xl mt-4 overflow-hidden">
        <img src="../assets/images/hero/hero_1.png" />
      </div>

    </div>

    <!-- NEW SECTION -->
    <div class=" flex flex-col border-t pt-[100px] mt-12 w-full justify-center items-center gap-12">

      <div class="flex flex-col max-w-[500px] justify-center items-center text-center gap-3">
        <span class=" font-bold text-3xl ">Why Choose <span class="text-blue-500">Visalify</span> AI?build</span>
        <span>Join thousands of applicants who have boosted their visa approval chances with Visalify AI. Real practice. Real results.</span>
      </div>


       <!-- NEW SECTION -->
      <div class="flex flex-wrap gap-4 justify-center items-center  ">
        <div class=" flex flex-col flex-1 min-w-fit bg-white dark:bg-slate-700 rounded-lg p-6 border">
          <span class=" bg-blue-500 w-fit text-white rounded-md p-3 size-16 mb-4">
            <UIcon name="material-symbols-light:rocket-launch-outline" class=" size-9 "/>
          </span>
          
          <span class=" font-bold">Realistic Interview Simulations</span>
          <p>Experience AI-driven mock interviews tailored to your visa category.</p>
        </div>

        <div class=" flex flex-col flex-1 min-w-fit bg-white dark:bg-slate-700 rounded-lg p-6 border">
          <span class=" bg-blue-500 w-fit text-white rounded-md p-3 size-16 mb-4">
            <UIcon name="material-symbols-light:chat-apps-script-outline-rounded" class=" size-9"/>
          </span>
          <span class=" font-bold">Personalized Feedback</span>
          <p>Get instant, actionable insights to improve your responses.</p>
        </div>

        <div class=" flex flex-col flex-1 min-w-fit bg-white dark:bg-slate-700 rounded-lg p-6 border">
          <span class=" bg-blue-500 w-fit text-white rounded-md p-3 size-16 mb-4">
            <UIcon name="material-symbols-light:settings-account-box-outline-rounded" class=" size-9"/>
          </span>
          <span class=" font-bold">Visa-Specific Guidance</span>
          <p>Expert-curated questions based on real embassy interview trends.</p>
        </div>

        <div class=" flex flex-col flex-1 min-w-fit bg-white dark:bg-slate-700 rounded-lg p-6 border">
          <span class=" bg-blue-500 w-fit text-white rounded-md p-3 size-16 mb-4">
            <UIcon name="material-symbols-light:tactic" class=" size-9"/>
          </span>
          <span class=" font-bold">AI-Powered Analysis</span>
          <p>Identify weak points and refine your answers with smart coaching.</p>
        </div>
      </div>

      <div class="flex flex-col bg-black bg-opacity-10 md:p-[150px] p-12 min-h-[300px] gap-6">
        <div class=" text-xl md:text-4xl">
          {{ reviews[0].feedback }}
        </div>
        <div class="flex gap-3">
          <UAvatar :alt="reviews[0].name"/>
          <div class=" flex flex-col">
            <span class=" font-bold">{{ reviews[0].name }}</span>
            <span>{{ reviews[0].location }}</span>
          </div>
        </div>
      </div>


      <div class="flex flex-col max-w-[500px] justify-center items-center text-center gap-3 mt-12">
        <span class=" font-bold text-3xl ">How It Works</span>
      </div>

      <div class=" flex flex-wrap gap-6 justify-center items-center">
        <div class="how_it_works">
          <UIcon name="material-symbols-light:stylus-laser-pointer" class=" size-9"/>
          <span class=" font-bold">Select Your Visa Type </span>
          <p> Student, work, tourist, business visa, etc.</p>
        </div>

        <div class=" how_it_works">
          <UIcon name="material-symbols-light:live-tv" class=" size-9"/>
          <span class=" font-bold">Engage in a Live AI Interview</span>
          <p> Answer real-world questions in an interactive format.</p>
        </div>

        <div class=" how_it_works">
          <UIcon name="material-symbols-light:feedback" class=" size-9"/>
          <span class=" font-bold">Receive Instant Feedback  </span>
          <p>AI evaluates your confidence, clarity, and content.</p>
        </div>

        <div class=" how_it_works">
          <UIcon name="material-symbols-light:tactic" class=" size-9"/>
          <span class=" font-bold">Refine & Retake </span>
          <p>Improve your responses and retry for better performance.</p>
        </div>
      </div>


      <!-- TESTIMONIAL -->
      <div class="flex flex-col bg-black bg-opacity-10 md:p-[150px] p-12 min-h-[300px] gap-6">
        <div class=" text-xl md:text-4xl">
          {{ reviews[0].feedback }}
        </div>
        <div class="flex gap-3">
          <UAvatar :alt="reviews[1].name"/>
          <div class=" flex flex-col">
            <span class=" font-bold">{{ reviews[1].name }}</span>
            <span>{{ reviews[1].location }}</span>
          </div>
        </div>
      </div>



    </div>


    <span class=" mt-20 text-opacity-50">AiVisaPrep &copy; 2025, built with GrokAi & Google Vertex</span>


   

  </div>
</template>

<script setup>

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const select_vo_modal = ref(false);

const vo = ref({
  name: "John Doe",
  image: "../assets/vo_1.png",
});

import vo_1 from "@/assets/images/vo_1.svg";
import vo_2 from "@/assets/images/vo_2.svg";



const isAnimating = ref(false);
const isRevealed = ref(false);
const selectedUserImage = ref("");
const currentPlaceholder = ref(0);
const placeholderImages = ref([
  vo_1,
  vo_2,
]);


const reviews = [
  {
    name: "Emily",
    location: "Nigeria",
    feedback: "I had a fantastic experience with Visalify AI! The practice sessions helped me gain confidence, and I successfully passed my visa interview on the first attempt.",
    rating: 5
  },
  {
    name: "Raj",
    location: "India",
    feedback: "Visalify AI is a must-have! The AI feedback highlighted my weak points, allowing me to improve quickly. Highly recommended!",
    rating: 5
  },
  {
    name: "Anonymous",
    location: "United States",
    feedback: "This tool made all the difference! It provided personalized questions and helped me practice effectively. Thanks to Visalify AI, I aced my visa interview!",
    rating: 5
  }
];


const speak = () => {
  console.log("trying to speak...")
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance("hello world");
  synth.speak(utterance);
}


// Methods
const startSelection = async () => {
  isAnimating.value = true;
  isRevealed.value = false;

  // Run the shuffle animation
  await shuffleAnimation();

  // Set the final user image (replace with your actual logic)
  selectedUserImage.value = vo_1;
  isRevealed.value = true;
  isAnimating.value = false;
};

const has_selected_user = ref(false);

const shuffleAnimation = () => {
  return new Promise((resolve) => {
    let speed = 50; // Initial switch speed in ms (fast)
    const totalDuration = 3000; // Total animation time in ms
    const minSpeed = 100; // Slowest speed before stopping
    let elapsed = 0;

    const shuffle = () => {
      // Cycle to next placeholder
      currentPlaceholder.value =
        (currentPlaceholder.value + 1) % placeholderImages.value.length;

      // Increase speed (slow down) over time
      elapsed += speed;
      if (elapsed < totalDuration) {
        speed = Math.min(speed + 20, minSpeed); // Gradually slow down
        setTimeout(shuffle, speed);
      } else {
        resolve(); // End animation
      }
    };

    // Start shuffling
    shuffle();
  });
};
</script>

<style scoped>
.avatar-container {
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  background: #f0f0f0;
  /* Optional: subtle background during shuffle */
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.placeholder {
  animation: flicker 1s infinite;
  /* Fast flicker during shuffle */
}

.revealed .avatar {
  animation: reveal 0.6s ease-out forwards;
}

/* Flicker effect for randomization */
@keyframes flicker {
  0% {
    opacity: 0.7;
    transform: scale(0.95);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0.7;
    transform: scale(0.95);
  }
}

/* Reveal animation */
@keyframes reveal {
  0% {
    opacity: 0;
    transform: scale(0.9) rotate(5deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}


.how_it_works{
  @apply  flex flex-col flex-1 min-w-fit rounded-lg p-6 justify-center items-center text-center
}
</style>
