<template>
    <nav  class=" border border-b">
        <div class=" flex p-3 flex-row flex-wrap justify-between container mx-auto items-center">

            <!-- LOGO -->
            <span class=" font-bold">AiVisaPrep</span>

            <!-- QUICK LINKS -->
            <div class=" flex gap-4 items-center">
                <UButton
                label="Features"
                variant="link"
                color="black"
                />
                <UButton
                label="About"
                variant="link"
                color="black"
                />
                <UButton
                label="Blog"
                variant="link"
                color="black"
                />
            </div>

            <!-- ACTIONS -->
            <div class=" flex flex-row gap-3 items-center">

                <UButton
                label="login"
                color="blue"
                variant="solid"
                />

                <UButton
                label="Sign Up"
                color="blue"
                variant="soft"
                />

            </div>

        </div>
    </nav>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>