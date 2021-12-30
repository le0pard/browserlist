<svelte:options immutable="{true}" />

<script>
  import {memoize} from '@utils/memoize'
  import {browserInfoFromStr, sortBrowsers} from '@utils/browsers'
  import init, {browserslist_wasm as browserslistWasm} from './wasm'
  import SWPrompt from './components/SWPrompt.svelte'
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
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-title {
    margin-top: 2rem;
  }

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
    margin: 1rem 0;
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

  .results-list {
    margin: 1rem;
    display: grid;
    grid-gap: 0.3rem;
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 500px) {
    .results-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1000px) {
    .results-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1500px) {
    .results-list {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 2000px) {
    .results-list {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (min-width: 2500px) {
    .results-list {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  @media (min-width: 3000px) {
    .results-list {
      grid-template-columns: repeat(7, 1fr);
    }
  }
</style>

<GithubCorner />
<SWPrompt />

<main>
  <div class="header-wrapper">
    <h1 class="header-title">Browserlist WASM</h1>
  </div>
  <div class="input-wrapper">
    <input class="main-input" bind:value={browserInput} on:keyup={() => debounceBrowserList()} />
  </div>
  <div class="result">
    {#await loadWasm()}
      Load wasm...
    {:then}
      {#if browsersResult}
        <div class="results-list">
          {#each browsersResult as browserInfo (browserInfo.key)}
            <BrowserInfo browserInfo={browserInfo} />
          {/each}
        </div>
      {:else}
        No browsers for provided browserslist
      {/if}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</main>


