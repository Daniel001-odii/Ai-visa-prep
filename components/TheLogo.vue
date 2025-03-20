<template>
  <div>
    <NuxtLink to="/">
      <div class="flex gap-2 items-center font-bold w-fit pr-4">
        <img src="../public/favicon.ico" class="w-[30px]" />
        <transition name="fade-right">
          <span v-if="show_text" class=" ">Visalify</span>
        </transition>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const show_text = ref(false)

onMounted(()=>{
  show_text.value = true;
})
</script>

<style scoped>
/* Fade to Right Animation */
.fade-right-enter-active {
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.fade-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-right-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.fade-right-leave-active {
  transition: opacity 0.3s ease-in, transform 0.3s ease-in;
}
.fade-right-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.fade-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
