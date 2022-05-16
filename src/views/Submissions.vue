<template>
  <div>
    <Navbar />
    <v-container>
      <v-card
        class="mx-auto elevation-20 my-5"
        color="red lighten-4"
        width="fit-content"
        v-if="details!=null"
      >
        <v-row justify="space-between">
          <v-col cols="12">
            <v-card-title>Submission Details</v-card-title>
            <v-card-subtitle>
              <div>
                <v-icon> mdi-account </v-icon>
                Submitted By: {{ details.username }}
              </div>
              <div>
                <v-icon> mdi-clock </v-icon>
                Submitted At: {{ Date(details.time).substr(0, 24) }}
              </div>
              <div>
                <v-icon> mdi-clock </v-icon>
                Judged At: {{ Date(details.time).substr(0, 24) }}
              </div>
              <div>
                <v-icon>mdi-file-presentation-box</v-icon>
                Verdict:
                <b :class="details.status == 1 ? 'green--text' : 'red--text'">{{
                  details.status == 1 ? "Accepted" : "Failed"
                }}</b>
              </div>
              <div>
                <v-icon>mdi-language-cpp</v-icon>
                Programming Language: {{ details.language }}
              </div>
              <div>
                <v-icon>mdi-file-question-outline</v-icon>
                Problem: {{details.problem}}-{{ problems[details.problem].name }}
              </div>
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-divider dark></v-divider>
      </v-card>
      <h2>Submitted Code: </h2>
      <textarea v-model="code" class="mb-10" id="editor"></textarea>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import problems from "../assets/problems.json";
import * as CodeMirror from 'codemirror';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css"
import "codemirror/mode/clike/clike.js"

export default {
  components: { Navbar, Footer },
  data() {
    return {
      code: "",
      details: null,
      problems: null,
      editor: null,
    };
  },
  methods: {
    configureCodeMirror(a){
      this.code=a;
      this.editor=CodeMirror.fromTextArea(document.getElementById('editor'), {
        theme: 'dracula',
        lineNumbers: true,
        line: true,
        matchBrackets: true,
        mode: 'text/x-c++src'
      })
      this.editor.setSize(-1,600);
      this.editor.setValue(a);
    }
  },
  created: function () {
    fetch(`submissions/${this.$route.params.id}.json`)
      .then((response) => response.json())
      .then((data) => (this.details = data));
    fetch(`submissions/${this.$route.params.id}.txt`)
      .then((response) => response.text())
      .then((data) => {this.code = data; this.configureCodeMirror(data)});
  },
  mounted() {
    this.problems = problems;
  },
};
</script>