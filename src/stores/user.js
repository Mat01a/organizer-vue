import { defineStore } from 'pinia'
import instance from '../axios'
import router from '../router'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            dark_mode: true,
            user: null,
            register_message_error: {
                name: null,
                email: null,
                password: null,
                password_confirmation: null
            },
            login_message_error: {
                email: null,
            }
        }
    },
    actions: {
        changeDarkMode() {

        },
        async login(form) {
            await instance.get('/sanctum/csrf-cookie')
            const login = await instance.post('/login', {
                email: form.value.email,
                password: form.value.password
            })
            .then((response) => {
                this.user = {
                    email: form.value.email
                }
                router.push({name: 'projects'})
            })
            .catch((error) => {
                this.login_message_error = error.response.data.errors
            })

        },
        async register(form) {
            await instance.get('/sanctum/csrf-cookie')
            const register = await instance.post('/register', {
                name: form.value.name,
                email: form.value.email,
                password: form.value.password,
                password_confirmation: form.value.password_confirmation
            })
            .then((response) => {
                this.user = {
                    email: form.value.email
                }
                router.push({name: 'projects'})
            })
            .catch((error) => {
                this.register_message_error = error.response.data.errors
            })
        }
    },
    getters: {
        isLoggedIn()
        {
            if (this.user == null || this.user.email == undefined)
                return false
            else 
                return true
        }
    }
})