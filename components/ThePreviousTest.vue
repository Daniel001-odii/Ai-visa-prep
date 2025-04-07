<template>
    <div>
        <!-- Your previous tests.. -->

        <div class=" flex justify-between flex-col gap-6">
            <div class=" flex flex-col w-full gap-2" v-for="test in 4">
                <USkeleton class="w-full h-4 rounded-full " />
                <USkeleton class="w-[50%] h-4 rounded-full " />
                <USkeleton class="w-[80%] h-4 rounded-full " />
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>