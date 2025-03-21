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
        <UInput v-model="form.email" type="email" autocomplete="email" placeholder="your@email.com"
          class="animate-fade-in transition-all duration-300 hover:ring-1 hover:ring-blue-500" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="form.password" type="password" autocomplete="current-password" placeholder="••••••••"
          class="animate-fade-in transition-all duration-300 hover:ring-1 hover:ring-blue-500" />
      </UFormGroup>

      <div class="flex items-center justify-between">

        <NuxtLink to="/request_reset"
          class="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300">
          Forgot your password?
        </NuxtLink>
      </div>

      <UButton type="submit" block color="blue"
        :icon="isLoading ? 'svg-spinners:bars-rotate-fade' : 'i-heroicons-lock-closed'"
        class="animate-pulse-on-hover transition-all duration-300" 
        :disabled="isLoading || form.email == '' || form.password == ''">
        Sign in
      </UButton>

      <!-- Divider -->
      <div class="relative my-4 animate-fade-in">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-slate-50 dark:bg-slate-900 text-gray-500">OR</span>
        </div>
      </div>

      <!-- Google Login Button -->
      <GoogleLogin />

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
import GoogleLogin from './GoogleLogin.vue';
const toast = useToast();


// Form state
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
});

const isLoading = ref(false);

// Form submission handler
const handleSubmit = async () => {
  isLoading.value = true;

  try {
    const res = await useNuxtApp().$apiFetch(`/auth/login`, {
      body: {
        email: form.email,
        password: form.password,
      },
      method: "POST",
    });

    toast.add({
      description: "Login Successful!",
      color: 'green',
    });

    const token = useCookie("vy_token");
    token.value = res.token;
    useRouter().push("/in/account");

    console.log("from res: ", res);
  } catch (err) {
    console.log("res from signup: ", err);

    toast.add({
      title: "Error in Login",
      description: err._data.message,
      color: 'red',
    })
  }
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