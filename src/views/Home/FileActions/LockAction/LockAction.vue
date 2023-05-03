<script setup>
import { defineEmits, ref, defineProps } from 'vue';

const props = defineProps({
  allowLock: {type: Boolean, required: true}
})
const emit = defineEmits(['lockUnlock'])
const state = ref('unlock')

function toggleLock() {
  if (state.value === 'unlock') {
    state.value = 'lock'
    emit('lockUnlock', true)
    return
  }

  state.value = 'unlock'
  emit('lockUnlock', false)
}
</script>
<template>
  <div class="lock">
    <v-btn :disabled="!props.allowLock" icon variant="text" @click="toggleLock">
      <s-icon :icon-name="state === 'unlock' ? 'lock-open' : 'lock'" />
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
