import { defineStore } from 'pinia'
import instance from '../axios'
import router from '../router'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            darkMode: true,
            user: null
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
            })
            .catch((error) => {
                console.log(error)
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