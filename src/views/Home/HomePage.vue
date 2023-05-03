<script setup>
import AddNewForm from "./AddNewForm/AddNewForm.vue";
import FileList from "./FileList/FileList.vue";
import { ref } from "vue";
const hasFiles = ref(false)
const shouldAdd = ref(false)

function onLoadFinish(eventData) {
  if (!eventData) {
    hasFiles.value = false
    return
  }

  hasFiles.value = true
}
function onSave() {
  console.log('novo arquivo!')
}
</script>
<template>
  <div class="home">
    <div class="files-area">
      <AddNewForm v-if="!hasFiles || shouldAdd" @save="onSave" @cancel="shouldAdd = false" />
      <FileList @load-finish="onLoadFinish" />
      <v-btn block @click="shouldAdd = true"> Adicionar </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.files-area {
  position: absolute;
  top: 60px;
  left: 16px;
  right: 16px;
  bottom: 60px;
  background-color: #d9d9d9;
  padding: 20px 16px;
  border-radius: 4px;
}
</style>
