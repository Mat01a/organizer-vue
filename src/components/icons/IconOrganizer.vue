<template>
    <RouterLink :to="{name: home()}">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="472.5" height="300" viewBox="402.75,327,472.5,300" :class="props.classes" class=" hover:fill-yellow-400 fill-green-500 transition-all hover:scale-105"><g fill-rule="nonzero" stroke="none" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M402.75,477c0,-82.84271 67.15729,-150 150,-150c82.84271,0 150,67.15729 150,150c0,82.84271 -67.15729,150 -150,150c-82.84271,0 -150,-67.15729 -150,-150z" id="Path 1" stroke="#ffffff"/><path d="M875.25,327v300h-215.77108c52.38604,-29.47935 87.77108,-85.60736 87.77108,-150c0,-64.39264 -35.38504,-120.52065 -87.77108,-150z" id="Path 1" stroke="#000000"/></g></svg>
    </RouterLink>
</template>

<script setup>
import { useUserStore } from '../../stores/user';
import { ref } from 'vue'

const props = defineProps({
    classes: {
        default: 'w-16 h-16',
        type: String
    }
})
const userStore = useUserStore()
function home()
{
    let isLogged = userStore.isLoggedIn
    return isLogged ? 'projects' : 'home'
}
</script>
