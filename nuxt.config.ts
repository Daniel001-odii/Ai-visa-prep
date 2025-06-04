// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "nuxt-vue3-google-signin", "@pinia/nuxt", "nuxt-gtag"],
  googleSignIn: {
    clientId: '877367357708-su3kiqq7ql133589gg4vj3dh6e968mjp.apps.googleusercontent.com',
  },
  gtag: {
    id: "G-PYH5MP3NR5",
    config: {

    }
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
      googleClientId: '877367357708-su3kiqq7ql133589gg4vj3dh6e968mjp.apps.googleusercontent.com'
    }
  },

  app: {
  head: {
    title: 'Visalify – Ace Your Visa Interview with AI',
    meta: [
      // Standard SEO meta tags
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'Practice real visa interviews with AI. Visalify helps you prepare, get feedback, and boost your chances of approval for F1, H1B, B1/B2, Schengen, UK, and more.',
      },
      {
        name: 'keywords',
        content:
          'Visalify, visa interview preparation, AI visa coach, F1 visa, H1B visa, Schengen visa, UK visa, student visa, mock visa interview, immigration interview practice',
      },
      { name: 'author', content: 'Visalify' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph / Facebook
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.visalify.online' },
      { property: 'og:title', content: 'Visalify – Ace Your Visa Interview with AI' },
      {
        property: 'og:description',
        content:
          'Get visa-ready with confidence. Simulate real interview questions, get smart feedback, and succeed on your next visa attempt with Visalify.',
      },
      {
        property: 'og:image',
        content:
          'https://raw.githubusercontent.com/Daniel001-odii/visalify-landing-fluent/refs/heads/main/public/assets/og-image.png?token=GHSAT0AAAAAADAL7I7JEZ7YNTQIKHNXJLXK2CAXJLA',
      },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'https://www.visalify.online' },
      { name: 'twitter:title', content: 'Visalify – Ace Your Visa Interview with AI' },
      {
        name: 'twitter:description',
        content:
          'Nail your next visa interview with AI-powered mock interviews and personalized feedback. Try Visalify now!',
      },
      {
        name: 'twitter:image',
        content:
          'https://raw.githubusercontent.com/Daniel001-odii/visalify-landing-fluent/refs/heads/main/public/assets/og-image.png?token=GHSAT0AAAAAADAL7I7JEZ7YNTQIKHNXJLXK2CAXJLA',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap',
      },
    ],
    style: [
      {
        children: `
          body {
            font-family: 'Poppins', sans-serif;
          }
        `,
      },
    ],
  },
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
