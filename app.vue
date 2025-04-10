<template>
<!--   <div class=" container mx-auto">
    <NuxtPage/>
  </div> -->

  <div class="dark:bg-slate-900" >
  <NuxtLayout>
    <UApp :toaster="{
      position: 'top-right'
    }">
      <UNotifications />
      <NuxtPage />
    </UApp>
  </NuxtLayout>
  </div>
</template>

<script setup>
import { useUserStore } from './stores/user';

// fetching user data on app load...
const user = useUserStore();
onMounted( async ()=>{
  // await user.fetchUser();
})

</script>
<style>
</style>