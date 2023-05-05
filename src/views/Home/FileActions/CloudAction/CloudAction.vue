<script setup>
import checkIsValidUser from "@/composables/checkIsValidUser";
import * as cloud from "@/models/services/cloud";
import * as file from "@/models/services/localFile";
import { defineEmits, defineProps } from "vue";
const emit = defineEmits(["saveOnCloud"]);
const props = defineProps({
  itemData: Object,
});

async function handleSave() {
  const isValid = await checkIsValidUser();
  if (!isValid) return;
  cloud.saveFile(props.itemData).then(() => {
    file.update(props.itemData).then(() => {
      console.log('salvo')
    })
    emit('saveOnCloud')
  })
}
</script>
<template>
  <div class="cloud">
    <v-btn @click="handleSave" icon variant="text" :disabled="itemData.inCloud">
      <s-icon icon-name="cloud-arrow-up" />
    </v-btn>
  </div>
</template>

<style lang="scss" scoped></style>
