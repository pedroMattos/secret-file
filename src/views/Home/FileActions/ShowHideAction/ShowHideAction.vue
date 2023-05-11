<script setup>
import { ref, defineEmits, defineProps } from "vue";
const emit = defineEmits(["show"]);
const props = defineProps({
  hide: Boolean,
  disabled: Boolean,
});
const show = ref(props.hide);

function handleShow(action) {
  show.value = action;
  emit("show", action);
}
</script>

<template>
  <div class="show-hide">
    <v-btn :disabled="disabled" icon variant="text">
      <s-icon
        v-if="!show"
        icon-name="eye"
        icon-size="medium"
        @click="() => handleShow(true)"
      />
      <s-icon
        v-else
        icon-name="eye-slash"
        icon-size="medium"
        @click="() => handleShow(false)"
      />
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
