<template>
  <div>
    <v-app-bar v-resize="onResize" color="red lighten-4" dense>
      <v-btn icon @click="drawer = true" v-show="isMobile"
        ><v-app-bar-nav-icon></v-app-bar-nav-icon
      ></v-btn>
      <v-toolbar-title @click="$router.push('/')" style="cursor: pointer" class="font-weight-bold">CodeForScore</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y open-on-hover v-for="i,index in items" :key="index">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="!isMobile"
            color="red lighten-2"
            dark
            rounded
            class="mr-3"
            v-bind="attrs"
            v-on="on"
          >{{i.name}} 
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item v-for="(item, ind) in i.resources" :key="ind">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary color="red lighten-4">
      <v-expansion-panels accordion multiple>
        <v-expansion-panel
          v-for="(item, i) in items"
          :key="i"
          class="red lighten-4 col-md-3 col-12 elevation-0"
        >
          <h3 class="d-none d-md-block py-1">{{ item.name }}</h3>
          <v-expansion-panel-header class="d-md-none" color="red lighten-2">{{
            item.name
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <li v-for="tag in item.resources" :key="tag.url">
              <a target="_blank" v-bind:href="tag.url" class="white--text"
                >{{ tag.title }}
              </a>
            </li>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      drawer: false,
      isMobile: window.innerWidth < 600,
      group: null,
      items: [
        {
          "name": "Contests",
          "resources": [
            { title: "Contest 567" },
            { title: "Contest 431" },
            { title: "Contest 119" },
            { title: "Contest 203" }
          ]
        },
        {
          "name": "Resources",
          "resources": [
            { title: "Resource 567" },
            { title: "Resource 431" },
            { title: "Resource 119" },
            { title: "Resource 203" }
          ]
        },
      ]
    };
  },
  methods: {
    onResize: function () {
      this.isMobile = window.innerWidth < 600;
      this.drawer = this.drawer && this.isMobile;
    },
  },
};
</script>
