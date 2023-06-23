import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BusFreInfoSerByLine from '../views/BusFreInfoSerByLine'
import StaInfoSerByLine from "../views/StaInfoSerByLine";
import LiStSerByStation from "../views/LiStSerByStation";
import AlwStSerByLine from "../views/AlwStSerByLine";
import DirRouSerByStation from "../views/DirRouSerByStation";
import TimeInfoSerByLine from "../views/TimeInfoSerByLine";
import AddDeleteEdit from "../views/AddDeleteEdit";
import LineSerByTiSt from "../views/LineSerByTiSt";
import TiTaSerByTiStLi from "../views/TiTaSerByTiStLi";
import ChartLine from "@/component/chartLine";
import repeatStation from "@/component/repeatStation";
import changeLine from "@/component/changeLine";
import twoStationLine from "@/component/twoStationLine";
import stationSortByChangeRoad from "../component/stationSortByChangeRoad";
import routeSortBySnum from "../component/routeSortBySnum";
import routeSortByRuntime from "../component/routeSortByRuntime";
import nonRepeat from "../component/nonRepeat";
import SPathSerByStation from "../views/SPathSerByStation";
import Chart from "@/component/chart"
import directStation from "../component/directStation";
import stationGroup from "../component/stationGroup";
import group from "../component/group";
import chart from "../component/chart";
import busLine from "../component/busLine";
Vue.use(VueRouter)

const routes = [
    {

        path: '/',
        redirect: '/busLine'
    },
    {
        path: '/busLine',
        name: 'busLine',
        component: busLine,
    },
    {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[{
          name:'BusFreInfoSerByLine',
          path:'busFreInfoSerByLine',
          component: BusFreInfoSerByLine
        },
        {
            name:'StaInfoSerByLine',
            path:'staInfoSerByLine',
            component: StaInfoSerByLine
        },
        {
            name:'LiStSerByStation',
            path:'liStSerByStation',
            component: LiStSerByStation
        },
        {
            name:'AlwStSerByLine',
            path:'alwStSerByLine',
            component: AlwStSerByLine
        },
        {
            name:'DirRouSerByStation',
            path:'dirRouSerByStation',
            component: DirRouSerByStation
        },
        {
            name:'TimeInfoSerByLine',
            path:'timeInfoSerByLine',
            component: TimeInfoSerByLine
        },
        {
            name:'AddDeleteEdit',
            path:'addDeleteEdit',
            component: AddDeleteEdit
        },

        {
            name:'LineSerByTiSt',
            path:'lineSerByTiSt',
            component: LineSerByTiSt
        },
        {
            name: 'TiTaSerByTiStLi',
            path: 'tiTaSerByTiStLi',
            component: TiTaSerByTiStLi
        },
        {
            name:'ChartInfo',
            path:'chartInfo',
            component: Chart
        },
        {
            name:'ChartLine',
            path:'chartLine',
            component: ChartLine
        },
        {
            name:'RepeatStation',
            path:'repeatStation',
            component: repeatStation
        },
        {
            name:'changeLine',
            path:'changeLine',
            component: changeLine
        },
        {
            name:'TwoStationLine',
            path:'twoStationLine',
            component: twoStationLine
        },
        {
            name:'StationSortByChangeRoad',
            path:'stationSortByChangeRoad',
            component: stationSortByChangeRoad
        },
        {
            name:'RouteSortBySnum',
            path:'routeSortBySnum',
            component: routeSortBySnum
        },
        {
            name:'RouteSortByRuntime',
            path:'routeSortByRuntime',
            component: routeSortByRuntime
        },
        {
            name:'NonRepeat',
            path:'nonRepeat',
            component: nonRepeat
        },
        {
            name:'SPathSerByStation',
            path:'sPathSerByStation',
            component: SPathSerByStation
        },
        {
            name:'directStation',
            path:'directStation',
            component: directStation
        },
        {
            name:'stationGroup',
            path:'stationGroup',
            component: stationGroup
        },
        {
            name:'group',
            path:'group',
            component: group
        },
        {
            name:'chart',
            path:'chart',
            component: chart
        }
    ]




  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  // {
  //   path: '/menu',
  //   name: 'Menu',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Menu.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router


