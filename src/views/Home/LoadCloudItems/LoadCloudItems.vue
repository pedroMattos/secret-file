<script setup>
import CloudFilesDialog from "@/views/Dialogs/CloudFilesDialog.vue";
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["refetch"]);
const prop = defineProps({
  itemsInCloud: Array,
});
</script>

<template>
  <div class="load-cloud">
    <s-text text-color="white">
      Você tem {{ prop.itemsInCloud.length }} arquivos na nuvem salvos no seu
      perfil
    </s-text>

    <div class="actions">
      <v-btn class="text-blue-lighten-5" variant="text" @click="handleCancel">
        Cancelar
      </v-btn>
      <CloudFilesDialog
        @refetch="emit('refetch')"
        :cloud-items="prop.itemsInCloud"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.load-cloud {
  margin-bottom: 12px;
  background-color: #1976d2;
  padding: 8px;
  border-radius: 5px;
}
</style>
