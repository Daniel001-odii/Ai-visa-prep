<template>

  <div class=" min-h-screen container mx-auto flex justify-center items-center">
    <div class=" max-w-md flex justify-center items-center flex-col gap-12">
      <TheLogo/>

      <div class="flex flex-col justify-center items-center w-[300px]">
        <!-- Logo and Header -->
        <div class=" text-left w-full">
          <h2 class="text-3xl font-bold">
            Reset Password
          </h2>
          <p class="text-sm text-gray-600 mb-6">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <!-- Reset Password Form -->
        <UForm :state="form" @submit="handleSubmit" class="space-y-6 w-[300px]">
          <UFormGroup label="Email" name="email">
            <UInput v-model="form.email" type="email" autocomplete="email" placeholder="your@email.com"
              class="animate-fade-in transition-all duration-300 hover:ring-1 hover:ring-blue-500" />
          </UFormGroup>

          <UButton type="submit" block color="blue" class="animate-pulse-on-hover transition-all duration-300"
            :loading="isLoading">
            <template #leading>
              <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
            </template>
            Send Reset Link
          </UButton>

          <!-- Success message (conditionally shown) -->
          <div v-if="emailSent" class="mt-4 p-4 bg-green-50 border border-green-300 rounded-md animate-fade-in">
            <div class="flex">
              <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-green-500 mr-2" />
              <p class="text-sm text-green-700">
                Reset link sent! Please check your email inbox.
              </p>
            </div>
          </div>
        </UForm>

        <!-- Links -->
        <div class="text-center mt-6 space-y-2">
          <div class=" text-center">
            <span class="text-sm text-gray-600">Remember your password?</span>
            <NuxtLink to="/login"
              class="ml-1 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300">
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
    layout: 'plain',
});
import { ref, reactive } from 'vue';

// Form state
const form = reactive({
  email: ''
});

const isLoading = ref(false);
const emailSent = ref(false);

// Form submission handler
const handleSubmit = () => {
  isLoading.value = true;

  // Simulate API call to send reset email
  setTimeout(() => {
    console.log('Password reset requested for:', form.email);
    isLoading.value = false;
    emailSent.value = true;
    // Here you would typically call your API to send a reset email
  }, 1500);
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