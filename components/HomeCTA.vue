<template>
  <div
    class="p-5 mb-6 mt-12 container mx-auto flex flex-col justify-center items-center"
  >
    <div
      class="bg-blue-500 w-full max-w-6xl p-12 rounded-2xl mt-12 text-center text-white"
    >
      <h3 class="text-3xl font-bold mb-4">Ready to Ace Your Visa Interview?</h3>
      <p class="text-lg mb-6 max-w-2xl mx-auto">
        Join thousands of successful visa applicants who prepared with Visalify
        AI. Start your journey today!
      </p>
      <UButton
        size="xl"
        variant="outline"
        color="neutral"
        label="Try For Free"
        @click="useRouter().push('/interview')"
      />
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped></style>
