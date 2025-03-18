<template>
    <div class="container mx-auto py-8 px-4 min-h-screen">
        <!-- Account Header -->
        <div class="mb-10">
            <h1 class="text-3xl font-bold mb-2">My Account</h1>
            <p class="text-gray-500 dark:text-gray-400">Manage your profile and preferences</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            <div class="sticky">
                <UCard>
                    <div class=" flex flex-col gap-2">
                        <UButton v-for="item in tabItems" variant="ghost" :label="item.label" :icon="item.icon"
                            color="blue" />
                    </div>
                </UCard>
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

                    <div v-if="user">
                        <div class="flex items-center gap-4 mb-6">
                            <UAvatar :src="user?.profile_img || undefined" :alt="user?.name" size="xl" />
                            <div>
                                <h3 class="font-bold text-lg">{{ user.name }}</h3>
                                <p class="text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                                <div class="flex items-center mt-1 text-sm">
                                    <UIcon name="i-heroicons-map-pin" class="mr-1" />
                                    <span>{{ user.nationality }}</span>
                                </div>
                            </div>
                        </div>

                        <UDivider class="my-4" />

                        <form @submit.prevent="updateProfile" class="space-y-4">
                            <!-- <div class="grid md:grid-cols-2 gap-4"> -->
                            <UFormGroup label="username">
                                <UInput v-model="user.name" placeholder="username" />
                            </UFormGroup>
                            <!-- </div> -->

                            <UFormGroup label="Email">
                                <UInput v-model="user.email" type="email" placeholder="Email" />
                            </UFormGroup>

                            <div class="grid md:grid-cols-2 gap-4">
                                <UFormGroup label="Country of Origin">
                                   <!--  <USelectMenu searchable searchable-placeholder="Search a country..." class="!w-full lg:w-48"
                                        placeholder="Select country" v-model="user.nationality" :options="countryList"
                                        value-attribute="name" option-attribute="name" /> -->
                                </UFormGroup>
                                <UFormGroup label="Target Country">
                                    <!-- <USelect v-model="userProfile.targetCountry" :options="countries"
                                        placeholder="Select country" /> -->
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
                    </div>
                </UCard>

               
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useUserStore } from '#imports';
import { countries } from 'countries-list';
const countryList = Object.entries(countries).map(([code, data]) => ({ code, name: data.name }));

const user = ref(null);

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
// const countries = ['Nigeria', 'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany'];
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

// Load settings from localStorage on component mount
onMounted( async() => {
    await useUserStore().fetchUser();
    user.value = useUserStore().user;
});

</script>