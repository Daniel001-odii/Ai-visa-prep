<template>
    <div class="flex flex-col h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div class="flex items-center">
          <button 
            class="mr-3 md:hidden text-gray-500 hover:text-gray-700" 
            @click="isSidebarOpen = !isSidebarOpen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <h1 class="text-xl font-semibold text-indigo-600">AiVisaPrep Assistant</h1>
        </div>
        <div class="flex items-center space-x-2">
          <button class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div class="relative">
            <button 
              class="flex items-center space-x-1 p-1 rounded-full hover:bg-gray-100" 
              @click="isUserMenuOpen = !isUserMenuOpen"
            >
              <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                {{ userInitials }}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <!-- User dropdown menu -->
            <div 
              v-if="isUserMenuOpen" 
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
            >
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
            </div>
          </div>
        </div>
      </header>
  
      <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar -->
        <aside 
          class="w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300"
          :class="{ 'hidden md:flex': !isSidebarOpen, 'absolute inset-y-0 left-0 z-10 shadow-xl md:shadow-none md:static md:flex': isSidebarOpen }"
        >
          <div class="p-4">
            <button 
              class="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors"
              @click="startNewChat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Chat
            </button>
          </div>
          <div class="overflow-y-auto flex-1">
            <h2 class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider py-2">Recent chats</h2>
            <ul class="space-y-1 px-2">
              <li v-for="(chat, index) in recentChats" :key="index">
                <a 
                  href="#" 
                  class="flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors"
                  :class="chat.active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'"
                  @click.prevent="selectChat(index)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                  <span class="truncate">{{ chat.title }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="p-4 border-t border-gray-200">
            <div class="flex items-center space-x-2 text-sm text-gray-700">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              <span>All systems normal</span>
            </div>
          </div>
        </aside>
  
        <!-- Main content - Chat interface -->
        <main class="flex-1 flex flex-col bg-white overflow-hidden">
          <!-- Chat messages container -->
          <div 
            ref="messagesContainer"
            class="flex-1 overflow-y-auto p-4 space-y-4"
            @scroll="handleScroll"
          >
            <template v-if="messages.length > 0">
              <div 
                v-for="(message, index) in messages" 
                :key="index"
                class="flex items-start gap-3 transition-opacity duration-300"
                :class="{'opacity-40': isTyping && index === messages.length - 1}"
              >
                <!-- Avatar/Icon -->
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  :class="message.isUser ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100'"
                >
                  <template v-if="message.isUser">
                    {{ userInitials }}
                  </template>
                  <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-700">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  </template>
                </div>
                
                <!-- Message content -->
                <div 
                  class="message-content flex-1 prose prose-sm max-w-none"
                  :class="message.isUser ? '' : 'prose-indigo'"
                >
                  <p v-html="formatMessage(message.text)"></p>
                </div>
                
                <!-- Message actions -->
                <div class="flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button 
                    v-if="!message.isUser"
                    class="p-1 text-gray-400 hover:text-gray-700 rounded"
                    title="Copy to clipboard"
                    @click="copyToClipboard(message.text)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                    </svg>
                  </button>
                </div>
              </div>
            </template>
            
            <!-- Welcome message when no messages -->
            <div v-else class="h-full flex flex-col items-center justify-center text-center p-6">
              <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-indigo-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h2 class="text-2xl font-semibold text-gray-800 mb-2">Welcome to AiVisaPrep Assistant</h2>
              <p class="text-gray-600 mb-6 max-w-md">I can help you prepare for your visa interview, provide document checklists, and answer any questions about the visa process.</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                <button 
                  v-for="(suggestion, index) in suggestions" 
                  :key="index"
                  class="p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  @click="submitSuggestion(suggestion)"
                >
                  <p class="font-medium text-gray-800">{{ suggestion.title }}</p>
                  <p class="text-sm text-gray-500">{{ suggestion.description }}</p>
                </button>
              </div>
            </div>
            
            <!-- Typing indicator -->
            <div v-if="isTyping" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-700">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <div class="py-3">
                <div class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Input area -->
          <div class="border-t border-gray-200 p-4">
            <form @submit.prevent="sendMessage" class="relative">
              <textarea 
                v-model="userInput" 
                class="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-4 pr-12 py-3 resize-none"
                :class="{'h-12': userInput.length < 50, 'h-24': userInput.length >= 50}"
                placeholder="Ask anything about visa preparation..."
                @keydown.enter.prevent="handleEnterKey"
                @input="adjustTextareaHeight"
                ref="messageInput"
              ></textarea>
              <button 
                type="submit" 
                class="absolute right-2 bottom-2 p-2 rounded-full bg-indigo-600 text-white disabled:opacity-50"
                :disabled="!userInput.trim() || isTyping"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
            <div class="mt-2 text-xs text-gray-500">
              Your data is secured with end-to-end encryption
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, nextTick, watch } from 'vue';
  
  // State
  const userInput = ref('');
  const messages = ref([]);
  const isTyping = ref(false);
  const isSidebarOpen = ref(false);
  const isUserMenuOpen = ref(false);
  const messagesContainer = ref(null);
  const messageInput = ref(null);
  const isScrolledToBottom = ref(true);
  
  // Mock data for demo
  const user = {
    name: 'John Doe',
    email: 'john@example.com'
  };
  
  const recentChats = ref([
    { id: 1, title: 'Student visa requirements', active: true },
    { id: 2, title: 'Work permit documentation', active: false },
    { id: 3, title: 'Tourist visa for France', active: false },
    { id: 4, title: 'Spouse visa interview prep', active: false },
  ]);
  
  const suggestions = [
    { 
      title: 'What documents do I need?', 
      description: 'Get a checklist of required documents for your visa type' 
    },
    { 
      title: 'How to prepare for my interview?', 
      description: 'Tips and common questions for visa interviews' 
    },
    { 
      title: 'Processing time estimate', 
      description: 'Current processing times for different visa categories' 
    },
    { 
      title: 'Visa rejection reasons', 
      description: 'Common reasons for visa denials and how to avoid them' 
    },
  ];
  
  // Computed values
  const userInitials = computed(() => {
    return user.name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
  });
  
  // Methods
  const sendMessage = async () => {
    const messageText = userInput.value.trim();
    if (!messageText || isTyping.value) return;
    
    // Add user message
    messages.value.push({
      text: messageText,
      isUser: true,
      timestamp: new Date()
    });
    
    // Clear input
    userInput.value = '';
    
    // Scroll to bottom
    await scrollToBottom();
    
    // Mock response with typing indicator
    isTyping.value = true;
    
    // Mock AI response delay
    setTimeout(() => {
      generateResponse(messageText);
    }, 1500);
  };
  
  const generateResponse = (messageText) => {
    // Mock AI responses based on input (simplified for demo)
    let responseText;
    
    if (messageText.toLowerCase().includes('document')) {
      responseText = "For most visa applications, you'll need:<br><br>• Valid passport with at least 6 months validity<br>• Completed visa application form<br>• Passport-sized photos<br>• Proof of financial means<br>• Travel itinerary<br>• Proof of accommodation<br>• Travel insurance<br><br>Specific requirements may vary depending on your nationality and visa type. Would you like me to provide more details for a specific visa category?";
    } else if (messageText.toLowerCase().includes('interview')) {
      responseText = "To prepare for your visa interview:<br><br>1. Be honest and consistent with your answers<br>2. Bring all required documentation<br>3. Dress professionally<br>4. Prepare for common questions about:<br>   • Your travel purpose<br>   • Your ties to your home country<br>   • Your financial situation<br>   • Your travel itinerary<br><br>Would you like me to provide some practice questions for your specific visa type?";
    } else if (messageText.toLowerCase().includes('time') || messageText.toLowerCase().includes('processing')) {
      responseText = "Current visa processing times vary significantly:<br><br>• Tourist visas: 2-4 weeks<br>• Student visas: 3-5 weeks<br>• Work visas: 4-12 weeks<br>• Family/Spouse visas: 8-24 weeks<br><br>These are general estimates. Actual processing times depend on your nationality, application volume, and the specific embassy or consulate. Would you like tips on how to potentially expedite the process?";
    } else {
      responseText = "I'm here to help with all your visa preparation needs. I can assist with document checklists, interview preparation, application procedures, and answering specific questions about the visa process. What specific aspect of visa preparation are you interested in?";
    }
    
    // Add AI response
    messages.value.push({
      text: responseText,
      isUser: false,
      timestamp: new Date()
    });
    
    isTyping.value = false;
    scrollToBottom();
  };
  
  const formatMessage = (text) => {
    // Basic formatting function (could be expanded for markdown, etc.)
    return text;
  };
  
  const handleEnterKey = (e) => {
    // Submit on Enter, but allow Shift+Enter for new lines
    if (!e.shiftKey) {
      sendMessage();
    }
  };
  
  const adjustTextareaHeight = () => {
    // This is handled by Tailwind classes in this demo
    // For more complex auto-resizing, you'd implement it here
  };
  
  const copyToClipboard = (text) => {
    // Strip HTML tags for clipboard
    const plainText = text.replace(/<[^>]*>/g, '');
    navigator.clipboard.writeText(plainText);
    
    // Show toast notification (not implemented in this demo)
    console.log('Copied to clipboard');
  };
  
  const scrollToBottom = async () => {
    if (!isScrolledToBottom.value) return;
    
    await nextTick();
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  };
  
  const handleScroll = () => {
    if (!messagesContainer.value) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value;
    isScrolledToBottom.value = Math.abs(scrollHeight - scrollTop - clientHeight) < 10;
  };
  
  const startNewChat = () => {
    messages.value = [];
    recentChats.value = recentChats.value.map(chat => ({...chat, active: false}));
    recentChats.value.unshift({
      id: Date.now(),
      title: 'New Conversation',
      active: true
    });
    
    // Focus on input
    nextTick(() => {
      messageInput.value.focus();
    });
  };
  
  const selectChat = (index) => {
    recentChats.value = recentChats.value.map((chat, i) => ({
      ...chat,
      active: i === index
    }));
    
    // In a real app, this would load the chat history
    messages.value = [];
  };
  
  const submitSuggestion = (suggestion) => {
    userInput.value = suggestion.title;
    sendMessage();
  };
  
  // Watchers
  watch(messages, () => {
    scrollToBottom();
  }, { deep: true });
  
  // Lifecycle hooks
  onMounted(() => {
    // Focus input on load
    if (messageInput.value) {
      messageInput.value.focus();
    }
    
    // Handle click outside to close user menu
    document.addEventListener('click', (e) => {
      if (isUserMenuOpen.value && !e.target.closest('.user-menu')) {
        isUserMenuOpen.value = false;
      }
    });
  });
  </script>
  
  <style scoped>
  /* Typing indicator animation */
  .typing-indicator {
    display: flex;
    align-items: center;
  }
  
  .typing-indicator span {
    height: 8px;
    width: 8px;
    background-color: #a3a3a3;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
    animation: bounce 1.5s infinite ease-in-out;
  }
  
  .typing-indicator span:nth-child(1) {
    animation-delay: 0s;
  }
  
  .typing-indicator span:nth-child(2) {
    animation-delay: 0.3s;
  }
  
  .typing-indicator span:nth-child(3) {
    animation-delay: 0.6s;
    margin-right: 0;
  }
  
  @keyframes bounce {
    0%, 60%, 100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-4px);
    }
  }
  
  /* Custom scrollbar styling */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 3px;
  }

/*   ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0 */
    
</style>