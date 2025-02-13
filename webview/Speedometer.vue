<script lang='ts' setup>
import { ref, computed } from "vue";
import { useEvents } from '@Composables/useEvents';
import { usePlayerStats } from '@Composables/usePlayerStats';


const events = useEvents();
let gaugeSpeed = ref(0);
const maxSpeed = 240;
const arcRange = 270; // 270-degree arc
const startAngle = -135; // Ensure needle starts at -135°

const needleRotation = computed(() => startAngle + (gaugeSpeed.value / maxSpeed) * arcRange);

// Generate tick marks every 20 km/h
const ticks = Array.from({ length: maxSpeed / 20 + 1 }, (_, i) => i * 20);

// For now, it doesn't seem to have an effect on performance. Let me know if it does.
events.on('updateSpeed', () => {
  setInterval(() => {
    gaugeSpeed.value = Math.round(usePlayerStats().speed.value*3.6);
  }, 100);
});


</script>

<template>
  <!-- General positioning - check here if you wish to reposition all elements -->
  <div class="fixed bottom-32 right-4 flex items-center justify-center">
    <!-- Speedometer Dial -->
    <div class="relative w-64 h-64 rounded-full bg-gray-900 border-4 border-gray-700 flex items-center justify-center">
      <div class="absolute w-56 h-56 bg-gray-800 rounded-full"></div>

      <!-- Ticks and Labels -->
      <div class="absolute w-full h-full flex items-center justify-center">
        <div v-for="tick in ticks" :key="tick" class="absolute w-full h-full flex items-center justify-center"
          :style="{ transform: `rotate(${startAngle + (tick / maxSpeed) * arcRange}deg)` }">
          <div class="w-1 h-4 bg-white rounded absolute top-4"></div>
          <span class="text-xs text-gray-400 absolute top-10"
            :style="{ transform: `rotate(${-(startAngle + (tick / maxSpeed) * arcRange)}deg)` }">
            {{ tick }}
          </span>
        </div>
      </div>

      <!-- Needle -->
      <div class="absolute w-1 h-20 bg-red-500 origin-bottom transition-transform duration-500 ease-out"
        :style="{ transform: `rotate(${needleRotation}deg)` }"
        style="top: 18%; left: 50%; transform-origin: bottom center;">
      </div>


      <!-- Speed Display -->
      <div class="absolute bottom-4 text-white text-xl font-bold">
        {{ gaugeSpeed }} <span class="text-xs">km/h</span>
      </div>
    </div>

    <!-- Controls - for debugging purposes 
    <div class="flex space-x-4">
      <button @click="speed = Math.max(0, speed - 10)" class="px-4 py-2 bg-gray-700 text-white rounded">-</button>
      <button @click="speed = Math.min(maxSpeed, speed + 10)"
        class="px-4 py-2 bg-gray-700 text-white rounded">+</button>
    </div>
    -->
  </div>
</template>
