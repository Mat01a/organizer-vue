<template>
    <div class="w-full max-w-4xl mx-auto h-20 rounded-lg mt-4 drop-shadow-md" style="background-color: #7D91AD;">

        <div class="grid grid-cols-12 w-full">
            <!-- Icon -->
            <RouterLink v-if="props.id" :to="'project/' + props.id" class="col-span-2 h-full">
                <div class="h-20 w-full float-left flex">
                    <div :class="{'bg-orange-300': status == 0, 'bg-green-500': status == 1}" class="rounded-full w-10 h-10 m-auto inline"></div>
                </div>
            </RouterLink>

            <!-- Name -->
            <RouterLink v-if="props.id" :to="'project/' + props.id" class="block col-start-3 col-span-7 text-left text-lg my-auto poppins text-slate-100">
                {{ name }}
            </RouterLink>

            <!-- Buttons -->
            <SettingsButton :hovered="isHovered" @click="toggleEdit(true)"/>

        </div>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import SettingsButton from './buttons/SettingsButton.vue';

const props = defineProps({
    id: {
        type: Number
    },
    status: {
        type: Number
    },
    name: {
        type: String
    }
})

const edit = ref(false)
var isHovered = ref(false)

const emit = defineEmits(['toggle-Edit'])
function toggleEdit(mode)
{
    emit('toggle-Edit')
    edit.value = mode
}
</script>
