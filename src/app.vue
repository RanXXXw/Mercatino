<script lang="ts">
import { Utente } from "~/types";

export default defineComponent({
  // Fornisce l'oggetto utente a tutti i componenti dell'applicativo
  provide() {
    return {
      utente: computed(() => this.utente),
    };
  },
  data() {
    return {
      utente: null as Utente | null,
    };
  },
  methods: {
    async getUtente() {
      const utente = await $fetch("/api/auth/profilo");
      console.log(utente);
      this.utente = utente;
    },

    async logout() {
      const utente = await $fetch("/api/auth/logout").then(
        () => (window.location.href = "/")
      );
      this.getUtente();
    },
  },
  mounted() {
    this.getUtente();
  },
});
</script>

<template>
  <Head>
    <Title>Mercatino</Title>
    <Meta name="description" content="Mercatino" />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
  </Head>

  <body>
    <header>
      <h1 class="logo">
      <NuxtLink to="/">Mercatino</NuxtLink>
    </h1>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/annunci">Annunci</NuxtLink></li>
          <li><NuxtLink to="/pubblica">Pubblica</NuxtLink></li>

          <li v-if="utente">
            <NuxtLink to="/profilo">Area Personale</NuxtLink>
          </li>
          <li v-if="!utente">
            <NuxtLink to="/login" class="login">Login</NuxtLink>
          </li>
          <li v-else>
            <a class="logout" href="#" @click.prevent="logout">Logout</a>
          </li>
          <li v-if="!utente">
            <NuxtLink to="/registrazione" class="signup">Sign Up</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="menu-icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>

    <main>
      <NuxtPage />
    </main>
  </body>

  <footer>
    <div class="footer-content">
      <div class="footer-section about">
        <h2>About Us</h2>
        <p>
          Ingegneria di Sistemi Web - Wu Xiaoran. A marketplace where you can
          find a variety of items and connect with people.
        </p>
      </div>
      <div class="footer-section links">
        <h2>Quick Links</h2>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/pubblica">Pubblica</NuxtLink></li>
          <li><NuxtLink to="/login">Login</NuxtLink></li>
          <li><NuxtLink to="/registrazione">Sign Up</NuxtLink></li>
        </ul>
      </div>
      <div class="footer-section contact">
        <h2>Contact Us</h2>
        <p>Email: info@mercatino.com</p>
        <p>Phone: +123 456 7890</p>
      </div>
    </div>
  </footer>
</template>

<style>
@import "./style.css";
</style>
