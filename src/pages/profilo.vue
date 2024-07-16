<script lang="ts">
import { Utente } from "../types";
import { Annuncio } from "../types";

export default defineComponent({
  data() {
    return {
      utente: null as Utente | null,
      datiAnnunci: [] as Annuncio[],
      editingAnnuncio: null as Annuncio | null,
      newTitoloannuncio: "",
      newTestoannuncio: "",
      newPrezzoannuncio: 0,
    };
  },
  computed: {
    numeroAnnunciPubblicati(): number {
      return this.datiAnnunci.length;
    },
  },
  methods: {
    async getUtente() {
      const utente = await $fetch("/api/auth/profilo");
      console.log(utente);
      this.utente = utente;
    },
    async getAnnunciByUtente() {
      const response = await $fetch("/api/utenti/idutente");
      this.datiAnnunci = response as Annuncio[];
    },
    async deleteAnnuncio(idannuncio: number) {
      try {
        const response = await $fetch(`/api/annunci/delete`, {
          method: "DELETE",
          body: JSON.stringify({ idannuncio }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.message) {
          this.datiAnnunci = this.datiAnnunci.filter(
            (annuncio) => annuncio.idannuncio !== idannuncio
          );
          alert("Annuncio eliminato con successo");
        } else {
          console.error(
            "Errore durante l'eliminazione dell'annuncio",
            response
          );
          alert("Errore durante l'eliminazione dell'annuncio");
        }
      } catch (error) {
        console.error("Errore durante l'eliminazione dell'annuncio:", error);
        alert("Errore durante l'eliminazione dell'annuncio");
      }
    },

    editAnnuncio(annuncio: Annuncio) {
      this.editingAnnuncio = annuncio;
      this.newTitoloannuncio = annuncio.titoloannuncio;
      this.newTestoannuncio = annuncio.testoannuncio;
      this.newPrezzoannuncio = annuncio.prezzoannuncio;
    },

    async updateAnnuncio() {
      if (!this.editingAnnuncio) return;

      try {
        const response = await $fetch(`/api/annunci/update`, {
          method: "PUT",
          body: JSON.stringify({
            idannuncio: this.editingAnnuncio.idannuncio,
            titoloannuncio: this.newTitoloannuncio,
            testoannuncio: this.newTestoannuncio,
            prezzoannuncio: this.newPrezzoannuncio,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.message) {
          const index = this.datiAnnunci.findIndex(
            (annuncio) =>
              annuncio.idannuncio === this.editingAnnuncio!.idannuncio
          );
          if (index !== -1) {
            this.datiAnnunci[index].titoloannuncio = this.newTitoloannuncio;
            this.datiAnnunci[index].testoannuncio = this.newTestoannuncio;
            this.datiAnnunci[index].prezzoannuncio = this.newPrezzoannuncio;
          }
          alert("Annuncio aggiornato con successo");
          this.editingAnnuncio = null;
        } else {
          console.error(
            "Errore durante l'aggiornamento dell'annuncio",
            response
          );
          alert("Errore durante l'aggiornamento dell'annuncio");
        }
      } catch (error) {
        console.error("Errore durante l'aggiornamento dell'annuncio:", error);
        alert("Errore durante l'aggiornamento dell'annuncio");
      }
    },
  },

  mounted() {
    this.getUtente();
    this.getAnnunciByUtente();
  },
});
</script>

<template>
  <div class="profile-container">
    <h1>Profilo</h1>
    <div class="user-profile">
      <div class="user-image">
        <img src="img/avatar.jpg" alt="avatar" />
      </div>
      <div class="user-info">
        <h2>{{ utente?.nomeutente }}</h2>
        <p>{{ utente?.username }}</p>
        <p>Annunci Pubblicati: {{ numeroAnnunciPubblicati }}</p>
      </div>
    </div>

    <div class="user-content">
      <h1>Annunci Pubblicati</h1>

      <div v-if="datiAnnunci.length === 0" class="no-annunci">
        <p>
          Non hai ancora pubblicato nessun annuncio!
          <NuxtLink to="/pubblica">Pubblica Subito</NuxtLink>
        </p>
      </div>

      <article
        v-else
        class="card"
        v-for="annuncio in datiAnnunci"
        :key="annuncio.idannuncio"
      >
        <img :src="'/img/' + annuncio.imgannuncio" alt="" />
        <div class="card-content">
          <button
            class="delete-icon"
            @click="deleteAnnuncio(annuncio.idannuncio)"
          >
            <span class="material-icons">clear</span>
          </button>

          <h2>
            {{ annuncio.titoloannuncio }}
            <button class="edit-icon" @click="editAnnuncio(annuncio)">
              <span class="material-icons"> edit_square </span>
            </button>
          </h2>
          <p>${{ annuncio.prezzoannuncio }}</p>
          <p>{{ annuncio.testoannuncio }}</p>
          <p>{{ annuncio.dataannuncio.slice(0, 10) }}</p>
        </div>
      </article>
    </div>
  </div>

  <div v-if="editingAnnuncio" class="edit-form">
    <h2>Modifica Annuncio</h2>
    <label>
      Titolo:
      <input v-model="newTitoloannuncio" />
    </label>
    <label>
      Testo:
      <textarea v-model="newTestoannuncio"></textarea>
    </label>
    <label>
      Prezzo:
      <input type="number" v-model="newPrezzoannuncio" />
    </label>
    <button @click="updateAnnuncio">Salva</button>
    <button @click="editingAnnuncio = null">Annulla</button>
  </div>
</template>
