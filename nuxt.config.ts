// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
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
    public: {
      apiBase: process.env.API_BASE_URL,
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
