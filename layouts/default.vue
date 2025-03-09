<template>
  <div class="min-h-screen">
    <TheNavbar />
    <div class="container mx-auto h-full">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
