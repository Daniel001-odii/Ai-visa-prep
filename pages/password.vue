<template>
  <div class="min-h-screen container mx-auto flex justify-center items-center">
    <div class="max-w-md flex justify-center items-center flex-col gap-12">
      <TheLogo />

      <div class="flex flex-col justify-center items-center w-[300px]">
        <!-- Logo and Header -->
        <div class="text-left w-full">
          <h2 class="text-3xl font-bold mb-3">Reset Password</h2>
          <p class="text-sm text-gray-600 mb-6">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        <!-- Reset Password Form -->
        <!-- <UAlert title="Heads up!" /> -->

        <UForm
        :schema="schema" :state="state"
          @submit="sendResetEmail"
          class="space-y-6 w-[300px] mt-4"
        >
          <UFormGroup label="Email" name="email">
            <UInput
              
              v-model="state.email"
              type="email"
              autocomplete="email"
              placeholder="your@email.com"
              class="animate-fade-in transition-all duration-300 hover:ring-1 hover:ring-blue-500"
            />
          </UFormGroup>

          <UButton
            type="submit"
            block
            color="blue"
            :loading="isLoading"
            loading-icon="svg-spinners:bars-rotate-fade"
            :icon="emailSent ? 'lucide:mail-check' : 'lucide:mail'"
            :disabled="emailSent"
            :label="emailSent ? 'Reset Link Sent' : 'Send Reset Link'"
          />

          <!-- Success message (conditionally shown) -->
          <div
            v-if="emailSent"
            class="mt-4 p-4 bg-green-50 border border-green-300 rounded-md animate-fade-in"
          >
            <div class="flex">
              <UIcon
                name="i-heroicons-check-circle"
                class="h-5 w-5 text-green-500 mr-2"
              />
              <p class="text-sm text-green-700">
                Reset link sent! Please check your email inbox.
              </p>
            </div>
          </div>
        </UForm>

        <!-- Links -->
        <div class="text-center mt-6 space-y-2">
          <div class="text-center">
            <span class="text-sm text-gray-600">Remember your password?</span>
            <NuxtLink
              to="/login"
              class="ml-1 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300"
            >
              Sign In
            </NuxtLink>
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
import { ref, reactive } from "vue";
import * as z from 'zod'
// import { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast();
const schema = z.object({
  email: z.string().email('Invalid email')
})

// type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined
})

const isLoading = ref(false);
const emailSent = ref(false);

const email_error = ref(null);
const sendResetEmail = async () => {
  isLoading.value = true;
  try {
    const res = await useNuxtApp().$apiFetch("/auth/request-password-reset", {
      body: {
        email: state.email
      },
      method: "POST",
    });
    email_error.value = res.message;
    emailSent.value =true;
    toast.add({
      title: "Success",
      description: res.message,
      color: "green",
    });
    console.log(" res from reset: ", res);
    
  } catch (err) {
    email_error.value = err;
    toast.add({
      title: "Error Sending Reset Email",
      description: err._data.message,
      color: "red",
    });
  }
  isLoading.value = false;
};
</script>

<style>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseOnHover {
  50% {
    transform: scale(1.02);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-pulse-on-hover:hover {
  animation: pulseOnHover 0.8s infinite;
}

/* Ensure our theme color is applied */
:root {
  --color-primary: #3b82f6;
}
</style>
