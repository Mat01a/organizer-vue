import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProjectsView from '../views/ProjectsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from) => {
  const user = useUserStore()

  // If there is no path like that, redirect to login page
  if (to.matched.length == 0)
  {
    return {
      path: '/login'
    }
  }

  // If this path requires auth check if user is logged in and redirect
  if (to.meta.requiresAuth && !user.isLoggedIn) {
    return {
      path: '/login',
    }
  }

  // Redirect if logged in user wants to go on login/register page
  if (to.name == 'login' && user.isLoggedIn|| to.name == 'register' && user.isLoggedIn)
  {
    return {
      path: '/'
    }
  }


  // If user redirect from login/register page it resets error messages
  if (from.name == 'login' || from.name == 'register')
  {
    user.login_message_error.email = null
    user.register_message_error.value = {
        email: null,
        name: null,
        password: null,
        password_confirmation: null
    }
  }

})


export default router
