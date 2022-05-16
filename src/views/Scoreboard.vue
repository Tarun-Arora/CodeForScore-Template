<template>
  <div>
    <Navbar />
    <v-container>
      <v-card
        class="mx-auto elevation-20 my-5"
        color="red lighten-4"
        width="fit-content"
      >
        <v-row justify="space-between">
          <v-col cols="12">
            <v-card-title>{{ scoreboard.contest }}</v-card-title>
            <v-card-subtitle>
              <div>
                <v-icon> mdi-calendar </v-icon>
                {{ String(startTime).substr(0, 24) }} -
                {{ String(endTime).substr(0, 24) }}
              </div>
              <div>
                <v-icon> mdi-clock </v-icon>
                Duration: {{ converttoHHMMSS(duration) }} hours
              </div>
              <div>
                <v-icon> mdi-account-group-outline </v-icon>
                Participants Registered: {{ registrations }}
              </div>
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-divider dark></v-divider>
      </v-card>

      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            outlined
            height="fit-content"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-card class="d-flex justify-center mb-6" flat tile>
        <v-switch
          v-model="searchByProblems"
          label="Enable Filter By Problems Solved"
          @click="probList = []"
        ></v-switch>
        <div class="d-flex flex-row"></div>
      </v-card>

      <v-card class="d-flex justify-center" flat tile>
        <v-checkbox
          class="px-2 m-3"
          v-model="probList"
          v-for="(value, key) in problems"
          :key="key"
          :label="key"
          :value="key"
          v-show="searchByProblems"
        ></v-checkbox>
      </v-card>

      <v-row justify="center">
        <v-col cols="6"> </v-col>
      </v-row>

      <v-layout v-resize="onResize" column>
        <v-data-table
          :headers="headers"
          :items="participants.filter(checkSolved)"
          :search="search"
          :hide-default-headers="isMobile"
          :sort-by="['rank']"
          :sort-desc="[false]"
          class="grey lighten-2 grey--text mb-10"
          multi-sort
        >
          <template v-slot:item="{ item }">
            <tr v-if="!isMobile">
              <td v-for="(value, key) in item" :key="key">
                <div
                  class="d-flex justify-center"
                  v-if="key === 'username' || key === 'rank'"
                >
                  <span class="black--text">{{ value }}</span>
                </div>
                <div class="d-flex justify-center" v-else-if="key === 'score'">
                  <span
                    ><b class="black--text">{{ value[0] }}</b
                    ><br />{{ converttoHHMMSS(value[1]) }}</span
                  >
                </div>
                <div
                  class="d-flex justify-center"
                  v-else-if="value[2] != -1"
                  @click="$router.push(`/submissions/${value[2]}`)"
                  style="cursor: pointer"
                >
                  <span
                    ><b class="green--text"
                      >1{{ value[1] > 1 ? `(${value[1] - 1})` : "" }}</b
                    ><br />{{ converttoHHMMSS(value[0]) }}</span
                  >
                </div>
                <div class="red--text d-flex justify-center" v-else>
                  <span
                    ><b>0{{ value[1] > 0 ? `(${value[1]})` : "" }}</b></span
                  >
                </div>
              </td>
            </tr>
            <tr class="mobile" v-else>
              <v-container class="d-flex flex-column">
                <v-row v-for="(value, key) in headers" :key="key">
                  <v-col class="font-weight-black black--text">{{
                    value.text
                  }}</v-col>
                  <v-spacer></v-spacer>
                  <v-col
                    v-if="value.value === 'username' || value.value === 'rank'"
                    ><div class="black--text d-flex justify-center"><span>{{ item[value.value] }}</span></div></v-col
                  >

                  <v-col
                    v-else-if="value.value === 'score'"
                    class="d-flex flex-column"
                  >
                    <div class="d-flex justify-center">
                      <span
                        ><b class="black--text">{{ item[value.value][0] }}</b
                        ><br />{{ converttoHHMMSS(item[value.value][1]) }}</span
                      >
                    </div>
                  </v-col>

                  <v-col
                    v-else-if="item[value.value][2] !== -1"
                    class="d-flex flex-column"
                    @click="$router.push(`/submissions/${item[value.value][2]}`)"
                    style="cursor: pointer"
                  >
                    <div class="d-flex justify-center">
                      <span
                        ><b class="green--text"
                          >1{{
                            item[value.value][1] > 1
                              ? `(${item[value.value][1] - 1})`
                              : ""
                          }}</b
                        ><br />{{ converttoHHMMSS(item[value.value][0]) }}</span
                      >
                    </div>
                  </v-col>

                  <v-col v-else>
                    <div class="d-flex justify-center">
                    <span class="red--text">0{{
                        item[value.value][1] > 0
                          ? `(${item[value.value][1]})`
                          : ""
                      }}</span
                    >
                    </div>
                  </v-col>
                </v-row>
              </v-container>
              <v-divider class="black" />
            </tr>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import scoreboard from "../assets/scoreboard.json";
import problems from "../assets/problems.json";
import { parseTime, parseDuration } from "../helpers";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: { Navbar, Footer },
  data() {
    return {
      scoreboard: scoreboard,
      startTime: Date(),
      duration: null,
      endTime: Date(),
      registrations: null,
      participants: [],
      problems: [],
      requiredSolves: [],
      searchByProblems: false,
      probList: [],

      selected: [],
      search: "",
      isMobile: false,
      headers: [
        {
          text: "Rank",
          value: "rank",
          align: "center",
        },
        {
          text: "Username",
          value: "username",
          align: "center",
        },
        {
          text: "Score",
          value: "score",
          align: "center",
        },
      ],
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
    checkSolved(participant) {
      for (let i in this.probList) {
        if (participant[this.probList[i]][2] == -1) return false;
      }
      return true;
    },
    converttoHHMMSS(timeInSeconds) {
      let a = parseDuration(timeInSeconds);
      return (
        (a[0] < 10 ? "0" + a[0] : a[0]) +
        ":" +
        (a[1] < 10 ? "0" + a[1] : a[1]) +
        ":" +
        (a[2] < 10 ? "0" + a[2] : a[2])
      );
    },
    parseData() {
      this.startTime = parseTime(scoreboard.startTime);
      this.endTime = new Date(
        this.startTime.getTime() + scoreboard.duration * 1000
      );
      this.duration = scoreboard.duration;
      this.problems = problems;
      this.registrations = scoreboard.registrations;
      for (let key in problems)
        this.headers.push({ text: key, value: key, align: "center" });

      scoreboard.result.forEach((participant) => {
        let data = {
          rank: participant.rank,
          username: participant.username,
          score: [
            participant.acSubmissionId.filter((x) => x !== -1).length,
            participant.penaltyTime.filter((problem,index) => participant.acSubmissionId[index]!==-1).reduce((x, y) => x + y, 0),
          ],
        };
        for (let key in problems) {
          let index = problems[key].id;
          data[key] = [
            participant.penaltyTime[index],
            participant.submissions[index],
            participant.acSubmissionId[index],
          ];
        }
        this.participants.push(data);
      });
    },
  },
  mounted() {
    this.parseData();
  },
};
</script>

<style scoped>
span {
  width: fit-content;
  text-align: center;
}

th {
  text-align: center;
}
</style>