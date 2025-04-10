<template>
  <div class="min-h-screen container mx-auto flex justify-center items-center">
    <div class="max-w-md flex justify-center items-center flex-col gap-12">
      <TheLogo />
      <div class="flex flex-col sm:px-6 lg:px-8">
        <!-- Logo and Header -->
        <div class="">
          <h2 class="mb-6 text-3xl font-bold">Create New Password</h2>
        </div>

        <!-- New Password Form -->
        <UForm
          v-if="checkToken(useRoute().params.token)"
          :state="state"
          :schema="schema"
          @submit="handleSubmit"
          class="space-y-6 w-[300px]"
        >
          <p class="text-sm text-gray-600 mb-4">
            Please enter your new password below
          </p>
          <UFormGroup label="New Password" name="password">
            <UInput
              v-model="state.password"
              type="password"
              autocomplete="new-password"
              placeholder="••••••••"
              class="animate-fade-in transition-all duration-300 hover:ring-1 hover:ring-blue-500"
            />
          </UFormGroup>

          <UFormGroup label="Confirm Password" name="confirmPassword">
            <UInput
              v-model="state.confirmPassword"
              type="password"
              autocomplete="new-password"
              placeholder="••••••••"
              class="animate-fade-in transition-all duration-300 hover:ring-1 hover:ring-blue-500"
            />
          </UFormGroup>

          <UButton
            type="submit"
            block
            color="blue"
            :disabled="isLoading"
            :loading="isLoading"
            loading-icon="svg-spinners:bars-rotate-fade"
            label="Reset Password"
          />
        </UForm>
        <div
          v-else
          class="flex flex-col justify-center items-center text-center"
        >
          <span>Sorry, the reset link Already Expired</span>
          <span
            >Request a new link
            <NuxtLink to="/password" class="underline text-blue-500"
              >here</NuxtLink
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import * as z from "zod";

const route = useRoute();

const toast = useToast();

const schema = z.object({
  password: z.string().min(8, "Must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Must be at least 8 characters"),
});

const state = reactive({
  password: undefined,
  confirmPassword: undefined,
});

const isLoading = ref(false);
const resetComplete = ref(false);
const errorMessage = ref("");
const tokenValid = ref(false);

const resetToken = ref(null);
// Get token from URL on component mount
onMounted(() => {
  resetToken.value = route.params.token;
});

const checkToken = async (token) => {
  isLoading.value = true;
  let status;
  try {
    const res = await useNuxtApp().$apiFetch(
      `/auth/validate-reset-token/${token}`
    );
    console.log("res from token checker: ", res);
    status = true;
  } catch (err) {
    status = false;
  }
  isLoading.value = false;
  return status;
};

// Form submission handler
const handleSubmit = async () => {
  // Reset previous error
  errorMessage.value = "";

  // Validate passwords match
  if (state.password !== state.confirmPassword) {
    errorMessage.value = "Passwords don't match";
    return;
  }

  isLoading.value = true;

  console.log("sent token: ", resetToken.value);

  try {
    const res = await useNuxtApp().$apiFetch(
      `/auth/reset-password/${resetToken.value}`,
      {
        body: {
          password: state.confirmPassword,
        },
        method: "POST",
      }
    );

    console.log("res: ", res);

    toast.add({
      title: "Success",
      description: res.message,
      color: "green",
    });

    const token = useCookie("vy_token");
    token.value = res.token;
    useRouter().push("/in/dashboard");

    console.log("res: ", res);
  } catch (err) {
    toast.add({
      title: "Error",
      description: "Error reseting password",
      color: "red",
    });
    console.log("err changing password: ", err);
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
