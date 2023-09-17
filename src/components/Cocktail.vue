<template>
  <v-card height="230">
    <div class="cocktail-image">
      <img :src="cocktail.image" alt="Cocktail" class="cocktail-image-border"/>
    </div>
    <h3 class="cocktail-title">{{ cocktail.title }}</h3>
    <h4 class="cocktail-title-two">{{ cocktail.difficulty }}</h4>
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

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.v-card {
  box-shadow: 0 4px 8px rgba(3, 155, 229, 0.4); 
  border-radius: 5px; /* Zaobljeni rubovi */
  background-image: url('../../public/tekstura.jpeg');
  background-repeat: repeat; 
}
.v-card:hover{
  box-shadow: 1px 1px 10px #424242;
}
.cocktail-title {
  text-align: center;
  font-family: 'Roboto', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}
.cocktail-title-two{
  text-align: center;
  font-family: 'Roboto', sans-serif;
}
.cocktail-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1450x;
  padding-top: 10px;
  padding-bottom: 10px;
}
.cocktail-image img {
  max-width: 100%;
  max-height: 140px;
  object-fit: cover;
}
.cocktail-image-border {
  box-shadow: 0 0 10px rgba(128, 128, 128, 0.4); /* Postavite sjenčanje */
  border-radius: 5px; /* Dodajte zaobljeni rub sjenčanju */
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