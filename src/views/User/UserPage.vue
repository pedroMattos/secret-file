<script setup>
import router from '@/router';
</script>

<template>
  <div class="user">
    <div class="user-header">
      <div class="back">
        <div @click="router.push('/home')" class="round">
          <s-icon icon-name="arrow-left" icon-size="medium"/>
        </div>
      </div>
      <div class="avatar">
        <div class="round">
          <s-icon icon-name="user" icon-size="medium"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-header, .back, .avatar {
  display: flex;
}
.back {
  margin: 16px;
  margin-right: 0;
}
.avatar {
  margin: 16px auto;
}
  .round {
    background-color: #d9d9d9;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>