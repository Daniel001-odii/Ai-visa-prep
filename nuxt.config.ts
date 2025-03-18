// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "nuxt-vue3-google-signin", "@pinia/nuxt"],
  googleSignIn: {
    clientId: '877367357708-su3kiqq7ql133589gg4vj3dh6e968mjp.apps.googleusercontent.com',
  },
  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },
  css: ["@/assets/css/style.css"],

  nitro: {
    preset: "vercel",
  },

  runtimeConfig: {
    googleApiKey: process.env.GOOGLE_API_KEY,
    huggingFaceApiKey: process.env.HUGGING_FACE_API_KEY,
    playhtApiKey: process.env.PLAYHT_API_KEY, // Add this
    playhtUserId: process.env.PLAYHT_USER_ID,
    public: {
      apiBase: process.env.API_BASE_URL,
      googleClientId: process.env.GOOGLE_CLIENT_ID
    }
  },

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  vite: {
    optimizeDeps: {
      exclude: ["msedge-tts", "tailwindcss"], // Prevent Vite from bundling this in client
    },
    ssr: {
      noExternal: ["msedge-tts"], // Keep it out of SSR client bundle
    },
  },
});
