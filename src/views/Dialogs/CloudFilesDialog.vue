<script setup>
import { ref, defineEmits, defineProps, toRaw } from "vue";
import { useStore } from "vuex";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.vue";
import * as local from "@/models/services/localFile";
import * as cloud from "@/models/services/cloud";
import checkIsValidUser from "@/composables/checkIsValidUser";

const store = useStore();
const emits = defineEmits(["refetch"]);
const prop = defineProps({
  cloudItems: Array,
});
const dialog = ref(false);
const items = ref(prop.cloudItems);

function handleClose() {
  dialog.value = false;
  emits("confirm-close");
  dialog.value = false;
}

async function handleDelete(itemId) {
  const isValid = await checkIsValidUser();
  if (isValid) {
    cloud.deleteFile(itemId);
    store.commit("refetchCloudItems", true);
  }
}

async function createFile(cloudItem) {
  const isValid = await checkIsValidUser();

  if (isValid) {
    const cloud = toRaw(cloudItem);
    local.createFileByCloudFile(cloud).then(() => {
      dialog.value = false;
      store.commit("refetchCloudItems", true);
      emits("refetch");
    });
  }
}

async function handleViewClick() {
  await checkIsValidUser();
}
</script>

<template>
  <v-dialog v-model="dialog" width="auto">
    <template v-slot:activator="{ props }">
      <v-btn
        class="text-blue-lighten-5"
        @click="handleViewClick"
        v-bind="props"
        variant="text"
      >
        Visualizar
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <div v-for="(cloudItem, index) in items" :key="index">
          <div class="file">
            <s-text>{{ cloudItem.name }}</s-text>
            <div>
              <v-btn
                variant="text"
                icon
                @click="() => createFile(cloudItem, index)"
              >
                <s-icon icon-name="cloud-arrow-down" />
              </v-btn>
              <confirm-delete-dialog
                @confirm-delete="handleDelete(cloudItem.id)"
              />
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue-darken-3" @click="handleClose">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.file {
  display: flex;
  height: 40px;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  .v-btn {
    height: 30px;
    width: 30px;
  }
}
.v-card {
  width: 300px;
}
</style>
