// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('vy_token').value;
  
    // If the user is logged in, redirect them away from auth pages
    if (token && (to.path === '/login' || to.path === '/register' || to.path === '/' || to.path === '/interview' || to.path === '/in')) {
      return navigateTo('/in/dashboard'); // Redirect to the homepage or dashboard
    }
  
    // If the user is not logged in, redirect them to the login page
    if (!token && (
      to.path === '/in/dashboard' 
      || to.path === '/in/interview'
      || to.path === '/in/account'
      || to.path === '/')) {
      return navigateTo('/login'); // Redirect to the login page
    }
  
  });