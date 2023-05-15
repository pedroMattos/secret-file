<script setup>
import checkIsValidUser from "@/composables/checkIsValidUser";
import AddNewForm from "./AddNewForm/AddNewForm.vue";
import FileList from "./FileList/FileList.vue";
import { ref, onBeforeMount, computed, toRaw } from "vue";
import BottomBar from "../BottomBar/BottomBar.vue";
import * as file from "@/models/services/localFile";
import { makeLocalFileUniqueByUser } from "@/models/services/localFile";
import { useCloudBakcup } from "@/composables/useCloudBackup";
import LoadCloudItems from "./LoadCloudItems/LoadCloudItems.vue";
const hasFiles = ref(false);
const shouldAdd = ref(false);
const reFetch = ref(false);
const { filesInLocal, filesInCloud } = useCloudBakcup();
onBeforeMount(() => {
  checkIsValidUser();
  makeLocalFileUniqueByUser();
});

const cloudFilesNotInLocal = computed(() => {
  const local = toRaw(filesInLocal.value);
  const cloud = toRaw(filesInCloud.value);

  return cloud.files?.filter(
    (localItem) =>
      !local?.some(
        (cloudItem) =>
          (cloudItem.id === localItem.id && !localItem.inCloud) ||
          cloudItem.id === localItem.cloudId
      )
  );
});

function onLoadFinish(eventData) {
  if (!eventData) {
    hasFiles.value = false;
    return;
  }

  reFetch.value = false;
  hasFiles.value = true;
}
function onSave() {
  reFetch.value = true;
  shouldAdd.value = false;
}

async function handleAdd() {
  const isValid = await checkIsValidUser();
  if (isValid) {
    shouldAdd.value = true;
  }
}
function syncAll() {
  file.syncAll().then(() => {
    refetch();
  });
}

function refetch() {
  reFetch.value = true;

  setTimeout(() => {
    reFetch.value = false;
  }, 500);
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
      <LoadCloudItems
        @refetch="refetch"
        v-if="cloudFilesNotInLocal"
        :items-in-cloud="cloudFilesNotInLocal"
      />
      <FileList @load-finish="onLoadFinish" :re-fetch="reFetch" />
    </div>
    <BottomBar @add="handleAdd" @sync-all="syncAll" />
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
