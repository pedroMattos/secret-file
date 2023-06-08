<script setup>
import checkIsValidUser from "@/composables/checkIsValidUser";
import * as file from "@/models/services/localFile";
import { useStore } from "vuex";
import ConfirmEncryptDialog from "@/views/Dialogs/ConfirmEncryptDialog.vue";
import { defineEmits, defineProps } from "vue";

const store = useStore();
const emit = defineEmits(["refetch"]);
const props = defineProps({
  fileToProtect: Object,
});

async function encrypt() {
  const isValid = await checkIsValidUser();
  if (!isValid) return;
  file.protectContent(props.fileToProtect);
  store.commit("refetchCloudItems", true);
  emit("refetch");
}
</script>
<template>
  <div class="encrypt">
    <confirm-encrypt-dialog
      :is-protected="props.fileToProtect?.protected"
      @confirm-encrypt="encrypt"
    />
  </div>
</template>

<style lang="scss" scoped></style>
