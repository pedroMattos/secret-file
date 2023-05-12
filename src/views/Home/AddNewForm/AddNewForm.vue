<script setup>
import { ref, defineEmits } from "vue";
import LockAction from "../FileActions/LockAction/LockAction.vue";
import CategoryView from "../FileActions/CategoryView/CategoryView.vue";
import * as file from "@/models/services/localFile";
import checkIsValidUser from "@/composables/checkIsValidUser";
import { uploadFile } from "@/models/services/cloud";
import useFileExtension from "@/composables/useFileExtension";

const emit = defineEmits(["cancel", "save"]);
const fileName = ref(null);
const content = ref(null);
const filePass = ref(null);
const fileType = ref(null);
const items = ref([
  { title: "Normal", value: "normal" },
  { title: "Confidencial", value: "classifield" },
  { title: "Secreto", value: "secret" },
]);
const category = ref("normal");
const lockState = ref(false);
const status = ref(null);
const fileUpload = ref(null);
const fileData = ref(null);
function getLockState(value) {
  lockState.value = value;
}
async function handleSave() {
  const isValid = await checkIsValidUser();
  if (!isValid) return;
  if (fileUpload.value) {
    await handleFile();
  }
  file
    .add({
      name: fileName.value,
      content: content.value,
      category: category.value,
      password: filePass.value,
      fileType: fileType.value,
      file: fileData.value,
    })
    .then(() => {
      status.value = "Adicionado com sucesso!";
      emit("save");
    });
}
function handleCancel() {
  emit("cancel");
}

async function handleFile() {
  if (!fileUpload.value) return;
  const file = fileUpload.value.at(0);
  fileType.value = useFileExtension(file.name);
  fileData.value = await uploadFile(file);
}
</script>
<template>
  <div class="form">
    <div class="actions">
      <lock-action
        @lock-unlock="getLockState"
        :allow-lock="category !== 'normal'"
        :is-secret="category === 'secret'"
      />
      <category-view :category="category" />
    </div>
    <form @submit.prevent="handleSave">
      <v-text-field
        v-model="fileName"
        placeholder="Nome"
        required
      ></v-text-field>
      <v-textarea
        v-model="content"
        autocomplete="off"
        placeholder="Conteúdo"
        required
      ></v-textarea>
      <v-text-field
        v-if="lockState"
        v-model="filePass"
        autocomplete="new-password"
        type="password"
        name="file-password"
        placeholder="Defina uma senha"
        :required="category === 'secret'"
      ></v-text-field>
      <v-file-input
        clearable
        label="Escolha um arquivo"
        prepend-icon="fa-solid fa-paperclip"
        v-model="fileUpload"
      >
      </v-file-input>
      <v-select
        v-model="category"
        placeholder="Selecione a categoria"
        :items="items"
      ></v-select>
      {{ status }}
      <div class="actions">
        <v-btn class="bg-red-darken-1" @click="handleCancel"> Cancelar </v-btn>
        <v-btn class="bg-blue-lighten-1" type="submit"> Salvar </v-btn>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form {
  background-color: white;
  min-height: 320px;
  width: 100%;
  padding: 16px;
  margin-bottom: 8px;
  border-right: 6px solid grey;

  .actions {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
