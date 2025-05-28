<template>
    <div class="dark:bg-slate-700 bg-slate-100 rounded-md overflow-hidden shadow-md dark:text-slate-200">
        <!-- NAME -->
        <div class="w-full dark:bg-custom-slate-450 bg-slate-200 hover:dark:bg-slate-500 hover:bg-slate-300 px-4 poppins p-1 cursor-pointer" @click="dropdown = !dropdown">
            {{ task.name }}
        </div>
        <div v-if="dropdown" class="p-2 m-2">
            {{ task.description }}
        </div>

        <!-- DATE -->
        <div class="whitespace-nowrap py-[2px] px-2 w-min m-2 rounded-md open-sans dark:text-slate-700 float-left md:text-base text-sm" :class="{'bg-yellow-500': !task.status, 'bg-green-500': task.status}">
            <div>
                    {{ task.created }}
            </div>
        </div>
        <!-- REMOVE TASK-->
        <div class="my-auto py-2 float-right md:mx-8 mx-2 cursor-pointer" @click="emitRemove(task.id)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 hover:fill-slate-400 dark:fill-slate-100 fill-slate-700">
            <path fill-rule="evenodd" d="M2.515 10.674a1.875 1.875 0 000 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 003-3V6.75a3 3 0 00-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374zM12.53 9.22a.75.75 0 10-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L15.31 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z" clip-rule="evenodd" />
            </svg>
        </div>
        <!-- COMPLETE TASK -->
        <div class="my-auto py-2 float-right cursor-pointer" @click="upadateStatus">

            <!-- NOT COMPLETED -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" v-if="!task.status">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <!-- COMPLETED -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 fill-green-500" v-if="task.status">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>

        </div>

        <!-- CREATOR USERNAME -->
        <div class="my-auto md:py-2 pt-1 pb-2 px-2 float-left">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>

            {{ task.username }}
        </div>


    </div>
</template>

<script setup>
import { toRefs, ref } from 'vue'
import { useTaskStore } from '../stores/tasks'

const props = defineProps(['task'])
const emit = defineEmits(['remove'])
const dropdown = ref(false)
const refs = toRefs(props)
const task = refs.task.value
const taskStore = useTaskStore()


function upadateStatus()
{
    taskStore.update(task.project_id, task.id)
    taskStore.index(task.project_id)
}

function emitRemove(id)
{
    emit('remove', id)
}
</script>
