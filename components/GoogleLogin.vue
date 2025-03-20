<script setup>
  import {
      useCodeClient
  } from "vue3-google-signin";
  const is_loading = ref(false);
  const handleOnSuccess = async (response) => {
    is_loading.value = true;
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
          useRouter().push("/account");
  
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
          <UButton type="button" block color="blue" variant="ghost" :disabled="!isReady" @click="login"
              class=" w-full">
              <template #leading>
                <svg v-if="is_loading || !isReady" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE --><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)"/><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"/></g></svg>
                  <svg v-else class="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                          fill="#4285F4" />
                  </svg>
                  
              </template>
              Sign in with Google
          </UButton>
  
      </div>
  
  </template>
  