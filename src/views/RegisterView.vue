<template>
    <div class="w-full min-h-screen dark:bg-slate-500 bg-slate-100">
        <div class="flex flex-row content-center justify-center h-min py-10">
            <div class="md:basis-1/3 basis-9/12">

                <!-- Logo -->
                <IconOrganizer classes="w-24 h-24 mx-auto pb-8 drop-shadow-xl"/>
                <div class="w-full h-min dark:bg-slate-700 rounded-2xl lato md:text-2xl dark:text-slate-200 text-slate-800 bg-white p-12 drop-shadow-xl">
                    <form @submit.prevent="onSubmit">
                        <div class="w-10/12 mx-auto">
                            <label for="name" class="block">
                                Name
                            </label>
                            <input type="name" id="name" class="text-xl md:mt-2 rounded-md w-full dark:bg-slate-500 bg-white border-2 dark:border-0  border-slate-300 mb-8 md:p-2 dark:focus:outline-none dark:drop-shadow-xl" v-model="form.name" required/>

                            
                            <label for="email" class="block">
                                E-mail
                            </label>
                            <input type="email" id="email" v-bind:class="{'outline outline-1 outline-red-500': user.register_message_error.email}" class="text-xl md:mt-2 rounded-md w-full dark:bg-slate-500 bg-white border-2 dark:border-0  border-slate-300 mb-8 md:p-2 dark:focus:outline-none dark:drop-shadow-xl" v-model="form.email" required/>

                            <div v-if="user.register_message_error != null">
                                <div class="block" v-for="(item, index) in user.register_message_error.email">
                                    <ul class="text-red-500 text-lg m-1">
                                    {{ item }}
                                    </ul>
                                </div>
                            </div>

                            <label for="username" class="block">
                                Username
                            </label>

                            <input type="text" id="username" v-bind:class="{'outline outline-1 outline-red-500': user.register_message_error.username}" class="text-xl md:mt-2 rounded-md w-full dark:bg-slate-500 bg-white border-2 dark:border-0  border-slate-300 mb-8 md:p-2 dark:focus:outline-none dark:drop-shadow-xl" v-model="form.username" required/>

                            <div class="block" v-for="(item, index) in user.register_message_error.username">
                                <ul class="text-red-500 text-lg m-1">
                                {{ item }}
                                </ul>
                            </div>

                            
                            <label for="password" class="block">
                                Password
                            </label>


                            <input type="password" id="password" :class="{ 'outline outline-1 outline-red-500': user.register_message_error.password != null}" class="text-xl md:mt-2 rounded-md w-full dark:bg-slate-500 bg-white border-2 dark:border-0  border-slate-300 mb-8 md:p-2 dark:focus:outline-none dark:drop-shadow-xl" v-model="form.password" required/>

                            <div v-if="user.register_message_error.password != null">
                                <div class="block" v-for="(item, index) in user.register_message_error.password">
                                    <ul for="password" class="text-red-500 text-lg m-1">
                                    {{ item }}
                                    </ul>
                                </div>
                            </div>

                            <label for="password" class="block">
                                Password confirmation
                            </label>
                            <input type="password" id="password" class="text-xl md:mt-2 rounded-md w-full dark:bg-slate-500 bg-white border-2 dark:border-0  border-slate-300 mb-8 md:p-2 dark:focus:outline-none dark:drop-shadow-xl" v-model="form.password_confirmation" required/>
                        </div>
                        
                        <div class="grid grid-cols-1 w-6/12 mx-auto gap-4">
                            <div class="col-span-1">
                                <button :disabled="user.loading" class="dark:disabled:bg-slate-300 disabled:bg-slate-200 dark:bg-slate-400 bg-slate-300 hover:bg-slate-600  transition-all rounded-lg md:p-2 p-3 float-right w-full text-center">
                                    <div v-if="!user.loading">Register</div>
                                    <div v-if="user.loading">
                                        <div class="w-8 h-8 border-4 border-transparent mx-auto dark:border-t-green-500 border-t-slate-300 animate-spin rounded-full z-40"></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
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
    username: null,
    password: null,
    password_confirmation: null,
})


async function onSubmit()
{
    let register = await user.register(form)
}
</script>
