<script lang="ts">
export default defineComponent({
  data() {
    return {
      loginUsername: "",
      loginPassword: "",
    };
  },
  methods: {
    onLoginSubmit() {
      $fetch("/api/auth/login", {
        method: "POST",
        body: {
          username: this.loginUsername,
          password: this.loginPassword,
        },
      })
        .then(() => (window.location.href = "/")) // login con successo, va home
        .catch((e) => alert(e));
    },
  },
});
</script>

<template>
  <section class="login-register-section">
    <div class="form-box">
      <form @submit.prevent="onLoginSubmit">
        <h2>Login</h2>

        <div class="inputbox">
          <input
            type="text"
            id="login-username"
            name="login-username"
            v-model="loginUsername"
          />
          <label for="login-username">Email</label>
        </div>

        <div class="inputbox">
          <input
            type="password"
            id="login-password"
            name="login-password"
            v-model="loginPassword"
          />
          <label for="login-password">Password</label>
        </div>

        <button type="submit" name="submit" value="Login">Login</button>

        <div class="register">
          <NuxtLink to="/registrazione"
            >Don't have an account? Registre</NuxtLink
          >
        </div>
      </form>
    </div>
  </section>
</template>
