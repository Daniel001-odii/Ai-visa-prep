<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header
      class="container mx-auto px-4 py-6 flex justify-between items-center"
    >
      <div class="flex items-center gap-2">
        <img src="../../public/favicon.ico" class="w-[30px]" />
      </div>
      <!--  <div class="flex items-center gap-4">
        <button
          v-if="currentStep > 1"
          @click="prevStep"
          class="text-sm  transition-colors"
        >
          Back
        </button>
        <button
          v-if="currentStep < totalSteps"
          @click="skipToLast"
          class="text-sm  transition-colors"
        >
          Skip
        </button>
      </div> -->
    </header>

    <!-- Progress bar -->
    <div class="container mx-auto px-4 mb-8">
      <div class="h-1 bg-slate-700/20 rounded-full overflow-hidden">
        <div
          class="h-full bg-blue-500 transition-all duration-300 ease-in-out"
          :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
        ></div>
      </div>
      <div class="flex justify-between mt-2 text-xs text-slate-400">
        <span>Step {{ currentStep }} of {{ totalSteps }}</span>
        <span
          >{{ Math.round((currentStep / totalSteps) * 100) }}% Complete</span
        >
      </div>
    </div>

    <!-- Main content -->
    <main class="container mx-auto px-4 py-6">
      <UCard class="max-w-2xl mx-auto">
        <!-- Step content with transitions -->
        <Transition name="fade" mode="out-in">
          <div :key="currentStep" class="">
            <!-- Step 1: Welcome -->
            <div v-if="currentStep === 1" class="space-y-6">
              <div class="flex justify-center mb-8">
                <div class="relative">
                  <img src="../../public/favicon.ico" class="w-[50px]" />
                  <!-- <div class="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 blur"></div> -->
                </div>
              </div>

              <h2 class="text-2xl font-bold text-center">
                Welcome to Visalify
              </h2>
              <p class="text-center">
                Your AI-powered assistant for a smooth visa application process
              </p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div
                  class="p-4 rounded-lg flex flex-col items-center text-center"
                >
                  <BrainCircuit class="h-8 w-8 text-blue-400 mb-2" />
                  <h3 class="font-medium">AI Interview Prep</h3>
                  <p class="text-sm mt-1">Practice with our AI interviewer</p>
                </div>
                <div
                  class="p-4 rounded-lg flex flex-col items-center text-center"
                >
                  <FileCheck class="h-8 w-8 text-blue-400 mb-2" />
                  <h3 class="font-medium">Document Checker</h3>
                  <p class="text-sm mt-1">Verify your documents are correct</p>
                </div>
                <div
                  class="p-4 rounded-lg flex flex-col items-center text-center"
                >
                  <UIcon
                    name="lucide:lightbulb"
                    class="h-8 w-8 text-blue-400 mb-2"
                  />
                  <h3 class="font-medium">Daily personalized tips</h3>
                  <p class="text-sm mt-1">
                    Get daily personalized tips based on your preferences
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 2: Personal Information -->
            <div v-if="currentStep === 2" class="space-y-6">
              <h2 class="text-2xl font-bold">Visa Information</h2>
              <p class="">
                Let's start with some basic information to personalize your
                experience
              </p>

              <div class="space-y-4 mt-6">
                <div class="grid md:grid-cols-2 gap-4">
                  <UFormGroup label="Country of Origin">
                    <USelectMenu
                      searchable
                      searchable-placeholder="Search a country..."
                      class="!w-full lg:w-48"
                      placeholder="Select country"
                      v-model="formData.nationality"
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
                      v-model="formData.target_country"
                      :options="countryList"
                      value-attribute="name"
                      option-attribute="name"
                    />
                  </UFormGroup>
                </div>
                <UFormGroup label="Ever Traveled Before">
                  <USelect
                    v-model="formData.travelled_before"
                    :options="yes_no_options"
                    placeholder="Select visa type"
                  />
                </UFormGroup>

                <UFormGroup label="Visa denied before">
                  <USelect
                    v-model="formData.visa_refused_before"
                    :options="yes_no_options"
                    placeholder="Select visa type"
                  />
                </UFormGroup>

                <UFormGroup label="Planned Interview Date">
                  <UInput v-model="formData.interview_date" type="date" />
                </UFormGroup>
              </div>
            </div>

            <!-- Step 3: Visa Type -->
            <div v-if="currentStep === 3" class="space-y-6">
              <h2 class="text-2xl font-bold">Select Visa Type</h2>
              <p class="">
                Choose the visa type that best fits your travel purpose
              </p>

              <div class="space-y-3 mt-6">
                <div
                  v-for="visa in visa_types"
                  :key="visa.id"
                  @click="selectVisa(visa.name)"
                  class="relative border border-slate-600/5 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-slate-600/10"
                  :class="{
                    '!border-blue-500 bg-blue-500/10':
                      formData.visa_type === visa.name,
                  }"
                >
                  <div class="flex items-start">
                    <div class="flex-shrink-0 mt-1">
                      <component
                        :is="visa.icon"
                        class="h-5 w-5 text-blue-400"
                      />
                    </div>
                    <div class="ml-4">
                      <h3 class="font-medium">{{ visa.name }}</h3>
                      <p class="text-sm mt-1">
                        {{ visa.description }}
                      </p>
                      <div
                        class="mt-2 flex items-center text-xs text-slate-400"
                      >
                        <Clock class="h-3.5 w-3.5 mr-1" />
                        <span>Processing time: {{ visa.processingTime }}</span>
                      </div>
                    </div>
                  </div>
                 <!--  <UIcon
                    v-if="formData.visa_type === visa.name"
                    name="lucide:check"
                    class="text-blue-500 absolute right-5 top-[50%] -translate-y-[50%]"
                  /> -->
                </div>
              </div>
            </div>

            <!-- Step 5: Get Started -->
            <div v-if="currentStep === 4" class="space-y-6">
              <div class="flex justify-center mb-8">
                <div class="relative">
                  <div
                    class="relative border dark:border-gray-600 rounded-full p-4"
                  >
                    <CheckCircle class="h-12 w-12 text-green-400" />
                  </div>
                </div>
              </div>

              <h2 class="text-2xl font-bold text-center">You're All Set!</h2>
              <p class="text-center">
                Your profile is ready. Let's start preparing for your visa
                interview.
              </p>
              <div class="rounded-lg p-4 mt-6">
                <h3 class="font-medium flex items-center">
                  <Info class="h-4 w-4 text-blue-400 mr-2" />
                  Next Steps
                </h3>
                <ul class="mt-3 space-y-2 text-sm">
                  <li class="flex items-start">
                    <CheckCircle2 class="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                    <span>Complete your profile with additional details</span>
                  </li>
                  <li class="flex items-start">
                    <CheckCircle2 class="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                    <span>Upload required documents for verification</span>
                  </li>
                  <li class="flex items-start">
                    <CheckCircle2 class="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                    <span
                      >Schedule your first AI interview practice session</span
                    >
                  </li>
                  <li class="flex items-start">
                    <CheckCircle2 class="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                    <span>Review visa application tips and guidelines</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Navigation buttons -->
        <template #footer>
          <div class="flex justify-between">
            <UButton
              v-if="currentStep > 1"
              @click="prevStep"
              label="Back"
              icon="lucide:chevron-left"
              size="sm"
              variant="ghost"
              color="gray"
            />
            <div v-else></div>

            <UButton
              @click="nextStep()"
              :label="currentStep === totalSteps ? 'Get Started' : 'Continue'"
              :icon="updating_profile ? 'svg-spinners:bars-rotate-fade':'lucide:chevron-right'"
              :disabled="updating_profile"
              size="sm"
              variant="solid"
              color="blue"
              trailing
            />
          </div>
        </template>
      </UCard>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "plain",
});
import { countries } from "countries-list";
import { ref, computed } from "vue";
import {
  BrainCircuit,
  FileCheck,
  Clock,
  CheckCircle,
  CheckCircle2,
  Info,
  GraduationCap,
  Briefcase,
  Plane,
  Users,
} from "lucide-vue-next";
const toast = useToast();

