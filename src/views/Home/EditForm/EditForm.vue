<script setup>
import { ref, defineEmits, defineProps, reactive } from "vue";
import LockAction from "../FileActions/LockAction/LockAction.vue";
import CategoryView from "../FileActions/CategoryView/CategoryView.vue";
import * as file from "@/models/services/localFile";
import checkIsValidUser from "@/composables/checkIsValidUser";
import { uploadFile } from "@/models/services/cloud";
import useFileExtension from "@/composables/useFileExtension";

const props = defineProps({
  fileData: { type: Object },
});
const state = reactive({
  loading: false,
});
const emit = defineEmits(["cancel", "save"]);
const fileName = ref(props.fileData.name);
const content = ref(file.decryptToRead(props.fileData, "content"));
const filePass = ref(props.fileData.password);
const resetFile = ref(false);
const items = ref([
  { title: "Normal", value: "normal" },
  { title: "Confidencial", value: "classifield" },
  { title: "Secreto", value: "secret" },
]);
const category = ref(props.fileData.category);
const lockState = ref(false);
const fileUpload = ref(file.decryptToRead(props.fileData, "file"));
const fileType = ref(props.fileData.fileType);
const fileD = ref(null);
const addFile = ref(false);
function getLockState(value) {
  lockState.value = value;
}
async function handleSave() {
  const isValid = await checkIsValidUser();
  if (!isValid) return;
  state.loading = true;
  if (fileUpload.value) {
    await handleFile();
  }

  file
    .updateAllAttributes(props.fileData.id, {
      ...props.fileData,
      name: fileName.value,
      content: content.value,
      category: category.value,
      password: filePass.value,
      fileType: fileType.value,
      file: fileD.value,
    })
    .then(() => {
      emit("save");
      state.loading = false;
    });
}
function handleCancel() {
  emit("cancel");
}

async function handleFile() {
  if (!fileUpload.value) return;
  if (!resetFile.value && !addFile.value) {
    fileD.value = fileUpload.value;
    return;
  }
  const file = fileUpload.value.at(0);
  fileType.value = useFileExtension(file.name);
  fileD.value = await uploadFile(file);
}
function handleRemoveFile() {
  resetFile.value = true;
  fileUpload.value = null;
}
</script>
<template>
  <div class="form">
    <div class="actions">
      <lock-action
        @lock-unlock="getLockState"
        :allow-lock="category !== 'normal' && !filePass"
        :is-secret="category === 'secret'"
      />
      <category-view :category="category" />
    </div>
    <v-progress-circular
      v-if="state.loading"
      indeterminate
    ></v-progress-circular>
    <form v-else @submit.prevent="handleSave">
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
      <figure class="image" v-if="fileUpload && !resetFile && !addFile">
        <div v-if="fileType === 'pdf'" class="embed-container">
          <iframe :src="fileUpload" frameborder="0" width="100%"></iframe>
        </div>
        <img v-else :src="fileUpload" />
        <figcaption>
          <v-btn
            class="bg-red-darken-1"
            icon
            variant="tonal"
            width="25"
            height="25"
            @click="handleRemoveFile"
          >
            <s-icon icon-name="times-circle" icon-size="small" />
          </v-btn>
        </figcaption>
      </figure>
      <v-file-input
        v-else-if="resetFile || fileUpload || addFile"
        clearable
        label="Escolha um novo arquivo"
        prepend-icon="fa-solid fa-paperclip"
        v-model="fileUpload"
      >
      </v-file-input>
      <v-btn class="bg-blue-lighten-1" @click="addFile = true">
        Adicionar arquivo
      </v-btn>

      <v-select
        v-model="category"
        placeholder="Selecione a categoria"
        :items="items"
      ></v-select>
      <div class="actions">
        <v-btn class="bg-red-darken-1" @click="handleCancel"> Cancelar </v-btn>
        <v-btn class="bg-blue-lighten-1" type="submit"> Salvar </v-btn>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.image {
  position: relative;
  z-index: 0;
  img {
    width: 100%;
  }
  figcaption {
    display: flex;
    gap: 8px;
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 1;
  }
}
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
