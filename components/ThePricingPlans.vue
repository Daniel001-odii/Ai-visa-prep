<template>
  <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Free plan -->
    <UCard class="overflow-hidden">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-2">Free</h2>
        <p class="text-sm mb-6">Basic features for visa preparation</p>

        <div class="mb-6">
          <div class="text-3xl font-bold">$0</div>
          <div class="text-slate-400 text-sm">Forever free</div>
        </div>
        <UButton
          v-if="user"
          :disabled="loading_link || user?.subscription == 'free'"
          :variant="user?.subscription == 'free' ? 'outline' : 'solid'"
          :color="user?.subscription == 'free' ? 'white' : 'blue'"
          :label="user?.subscription == 'free' ? 'Current Plan' : 'Choose plan'"
          @click="user?.subscription == 'free' ? null : cancelSubscription()"
          class="p-3 w-full flex justify-center items-center"
          size="xl"
        />
        <UButton
          v-else
          block
          @click="navigateTo('/login')"
          color="blue"
          label="Get Started"
          size="xl"
        />
      </div>

      <div class="border-t border-slate-700/20 p-6">
        <h3 class="font-medium mb-4">What's included:</h3>
        <ul class="space-y-3">
          <li v-for="features in freeFeatures" class="flex items-start">
            <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
            <span class="text-sm">{{ features }}</span>
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
           $9.99
            <span class="text-sm font-normal text-slate-400">
              /month
            </span>
          </div>
          <!-- <div class="text-3xl font-bold">
            {{ billing === "monthly" ? "$9.99" : "$95.88" }}
            <span class="text-sm font-normal text-slate-400">
              /{{ billing === "monthly" ? "month" : "year" }}
            </span>
          </div> -->
         <!--  <div class="text-slate-400 text-sm">
            {{
              billing === "yearly"
                ? "That's just $7.99/month, billed annually"
                : ""
            }}
          </div> -->
        </div>

        <UButton
          v-if="user"
          :disabled="loading_link || user?.subscription == 'premium'"
          :variant="user?.subscription == 'premium' ? 'outline' : 'solid'"
          :color="user?.subscription == 'premium' ? 'white' : 'blue'"
          :label="
            user?.subscription == 'premium' ? 'Current Plan' : 'Upgrade Now'
          "
          @click="user?.subscription == 'premium' ? null : openPaymentPage()"
          class="p-3 w-full flex justify-center items-center"
          size="xl"
        />
        <UButton
          v-else
          block
          color="blue"
          label="Get Started"
          size="xl"
          @click="navigateTo('/login')"
        />
      </div>

      <div class="border-t border-slate-700/20 p-6">
        <h3 class="font-medium mb-4">Everything in Free, plus:</h3>
        <ul class="space-y-3">
          <li v-for="features in premiumFeatures" class="flex items-start">
            <CheckCircle class="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
            <span class="text-sm">{{ features }}</span>
          </li>
        </ul>
      </div>
    </UCard>
  </div>
</template>

<script setup>
import { CheckCircle, ChevronDown, Quote } from "lucide-vue-next";
const freeFeatures = [
  "Daily visa tips",
  "1 AI interview practice session",
  "Expert-suggested answers",
  "Question audio playback",
  "Speech-to-Text (Voice Input)",
];
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


const cancelSubscription = async () => {
  loading_link.value = true;
  try {
    const res = await useNuxtApp().$apiFetch("/paystack/cancel-subscription");
    console.log("cancel res: ", res);
    // payment_link.value = res.paymentLink;
  } catch (err) {
    console.log("err cenceling sub: ", err);
  }
  loading_link.value = false;
};

const openPaymentPage = () => {
  window.open(payment_link.value, "_blank");
};

/* const premiumFeatures = [
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
 */
const premiumFeatures = [
  
  "AI interview practice sessions (Unlimited)",
  "Confidence score",
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

<style lang="scss" scoped></style>
