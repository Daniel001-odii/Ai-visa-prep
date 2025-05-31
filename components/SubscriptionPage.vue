<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="max-w-3xl mx-auto text-center mb-12">
      <h1 class="text-3xl font-bold mb-4">Choose Your Plan</h1>
      <p class="max-w-xl mx-auto">
        Get the most out of your visa application process with our premium
        features
      </p>

      <!-- Billing toggle -->
      <!--  <div class="mt-8 inline-flex items-center p-1 rounded-lg">
        <button
          @click="billing = 'monthly'"
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          :class="billing === 'monthly' ? 'bg-blue-500 text-white' : ' '"
        >
          Monthly
        </button>
        <button
          @click="billing = 'yearly'"
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          :class="billing === 'yearly' ? 'bg-blue-500 text-white' : ''"
        >
          Yearly <span class="text-xs ml-1 text-blue-300">Save 20%</span>
        </button>
      </div> -->
    </div>

    <!-- Subscription cards -->
     <ThePricingPlans/>
 

    <!-- FAQ section -->
    <div class="max-w-3xl mx-auto mt-16">
      <h2 class="text-xl font-semibold mb-6 text-center">
        Frequently Asked Questions
      </h2>

      <div class="space-y-4">
        <div class="bg-slate-800/5 rounded-lg p-4">
          <button
            @click="toggleFaq(1)"
            class="flex justify-between items-center w-full text-left font-medium"
          >
            <span>How does the premium plan help my visa application?</span>
            <ChevronDown
              class="h-5 w-5 text-slate-400 transition-transform"
              :class="openFaq === 1 ? 'transform rotate-180' : ''"
            />
          </button>
          <div v-if="openFaq === 1" class="mt-2 text-sm">
            Our premium plan provides unlimited interview practice with AI,
            personalized feedback, and document review to significantly increase
            your chances of visa approval. You'll be better prepared for your
            actual interview and have all your documents in perfect order.
          </div>
        </div>

        <div class="bg-slate-800/5 rounded-lg p-4">
          <button
            @click="toggleFaq(2)"
            class="flex justify-between items-center w-full text-left font-medium"
          >
            <span>Can I cancel my subscription anytime?</span>
            <ChevronDown
              class="h-5 w-5 text-slate-400 transition-transform"
              :class="openFaq === 2 ? 'transform rotate-180' : ''"
            />
          </button>
          <div v-if="openFaq === 2" class="mt-2 text-sm">
            Yes, you can cancel your subscription at any time. If you cancel,
            you'll continue to have access to premium features until the end of
            your current billing period.
          </div>
        </div>

        <div class="bg-slate-800/5 rounded-lg p-4">
          <button
            @click="toggleFaq(3)"
            class="flex justify-between items-center w-full text-left font-medium"
          >
            <span>Is there a money-back guarantee?</span>
            <ChevronDown
              class="h-5 w-5 text-slate-400 transition-transform"
              :class="openFaq === 3 ? 'transform rotate-180' : ''"
            />
          </button>
          <div v-if="openFaq === 3" class="mt-2 text-sm">
            Yes, we offer a 7-day money-back guarantee. If you're not satisfied
            with our premium features, contact our support team within 7 days of
            your purchase for a full refund.
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonial -->
    <UCard class="max-w-3xl mx-auto mt-16  rounded-xl">
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-4">
          <div
            class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center"
          >
            <Quote class="h-6 w-6 text-blue-400" />
          </div>
        </div>
        <div>
          <p class="italic mb-4">
            "The premium plan was a game-changer for my student visa
            application. The advanced interview practice helped me answer
            difficult questions confidently, and I got my visa approved on the
            first try!"
          </p>
          <div class="flex items-center">
            <div class="mr-3">
              <div class="w-8 h-8 rounded-full bg-slate-700"></div>
            </div>
            <div>
              <div class="font-medium">Sarah K.</div>
              <div class="text-sm text-slate-400">Student Visa Applicant</div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { CheckCircle, ChevronDown, Quote } from "lucide-vue-next";
import { useUserStore } from "#imports";

const billing = ref("monthly");
const openFaq = ref(null);

const toggleFaq = (id) => {
  openFaq.value = openFaq.value === id ? null : id;
};

const user = ref(null);

const loading_link = ref(false);
const payment_link = ref("");
const getPaymentLink = async () => {
  loading_link.value = true;
  try {
    const res = await useNuxtApp().$apiFetch("/paystack/create-payment-link");
    console.log("pay link res: ", res);
    payment_link.value = res.paymentLink;
  } catch (err) {
    console.log("err creatin gpay link: ", err);
  }
  loading_link.value = false;
};




const freeFeatures = [
  "Daily visa tips",
  "1 AI interview practice session",
  "Expert-suggested answers",
  "Question audio playback",
  "Speech-to-Text (Voice Input)",
];


const premiumFeatures = [
  "Daily visa tips",
  "AI interview practice sessions (Unlimited)",
  "Expert-suggested answers",
  "Confidence score",
  "Question audio playback",
  "Speech-to-Text (Voice Input)",
  "Review & share previous interviews (beta)",
  "Interview difficulty levels (beta)",
  "AI document review (beta)",
  "PDF export of reports (beta)",
  "Interview reminder tracker (beta)",
];


onMounted(async () => {
  await useUserStore().fetchUser();
  user.value = useUserStore().user;
  getPaymentLink();
});
</script>
