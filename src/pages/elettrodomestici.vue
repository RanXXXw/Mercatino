<script lang="ts">
import { defineComponent } from "vue";
import Announcements from "./baseAnnunci.vue";

export default defineComponent({
  components: {
    Announcements,
  },
});
</script>

<template>
  <Announcements
    apiEndpoint="/api/annunci/elettrodomestici"
  />
</template>
