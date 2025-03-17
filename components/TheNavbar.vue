<template>
    <div class="border-b  dark:border-gray-800 bg-white dark:bg-slate-900 bg-opacity-50 z-10 backdrop-blur-lg">

        <!-- NON AUTH NABAR -->
        <div v-if="true" class=" flex p-3 container mx-auto items-center justify-between relative bg-inherit">

            <!-- LOGO -->
            <NuxtLink to="/">
                <div class=" flex flex-row gap-3 items-center justify-center">
                    <img src="../public/favicon.ico" class=" w-[30px]"/>
                    <span class=" font-bold">Visalify</span>
                </div>
            </NuxtLink>

            <div :class="mobile_nav ? 'md:flex' : ' hidden md:flex'"
                class=" w-full gap-3 md:border-none border-b bg-inherit md:relative md:justify-between absolute top-[100%] left-0 justify-center p-2 md:p-0">

                <!-- QUICK LINKS -->
                <div class=" flex gap-4 md:items-center mx-auto md:flex-row flex-col items-start ">
                    <UButton label="Features" variant="link" color="black" />
                    <UButton label="About" variant="link" color="black" />
                    <UButton label="Blog" variant="link" color="black" />
                </div>

                <!-- ACTIONS -->
                <div class=" flex flex-row gap-3 items-center w-fit mt-6 md:mt-0">

                    <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
                        " color="gray" variant="ghost" aria-label="Theme" @click="isDark = !isDark" />

                    <UButton label="Sign Up" color="blue" variant="soft" />

                    <UButton label="Sign in" color="blue" variant="solid" />

                </div>
            </div>

            <UButton class=" md:hidden" icon="hugeicons:menu-11" color="black" variant="soft" @click="toggleMenu()" />

        </div>

        <div v-if="false" class=" flex p-3 container mx-auto items-center justify-between relative bg-inherit">

            <!-- LOGO -->
            <NuxtLink to="/">
                <span class=" font-bold">AiVisaPrep</span>
            </NuxtLink>

            <!-- USER PROFILE -->
            <UDropdown class=" dark:bg-slate-800" :items="items"
                :ui="{ item: { disabled: 'cursor-text select-text' }, background: 'bg-white dark:bg-slate-900' }"
                :popper="{ placement: 'bottom-start' }">
                <UIcon name="iconoir:profile-circle"/>
                <!-- <UAvatar alt="John Doe" size="lg" class=" !rounded-full"/> -->
                <template #account="{ item }">
                    <div class="text-left">
                        <p>
                            Signed in as
                        </p>
                        <p class="truncate font-medium text-gray-900 dark:text-white">
                            {{ item.label }}
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

    }], [{
        label: 'Settings',
        icon: 'heroicons:user-circle',
        shortcuts: ['E'],
        click: () => {
            account_modal.value = true;
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
        icon: 'i-heroicons-arrow-left-on-rectangle'
    }]
]

const account_modal = ref(false);
const prev_tests_modal = ref(false);
</script>

<style lang="scss" scoped></style>