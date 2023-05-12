<script setup>
import { defineProps, defineEmits, ref } from "vue";
import DeleteAction from "../FileActions/DeleteAction/DeleteAction.vue";
import UnlockForm from "../UnlockForm/UnlockForm.vue";
import CloudAction from "../FileActions/CloudAction/CloudAction.vue";
import EditAction from "../FileActions/EditAction/EditAction.vue";
import EditForm from "../EditForm/EditForm.vue";
const blockedByPass = ref(true);
const editing = ref(false);
const loading = ref(false);
const emit = defineEmits(["itemDeleted", "cancel", "refetch"]);
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
function handleSave() {
  editing.value = false;
  emit("refetch");
}
function handleSaveOnCloud() {
  handleSave();
}
</script>
<template>
  <div>
    <div class="item">
      <edit-form
        v-if="editing"
        :file-data="itemData"
        @cancel="editing = false"
        @save="handleSave"
        @loading="(value) => (loading = value)"
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
            <cloud-action
              :item-data="itemData"
              @save-on-cloud="handleSaveOnCloud"
            />
          </div>
          <br />
          <s-text :is-link="fileContent()" :text="props.itemData.content">
            {{ props.itemData.content }}
          </s-text>
          <div v-if="itemData.fileType === 'pdf'" class="embed-container">
            <iframe :src="itemData.file" frameborder="0"></iframe>
          </div>
          <img v-else :src="itemData.file" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 100%;
}
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}

.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
