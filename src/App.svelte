<svelte:options immutable="{true}" />

<script>
  import {memoize} from '@utils/memoize'
  import {browserInfoFromStr, sortBrowsers} from '@utils/browsers'
  import init, {browserslist_wasm as browserslistWasm} from './wasm'
  import ReloadPrompt from './components/ReloadPrompt.svelte'
  import BrowserInfo from './components/BrowserInfo.svelte'

  let browserInput = '>0.3%, not IE 11, not dead'
  let browsersResult = null
  let timeout = null

  const getBrowserList = () => {
    try {
      return browserslistWasm(browserInput).map(browserInfoFromStr).sort(sortBrowsers)
    } catch (e) {
      return null
    }
  }

  const updateResultsForBrowsers = () => {
    browsersResult = getBrowserList()
  }

  const debounceBrowserList = (wait = 300) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => updateResultsForBrowsers(), wait)
  }

  const loadWasm = memoize(() => (
    init().then(() => updateResultsForBrowsers())
  ))
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
    line-height: 2.5rem;
  }
</style>


<ReloadPrompt />

<main>
  <div class="input-wrapper">
    <input class="input" bind:value={browserInput} on:keyup={() => debounceBrowserList()} />
  </div>
  <div class="result">
    {#await loadWasm()}
      Load wasm...
    {:then}
      {#if browsersResult}
        {#each browsersResult as browserInfo (browserInfo.key)}
          <BrowserInfo browserInfo={browserInfo} />
        {/each}
      {:else}
        No browsers for provided browserslist
      {/if}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</main>


