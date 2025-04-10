<template>
  <div class="container mx-auto py-8 px-4 min-h-screen">
    <!-- Account Header -->
    <div class="mb-10">
      <h1 class="text-3xl mb-2">My Account</h1>
      <p class="text-gray-500 dark:text-gray-400">
        Manage your profile and preferences
      </p>
    </div>

    <UTabs
      color="neutral"
      orientation="horizontal"
      :items="items"
      class="w-full"
      size="xs"
    >
      <template #profile="{ item }">
    
        <div class="md:col-span-2">
          <!-- Profile Section -->
          <UCard class="mb-8">
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold">Profile</h2>
                <UBadge :color="user?.subscription == 'free' ? 'orange':'green'" variant="soft">{{ user?.subscription }} user</UBadge>
              </div>
            </template>

            <div v-if="user">
              <div class="flex items-center gap-4 mb-6">
                <UAvatar
                  :src="user?.profile_img || undefined"
                  :alt="user?.name"
                  size="xl"
                />
                <div>
                  <h3 class="font-bold text-lg">{{ user.name }}</h3>
                  <p class="text-gray-500 dark:text-gray-400">
                    {{ user.email }}
                  </p>
                  <div class="flex gap-3">
                    <div class="flex items-center mt-1 text-sm">
                      <UIcon name="i-heroicons-map-pin" class="mr-1" />
                      <span>{{ user.nationality }}</span>
                    </div>
                    <div class="flex items-center mt-1 text-sm">
                      <UIcon
                        name="hugeicons:airplane-take-off-01"
                        class="mr-1"
                      />
                      <span>{{ user.target_country }}</span>
                    </div>
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

                <!-- <UFormGroup label="Email">
                  <UInput
                    v-model="user.email"
                    type="email"
                    placeholder="Email"
                    disabled
                  />
                </UFormGroup> -->

                <div class="grid md:grid-cols-2 gap-4">
                  <UFormGroup label="Country of Origin">
                    <USelectMenu
                      searchable
                      searchable-placeholder="Search a country..."
                      class="!w-full lg:w-48"
                      placeholder="Select country"
                      v-model="user.nationality"
                      :options="countryList"
                      value-attribute="name"
                      option-attribute="name"
                    />
                  </UFormGroup>
                  <UFormGroup label="Target Country">
                    <USelectMenu
                      searchable
                      searchable-placeholder="Search a country..."
                      class="!w-full lg:w-48"
                      placeholder="Select country"
                      v-model="user.target_country"
                      :options="countryList"
                      value-attribute="name"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </div>

                <UFormGroup label="Visa Type">
                  <USelect
                    v-model="user.visa_type"
                    :options="visaTypes"
                    placeholder="Select visa type"
                  />
                </UFormGroup>

                <UFormGroup label="Ever Traveled Before">
                  <USelect
                    v-model="user.travelled_before"
                    :options="yes_no_options"
                    placeholder="Select visa type"
                  />
                </UFormGroup>

                <UFormGroup label="Visa denied before">
                  <USelect
                    v-model="user.visa_refused_before"
                    :options="yes_no_options"
                    placeholder="Select visa type"
                  />
                </UFormGroup>

                <UFormGroup label="Planned Interview Date">
                  <UInput v-model="user.interview_date" type="date" />
                </UFormGroup>

                <div class="flex justify-end gap-2">
                  <UButton
                    loading-icon="svg-spinners:bars-rotate-fade"
                    :loading="updating_profile"
                    type="submit"
                    color="blue"
                    >Save Changes</UButton
                  >
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

      <template #preferences="{ item }">
        <UCard class="mb-8">
          <template #header>
            <div class=" flex flex-col">
                <h2 class="text-xl font-bold">Preferences</h2>
                <small>Enable the following settings below to get the best experience</small>
            </div>
            
          </template>

          <div>
            <form @submit.prevent="updateProfile" class="space-y-4 flex-col flex gap-3">
                <div class=" flex items-center justify-between">
                    <span>Voice Audio playback</span>
                    <UCheckbox :model-value="user.settings.voice_over" v-model="user.settings.voice_over" @change="updateProfile()" />
                </div>
                <div class=" flex items-center justify-between">
                    <span>Show expert suggestions in chat</span>
                    <UCheckbox :model-value="user.settings.expert_suggestions" v-model="user.settings.expert_suggestions" @change="updateProfile()" />
                    <!-- :disabled="user?.subscription == 'free'"/> -->
                </div>

                <div class=" flex items-center justify-between">
                    <span>Send Email Alerts</span>
                    <UCheckbox :model-value="user.settings.daily_tips_mail" v-model="user.settings.daily_tips_mail" @change="updateProfile()" />
                </div>

                <UDivider/>
                <span class=" font-bold">V.O Settings</span>
                <div class=" flex flex-col md:flex-row gap-3 flex-1 justify-center items-start">
                    <UFormGroup label="Visa Officer Gender" class=" flex-1 w-full">
                        <USelect
                        model-value="female"
                        v-model="user.settings.vo_gender"
                        :options="gender_options"
                        placeholder="Select visa type"
                        @change="[updateProfile(),  getAllVoices()]"
                    />
                    </UFormGroup>

                    <UFormGroup label="Visa Officer Voice" class=" flex-1 w-full">
                    <USelectMenu
                        searchable
                        v-model="user.settings.vo_voice"
                        value-attribute="name"
                        option-attribute="name"
                        :options="all_voices"
                        placeholder="Select Officer Voice"
                        @change="updateProfile()"
                        :loading="loading_voices"
                        loading-icon="svg-spinners:bars-rotate-fade"
                        :disabled="loading_voices"
                    />
                    </UFormGroup>
                </div>
                <div class=" flex flex-col gap-3">
                    <span>Select Difficulty Level <UBadge color="orange" size="xs">coming soon</UBadge></span>
                    <InterviewLevel/>
                    <!-- <div class=" md:w-[50%] flex gap-3">
                        <UButton v-for="item in vo_levels" :label="item" variant="ghost" color="blue" size="lg"/>
                    </div> -->
                </div>
                
            </form>
          </div>
        </UCard>
      </template>

      <template #subscription="{ item }">
        <SubscriptionPage/>
      </template>
    </UTabs>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useUserStore } from "#imports";
