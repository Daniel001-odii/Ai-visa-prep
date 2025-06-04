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

useHead({
  script: [
    {
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-BSVF3MPQR6"
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-BSVF3MPQR6');
      `,
      type: "text/javascript"
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'google-analytics': ['innerHTML']
  }
});


</script>
<style>
</style>