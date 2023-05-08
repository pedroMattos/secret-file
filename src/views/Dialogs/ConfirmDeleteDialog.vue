<script setup>
import {ref, defineEmits} from 'vue'

const emits = defineEmits(['confirm-delete'])

const dialog = ref(false)
function handleDelete() {
  dialog.value = false
  emits('confirm-delete')
}
</script>

<template>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon variant="text">
          <s-icon icon-name="trash-alt" />
        </v-btn>
      </template>

      <v-card>
        <v-card-text>
          Deseja apagar esse arquivo?
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="handleDelete">Apagar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>