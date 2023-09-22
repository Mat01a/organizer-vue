<template>
    <div class="w-full h-screen dark:bg-slate-500">
        <div class="absolute inset-0 mx-auto my-auto w-min h-min">

        </div>
        <div class="inset-0 mx-auto my-auto absolute w-full max-w-md h-min">
            <!-- Logo -->
            <IconOrganizer classes="w-24 h-24 mx-auto pb-8 drop-shadow-xl"/>
            <div class="w-full h-full dark:bg-slate-700 rounded-2xl lato md:text-2xl dark:text-slate-200 p-12 drop-shadow-xl">

                <form @submit.prevent="onSubmit">
                    <div class="w-10/12 mx-auto">
                        <label for="email" class="block">
                            E-mail
                        </label>
                        <input type="email" id="email" :class="{'outline outline-1 outline-red-500': user.login_message_error.email}" class="text-xl md:mt-4 rounded-md w-full bg-slate-500 mb-8 md:p-2 dark:focus:outline-none drop-shadow-xl" v-model="form.email" required/>
                        <label v-if="user.login_message_error.email" for="email" class="block text-base text-red-500">
                            {{ user.login_message_error.email[0] }}
                        </label>
                        
                        <label for="password" class="block">
                            Password
                        </label>
                        <input type="password" id="password" :class="{'outline outline-1 outline-red-500': user.login_message_error.email}" class="text-xl md:mt-4 rounded-md w-full bg-slate-500 mb-8 md:p-2 dark:focus:outline-none drop-shadow-xl" v-model="form.password" required/>
                    </div>
                    
                    <div class="grid grid-cols-2 w-10/12 mx-auto gap-4">
                        <div class="col-span-1">
                            <button :disabled="user.loading" class="h-12 dark:disabled:bg-gray-300 bg-green-500 hover:bg-yellow-400 transition-all hover:text-slate-100 rounded-lg md:p-2 float-left w-full">
                            <div v-if="!user.loading">Login</div>
                            <div v-if="user.loading">
                                <div class="w-8 h-8 border-4 border-transparent mx-auto border-t-green-500 animate-spin rounded-full z-40"></div>
                            </div>
                            </button>
                        </div>
                        <div class="col-span-1">
                            <RouterLink :to="{name: 'register' }" class="bg-slate-400 hover:bg-slate-600  transition-all rounded-lg md:p-2 float-right w-full text-center">Register</RouterLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import IconOrganizer from '../components/icons/IconOrganizer.vue';
import { useUserStore } from '@/stores/user'
import router from '../router'
import { ref } from 'vue'

const user = useUserStore()
const form = ref({
    email: null,
    password: null
})

async function onSubmit()
{
    await user.login(form)
}
</script>
