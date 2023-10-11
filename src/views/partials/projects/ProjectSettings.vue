<template>
    <div v-if="editValue" id="custom" class="absolute z-80 md:overflow-hidden bg-black bg-opacity-30 left-0 right-0 top-0 h-screen w-full overflow-scroll">
        <div class="md:h-screen md:w-full pt-8 md:pt-0">
            <div class="md:absolute z-80 md:inset-0 mx-auto my-auto md:w-full w-4/5 max-w-screen-md h-min dark:bg-slate-400 bg-slate-200 p-4 rounded-md">
                <div v-if="projects.showPermissions == false" class="grid md: grid-cols-12 gap-4 ">
                    <div class="col-start-1 md:col-span-11 col-span-8 dark:text-slate-200 text-slate-700 poppins mx-2 text-xl">
                        Settings
                    </div>
                    <button class="md:col-start-12 col-start-9 col-span-3 md:col-span-1 dark:bg-slate-500 bg-slate-300 hover:bg-yellow-400 hover:text-slate-800 dark:text-slate-200 text-slate-700 poppins z-30 opacity-100 rounded-md p-2" @click="toggleEdit()"> X</button>
                    <hr class=" col-span-12 border border-slate-500"/>

                    <!-- SETTINGS-->
                    <div class="col-span-12 poppins dark:text-slate-200 text-slate-700 text-2xl">Project name</div>
                        <div v-if="editName" class="col-span-12 open-sans text-xl dark:text-slate-200">
                            <form class="grid grid-cols-12 gap-4 w-full" @submit.prevent="changeName">


                                <input type="text" class="p-2 mx-2 md:col-span-8 col-span-12 outline-none dark:bg-slate-500 rounded-md w-full px-2" v-model="projectSettings.name">

                                <!-- SAVE BUTTON -->
                                <EditButton v-if="editName" color="bg-green-400" text="Save" position="md:col-start-9" size="md:col-span-2 col-span-6" additional="py-2 mx-2 md:mx-0 md:p-0"/>

                                <!-- CANCEL BUTTON -->
                                <EditButton v-if="editName" @click="editName = !editName" text="Cancel" position="md:col-start-11 col-start-8" size="md:col-span-2 col-span-6" additional="py-2 mx-2 md:mx-0 md:p-0"/>
                            </form>
                        </div>
                        <div v-if="!editName" class="md:col-span-10 col-span-12 open-sans m-2 text-xl dark:text-slate-200 outline-none dark:bg-slate-400 float-left px-2">{{projectName}}</div>
                    <!-- EDIT BUTTON-->
                    <EditButton v-if="!editName" @click="editInputToggle()" text="Edit" position="md:col-start-11 col-start-4" size="md:col-span-2 col-span-6" additional="py-2 mx-2 md:mx-0 md:p-0"/>

                    <!-- ADD USER -->
                    <div class="col-span-12 poppins dark:text-slate-200 text-slate-700 text-2xl">Add User</div>
                        <div class="col-span-12 open-sans text-xl dark:text-slate-200">
                            <form class="grid grid-cols-12 gap-4" @submit.prevent="addUser">

                                
                                <div v-if="projects.addUserError" class="text-red-500 poppins md:col-span-8 col-span-12 px-6">
                                {{ projects.addUserError }}
                                </div>

                                <input data-focus="searchUser" @input="searchUser" type="text" :class="{'border border-red-500': projects.addUserError}" class="md:py-2 p-2 mx-2 md:col-span-8 col-span-11 outline-none dark:bg-slate-500 rounded-md w-full" v-model="search">

                                <!-- ADD BUTTON -->
                                <EditButton :disabled="projects.loading" text="Add" color="bg-green-400" position="md:col-start-11 col-start-4" size="md:col-span-2 col-span-6" additional="py-2 mx-2 md:mx-0 md:p-0"/>
                            </form>
                        </div>
                        <!-- PROPOSED USERS -->
                        <div class="col-span-12 open-sans dark:text-slate-200 text-xl z-30">
                            <div class="grid grid-cols-12 gap-4">

                                <div data-focus="searchUser" v-if="showProposed" class="md:py-2 p-2 mx-2 col-span-11 -mt-20 md:col-span-8 md:-mt-5 outline-none dark:bg-slate-500 bg-white rounded-bl-md rounded-br-md w-full">
                                    <hr/>
                                    <div data-focus="searchUser" v-for="proposed in currentProposed">
                                    <p data-focus="searchUser" class="p-2 dark:text-slate-300 text-slate-700 hover:dark:bg-slate-600 cursor-pointer"  @click="chooseProposedUser(proposed.username)">
                                        <p data-focus="searchUser" class="font-bold">
                                            {{ proposed.name }}
                                        </p>
                                        <p data-focus="searchUser" class="col-span-10 my-auto open-sans text-base">{{ proposed.username }}</p>
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <!-- USERS -->
                    <div class="col-span-12 poppins dark:text-slate-200 text-slate-700 text-2xl max-h-96">Users</div>
                    <div class="col-span-12 overflow-hidden">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="md:col-span-8 col-span-11" v-for="user in projects.currentProjectUsers" :key="user.permissions_name">
                                <p class="py-2 px-4 mx-2 col-span-8 outline-none dark:bg-slate-500 bg-white dark:text-slate-300 text-slate-700 poppins text-xl rounded-md w-full">

                                    <div class="grid grid-cols-12">
                                        <ProjectUserSettings :user="user" :project-id="projectId" @change-user-permissions="changeUserPermissions"/>
                                    </div>
                                </p>
                            </div>
                            <!-- PREVIOUSE PAGE -->
                            <div v-if="projects.pagesOfUsers.current_page > 1" class="col-start-9 col-span-2">
                                <EditButton v-if="projects.pagesOfUsers.current_page > 1" text="Previous Page" @click="previousPage()"/>
                            </div>
                            <!-- NEXT PAGE -->
                            <div v-if="projects.pagesOfUsers.current_page < projects.pagesOfUsers.last_page" class="col-start-11 col-span-2">
                                <EditButton @click="nextPage()" text="Next Page"/>
                            </div>
                        </div>
                    </div>
                        <!-- PERMISSIONS -->
                        <div class="md:col-span-8 col-span-12 poppins dark:text-slate-200 text-slate-700 text-2xl max-h-96 p-2">Permissions</div>
                            <EditButton text="Edit" @click="showPermissions" position="md:col-start-11 col-start-4" size="md:col-span-2 col-span-6" additional="py-2 mx-2 md:mx-0 md:p-0"></EditButton>

                        <div class="col-span-12 py-2">
                            <div class="grid grid-cols-12 gap-4">
                                <!-- PROJECT STATUS -->
                                <div class="md:col-span-8 col-span-12 py-2 my-auto">
                                    <div class="my-auto poppins dark:text-slate-200 text-slate-700 text-2xl">
                                        Project Status
                                    </div>
                                </div>
                                <div class="md:col-start-11 col-start-4 col-span-2">
                                    <div :class="{'bg-green-500 hover:bg-green-600': projects.projects[projectId].status == 1, 'bg-slate-500 hover:bg-slate-600': projects.projects[projectId].status == 0}" class="hover:cursor-pointer transition-all .4s w-24 h-12 rounded-full py-2" @click="changeProjectStatus()">
                                        <div :class="{'ml-14': projects.projects[projectId].status == 1, 'ml-2': projects.projects[projectId].status == 0}" class="w-8 h-8 bg-slate-300 rounded-full transition-all .4s all">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-12 py-2">
                            <div class="grid grid-cols-12 gap-4">
                                <!-- LEAVING PROJECT -->
                                <div class="md:col-span-8 col-span-12 py-2 my-auto">
                                    <div class="my-auto poppins dark:text-slate-200 text-slate-700 text-2xl">
                                        Leave Project
                                    </div>
                                </div>
                                <EditButton @click="leaveProject()" text="Leave" color="bg-red-700" position="md:col-start-11 col-start-4" size="md:col-span-2 col-span-6" additional="py-2 mx-2 md:mx-0 md:p-0 max-h-12"/>
                            </div>
                        </div>
                </div>
                <!--PERMISSIONS SETTINGS -->
                <PermissionsSettings @toggle-edit="toggleEdit" @change-permissions="changePermissions" :project-id="props.projectId"/>
            </div>
            <div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProjectStore } from '@/stores/project';
