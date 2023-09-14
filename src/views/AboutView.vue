<template>
  <div class="about">
    <v-app-bar app color="primary">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title style="font-size: 20px; color: white;">Cocktails</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/" style="color: white; font-size: 16px;">
          <v-icon left>mdi-home</v-icon>
          Početna
        </v-btn>
        <div style="width: 1px; background-color: white; height: 24px; margin: 0 12px;"></div> <!-- Uspravna crta između linkova -->
        <v-btn text to="/about" style="color: white; font-size: 16px;">
          <v-icon left>mdi-information</v-icon>
          O nama
        </v-btn>
    </v-app-bar>

    <div class="content">
      <h1 class="page-title">O nama</h1>
      <p>
        Aplikacija "Cocktails" je projekt tima studenata koji se sastoji od tri člana a to su Sara Vlašić, Anđela Barbarić i Zvonimir Šoše, razvijen unutar kolegija Informatički projekt 2. Ova aplikacija omogućuje pretragu, pregled, uređivanje i dodavanje recepata za koktele.
      </p>
      <p class="page-title">Ključne funkcionalnosti uključuju:</p>
      <ul>
        <li>Dohvaćanje podataka o koktelima iz javnog API-ja putem stranice RapidAPI.</li>
        <li>Brzu pretragu koktela s filtriranjem u stvarnom vremenu.</li>
        <li>Filtriranje koktela prema težini spremanja: easy, medium, hard.</li>
        <li>Paginaciju rezultata za lakšu navigaciju.</li>
        <li>Uređivanje težine pripreme koktela.</li>
        <li>Dodavanje novih koktela.</li>
      </ul>
      <p class="page-title">Korištene tehnologije:</p>
      <div class="technologies">
        <div class="technology">
          <a href="https://vuejs.org/" target="_blank">
            <img src="/vuejs.jpeg" alt="Vue.js" class="tech-image" />
          </a>
          <p>Vue.js</p>
        </div>
        <div class="technology">
          <a href="https://vuetifyjs.com/en/" target="_blank">
            <img src="/vuetify.jpeg" alt="Vuetify" class="tech-image" />
          </a>
          <p>Vuetify</p>
        </div>
        <div class="technology">
          <a href="https://axios-http.com/" target="_blank">
            <img src="/axios.jpeg" alt="Axios" class="tech-image" />
          </a>
          <p>Axios</p>
        </div>
        <div class="technology">
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
            <img src="/html.jpeg" alt="HTML" class="tech-image" />
          </a>
          <p>HTML</p>
        </div>
        <div class="technology">
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank">
            <img src="/css.jpeg" alt="CSS" class="tech-image" />
          </a>
          <p>CSS</p>
        </div>
        <div class="technology">
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
            <img src="/javascript.jpeg" alt="JavaScript" class="tech-image" />
          </a>
          <p>JavaScript</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4; /* Dodajte pozadinu */
}

.content {
  background-color: #fff; /* Dodajte pozadinu za sadržaj */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.page-title {
  font-size: 32px;
  margin-bottom: 20px;
  color: #333; /* Boja teksta */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Sjena teksta */
}

p {
  font-size: 16px;
  margin-bottom: 10px;
  color: #555; /* Boja teksta */
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.technology {
  text-align: center;
  flex-basis: calc(33.33% - 20px); /* Postavite željeni broj stupaca */
}

.tech-image:hover {
  transform: scale(1.05); /* Povećajte sliku na hover */
  transition: transform 0.3s ease-in-out;
}

img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}
</style>