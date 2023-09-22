<template>
    <div class="w-full h-full mx-auto text-center py-4 text-green-500">
        <form @submit.prevent="onSubmit">
            <input type="text" v-model="form.name" class="bg-inherit text-slate-200 outline-none open-sans" placeholder="Create a new project">
        </form>
        <div class="w-11/12 my-2 mx-auto h-1 bg-green-500">
            <div class="py-1 text-red-400">
                {{ form_errors }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProjectStore } from '../stores/project';
import { ref } from 'vue'

const projectStore = useProjectStore()
const form = ref({
    'name': null
})

const form_errors = ref()

async function onSubmit()
{
    await projectStore.createProject(form).then(() => {
        form_errors.value = null
        form.value.name = null
    })
    if(projectStore.messageErrors.length > 0)
    {
        form_errors.value = projectStore.messageErrors[0]
    }
}
</script>
