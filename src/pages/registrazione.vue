<script lang="ts">
export default defineComponent({
  data() {
    return {
      registerUsername: "",
      registerPassword: "",
      registerName: "",
    };
  },
  methods: {
    onRegisterSubmit() {
      $fetch("/api/auth/register", {
        method: "POST",
        body: {
          username: this.registerUsername,
          password: this.registerPassword,
          nome: this.registerName,
        },
      })
        .then(() => (window.location.href = "/"))
        .catch((e) => alert(e));
    },
  },
});
</script>

<template>
  <section class="login-register-section">
    <div class="form-box">
      <form @submit.prevent="onRegisterSubmit">
        <h2>Sign Up</h2>

        <div class="inputbox">
          <input
            type="text"
            id="register-email"
            name="register-email"
            v-model="registerUsername"
          />
          <label for="register-email">Email</label>
        </div>

        <div class="inputbox">
          <input
            type="password"
            id="register-password"
            name="register-password"
            v-model="registerPassword"
          />
          <label for="register-password">Password</label>
        </div>

        <div class="inputbox">
          <input
            type="text"
            id="register-name"
            name="register-name"
            v-model="registerName"
          />
          <label for="register-name">Username</label>
        </div>

        <button type="submit" name="submit" value="Registrati">Registra</button>
      </form>
    </div>
  </section>
</template>
