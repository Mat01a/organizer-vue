import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            darkMode: true,
        }
    },
    actions: {
        changeDarkMode() {

        }
    }
})