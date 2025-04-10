<template>
  <HomeNavbar />
  <div class="relative overflow-hidden pt-20 bg-white">
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div
        class="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-50"
      ></div>
      <div
        class="absolute top-1/2 -left-24 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-40"
      ></div>
      <div
        class="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-2/3 h-16 bg-blue-200 rounded-full filter blur-3xl opacity-20"
      ></div>
    </div>

    <div
      class="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10"
    >
      <div class="text-center mb-8 animate-fade-in [animation-delay:200ms]">
        <div
          class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-500 mb-6"
        >
          <Star class="w-4 h-4 mr-2 fill-blue-500 text-blue-500" />
          <span class="text-sm font-medium">AI-powered visual analytics</span>
        </div>

        <h1 class="heading-xl max-w-4xl mx-auto text-balance mb-6">
          Transform Your Data Into
          <span class="gradient-text">Visual Insights</span> With AI
        </h1>

        <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Instantly convert complex data into compelling visualizations with our
          AI-powered platform. No design skills required.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <UButton
            label="Start For Free"
            color="blue"
            size="lg"
            trailing
            icon="lucide:arrow-right"
            class="rounded-lg"
          />
          <UButton
            label="See how it works"
            variant="soft"
            size="lg"
            color="gray"
            trailing
            icon="lucide:chevron-right"
            class="rounded-lg"
          />
        </div>

        <div
          class="flex justify-center items-center space-x-6 text-sm text-gray-500"
        >
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-green-500 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span>No credit card required</span>
          </div>
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-green-500 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>

      <!-- App Screenshot -->
      <div
        class="relative max-w-5xl mx-auto animate-fade-in [animation-delay:400ms]"
      >
        <div
          class="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10"
        >
          <!-- <div
            class="bg-gradient-to-b from-blue-400 to-blue-500 w-full h-full flex items-center justify-center"
          >
            <div class="text-white text-xl font-medium">
              blue Dashboard Preview
            </div>
          </div> -->
          <img src="../assets/images/hero/hero_1.png" />
          <!-- <video src="../assets/videos/hero.mp4" autoplay muted/> -->
        </div>
        <div
          class="absolute -bottom-5 -left-5 -right-5 h-24 bg-gradient-to-t from-white to-transparent z-10"
        ></div>
      </div>
    </div>
  </div>

  <!-- FEATURES -->
  <HomeFeatures />

  <!-- PRICING -->
  <HomePricing />

  <!-- TESTIMONIAL -->
  <div
    class="flex flex-col md:p-[150px] p-12 min-h-[300px] gap-6 container mx-auto justify-center items-start"
  >
    <div class="text-xl md:text-4xl">
      {{ reviews[1].feedback }}
    </div>
    <div class="flex gap-3">
      <UAvatar :alt="reviews[1].name" />
      <div class="flex flex-col">
        <span class="font-bold">{{ reviews[1].name }}</span>
        <span>{{ reviews[1].location }}</span>
      </div>
    </div>
  </div>

  <!-- LAST CTA -->
  <HomeCTA />

  <!-- FOOTER -->
  <TheFooter />
</template>

<script setup>
definePageMeta({
  layout: "plain",
});
import { ArrowRight, ChevronRight, Star } from "lucide-vue-next";

const reviews = [
  {
    name: "Emily",
    location: "Nigeria",
    feedback:
      "I had a fantastic experience with Visalify AI! The practice sessions helped me gain confidence, and I successfully passed my visa interview on the first attempt.",
    rating: 5,
  },
  {
    name: "Raj",
    location: "India",
    feedback:
      "Visalify AI is a must-have! The AI feedback highlighted my weak points, allowing me to improve quickly. Highly recommended!",
    rating: 5,
  },
  {
    name: "Anonymous",
    location: "United States",
    feedback:
      "This tool made all the difference! It provided personalized questions and helped me practice effectively. Thanks to Visalify AI, I aced my visa interview!",
    rating: 5,
  },
];
// import Button from "@/components/ui/button.vue";
</script>
