// polyfills
import 'focus-visible'
// global css
import './css/app.css'
// main app
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app
