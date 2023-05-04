<script setup>
import { ref, defineEmits } from "vue";
import LockAction from "../FileActions/LockAction/LockAction.vue";
import DeleteAction from "../FileActions/DeleteAction/DeleteAction.vue";
import CategoryView from "../FileActions/CategoryView/CategoryView.vue";
import * as file from "@/models/services/localFile";

const emit = defineEmits(['cancel', 'save'])
const name = ref(null);
const content = ref(null);
const password = ref(null);
const items = ref([
  { title: "Normal", value: "normal" },
  { title: "Confidencial", value: "classifield" },
  { title: "Secreto", value: "secret" },
]);
const category = ref('normal');
const lockState = ref(false)
const status = ref(null)
function getLockState(value) {
  lockState.value = value
}
function handleSave() {
  file.add({ name: name.value, content: content.value, category: category.value })
  status.value = 'Adicionado com sucesso!'
  emit('save')
}
</script>
<template>
  <div class="form">
    <div class="actions">
      <lock-action @lock-unlock="getLockState" :allow-lock="category !== 'normal'" />
      <category-view :category="category" />
      <delete-action />
    </div>
    <v-text-field
      v-model="name"
      autocomplete="off"
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
      v-model="password"
      autocomplete="off"
      type="password"
      placeholder="Defina uma senha"
      required
    ></v-text-field>
    <v-select
      v-model="category"
      placeholder="Selecione a categoria"
      :items="items"
    ></v-select>
    {{ status }}
    <div class="actions">
      <v-btn class="bg-red-darken-1" @click="emit('cancel')"> Cancelar </v-btn>
      <v-btn class="bg-blue-lighten-1" @click="handleSave"> Salvar </v-btn>
    </div>
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
