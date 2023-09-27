<template>
    <div>
        <canvas ref="root"></canvas>
    </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { onMounted, onUpdated, ref, watch } from 'vue';
import { useTaskStore } from '../stores/tasks';

const props = defineProps(['data'])
const taskStore = useTaskStore()
const root = ref(null)
let chart = null
onMounted(() => {
    chart = new Chart(root.value, {
    type: 'doughnut',
    data: {
        labels: ['Completed', 'Not Completed'],
        datasets: [{
        labels: ['Completed', 'Not Completed'],
        data: [],
        borderWidth: 0,
        backgroundColor: ['#22C55E', '#FFFFFF'],
        }]
    },
    options: {
        scales: {

        }
    }
    });
})

watch(() => [taskStore.getCompleted, taskStore.getNotCompleted], () => {
    chart.data.datasets[0].data[0] = taskStore.getCompleted
    chart.data.datasets[0].data[1] = taskStore.getNotCompleted
    chart.update()
})
</script>
