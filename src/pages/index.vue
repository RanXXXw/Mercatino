<script lang="ts">
import { Annuncio } from "../types";

export default defineComponent({
  data() {
    return {
      datiAnnunciElettronica: [] as Annuncio[],
      datiAnnunciAbbigliamento: [] as Annuncio[],
      datiAnnunciTrasporto: [] as Annuncio[],
      datiAnnunciLibro: [] as Annuncio[],
      currentCategory: "abbigliamenti", // default category
    };
  },
  methods: {
    getAnnunciElettrodomestici() {
      $fetch("/api/annunci/elettrodomestici").then(
        (response) => (this.datiAnnunciElettronica = response as Annuncio[])
      );
    },
    getAnnunciAbbigliamento() {
      $fetch("/api/annunci/abbigliamenti").then(
        (response) => (this.datiAnnunciAbbigliamento = response as Annuncio[])
      );
    },
    getAnnunciLibri() {
      $fetch("/api/annunci/libri").then(
        (response) => (this.datiAnnunciLibro = response as Annuncio[])
      );
    },
    getAnnunciTrasporti() {
      $fetch("/api/annunci/trasporti").then(
        (response) => (this.datiAnnunciTrasporto = response as Annuncio[])
      );
    },
    setCategory(category: string) {
      this.currentCategory = category;
    },
  },
  mounted() {
    this.getAnnunciElettrodomestici();
    this.getAnnunciAbbigliamento();
    this.getAnnunciLibri();
    this.getAnnunciTrasporti();
  },
  computed: {
    displayedAnnunci() {
      switch (this.currentCategory) {
        case "elettronica":
          return this.datiAnnunciElettronica;
        case "abbigliamenti":
          return this.datiAnnunciAbbigliamento;
        case "libri":
          return this.datiAnnunciLibro;
        case "trasporti":
          return this.datiAnnunciTrasporto;
        default:
          return this.datiAnnunciAbbigliamento;
      }
    },
  },
});
</script>

<template>
  <div class="post-container">
    <img src="/img/poster.jpg" alt="" />
  </div>

  <div class="header-container">
    <ul>
      <li @mouseover="setCategory('abbigliamenti')">
        <NuxtLink to="/abbigliamenti">Abbigliamenti</NuxtLink>
      </li>
      <li @mouseover="setCategory('elettronica')">
        <NuxtLink to="/elettrodomestici">Elettronici</NuxtLink>
      </li>
      <li @mouseover="setCategory('libri')">
        <NuxtLink to="/libri">Libri</NuxtLink>
      </li>
      <li @mouseover="setCategory('trasporti')">
        <NuxtLink to="/trasporti">Trasporti</NuxtLink>
      </li>
    </ul>
  </div>

  <div class="article-container">
    <article
      class="card"
      v-for="annuncio in displayedAnnunci.slice(0, 8)"
      :key="annuncio.idannuncio"
    >
      <img :src="'/img/' + annuncio.imgannuncio" alt="annuncio-Image" />
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

  <div class="event-introduzione">
    <h1>Partecipa ai nostri eventi</h1>
    <p>
      "Trasforma il tuo usato in nuove opportunità: scambia, risparmia e rinnova
      con il nostro sito di oggetti di seconda mano!"
    </p>
    <p>Per informazioni contatta info@gmail.com</p>
  </div>

  <div class="event-container">
    <article>
      <img src="/img/painting.jpg" alt="event-image" />

      <h2>Flowers & Painting</h2>
      <p>24/07/204 Cesena</p>
      <p>
        Step back in time and refresh your wardrobe with iconic 90s fashion.
        Swap out your current clothes for vintage gems like grunge flannels, mom
        jeans, and neon windbreakers. Embrace the nostalgia and unique style of
        the 90s!
      </p>
    </article>

    <article>
      <img src="/img/cosplay.jpg" alt="event-image" />
      <h2>Changing Cosplay !</h2>
      <p>24/07/204 Cesena</p>
      <p>
        Transform into your favorite characters at our cosplay exchange event.
        Swap and discover a variety of costumes, from anime and video game
        heroes to movie and comic book icons. Perfect for both seasoned
        cosplayers and newcomers!
      </p>
    </article>

    <article>
      <img src="/img/camera.jpg" alt="event-image" />
      <h2>Let's Take Photo</h2>
      <p>24/07/204 Cesena</p>
      <p>
        Upgrade your photography game at our camera swap event. Exchange your
        current gear for new or classic cameras, and connect with fellow
        photography enthusiasts. Capture the perfect shot with the ideal
        equipment!
      </p>
    </article>
  </div>
</template>
