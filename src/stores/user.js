import { defineStore } from 'pinia'
import instance from '../axios'
import router from '../router'
import { useProjectStore } from './project'

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
            },
            loading: false,
        }
    },
    actions: {
        changeDarkMode() {

        },
        async login(form) {
            this.loading = true
            console.log(instance.baseurl)
            await instance.get('/sanctum/csrf-cookie')
            .catch((error) => {
                this.loading = false
            })
            const login = await instance.post('/login', {
                email: form.value.email,
                password: form.value.password
            })
            .then((response) => {
                this.user = {
                    email: form.value.email
                }
                this.loading = false
                router.push({name: 'projects'})
            })
            .catch((error) => {
                this.loading = false
                this.login_message_error = error.response.data.errors
                console.log(error)
            })

        },
        async register(form) {
            this.loading = true
            await instance.get('/sanctum/csrf-cookie')
            const register = await instance.post('/register', {
                name: form.value.name,
                email: form.value.email,
                username: form.value.username,
                password: form.value.password,
                password_confirmation: form.value.password_confirmation
            })
            .then((response) => {
                this.loading = false
                this.user = {
                    email: form.value.email
                }
                router.push({name: 'projects'})
            })
            .catch((error) => {
                //Reset all errors
                for(let item in this.register_message_error)
                {
                    this.register_message_error[item] = null
                }
                
                //Set all current errors
                for(let item in error.response.data.errors)
                {
                    this.register_message_error[item] = error.response.data.errors[item]
                }
                this.register_message_error = error.response.data.errors
                this.loading = false
            })
        },
        async logout()
        {
            this.loading = true
            const req = await instance.post("/logout")
            .then(() => {
                const projects = useProjectStore()
                console.log("LOGOUT")
                this.user = null
                projects.projects.current = []
                projects.projects.completed = []
                sessionStorage.clear()
                this.loading = false
            })
            return req
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
    },
    persist: {
        storage: sessionStorage
    }
},)