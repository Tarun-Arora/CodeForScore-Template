<template>
  <v-container>
    {{ scoreboard.contest }}
    <br />
    {{ startTime }}
    <br />
    {{ endTime }}
    <br />
    {{ duration }}
    <br />
    {{ registrations }}
    <br />
    <li v-for="participant in participants" :key="participant.id">
      {{ participant }}
    </li>
    <br>
    {{ problems }}
  </v-container>
</template>

<script>
import scoreboard from "../assets/scoreboard.json";
import problems from "../assets/problems.json";
import { parseTime, parseDuration } from "../helpers"

export default {
  components: {},
  data() {
    return {
      scoreboard: scoreboard,
      startTime: Date(),
      duration: null,
      endTime: Date(),
      registrations: null,
      participants: [],
      problems: null
    };
  },
  methods: {
    sortByKeys(keys){
      this.participants.sort((a,b)=> {
        keys.forEach(arr=>{
          let key=arr[0], flag=arr[1]
          if(a[key]!=b[key]) 
            return flag*((a[key]>b[key])?1:-1);
          return 0;
        })
      })
    },
    parseData() {
      this.startTime = parseTime(scoreboard.startTime);
      this.endTime = new Date(
        this.startTime.getTime() + scoreboard.duration * 1000
      );
      this.duration = parseDuration(scoreboard.duration);
      this.registrations = scoreboard.registrations;
      this.problems = problems

      function Participant(participant) {
        this.username = participant.username;
        this.id = participant.id;
        this.rank = participant.rank;
        this.penaltyTime = participant.penaltyTime;
        this.submissions = participant.submissions;
        this.acSubmissionId = participant.acSubmissionId;
        this.totalPenalty = participant.penaltyTime.reduce((x, y) => x + y, 0);
        this.score = participant.acSubmissionId.filter((x) => x !== -1).length;
      }
      scoreboard.result.forEach((participant) => this.participants.push(new Participant(participant)));
      this.sortByKeys([["rank",-1]])
    },
  },
  mounted() {
    this.parseData();
  },
};
</script>