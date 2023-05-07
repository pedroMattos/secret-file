<script setup>
import {ref} from 'vue'

const dialog = ref(false)
</script>

<template>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" @click="handleDelete" icon variant="text">
          <s-icon icon-name="trash-alt" />
        </v-btn>
      </template>

      <v-card>
        <v-card-text>
          Deseja apagar esse arquivo?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="dialog = false">Apagar</v-btn>
          <v-btn color="secondary" @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>