<script setup>
import checkIsValidUser from "@/composables/checkIsValidUser";
import { defineEmits } from "vue";
const emit = defineEmits(["startEdit"]);
async function handleEdit() {
  const isValid = await checkIsValidUser();

  if (isValid) emit("startEdit");
}
</script>

<template>
  <div class="edit">
    <v-btn icon variant="text" @click="handleEdit">
      <s-icon icon-name="pencil" />
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
