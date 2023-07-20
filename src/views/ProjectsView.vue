<template>
    <div class="flex flex-col w-full min:h-screen bg-slate-500">
        <Navbar/>
            <main class="flex-1 max-w-5xl w-full mx-auto">
                <div class="w-full max-w-4xl mx-auto h-20 rounded-lg mt-4 drop-shadow-md" style="background-color: #7D91AD;">
                    <CreateProject/>
                </div>

                <!-- Created projects -->
                <p v-if="projects.current > 0" class="mx-auto max-w-4xl py-4 poppins dark:text-slate-200">Current projects</p>
                
                <div class="pb-12">
                    <div v-for="element in projectStore.projects.current">
                        <ProjectTab :name="element.name"/>
                    </div>
                </div>

                
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
import CreateProject from '../components/CreateProject.vue';
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
    projectStore.getProjects().then(() => {
        projects.value.current = projectStore.countCurrentProjects
        projects.value.completed = projectStore.countCompletedProjects
    })
})


</script>
