<template>
  <div class="flex flex-col sm:px-6 lg:px-8">
    <!-- Logo and Header -->
    <div class="">
      <h2 class="mb-6 text-3xl font-bold">Create an account</h2>
    </div>

    <!-- Sign Up Form -->
    <UForm :state="form" @submit="handleSubmit" class="space-y-6 w-[300px]">
      <div class="flex flex-col md:flex-row md:space-x-4">
        <UFormGroup label="Full Name" name="firstName" class="flex-1">
          <UInput
            v-model="form.username"
            type="text"
            autocomplete="given-name"
            placeholder="John"
            class="animate-fade-in transition-all duration-300 hover:ring-1 hover:ring-blue-500"
          />
        </UFormGroup>
      </div>

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
          autocomplete="new-password"
          placeholder="••••••••"
          class="animate-fade-in transition-all duration-300 hover:ring-1 hover:ring-blue-500"
        />
        <template #hint>
          <p class="text-xs text-gray-500">
            Password must be at least 8 characters long
          </p>
        </template>
      </UFormGroup>

      <div class="flex items-center">
        <UCheckbox
          v-model="form.termsAccepted"
          class="animate-fade-in transition-all duration-300"
          color="blue"
        />
        <span class="ml-2 text-sm text-gray-600">
          I agree to the
          <ULink
            href="#"
            class="font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
            Terms of Service
          </ULink>
          and
          <ULink
            href="#"
            class="font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
            Privacy Policy
          </ULink>
        </span>
      </div>

      <UButton
        type="submit"
        block
        color="blue"
        :icon="isLoading ? 'svg-spinners:bars-rotate-fade':'i-heroicons-user-plus'"
        class="animate-pulse-on-hover transition-all duration-300"
        :disabled="isLoading"
      >
        Create Account
      </UButton>

      <!-- Divider -->
      <div class="relative my-4 animate-fade-in">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-slate-50 dark:bg-slate-900 text-gray-500"
            >Or continue with</span
          >
        </div>
      </div>

       <!-- Google Login Button -->
       <GoogleLogin/>

      <!-- Sign in link -->
      <div class="text-center mt-4">
        <span class="text-sm text-gray-600">Already have an account?</span>
        <NuxtLink
          to="/login"
          class="ml-1 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300"
        >
          Sign in
        </NuxtLink>
      </div>
    </UForm>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const toast = useToast();

// Form state
const form = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
});

const isLoading = ref(false);

// Form submission handler
const handleSubmit = async () => {
  isLoading.value = true;

  // Validate terms accepted
  if (!form.termsAccepted) {
    toast.add({
      description: "Please accept the terms and conditions",
      color: 'red',
    })
    isLoading.value = false;
    return;
  }

  try {
    const res = await useNuxtApp().$apiFetch(`/auth/signup`, {
      body: {
        name: form.username,
        email: form.email,
        password: form.password,
      },
      method: "POST",
    });
    toast.add({
      description: "Sign Up Successful!",
      color: 'green',
    });

    console.log("from res: ", res)
  } catch (err) {
    toast.add({
      title: "Error in Sign Up",
      description: err._data.message,
      color: 'red',
    })
    console.log("res from signup: ",err._data.message);
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
