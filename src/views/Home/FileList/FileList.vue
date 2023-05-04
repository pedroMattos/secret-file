<script setup>
import * as file from '@/models/services/localFile';
import { ref, defineEmits } from 'vue';
import ShowHideAction from '../FileActions/ShowHideAction/ShowHideAction.vue';

const emit = defineEmits(['loadFinish'])
const files = ref(null)
const hideData = ref(null)

file.getData().then((filesData) => {
  files.value = filesData
  emit('loadFinish', filesData.length)
})

function date(dateString) {
  const date = dateString.split('-')
  return `${date.at(1)}/${date.at(0)}`
}

function onShow(eventValue) {
  hideData.value = eventValue
}
</script>
<template>
  <div v-for="(file, index) in files" :key="index" :class="`list ${file.category}`">
    <div class="file-info">
      <div class="name-area">
        <s-text>
          {{ hideData || file.category !== 'normal' ? '************' : file.name }}
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
</template>

<style lang="scss" scoped>
.list {
  background-color: white;
  width: 100%;
  padding: 0 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  max-height: 40px;
  justify-content: space-between;
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