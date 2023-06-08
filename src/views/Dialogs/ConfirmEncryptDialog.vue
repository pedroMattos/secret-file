<script setup>
import { ref, defineEmits, defineProps } from "vue";

const emits = defineEmits(["confirm-encrypt"]);
const componentProps = defineProps({
  isProtected: Boolean,
});

const dialog = ref(false);
function handleEncrypt() {
  dialog.value = false;
  emits("confirm-encrypt");
}
</script>

<template>
  <v-dialog v-model="dialog" width="auto">
    <template v-slot:activator="{ props }">
      <v-btn
        :disabled="componentProps.isProtected"
        v-bind="props"
        icon
        variant="text"
      >
        <s-icon icon-name="file-shield" />
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <p>
          Deseja proteger esse arquivo? Ao fazer isso o conteúdo do seu arquivo
          será encriptado e só você terá acesso a ele. Caso seja baixado em
          outro dispositivo a pessoa ou você deverá fornecer essa o par da chave
          apensar uma vez para visualizar seu conteúdo sempre.
        </p>
        <br />
        <p>A proteção serve também para:</p>
        <ul>
          <li>Bloquear arquivos de outro dispotivo</li>
          <li>Proteger seus dados de terceiros</li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="dialog = false">Cancelar</v-btn>
        <v-btn color="primary" @click="handleEncrypt">Proteger</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
