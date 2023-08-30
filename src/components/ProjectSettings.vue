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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProjectStore } from '../stores/project';
const projects = useProjectStore()

const props = defineProps({
    editValue: Boolean,
    projectId: Number,
    projectName: String,
})


const emit = defineEmits(['toggle-Edit', 'change-name'])


const editName = ref(false)
const edit = ref(false)


const projectSettings = ref({
    id: {
        type: Number
    },
    name: {
        type: String
    }
})

function changeName()
{
    editName.value = !editName.value
    emit("change-name", {id: projectSettings.value.id, name: projectSettings.value.name})
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


</script>
