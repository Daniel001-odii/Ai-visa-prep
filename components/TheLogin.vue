<template>
    <div class="flex flex-col sm:px-6 lg:px-8">
      <!-- <UCard class="max-w-md w-full space-y-6 animate-fade-in-up"> -->
        <!-- Logo and Header -->
        <div class="">
          <h2 class="mb-6 text-3xl font-bold ">
            Sign in
          </h2>
        </div>
        
        <!-- Login Form -->
        <UForm :state="form" @submit="handleSubmit" class="space-y-6 w-[300px]">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="form.email"
              type="email"
              autocomplete="email"
              placeholder="your@email.com"
              class="animate-fade-in transition-all duration-300 hover:ring-1 hover:ring-blue-500"
            />
          </UFormGroup>
          
          <UFormGroup label="Password" name="password">
            <UInput
              v-model="form.password"
              type="password"
              autocomplete="current-password"
              placeholder="••••••••"
              class="animate-fade-in transition-all duration-300 hover:ring-1 hover:ring-blue-500"
            />
          </UFormGroup>
  
          <div class="flex items-center justify-between">
  
            <NuxtLink to="/request_reset" class="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300">
              Forgot your password?
            </NuxtLink>
          </div>
  
          <UButton
            type="submit"
            block
            color="blue"
            class="animate-pulse-on-hover transition-all duration-300"
            :loading="isLoading"
          >
            <template #leading>
              <UIcon name="i-heroicons-lock-closed" class="w-5 h-5" />
            </template>
            Sign in
          </UButton>
          
          <!-- Divider -->
          <div class="relative my-4 animate-fade-in">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-slate-50 dark:bg-slate-900 text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <!-- Google Login Button -->
          <UButton
            type="button"
            block
            color="blue"
            variant="soft"
            @click="signInWithGoogle"
            class="animate-pulse-on-hover transition-all duration-300"
          >
            <template #leading>
              <svg class="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4"/>
              </svg>
            </template>
            Sign in with Google
          </UButton>
        </UForm>

         <!-- Sign in link -->
         <div class="text-center mt-4">
            <span class="text-sm text-gray-600">Dont have an account yet?</span>
            <NuxtLink to="/register"
                class="ml-1 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300">
                Sign Up
            </NuxtLink>
        </div>
      <!-- </UCard> -->
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  
  // Form state
  const form = reactive({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const isLoading = ref(false);
  
  // Form submission handler
  const handleSubmit = () => {
    isLoading.value = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt with:', form);
      isLoading.value = false;
      // Here you would typically call your authentication API
    }, 1000);
  };
  
  // Google sign-in handler
  const signInWithGoogle = () => {
    console.log('Google sign-in initiated');
    // In a real application, you would integrate with Google OAuth API
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