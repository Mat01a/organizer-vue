<template>
        <div class="grid grid-cols-12 gap-2">
            <div class="col-span-10">
                <p class="py-2 px-4 outline-none dark:bg-slate-500 text-slate-300 poppins text-base rounded-md w-full">
                    <form @submit.prevent="changePermission()">
                        <div class="md:grid md:grid-cols-8 break-words">

                            <div v-if="!edit" class="md:col-span-1 md:w-24 my-auto">
                                {{ name }}
                            </div>
                            <input v-if="edit" class="outline-none dark:bg-slate-500 border-b-[1px]" type="text" v-model="form.name"/>
                            <Checkmark :edit="edit" :checked="read" :text="read" @toggled="changeFormRead" />
                            <Checkmark :edit="edit" :checked="write" :text="write" @toggled="changeFormWrite" />
                            <Checkmark :edit="edit" :checked="updateName" :text="updateName" @toggled="changeFormUpdateName" />
                            <Checkmark :edit="edit" :checked="addUsers" :text="addUsers" @toggled="changeFormAddUsers" />
                            <Checkmark :edit="edit" :checked="removeUsers" :text="removeUsers" @toggled="changeFormRemoveUsers"/>
                            <Checkmark :edit="edit" :checked="updateStatus" :text="updateStatus" @toggled="changeFormUpdateStatus"/>
                            <Checkmark :edit="edit" :checked="updatePermissions" :text="updatePermissions" @toggled="changeFormUpdatePermissions"/>
                        </div>
                    </form>
                </p>
            </div>
        <EditButton v-if="!edit" text="Edit" @click="changeEdit" size="col-span-1"/>
        <EditButton v-if="!edit" text="X" color="bg-red-500" size="col-span-1" position="col-start-12" @click="emitRemovePermission"/>
        <EditButton v-if="edit" text="Save" color="bg-green-500" size="col-span-1" @click="changePermission"/>
        <EditButton v-if="edit" text="X" color="bg-red-500" size="col-span-1" position="col-start-12" @click="changeEdit"/>
        </div>
</template>

<script setup>
import { ref } from 'vue';
import Checkmark from './Checkmark.vue'
import { useProjectStore } from '../stores/project';
import EditButton from './buttons/EditButton.vue';

const emit = defineEmits(['removePermission', 'changePermissions'])
const props = defineProps(['id', 'name', 'permissionId', 'read', 'write', 'updateName', 'addUsers', 'removeUsers', 'updateStatus', 'updatePermissions'])
const projects = useProjectStore()
const form = ref({
    name: props.name,
    read: props.read,
    write: props.write,
    updateName: props.updateName,
    addUsers: props.addUsers,
    removeUsers: props.removeUsers,
    updateStatus: props.updateStatus,
    updatePermissions: props.updatePermissions
})
const edit = ref(false)

const changeFormRead = (param) => { form.value.read = param; console.log(form) }
const changeFormWrite = (param) => { form.value.write = param }
const changeFormUpdateName = (param) => { form.value.updateName = param }
const changeFormAddUsers = (param) => { form.value.addUsers = param }
const changeFormRemoveUsers = (param) => { form.value.removeUsers = param }
const changeFormUpdateStatus = (param) => { form.value.updateStatus = param }
const changeFormUpdatePermissions = (param) => { form.value.updatePermissions = param }

function changeEdit()
{
    edit.value = !edit.value
}

function changePermission()
{
    emit('changePermissions', {permission_id: props.permissionId, form: form})
    edit.value = !edit.value
}

function emitRemovePermission()
{
    emit('removePermission', props.permissionId)
}
</script>