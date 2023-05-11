<script setup>
import logout from "@/models/services/logout";
import router from "@/router";
import { defineEmits } from "vue";
const emit = defineEmits(["add"]);
async function handleLogout() {
  await logout();
  router.push("/");
}
function addFile() {
  emit("add");
}
</script>

<template>
  <div class="bottom-bar">
    <!-- <div @click="router.push('/user')" class="round">
      <s-icon icon-name="user"/>
    </div> -->
    <div class="round logout" @click="handleLogout">
      <s-icon icon-name="arrow-right-from-bracket" />
    </div>
    <div class="round add-item" @click="addFile">
      <s-icon icon-name="circle-plus" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-bar {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 30px;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  gap: 20px;
  .round {
    background-color: white;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -15px;
    &.logout {
      background-color: red;
      color: white;
    }
    &.add-item {
      background-color: #42a5f5;
      color: white;
    }
  }
}
</style>
