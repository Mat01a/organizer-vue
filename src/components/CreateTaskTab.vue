<template>
    <div class="pl-2 pt-2 transition-all w-full">
        <!-- INPUT NAME -->
        <label for="name" class="p-2">Name</label>
        <div class="w-full rounded-md px-2 m-1 bg-custom-slate-550 shadow-md">
            <input type="text" id="name" class="border-0 bg-transparent w-full border-none outline-none my-1 text-base placeholder:text-custom-slate-350" placeholder="enter name here">
        </div>

        <!-- DESCRIPTION NAME -->
        <label for="description" class="p-2">Description</label>
        <div class="w-full rounded-md transition-all px-2 m-1 bg-custom-slate-550 shadow-md">
            <textarea type="text" id="description" class="border-0 bg-transparent w-full border-none outline-none my-1 text-base placeholder:text-custom-slate-350 resize-none" placeholder="enter description here"/>
        </div>
        <button class="bg-green-500 p-2 m-2 rounded-md text-center inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline-block">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
            </svg>

                Create
            </button>
    </div>
</template>

<script setup>
import { onUpdated, ref } from 'vue'
const props = defineProps(['toggle'])
const toggle = ref(props.toggle)
onUpdated(() => {
    toggle.value = props.toggle
})
</script>
