<template>
        <div class="grid grid-cols-12 gap-2">
            <div class="md:col-span-10 col-span-12 p-2 md:p-0">
                <p class="py-2 px-4 outline-none dark:bg-slate-500 bg-white dark:text-slate-300 text-slate-700 poppins text-base rounded-md w-full">
                    <form @submit.prevent="changePermission()">
                        <div class="grid md:grid-cols-8 grid-cols-12 break-words">

                            <div v-if="!edit" class="md:col-span-1 col-span-12 md:w-24 my-auto">
                                {{ name }}
                            </div>
                            <input v-if="edit" class="col-span-12 md:col-span-1 outline-none dark:bg-slate-500 border-b-[1px]" type="text" v-model="form.name"/>
                            <Checkmark :edit="edit" :checked="read" text="read" @toggled="changeFormRead" />
                            <Checkmark :edit="edit" :checked="write" text="write" @toggled="changeFormWrite" />
                            <Checkmark :edit="edit" :checked="updateName" text="change name" @toggled="changeFormUpdateName" />
                            <Checkmark :edit="edit" :checked="addUsers" text="add users" @toggled="changeFormAddUsers" />
                            <Checkmark :edit="edit" :checked="removeUsers" text="remove users" @toggled="changeFormRemoveUsers"/>
                            <Checkmark :edit="edit" :checked="updateStatus" text="change status" @toggled="changeFormUpdateStatus"/>
                            <Checkmark :edit="edit" :checked="updatePermissions" text="change permissions" @toggled="changeFormUpdatePermissions"/>
                        </div>
                    </form>
                </p>
            </div>
        <EditButton v-if="!edit" text="Edit" @click="changeEdit" position="md:col-start-11" size="md:col-span-1 col-span-6" additional="py-2 mx-2 md:mx-0 md:p-0"/>
        <EditButton v-if="!edit" text="X" color="bg-red-500" position="md:col-start-12 col-start-7" size="md:col-span-1 col-span-6" additional="py-2 mx-2 md:mx-0 md:p-0" @click="emitRemovePermission"/>
        <EditButton v-if="edit" text="Save" color="bg-green-500" position="md:col-start-11" size="md:col-span-1 col-span-6" additional="py-2 mx-2 md:mx-0 md:p-0" @click="changePermission"/>
        <EditButton v-if="edit" text="X" color="bg-red-500" position="md:col-start-12 col-start-7" size="md:col-span-1 col-span-6" additional="py-2 mx-2 md:mx-0 md:p-0" @click="changeEdit"/>
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