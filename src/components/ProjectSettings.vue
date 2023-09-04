<template>
    <div v-if="editValue" id="custom" class="absolute z-20 overflow-hidden bg-black bg-opacity-30 left-0 right-0 top-0 h-screen w-full">
        <div class="h-screen w-full">
            <div class="absolute inset-0 mx-auto my-auto w-full max-w-screen-md h-min bg-slate-400 p-4 rounded-md">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-start-1 col-span-11 text-slate-200 poppins mx-2 text-xl">
                        Settings
                    </div>
                    <button class="col-start-12 col-span-1 dark:bg-slate-500 hover:dark:bg-yellow-400 hover:text-slate-800 text-slate-200 poppins z-30 opacity-100 rounded-md" @click="toggleEdit()"> X</button>
                    <hr class=" col-span-12 border border-slate-500"/>

                    <!-- SETTINGS-->
                    <div class="col-span-12 poppins dark:text-slate-200 text-2xl">Project name</div>
                        <div v-if="editName" class="col-span-12 open-sans text-xl dark:text-slate-200">
                            <form class="grid grid-cols-12 gap-4" @submit.prevent="changeName">


                                <input type="text" class="p-2 mx-2 col-span-8 outline-none dark:bg-slate-500 rounded-md w-full px-2" v-model="projectSettings.name">

                                <!-- SAVE BUTTON -->
                                <button v-if="editName" class="col-start-9 col-span-2 dark:bg-green-400 hover:dark:bg-yellow-400 hover:text-slate-800 text-slate-200 poppins text-md z-30 opacity-100 rounded-md h-full px-2 my-auto" >Save</button>

                                <!-- CANCEL BUTTON -->
                                <button v-if="editName" class="col-start-11 col-span-2 dark:bg-slate-500 hover:dark:bg-slate-600 text-slate-200 poppins z-30 opacity-100 rounded-md px-2 h-full my-auto" @click="editName = !editName">Cancel</button>
                            </form>
                        </div>
                        <div v-if="!editName" class="col-span-8 open-sans m-2 text-xl dark:text-slate-200 outline-none dark:bg-slate-400 w-4/5 float-left px-2">{{projectName}}</div>
                    <!-- EDIT BUTTON-->
                    <button v-if="!editName" class="col-start-11 col-span-2 dark:bg-slate-500 hover:dark:bg-yellow-400 hover:text-slate-800 text-slate-200 poppins text-xl z-30 opacity-100 rounded-md px-2 h-full my-auto" @click="editInputToggle()">Edit</button>

                    <!-- ADD USER -->
                    <div class="col-span-12 poppins dark:text-slate-200 text-2xl">Add User</div>
                        <div class="col-span-12 open-sans text-xl dark:text-slate-200">
                            <form class="grid grid-cols-12 gap-4" @submit.prevent="addUser">

                                
                                <div v-if="projects.projects.addUserError" class="text-red-500 poppins col-span-8 px-6">
                                {{ projects.projects.addUserError }}
                                </div>

                                <input data-focus="searchUser" @input="searchUser" type="text" :class="{'border border-red-500': projects.projects.addUserError}" class="py-2 px-4 mx-2 col-span-8 outline-none dark:bg-slate-500 rounded-md w-full" v-model="search">

                                <!-- ADD BUTTON -->
                                <button class="col-start-11 col-span-2 dark:bg-green-400 hover:dark:bg-yellow-400 hover:text-slate-800 text-slate-200 poppins text-md z-30 opacity-100 rounded-md h-full px-2 my-auto">Add</button>
                            </form>
                        </div>
                        <!-- PROPOSED USERS -->
                        <div class="col-span-12 open-sans h-2 dark:text-slate-200 text-xl z-30">
                            <div class="grid grid-cols-12 gap-4">

                                <div data-focus="searchUser" v-if="showProposed" class="py-2 px-4 mx-2 col-span-8 -mt-5 outline-none dark:bg-slate-500 rounded-bl-md rounded-br-md w-full">
                                    <hr/>
                                    <div data-focus="searchUser" v-for="proposed in currentProposed">
                                    <p data-focus="searchUser" class="p-2 text-slate-300 hover:dark:bg-slate-600 cursor-pointer" @click="chooseProposedUser(proposed.username)">
                                        <p class="font-bold">
                                            {{ proposed.name }}
                                        </p>
                                        <p class="col-span-10 my-auto open-sans text-base">{{ proposed.username }}</p>
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <!-- USERS -->
                    <div class="col-span-12 poppins dark:text-slate-200 text-2xl max-h-96">Users</div>
                    <div class="col-span-12 max-h-96 overflow-hidden">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-8" v-for="(user, value) in projects.projects.currentProjectUsers[0]">
                                <p class="py-2 px-4 mx-2 col-span-8 outline-none dark:bg-slate-500 text-slate-300 poppins text-xl rounded-md w-full">

                                    <div class="grid grid-cols-12">
                                        <div class="col-span-7 px-2 my-auto">
                                            {{ user.name }}
                                            <p class="col-span-10 my-auto open-sans text-base">{{ user.username }}</p>
                                        </div>
                                        <div class="col-span-5 open-sans mx-auto my-auto">
                                            {{ projects.projects.currentProjectUsers[1].data[value].name }}
                                        </div>
                                    </div>
                                </p>
                            </div>
                            <!-- PREVIOUSE PAGE -->
                            <div class="col-span-2">
                                <button v-if="projects.projects.currentProjectUsers[1].current_page > 1" class="w-full h-min py-1 dark:bg-slate-500 hover:dark:bg-yellow-400 hover:text-slate-800 text-slate-200 poppins text-xl z-30 opacity-100 rounded-md px-2" @click="previousPage()">Previous Page</button>
                            </div>
                            <!-- NEXT PAGE -->
                            <div v-if="projects.projects.currentProjectUsers[1].current_page < projects.projects.currentProjectUsers[1].last_page" class="col-span-2">
                                <button class="w-full h-min py-1 dark:bg-slate-500 hover:dark:bg-yellow-400 hover:text-slate-800 text-slate-200 poppins text-xl z-30 opacity-100 rounded-md px-2" @click="nextPage()">Next Page</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useProjectStore } from '../stores/project';
