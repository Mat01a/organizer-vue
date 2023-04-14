<script setup>
import instance from '../axios'
import { onMounted, ref } from 'vue'
import Navbar from '../components/Navbar.vue';

const message = ref(null)

async function getData() {
  const data = await instance.get('test')
  const processedData = data.data
  message.value = ref(processedData)
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="w-full h-screen bg-slate-500">
    <Navbar/>
  </div>
</template>
