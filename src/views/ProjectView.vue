<template>
    <div class="flex flex-col w-full h-screen bg-slate-500">
        <Navbar/>

        <main class="flex-1 max-w-5xl w-full mx-auto">
            <div class="grid grid-cols-12 h-full">
                <!-- EXTRA FREE SPACE -->
                <div class="col-span-12 h-[97px]"></div>

                <!-- TASKS CARD -->
                <div class="col-span-5 h-[66vh] bg-custom-slate-550 rounded-md overflow-hidden max-h-[66vh] drop-shadow-lg">
                    <div class="flex flex-col w-full h-full">

                        <!-- CARDS -->
                        <div class="w-full">

                            <!-- TITLE -->
                            <div class="w-full bg-green-500 poppins px-10 text-xl p-3">Tasks</div>
                            <!-- TASKS -->
                            <div class="w-full my-4 px-8 drop-shadow-md" v-for="task in taskStore.tasks">
                                <TaskCard :task="task"/>
                            </div>
                        </div>


                        <!-- ADD NEW TASK -->
                        <Transition name="fadeHeight">
                            <div class="absolute bottom-0 w-full  bg-custom-slate-450 poppins dark:text-slate-200 px-8 text-xl py-4 transition-all" :class="{'hover:scale-105': !toggleForm}">

                                <!-- ICON -->
                                <div @click="showForm" class="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline-block">
                                    <path fill-rule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 01-1.06-1.06l3.75-3.75zm-3.75 9.75a.75.75 0 011.06 0L12 17.69l3.22-3.22a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 010-1.06z" clip-rule="evenodd" />
                                    </svg>

                                    <div class="inline-block text-xl pb-2 open-sans">
                                        Create new Task
                                    </div>
                                </div>
                                <CreateTaskTab v-if="toggleForm"/>
                            </div>
                        </Transition>
                    </div>
                </div>

                <!-- EXTRA FREE SPACE -->
                <div class="col-span-12 row-span-1"></div>
            </div>
            <!-- LOADING ICON -->
            <div v-if="taskStore.loading == true" class="absolute bottom-2 right-6 w-16 h-16 border-8 border-transparent m-4 border-t-green-500 animate-spin rounded-full z-40"></div>
        </main>
        <Footer/>
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import TaskCard from '../components/TaskCard.vue'
import CreateTaskTab from '../components/CreateTaskTab.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '../stores/tasks'

const route = useRoute()
const taskStore = useTaskStore()
const toggleForm = ref(false)

onMounted(() => {
    getTasks()
})

function getTasks()
{
    //tasks.getTasks(route.params.id)
}

function showForm()
{
    toggleForm.value = !toggleForm.value
}
</script>

<style>
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.2s;
  max-height: 230px;
}
.fadeHeight-enter,
.fadeHeight-leave-to
{
  opacity: 0;
  max-height: 0px;
}
</style>