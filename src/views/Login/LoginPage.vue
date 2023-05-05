<script setup>
import router from "@/router";
import loginWithEmail from "@/models/services/loginWithEmail";
import * as user from "@/models/services/localUserData";
import { ref, onBeforeMount } from "vue";
import checkIsValidUser from "@/composables/checkIsValidUser";

onBeforeMount(() => {
  sendToHome()
});

const email = ref(null);
const password = ref(null);
const inputType = ref("password");
const errorMessage = ref(null);

async function sendToHome() {
  const isValid = await checkIsValidUser()
  if (isValid) {
    router.push('/home')
  }
}

function goTo() {
  loginWithEmail(email.value, password.value)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      const email = userCredential.user.email;
      const lastLogin = userCredential.user.metadata.lastLoginAt;
      user
        .saveUserData({ uuid: uid, email: email, lastLogin: lastLogin })
        .then(() => {
          router.push("/home");
        });
    })
    .catch((error) => {
      errorMessage.value = error;
    });
}
</script>

<template>
  <div class="login">
    <s-icon icon-name="lock" icon-size="brand" />
    <div class="info-text">
      <s-text text-size="18px" weight="700"> Bem vindo ao NOME_APP </s-text>
      <s-text>
        Aqui você pode salvar senhas, lembretes, prints importantes, links e
        arquivos que só interessam a você
      </s-text>
    </div>
    <v-text-field
      v-model="email"
      autocomplete="off"
      type="email"
      placeholder="Email"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      placeholder="Senha"
      autocomplete="off"
      :type="inputType"
      required
    >
      <slot name="append-icon">
        <s-icon
          v-if="inputType === 'password'"
          icon-name="eye"
          icon-size="medium"
          @click="() => (inputType = 'text')"
        />
        <s-icon
          v-else
          icon-name="eye-slash"
          icon-size="medium"
          @click="() => (inputType = 'password')"
        />
      </slot>
    </v-text-field>
    <s-text text-color="red">
      {{ errorMessage }}
    </s-text>
    <v-btn @click="goTo"> Entrar </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.info-text {
  margin: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login {
  width: 100%;
  display: flex;
  padding: 100px 20px;
  flex-direction: column;
  justify-content: center;
}
</style>
