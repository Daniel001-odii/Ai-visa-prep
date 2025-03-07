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
            <img
              v-if="!isRevealed"
              :src="placeholderImages[currentPlaceholder]"
              alt="Placeholder"
              class="avatar placeholder"
            />
            <img
              v-else
              :src="selectedUserImage"
              alt="Selected User"
              class="avatar"
            />
          </div>

          <div class="flex flex-col gap-2 justify-center items-center mt-4">
            <span class="font-bold">Meet Your Visa Officer</span>
            <UButton
              @click="isRevealed ? (useRouter().push('/Interview')) : (startSelection())"
              :disabled="isAnimating"
              :label="isRevealed ? 'Start Interview':'Select Visa Officer'"
              color="green"
              class="w-fit"
              :loading="isAnimating"
              loading-icon="svg-spinners:12-dots-scale-rotate"
            />
          </div>
          <!--   <button @click="startSelection" :disabled="isAnimating">
            Pick a Random User
          </button> -->
        </div>
      </div>
    </UCard>
  </UModal>

  <div class="flex flex-col justify-center items-center min-h-screen">
    <h1 class="text-4xl font-bold text-center">Welcome to AI Visa Prep</h1>
    <p class="text-lg text-center mt-4">
      Your smart assistant for a seamless visa application process
    </p>
    <div class="mt-6 flex items-center gap-3">
      <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        color="gray"
        variant="ghost"
        label="Toggle Theme"
        aria-label="Theme"
        @click="isDark = !isDark"
        class="p-3 rounded-3xl px-6"
      />
      <UButton
        icon="heroicons:arrow-long-right"
        trailing="true"
        size="xl"
        color="blue"
        class="rounded-3xl !text-white px-6"
        label="Try Now"
        @click="useRouter().push('/Interview?modal=true')"
      />
    </div>
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

import placeholder_image from "@/assets/placeholder.png";

const isAnimating = ref(false);
const isRevealed = ref(false);
const selectedUserImage = ref("");
const currentPlaceholder = ref(0);
const placeholderImages = ref([
  vo_1,
  vo_2,
]);

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
  background: #f0f0f0; /* Optional: subtle background during shuffle */
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
  animation: flicker 1s infinite; /* Fast flicker during shuffle */
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
</style>
