<template>
  <div
    class="border-b dark:border-gray-800 bg-white dark:bg-slate-900 bg-opacity-50 z-10 backdrop-blur-lg"
  >
    <!-- NON AUTH NABAR -->
    <div
      v-if="!token"
      class="flex p-3 container mx-auto items-center justify-between relative bg-inherit"
    >
      <!-- LOGO -->
      <TheLogo />

      <div
        :class="mobile_nav ? 'md:flex' : ' hidden md:flex'"
        class="md:mx-auto w-full border gap-3 md:border-none border-b bg-inherit md:relative md:justify-between absolute top-[100%] left-0 justify-center p-2 md:p-0"
      >
        <!-- QUICK LINKS -->
        <div
          class="flex gap-4 md:items-center mx-auto md:flex-row flex-col items-start"
        >
          <UButton
            label="Features"
            variant="link"
            color="black"
            @click="navigateTo('/#features')"
          />
          <UButton
            label="How it Works"
            variant="link"
            color="black"
            @click="gotToPricing"
          />
          <UButton
            label="Pricing"
            variant="link"
            color="black"
            @click="navigateTo('/#FAQ')"
          />
          <UButton
            label="Testimonials"
            variant="link"
            color="black"
            @click="navigateTo('/#FAQ')"
          />
        </div>

        <!-- ACTIONS -->
        <div class="flex flex-row gap-3 items-center w-fit mt-6 md:mt-0">
          <UButton
            :icon="
              isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />

          <NuxtLink to="/register">
            <UButton label="Sign Up" color="blue" variant="soft" />
          </NuxtLink>

          <NuxtLink to="/login">
            <UButton label="Sign in" color="blue" variant="solid" />
          </NuxtLink>
        </div>
      </div>

      <UButton
        class="md:hidden"
        icon="hugeicons:menu-11"
        color="black"
        variant="soft"
        @click="toggleMenu()"
      />
    </div>

    <div
      v-else
      class="flex p-3 container mx-auto items-center justify-between relative bg-inherit"
    >
      <!-- LOGO -->
      <NuxtLink to="/">
        <div class="flex flex-row gap-3 items-center justify-center">
          <img src="../public/favicon.ico" class="w-[30px]" />
          <span class="font-bold">Visalify</span>
        </div>
      </NuxtLink>

      <div class="flex items-center justify-center gap-3">
        <!-- Feedback Button -->
        
        
        <!--  <UButton 
        :disabled="profileIsComplete"
        @click="navigateTo('/in/interview')"
        icon="hugeicons:comment-add-01" 
        variant="outline" label="New" color="blue" /> -->
        <!-- <span>{{ user }}</span> -->

        <NuxtLink to="/in/account?tab=subscription">
          <UBadge
            :color="user?.subscription == 'free' ? 'orange' : 'green'"
            variant="soft"
            >{{ user?.subscription }} user</UBadge
          >
        </NuxtLink>
        <!-- USER PROFILE -->
        <UDropdown
          class=""
          :items="items"
          :content="{
            align: 'start',
            side: 'bottom',
            sideOffset: 8,
          }"
          :ui="{
            // item: { disabled: 'cursor-text select-text' },
            background: 'bg-white dark:bg-slate-900',
          }"
          :popper="{ placement: 'bottom-start' }"
        >
          <UAvatar
            :src="user?.profile_img || undefined"
            :alt="user?.name"
            :ui="{ avatar: { slots: { root: 'rounded-full !bg-inherit' } } }"
          />

          <!-- <template #account="{ item }">
            <div class="text-left">
              <p>Signed in as</p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ user?.email }}
              </p>
            </div>
          </template> -->

          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </template>
        </UDropdown>
      </div>
    </div>
  </div>

  <!-- ACCOUNT MODAL -->
  <UModal v-model="account_modal" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Settings
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="account_modal = false"
          />
        </div>
      </template>
      <TheAccount />
    </UCard>
  </UModal>

  <!-- PREVIOUS TESTS MODAL -->
  <UModal v-model="prev_tests_modal" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Previous Tests
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="prev_tests_modal = false"
          />
        </div>
      </template>
      <ThePreviousTest />
    </UCard>
  </UModal>

  <!-- FEEDBACK MODAL -->
  <UModal v-model="feedback_modal" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Share Your Feedback
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="feedback_modal = false"
          />
        </div>
      </template>

      <div class="p-4">
        <form @submit.prevent="submitFeedback">
          <div class="space-y-4">
            <UFormGroup label="Feedback Type">
              <USelect
                v-model="feedback.type"
                :options="[
                  { label: 'Bug Report', value: 'bug' },
                  { label: 'Feature Request', value: 'feature' },
                  { label: 'General Feedback', value: 'other' }
                ]"
                placeholder="Select feedback type"
              />
            </UFormGroup>

            <UFormGroup label="Your Feedback">
              <UTextarea
                v-model="feedback.message"
                placeholder="Please share your thoughts..."
              />
            </UFormGroup>

            <UFormGroup v-if="!token" label="Email (optional)">
              <UInput
                v-model="feedback.email"
                type="email"
                placeholder="your@email.com"
              />
            </UFormGroup>

            <div class="flex justify-end">
              <UButton
                type="submit"
                color="blue"
                :loading="submitting"
                :disabled="!feedback.message"
              >
                Submit Feedback
              </UButton>
            </div>
          </div>
        </form>
      </div>
    </UCard>
  </UModal>
