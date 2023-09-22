<template>
    <div class="col-span-2 open-sans mx-auto my-auto bg-slate-400 p-1 rounded-md max-w-24 text-center hover:bg-slate-600 cursor-pointer" @click="togglePermissions(user)">
        {{ permission_name.permissionName }}
        <!-- AVAILABLE PERMISSIONS -->
        <AvailablePermissions v-if="showAvailablePermissions" :permissions="currentPermissions" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import AvailablePermissions from './AvailablePermissions.vue';
const props = defineProps(['permissionName', 'currentPermissions'])
const permission_name = ref(props)
const showAvailablePermissions = ref(false)

function togglePermissions()
{
    showAvailablePermissions.value = !showAvailablePermissions.value
}
</script>
