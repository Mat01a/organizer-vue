<template>
    <!-- Moon Icon (DARK MODE) -->
    <div v-if="theme == 'dark'" @mouseover="toggleMoon = true" @mouseleave="toggleMoon = false" @click="changeTheme()" class="bg-green-600 w-10 h-10 rounded-full hover:bg-slate-400 cursor-pointer z-20 overflow-hidden">
        <div :class="{'scale-100': toggleMoon, 'scale-0': !toggleMoon}" class="relative">
            <div class="absolute -ml-1 -mt-1 bg-slate-200 h-10 w-10 rounded-full z-10"></div>
        </div>
        <div :class="{'scale-100': toggleMoon, 'scale-0': !toggleMoon}" class="absolute ml-2 mt-3 bg-slate-400 w-3 h-3 rounded-full z-20"></div>
        <div :class="{'scale-100': toggleMoon, 'scale-0': !toggleMoon}" class="absolute ml-5 mt-1 bg-slate-400 w-2 h-2 rounded-full z-20"></div>
        <div :class="{'scale-100': toggleMoon, 'scale-0': !toggleMoon}" class="relative ml-6 mt-6 bg-slate-500 w-5 h-5 rounded-full z-20">
            <div class="absolute bg-slate-600 h-5 w-5 rounded-full z-10"></div>
        </div>
    </div>

    <!-- Sun Icon (BRIGHT MODE) -->
    <div v-if="theme == 'light'" @mouseover="toggleSun = true" @mouseleave="toggleSun = false" @click="changeTheme()" class="bg-green-600 w-10 h-10 rounded-full hover:bg-yellow-500 cursor-pointer z-20 overflow-hidden">
        <div :class="{'scale-100': toggleSun, 'scale-0': !toggleSun}" class="w-10 h-10 -ml-1 -mt-1 rounded-full bg-yellow-300"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const toggleMoon = ref(null)
const toggleSun = ref(null)
const theme = ref(null)

if (localStorage.theme)
{
    theme.value = localStorage.theme
}
else
{
    localStorage.setItem('theme', 'dark') 
    theme.value = 'light'
}

function changeTheme() {
    console.log(theme)
    if(localStorage.theme == 'dark')
    {
        localStorage.setItem('theme', 'light')
        theme.value = 'light'
        //localStorage.removeItem('theme')
        document.documentElement.classList.toggle('dark')
    }
    else
    {
        theme.value = 'dark'
        document.documentElement.classList.toggle('dark')
        localStorage.setItem('theme', 'dark')
    }
}
</script>
