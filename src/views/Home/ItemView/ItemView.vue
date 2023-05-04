<script setup>
import {defineProps, defineEmits} from 'vue'
import DeleteAction from "../FileActions/DeleteAction/DeleteAction.vue";
const emit = defineEmits(['itemDeleted'])
const props = defineProps({
  itemData: {type: Object, required: true}
})

</script>
<template>
  <div class="item">
    <delete-action @delete="emit('itemDeleted')" :item-id="props.itemData.id" />
    <s-text>
      {{ props.itemData.content }}
    </s-text>
  </div>
</template>

<style lang="scss" scoped>
.item {
  background-color: white;
  padding: 0 16px 16px;
}
</style>
