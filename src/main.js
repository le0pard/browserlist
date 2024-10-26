// polyfills
import 'focus-visible'
// global css
import './css/app.css'
// svelte
import { mount } from 'svelte'
// main app
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')
})

export default app
