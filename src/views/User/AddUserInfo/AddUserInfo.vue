<script setup>
import {ref, defineEmits} from 'vue'
import * as userManagement from '@/models/services/userManagement'
const emit = defineEmits(['save'])
const userName = ref(null)

function handleSave () {
  userManagement.updateUserData({displayName: userName.value})
  emit('save')
}
</script>
<template>
  <div class="add-user-info">
    <v-text-field
      v-model="userName"
      placeholder="Nome de usuário"
      required
      ></v-text-field>
      <v-btn :disabled="!userName" @click="handleSave" class="bg-blue-lighten-1"> Salvar nome </v-btn>
  </div>
</template>