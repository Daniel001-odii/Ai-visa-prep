<template>
  <div class=" flex flex-col dark:bg-slate-900">
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
