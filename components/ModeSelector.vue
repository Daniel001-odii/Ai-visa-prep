<template>
    <div class="theme-selector">
      <div class="theme-selector-container">
        <button
          class="theme-button"
          :class="{ active: currentTheme === 'light' }"
          @click="setTheme('light')"
          aria-label="Light theme"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <span>Light</span>
        </button>
        
        <button
          class="theme-button hover:bg-[#e5e7eb] hover:dark:bg-slate-800"
          :class="{ active: currentTheme === 'dark' }"
          @click="setTheme('dark')"
          aria-label="Dark theme"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <span>Dark</span>
        </button>
        
        <button
          class="theme-button"
          :class="{ active: currentTheme === 'system' }"
          @click="setTheme('system')"
          aria-label="System theme"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          <span>System</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const currentTheme = ref('system');
  const systemThemeIsDark = ref(false);
  
  // Check if system prefers dark mode
  const checkSystemTheme = () => {
    systemThemeIsDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme();
  };
  
  // Set theme and save to localStorage
  const setTheme = (theme) => {
    currentTheme.value = theme;
    localStorage.setItem('theme', theme);
    applyTheme();
  };
  
  // Apply the selected theme to the document
  const applyTheme = () => {
    const html = document.documentElement;
    
    if (currentTheme.value === 'dark' || 
        (currentTheme.value === 'system' && systemThemeIsDark.value)) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };
  
  // Watch for system theme changes
  onMounted(() => {
    // Get saved theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      currentTheme.value = savedTheme;
    }
    
    // Check initial system theme
    checkSystemTheme();
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkSystemTheme);
  });
  </script>
  
  <style scoped>
  .theme-selector {
    margin: 1rem 0;
  }
  
  .theme-selector-container {
    display: flex;
    background-color: inherit;
    border-radius: 0.5rem;
    padding: 0.25rem;
    width: fit-content;
  }
  
  .theme-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: none;
    background: transparent;
    border-radius: 0.375rem;
    cursor: pointer;
    color: #4b5563;
    transition: all 0.2s ease;
  }
  
  .theme-button:hover {
    /* background-color: #e5e7eb; */
  }
  
  .theme-button.active {
    background-color: white;
    color: #111827;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    flex-shrink: 0;
  }
  
  /* Dark mode styles */
  :global(.dark) .theme-selector-container {
    background-color: #374151;
  }
  
  :global(.dark) .theme-button {
    color: #9ca3af;
  }
  
  :global(.dark) .theme-button:hover {
    background-color: #4b5563;
  }
  
  :global(.dark) .theme-button.active {
    background-color: #1f2937;
    color: #f9fafb;
  }
  
  @media (max-width: 640px) {
    .theme-button span {
      display: none;
    }
    
    .theme-button {
      padding: 0.5rem;
    }
  }
  </style>