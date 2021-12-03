import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Order from '../views/Order.vue'

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

]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
