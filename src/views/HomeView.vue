<script setup>
import API from '../axios'
import instance from '../axios'
import { onMounted, ref } from 'vue'
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

</script>

<template>
  <div class="flex flex-col w-full h-screen bg-slate-500">
    <Navbar/>

    <main class="flex-1 max-w-5xl w-full mx-auto">
      <div class="text-center text-green-500 transiton-all pt-6">
        <div class="text-7xl poppins">
         Organizer
        </div>
        <div class="text-center text-3xl open-sans text-slate-300">Manage your tasks quicker.</div>
      </div>

      <!-- content -->
      <div class="grid grid-cols-10 h-5/6">


        <!-- left bar-->
        <div class="col-span-4">
          <div class="grid place-items-center h-full">
            <div>
                <div class="text-3xl text-slate-200 poppins">Easy to work with</div>
                <div class="text-xl text-slate-200">Track your progress with ease</div>
                <div class="text-slate-200 text-2xl poppins bg-green-500 hover:bg-yellow-400 text-center p-2 mx-auto my-2 transition-all w-fit hover:scale-105">
                  <RouterLink :to="{name: 'register'}" class="">
                    Try out organizer
                  </RouterLink>
                </div>
            </div>
          </div>
        </div>

        
        <!-- right bar-->
        <div class="col-span-6">
          <div class="grid place-items-center h-full">
            <div class="w-[calc(32rem)] bg-slate-700 rounded-xl drop-shadow-lg h-[calc(24rem)]">
              <div class="grid grid-cols-2 h-full">
                <!-- left -->
                <div class="col-span-1 ml-6 mr-6 mt-10 mb-10">
                  <div class="w-full h-20 bg-slate-800 rounded-lg p-3">
                    <div class="w-24 h-3 bg-green-500 rounded-md"></div>
                    <div class="w-16 h-3 bg-slate-500 rounded-md mt-2"></div>
                    <div class="w-20 h-3 bg-slate-500 rounded-md mt-2"></div>
                  </div>

                  <div class="w-full h-20 bg-slate-800 rounded-lg p-3 mt-4">
                    <div class="w-16 h-3 bg-green-500 rounded-md"></div>
                    <div class="w-28 h-3 bg-slate-500 rounded-md mt-2"></div>
                    <div class="w-32 h-3 bg-slate-500 rounded-md mt-2"></div>
                  </div>

                  <div class="w-full h-20 bg-slate-800 rounded-lg p-3 mt-4">
                    <div class="w-24 h-3 bg-green-500 rounded-md"></div>
                    <div class="w-28 h-3 bg-slate-500 rounded-md mt-2"></div>
                    <div class="w-20 h-3 bg-slate-500 rounded-md mt-2"></div>
                  </div>
                </div>

                <!-- right -->
                <div class="col-span-1">
                  <div class="m-10">
                    <div class="h-32 w-32 bg-slate-800 rounded-lg">
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>

    </main>
    <Footer/>
  </div>
</template>