const projects = useProjectStore()


const props = defineProps({
    editValue: Boolean,
    projectId: Number,
    projectName: String,
})


const emit = defineEmits(['toggle-Edit', 'change-name', 'add-user'])


const editName = ref(false)
const edit = ref(false)
const showProposed = ref(false)
const currentProposed = ref()
const projectSettings = ref({
    id: {
        type: Number
    },
    name: {
        type: String
    },
})
const search = ref()
const projectUsers = ref()

// Event Listener for hidding proposed searchbar
document.addEventListener('focusout', focusChanged)


function changeName()
{
    editName.value = !editName.value
    emit("change-name", {id: projectSettings.value.id, name: projectSettings.value.name})
}

function addUser()
{
    projectSettings.value.id = props.projectId
    emit("add-user", {id: projectSettings.value.id, username: search.value})
}

function toggleEdit(mode)
{
    emit('toggle-Edit')
    edit.value = mode
}

function editInputToggle()
{
    projectSettings.value.id = props.projectId
    projectSettings.value.name = props.projectName
    editName.value = !editName.value
}

function searchUser()
{
    if(search.value !== "")
    {
        showProposed.value = true
        projects.deleteAddUserError()
        projects.searchUser(props.projectId, search.value).then(() => {
            currentProposed.value = projects.projects.currentProposed
        })
    }
    else
    {
        showProposed.value = false
    }
}

function chooseProposedUser(user)
{
    search.value = user
    showProposed.value = false
}

function focusChanged(event)
{
    if(event.explicitOriginalTarget.dataset.focus != 'searchUser')
    {
        showProposed.value = false
    }
}

function nextPage()
{
    projects.nextUsersPage(props.projectId)
}

function previousPage()
{
    projects.previousUsersPage(props.projectId)
}
</script>