// State
const currentStep = ref(1);
const totalSteps = 4;
const yes_no_options = ["yes", "no"];

const formData = reactive({
  nationality: "",
  visa_type: null,
  target_country: "",
  travelled_before: "",
  visa_refused_before: "",
  interview_date: "",
  onboarding_complete: true,
});

// Sample data

const countryList = Object.entries(countries).map(([code, data]) => ({
  code,
  name: data.name,
}));

const visa_types = [
  {
    id: 1,
    name: "Student Visa (F-1)",
    description: "For academic students admitted to a US academic institution",
    processingTime: "3-5 weeks",
    icon: GraduationCap,
  },
  {
    id: 2,
    name: "Work Visa (H-1B)",
    description: "For professionals in specialty occupations",
    processingTime: "6-8 weeks",
    icon: Briefcase,
  },
  {
    id: 3,
    name: "Tourist Visa (B-2)",
    description: "For tourism, vacation, or visiting friends and relatives",
    processingTime: "2-4 weeks",
    icon: Plane,
  },
  {
    id: 4,
    name: "Family Visa",
    description:
      "For immediate relatives of US citizens or permanent residents",
    processingTime: "5-7 weeks",
    icon: Users,
  },
];

// Methods
const nextStep2 = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const nextStep = () => {
  if (currentStep.value === 2) {
    if (
      formData.nationality == "" ||
      formData.target_country == "" ||
      formData.visa_type == "" ||
      formData.travelled_before == "" ||
      formData.visa_refused_before == "" ||
      formData.interview_date == ""
    ) {
      toast.add({
        description: "All Fields are required!",
        color: "red",
      });
      return;
    } else {
    }
  }

  if(currentStep.value < totalSteps){
    currentStep.value += 1;
  } else {
    // onboard here...
    updateProfile();
  }

};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const updating_profile = ref(false);
const updateProfile = async () => {
  updating_profile.value = true;
  try {
    const res = await useNuxtApp().$apiFetch("/user/profile", {
      method: "PUT",
      body: formData,
    });

    toast.add({
      description: "Profile updated successfully!",
      color: "green",
    });

    navigateTo("/in/dashboard");
  } catch (err) {
    console.log("err profile update: ", err);
    toast.add({
      description: "Error updating profile",
      color: "red",
    });
  }
  updating_profile.value = false;
};

const selectVisa = (name) => {
  formData.visa_type = name;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
