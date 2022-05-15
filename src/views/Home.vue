<template>
  <div>
    <Navbar />
    <v-container class="d-flex align-center fill-height">
      <v-card max-width="344" class="red lighten-3 mx-auto my-8 rounded-lg elevation-12">
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://images.unsplash.com/photo-1537884944318-390069bb8665?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZGV8ZW58MHx8MHx8&w=1000&q=80"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >Contest Result</v-list-item-title
            >
            <v-list-item-subtitle>by Tarun Arora</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-img
          src="https://images.unsplash.com/photo-1537884944318-390069bb8665?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZGV8ZW58MHx8MHx8&w=1000&q=80"
          height="194"
        ></v-img>
        <v-card-text>
          Go through the scoreboard and click on the accepted solutions to see the answer to the problem. But do try them yourself first.
        </v-card-text>
        <v-card-actions>
          <v-btn dark rounded color="red lighten-1" @click="$router.push('/scoreboard')"> Scoreboard </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {};
  },
};
</script>