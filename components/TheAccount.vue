<template>
    <div>

        <div class="flex flex-col gap-12">
            <!-- <div class=" w-full rounded-md text-white dark:border-gray-600 bg-black h-[150px] bg-right-bottom bg-contain flex flex-col p-5"
            :style="`background: url(${grok_image})`">
            <div class=" flex justify-between items-center">
                <span class=" text-3xl">Ai-Visa Pro</span>
                <UButton icon="iconoir:user-star" label="Premium" color="orange" class=" w-fit !text-white" />
            </div>

            <ul class="mt-3 text-sm list-disc ml-5">
                <li>Show Recommended Answers</li>
                <li>Show Previous messages in chats</li>
                <li>Select prefered bot level</li>
            </ul>

        </div> -->
            <div>
                <span class=" font-bold">Profile</span>
                <div class=" flex flex-col mt-2">
                    <div class=" flex gap-3" v-if="false">
                        <UAvatar alt="Benjamin Canac" size="lg" />
                        <div class=" flex flex-col">
                            <span>Odii Daniel</span>
                            <span>xenithheight@gmail.com</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between gap-3 flex-wrap">
                        <div class=" flex items-center gap-3">
                            <USkeleton class="h-12 w-12 rounded-full" />
                            <div class="grid gap-2">
                                <USkeleton class="h-4 w-[250px]" />
                                <USkeleton class="h-4 w-[200px]" />
                            </div>
                        </div>
                        <UButton
                        disabled
                        label="login"
                        />
                    </div>

                </div>
            </div>

            <div>
                <div class=" font-bold flex items-center gap-3">
                    <span>Preferences</span> 
                    <UBadge icon="i-lucide-rocket" size="xs" color="orange" variant="solid">Premium</UBadge>
                </div>
                <div class=" flex flex-col gap-3 mt-2 text-sm">
                    <div class=" flex justify-between items-center">
                        <span>V.O Bot Level </span>
                        <USelectMenu v-model="selected_level" :options="bot_levels" disabled />
                    </div>
                    <div class=" flex justify-between items-center">
                        <span>Show Previous messages in chat </span>
                        <UToggle v-model="settings.show_prev_msg" @change="updateSettings" :ui="{ active: ' bg-blue-500' }" />
                    </div>
                    <div class=" flex justify-between">
                        <span>Show Recommended Answers</span>
                        <UToggle v-model="settings.show_rec_answers" @change="updateSettings" :ui="{ active: ' bg-blue-500' }" />
                    </div>
                    <div class=" flex justify-between">
                        <span>Email Notifications</span>
                        <UToggle v-model="selected" :ui="{ active: ' bg-blue-500' }" disabled />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import grok_image from '@/assets/images/grok.png'
const selected = ref(true);
const bot_levels = ['Easy', 'Medium', 'Hard'];
const selected_level = ref(bot_levels[0]);

const settings = reactive({
    show_prev_msg: false,
    show_rec_answers: false,
})

// const settings = localStorage.getItem('settings')
const updateSettings =()=>{
    localStorage.setItem('settings',JSON.stringify(settings));
}

onMounted(()=>{
    localStorage.setItem('settings',JSON.stringify(settings));
})

</script>

<style lang="scss" scoped></style>
