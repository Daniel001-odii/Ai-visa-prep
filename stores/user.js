import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: useState('user', () => null), // Persist user state
  }),
  actions: {
    async fetchUser() {
      try {
        const { $apiFetch } = useNuxtApp();
        const data = await $apiFetch('/user/profile');
        this.user = data; // Store in Pinia
        useState('user').value = data; // Persist in Nuxt state
        console.log("User data fetched:", this.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    logout() {
      this.user = null;
      useState('user').value = null; // Clear persistent state
    }
  }
});
