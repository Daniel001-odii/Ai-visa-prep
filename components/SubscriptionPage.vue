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
    <div
      v-if="user"
      class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <!-- Free plan -->
      <UCard class="overflow-hidden">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">Free</h2>
          <p class="text-sm mb-6">Basic features for visa preparation</p>

          <div class="mb-6">
            <div class="text-3xl font-bold">$0</div>
            <div class="text-slate-400 text-sm">Forever free</div>
          </div>

          <!--  <button class="w-full py-2.5 px-4 rounded-lg border border-slate-600 font-medium  transition-colors">
              {{ user?.subscription == 'free' ? 'Current Plan' : 'Choose Plan' }}
            </button> -->
          <UButton
            :disabled="loading_link"
            :variant="user?.subscription == 'free' ? 'outline' : 'solid'"
            :color="user?.subscription == 'free' ? 'white' : 'blue'"
            :label="
              user?.subscription == 'free' ? 'Current Plan' : 'Choose plan'
            "
            class="p-3 w-full flex justify-center items-center"
            size="xl"
          />
        </div>

        <div class="border-t border-slate-700/20 p-6">
          <h3 class="font-medium mb-4">What's included:</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <span class="text-sm">Basic visa requirements checklist</span>
            </li>
            <li class="flex items-start">
              <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <span class="text-sm">1 beginner practice interview</span>
            </li>
            <li class="flex items-start">
              <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <span class="text-sm">Document templates (limited)</span>
            </li>
            <li class="flex items-start">
              <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <span class="text-sm">Basic application status tracking</span>
            </li>
          </ul>
        </div>
      </UCard>

      <!-- Premium plan -->
      <UCard class="overflow-hidden border-blue-500 relative">
        <!-- Popular badge -->
        <div class="absolute top-0 right-0">
          <div
            class="bg-blue-500 text-xs font-semibold px-3 py-1 text-white rounded-bl-lg"
          >
            RECOMMENDED
          </div>
        </div>

        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">Premium</h2>
          <p class="text-sm mb-6">Advanced features for serious applicants</p>

          <div class="mb-6">
            <div class="text-3xl font-bold">
              {{ billing === "monthly" ? "$9.99" : "$95.88" }}
              <span class="text-sm font-normal text-slate-400">
                /{{ billing === "monthly" ? "month" : "year" }}
              </span>
            </div>
            <div class="text-slate-400 text-sm">
              {{
                billing === "yearly"
                  ? "That's just $7.99/month, billed annually"
                  : ""
              }}
            </div>
          </div>

          <!--  <button 
            class="w-full py-2.5 px-4 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">
              Upgrade Now
            </button> -->
          <a :href="payment_link" target="_blank">
            <UButton
              :disabled="loading_link"
              :variant="user?.subscription == 'premiun' ? 'outline' : 'solid'"
              :color="user?.subscription == 'premiun' ? 'white' : 'blue'"
              :label="
                user?.subscription == 'premiun' ? 'Current Plan' : 'Upgrade Now'
              "
              @click=""
              class="p-3 w-full flex justify-center items-center"
              size="xl"
            />
          </a>
        </div>

        <div class="border-t border-slate-700/20 p-6">
          <h3 class="font-medium mb-4">Everything in Free, plus:</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <span class="text-sm"
                >Unlimited AI interview practice sessions</span
              >
            </li>
            <li class="flex items-start">
              <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <span class="text-sm"
                >All difficulty levels (Beginner, Standard, Advanced)</span
              >
            </li>
            <li class="flex items-start">
              <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <span class="text-sm"
                >Personalized feedback and improvement tips</span
              >
            </li>
            <li class="flex items-start">
              <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <span class="text-sm">Document review by AI assistant</span>
            </li>
            <li class="flex items-start">
              <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <span class="text-sm">Priority support</span>
            </li>
            <li class="flex items-start">
              <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <span class="text-sm">Interview recordings and transcripts</span>
            </li>
            <li class="flex items-start">
              <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <span class="text-sm">Country-specific visa guides</span>
            </li>
          </ul>
        </div>
      </UCard>
    </div>

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
    <UCard class="max-w-3xl mx-auto mt-16 bg-slate-80/5 rounded-xl">
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

onMounted(async () => {
  await useUserStore().fetchUser();
  user.value = useUserStore().user;
  getPaymentLink();
});
</script>
