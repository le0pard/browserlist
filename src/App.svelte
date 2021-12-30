<svelte:options immutable="{true}" />

<script>
  import {memoize} from '@utils/memoize'
  import {browserInfoFromStr, sortBrowsers} from '@utils/browsers'
  import init, {browserslist_wasm as browserslistWasm} from './wasm'
  import ReloadPrompt from './components/ReloadPrompt.svelte'
  import GithubCorner from './components/GithubCorner.svelte'
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
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-input {
    font-size: 2.2rem;
    color: var(--inputColor);
    background-color: var(--inputBgColor);
    border: 1px solid var(--inputBorderColor);
    box-shadow: none;
    border-radius: 0.25rem;
    width: 80%;
    margin: 3rem 0;
    line-height: 1.5;
    padding: 0.3rem 0.2rem;
  }

  .main-input:focus {
    color: var(--inputFocusColor);
    background-color: var(--inputFocusBgColor);
    border-color: var(--inputFocusBorderColor);
    outline: 0;
  }

  .result {
    margin: 0.5rem 0;
    font-size: 2rem;
    line-height: 2.5rem;
  }
</style>

<GithubCorner />
<ReloadPrompt />
<main>
  <div class="input-wrapper">
    <input class="main-input" bind:value={browserInput} on:keyup={() => debounceBrowserList()} />
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


