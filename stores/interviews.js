import { defineStore } from 'pinia';
export const useInterviewStore = defineStore('interviews', {
  state: () => ({
    interviews: useState('interviews', () => null), // Persist user state
  }),

  actions: {
    async getInterviews() {
      try {
        const { $apiFetch } = useNuxtApp();
        const data = await $apiFetch('/user/interviews');
        this.interviews = data; // Store in Pinia
        useState('interviews').value = data; // Persist in Nuxt state
        console.log("User interviews data fetched:", this.interviews);
      } catch (error) {
        console.error("Error fetching user interviews:", error);
      }
    },
  }
});
