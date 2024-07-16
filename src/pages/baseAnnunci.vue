<script lang="ts">
import { defineComponent } from "vue";
import { Annuncio } from "../types";

export default defineComponent({
  props: {
    apiEndpoint: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "#",
    },
  },
  data() {
    return {
      datiAnnunci: [] as Annuncio[],
    };
  },
  methods: {
    async fetchAnnunci() {
      try {
        const response = await $fetch(this.apiEndpoint);
        this.datiAnnunci = response as Annuncio[];
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    },
  },
  mounted() {
    this.fetchAnnunci();
  },
});
</script>

<template>
  <div class="category-container">
    
    <div class="aside-container">
      <aside>
        <section class="section-container">
          <h2>Categorie</h2>
          <ul>
            <li>
              <NuxtLink to="/elettrodomestici">Elettronici</NuxtLink>
            </li>
            <li><NuxtLink to="/trasporti">Trasporti</NuxtLink></li>
            <li><NuxtLink to="/libri">Libri</NuxtLink></li>
            <li><NuxtLink to="/abbigliamenti">Abbigliamenti</NuxtLink></li>
            <li><NuxtLink to="/annunci">Vedi tutto</NuxtLink></li>
          </ul>
        </section>
      </aside>
    </div>

    <div class="article-container">
    <article
      class="card"
      v-for="annuncio in datiAnnunci"
      :key="annuncio.idannuncio"
    >
      <img :src="'/img/' + annuncio.imgannuncio" alt="Annuncio Image" />
      <div class="card-content">
        <h1>{{ annuncio.titoloannuncio }}</h1>
        <p>${{ annuncio.prezzoannuncio }}</p>
        <p>{{ annuncio.testoannuncio }}</p>
        <div class="bottom-content">
          <p>
            {{ annuncio.nomeutente }}<span class="spacer"></span
            >{{ annuncio.dataannuncio.slice(0, 10) }}
          </p>
        </div>
      </div>
    </article>
  </div>
  </div>
</template>
