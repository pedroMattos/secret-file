<script setup>
import { defineEmits, ref, defineProps, watch, computed } from 'vue';

const props = defineProps({
  allowLock: {type: Boolean, required: true},
  isSecret: Boolean
})
const secret = computed(() =>{
  return props.isSecret
})
const emit = defineEmits(['lockUnlock'])
const state = ref('unlock')

watch(secret, (value) => {
  if (value) {
    state.value = 'lock'
    emit('lockUnlock', true)
    return
  }
  state.value = 'unlock'
  emit('lockUnlock', false)
})

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
    <v-btn :disabled="!props.allowLock || isSecret" icon variant="text" @click="toggleLock">
      <s-icon :icon-name="state === 'unlock' ? 'lock-open' : 'lock'" />
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
