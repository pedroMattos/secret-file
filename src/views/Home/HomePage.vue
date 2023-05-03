<script setup>
import AddNewForm from "./AddNewForm/AddNewForm.vue";
</script>
<template>
  <div class="home">
    <div class="files-area">
      <AddNewForm />
      <v-btn block> Adicionar </v-btn>
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
