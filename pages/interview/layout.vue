<template>
    <div class="chat-container" :class="{ 'thinking': isThinking }">
      <!-- Chat header (if needed) -->
      <div v-if="showHeader" class="chat-header">
        <div class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" />
            <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="user-greeting">
          <div class="greeting-text">{{ greeting }}</div>
          <div class="subtext">How can I help you today?</div>
        </div>
      </div>
  
      <!-- Chat messages container with scroll -->
      <div class="messages-container" ref="messagesContainer">
        <!-- Default/permanent messages -->
        <div v-for="(message, index) in defaultMessages" :key="`default-${index}`" class="message-item">
          <div class="message-content" :class="message.type">
            {{ message.text }}
          </div>
        </div>
  
        <!-- Dynamic messages -->
        <div v-for="(message, index) in messages" :key="`message-${index}`" class="message-item">
          <div class="message-bubble" :class="message.type">
            <div v-if="message.type === 'system' && message.thinking" class="thinking-indicator">
              <span v-if="message.status === 'thinking'">Thinking</span>
              <span v-else-if="message.status === 'exploring'">Exploring user intent</span>
              <span v-else-if="message.status === 'deep-search'">DeepSearch</span>
              <span v-else-if="message.status === 'fixing'">Fixing URL encoding</span>
            </div>
            <div v-else class="message-content">
              {{ message.text }}
            </div>
          </div>
          
          <!-- System message browsing indicators -->
          <div v-if="message.browsing" class="browsing-item">
            <span class="dot"></span>
            <span class="browsing-text">Browsing {{ message.browsingSite }}</span>
          </div>
        </div>
  
        <!-- Thinking state indicator (when active) -->
        <div v-if="isActivelyThinking" class="thinking-state">
          <div class="thinking-indicator">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
  
      <!-- Chat input area -->
      <div class="chat-input-area">
        <div class="input-container">
          <input 
            type="text" 
            v-model="inputMessage" 
            @keyup.enter="sendMessage" 
            placeholder="What do you want to know?"
            class="message-input"
          />
          <div class="input-buttons">
            <button class="icon-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </button>
            <button class="search-button" @click="activateDeepSearch">
              <span class="search-icon"></span>
              DeepSearch
            </button>
            <button class="think-button" @click="activateThinking">
              <span class="think-icon"></span>
              Think
            </button>
            <div class="model-selector">
              Grok 3
              <span class="dropdown-icon">▼</span>
            </div>
          </div>
        </div>
        
        <!-- Quick action buttons -->
        <div class="quick-actions">
          <button class="action-button">
            <span class="action-icon research"></span>
            Research
          </button>
          <button class="action-button">
            <span class="action-icon howto"></span>
            How to
          </button>
          <button class="action-button">
            <span class="action-icon analyze"></span>
            Analyze
          </button>
          <button class="action-button">
            <span class="action-icon images"></span>
            Create images
          </button>
          <button class="action-button">
            <span class="action-icon code"></span>
            Code
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
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
  
  <style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-height: 100vh;
    background-color: #111;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
  }
  
  .chat-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .logo {
    margin-right: 1rem;
    color: #fff;
  }
  
  .user-greeting {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .greeting-text {
    font-size: 1.2rem;
    font-weight: 500;
  }
  
  .subtext {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
  
  .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .message-item {
    display: flex;
    flex-direction: column;
    max-width: 85%;
    margin-bottom: 0.5rem;
  }
  
  .message-bubble {
    padding: 0.8rem 1rem;
    border-radius: 1rem;
    word-wrap: break-word;
  }
  
  .message-bubble.user {
    align-self: flex-end;
    background-color: #4a4a4a;
    margin-left: auto;
  }
  
  .message-bubble.system {
    background-color: #222;
    align-self: flex-start;
  }
  
  .thinking-indicator {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
  
  .browsing-item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
    margin-top: 0.3rem;
  }
  
  .browsing-text {
    margin-left: 0.5rem;
  }
  
  .dot {
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    display: inline-block;
    margin-right: 2px;
  }
  
  .thinking-state {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    margin: 0.5rem 0;
  }
  
  .thinking-state .dot {
    animation: pulse 1.5s infinite;
    margin: 0 2px;
  }
  
  .thinking-state .dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .thinking-state .dot:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes pulse {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }
  
  .chat-input-area {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem;
  }
  
  .input-container {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  
  .message-input {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
    color: #fff;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .message-input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  .input-buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
  }
  
  .icon-button {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .search-button, .think-button {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.85rem;
    cursor: pointer;
  }
  
  .model-selector {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    cursor: pointer;
  }
  
  .dropdown-icon {
    font-size: 0.7rem;
    margin-left: 0.3rem;
  }
  
  .quick-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }
  
  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    font-size: 0.85rem;
    gap: 0.3rem;
  }
  
  .action-icon {
    width: 16px;
    height: 16px;
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
  }
  
  /* Make the component responsive */
  @media (max-width: 768px) {
    .quick-actions {
      justify-content: space-between;
      flex-wrap: wrap;
    }
    
    .action-button {
      font-size: 0.75rem;
    }
    
    .message-item {
      max-width: 90%;
    }
  }
  
  @media (max-width: 480px) {
    .input-buttons {
      flex-wrap: wrap;
    }
    
    .model-selector {
      margin-left: 0;
      margin-top: 0.5rem;
    }
    
    .quick-actions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
    }
  }
  </style>