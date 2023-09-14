<template>
  <v-container>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="font-size: 20px; color: white;">Cocktails</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/" style="color: white; font-size: 16px;">
        <v-icon left>mdi-home</v-icon>
        Početna
      </v-btn>
      <div style="width: 1px; background-color: white; height: 24px; margin: 0 12px;"></div>
      <v-btn text to="/about" style="color: white; font-size: 16px;">
        <v-icon left>mdi-information</v-icon>
        O nama
      </v-btn>
      <div style="width: 1px; background-color: white; height: 24px; margin: 0 12px;"></div>
      <v-btn text @click="showAddModal = true" style="color: white; font-size: 16px;">
        <v-icon left>mdi-plus</v-icon>
        Dodaj koktel
      </v-btn>
    </v-app-bar>

    <v-text-field v-model="searchTerm" label="Pretraga koktela" @input="performSearch" />

    <v-select
      v-model="selectedDifficulty"
      :items="difficultyOptions"
      label="Odaberi težinu"
      @change="filterByDifficulty"
    ></v-select>
    <h5 class="cocktail-title">{{ selectedDifficulty }}</h5>

    <!-- Prikaz svih koktela -->
    <v-row>
      <v-col
        v-for="cocktail in paginatedCocktails"
        :key="cocktail.title"
        cols="12"
        md="4"
      >
        <Cocktail
          :cocktail="cocktail"
          @editCocktail="editCocktail"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="paginate"
          color="indigo accent-4"
        ></v-pagination>
      </v-col>
    </v-row>

    <!-- Modal za uređivanje koktela -->
    <v-dialog v-model="showEditModal" max-width="600px">
      <template v-if="showEditModal">
        <div class="modal-dialog" style="background-color: white; border-radius: 5px;">
          <div class="modal-content">
            <h2>Uredi koktel</h2>
            <v-text-field v-model="editFormData.name" label="Ime koktela"></v-text-field>
            <v-select v-model="editFormData.difficulty" label="Težina" :items="difficultyOptions"></v-select>
            <v-btn color="primary" @click="saveCocktail">Spremi koktel</v-btn>
            <v-btn color="white" @click="showEditModal = false">Zatvori</v-btn>
          </div>
        </div>
      </template>
    </v-dialog>

    <!-- Modal za dodavanje koktela -->
    <v-dialog v-model="showAddModal" max-width="600px">
      <template v-if="showAddModal">
        <div class="modal-dialog" style="background-color: white; border-radius: 5px;">
          <div class="modal-content">
            <h2>Dodaj novi koktel</h2>
            <v-text-field v-model="addFormData.name" label="Ime koktela"></v-text-field>
            <v-text-field v-model="addFormData.image" label="URL slike koktela"></v-text-field>
            <v-select v-model="addFormData.difficulty" label="Težina" :items="difficultyOptions"></v-select>
            <v-btn color="primary" @click="addCocktail">Dodaj koktel</v-btn>
            <v-btn color="white" @click="showAddModal = false">Zatvori</v-btn>
          </div>
        </div>
      </template>
    </v-dialog>

    <!-- Snackbar za prikazivanje obavijesti -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="snackbarTimeout"
    >
      <div class="snackbar-content">
        {{ snackbarMessage }}
      </div>
      
    </v-snackbar>

  </v-container>
</template>

<script>
import axios from 'axios';
import Cocktail from '@/components/Cocktail.vue'; // Uvoz Cocktail komponente

export default {
  name: 'Home',
  components: {
    Cocktail, // Registracija Cocktail komponente kao lokalna komponenta
  },
  data() {
    return {
      cocktails: [],
      currentPage: 1,
      cocktailsPerPage: 9,
      searchTerm: '',
      showEditModal: false,
      editingCocktail: null,
      selectedDifficulty: '',
      difficultyOptions: ['Easy', 'Medium', 'Hard'],
      editFormData: {
        name: '',
        difficulty: '',
      },
      showAddModal: false,
      addFormData: {
        name: '',
        image: '',
        difficulty: '',
      },
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'success', // Zelena boja snackbara
      snackbarTimeout: 3000,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    filteredCocktails() {
      if (this.selectedDifficulty === '') {
        return this.cocktails;
      }
      return this.cocktails.filter(cocktail => {
        return cocktail.difficulty.toLowerCase() === this.selectedDifficulty.toLowerCase();
      });
    },
    searchCocktails() {
      return this.filteredCocktails.filter(cocktail => {
        const startsWithSearchTerm = cocktail.title.toLowerCase().startsWith(this.searchTerm.toLowerCase());
        const includesSearchTerm = cocktail.title.toLowerCase().includes(this.searchTerm.toLowerCase());
        return startsWithSearchTerm || includesSearchTerm;
      });
    },
    paginatedCocktails() {
      const startIndex = (this.currentPage - 1) * this.cocktailsPerPage;
      const endIndex = startIndex + this.cocktailsPerPage;
      return this.searchCocktails.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.searchCocktails.length / this.cocktailsPerPage);
    }
  },
  methods: {
    getData() {
      let api = "https://the-cocktail-db3.p.rapidapi.com/";
      axios
        .get(api, {
          headers: {
            'X-RapidAPI-Key': 'e5640e3126msh0c8414d1e174cd2p1992c5jsn2acd70db351d',
            'X-RapidAPI-Host': 'the-cocktail-db3.p.rapidapi.com'
          }
        })
        .then((response) => {
          console.log(response.data);
          this.cocktails = response.data;
        });
    },
    performSearch() {
      this.currentPage = 1;
    },
    editCocktail(cocktail) {
      this.editingCocktail = cocktail;
      this.editFormData = {
        name: cocktail.title,
        difficulty: cocktail.difficulty,
      };
      this.showEditModal = true;
    },
    // Funkcija za prikazivanje snackbara
    showSnackbar(message, color, timeout) {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbarTimeout = timeout;
      this.snackbar = true;
    },

    // Funkcija za spremanje koktela s prikazom snackbara
    saveCocktail() {
      if (this.editingCocktail) {
        this.editingCocktail.title = this.editFormData.name;
        this.editingCocktail.difficulty = this.editFormData.difficulty;
        this.showSnackbar('Koktel je uspješno uređen.', 'success', 5000); // Prikaži snackbar s porukom
      } else {
        this.cocktails.push({
          title: this.editFormData.name,
          image: this.editFormData.image,
          difficulty: this.editFormData.difficulty,
        });
        this.showSnackbar('Koktel je uspješno dodan.', 'success', 3000); // Prikaži snackbar s porukom
      }
      this.showEditModal = false;
      this.editFormData = {
        name: '',
        image: '',
        difficulty: '',
      };
      this.editingCocktail = null;
    },
    // Funkcija za dodavanje koktela s prikazom snackbar-a
    addCocktail() {
      this.cocktails.push({
        title: this.addFormData.name,
        image: this.addFormData.image,
        difficulty: this.addFormData.difficulty,
      });
      this.showSnackbar('Koktel je uspješno dodan.', 'success', 3000); // Prikaži snackbar s porukom
      this.showAddModal = false;
      this.addFormData = {
        name: '',
        image: '',
        difficulty: '',
      };
    },
    paginate(page) {
      this.currentPage = page;
    },
    filterByDifficulty() {
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>
.snackbar-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8px; /* Dodavanje željenog razmaka oko teksta */
}
</style>