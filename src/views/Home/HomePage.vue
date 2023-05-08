<script setup>
import checkIsValidUser from "@/composables/checkIsValidUser";
import AddNewForm from "./AddNewForm/AddNewForm.vue";
import FileList from "./FileList/FileList.vue";
import { ref, onBeforeMount } from "vue";
import BottomBar from "../BottomBar/BottomBar.vue";

onBeforeMount(() => {
  checkIsValidUser();
});
const hasFiles = ref(false);
const shouldAdd = ref(false);
const reFetch = ref(false);

function onLoadFinish(eventData) {
  if (!eventData) {
    hasFiles.value = false;
    return;
  }

  reFetch.value = false;
  hasFiles.value = true;
}
function onSave() {
  console.log("novo arquivo!");
  reFetch.value = true;
  shouldAdd.value = false;
}

async function handleAdd() {
  const isValid = await checkIsValidUser();
  if (isValid) {
    shouldAdd.value = true;
  }
}

</script>
<template>
  <div class="home">
    <div class="files-area">
      <AddNewForm
        v-if="!hasFiles || shouldAdd"
        @save="onSave"
        @cancel="shouldAdd = false"
      />
      <FileList @load-finish="onLoadFinish" :re-fetch="reFetch" />
      <v-btn block @click="handleAdd"> Adicionar </v-btn>
    </div>
    <BottomBar />
  </div>
</template>

<style lang="scss" scoped>
.logout {
  position: absolute;
  bottom: 5px;
    right: 16px;
}
.files-area {
  position: absolute;
  top: 60px;
  left: 16px;
  right: 16px;
  bottom: 60px;
  background-color: #d9d9d9;
  padding: 20px 16px;
  border-radius: 4px;
  max-height: 800px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
}
</style>
