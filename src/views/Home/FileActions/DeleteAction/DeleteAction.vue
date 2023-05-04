<script setup>
import * as file from '@/models/services/localFile'
import {defineEmits, defineProps} from 'vue'
const emit = defineEmits(['delete'])
const props = defineProps({
  itemId: Number
})

function handleDelete() {
  file.deleteById(props.itemId)
  emit('delete')
}
</script>
<template>
  <div class="lock">
    <v-btn @click="handleDelete" icon variant="text">
      <s-icon icon-name="trash-alt" />
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
