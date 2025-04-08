<template>
    <div class="w-full">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Beginner Level -->
        <div 
          class="relative rounded-xl border transition-all duration-200 cursor-pointer"
          :class="[
            selectedLevel === 'beginner' 
              ? 'border-green-500 bg-slate-500/10 shadow-md' 
              : 'border-slate-700  hover:bg-slate-800/10'
          ]"
          @click="selectLevel('beginner')"
        >
          <div class="p-4">
            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center">
                <div class="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                  <GraduationCap class="h-3.5 w-3.5 text-green-400" />
                </div>
                <h4 class="font-medium ">Beginner</h4>
              </div>
              
              <div class="flex">
                <div class="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <div class="w-2 h-2 rounded-full bg-slate-600 mr-1"></div>
                <div class="w-2 h-2 rounded-full bg-slate-600"></div>
              </div>
            </div>
            
            <!-- Description -->
            <p class=" text-xs mb-3">
              Basic questions for first-time applicants.
            </p>
            
            <!-- Selection indicator -->
            <div class="flex items-center justify-between">
              <div class="w-4 h-4 rounded-full border flex items-center justify-center"
                   :class="selectedLevel === 'beginner' ? 'border-green-500' : 'border-slate-600'">
                <div v-if="selectedLevel === 'beginner'" class="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Intermediate Level -->
        <div 
          class="relative rounded-xl border transition-all duration-200 cursor-pointer"
          :class="[
            selectedLevel === 'intermediate' 
              ? 'border-yellow-500 bg-slate-500/10 shadow-md' 
              : 'border-slate-700  hover:bg-slate-800/10'
          ]"
          @click="selectLevel('intermediate')"
        >
          <div class="p-4">
            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center">
                <div class="w-7 h-7 rounded-full bg-yellow-500/20 flex items-center justify-center mr-2">
                  <BookOpen class="h-3.5 w-3.5 text-yellow-400" />
                </div>
                <h4 class="font-medium ">Standard</h4>
              </div>
              
              <div class="flex">
                <div class="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                <div class="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                <div class="w-2 h-2 rounded-full bg-slate-600"></div>
              </div>
            </div>
            
            <!-- Description -->
            <p class=" text-xs mb-3">
              Realistic interview with detailed questions.
            </p>
            
            <!-- Selection indicator -->
            <div class="flex items-center justify-between">
              <div class="w-4 h-4 rounded-full border flex items-center justify-center"
                   :class="selectedLevel === 'intermediate' ? 'border-yellow-500' : 'border-slate-600'">
                <div v-if="selectedLevel === 'intermediate'" class="w-2 h-2 rounded-full bg-yellow-500"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Advanced Level -->
        <div 
          class="relative rounded-xl border transition-all duration-200 cursor-pointer"
          :class="[
            selectedLevel === 'advanced' 
              ? 'border-red-500 bg-slate-500/10 shadow-md' 
              : 'border-slate-700  hover:bg-slate-800/10'
          ]"
          @click="selectLevel('advanced')"
        >
          <div class="p-4">
            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center">
                <div class="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center mr-2">
                  <Briefcase class="h-3.5 w-3.5 text-red-400" />
                </div>
                <h4 class="font-medium ">Advanced</h4>
              </div>
              
              <div class="flex">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                <div class="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                <div class="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
            </div>
            
            <!-- Description -->
            <p class=" text-xs mb-3">
              Challenging scenarios with complex questions.
            </p>
            
            <!-- Selection indicator -->
            <div class="flex items-center justify-between">
              <div class="w-4 h-4 rounded-full border flex items-center justify-center"
                   :class="selectedLevel === 'advanced' ? 'border-red-500' : 'border-slate-600'">
                <div v-if="selectedLevel === 'advanced'" class="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { 
    GraduationCap, 
    BookOpen, 
    Briefcase
  } from 'lucide-vue-next';
  
  const selectedLevel = ref('');
  
  const selectLevel = (level) => {
    return
    // selectedLevel.value = level;
  };
  </script>