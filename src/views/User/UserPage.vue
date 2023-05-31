<script setup>
import { getUserData } from "@/models/services/localUserData";
import router from "@/router";
import { ref, onBeforeMount } from "vue";
import AddUserInfo from "./AddUserInfo/AddUserInfo.vue";
import CryptoJS from "crypto-js";
const userInfo = ref(null);
const ciphertext = ref(null);
const bytes = ref(null);
const decryptedData = ref(null);
const data = ref("Mensagem a ser encriptada");

function getData() {
  getUserData().then((user) => {
    userInfo.value = user.at(0);
  });
}

onBeforeMount(() => {
  getData();
  ciphertext.value = CryptoJS.AES.encrypt(
    JSON.stringify(data.value),
    process.env.VUE_APP_PEER_KEY
  ).toString();
  bytes.value = CryptoJS.AES.decrypt(
    ciphertext.value,
    process.env.VUE_APP_PEER_KEY
  );
  decryptedData.value = JSON.parse(bytes.value.toString(CryptoJS.enc.Utf8));
  console.log(decryptedData.value);
});
</script>

<template>
  <div class="user">
    <div class="user-header">
      <div class="back">
        <div @click="router.push('/home')" class="round">
          <s-icon icon-name="arrow-left" icon-size="medium" />
        </div>
      </div>
      <div class="avatar">
        <div class="round">
          <s-icon icon-name="user" icon-size="medium" />
        </div>
      </div>
    </div>
    {{ ciphertext }}
    {{ decryptedData }}
    <div v-if="userInfo" class="user-info">
      <AddUserInfo v-if="!userInfo?.userName" @save="getData" />
      <s-text text-size="16px" v-else> Nome: {{ userInfo?.userName }} </s-text>
      <s-text> Último Login: {{ new Date(userInfo?.lastLogin) }} </s-text>
      <s-text> Email: {{ userInfo?.email }} </s-text>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-info {
  padding: 0 16px;
  p {
    text-align: left;
  }
}
.user-header,
.back,
.avatar {
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
