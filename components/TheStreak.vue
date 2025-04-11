<template>
    <div class="streak-bar-container">
      <div class="streak-info">
        <span class="streak-label">{{ label }}</span>
        <span class="streak-percentage">{{ percentage }}%</span>
      </div>
      <div class="streak-track">
        <div 
          class="streak-progress" 
          :style="{ width: `${percentage}%` }"
          :aria-valuenow="percentage"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    percentage: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0 && value <= 100
    },
    label: {
      type: String,
      default: 'Current Streak'
    }
  });
  </script>
  
  <style scoped>
  .streak-bar-container {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .streak-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .streak-label {
    color: #4b5563;
  }
  
  .streak-percentage {
    color: #8b5cf6;
    font-weight: 600;
  }
  
  .streak-track {
    height: 0.75rem;
    width: 100%;
    background-color: #e5e7eb;
    border-radius: 9999px;
    overflow: hidden;
  }
  
  .streak-progress {
    height: 100%;
    background-color: #8b5cf6;
    border-radius: 9999px;
    transition: width 0.5s ease-in-out;
  }
  
  @media (max-width: 640px) {
    .streak-track {
      height: 0.5rem;
    }
  }
  </style>