<template>
    <div class=" min-h-screen container mx-auto flex justify-center items-center">
        <div class=" max-w-md flex justify-center items-center flex-col gap-12">
            <div class=" flex gap-3 items-center font-bold">
                <img src="../public/favicon.ico" class=" w-[30px]"/>
                <span>Visalify</span>
            </div>
            <TheLogin/>
        </div>
    </div>
</template>

<script>
definePageMeta({
    layout: 'plain',
});
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>