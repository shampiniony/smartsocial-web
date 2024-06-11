import { createApp } from 'vue'
import { GesturePlugin } from '@vueuse/gesture'
import { MotionPlugin } from '@vueuse/motion'
import 'leaflet/dist/leaflet.css';
import App from './App.vue'
import './assets/index.css'

const app = createApp(App)

app.use(GesturePlugin)
app.use(MotionPlugin)

app.mount('#app')