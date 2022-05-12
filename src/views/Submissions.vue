<template>
  <v-container> 
    Submission 
    <br>
    {{code}}
    <br>
    {{details}}
  </v-container>
</template>

<script>
// import submissionDetails from `../assets/submissions/${this.$router.param.int}`

export default {
  components: {},
  data() {
    return {
      code: "",
      details: null,
    };
  },
  methods: {
    
  },
  created: function () {
    fetch(`submissions/${this.$route.params.id}.json`)
      .then((response) => response.json())
      .then((data) => (this.details = data));
    fetch(`submissions/${this.$route.params.id}.txt`)
      .then((response) => response.text())
      .then((data) => (this.code = data));
  },
};
</script>