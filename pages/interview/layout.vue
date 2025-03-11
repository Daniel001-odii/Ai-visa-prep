<template>
    <div class="flex flex-col h-[100dvh] max-h-[100dvh] bg-inherit text-white font-sans"
        :class="{ 'opacity-80': isThinking }">
        <!-- Chat header (if needed) -->
        <div v-if="showHeader" class="flex items-center p-4 border-b border-gray-800">
            <div class="mr-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                    class="fill-none stroke-current stroke-2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="7" y1="12" x2="17" y2="12" />
                </svg>
            </div>
            <div class="flex flex-col justify-center">
                <div class="text-lg font-medium">{{ greeting }}</div>
                <div class="text-sm text-gray-400">How can I help you today?</div>
            </div>
        </div>

        <!-- Chat messages container with scroll -->
        <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-4" ref="messagesContainer">

            <!-- Default/permanent messages -->
             <!-- VO AREA -->
            <div class=" flex justify-center items-center">
               <span>New Student Visa Interview</span>
            </div>

            <!-- Dynamic messages -->
            <div v-for="(message, index) in messages" :key="`message-${index}`" class="flex flex-col mb-2 max-w-[85%]"
                :class="message.type === 'user' ? 'ml-auto' : ''">
                <div class="px-4 py-3 rounded-lg"
                    :class="message.type === 'user' ? 'bg-gray-700 ml-auto' : 'bg-gray-800'">
                    <div v-if="message.type === 'system' && message.thinking"
                        class="flex items-center text-sm text-gray-400">
                        <span v-if="message.status === 'thinking'">Thinking</span>
                        <span v-else-if="message.status === 'exploring'">Exploring user intent</span>
                        <span v-else-if="message.status === 'deep-search'">DeepSearch</span>
                        <span v-else-if="message.status === 'fixing'">Fixing URL encoding</span>
                    </div>
                    <div v-else>
                        {{ message.text }}
                    </div>
                </div>

                <!-- System message browsing indicators -->
                <div v-if="message.browsing" class="flex items-center p-2 text-gray-500 text-sm mt-1">
                    <span class="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                    <span class="ml-2">Browsing {{ message.browsingSite }}</span>
                </div>
            </div>

            <!-- Thinking state indicator (when active) -->
            <div v-if="isActivelyThinking" class="flex items-center p-2 my-2">
                <div class="flex gap-1">
                    <span class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"></span>
                    <span class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse delay-75"></span>
                    <span class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                </div>
            </div>
        </div>

        <!-- Chat input area -->
        <div class="border-t border-gray-800 p-4">
            <div class="flex flex-col">
                <input type="text" v-model="inputMessage" @keyup.enter="sendMessage"
                    placeholder="What do you want to know?"
                    class="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 bg-opacity-20 text-white text-base mb-2 focus:outline-none focus:border-gray-600" />
                <div class="flex items-center gap-2 flex-wrap">
                    <button
                        class="bg-transparent border-none text-gray-400 cursor-pointer flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
                            class="fill-current">
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                    <button
                        class="flex items-center bg-gray-800 border-none rounded-full px-4 py-2 text-gray-300 text-sm cursor-pointer"
                        @click="activateDeepSearch">
                        <span class="mr-1">🔍</span>
                        DeepSearch
                    </button>
                    <button
                        class="flex items-center bg-gray-800 border-none rounded-full px-4 py-2 text-gray-300 text-sm cursor-pointer"
                        @click="activateThinking">
                        <span class="mr-1">💭</span>
                        Think
                    </button>
                    <div class="ml-auto flex items-center text-gray-400 text-sm cursor-pointer">
                        Grok 3
                        <span class="text-xs ml-1">▼</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'plain',
});

import { ref, onMounted, nextTick, watch, computed } from 'vue';

// Props
const props = defineProps({
    showHeader: {
        type: Boolean,
        default: true
    },
    initialMessages: {
        type: Array,
        default: () => []
    },
    userName: {
        type: String,
        default: 'Odii'
    }
});

// Reactive state
const inputMessage = ref('');
const messages = ref([...props.initialMessages]);
const messagesContainer = ref(null);
const isThinking = ref(false);
const isActivelyThinking = ref(false);

// Computed properties
const greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return `Good morning, ${props.userName}`;
    if (hour < 18) return `Good afternoon, ${props.userName}`;
    return `Good evening, ${props.userName}`;
});

// Default permanent messages
const defaultMessages = ref([
    { type: 'system', text: 'hello world' }
]);

// Methods
const scrollToBottom = async () => {
    await nextTick();
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
};

const sendMessage = () => {
    if (inputMessage.value.trim() === '') return;

    // Add user message
    messages.value.push({
        type: 'user',
        text: inputMessage.value,
        timestamp: new Date()
    });

    // Clear input
    const userMessage = inputMessage.value;
    inputMessage.value = '';

    // Simulate thinking state
    isActivelyThinking.value = true;

    // Simulate response after a delay
    setTimeout(() => {
        isActivelyThinking.value = false;

        // Add system response
        messages.value.push({
            type: 'system',
            text: `Response to: ${userMessage}`,
            timestamp: new Date()
        });

        scrollToBottom();
    }, 1500);

    scrollToBottom();
};

const activateDeepSearch = () => {
    // Simulate deep search state
    messages.value.push({
        type: 'system',
        thinking: true,
        status: 'deep-search',
        timestamp: new Date()
    });

    // Simulate browsing actions
    setTimeout(() => {
        messages.value.push({
            type: 'system',
            browsing: true,
            browsingSite: 'en.wikipedia.org',
            text: 'Searching for information...',
            timestamp: new Date()
        });
        scrollToBottom();
    }, 800);

    scrollToBottom();
};

const activateThinking = () => {
    // Simulate thinking state
    messages.value.push({
        type: 'system',
        thinking: true,
        status: 'thinking',
        timestamp: new Date()
    });
    scrollToBottom();
};

// Watch for changes in messages to auto-scroll
watch(messages, () => {
    scrollToBottom();
}, { deep: true });

// Lifecycle hook
onMounted(() => {
    scrollToBottom();
});
</script>