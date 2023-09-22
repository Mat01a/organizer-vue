<template>
    <div v-if="show" class="absolute bg-slate-400 -m-1 w-24 rounded-b-md mt-[1px]">
        <div v-for="current in props.permissions">
            <div class="hover:bg-slate-600 p-1">
                {{ current }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['show', 'permissions'])
const show = ref(props)
</script>
