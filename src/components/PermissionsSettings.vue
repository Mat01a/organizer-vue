<template>
    <!-- PERMISSIONS SETTINGS -->
    <div v-if="projects.showPermissions == true" class="grid grid-cols-12 gap-4">
        <div class="col-start-1 col-span-11 text-slate-200 poppins mx-2 text-xl">
            <BackButton class="float-left"/>
            <div class="flex h-full items-center">
                Settings
            </div>
        </div>
            
        <button class="col-start-12 col-span-1 dark:bg-slate-500 hover:dark:bg-yellow-400 hover:text-slate-800 text-slate-200 poppins z-30 opacity-100 rounded-md" @click="$emit('toggleEdit')"> X</button>
        <hr class=" col-span-12 border border-slate-500"/>
        
        <!-- ADD PERMISSIONS -->
        <div class="col-span-12 poppins dark:text-slate-200 text-2xl">Add Permission</div>
        <div class="col-span-12 open-sans text-xl dark:text-slate-200">
            <form class="grid grid-cols-12" @submit.prevent="addPermission">

                <input type="text" class="py-2 px-4 mx-2 col-span-8 outline-none dark:bg-slate-500 rounded-md w-full" v-model="form.name">

                <!-- ADD BUTTON -->
                <EditButton :disabled="projects.loading" text="Add" color="bg-green-400"/>
            </form>
        </div>
        <div class="col-span-12 poppins dark:text-slate-200 text-2xl p-2 float-left">
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-10">
                    <p class="py-2 px-4 mx-2 col-span-8 text-slate-300 poppins text-base rounded-md w-full">
                        <div class="md:flex">
                            <div class="md:flex-1">Settings</div>        
                            <div class="md:flex-1 text-base open-sans my-auto w-full text-center">Read</div>
                            <div class="md:flex-1 text-base open-sans my-auto w-full text-center">Write</div>
                            <div class="md:flex-1 text-base open-sans my-auto w-full text-center">Change Name</div>
                            <div class="md:flex-1 text-base open-sans my-auto w-full text-center">Add Users</div>
                            <div class="md:flex-1 text-base open-sans my-auto w-full text-center">Remove Users</div>
                            <div class="md:flex-1 text-base open-sans my-auto w-full text-center">Change Status</div>
                            <div class="md:flex-1 text-base open-sans my-auto w-full text-center">Change Permissions</div>
                        </div>  
                    </p>
                </div>
            </div>
            <div class="col-span-12 overflow-hidden">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12" v-for="(permission, id) in projects.currentProjectPermissions.data">
                        <!-- PERMISSION -->
                        <PermissionTab :id="id" :permission-id="permission.id" :name="permission.name" :read="permission.read" :write="permission.write" :update-name="permission.updateName" :add-users="permission.addUsers" :remove-users="permission.removeUsers" :update-status="permission.updateStatus" :update-permissions="permission.updatePermissions" @remove-permission="removePermission" @change-permissions="emitChangePermissions"/>
                    </div>

                    <!-- PREVIOUS PAGE -->
                    <EditButton v-if="projects.currentProjectPermissions.current_page > 1" :disabled="projects.loading" text="Previous Page" position="col-start-9" @click="previousPage"/>

                    <!-- NEXT PAGE-->
                    <EditButton v-if="projects.currentProjectPermissions.current_page < projects.currentProjectPermissions.last_page" :disabled="projects.loading" text="Next Page" additional="p-1" @click="nextPage"/>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useProjectStore } from '../stores/project';
import BackButton from './buttons/BackButton.vue';
import PermissionTab from './PermissionTab.vue';
import EditButton from './buttons/EditButton.vue';

const emit = defineEmits(['toggleEdit', 'changePermissions'])
const props = defineProps(['projectId'])
const projects = useProjectStore()
const form = ref({
    name: null
})

function addPermission()
{
    projects.addNewPermissin(props.projectId, form.value.name).then(() => {
        form.value.name = null
    })
}

function removePermission(permission_id)
{
    projects.removePermission(props.projectId, permission_id)
}

function nextPage()
{
    projects.nextPermissionsPage(props.projectId)
}

function previousPage()
{
    projects.previousPermissionsPage(props.projectId)
}
function emitChangePermissions(params)
{
    emit('changePermissions', params)
}

</script>