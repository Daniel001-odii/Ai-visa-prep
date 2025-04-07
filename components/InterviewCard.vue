<template>
  <UModal v-model="delete_interview">
    <UCard>
      <template #header>
        <b>Delete Interview?</b>
      </template>
      <div class=" flex flex-col">
        <p class=" ">Are you sure you want to delete this interview session.</p>
        <div class=" flex items-end justify-end gap-4 mt-6">
          <UButton @click="delete_interview = !delete_interview" label="Cancel" variant="soft" color="blue" />
          <UButton 
          :disabled="deleting_"
          @click="deleteInterview(interview?._id)" 
          label="Delete" 
          variant="solid" 
          color="red"
            class=" !text-white" />
        </div>
      </div>
    </UCard>
  </UModal>


  <UCard>
    <div class="flex justify-between items-center flex-wrap">
      <div class="flex gap-3 items-center justify-start">
        <div class="flex flex-col gap-3">
          <span class="font-bold text-lg">{{ interview?.visa_type }}
            <UBadge :icon="interview?.status == 'approved'
                ? 'lucide:circle-check'
                : 'lucide:circle-x'
              " size="sm" color="green" variant="outline">{{ interview?.status }}</UBadge>
          </span>
          <div class="flex flex-wrap space-x-3 text-sm">
            <span>
              <UIcon name="lucide:timer-reset" class="mr-1" />
              {{ formattedTime(interview?.duration) }}
            </span>

            <span>
              <UIcon name="lucide:calendar-clock" class="mr-1" />
              {{ new Date(interview.createdAt).toLocaleDateString() }} - {{ new Date(interview.createdAt).toLocaleTimeString() }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-3 items-end mt-4 md:m-0 self-end">
        <UButton @click="navigateTo(`/in/interviews/${interview._id}`)" icon="lucide:eye" variant="ghost" class="w-fit"
          color="blue" size="xs" />
        <UButton @click="return" icon="lucide:cloud-download" variant="ghost" class="w-fit" color="black" size="xs" />

        <UButton 
        @click="delete_interview = !delete_interview" 
        :icon="deleting_ ? 'svg-spinners:bars-rotate-fade':'lucide:trash-2'"
        variant="ghost" class="w-fit"
        color="red" size="xs" />
      </div>
    </div>
  </UCard>
</template>

<script setup>
import { useInterviewStore } from "#imports";

defineProps({
  interview: {
    type: Object,
    required: true,
  },
});

const delete_interview = ref(false);
const emit = defineEmits(['delete']);

const deleting_ = ref(false);

const deleteInterview = async (id) => {
  deleting_.value = true
  const res = await useNuxtApp().$apiFetch(`/visa/${id}/delete`, {
    method: "DELETE",
  });

  useInterviewStore().getInterviews();
  
  delete_interview.value = false;
  emit('delete');
  console.log("deleted interview: ", res);
  deleting_.value = false
};

const formattedTime = (time) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (time % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
};


</script>

<style lang="scss" scoped></style>
