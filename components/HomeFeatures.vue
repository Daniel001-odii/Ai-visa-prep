<template>
    <div class=" flex flex-col items-center justify-center container mx-auto p-5 py-20">
        <div class=" text-center flex flex-col gap-3">
            <h2 class=" font-bold text-3xl">Powerful features to transform your data experience</h2>
            <span class=" text-slate-500">Visalify combines advanced AI with intuitive design to make data visualization effortless and powerful.</span>
        </div>

        <div class=" flex gap-6 flex-wrap mt-12">
            <!-- <UCard> -->
                <div v-for="item in 6" class=" flex flex-col gap-3 rounded-xl shadow-lg hover:shadow-xl p-8 flex-1 min-w-[400px]">
                    <UIcon name="lucide:brain" class=" size-[30px] text-blue-500"/>
                    <span class=" font-bold text-xl">Ai-powered Chart Generation</span>
                    <p>Upload any data and let our AI suggest and create the perfect visualizations in seconds.</p>
                </div>
            <!-- </UCard> -->
        </div>
       
    </div>
</template>

<script setup>
   
</script>

<style lang="scss" scoped>

</style>