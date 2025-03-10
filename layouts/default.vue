<template>
  <div class=" h-[100dvh] flex flex-col">
    <TheNavbar/>
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
