<script>
  import { onMount } from 'svelte'
  import {memoize} from './utils/memoize'
  import init, {browserslist_wasm as browserslistWasm} from './wasm'
  import ReloadPrompt from './ReloadPrompt.svelte'

  let browserInput = '>0.3%, Firefox ESR, not dead'
  let browsersResult = ''
  let timeout = null

  const loadWasm = memoize(init)

  const getBrowserList = () => {
    try {
      return JSON.stringify(browserslistWasm(browserInput))
    } catch (e) {
      return e.message
    }
  }

  const debounceBrowserList = (wait = 300) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      browsersResult = getBrowserList()
    }, wait)
  }

  onMount(() => {
    debounceBrowserList()
  })
</script>

<style>
  .input-wrapper {
    width: 100%;
  }

  .input {
    box-sizing: border-box;
    margin: 0.5rem;
    font-size: 2rem;
    width: 90%;
  }

  .result {
    margin: 0.5rem 0;
    font-size: 2rem;
  }
</style>

<main>
  <div class="input-wrapper">
    <input class="input" bind:value={browserInput} on:keyup={() => debounceBrowserList()} />
  </div>
  <div class="result">
    {#await loadWasm()}
      <p>Load wasm...</p>
    {:then}
      Result: {browsersResult}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</main>

<ReloadPrompt />
