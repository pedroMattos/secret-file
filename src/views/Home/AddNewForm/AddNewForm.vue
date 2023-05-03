<script setup>
import { ref } from "vue";
import LockAction from "../FileActions/LockAction/LockAction.vue";
import DeleteAction from "../FileActions/DeleteAction/DeleteAction.vue";
import CategoryView from "../FileActions/CategoryView/CategoryView.vue";

const name = ref(null);
const content = ref(null);
const items = ref([
  { title: "Normal", value: "normal" },
  { title: "Confidencial", value: "classifield" },
  { title: "Secreto", value: "secret" },
]);
</script>
<template>
  <div class="form">
    <lock-action />
    <delete-action />
    <category-view />
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
    <v-select placeholder="Selecione a categoria" :items="items"></v-select>

    <div class="actions">
      <v-btn class="bg-red-darken-1"> Cancelar </v-btn>
      <v-btn class="bg-blue-lighten-1"> Salvar </v-btn>
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
  border-right: 3px solid grey;

  .actions {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
