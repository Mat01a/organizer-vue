<template>
    <div class="block md:hidden col-span-8 py-2">
        {{ text }}
    </div>
    <div v-if="checked && !edit" class="md:col-span-1 col-span-4 open-sans mx-auto my-auto w-full text-center text-green-500">✔</div>
    <div v-if="!checked && !edit && !change" class="md:col-span-1 col-span-4 open-sans mx-auto my-auto w-full text-center text-red-500">✘</div>
    <input class="accent-green-500" v-if="edit" type="checkbox" :checked="checkedInput" @click="$emit('toggled', checkedInput ? 0 : 1)">
</template>

<script setup>
import { ref, onUpdated } from 'vue'
const props = defineProps(['checked', 'text', 'edit', 'change'])
const checkedInput = ref(props.checked)
onUpdated(() => {
    checkedInput.value = checkedInput == props.checked ? checkedInput.value: props.checked  
})
</script>