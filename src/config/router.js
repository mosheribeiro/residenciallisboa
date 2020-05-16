import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Maintenance from "@/components/task/Maintenance";
import Task from "@/components/task/Task";
import Auth from '@/components/auth/Auth'

Vue.use(VueRouter)

const routes = [{
    name:'home',
    path:'/',
    component: Home
},{
    name:'adminPages',
    path:'/admin',
    component: AdminPages
},{
    name:'Maintenance',
    path:'/task/maintenance',
    component: Maintenance
},{
    name:'Task',
    path:'/task/task',
    component: Task
},{
    name: 'auth',
    path: '/auth',
    component: Auth
}]

export default  new VueRouter({
    mode: 'history',
    routes
})