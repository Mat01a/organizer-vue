<template>
    <div class="md:col-span-7 col-span-12 my-auto">
        {{ user.name }}
        <p class="my-auto open-sans text-base">{{ user.username }}</p>
    </div>
    <div class="col-span-2 open-sans mx-auto my-auto dark:bg-slate-400 bg-slate-200 p-1 rounded-md text-center">
        {{ user.permissions_name }}
    </div>
    <div class="col-span-2 col-start-10 p-1 my-auto">
        <!-- USER SETTINGS -->
        <SettingsButton background="dark:bg-slate-400 bg-slate-300"  @click="showAvailablePermissions()"/>
    </div>
    <!-- USER PERMISSIONS -->
    <div v-if="userPermissions" class="absolute dark:bg-slate-700 bg-slate-400 md:w-96 md:h-96 w-4/5 h-min p-2 md:p-0 mx-auto left-0 right-0 md:left-auto md:right-auto rounded-md z-50">
        <div class="grid grid-cols-12 p-2">
            <div class="col-span-8 w-full px-3">
                Permissions
            </div>
            <!-- CLOSE -->
            <EditButton text="X" color="bg-transparent" @click="showAvailablePermissions"/>
            <div class="col-start-2 col-span-10 h-[1px] border-t-[1px] dark:border-custom-slate-450 p-1"></div>
            <div class="col-span-12">
                <div class="grid grid-cols-12">
                    <!-- USER -->
                    <div class="col-span-12 dark:bg-slate-500 bg-white hover:bg-slate-600 cursor-pointer m-2 py-1 px-4 rounded-md" @click="changeUserPermission(current.id)" v-for="current in projects.currentProjectPermissions.data">
                        {{ current.name }}
                    </div>
                    <!-- PREVIOUS PAGE -->
                    <EditButton v-if="projects.currentProjectPermissions.current_page > 1" text="Previous Page" additional="px-2 w-min" position="col-start-5" @click="previousPermissionsPage"/>
                    <!-- NEXT PAGE -->
                    <EditButton v-if="projects.currentProjectPermissions.current_page < projects.currentProjectPermissions.last_page" text="Next Page" additional="px-2 w-min" position="col-start-10" @click="nextPermissionsPage"/>
                </div>
            </div>
            <div class="col-start-2 col-span-10 h-[1px] mt-2 border-t-[1px] border-custom-slate-450 p-1"></div>
            <div class="px-3 col-span-8">
                Remove User
            </div>
            <!-- REMOVE USER -->
            <EditButton text="X" color="bg-red-500" position="col-start-10" @click="removeUser(user.username)"/>
            <div class="col-start-2 col-span-10 h-[2px] border-b-[1px] border-custom-slate-450 p-1"></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import SettingsButton from './buttons/SettingsButton.vue';
import EditButton from './buttons/EditButton.vue';
import { useProjectStore } from '../stores/project';

const props = defineProps(['user', 'projectId'])
const emit = defineEmits(['changeUserPermissions'])
const user = ref(props.user)
const userPermissions = ref(false)
const projects = useProjectStore()
const testArray = ref(['abcs', 'acvb', 'acvb', 'acvb', 'acvb'])
onMounted(() => {
    getCurrentPermissions()
})
function showAvailablePermissions()
{
    userPermissions.value = !userPermissions.value
}

function getCurrentPermissions()
{
    projects.getCurrentProjectPermissions(props.projectId)
}

function changeUserPermission(permission_id)
{
    emit('changeUserPermissions', permission_id, props.projectId, user.value.username)
}

function nextPermissionsPage()
{
    projects.nextPermissionsPage(props.projectId)
}

function previousPermissionsPage()
{
    projects.previousPermissionsPage(props.projectId)
}

function removeUser(username)
{
    projects.removeUserFromProject(props.projectId, username)
    projects.getCurrentProjectUsers(props.projectId)
}
</script>
