<template>
    <div class="font-sans bg-gray-50 h-screen flex flex-col">
      <!-- Header -->
      <header class="bg-white border-b border-gray-100 py-4 px-4 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="showSidebar = !showSidebar" class="md:hidden">
              <menu-icon class="w-6 h-6 text-gray-600" />
            </button>
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <video-icon class="w-5 h-5 text-white" />
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">visalify</span>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="hidden md:flex items-center space-x-1 bg-emerald-50 px-3 py-1.5 rounded-full">
              <clock-icon class="w-4 h-4 text-emerald-600" />
              <span class="text-sm text-emerald-700 font-medium">{{ sessionTime }}</span>
            </div>
            <div class="flex items-center space-x-1 bg-emerald-50 px-3 py-1.5 rounded-full">
              <flag-icon class="w-4 h-4 text-emerald-600" />
              <span class="text-sm text-emerald-700 font-medium">Student Visa - USA</span>
            </div>
            <button class="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <settings-icon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <div class="flex-1 flex overflow-hidden">
        <!-- Sidebar (hidden on mobile) -->
        <div :class="[
          'bg-white border-r border-gray-100 w-72 flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out',
          showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]">
          <div class="p-4 border-b border-gray-100">
            <div class="relative">
              <search-icon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search conversations" 
                class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          <div class="flex-1 overflow-y-auto">
            <div class="p-2">
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">Recent Interviews</h3>
              <div 
                v-for="(interview, index) in recentInterviews" 
                :key="index"
                class="px-3 py-3 rounded-lg mb-1 cursor-pointer transition-colors"
                :class="interview.active ? 'bg-emerald-50' : 'hover:bg-gray-50'"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <user-icon class="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900">{{ interview.type }}</h4>
                      <p class="text-xs text-gray-500">{{ interview.date }}</p>
                    </div>
                  </div>
                  <div v-if="interview.unread" class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 border-t border-gray-100">
            <button class="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg py-3 hover:shadow-md transition">
              <plus-icon class="w-5 h-5" />
              <span>New Interview</span>
            </button>
          </div>
        </div>
  
        <!-- Chat Area -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- Interview Info -->
          <div class="bg-white border-b border-gray-100 p-4 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <user-icon class="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 class="font-medium">Student Visa Interview - USA</h3>
                <div class="flex items-center space-x-1">
                  <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span class="text-xs text-gray-500">Interview in progress</span>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button class="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100">
                <refresh-cw-icon class="w-5 h-5" />
              </button>
              <button class="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100">
                <volume-2-icon class="w-5 h-5" />
              </button>
              <button class="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100">
                <more-horizontal-icon class="w-5 h-5" />
              </button>
            </div>
          </div>
  
          <!-- Messages -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
            <!-- Welcome Message -->
            <div class="flex items-start space-x-3 max-w-3xl">
              <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <user-icon class="w-5 h-5 text-emerald-600" />
              </div>
              <div class="bg-white rounded-lg p-4 shadow-sm">
                <div class="prose prose-sm">
                  <p class="text-gray-800">
                    Welcome to your U.S. Student Visa interview simulation. I'm your virtual visa officer. This practice session will help you prepare for your actual interview. I'll ask you questions similar to what you might encounter, and provide feedback on your responses.
                  </p>
                  <p class="text-gray-800 mt-2">
                    Remember to be honest, concise, and confident in your answers. Let's begin.
                  </p>
                </div>
                <div class="mt-2 text-xs text-gray-400">10:30 AM</div>
              </div>
            </div>
  
            <!-- First Question -->
            <div class="flex items-start space-x-3 max-w-3xl">
              <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <user-icon class="w-5 h-5 text-emerald-600" />
              </div>
              <div class="bg-white rounded-lg p-4 shadow-sm">
                <div class="prose prose-sm">
                  <p class="text-gray-800">
                    Could you please state your name and the purpose of your visit to the United States?
                  </p>
                </div>
                <div class="mt-2 text-xs text-gray-400">10:31 AM</div>
              </div>
            </div>
  
            <!-- User Response -->
            <div class="flex items-start space-x-3 max-w-3xl ml-auto flex-row-reverse">
              <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <user-icon class="w-5 h-5 text-gray-600" />
              </div>
              <div class="bg-emerald-600 rounded-lg p-4 shadow-sm">
                <div class="prose prose-sm">
                  <p class="text-white">
                    My name is Alex Johnson. I'm visiting the United States to pursue a Master's degree in Computer Science at Stanford University.
                  </p>
                </div>
                <div class="mt-2 text-xs text-emerald-200">10:32 AM</div>
              </div>
            </div>
  
            <!-- AI Response -->
            <div class="flex items-start space-x-3 max-w-3xl">
              <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <user-icon class="w-5 h-5 text-emerald-600" />
              </div>
              <div class="bg-white rounded-lg p-4 shadow-sm">
                <div class="prose prose-sm">
                  <p class="text-gray-800">
                    Thank you, Alex. Could you tell me more about your program at Stanford? What specific area of Computer Science interests you, and why did you choose this university?
                  </p>
                </div>
                <div class="mt-2 text-xs text-gray-400">10:33 AM</div>
              </div>
            </div>
  
            <!-- User Response -->
            <div class="flex items-start space-x-3 max-w-3xl ml-auto flex-row-reverse">
              <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <user-icon class="w-5 h-5 text-gray-600" />
              </div>
              <div class="bg-emerald-600 rounded-lg p-4 shadow-sm">
                <div class="prose prose-sm">
                  <p class="text-white">
                    I'll be focusing on Artificial Intelligence and Machine Learning. Stanford has one of the best programs in this field with renowned professors like Dr. Andrew Ng. The university's strong industry connections and Silicon Valley location will provide valuable networking opportunities for my future career.
                  </p>
                </div>
                <div class="mt-2 text-xs text-emerald-200">10:34 AM</div>
              </div>
            </div>
  
            <!-- AI Response -->
            <div class="flex items-start space-x-3 max-w-3xl">
              <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <user-icon class="w-5 h-5 text-emerald-600" />
              </div>
              <div class="bg-white rounded-lg p-4 shadow-sm">
                <div class="prose prose-sm">
                  <p class="text-gray-800">
                    I see. How do you plan to finance your education in the United States? Please provide details about your scholarships, loans, or family support.
                  </p>
                </div>
                <div class="mt-2 text-xs text-gray-400">10:35 AM</div>
              </div>
            </div>
  
            <!-- Typing Indicator -->
            <div v-if="isTyping" class="flex items-start space-x-3 max-w-3xl animate-fade-in">
              <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <user-icon class="w-5 h-5 text-emerald-600" />
              </div>
              <div class="bg-white rounded-lg p-3 shadow-sm">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                  <div class="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                  <div class="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Quick Actions -->
          <div class="bg-white border-t border-gray-100 p-3">
            <div class="flex overflow-x-auto pb-2 space-x-2 quick-actions-container">
              <button 
                v-for="(action, index) in quickActions" 
                :key="index"
                class="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 whitespace-nowrap hover:bg-gray-200 transition-colors flex-shrink-0"
                @click="sendQuickResponse(action.text)"
              >
                {{ action.text }}
              </button>
            </div>
          </div>
  
          <!-- Message Input -->
          <div class="bg-white border-t border-gray-100 p-4">
            <div class="flex items-center space-x-2">
              <button class="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <paperclip-icon class="w-5 h-5" />
              </button>
              <div class="flex-1 relative">
                <textarea 
                  v-model="messageInput"
                  placeholder="Type your response..."
                  class="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  rows="1"
                  @keydown.enter.prevent="sendMessage"
                  ref="messageTextarea"
                ></textarea>
                <button 
                  v-if="messageInput.trim()"
                  @click="sendMessage" 
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <send-icon class="w-5 h-5" />
                </button>
              </div>
              <button class="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <mic-icon class="w-5 h-5" />
              </button>
            </div>
            <div class="mt-2 flex justify-between items-center px-1">
              <div class="text-xs text-gray-500">Press Enter to send</div>
              <div class="flex space-x-2">
                <button class="px-3 py-1 text-xs text-emerald-600 hover:bg-emerald-50 rounded transition-colors">
                  Request feedback
                </button>
                <button class="px-3 py-1 text-xs text-emerald-600 hover:bg-emerald-50 rounded transition-colors">
                  Skip question
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick, computed } from 'vue'
  import { 
    MenuIcon, 
    VideoIcon, 
    UserIcon, 
    SearchIcon, 
    PlusIcon, 
    RefreshCwIcon, 
    Volume2Icon, 
    MoreHorizontalIcon, 
    PaperclipIcon, 
    SendIcon, 
    MicIcon,
    ClockIcon,
    FlagIcon,
    SettingsIcon
  } from 'lucide-vue-next'
  
  // State
  const showSidebar = ref(false)
  const messageInput = ref('')
  const isTyping = ref(false)
  const messagesContainer = ref(null)
  const messageTextarea = ref(null)
  const sessionStartTime = ref(new Date())
  
  // Computed
  const sessionTime = computed(() => {
    const now = new Date()
    const diffMs = now - sessionStartTime.value
    const minutes = Math.floor(diffMs / 60000)
    const seconds = Math.floor((diffMs % 60000) / 1000)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })
  
  // Sample data
  const recentInterviews = ref([
    { 
      type: 'Student Visa - USA', 
      date: 'Today, 10:30 AM', 
      active: true, 
      unread: false 
    },
    { 
      type: 'Work Visa - Canada', 
      date: 'Yesterday, 2:15 PM', 
      active: false, 
      unread: true 
    },
    { 
      type: 'Tourist Visa - UK', 
      date: 'Mar 18, 9:45 AM', 
      active: false, 
      unread: false 
    },
    { 
      type: 'Student Visa - Australia', 
      date: 'Mar 15, 11:20 AM', 
      active: false, 
      unread: false 
    }
  ])
  
  const quickActions = ref([
    { text: "I have a scholarship that covers 70% of my tuition" },
    { text: "My parents will support my education" },
    { text: "I've taken an education loan" },
    { text: "I have sufficient personal savings" },
    { text: "I have a sponsor in the US" }
  ])
  
  // Methods
  const sendMessage = async () => {
    if (messageInput.value.trim() === '') return
    
    // Add user message
    const userMessage = messageInput.value
    messageInput.value = ''
    
    // Resize textarea
    await nextTick()
    messageTextarea.value.style.height = 'auto'
    
    // Scroll to bottom
    await nextTick()
    scrollToBottom()
    
    // Show typing indicator
    isTyping.value = true
    
    // Simulate AI response after a delay
    setTimeout(() => {
      isTyping.value = false
      // Here you would typically add the AI response to the messages array
      
      // Scroll to bottom again after AI response
      nextTick(() => {
        scrollToBottom()
      })
    }, 2000)
  }
  
  const sendQuickResponse = (text) => {
    messageInput.value = text
    nextTick(() => {
      sendMessage()
    })
  }
  
  const scrollToBottom = () => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }
  
  // Lifecycle hooks
  onMounted(() => {
    scrollToBottom()
    
    // Auto-resize textarea as user types
    if (messageTextarea.value) {
      messageTextarea.value.addEventListener('input', () => {
        messageTextarea.value.style.height = 'auto'
        messageTextarea.value.style.height = messageTextarea.value.scrollHeight + 'px'
      })
    }
    
    // Start session timer
    setInterval(() => {
      // This will trigger the computed property to update
    }, 1000)
  })
  </script>
  
  <style scoped>
  .quick-actions-container::-webkit-scrollbar {
    display: none;
  }
  
  .quick-actions-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease-in-out;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }
  </style>