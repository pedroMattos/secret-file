<script setup>
import { defineProps } from "vue";

defineProps({
  isLink: Boolean,
  text: String,
  textSize: { type: String, default: "12px" },
  textColor: { type: String, default: "black" },
  weight: { type: [String, Number], default: "400" },
  allign: String,
});
</script>

<template>
  <div :class="{ 'has-link': isLink, 'secret-text': true }">
    <a :href="text" target="_blank" rel="noopener noreferrer" no v-if="isLink"
      ><slot></slot
    ></a>
    <p v-else><slot></slot></p>
  </div>
</template>

<style lang="scss" scoped>
p,
a {
  color: v-bind(textColor);
  font-size: v-bind(textSize);
  font-weight: v-bind(weight);
  text-align: v-bind(allign);
  margin: 0;
}
.has-link {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
