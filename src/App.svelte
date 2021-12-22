<script>
  import {memoize} from './memoize'
  import init, {browserslist_wasm as browserslistWasm} from './wasm'
  import ReloadPrompt from './ReloadPrompt.svelte'

  let browserInput = '>0.3%, Firefox ESR, not dead'

  const loadWasm = memoize(init)

  const getBrowserList = (str) => {
    try {
      return JSON.stringify(browserslistWasm(str))
    } catch (e) {
      return e.message
    }
  }
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
  <ReloadPrompt />
  <div class="input-wrapper">
    <input class="input" bind:value={browserInput} />
  </div>
  <div class="result">
    {#await loadWasm()}
      <p>Load wasm...</p>
    {:then}
      Result: {getBrowserList(browserInput)}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</main>
