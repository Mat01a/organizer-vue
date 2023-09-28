<template>
    <div class="flex flex-col w-full md:h-screen dark:bg-slate-500 bg-slate-100">
        <Navbar/>

        <main class="flex-1 max-w-5xl w-full mx-auto">
            <div class="grid grid-cols-12 h-full">
                <!-- EXTRA FREE SPACE -->
                <div class="col-span-12 h-[97px]"></div>

                <!-- TASKS CARD -->
                <div class="md:col-span-5 col-span-10 col-start-2 md:col-start-1 h-[66vh] dark:bg-custom-slate-550 bg-white rounded-md overflow-hidden max-h-[66vh] drop-shadow-lg">
                    <div class="flex flex-col w-full h-full">

                        <!-- CARDS -->
                        <div class="w-full overflow-scroll hide-scroll" @scroll="customScroll">

                            <!-- TITLE -->
                            <div class="w-full bg-green-500 dark:text-slate-800 text-white poppins px-10 text-xl p-3 md:fixed rounded-t-md z-40">Tasks</div>
                            <!-- TASKS -->
                            <div class="md:py-12 sm:pb-12 sm:h-96 md:h-auto">
                                <div class="w-full my-4 px-8 drop-shadow-md text-slate-700" v-for="task in taskStore.tasks" :key="task.status" v-if="taskStore.tasks">
                                    <TaskCard :task="task" @remove="remove"/>
                                </div>
                            </div>
                        </div>


                        <!-- ADD NEW TASK -->
                        <TransitionGroup name="fadeHeight">
                            <div class="md:absolute bottom-0 w-full  dark:bg-custom-slate-450 bg-slate-100 poppins dark:text-slate-200 px-8 text-xl py-4 transition-all" :class="{'hover:scale-105': !toggleForm}">

                            <!-- ICON -->
                            <div @click="showForm" class="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline-block">
                                <path fill-rule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 01-1.06-1.06l3.75-3.75zm-3.75 9.75a.75.75 0 011.06 0L12 17.69l3.22-3.22a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 010-1.06z" clip-rule="evenodd" />
                                </svg>

                                <div class="inline-block text-xl pb-2 open-sans">
                                    Create new Task
                                </div>
                            </div>
                                <CreateTaskTab v-if="toggleForm" @create-task="create"/>
                            </div>
                        </TransitionGroup>
                    </div>
                </div>

                <!-- CHART -->
                <div class="md:col-start-7 md:col-span-5 col-span-10 col-start-2 my-8 h-[45vh] p-4 dark:bg-custom-slate-550 bg-white rounded-xl drop-shadow-lg">
                    <DoughnutChart :data="doughnutData"/>
                </div>

                <!-- EXTRA FREE SPACE -->
                <div class="col-span-12 row-span-1"></div>
            </div>
            <!-- LOADING ICON -->
            <div v-if="taskStore.loading == true" class="absolute bottom-2 right-6 w-16 h-16 border-8 border-transparent m-4 border-t-green-500 animate-spin rounded-full z-40"></div>

            <!-- ERROR TAB -->
            <Transition name="fadeHeight" class="overflow-hidden">
                <div v-if="taskStore.error == true" class="absolute bottom-2 right-6 bg-red-600 h-24 w-60 rounded-md poppins text-xl dark:text-gray-200 text-white p-2">
                    {{ taskStore.errorMessage }}
                </div>
            </Transition>

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
import DoughnutChart from '../components/DoughnutChart.vue'

const route = useRoute()
const taskStore = useTaskStore()
const toggleForm = ref(false)
const doughnutData = ref({
    completed: 0,
    notCompleted: 0,
})

onMounted(() => {
    getTasks()
})

function getTasks()
{
    taskStore.index(route.params.id)
    .then(() => {
        doughnutData.value.completed = taskStore.getCompleted
        doughnutData.value.notCompleted = taskStore.getNotCompleted
    })
}

function showForm()
{
    toggleForm.value = !toggleForm.value
}

function create(form)
{
    taskStore.create(route.params.id, form.name, form.description)
    getTasks()
}

function remove(id)
{
    taskStore.remove(id)
    getTasks()
}
</script>