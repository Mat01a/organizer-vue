<template>
    <div class="w-full h-16 dark:bg-slate-800 bg-slate-400">
        <div class="grid md:grid-cols-12">
            <div class="col-start-2 col-span-2">
                <IconOrganizer />  
            </div>

            <!-- Not logged -->
            <div v-if="!loggedIn" class="col-start-11">
                <div class="grid w-full h-full content-center">
                    <RouterLink :to="{name: 'login'}" class="text-green-500 poppins text-xl hover:text-yellow-400 mx-auto">Login</RouterLink>
                </div>
            </div>
            <div v-if="!loggedIn" class="col-start-12">
                <RouterLink :to="{name: 'register'}" class="dark:text-slate-800 poppins text-xl">
                    <div class="bg-green-500 h-full w-full grid content-center hover:bg-yellow-400">
                        <div class="mx-auto">
                            Register
                        </div>
                    </div>
                </RouterLink>
            </div>


            <!-- logged -->
            <div v-if="loggedIn" class="col-start-11">
                <div class="grid w-full h-full content-center">
                    <div @click="menuToggle = !menuToggle" class="bg-green-500 w-10 h-10 rounded-full mx-auto hover:bg-yellow-400 cursor-pointer">
                        <div v-if="menuToggle" class="absolute w-30 h-min p-1 bg-slate-600 z-30 top-14 rounded-md -mx-8">
                        <RouterLink :to="{name: 'projects'}">
                            <p class="p-1 m-1 rounded-md hover:bg-slate-500 text-slate-400 font-bold text-center">
                                    <IconProjects/>
                                    Projects
                                </p>
                            </RouterLink>
                            <hr class="border-t-1 border-custom-slate-350"/>
                            <RouterLink :to="{name: 'logout'}">
                                <p class="p-1 m-1 rounded-md hover:bg-slate-500 text-slate-400 text-center">
                                    <IconLogout/>
                                    Logout
                                </p>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="loggedIn" class="col-start-12">
                <div class="grid w-full h-full content-center">
                    <IconMoon/>
                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
import IconOrganizer from './icons/IconOrganizer.vue'
import IconMoon from './icons/IconThemeToggle.vue'
import IconLogout from './icons/IconLogout.vue'
import IconProjects from './icons/IconProjects.vue'
import { useUserStore } from '@/stores/user'
import { onMounted, onUpdated, ref } from 'vue'

const menuToggle = ref(false)
const loggedIn = ref(false)
onMounted(() => {
    const user = useUserStore()
    loggedIn.value = user.isLoggedIn
})
onUpdated(() => {
    const user = useUserStore()
    loggedIn.value = user.isLoggedIn
})
</script>
