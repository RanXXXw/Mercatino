<script lang="ts">
import { defineComponent } from "vue";
import { fileToBase64 } from "../base64";

definePageMeta({
  middleware: ["require-login"],
});

export default defineComponent({
  data() {
    return {
      titolo: "",
      testo: "",
      prezzo: "",
      categoria: "",
      image: undefined as File | undefined,
    };
  },
  methods: {
    async onSubmit() {
      try {
        if (!this.image) return;
        const base64image = await fileToBase64(this.image);
        const res = await $fetch("/api/annunci", {
          method: "POST",
          body: {
            titoloannuncio: this.titolo,
            testoannuncio: this.testo,
            prezzoannuncio: this.prezzo,
            categoriaannuncio: this.categoria,
            image: base64image,
          },
        });
        console.log(res);
        this.$router.push("/");
      } catch (error) {
        alert(error);
      }
    },
    onImageChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.image = target.files[0];
      }
    },
  },
});
</script>

<template>
  <div class="pubblic-form">
    <form @submit.prevent="onSubmit">
      <h2>Nuovo Annuncio</h2>
      <ul>
        <li>
          <label for="titolo">Titolo:</label>
          <input type="text" id="titolo" name="titolo" v-model="titolo" />
        </li>
        <li>
          <label for="testo">Testo:</label>
          <textarea
            id="testo"
            name="testo"
            v-model="testo"
            placeholder="Write also your contact information"
          />
        </li>
        <li>
          <label for="prezzo">Prezzo:</label>
          <input
            type="text"
            id="prezzo"
            name="prezzo"
            v-model="prezzo"
            placeholder="Euro"
          />
        </li>
        <li>
          <label for="categoria">Categoria:</label>
          <input
            list="listaCategoria"
            id="categoria"
            name="categoria"
            type="text"
            v-model="categoria"
          />
          <datalist id="listaCategoria">
            <option value="1">Elettrodomestici</option>
            <option value="2">Trasporti</option>
            <option value="3">Libri</option>
            <option value="4">Abbigliamenti</option>
            <option value="5">Altre</option>
          </datalist>
        </li>

        <li>
          <label for="immagine">Immagine:</label>
          <input
            id="immagine"
            type="file"
            accept="image/jpeg"
            @change="onImageChange"
          />
        </li>
        <li>
          <input type="submit" name="submit" value="Pubblica" />
        </li>
      </ul>
    </form>
  </div>
</template>
