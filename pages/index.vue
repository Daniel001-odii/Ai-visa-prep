<template>
  <div class="flex flex-col justify-start items-center min-h-screen p-5 ">

    <div class="flex flex-col justify-center items-center mt-[100px] gap-6">
      <span
        class=" text-black dark:text-white text-opacity-50 text-sm border rounded-3xl bg-white dark:bg-slate-700 px-4 py-2">
        Empowering Immigrants Worldwide
      </span>
      <h1 class="text-5xl text-center">Master Your Visa Interview<br /> with AI-Powered Precision</h1>
      <p class="text-lg text-center mt-2 max-w-[650px]">Preparing for a visa interview can be stressful, but with
        Visalify AI, you gain a competitive edge. <br />Our intelligent simulator replicates real visa interviews,
        offering tailored feedback, dynamic practice sessions, and expert guidance to boost your confidence and success
        rate.
      </p>

      <div class="flex gap-4 mt-4">
        <UButton size="xl" color="blue" label="Try A Free Demo" @click="useRouter().push('/interview')" />
        <UButton label="Pricing" variant="ghost" size="xl" class="bg-inherit" color="black"
          @click="scrollToPricing()" />
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
        <span>Join thousands of applicants who have boosted their visa approval chances with Visalify AI. Real practice.
          Real results.</span>
      </div>


      <!-- NEW SECTION FEATURES -->
      <div class="flex flex-wrap gap-4 justify-center items-center  " id="features">
        <div class=" flex flex-col flex-1 min-w-fit bg-white dark:bg-slate-700 rounded-lg p-6 border">
          <span class=" bg-blue-500 w-fit text-white rounded-md p-3 size-16 mb-4">
            <UIcon name="material-symbols-light:rocket-launch-outline" class=" size-9 " />
          </span>

          <span class=" font-bold">Realistic Interview Simulations</span>
          <p>Experience AI-driven mock interviews tailored to your visa category.</p>
        </div>

        <div class=" flex flex-col flex-1 min-w-fit bg-white dark:bg-slate-700 rounded-lg p-6 border">
          <span class=" bg-blue-500 w-fit text-white rounded-md p-3 size-16 mb-4">
            <UIcon name="material-symbols-light:chat-apps-script-outline-rounded" class=" size-9" />
          </span>
          <span class=" font-bold">Personalized Feedback</span>
          <p>Get instant, actionable insights to improve your responses.</p>
        </div>

        <div class=" flex flex-col flex-1 min-w-fit bg-white dark:bg-slate-700 rounded-lg p-6 border">
          <span class=" bg-blue-500 w-fit text-white rounded-md p-3 size-16 mb-4">
            <UIcon name="material-symbols-light:settings-account-box-outline-rounded" class=" size-9" />
          </span>
          <span class=" font-bold">Visa-Specific Guidance</span>
          <p>Expert-curated questions based on real embassy interview trends.</p>
        </div>

        <div class=" flex flex-col flex-1 min-w-fit bg-white dark:bg-slate-700 rounded-lg p-6 border">
          <span class=" bg-blue-500 w-fit text-white rounded-md p-3 size-16 mb-4">
            <UIcon name="material-symbols-light:tactic" class=" size-9" />
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
          <UAvatar :alt="reviews[0].name" />
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
          <UIcon name="material-symbols-light:stylus-laser-pointer" class=" size-9" />
          <span class=" font-bold">Select Your Visa Type </span>
          <p> Student, work, tourist, business visa, etc.</p>
        </div>

        <div class=" how_it_works">
          <UIcon name="material-symbols-light:live-tv" class=" size-9" />
          <span class=" font-bold">Engage in a Live AI Interview</span>
          <p> Answer real-world questions in an interactive format.</p>
        </div>

        <div class=" how_it_works">
          <UIcon name="material-symbols-light:feedback" class=" size-9" />
          <span class=" font-bold">Receive Instant Feedback </span>
          <p>AI evaluates your confidence, clarity, and content.</p>
        </div>

        <div class=" how_it_works">
          <UIcon name="material-symbols-light:tactic" class=" size-9" />
          <span class=" font-bold">Refine & Retake </span>
          <p>Improve your responses and retry for better performance.</p>
        </div>
      </div>


      <!-- TESTIMONIAL -->
      <div class="flex flex-col bg-black bg-opacity-10 md:p-[150px] p-12 min-h-[300px] gap-6">
        <div class=" text-xl md:text-4xl">
          {{ reviews[1].feedback }}
        </div>
        <div class="flex gap-3">
          <UAvatar :alt="reviews[1].name" />
          <div class=" flex flex-col">
            <span class=" font-bold">{{ reviews[1].name }}</span>
            <span>{{ reviews[1].location }}</span>
          </div>
        </div>
      </div>


      <!-- PRICING SECTION -->
      <div id="pricing" class="flex flex-col pt-[100px] mt-12 w-full justify-center items-center gap-8">
        <div class="flex flex-col max-w-[500px] justify-center items-center text-center gap-3">
          <span class="font-bold text-3xl">Pricing Plans</span>
          <span>Choose the plan that fits your needs. All plans include our AI-powered interview simulator.</span>
        </div>

        <ThePricingPlans/>

        <!-- FAQ Section -->
        <div class="mt-12 w-full max-w-3xl" id="FAQ">
          <h3 class="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h3>

          <div class="space-y-4">
            <div class="border rounded-lg p-4">
              <details class="group">
                <summary class="flex justify-between items-center font-medium cursor-pointer">
                  <span>Are there any recurring charges?</span>
                  <span class="transition group-open:rotate-180">
                    <UIcon name="i-heroicons-chevron-down" />
                  </span>
                </summary>
                <p class="text-gray-600 dark:text-gray-300 mt-3">No, our pricing is based on one-time payments. You get
                  access for the specified duration without any additional or hidden fees.</p>
              </details>
            </div>

            <div class="border rounded-lg p-4">
              <details class="group">
                <summary class="flex justify-between items-center font-medium cursor-pointer">
                  <span>Can I switch plans later?</span>
                  <span class="transition group-open:rotate-180">
                    <UIcon name="i-heroicons-chevron-down" />
                  </span>
                </summary>
                <p class="text-gray-600 dark:text-gray-300 mt-3">Yes, you can upgrade to a higher plan at any time. The
                  remaining value of your current plan will be applied as credit toward your new plan.</p>
              </details>
            </div>

            <div class="border rounded-lg p-4">
              <details class="group">
                <summary class="flex justify-between items-center font-medium cursor-pointer">
                  <span>What if I'm not satisfied?</span>
                  <span class="transition group-open:rotate-180">
                    <UIcon name="i-heroicons-chevron-down" />
                  </span>
                </summary>
                <p class="text-gray-600 dark:text-gray-300 mt-3">We offer a 7-day money-back guarantee on all paid
                  plans. If you're not satisfied with our service, simply contact our support team for a full refund.
                </p>
              </details>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="bg-blue-50 dark:bg-slate-800 w-full max-w-6xl p-12 rounded-2xl mt-12 text-center">
          <h3 class="text-3xl font-bold mb-4">Ready to Ace Your Visa Interview?</h3>
          <p class="text-lg mb-6 max-w-2xl mx-auto">Join thousands of successful visa applicants who prepared with
            Visalify AI. Start your journey today!</p>
          <UButton size="xl" color="blue" label="Try For Free" @click="useRouter().push('/interview')" />
        </div>
      </div>


    </div>


    <div class=" mt-20 text-opacity-50 flex flex-col justify-center items-center text-center">
      <div class=" flex gap-2 items-center"><img src="../public/favicon.ico" class=" w-[20px]" /><span>Visalify &copy;
          2025</span></div>
      <span>Built with Grok & Google Vertex</span>
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


const scrollToPricing = () => {
  const pricingSection = document.getElementById('pricing');
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: 'smooth' });
  }
};

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


.how_it_works {
  @apply flex flex-col flex-1 min-w-fit rounded-lg p-6 justify-center items-center text-center
}
</style>
