<script setup>
import decryptData from "@/composables/useDecrypt";
import { ref, defineEmits, defineProps } from "vue";
const emit = defineEmits(["cancel", "unlockFile"]);
const props = defineProps({
  pass: String,
});
const filePass = ref(null);
const message = ref(null);

function handleUnlock() {
  if (decryptData(props.pass) === filePass.value) {
    emit("unlockFile");
    return;
  }

  message.value = "Senha incorreta! Tente novamente";
}
</script>
<template>
  <div class="unlock">
    <s-text> Arquivo bloqueado por senha </s-text>
    <v-text-field
      v-model="filePass"
      autocomplete="new-password"
      type="password"
      name="file-password"
      placeholder="Defina sua senha"
      required
    ></v-text-field>

    <s-text v-if="message" class="red-darken-1">
      {{ message }}
    </s-text>
    <div class="actions">
      <v-btn class="bg-red-darken-1" @click="emit('cancel')"> Cancelar </v-btn>
      <v-btn class="bg-blue-lighten-1" @click="handleUnlock">
        Desbloquear
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  background-color: white;
  padding: 0 16px 16px;
}
.actions {
  display: flex;
  justify-content: space-evenly;
}
</style>
