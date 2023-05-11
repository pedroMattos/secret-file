<script setup>
import router from "@/router";
import * as user from "@/models/services/userManagement";
import { ref } from "vue";

const email = ref(null);
const password = ref(null);
const inputType = ref("password");
const errorMessage = ref(null);

function handleCreateAccount() {
  user.createUserWithEmail(email.value, password.value)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      user.newUserCreateDocument(uid).then(() => {
        router.push("/");
      })
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
      <s-text text-size="18px" weight="700"> Bem vindo ao Secret File </s-text>
      <s-text>
        Crie uma conta e comece a salvar seus arquivos, links, prints e senhas
        de uma forma que só você tem acesso.
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
    <v-btn @click="handleCreateAccount"> Criar conta </v-btn>
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
