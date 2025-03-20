<template>
    <div class="border-b  dark:border-gray-800 bg-white dark:bg-slate-900 bg-opacity-50 z-10 backdrop-blur-lg">

        <!-- NON AUTH NABAR -->
        <div v-if="!token" class=" flex p-3 container mx-auto items-center justify-between relative bg-inherit">

            <!-- LOGO -->
            <TheLogo />

            <div :class="mobile_nav ? 'md:flex' : ' hidden md:flex'"
                class=" md:mx-auto w-full border gap-3 md:border-none border-b bg-inherit md:relative md:justify-between absolute top-[100%] left-0 justify-center p-2 md:p-0">

                <!-- QUICK LINKS -->
                <div class=" flex gap-4 md:items-center mx-auto md:flex-row flex-col items-start ">
                    <UButton label="Features" variant="link" color="black" @click="navigateTo('/#features')" />
                    <UButton label="Pricing" variant="link" color="black" @click="gotToPricing"/>
                    <UButton label="FAQ" variant="link" color="black" @click="navigateTo('/#FAQ')"/>
                </div>

                <!-- ACTIONS -->
                <div class=" flex flex-row gap-3 items-center w-fit mt-6 md:mt-0">

                    <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
                        " color="gray" variant="ghost" aria-label="Theme" @click="isDark = !isDark" />

                    <NuxtLink to="/register">
                        <UButton label="Sign Up" color="blue" variant="soft" />
                    </NuxtLink>

                    <NuxtLink to="/login">
                        <UButton label="Sign in" color="blue" variant="solid" />
                    </NuxtLink>
                </div>
            </div>

            <UButton class=" md:hidden" icon="hugeicons:menu-11" color="black" variant="soft" @click="toggleMenu()" />

        </div>

        <div v-else class=" flex p-3 container mx-auto items-center justify-between relative bg-inherit">

            <!-- LOGO -->
            <NuxtLink to="/">
                <div class=" flex flex-row gap-3 items-center justify-center">
                    <img src="../public/favicon.ico" class=" w-[30px]" />
                    <span class=" font-bold">Visalify</span>
                </div>
            </NuxtLink>
            <!-- USER PROFILE -->
            <UDropdown class="" :items="items"
                :ui="{ item: { disabled: 'cursor-text select-text' }, background: 'bg-white dark:bg-slate-900' }"
                :popper="{ placement: 'bottom-start' }">
                <UAvatar  
                :alt="!user?.profile_img ? (user?.name) : ''" 
                :src="user?.profile_img ? (user?.profile_img) : ''"
                :ui="{ avatar: { slots: { root: 'rounded-full !bg-inherit' } } }" />

                <template #account="{ item }">
                    <div class="text-left">
                        <p>
                            Signed in as
                        </p>
                        <p class="truncate font-medium text-gray-900 dark:text-white">
                            {{ user?.email }}
                        </p>
                    </div>
                </template>

                <template #item="{ item }">
                    <span class="truncate">{{ item.label }}</span>

                    <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                </template>
            </UDropdown>
        </div>
    </div>


    <!-- ACCOUNT MODAL -->
    <UModal v-model="account_modal" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Settings
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="account_modal = false" />
                </div>
            </template>
            <TheAccount />
        </UCard>
    </UModal>


    <!-- PREVIOUS TESTS MODAL -->
    <UModal v-model="prev_tests_modal" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Previous Tests
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="prev_tests_modal = false" />
                </div>
            </template>
            <ThePreviousTest />
        </UCard>
    </UModal>





</template>

<script setup>
import ThePreviousTest from './ThePreviousTest.vue';
import { useUserStore } from '#imports';

const token = useCookie("vy_token").value;

const gotToPricing =()=>{
    $emit('goToPricing');
}

const logout = () => {
    const token = useCookie('vy_token');
    token.value = null; // Clear the token
    navigateTo('/login'); // Redirect to the login page
};

const mobile_nav = ref(false);
const toggleMenu = () => {
    mobile_nav.value == false
        ? (mobile_nav.value = true)
        : (mobile_nav.value = false);
};


const colorMode = useColorMode();
const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
});

const items = [
    [{
        label: 'johndoe@example.com',
        slot: 'account',
        disabled: true,

    }],
    [
    {
        label: 'New Interview',
        icon: 'hugeicons:mirroring-screen',
        click: () => {
            navigateTo('/interview')
        }
    },
        {
        label: 'Settings',
        icon: 'heroicons:user-circle',
        click: () => {
            navigateTo('/account')
        }
    },
    {
        label: 'Previous Tests',
        icon: 'heroicons:chat-bubble-oval-left-ellipsis',
        click: () => {
            prev_tests_modal.value = true;
        }
    },
    {
        label: 'Switch Theme',
        icon: 'iconoir:fill-color',
        click: () => {
            isDark.value = !isDark.value;
        }
    },
    ], [{
        label: 'Sign out',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: () => {
            logout();
        }
    }]
]

const account_modal = ref(false);
const prev_tests_modal = ref(false);

const user = ref(null);

onMounted( async ()=>{
  await useUserStore().fetchUser();
  user.value = useUserStore().user;
})

</script>

<style lang="scss" scoped></style>