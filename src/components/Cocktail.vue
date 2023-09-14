<template>
  <v-card height="200">
    <div class="cocktail-image">
      <img :src="cocktail.image" alt="Cocktail" />
    </div>
    <h3 class="cocktail-title">{{ cocktail.title }}</h3>
    <h5 class="cocktail-title">{{ cocktail.difficulty }}</h5>
    <v-btn @click="emitEditCocktail" class="cocktail-button">Uredi</v-btn>
  </v-card>
</template>

<script>
export default {
  props: ['cocktail'],
  methods: {
    emitEditCocktail() {
      this.$emit('editCocktail', this.cocktail);
    },
  },
};
</script>

<style scoped>
.cocktail-title {
  text-align: center;
}
.cocktail-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130px;
}
.cocktail-image img {
  max-width: 100%;
  max-height: 130px;
  object-fit: cover;
}
.button-container {
  display: flex;
  justify-content: space-between;
}
.cocktail-button {
  background-color: white; /* Bijela pozadina */
  color: #1E88E5; /* Plava boja za tekst */
  font-weight: bold;
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 14px;
  border: 1px solid #ccc; /* Sivi obrub */
  border-radius: 5px; /* Zaobljeni rubovi */
  transition: background-color 0.3s, color 0.3s; /* Tranzicija za glatku promjenu boje */
}
.cocktail-button:hover {
  background-color: #1E88E5; /* Plava pozadina */
  color: white; /* Bijeli tekst */
}
.card-container {
  margin-bottom: 20px;
}
</style>