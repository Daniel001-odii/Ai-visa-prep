// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  css: ["@/assets/css/style.css"],

  nitro: {
    preset: "vercel",
  },

  runtimeConfig: {
    googleApiKey: process.env.GOOGLE_API_KEY,
    huggingFaceApiKey: process.env.HUGGING_FACE_API_KEY,
    playhtApiKey: process.env.PLAYHT_API_KEY, // Add this
    playhtUserId: process.env.PLAYHT_USER_ID,
  },

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
});
