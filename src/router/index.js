import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'
import ScoreBoard from '../views/Scoreboard.vue'
import Submissions from '../views/Submissions.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/scoreboard',
        name: 'ScoreBoard',
        component: ScoreBoard
    },
    {
        path: '/submissions/:id',
        name: 'Submissions',
        component: Submissions
    },
]

const router = new VueRouter({
    routes
})

export default router