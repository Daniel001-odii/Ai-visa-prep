<template>
    <nav :class="`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Logo -->
          <div class="flex items-center">
            <a href="#" class="flex items-center">
              <span class="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">Visalify</span>
            </a>
          </div>
  
          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-center space-x-8">
              <a href="#features" class="text-gray-600 hover:text-blue-400 transition-colors">Features</a>
              <a href="#how-it-works" class="text-gray-600 hover:text-blue-400 transition-colors">How It Works</a>
              <a href="#pricing" class="text-gray-600 hover:text-blue-400 transition-colors">Pricing</a>
              <a href="#testimonials" class="text-gray-600 hover:text-blue-400 transition-colors">Testimonials</a>
            </div>
          </div>
  
          <!-- CTA Buttons -->
          <div class="hidden md:flex items-center space-x-4">
            <!-- <Button variant="outline" class="border-blue-300 text-blue-500 hover:bg-blue-50">Log in</Button> -->
            <UButton variant="soft"  color="gray" class="border-blue-500" label="login"/>
            <UButton variant="solid" color="blue" label="Get Started"/>
            <!-- <Button class="bg-blue-300 text-white hover:bg-blue-400">Get Started</Button> -->
          </div>
  
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button 
              type="button" 
              class="text-gray-500 hover:text-gray-700 focus:outline-none"
              @click="mobileMenuOpen = !mobileMenuOpen"
            >
              <X v-if="mobileMenuOpen" class="h-6 w-6" />
              <Menu v-else class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
  
      <!-- Mobile menu -->
      <div :class="`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 shadow-lg">
          <a href="#features" class="block px-3 py-2 text-gray-600 hover:text-blue-400 transition-colors">Features</a>
          <a href="#how-it-works" class="block px-3 py-2 text-gray-600 hover:text-blue-400 transition-colors">How It Works</a>
          <a href="#pricing" class="block px-3 py-2 text-gray-600 hover:text-blue-400 transition-colors">Pricing</a>
          <a href="#testimonials" class="block px-3 py-2 text-gray-600 hover:text-blue-400 transition-colors">Testimonials</a>
          
          <div class="pt-4 flex flex-col space-y-2">
            <Button variant="outline" class="border-blue-300 text-blue-500 hover:bg-blue-50 w-full">Log in</Button>
            <Button class="bg-blue-300 text-white hover:bg-blue-400 w-full">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { Menu, X } from 'lucide-vue-next';
  
  const isScrolled = ref(false);
  const mobileMenuOpen = ref(false);
  
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 10;
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>