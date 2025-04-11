<template>
  <div class="flex flex-col p-5 min-h-screen justify-center items-center mt-20">
    <div class="flex justify-center items-center flex-col">
      <span class="text-3xl">Welcome back, {{ user?.name }}!</span>
      <span class="">Here's your visa interview preparation status.</span>
      <!-- <UButton @click="navigateTo('/in/interviews/new')" :loading="loading" :disabled="loading" loading-icon="svg-spinners:bars-rotate-fade" label="Start New Practice" class=" w-fit mt-6" color="blue"/> -->
      <UButton
        @click="newInterview()"
        :loading="loading_interview"
        :disabled="loading_interview"
        loading-icon="svg-spinners:bars-rotate-fade"
        label="Start New Practice"
        class="w-fit mt-6"
        color="blue"
      />
    </div>

    <TheStreak :percentage="75" label="Weekly Progress" />

    <div class="flex flex-wrap gap-3 mt-12">
      <UCard
        v-for="(stat, index) in user_Stats"
        :key="index"
        class="w-full md:w-fit min-w-[250px]"
        :class="(stat.id === 3 && user?.subscription == 'free') ? ' !opacity-50':''"
      >
        <div class="flex gap-4 items-center">
          <span
            :class="`bg-${stat.color}-500 text-${stat.color}-500`"
            class="bg-opacity-10 p-3 rounded-md flex justify-center items-center"
          >
            <UIcon :name="stat.icon" class="size-8 border" />
          </span>

          <div class="flex flex-col">
            <div class="flex gap-3 items-center">
              <span>{{ stat.label }}</span>
              <UTooltip arrow :text="stat.info_text">
                <UButton icon="lucide:info" color="neutral" variant="subtle" />
              </UTooltip>
            </div>
           
            <div class="flex items-center font-bold text-xl">
              <span v-if="user?.subscription == 'premium'">{{ stat.value }}</span>
               <UBadge
            v-if="stat.id === 3 && user?.subscription == 'free'"
            label="premium"
            size="xs"
            variant="soft"
            color="blue"
            /></div>
            
          </div>
        </div>
      </UCard>
    </div>

    <div class="mt-12 flex flex-col gap-3 w-full">
      <!-- {{ user }} -->
      <UCard class="flex-1">
        <template #header>
          <div class="relative">
            <h1 class="font-bold text-lg">Daily Visa Interview Tips</h1>
            <span
              >Improve your chances of success with these helpful tips.</span
            >
          </div>
        </template>
        <div class="p-4 flex flex-col gap-4">
            <div
            v-if="loading_tips"
            v-for="item in 2"
            class="flex flex-col gap-2 mt-3"
          >
            <USkeleton class="h-[15px] w-full" />
            <USkeleton class="h-[15px] w-[50%]" />
          </div>
        

          <div class=" flex flex-col gap-6" v-if="!loading_tips && visa_tips.length > 0">
            <p v-for="tip in user?.visa_tip?.tips">"{{ tip }}"</p>
          </div>
          <div
            v-else
            class="text-center flex flex-col gap-3 justify-center items-center"
          >
            <span>Tips not available today</span>
            <!-- <UButton
              :icon="
                loading_tips
                  ? 'svg-spinners:bars-rotate-fade'
                  : 'lucide:refresh-cw'
              "
              variant="outline"
              :disabled="loading_tips"
              class="rounded-full"
              @click="getVisaTips()"
            /> -->
          </div>
        </div>
      </UCard>

      <UCard class="flex-1">
        <template #header>
          <h1 class="font-bold text-lg">Your Recent Interviews</h1>
          <span>Review how you performed in your most recent interviews</span>
        </template>
        <div class="flex flex-col gap-4">
          <span v-if="interviews.length == 0 || !interviews">No interviews yet</span>
          <InterviewCard
            v-if="!loading && interviews.length > 0"
            v-for="(interview, index) in interviews"
            :key="index"
            @delete="handleDeleteInterview"
            :interview="interview"
          />
        </div>
      </UCard>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "default",
});
import { ref, onMounted, nextTick, watch } from "vue";
import { useUserStore } from "#imports";
const toast = useToast();
const userStore = useUserStore();
const user = ref(null);
const user_Stats = reactive([
  {
    id: 1,
    label: "Completed Interviews",
    icon: "lucide:circle-check-big",
    value: 0,
    color: "green",
    info_text: "Total number of interviews you have completed"
  },
  {
    id: 2,
    label: "Total Practice Time",
    icon: "lucide:timer-reset",
    value: "0h 0m",
    color: "blue",
    info_text: "Total practice time for al interviews."
  },
  {
    id: 3,
    label: "Confidence Score",
    icon: "lucide:activity",
    value: 0,
    color: "yellow",
    info_text: "Total number of times in minutes spent in all interview against a certain threshold"
  },
]);

const interviews = ref([]);

const loading = ref(false);
const loading_interview = ref(false);

const newInterview = async () => {
  loading_interview.value = true;
  try {
    const res = await useNuxtApp().$apiFetch("/visa/new_interview", {
      method: "POST",
    });

    useRouter().push(`/in/interviews/${res.interviewId}`);
    console.log("new interview res: ", res);
  } catch (err) {
    console.log("err starting interview: ", err);
    toast.add({
      title: "Error",
      icon: 'lucide:circle-x',
      orientation: "vertical",
      description: err._data.message,
      color: "red",
      actions: [{
      // icon: 'i-lucide-refresh-cw',
      label: 'Subscribe',
      color: 'blue',
      variant: 'soft',
      onClick: (e) => {
        navigateTo("/in/account")
      }
    }]
    })
  }
  loading_interview.value = false;
};

const getDashboardData = async () => {
  try {
    const res = await useNuxtApp().$apiFetch("/user/dashboard_data");
    console.log("dashboard: ", res);
    user_Stats[0].value = res.completed_interviews;
    user_Stats[2].value = `${res.confidence_score}%`;

    const formattedTime = (time) => {
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (time % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    };

    user_Stats[1].value = formattedTime(res.practice_time);
  } catch (err) {
    console.log("err getting dashboard data: ", err);
  }
};

const loading_tips = ref(false);
const visa_tips = ref([]);
const getVisaTips = async () => {
  loading_tips.value = true;
  try {
    const res = await useNuxtApp().$apiFetch("/user/visa_tips");
    console.log("visa tips: ", res);
    visa_tips.value = res.tips;
  } catch (error) {
    console.log("err getting tip: ", error);
  }
  loading_tips.value = false;
};
getVisaTips();

const handleDeleteInterview = async () => {
  loading.value = true;
  await useInterviewStore().getInterviews();
  interviews.value = useInterviewStore()?.interviews?.interviews;
  loading.value = false;
};

getDashboardData();

onMounted(async () => {
  await useUserStore().fetchUser();
  user.value = useUserStore().user;
  await useInterviewStore().getInterviews();
  interviews.value = useInterviewStore()
    ?.interviews?.interviews.reverse()
    .splice(0, 2);
});
</script>
<style></style>
