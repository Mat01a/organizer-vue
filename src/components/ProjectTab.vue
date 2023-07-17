<template>
    <div class="w-full max-w-4xl mx-auto h-20 rounded-lg mt-4 drop-shadow-md" style="background-color: #7D91AD;">

        <div class="grid grid-cols-12 w-full">
            <!-- Icon -->
            <div class="col-span-2 h-20 float-left flex">
                <div class="rounded-full bg-orange-300 w-10 h-10 m-auto inline"></div>
            </div>

            <!-- Name -->
            <div class="block col-start-3 col-span-7 text-left text-lg my-auto poppins text-slate-100">{{ name }}</div>

            <!-- Buttons -->
            <SettingsButton :hovered="isHovered"/>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SettingsButton from './buttons/SettingsButton.vue';

var isHovered = ref(false)
defineProps({
    name: String
})


</script>
