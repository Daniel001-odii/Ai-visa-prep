<template>
  <div class="min-h-screen flex flex-col gap-6 p-4">
    <div class="flex justify-between items-center">
      <div class="flex items-center flex-col">
        <h1 class="text-3xl">My Interviews</h1>
        <span class="text-gray-500 text-sm">Manage your visa interviews</span>
      </div>
      <UButton
        @click="newInterview()"
        icon="lucide:plus"
        :label="loading_new_interview? 'loading...':'New Interview'"
        color="blue"
        variant="solid"
        :disabled="loading_new_interview"
      />
    </div>

    <div class="mt-6 flex flex-col gap-3">
      <!-- {{ interviews }} -->
      <div
        v-if="!loading && interviews.length === 0 || !interviews"
        class="text-center text-gray-500"
      >
        No interviews found.
      </div>
      <UCard v-if="loading" v-for="item in 3">
        <div class="flex flex-col gap-3">
          <USkeleton class="w-[200px] h-6" />
          <div class="flex gap-3">
            <USkeleton class="w-[150px] h-6" />
            <USkeleton class="w-[150px] h-6" />
            <USkeleton class="w-[150px] h-6" />
          </div>
        </div>
      </UCard>

      <!-- {{ interviews }} -->
      <InterviewCard
        v-if="!loading && interviews.length > 0"
        v-for="(interview, index) in interviews"
        :key="index"
        @delete="handleDeleteInterview"
        :interview="interview"
      />
    </div>
  </div>
</template>

<script setup>
import { useInterviewStore } from "#imports";

/* await useUserStore().fetchUser();
user.value = useUserStore().user; */

const loading = ref(false);
const loading_new_interview = ref(false);
const interviewstore = useInterviewStore();

const interviews = ref([]);

const newInterview = async () => {
  loading_new_interview.value = true;
  try{
    const res = await useNuxtApp().$apiFetch("/visa/new_interview", {
      method: "POST",
    });

    useRouter().push(`/in/interviews/${res.interviewId}`);
    console.log("new interview res: ", res);
  }catch(err){
    console.log("err starting interview: ", err)
  }
  loading_new_interview.value = false;
};

// when the delete is emitted.. refresh interview lists..
const handleDeleteInterview = async () => {
  loading.value = true;
  await useInterviewStore().getInterviews();
  interviews.value = useInterviewStore()?.interviews?.interviews;
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  await useInterviewStore().getInterviews();
  interviews.value = useInterviewStore()?.interviews?.interviews.reverse();
  loading.value = false;
});
</script>

<style scoped></style>
