<script setup>
import logout from '@/models/services/logout';
import router from '@/router';

async function handleLogout() {
  await logout()
  router.push('/')
}
</script>

<template>
  <div class="bottom-bar">
    <div @click="router.push('/user')" class="round">
      <s-icon icon-name="user"/>
    </div>
    <div class="round logout" @click="handleLogout">
      <s-icon icon-name="arrow-right-from-bracket" />
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
    }
  }
</style>