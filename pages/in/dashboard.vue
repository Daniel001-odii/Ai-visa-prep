<template>
  <div class="flex flex-col p-5 min-h-screen justify-center items-center">
    <div class="flex justify-center items-center flex-col">
      <span class="text-3xl">Welcome back, John!</span>
      <span class="">Here's your visa interview preparation status.</span>
      <!-- <UButton @click="navigateTo('/in/interviews/new')" :loading="loading" :disabled="loading" loading-icon="svg-spinners:bars-rotate-fade" label="Start New Practice" class=" w-fit mt-6" color="blue"/> -->
      <UButton
        @click="newInterview()"
        :loading="loading"
        :disabled="loading"
        loading-icon="svg-spinners:bars-rotate-fade"
        label="Start New Practice"
        class="w-fit mt-6"
        color="blue"
      />
    </div>

    <div class="flex flex-wrap gap-3 mt-12">
      <UCard
        v-for="(stat, index) in user_Stats"
        :key="index"
        class="w-full md:w-fit min-w-[250px]"
      >
        <div class="flex gap-4 items-center">
          <span
            :class="`bg-${stat.color}-500 text-${stat.color}-500`"
            class="bg-opacity-10 p-3 rounded-md flex justify-center items-center"
          >
            <UIcon :name="stat.icon" class="size-8 border" />
          </span>

          <div class="flex flex-col">
            <span>{{ stat.label }}</span>
            <span class="font-bold text-xl">{{ stat.value }}</span>
          </div>
        </div>
      </UCard>
    </div>

    <div class="mt-12 flex flex-col gap-6">
      
      <UCard>
        <template #header>
          <h1 class="font-bold text-lg">Daily Visa Interview Tips</h1>
          <span>Improve your chances of success with these helpful tips.</span>
        </template>
        <div class="p-4 flex flex-col gap-4">
          <p>
            Research the company and the role you are applying for. This will
            help you tailor your answers to the specific job and show your
            interest in the company.
          </p>
          <p>
            Always maintain eye contact with the interviewer to show confidence
            and honesty.
          </p>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h1 class="font-bold text-lg">Your Recent Interviews</h1>
          <span>Review how you performed in your most recent interviews</span>
        </template>
        <div class="flex flex-col gap-4">
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

const userStore = useUserStore();
const user_Stats = reactive([
  {
    label: "Completed Interviews",
    icon: "lucide:circle-check-big",
    value: 0,
    color: "green",
  },
  {
    label: "Total Practice Time",
    icon: "lucide:timer-reset",
    value: "0h 0m",
    color: "blue",
  },
  {
    label: "Confidence Score",
    icon: "lucide:activity",
    value: 0,
    color: "yellow",
  },
]);

const interviews = ref([]);

const loading = ref(false);

const newInterview = async () => {
  loading.value = true;
  try {
    const res = await useNuxtApp().$apiFetch("/visa/new_interview", {
      method: "POST",
    });

    useRouter().push(`/in/interviews/${res.interviewId}`);
    console.log("new interview res: ", res);
  } catch (err) {
    console.log("err starting interview: ", err);
  }
  loading.value = false;
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

getDashboardData();

onMounted(async () => {
  await useInterviewStore().getInterviews();
  interviews.value = useInterviewStore()
    ?.interviews?.interviews.reverse()
    .splice(0, 2);
});
</script>
<style></style>
