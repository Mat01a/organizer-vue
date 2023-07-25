<template>
    <div :class="{'overflow-hidden h-auto': editValue, 'min-h-screen': !editValue}" class="flex flex-col w-full bg-slate-500">
        <Navbar/>
            <main :class="{'flex-1 max-w-5xl w-full mx-auto': editValue == false, 'overflow-hidden': editValue}">
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
    <div id="custom" :class="{'h-0': !editValue}" class="absolute z-20 overflow-hidden bg-black bg-opacity-30 left-0 right-0 top-0 h-screen w-full">
        <div class="h-screen w-full">
            <div class="absolute inset-0 mx-auto my-auto w-full max-w-screen-md h-min bg-slate-400 p-4 rounded-md">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-start-1 col-span-11 text-slate-200 poppins mx-2 text-xl">
                        Settings
                    </div>
                    <button class="col-start-12 col-span-1 dark:bg-slate-500 hover:dark:bg-yellow-400 hover:text-slate-800 text-slate-200 poppins z-30 opacity-100 rounded-md" @click="receiveEmit()"> X</button>
                    <hr class=" col-span-12 border border-slate-500"/>

                    <!-- SETTINGS-->
                    <div class="col-span-12 poppins dark:text-slate-200 text-2xl">Project name</div>
                    <div v-if="editName" class="col-span-12 open-sans text-xl dark:text-slate-200">
                        <form class="grid grid-cols-12 gap-4" @submit.prevent="changeProjectName">


                            <input type="text" class="p-2 mx-2 col-span-8 outline-none dark:bg-slate-500 rounded-md w-full px-2" v-model="projectSettings.name">

                            <!-- SAVE BUTTON -->
                            <button v-if="editName" class="col-start-9 col-span-2 dark:bg-green-400 hover:dark:bg-yellow-400 hover:text-slate-800 text-slate-200 poppins text-md z-30 opacity-100 rounded-md h-full px-2 my-auto">Save</button>

                            <!-- CANCEL BUTTON -->
                            <button v-if="editName" class="col-start-11 col-span-2 dark:bg-slate-500 hover:dark:bg-slate-600 text-slate-200 poppins z-30 opacity-100 rounded-md px-2 h-full my-auto" @click="editName = !editName">Cancel</button>
                        </form>
                    </div>
                        <div v-if="!editName" class="col-span-8 open-sans m-2 text-xl dark:text-slate-200 outline-none dark:bg-slate-400 w-4/5 float-left px-2">{{projectSettings.name}}</div>
                    <!-- EDIT BUTTON-->
                    <button v-if="!editName" class="col-start-11 col-span-2 dark:bg-slate-500 hover:dark:bg-yellow-400 hover:text-slate-800 text-slate-200 poppins text-xl z-30 opacity-100 rounded-md px-2 h-full my-auto" @click="editName = !editName">Edit</button>
                </div>
            </div>
        </div>
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

const editName = ref(false)
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

function receiveEmit(project)
{
    if(project != null)
    {
        let currentProjectJSON = JSON.parse(JSON.stringify(project))
        projectSettings.value.name = currentProjectJSON.name
        projectSettings.value.id = currentProjectJSON.id
    }
    editValue.value = !editValue.value
    document.querySelector("#custom").style.transform = "translateY("+window.scrollY+"px)"
    document.body.classList.toggle("stopScrollbar")
}


function changeProjectName()
{
    editName.value = !editName.value
    projectStore.changeProjectName(projectSettings.value.id, projectSettings.value.name)
}
</script>

<style>
.stopScrollbar
{
    overflow: hidden;
}
</style>