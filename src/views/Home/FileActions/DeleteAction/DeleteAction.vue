<script setup>
// import checkIsValidUser from "@/composables/checkIsValidUser";
// import * as file from "@/models/services/localFile";
import ConfirmDeleteDialog from "@/views/Dialogs/ConfirmDeleteDialog.vue";
// import { defineEmits, defineProps } from "vue";
// const emit = defineEmits(["delete"]);
// const props = defineProps({
//   itemId: Number,
// });

async function handleDelete() {
  // const isValid = await checkIsValidUser();
  // if (!isValid) return;
  // file.deleteById(props.itemId);
  // emit("delete");
}
</script>
<template>
  <div class="lock">
    <confirm-delete-dialog @onConfirm="handleDelete" />
  </div>
</template>

<style lang="scss" scoped></style>
