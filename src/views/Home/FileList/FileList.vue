<script setup>
import * as file from '@/models/services/localFile';
import { ref, defineEmits, defineProps, watch, computed } from 'vue';
import ShowHideAction from '../FileActions/ShowHideAction/ShowHideAction.vue';
import ItemView from '../ItemView/ItemView.vue';

const props = defineProps({
  reFetch: Boolean
})
const shouldReFetch = computed(() => {
  return props.reFetch
})
const emit = defineEmits(['loadFinish'])
const files = ref(null)
const hideData = ref(null)
const showItemView = ref(null)

file.getData().then((filesData) => {
  files.value = filesData
  emit('loadFinish', filesData.length)
})

watch(shouldReFetch, (value) => {
  if (value) {
    file.getData().then((filesData) => {
      files.value = filesData
      emit('loadFinish', filesData.length)
    })
  }
})

function date(dateString) {
  const date = dateString.split('-')
  return `${date.at(1)}/${date.at(0)}`
}

function onDelete() {
  file.getData().then((filesData) => {
    files.value = filesData
    emit('loadFinish', filesData.length)
  })
}

function onShow(eventValue) {
  hideData.value = eventValue
}

function handleViewItem (id) {
  console.log(id)
  if (showItemView.value !== id) {
    showItemView.value = id
    return
  }

  showItemView.value = null
}
</script>
<template>
  <div v-for="(file, index) in files" :key="index" :class="`list ${file.category}`" @click="handleViewItem(file.id)">
    <div :class="`list-item-area ${file.category}`">
      <div class="file-info">
        <div class="name-area">
          <s-text>
            {{ file.name }}
          </s-text>
        </div>
        <div class="date-area">
          <s-text>
            {{ date(file.date) }}
          </s-text>
        </div>
      </div>
      <ShowHideAction @show="onShow" :hide="file.category !== 'normal'" />
    </div>
    <ItemView v-if="showItemView === file.id" @item-deleted="onDelete" :item-data="file" />
  </div>
</template>

<style lang="scss" scoped>
.list {
  background-color: white;
  margin-bottom: 8px;
  border-right: 6px solid grey;
  &.normal {
    border-color: green;
  }
  &.classifield {
    border-color: yellow;
  }
  &.secret {
    border-color: red;
  }
}
.list-item-area {
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  max-height: 40px;
  justify-content: space-between;
  .file-info {
    gap: 10px;
    display: flex;
    .name-area {
      min-width: 100px;
      padding-right: 10px;
      border-right: 1px solid black;
    }
  }
}
</style>