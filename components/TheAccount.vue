<template>
    <div class="container mx-auto py-8 px-4 min-h-screen">
        <!-- Account Header -->
        <div class="mb-10">
            <h1 class="text-3xl font-bold mb-2">My Account</h1>
            <p class="text-gray-500 dark:text-gray-400">Manage your profile and preferences</p>
        </div>

        <UTabs color="neutral" orientation="horizontal" :items="items" class="w-full">
            <template #profile="{ item }">
                <div class="md:col-span-2">
                    <!-- Profile Section -->
                    <UCard class="mb-8">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h2 class="text-xl font-bold">Profile</h2>
                                <UBadge v-if="userSubscription === 'premium'" color="blue" variant="soft">
                                    Premium</UBadge>
                                <UBadge v-else-if="userSubscription === 'standard'" color="green" variant="soft">
                                    Standard
                                </UBadge>
                                <UBadge v-else color="orange" variant="soft">Free Trial</UBadge>
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
                                        <USelectMenu searchable searchable-placeholder="Search a country..."
                                            class="!w-full lg:w-48" placeholder="Select country"
                                            v-model="user.nationality" :options="countryList" value-attribute="name"
                                            option-attribute="name" />
                                    </UFormGroup>
                                    <UFormGroup label="Target Country">
                                        <USelectMenu searchable searchable-placeholder="Search a country..."
                                            class="!w-full lg:w-48" placeholder="Select country"
                                            v-model="user.target_country" :options="countryList" value-attribute="name"
                                            option-attribute="name" />
                                    </UFormGroup>
                                </div>

                                <UFormGroup label="Visa Type">
                                    <USelect v-model="user.visa_type" :options="visaTypes"
                                        placeholder="Select visa type" />
                                </UFormGroup>

                                <UFormGroup label="Ever Traveled Before">
                                    <USelect v-model="user.travelled_before" :options="yes_no_options"
                                        placeholder="Select visa type" />
                                </UFormGroup>

                                <UFormGroup label="Visa denied before">
                                    <USelect v-model="user.visa_refused_before" :options="yes_no_options"
                                        placeholder="Select visa type" />
                                </UFormGroup>

                                <UFormGroup label="Planned Interview Date">
                                    <UInput v-model="user.interview_date" type="date" />
                                </UFormGroup>

                                <div class="flex justify-end gap-2">
                                    <UButton :icon="updating_profile ? 'svg-spinners:bars-rotate-fade' : ''" :loading="updating_profile"
                                        type="submit" color="blue">Save
                                        Changes</UButton>
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
            </template>
        </UTabs>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useUserStore } from '#imports';
import { countries } from 'countries-list';
const countryList = Object.entries(countries).map(([code, data]) => ({ code, name: data.name }));
const toast = useToast();

const user = reactive({
    nationality: '',
    name: '',
    email: '',
    profile_img: '',
    target_country: '',
    visa_type: '',
    interview_date: '',
    travelled_before: '',
    visa_refused_before: '',
    occupation: '',
});

// Authentication state
const isAuthenticated = ref(false);
const userSubscription = ref('free'); // 'free', 'standard', 'premium'

// Tab navigation
const items = [
    {
        label: 'Profile',
        slot: 'profile',
        icon: 'i-heroicons-user-circle'
    },
    {
        label: 'Preferences',
        slot: 'preferences',
        icon: 'i-heroicons-cog-6-tooth'
    },
    {
        label: 'Subscription',
        slot: 'subscription',
        icon: 'i-heroicons-credit-card',
        disabled: true,
    },
];
const yes_no_options = ["yes", "no"];
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
const visaTypes = [
    "Tourist Visa",
    "Work Visa",
    "Student Visa",
    "Transit Visa",
    "Business Visa",
    "Immigrant Visa",
    "Visitor Visa"
];

const visaFundOptions = [
    { value: "self_funded", label: "Self-Funded (Personal Savings)" },
    { value: "family_sponsor", label: "Sponsored by Family/Relative" },
    { value: "employer_sponsor", label: "Sponsored by Employer" },
    { value: "scholarship", label: "Scholarship or Grant" },
    { value: "education_loan", label: "Education Loan" },
    { value: "government_sponsor", label: "Government Sponsorship" },
    { value: "business_funds", label: "Business or Corporate Sponsorship" },
    { value: "crowdfunding", label: "Crowdfunding or Public Donations" },
    { value: "combination", label: "Combination of Multiple Sources" }
];
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
const updateSettings = async () => {

};

const updating_profile = ref(false);
const updateProfile = async () => {
    updating_profile.value = true;
    try {
        const res = await useNuxtApp().$apiFetch('/user/', {
            method: 'PUT',
            body: user
        })

        toast.add({
            description: "Profile updated successfully!",
            color: 'green'
        })
    } catch (err) {
        console.log("err profile update: ", err)
        toast.add({
            description: "Error updating profile",
            color: 'red'
        })
    }
    updating_profile.value = false;
};

const resetForm = () => {
    // Reset form to original values
    // In a real app, you would fetch this from your backend
};

// Load settings from localStorage on component mount
onMounted(async () => {
    await useUserStore().fetchUser();
    user.email = useUserStore().user.email;
    user.interview_date = useUserStore().user.interview_date;
    user.name = useUserStore().user.name;
    user.nationality = useUserStore().user.nationality;
    user.profile_img = useUserStore().user.profile_img;
    user.target_country = useUserStore().user.target_country;
    user.visa_type = useUserStore().user.visa_type;
    user.travelled_before = useUserStore().user.travelled_before;
    user.visa_refused_before = useUserStore().user.visa_refused_before;
    user.interview_date = new Date(useUserStore().user.interview_date).toISOString().split("T")[0];
});

</script>