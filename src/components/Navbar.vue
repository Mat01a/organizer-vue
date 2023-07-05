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
                    <div class="bg-green-500 w-10 h-10 rounded-full mx-auto hover:bg-yellow-400 cursor-pointer">

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
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'

const loggedIn = ref(false)
onMounted(() => {
    const user = useUserStore()
    loggedIn.value = user.isLoggedIn
    console.log(loggedIn)
})
</script>
