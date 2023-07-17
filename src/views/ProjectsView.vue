<template>
    <div class="flex flex-col w-full h-screen bg-slate-500">
        <Navbar/>
            <main class="flex-1 max-w-5xl w-full mx-auto">
                <div class="w-full max-w-4xl mx-auto h-20 rounded-lg mt-4 drop-shadow-md" style="background-color: #7D91AD;">
                    <div class="w-full h-full mx-auto text-center py-4 text-green-500">
                        <input type="text" class="bg-inherit text-green-500 outline-none open-sans" placeholder="Create a new project">
                            <div class="w-11/12 my-2 mx-auto h-1 bg-green-500"></div>

                    </div>
                </div>

                <!-- Created projects -->
                <p v-if="projects.current > 0" class="mx-auto max-w-4xl py-4 poppins dark:text-slate-200">Current projects</p>
                
                <ProjectTab name="Lorem"/>
                <ProjectTab name="Ipsum"/>
                <ProjectTab name="Dolor"/>
                <ProjectTab name="Sit"/>
                
                <!-- Completed projects -->
                <p v-if="projects.completed > 0" class="mx-auto max-w-4xl py-4 poppins dark:text-slate-200">Completed projects</p>

            </main>
        <Footer/>
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue' 
import Navbar from '../components/Navbar.vue';
import ProjectTab from '../components/ProjectTab.vue';
import instance from '../axios'
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/user';
import { useProjectStore } from '../stores/project';

const userData = ref()
const projects = ref({
    current: {
        type: Number
    },
    completed: {
        type: Number
    }
})

const userStore = useUserStore()
const projectStore = useProjectStore()

onMounted(() => {
    getUser()
    projects.value.current = projectStore.countCurrentProjects
    projects.value.completed = projectStore.countCompletedProjects
})


async function getUser()
{
    let response = await instance.get('/api/user')
    userData.value = response.data
}

</script>
