<script setup>
import getData from '@/models/services/get';
import { ref, defineEmits } from 'vue';
const emit = defineEmits(['loadFinish'])
const files = ref(null)
getData().then((filesData) => {
  files.value = filesData
  emit('loadFinish', filesData.length)
})
</script>
<template>
  <div v-for="(file, index) in files" :key="index" class="list">
    <div class="files-area">
      {{ file.name }}
    </div>
    <div class="files-area">
      {{ file.content }}
    </div>
    <div class="files-area">
      {{ file.id }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  background-color: white;
  width: 100%;
  padding: 16px;
  margin-bottom: 8px;

  .actions {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>