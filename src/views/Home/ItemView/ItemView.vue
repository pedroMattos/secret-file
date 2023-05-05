<script setup>
import {defineProps, defineEmits, ref} from 'vue'
import DeleteAction from "../FileActions/DeleteAction/DeleteAction.vue";
import UnlockForm from '../UnlockForm/UnlockForm.vue';
import CloudAction from '../FileActions/CloudAction/CloudAction.vue';
const blockedByPass = ref(true)
const emit = defineEmits(['itemDeleted', 'cancel'])
const props = defineProps({
  itemData: {type: Object, required: true}
})

function onUnlockFile() {
  blockedByPass.value = false
}
function fileContent() {
  if (props.itemData.content.match(/(https?:\/\/[^\s]+)/g)) {
    return true
  }

  return false
}
</script>
<template>
  <div class="item">
    <unlock-form @cancel="emit('cancel')" @unlock-file="onUnlockFile" :pass="itemData.password" v-if="itemData.password && blockedByPass" />
    <div v-else>
      <div class="actions">
        <delete-action @delete="emit('itemDeleted')" :item-id="props.itemData.id" />
        <cloud-action :item-data="itemData" />
      </div>
      <br />
      <s-text :is-link="fileContent()" :text="props.itemData.content">
        {{ props.itemData.content }}
      </s-text>
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
  justify-content: flex-end;
}
</style>
