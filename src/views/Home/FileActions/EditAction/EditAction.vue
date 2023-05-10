<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["startEdit"]);
</script>

<template>
  <div class="edit">
    <v-btn icon variant="text" @click="emit('startEdit')">
      <s-icon icon-name="pencil" />
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
