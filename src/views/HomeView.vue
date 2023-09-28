<script setup>
import API from '../axios'
import instance from '../axios'
import { onMounted, ref } from 'vue'
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

</script>

<template>
  <div class="flex flex-col w-full md:h-screen dark:bg-slate-500 bg-slate-100">
    <Navbar/>

    <main class="flex-1 max-w-5xl w-full mx-auto">
      <div class="text-center text-green-500 transiton-all pt-10">
        <div class="md:text-7xl text-5xl poppins">
         Organizer
        </div>
        <div class="text-center text-3xl open-sans dark:text-slate-300 text-slate-700 p-2">Manage your tasks quicker.</div>
      </div>

      <!-- content -->
      <div class="grid md:grid-cols-10 grid-cols-5 h-5/6 md:py-0 pt-20 pb-16">


        <!-- left bar-->
        <div class="col-span-5 md:col-span-4">
          <div class="grid place-items-center h-full">
            <div>
                <div class="text-3xl dark:text-slate-200 text-slate-700 poppins">Easy to work with</div>
                <div class="text-xl dark:text-slate-200 text-slate-700">Track your progress with ease</div>
                <div class="text-slate-200 text-2xl poppins bg-green-500 hover:bg-yellow-400 text-center p-2 mx-auto my-2 transition-all w-fit hover:scale-105">
                  <RouterLink :to="{name: 'register'}" class="">
                    Try out organizer
                  </RouterLink>
                </div>
            </div>
          </div>
        </div>

        
        <!-- right bar-->
        <div class="md:col-span-6 col-span-5 pt-10 md:pt-0">
          <div class="grid place-items-center h-full">
            <div class="md:w-[calc(32rem)] w-4/5 dark:bg-slate-700 bg-white rounded-xl drop-shadow-lg md:h-[calc(24rem)] h-full">
              <div class="grid grid-cols-2 h-full">
                <!-- left -->
                <div class="col-span-1 ml-6 mr-6 mt-10 md:mb-10 pb-5">
                  <div class="w-full h-20 dark:bg-slate-800 bg-slate-100 rounded-lg p-3">
                    <div class="md:w-24 w-12 h-3 bg-green-500 rounded-md"></div>
                    <div class="md:w-16 w-16 h-3 dark:bg-slate-500 bg-slate-300 rounded-md mt-2"></div>
                    <div class="md:w-20 w-14 h-3 dark:bg-slate-500 bg-slate-300 rounded-md mt-2"></div>
                  </div>

                  <div class="w-full h-20 dark:bg-slate-800 bg-slate-100 rounded-lg p-3 md:mt-4 mt-3">
                    <div class="md:w-16 w-8 h-3 bg-green-500 rounded-md"></div>
                    <div class="md:w-28 w-16 h-3 dark:bg-slate-500 bg-slate-300 rounded-md mt-2"></div>
                    <div class="md:w-32 w-16 h-3 dark:bg-slate-500 bg-slate-300 rounded-md mt-2"></div>
                  </div>

                  <div class="w-full h-20 dark:bg-slate-800 bg-slate-100 rounded-lg p-3 md:mt-4 mt-3">
                    <div class="md:w-24 w-12 h-3 bg-green-500 rounded-md"></div>
                    <div class="md:w-28 w-16 h-3 dark:bg-slate-500 bg-slate-300 rounded-md mt-2"></div>
                    <div class="md:w-20 w-8 h-3 dark:bg-slate-500 bg-slate-300 rounded-md mt-2"></div>
                  </div>
                </div>

                <!-- right -->
                <div class="col-span-1">
                  <div class="md:m-10 my-10">
                    <div class="h-32 w-32 dark:bg-slate-800 bg-slate-100 rounded-lg flex items-center">
                      <div class="w-4/5 h-4/5 mx-auto bg-green-500 rounded-full flex items-center">
                        <div class="w-3/5 h-3/5 mx-auto dark:bg-slate-800 bg-slate-100 rounded-full"></div>
                      </div>
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
