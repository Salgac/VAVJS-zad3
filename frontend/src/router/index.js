import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Order from '../views/Order.vue'
import Fin from '../views/Fin.vue'
import Admin from '../views/Admin.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/order',
		name: 'Order',
		component: Order,
		props: true,
	},
	{
		path: '/final',
		name: 'Fin',
		component: Fin,
		props: true,
	},
	{
		path: '/admin',
		name: 'Admin',
		component: Admin
	},

]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
