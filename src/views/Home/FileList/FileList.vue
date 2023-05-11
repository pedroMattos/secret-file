<script setup>
import * as file from "@/models/services/localFile";
import {
  ref,
  defineEmits,
  defineProps,
  watch,
  computed,
  onBeforeMount,
} from "vue";
import ShowHideAction from "../FileActions/ShowHideAction/ShowHideAction.vue";
import ItemView from "../ItemView/ItemView.vue";
import checkIsValidUser from "@/composables/checkIsValidUser";
import isBoolean from "@/composables/isBoolean";

const props = defineProps({
  reFetch: Boolean,
});
onBeforeMount(() => {
  file.getData().then((filesData) => {
    files.value = filesData;
    emit("loadFinish", filesData.length);
  });
});
const shouldReFetch = computed(() => {
  return props.reFetch;
});
const emit = defineEmits(["loadFinish"]);
const files = ref(null);
const hideData = ref(null);
const showItemView = ref(null);
const snackbar = ref(false);

watch(shouldReFetch, (value) => {
  if (value) {
    file.getData().then((filesData) => {
      files.value = filesData;
      emit("loadFinish", filesData.length);
    });
  }
});

function date(dateString) {
  const date = dateString.split("-");
  return `${date.at(1)}/${date.at(0)}`;
}

function onDelete() {
  file.getData().then((filesData) => {
    files.value = filesData;
    emit("loadFinish", filesData.length);
  });
}

function onShow(eventValue) {
  if (hideData.value !== eventValue) {
    hideData.value = eventValue;
    return;
  }
  hideData.value = null;
}

async function handleViewItem(id) {
  const isValid = await checkIsValidUser();
  if (!isValid) return;
  if (showItemView.value !== id) {
    showItemView.value = id;
    return;
  }

  showItemView.value = null;
}

function shouldHide(hideData, file) {
  return hideData !== file.id && file.category !== "normal";
}

function handleRefetch() {
  showItemView.value = null;
  files.value = null;
  file.getData().then((filesData) => {
    files.value = filesData;
    emit("loadFinish", filesData.length);
  });
}
</script>
<template>
  <div>
    <div v-if="!files" class="loader">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <div
        v-for="(file, index) in files"
        :key="index"
        :class="`list ${file.category} ${file?.inCloud ? 'in-cloud' : ''}`"
      >
        <div :class="`list-item-area ${file.category}`">
          <div class="file-info" @click="handleViewItem(file.id)">
            <div class="name-area">
              <s-text>
                {{ shouldHide(hideData, file) ? "********" : file.name }}
              </s-text>
            </div>
            <div class="date-area">
              <s-text>
                {{ date(file.date) }}
              </s-text>
            </div>
          </div>
          <div class="actions">
            <s-icon
              v-if="file.inCloud"
              icon-color="rgb(49, 155, 209)"
              icon-name="cloud-arrow-up"
            />
            <v-snackbar v-model="snackbar">
              Item dessincronizado com a nuvem
              <template v-slot:actions>
                <v-btn color="red" variant="text" @click="snackbar = false">
                  Entendi
                </v-btn>
              </template>
            </v-snackbar>
            <s-icon
              v-if="isBoolean(file.inCloud) && !file.inCloud"
              icon-color="#FF8A80"
              icon-name="cloud-arrow-up"
              @click="snackbar = true"
            />
            <ShowHideAction
              @show="() => onShow(file.id)"
              :hide="shouldHide(hideData, file)"
              :disabled="file.category === 'normal'"
            />
          </div>
        </div>
        <ItemView
          v-if="showItemView === file.id"
          @item-deleted="onDelete"
          @refetch="handleRefetch"
          @cancel="handleViewItem(file.id)"
          :item-data="file"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
  gap: 5px;
}
.list {
  background-color: white;
  margin-bottom: 8px;
  border-right: 6px solid grey;
  &.in-cloud {
    border-left: 1px solid rgb(49, 155, 209);
    border-top: 1px solid rgb(49, 155, 209);
    border-bottom: 1px solid rgb(49, 155, 209);
  }
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
.loader {
  margin: 16px;
}
.list-item-area {
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  max-height: 48px;
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
