<script setup>
import { defineProps, defineEmits, ref } from "vue";
import DeleteAction from "../FileActions/DeleteAction/DeleteAction.vue";
import UnlockForm from "../UnlockForm/UnlockForm.vue";
import CloudAction from "../FileActions/CloudAction/CloudAction.vue";
import EditAction from "../FileActions/EditAction/EditAction.vue";
import EditForm from "../EditForm/EditForm.vue";
const blockedByPass = ref(true);
const editing = ref(false);
const emit = defineEmits(["itemDeleted", "cancel"]);
const props = defineProps({
  itemData: { type: Object, required: true },
});

function onUnlockFile() {
  blockedByPass.value = false;
}
function fileContent() {
  if (props.itemData.content.match(/(https?:\/\/[^\s]+)/g)) {
    return true;
  }

  return false;
}
</script>
<template>
  <div class="item">
    <edit-form
      v-if="editing"
      :file-data="itemData"
      @cancel="editing = false"
      @save="editing = false"
    />
    <div v-else>
      <unlock-form
        @cancel="emit('cancel')"
        @unlock-file="onUnlockFile"
        :pass="itemData.password"
        v-if="itemData.password && blockedByPass"
      />
      <div v-else>
        <div class="actions">
          <edit-action @start-edit="editing = true" />
          <delete-action
            @delete="emit('itemDeleted')"
            :item-id="props.itemData.id"
          />
          <cloud-action :item-data="itemData" />
        </div>
        <br />
        <s-text :is-link="fileContent()" :text="props.itemData.content">
          {{ props.itemData.content }}
        </s-text>
        <img v-if="itemData.file" :src="itemData.file" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 100%;
}
.item {
  background-color: white;
  padding: 0 16px 16px;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
