<template>
    <div class=" min-h-screen container mx-auto flex justify-center items-center">
        <div class=" max-w-md flex justify-center items-center flex-col gap-12">
            <TheLogo/>
            <div class="flex flex-col sm:px-6 lg:px-8">
                <!-- Logo and Header -->
                <div class="">
                    <h2 class="mb-6 text-3xl font-bold">
                        Create New Password
                    </h2>
                    <p class="text-sm text-gray-600 mb-6">
                        Please enter your new password below
                    </p>
                </div>

                <!-- New Password Form -->
                <UForm :state="form" @submit="handleSubmit" class="space-y-6 w-[300px]">
                    <UFormGroup label="New Password" name="password">
                        <UInput v-model="form.password" type="password" autocomplete="new-password"
                            placeholder="••••••••"
                            class="animate-fade-in transition-all duration-300 hover:ring-1 hover:ring-blue-500" />
                        <template #hint>
                            <p class="text-xs text-gray-500">Password must be at least 8 characters long</p>
                        </template>
                    </UFormGroup>

                    <UFormGroup label="Confirm Password" name="confirmPassword">
                        <UInput v-model="form.confirmPassword" type="password" autocomplete="new-password"
                            placeholder="••••••••"
                            class="animate-fade-in transition-all duration-300 hover:ring-1 hover:ring-blue-500" />
                    </UFormGroup>

                    <UButton type="submit" block color="blue" class="animate-pulse-on-hover transition-all duration-300"
                        :loading="isLoading">
                        <template #leading>
                            <UIcon name="i-heroicons-key" class="w-5 h-5" />
                        </template>
                        Reset Password
                    </UButton>

                    <!-- Success message (conditionally shown) -->
                    <div v-if="resetComplete"
                        class="mt-4 p-4 bg-green-50 border border-green-300 rounded-md animate-fade-in">
                        <div class="flex">
                            <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-green-500 mr-2" />
                            <p class="text-sm text-green-700">
                                Password successfully reset!
                            </p>
                        </div>
                    </div>

                    <!-- Error message (conditionally shown) -->
                    <div v-if="errorMessage"
                        class="mt-4 p-4 bg-red-50 border border-red-300 rounded-md animate-fade-in">
                        <div class="flex">
                            <UIcon name="i-heroicons-exclamation-circle" class="h-5 w-5 text-red-500 mr-2" />
                            <p class="text-sm text-red-700">
                                {{ errorMessage }}
                            </p>
                        </div>
                    </div>
                </UForm>

                <!-- Sign in link (shown after successful reset) -->
                <div v-if="resetComplete" class="text-center mt-6">
                    <UButton to="/login" color="blue" variant="link"
                        class="text-sm font-medium transition-colors duration-300">
                        <template #leading>
                            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
                        </template>
                        Proceed to Login
                    </UButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'plain',
});
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Form state
const form = reactive({
    password: '',
    confirmPassword: '',
    resetToken: ''
});

const isLoading = ref(false);
const resetComplete = ref(false);
const errorMessage = ref('');
const tokenValid = ref(true);

// Get token from URL on component mount
onMounted(() => {
    // In a real app, you'd extract the token from the URL
    // This is just a simulation
    form.resetToken = route.query.token || '';

    // Validate token (simulate checking if token is valid)
    if (!form.resetToken) {
        tokenValid.value = false;
        errorMessage.value = 'Invalid or expired password reset link. Please request a new one.';
    }
});

// Form submission handler
const handleSubmit = () => {
    // Reset previous error
    errorMessage.value = '';

    // Validate passwords match
    if (form.password !== form.confirmPassword) {
        errorMessage.value = "Passwords don't match";
        return;
    }

    // Validate password length
    if (form.password.length < 8) {
        errorMessage.value = "Password must be at least 8 characters long";
        return;
    }

    isLoading.value = true;

    // Simulate API call
    setTimeout(() => {
        console.log('Password reset with token:', form.resetToken);
        isLoading.value = false;
        resetComplete.value = true;
        // Here you would typically call your password reset API endpoint
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