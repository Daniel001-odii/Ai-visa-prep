<script setup>
import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'
import {
    useCodeClient
} from "vue3-google-signin";

const handleOnSuccess = async (response) => {
    // send code to a backend server to verify it.
    console.log("Code: ", response.code);

    try {
        const res = await useNuxtApp().$apiFetch('/auth/google_verify/code', {
            method: "POST",
            body: JSON.stringify({
                code: response.code,
            }),

        });

        const token = useCookie("vy_token");
        token.value = res.token;
        useRouter().push("/");

        console.log("code verified: ", res)
    } catch (err) {
        console.log("err from server code verify: ", err)
    }
}

const handleOnError = (errorResponse) => {
    console.log("Error: ", errorResponse);
};

const { isReady, login } = useCodeClient({
    onSuccess: handleOnSuccess,
    onError: handleOnError,
    // other options
});

</script>

<template>
    <div class=" w-full">
        <UButton type="button" block color="blue" variant="outline" :disabled="!isReady" @click="login"
            class=" w-full">
            <template #leading>
                <svg class="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                        fill="#4285F4" />
                </svg>
            </template>
            Sign in with Google
        </UButton>

    </div>

</template>
