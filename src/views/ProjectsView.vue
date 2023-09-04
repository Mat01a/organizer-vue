<template>
    <div :class="{'overflow-hidden': editValue}" class="min-h-screen flex flex-col w-full bg-slate-500">
        <Navbar/>
            <main :class="{'flex-1 max-w-5xl w-full mx-auto': editValue == false, 'overflow-hidden flex-1 max-w-5xl w-full mx-auto': editValue}">
                <div class="w-full max-w-4xl mx-auto h-20 rounded-lg mt-4 drop-shadow-md" style="background-color: #7D91AD;">
                    <CreateProject/>
                </div>

                <!-- Created projects -->
                <p v-if="projects.current > 0" class="mx-auto max-w-4xl py-4 poppins dark:text-slate-200">Current projects</p>
                
                <div class="pb-12">
                    <div v-for="element in projectStore.projects.current">
                        <ProjectTab :name="element.name" @toggle-edit="receiveEmit(element)"/>
                    </div>
                </div>

                
                <!-- Completed projects -->
                <p v-if="projects.completed > 0" class="mx-auto max-w-4xl py-4 poppins dark:text-slate-200">Completed projects</p>

            </main>
        <Footer/>
    </div>
    
    <!-- EDIT -->
    <ProjectSettings :edit-value="editValue" @toggle-edit="receiveEmit(element)" :project-id="projectSettings.id" :project-name="projectSettings.name" @change-name="changeProjectName" :project-users="projectSettings.users" @add-user="addUser" />

</template>

<script setup>
import Footer from '../components/Footer.vue' 
import Navbar from '../components/Navbar.vue';
import ProjectTab from '../components/ProjectTab.vue';
import CreateProject from '../components/CreateProject.vue';
import ProjectSettings from '../components/ProjectSettings.vue'
import instance from '../axios'
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
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

const editValue = ref(false)
const projectSettings = ref({
    id: {
        type: Number
    },
    name: {
        type: String
    },
})

const userStore = useUserStore()
const projectStore = useProjectStore()

onMounted(() => {
    projectStore.getProjects().then(() => {
        projects.value.current = projectStore.countCurrentProjects
        projects.value.completed = projectStore.countCompletedProjects
    })
})

onUpdated(() => {
    setTransform()
})

onBeforeUpdate(() => {
    setTransform()
})

function receiveEmit(project)
{
    if(project != null)
    {
        let currentProjectJSON = JSON.parse(JSON.stringify(project))
        projectSettings.value.name = currentProjectJSON.name
        projectSettings.value.id = currentProjectJSON.id
        getUsers()
    }
    editValue.value = !editValue.value
}


function addUser(data)
{
    projectStore.addUser(data.id, data.username)
}


function setTransform()
{
    if (document.querySelector("#custom") != null)
    {
        document.querySelector("#custom").style.transform = "translateY("+window.scrollY+"px)"
        document.body.classList.toggle("stopScrollbar")

    }
}

function changeProjectName(data)
{
    console.log(data)
    projectStore.changeName(data.id, data.name).then(() => {
        projectSettings.value.name = data.name
    })
}

function getUsers()
{
    projectStore.getCurrentProjectUsers(projectSettings.value.id)
}

</script>

<style>
.stopScrollbar
{
    overflow: hidden;
}
</style>