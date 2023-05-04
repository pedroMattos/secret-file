<script setup>
import { defineProps } from "vue";

defineProps({
  isLink: Boolean,
  text: String,
  textSize: { type: String, default: "12px" },
  textColor: { type: String, default: "black" },
  weight: { type: [String, Number], default: "400" },
});
</script>

<template>
  <div>
    <a :href="text" target="_blank" rel="noopener noreferrer" no v-if="isLink"><slot></slot></a>
    <p v-else><slot></slot></p>

  </div>
</template>

<style lang="scss" scoped>
p, a {
  color: v-bind(textColor);
  font-size: v-bind(textSize);
  font-weight: v-bind(weight);
  margin: 0;
}
</style>
