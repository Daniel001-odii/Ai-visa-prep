export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
  
    const axiosInstance = $fetch.create({
      baseURL: config.public.apiBase,
      onRequest({ options }) {
        const token = useCookie("accessToken").value;
        options.headers = {
          ...options.headers,
          Authorization: token ? `Bearer ${token}` : "",
        };
      },
      onResponseError({ response }) {
        // Extract error message properly
        throw response
        //const errorData = response?._data //|| { message: "An unknown error occurred" };
        //throw new Error(JSON.stringify(errorData)); // Convert to string to preserve structure
      },
    });
  
    return {
      provide: {
        apiFetch: axiosInstance,
      },
    };
  });