import { countries } from "countries-list";
const countryList = Object.entries(countries).map(([code, data]) => ({
  code,
  name: data.name,
}));
const toast = useToast();

const user = reactive({
  nationality: "",
  name: "",
  email: "",
  profile_img: "",
  target_country: "Nigeria",
  visa_type: "",
  interview_date: "",
  travelled_before: "",
  visa_refused_before: "",
  occupation: "",
  subscription: null,
  settings: {
    expert_suggestions: true,
    daily_tips_mail: true,
    voice_over: true,
    vo_gender: 'female',
    vo_voice: '',
    test_level: 'easy',
  }
});
const voice_over = ref(true);
const expert_suggestion = ref(true);
const daily_tips_mail = ref(true);

const all_voices = ref([]);

const vo_levels = [
    "stage 1",
    "stage 2",
    "stage 3"
]
// Authentication state
const isAuthenticated = ref(false);
const userSubscription = ref("free"); // 'free', 'standard', 'premium'

// Tab navigation
const items = [
  {
    label: "Profile",
    slot: "profile",
    icon: "i-heroicons-user-circle",
  },
  {
    label: "Preferences",
    slot: "preferences",
    icon: "i-heroicons-cog-6-tooth",
  },
  {
    label: "Subscription",
    slot: "subscription",
    icon: "i-heroicons-credit-card",
  },
];
const yes_no_options = ["yes", "no"];
const gender_options = ["male", "female"];
// Settings
const settings = reactive({
  botLevel: "Medium",
  showPrevMsg: false,
  showRecAnswers: false,
  emailNotifications: true,
});

// Options for selects
const botLevels = ["Easy", "Medium", "Hard"];
const visaTypes = [
"Student Visa (F-1)",
"Work Visa (H-1B)",
"Tourist Visa (B-2)",
"Family Visa"
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
  { value: "combination", label: "Combination of Multiple Sources" },
];
// Subscription data
const subscriptionStartDate = new Date("2025-02-15");
const subscriptionEndDate = new Date("2025-04-15").toLocaleDateString();
const totalDays = 60;
const daysUsed = 30;
const daysRemaining = computed(() => totalDays - daysUsed);
const interviewsUsed = 12;
const averageScore = "78%";

// Plan name based on subscription
const getPlanName = computed(() => {
  switch (user?.subscription) {
    case "premium":
      return "Premium Plan";
    case "standard":
      return "Standard Plan";
    default:
      return "Free Trial";
  }
});

const profileIsComplete = computed(() => {
  const isComplete = !!(
    user &&
    user.target_country &&
    user.visa_type &&
    user.travelled_before &&
    user.visa_refused_before &&
    user.interview_date
  );
  console.log("Profile complete:", isComplete, user);
  return isComplete;
});

const updating_profile = ref(false);
const updateProfile = async () => {
  updating_profile.value = true;
  try {
    const res = await useNuxtApp().$apiFetch("/user/", {
      method: "PATCH",
      body: user,
    });

    toast.add({
      description: "Profile updated successfully!",
      color: "green",
    });
   
  } catch (err) {
    console.log("err profile update: ", err);
    toast.add({
      description: "Error updating profile",
      color: "red",
    });
  }
  updating_profile.value = false;
};

const loading_voices = ref(false)
const getAllVoices = async()=>{
  loading_voices.value = true;
    try{
        const voices = await useNuxtApp().$apiFetch(`/user/ai/voices?gender=${user?.settings?.vo_gender}`);
        console.log("ai voices: ", voices);
        all_voices.value = voices.voices;
    }catch(err){
        console.log("err getting voics: ", err);
    }
    loading_voices.value = false;
}
getAllVoices();
// Load settings from localStorage on component mount
onMounted(async () => {
  await useUserStore().fetchUser();
  user.subscription = useUserStore().user.subscription;
  user.email = useUserStore().user.email;
  user.interview_date = useUserStore().user.interview_date;
  user.name = useUserStore().user.name;
  user.nationality = useUserStore().user.nationality;
  user.profile_img = useUserStore().user.profile_img;
  user.target_country = useUserStore().user.target_country;
  user.visa_type = useUserStore().user.visa_type;
  user.travelled_before = useUserStore().user.travelled_before;
  user.subscription = useUserStore().user.subscription
  user.visa_refused_before = useUserStore().user.visa_refused_before;
  user.interview_date = new Date(useUserStore().user.interview_date).toISOString().split("T")[0];
  user.settings.vo_voice = useUserStore().user.settings.vo_voice;
  user.settings.voice_over = useUserStore().user.settings.voice_over;
  user.settings.expert_suggestions = useUserStore().user.settings.expert_suggestions;
  user.settings.daily_tips_mail = useUserStore().user.settings.daily_tips_mail;
    
    
});
</script>
