<template>
    <!-- PERMISSIONS SETTINGS -->
    <div class="mx-auto h-min pr-2 bg-slate-400 z-40">
        <EditButton text="<" color="bg-green-500" additional="p-2 w-10" @click="projects.showPermissions = false"/>
    </div>
</template>

<script setup>
import EditButton from './EditButton.vue';
import { useProjectStore } from '../../stores/project';
const projects = useProjectStore()
</script>