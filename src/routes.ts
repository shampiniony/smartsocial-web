import homePage from "./pages/home.page.vue";
import placePage from "./pages/place.page.vue";

export default {
	routes: [
		{
			path: '/place',
			name: 'Place',
			component: placePage,
		},
		{
			path: '/',
			name: 'Home',
			component: homePage,
		},
	],
};
