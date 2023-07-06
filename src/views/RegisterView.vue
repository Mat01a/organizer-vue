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
                        <label for="name" class="block">
                            Name
                        </label>
                        <input type="name" id="name" class="text-xl md:mt-4 rounded-md w-full bg-slate-500 mb-8 md:p-2 dark:focus:outline-none drop-shadow-xl" v-model="form.name" required/>


                        <label for="email" class="block">
                            E-mail
                        </label>
                        <input type="email" id="email" v-bind:class="{'outline outline-1 outline-red-500': user.message_error.email}" class="text-xl md:mt-4 rounded-md w-full bg-slate-500 mb-8 md:p-2 dark:focus:outline-none drop-shadow-xl" v-model="form.email" required/>
                        <div v-if="user.message_error !== null">
                            <div class="block" v-for="(item, index) in user.message_error.email">
                                <ul class="text-red-500 text-lg m-1">
                                {{ item }}
                                </ul>
                            </div>
                        </div>

                        
                        <label for="password" class="block">
                            Password
                        </label>
                        <input type="password" id="password" :class="{ 'outline outline-1 outline-red-500': user.message_error.password !== null}" class="text-xl md:mt-4 rounded-md w-full bg-slate-500 mb-8 md:p-2 dark:focus:outline-none drop-shadow-xl" v-model="form.password" required/>
                        <div v-if="user.message_error !== null">
                            <div class="block" v-for="(item, index) in user.message_error.password">
                                <ul for="password" class="text-red-500 text-lg m-1">
                                {{ item }}
                                </ul>
                            </div>
                        </div>

                        <label for="password" class="block">
                            Password confirmation
                        </label>
                        <input type="password" id="password" class="text-xl md:mt-4 rounded-md w-full bg-slate-500 mb-8 md:p-2 dark:focus:outline-none drop-shadow-xl" v-model="form.password_confirmation" required/>
                    </div>
                    
                    <div class="grid grid-cols-1 w-6/12 mx-auto gap-4">
                        <div class="col-span-1">
                            <button class="bg-slate-400 hover:bg-slate-600  transition-all rounded-lg md:p-2 float-right w-full text-center">Register</button>
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
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
})


async function onSubmit()
{
    let register = await user.register(form)
    errors.value = user.message_error
}
</script>
