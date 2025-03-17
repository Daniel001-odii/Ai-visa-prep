<template>
    <div class="container mx-auto py-8 px-4">
        <!-- Account Header -->
        <div class="mb-10">
            <h1 class="text-3xl font-bold mb-2">My Account</h1>
            <p class="text-gray-500 dark:text-gray-400">Manage your profile and preferences</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            <!-- Left sidebar with navigation -->
            <!-- <div class="md:col-span-1">
          <UCard class="sticky top-24">
            <UTabs :items="tabItems" class="w-full" orientation="vertical" :ui="{ list: { base: 'w-full' } }">
              <template #item="{ item }">
                <div class="flex items-center gap-2 py-2">
                  <UIcon :name="item.icon" class="flex-shrink-0" />
                  <span>{{ item.label }}</span>
                </div>
              </template>
</UTabs>
</UCard>
</div> -->
            <div class="sticky top-24">
                <UTabs orientation="vertical" variant="link" 
                :ui="{ root: 'flex !justify-start !items-start', list: { base: 'w-full !justify-start !items-start' }}"
                :content="false" :items="tabItems" class="w-full flex !items-start !justify-start" />
                <!-- <UTabs :items="tabItems" class="w-full text-left flex " variant="link" orientation="vertical"
                    :ui="{ list: { base: 'w-full items-start' } }">
                    <template #item="{ item }">
                        <div class="flex !items-start !justify-start gap-2 py-2">
                            <UIcon :name="item.icon" class="flex-shrink-0" />
                            <span class="text-left">{{ item.label }}</span>
                        </div>
                    </template>
                </UTabs> -->
            </div>


            <!-- Main content area -->
            <div class="md:col-span-2">
                <!-- Profile Section -->
                <UCard class="mb-8">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h2 class="text-xl font-bold">Profile</h2>
                            <UBadge v-if="userSubscription === 'premium'" color="blue" variant="soft">Premium</UBadge>
                            <UBadge v-else-if="userSubscription === 'standard'" color="green" variant="soft">Standard
                            </UBadge>
                            <UBadge v-else color="gray" variant="soft">Free Trial</UBadge>
                        </div>
                    </template>

                    <div v-if="isAuthenticated">
                        <div class="flex items-center gap-4 mb-6">
                            <UAvatar :src="userProfile.avatarUrl || undefined" :alt="userProfile.name" size="xl"
                                :text="userProfile.name.charAt(0) + (userProfile.lastName?.charAt(0) || '')" />
                            <div>
                                <h3 class="font-bold text-lg">{{ userProfile.name }} {{ userProfile.lastName }}</h3>
                                <p class="text-gray-500 dark:text-gray-400">{{ userProfile.email }}</p>
                                <div class="flex items-center mt-1 text-sm">
                                    <UIcon name="i-heroicons-map-pin" class="mr-1" />
                                    <span>{{ userProfile.country }}</span>
                                </div>
                            </div>
                        </div>

                        <UDivider class="my-4" />

                        <form @submit.prevent="updateProfile" class="space-y-4">
                            <div class="grid md:grid-cols-2 gap-4">
                                <UFormGroup label="First Name">
                                    <UInput v-model="userProfile.name" placeholder="First Name" />
                                </UFormGroup>
                                <UFormGroup label="Last Name">
                                    <UInput v-model="userProfile.lastName" placeholder="Last Name" />
                                </UFormGroup>
                            </div>

                            <UFormGroup label="Email">
                                <UInput v-model="userProfile.email" type="email" placeholder="Email" />
                            </UFormGroup>

                            <div class="grid md:grid-cols-2 gap-4">
                                <UFormGroup label="Country of Origin">
                                    <USelect v-model="userProfile.country" :options="countries"
                                        placeholder="Select country" />
                                </UFormGroup>
                                <UFormGroup label="Target Country">
                                    <USelect v-model="userProfile.targetCountry" :options="countries"
                                        placeholder="Select country" />
                                </UFormGroup>
                            </div>

                            <UFormGroup label="Visa Type">
                                <USelect v-model="userProfile.visaType" :options="visaTypes"
                                    placeholder="Select visa type" />
                            </UFormGroup>

                            <UFormGroup label="Planned Interview Date">
                                <UInput v-model="userProfile.interviewDate" type="date" />
                            </UFormGroup>

                            <div class="flex justify-end gap-2">
                                <UButton color="gray" variant="soft" @click="resetForm">Cancel</UButton>
                                <UButton type="submit" color="blue">Save Changes</UButton>
                            </div>
                        </form>
                    </div>

                    <div v-else class="flex flex-col items-center py-6">
                        <USkeleton class="h-16 w-16 rounded-full mb-4" />
                        <USkeleton class="h-5 w-40 mb-2" />
                        <USkeleton class="h-4 w-60 mb-6" />

                        <UAlert icon="i-heroicons-information-circle" color="blue" variant="soft" class="mt-4">
                            <p>Please log in to access your account settings</p>
                        </UAlert>

                        <div class="mt-6">
                            <UButton label="Sign In" color="blue" block @click="login" />
                            <div class="text-center mt-2">
                                <UButton variant="link" size="sm">Create an account</UButton>
                            </div>
                        </div>
                    </div>
                </UCard>

                <!-- Subscription Section -->
                <UCard class="mb-8">
                    <template #header>
                        <h2 class="text-xl font-bold">Subscription</h2>
                    </template>

                    <div v-if="isAuthenticated">
                        <div class="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 mb-6">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h3 class="font-medium">Current Plan</h3>
                                    <p class="font-bold text-lg">{{ getPlanName }}</p>
                                </div>
                                <UBadge v-if="userSubscription !== 'free'" color="green">Active</UBadge>
                                <UBadge v-else color="gray">Inactive</UBadge>
                            </div>

                            <UProgress v-if="userSubscription !== 'free'" :value="daysUsed" :max="totalDays"
                                color="blue" class="mt-4" />

                            <div v-if="userSubscription !== 'free'"
                                class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                {{ daysRemaining }} days remaining
                            </div>
                        </div>

                        <div v-if="userSubscription === 'free'" class="flex flex-col items-center py-4">
                            <UIcon name="i-heroicons-sparkles" class="text-blue-500 text-4xl mb-3" />
                            <h3 class="font-bold text-lg mb-2">Upgrade to Premium</h3>
                            <p class="text-center text-gray-500 dark:text-gray-400 mb-4">
                                Get unlimited interviews, advanced AI feedback, and more.
                            </p>
                            <UButton color="blue" to="/pricing">View Plans</UButton>
                        </div>

                        <div v-else class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-medium">Next billing date</p>
                                    <p class="text-gray-500 dark:text-gray-400">
                                        {{ subscriptionEndDate }}
                                    </p>
                                </div>
                                <UButton v-if="userSubscription !== 'free'" size="sm" color="gray" variant="soft">Manage
                                </UButton>
                            </div>

                            <UDivider />

                            <div>
                                <h4 class="font-medium mb-3">Usage Statistics</h4>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="bg-gray-50 dark:bg-slate-800 p-3 rounded-lg">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Interviews Used</p>
                                        <p class="font-bold text-lg">{{ interviewsUsed }}</p>
                                    </div>
                                    <div class="bg-gray-50 dark:bg-slate-800 p-3 rounded-lg">
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Average Score</p>
                                        <p class="font-bold text-lg">{{ averageScore }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="py-6">
                        <USkeleton class="h-20 w-full mb-4" />
                        <USkeleton class="h-16 w-full" />
                    </div>
                </UCard>

                <!-- Preferences Section -->
                <UCard>
                    <template #header>
                        <h2 class="text-xl font-bold">Preferences</h2>
                    </template>

                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-medium">V.O Bot Level</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Adjust difficulty level of interview
                                    questions
                                </p>
                            </div>
                            <USelectMenu v-model="settings.botLevel" :options="botLevels"
                                :disabled="!isAuthenticated || userSubscription === 'free'" @change="updateSettings" />
                        </div>

                        <UDivider />

                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-medium">Show Previous Messages</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Display chat history during
                                    interviews</p>
                            </div>
                            <UToggle v-model="settings.showPrevMsg"
                                :disabled="!isAuthenticated || userSubscription === 'free'" @change="updateSettings"
                                :ui="{ active: 'bg-blue-500' }" />
                        </div>

                        <UDivider />

                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-medium">Show Recommended Answers</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Get AI-suggested responses</p>
                            </div>
                            <UToggle v-model="settings.showRecAnswers"
                                :disabled="!isAuthenticated || userSubscription === 'free'" @change="updateSettings"
                                :ui="{ active: 'bg-blue-500' }" />
                        </div>

                        <UDivider />

                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-medium">Email Notifications</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Receive updates and tips</p>
                            </div>
                            <UToggle v-model="settings.emailNotifications" :disabled="!isAuthenticated"
                                @change="updateSettings" :ui="{ active: 'bg-blue-500' }" />
                        </div>
                    </div>

                    <template #footer v-if="!isAuthenticated">
                        <UAlert icon="i-heroicons-lock-closed" color="amber">
                            <p>Premium features are available for paid subscribers</p>
                        </UAlert>
                    </template>
                </UCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// Authentication state
const isAuthenticated = ref(false);
const userSubscription = ref('free'); // 'free', 'standard', 'premium'

// Tab navigation
const tabItems = [
    {
        label: 'Profile',
        slot: 'profile',
        icon: 'i-heroicons-user-circle'
    },
    {
        label: 'Subscription',
        slot: 'subscription',
        icon: 'i-heroicons-credit-card'
    },
    {
        label: 'Preferences',
        slot: 'preferences',
        icon: 'i-heroicons-cog-6-tooth'
    },
    {
        label: 'Interview History',
        slot: 'history',
        icon: 'i-heroicons-clock'
    },
    {
        label: 'Security',
        slot: 'security',
        icon: 'i-heroicons-shield-check'
    }
];

// User profile data
const userProfile = reactive({
    name: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    country: 'Nigeria',
    targetCountry: 'United States',
    visaType: 'Student',
    interviewDate: '',
    avatarUrl: ''
});

// Settings
const settings = reactive({
    botLevel: 'Medium',
    showPrevMsg: false,
    showRecAnswers: false,
    emailNotifications: true
});

// Options for selects
const botLevels = ['Easy', 'Medium', 'Hard'];
const countries = ['Nigeria', 'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany'];
const visaTypes = ['Student', 'Tourist', 'Business', 'Work', 'Immigration', 'Family'];

// Subscription data
const subscriptionStartDate = new Date('2025-02-15');
const subscriptionEndDate = new Date('2025-04-15').toLocaleDateString();
const totalDays = 60;
const daysUsed = 30;
const daysRemaining = computed(() => totalDays - daysUsed);
const interviewsUsed = 12;
const averageScore = '78%';

// Plan name based on subscription
const getPlanName = computed(() => {
    switch (userSubscription.value) {
        case 'premium': return 'Premium Plan';
        case 'standard': return 'Standard Plan';
        default: return 'Free Trial';
    }
});

// Methods
const updateSettings = () => {
    localStorage.setItem('visalify_settings', JSON.stringify(settings));
    // In a real app, you would also send this to your backend
    useToast().success('Settings updated successfully');
};

const updateProfile = () => {
    // In a real app, you would send this to your backend
    useToast().success('Profile updated successfully');
};

const resetForm = () => {
    // Reset form to original values
    // In a real app, you would fetch this from your backend
};

const login = () => {
    // In a real app, this would redirect to login page or open a login modal
    isAuthenticated.value = true; // Just for demo purposes
    userSubscription.value = 'premium'; // Just for demo purposes
};

// Load settings from localStorage on component mount
onMounted(() => {
});

</script>