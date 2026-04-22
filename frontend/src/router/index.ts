import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Vehicles from '../views/Vehicles.vue'
import Bookings from '../views/Bookings.vue'
import Login from '../views/login.vue'
import Signup from '../views/signup.vue'
import Payment from '../views/payment.vue'
import MyVehicle from '../views/Myvehicle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: Vehicles
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: Bookings
    },
    {
      path: '/myvehicle',
      name: 'myvehicle',
      component: MyVehicle
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup', 
      name: 'signup',
      component: Signup
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashboard.vue')
    },
    {
      path: '/admin/vehicles',
      name: 'adminVehicles',
      component: () => import('../views/AdminVehicles.vue')
    },
    {
      path: '/admin/bookings',
      name: 'adminBookings',
      component: () => import('../views/AdminBookings.vue')
    }
  ]
})

export default router