</template>

<script setup>
import ThePreviousTest from "./ThePreviousTest.vue";
import { useUserStore } from "#imports";

const token = useCookie("vy_token").value;

const gotToPricing = () => {
  $emit("goToPricing");
};

const logout = () => {
  const token = useCookie("vy_token");
  token.value = null; // Clear the token
  navigateTo("/login"); // Redirect to the login page
};

const mobile_nav = ref(false);
const toggleMenu = () => {
  mobile_nav.value == false
    ? (mobile_nav.value = true)
    : (mobile_nav.value = false);
};

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const items = [
/*   [
    {
      label: "johndoe@example.com",
      slot: "account",
      disabled: true,
    },
  ], */
  [
    {
      label: "Dashboard",
      icon: "heroicons:bars-3-bottom-right",
      click: () => {
        navigateTo("/in/dashboard");
      },
    },
    {
      label: "My Interviews",
      icon: "heroicons:rectangle-stack",
      click: () => {
        navigateTo("/in/interviews");
      },
      /* click: () => {
        prev_tests_modal.value = true;
      }, */
    },
    {
      label: "Settings",
      icon: "heroicons:cog-6-tooth",
      click: () => {
        navigateTo("/in/account");
      },
    },
    {
      label: "Send Feedback",
      icon: "heroicons:chat-bubble-left-right",
      click: () => {
        feedback_modal.value = true;
      }
    }

   /*  {
      label: "Switch Theme",
      icon: "iconoir:fill-color",
      click: () => {
        isDark.value = !isDark.value;
      },
    }, */
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        logout();
      },
    },
  ],
];

const account_modal = ref(false);
const prev_tests_modal = ref(false);

const user = ref(null);

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

const feedback_modal = ref(false);
const submitting = ref(false);
const feedback = reactive({
  type: '',
  message: '',
  email: ''
});

const submitFeedback = async () => {
  submitting.value = true;
  try {
    // Here you would typically make an API call to save the feedback
    // For now, we'll just show a success message
    useToast().add({
      title: 'Thank you!',
      description: 'Your feedback has been submitted successfully.',
      color: 'green'
    });
    feedback_modal.value = false;

    console.log("submitted: ", feedback)

    const res = await useNuxtApp().$apiFetch("/feedback", {
      method: "POST",
      body: {
        comment: feedback.message || "test test",
        category: feedback.type,
        email: user?.email,
      }
    })
    console.log("res from feedback: ", res);
    // Reset form
    feedback.type = "";
    feedback.message = "";
  } catch (error) {
    useToast().add({
      title: 'Error',
      description: 'Failed to submit feedback. Please try again.',
      color: 'red'
    });
    console.log("feedback error; ", error);
  } finally {
    submitting.value = false;
  }
};

onMounted(async () => {
  await useUserStore().fetchUser();
  user.value = useUserStore().user;
});
</script>

<style lang="scss" scoped></style>
