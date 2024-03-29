<template>
    <div :class="{'overflow-hidden': editValue}" class="min-h-screen flex flex-col w-full dark:bg-slate-500 bg-slate-100">
        <Navbar/>
            <main :class="{'flex-1 max-w-5xl md:w-full mx-auto': editValue == false, 'overflow-hidden flex-1 max-w-5xl w-full mx-auto': editValue}">
                <div class="w-full max-w-4xl mx-auto h-20 rounded-lg mt-4 drop-shadow-md dark:bg-custom-slate-550 bg-slate-200">
                    <ProjectForm/>
                </div>

                <!-- Current projects -->
                <p v-if="projectStore.countCurrentProjects > 0" class="mx-auto max-w-4xl py-4 poppins dark:text-slate-200 text-slate-700">Current projects</p>
                
                <div class="pb-12">
                    <div v-for="element in projectStore.projects">
                        <ProjectTab v-if="element.status == 0" :id="element.id" :name="element.name" :status="element.status" @toggle-edit="receiveEmit(element)"/>
                    </div>
                </div>

                
                <!-- Completed projects -->
                <p v-if="projectStore.countCompletedProjects > 0" class="mx-auto max-w-4xl py-4 poppins dark:text-slate-200 text-slate-700">Completed projects</p>
                <div class="pb-12">
                    <div v-for="element in projectStore.projects">
                        <ProjectTab v-if="element.status == 1" :id="element.id" :name="element.name" :status="element.status" @toggle-edit="receiveEmit(element)" />
                    </div>
                </div>
            </main>
            <!-- LOADING ICON -->
            <div v-if="projectStore.loading == true" class="absolute bottom-2 right-6 w-16 h-16 border-8 border-transparent m-4 border-t-green-500 animate-spin rounded-full z-40"></div>

            <!-- ERROR TAB -->
            <Transition name="fadeHeight" class="overflow-hidden">
                <div v-if="projectStore.error == true" class="absolute bottom-2 right-6 bg-red-600 h-24 w-60 rounded-md poppins text-xl dark:text-gray-200 text-white p-2 z-40">
                    {{ projectStore.errorMessage }}
                </div>
            </Transition>

                
            <!-- EDIT -->
            <ProjectSettings :edit-value="editValue" @toggle-edit="receiveEmit(element)" :project-id="projectSettings.id" :project-name="projectSettings.name" @change-name="changeProjectName" :project-users="projectSettings.users" @add-user="addUser" :project-status="projectSettings.status"/>
        <Footer/>
    </div>


</template>

<script setup>
import Footer from '../components/Footer.vue' 
import Navbar from '../components/Navbar.vue';
import ProjectTab from '../components/ProjectTab.vue';
import ProjectForm from '../components/ProjectForm.vue';
import ProjectSettings from './partials/projects/ProjectSettings.vue'
import instance from '../axios'
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import { useUserStore } from '../stores/user';
import { useProjectStore } from '../stores/project';

const userData = ref()

const editValue = ref(false)
const projectSettings = ref({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    status: {
        type: Number
    },
})

const userStore = useUserStore()
const projectStore = useProjectStore()

onMounted(() => {
    projectStore.getProjects()
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
        projectSettings.value.status = currentProjectJSON.status
        getUsers()
    }
    editValue.value = !editValue.value
}


function addUser(data)
{
    projectStore.addUser(data.id, data.username)
    getUsers()
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