<script setup>
import checkIsValidUser from "@/composables/checkIsValidUser";
import * as cloud from "@/models/services/cloud";
import * as file from "@/models/services/localFile";
import { defineEmits, defineProps, ref, isProxy, toRaw } from "vue";
const emit = defineEmits(["saveOnCloud"]);
const props = defineProps({
  itemData: Object,
});

const data = ref(props.itemData);

async function handleSave() {
  const isValid = await checkIsValidUser();
  if (!isValid) return;
  let raw = data.value;
  if (isProxy(data.value)) {
    raw = toRaw(data.value);
  }
  cloud.saveFile(raw).then(() => {
    file.update(raw).then(() => {
      console.log("salvo");
    });
    emit("saveOnCloud");
  });
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
