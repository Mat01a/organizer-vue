<template>
    <button v-if="!editName" :class="[color, hoverColor, position, additional, size]" class=" hover:text-slate-800 text-slate-200 poppins text-xl z-30 opacity-100 rounded-md h-full my-auto">{{ text }}</button>
</template>

<script setup>
const props = defineProps({
    text: String,
    color: {
        type: String,
        default: 'dark:bg-slate-500 bg-slate-400'
    },
    hoverColor: {
        type: String,
        default: 'hover:dark:bg-yellow-400'
    },
    position: {
        type: String,
        default: 'col-start-11'
    },
    additional: {
        type: String,
    },
    size: {
        type: String,
        default: 'col-span-2'
    },
})
</script>