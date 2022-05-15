<template>
  <div>
    <v-footer dark padless>
      <v-card flat tile width="100%" class="red lighten-2 white--text text-center">
        <v-card-text>
          <h1 class="pb-2 white--text">You can find us at</h1>
          <a
            target="_blank"
            v-bind:href="social.url"
            v-bind:key="i"
            v-for="social,i in socials"
          >
            <v-btn class="mx-4 white--text" icon>
              <v-icon size="24px">{{ social.icon }}</v-icon>
            </v-btn>
          </a>
        </v-card-text>

        <v-card-text class="pt-0 text-left text-md-center">
          <v-expansion-panels accordion v-model="panel" multiple>
            <v-expansion-panel
              v-for="(item, i) in items"
              :key="i"
              class="red lighten-2 col-md-3 col-12 elevation-0"
            >
              <h3 class="d-none d-md-block py-2">{{ item.name }}</h3>
              <v-expansion-panel-header class="d-md-none">{{
                item.name
              }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <li v-for="tag,i in item.tags" :key="i">
                  <a target="_blank" v-bind:href="tag.url" class="white--text"
                    >{{ tag.urlname }}
                  </a>
                </li>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          Made By
          <a class="white--text" href="https://www.youtube.com/">Tarun Arora</a> with <v-icon>mdi-xml</v-icon> and <v-icon>mdi-coffee</v-icon>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    panel: [],
    socials: [
      {
        name: "facebook",
        icon: "mdi-facebook",
        url: "https://www.youtube.com/",
      },
      {
        name: "twitter",
        icon: "mdi-twitter",
        url: "https://www.youtube.com/",
      },
      { name: "google", icon: "mdi-google", url: "https://www.youtube.com/" },
      {
        name: "linkedin",
        icon: "mdi-linkedin",
        url: "https://www.youtube.com/",
      },
      {
        name: "instagram",
        icon: "mdi-instagram",
        url: "https://www.youtube.com/",
      },
    ],
    items: [
      {
        name: "Contests",
        tags: [
          {
            urlname:  "Contest 567",
            url: "https://www.youtube.com/",
          },
          {
            urlname:  "Contest 431",
            url: "https://www.youtube.com/",
          },
          {
            urlname:  "Contest 119",
            url: "https://www.youtube.com/",
          },
          {
            urlname:  "Contest 203",
            url: "https://www.youtube.com/",
          },
        ],
      },
      {
        name: "Blogs",
        tags: [
          { urlname: "Graphs", url: "https://www.youtube.com/" },
          { urlname: "Dynamic Programming", url: "https://www.youtube.com/" },
          { urlname: "Binary Search", url: "https://www.youtube.com/" },
          { urlname: "Segment Tree", url: "https://www.youtube.com/" },
          { urlname: "Prefix Sum", url: "https://www.youtube.com/" },
        ],
      },
      {
        name: "Resources",
        tags: [
          { urlname: "Editorials", url: "https://www.youtube.com/" },
          { urlname: "eBooks", url: "https://www.youtube.com/" },
          { urlname: "Past Contests", url: "https://www.youtube.com/" },
          { urlname: "Problem Set", url: "https://www.youtube.com/" },
          { urlname: "Mentors", url: "https://www.youtube.com/" },
        ],
      },
      {
        name: "Know About Us",
        tags: [
          { urlname: "Help Center", url: "https://www.youtube.com/" },
          { urlname: "Contact Us", url: "https://www.youtube.com/" },
          { urlname: "Privacy Policy", url: "https://www.youtube.com/" },
          { urlname: "Terms", url: "https://www.youtube.com/" },
          { urlname: "Login", url: "https://www.youtube.com/" },
        ],
      },
    ],
  }),

  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    onResize() {
      if (window.innerWidth >= 960) {
        this.panel = [...Array(4).keys()].map((k, i) => i);
      } else {
        this.panel = [];
      }
    },
  },
};
</script>