import EditButton from '@/components/buttons/EditButton.vue';
import ProjectUserSettings from './ProjectUserSettings.vue'
import PermissionsSettings from '@/components/PermissionsSettings.vue'
const projects = useProjectStore()

const props = defineProps(['editValue', 'projectId', 'projectName', 'projectStatus'])
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
    status: {
        type: Number
    },
})
const search = ref()

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
    projectSettings.value.status = props.projectStatus
    projects.showPermissions = false
    projects.deleteAddUserError()
    editName.value = editName.value ? !editName.value : editName.value
    projects.deleteLeaveErrors()
    search.value = null
    
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
            currentProposed.value = projects.proposedUsers
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
    let element = event.explicitOriginalTarget.dataset
    if(!element)
        return
    
    if(element.focus != 'searchUser' && element.focus !== "undefined")
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

function changeProjectStatus()
{
    projects.changeProjectStatus(props.projectId, projects.projects[props.projectId].status).then(() => {
    })
}

function leaveProject()
{
    projects.leaveProject(props.projectId).then((completed) => {
        if (completed)
            toggleEdit()
    })
}

function showPermissions()
{
    projects.showPermissions = !projects.showPermissions
    getCurrentPermissions()
}

function changePermissions(params)
{
    projects.changePermission(params.permission_id, params.form, props.projectId)
    getCurrentPermissions()
}

function getCurrentPermissions()
{
    projects.getCurrentProjectPermissions(props.projectId)
}

function changeUserPermissions(permission_id, project_id, user)
{
    projects.changeUserPermission(project_id, user, permission_id)
    .then(() => {
        projects.getCurrentProjectUsers(props.projectId).then(() => {
        })
    })
}

</script>