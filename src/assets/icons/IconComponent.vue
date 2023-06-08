<script setup>
import { defineProps } from "vue";

defineProps({
  iconName: { type: String, required: true },
  iconType: { type: String, default: "solid" },
  iconSize: {
    type: String,
    default: "",
  },
  iconColor: { type: String },
});
</script>

<template>
  <i :class="`fa-${iconType} fa-${iconName} ${iconSize}`"></i>
</template>

<style lang="scss" scoped>
i {
  color: v-bind(iconColor);
  &.huge {
    font-size: 24px;
  }
  &.brand {
    font-size: 80px;
  }
  &.tiny {
    font-size: 8px;
  }
  &.medium {
    font-size: 20px;
  }
  &.small {
    font-size: 12px;
  }
}
</style>
