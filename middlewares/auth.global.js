// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('vy_token').value;
  
    // If the user is logged in, redirect them away from auth pages
    if (token && (to.path === '/login' || to.path === '/register' || to.path === '/')) {
      return navigateTo('/interview'); // Redirect to the homepage or dashboard
    }
  
    // If the user is not logged in, redirect them to the login page
   /*  if (!token && (to.path === '/')) {
      return navigateTo('/login'); // Redirect to the login page
    } */
  
  });