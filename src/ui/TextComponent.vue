<script setup>
import { defineProps } from "vue";

defineProps({
  text: { type: [String, Number], required: true },
  textSize: { type: String, default: "12px" },
  textColor: { type: String, default: "black" },
  weight: { type: [String, Number], default: "400" },
});
</script>

<template>
  <p><slot></slot></p>
</template>

<style lang="scss" scoped>
p {
  color: v-bind(textColor);
  font-size: v-bind(textSize);
  font-weight: v-bind(weight);
  margin: 0;
}
</style>
