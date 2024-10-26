<script>
  import { memoize } from '@utils/memoize'
  import { browserInfoFromStr, sortBrowsers } from '@utils/browsers'
  import init, { browserslist_wasm as browserslistWasm } from './wasm'
  import SWPrompt from './components/SWPrompt.svelte'
  import GithubCorner from './components/GithubCorner.svelte'
  import BrowserInfo from './components/BrowserInfo.svelte'

  let browserInput = $state('>0.3%, not IE 11, not dead')
  let browsersResult = $state(null)
  let timeout = $state(null)

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

  const loadWasm = memoize(() => init().then(() => updateResultsForBrowsers()))
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
    outline: none;
  }

  .loader-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @keyframes loader-animation {
    0% {
      background-position: right;
    }
  }

  .loader-spinner {
    width: 120px;
    height: 20px;
    background: linear-gradient(90deg, var(--baseColor) 33%, #0005 50%, var(--baseColor) 66%)
      var(--bgColor);
    background-size: 300% 100%;
    animation: loader-animation 1s infinite linear;
  }

  .loader-text {
    font-size: 1rem;
  }

  .error-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .error-text {
    font-size: 1rem;
    font-weight: 600;
    color: var(--dangerColor);
  }

  .result {
    margin: 0.5rem 0;
    font-size: 2rem;
    line-height: 2.5rem;
  }

  .results-list {
    margin: 1rem;
    columns: 20rem auto;
  }

  .empty-results-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<GithubCorner />
<SWPrompt />

<main>
  <div class="header-wrapper">
    <h1 class="header-title">Browserlist WASM</h1>
  </div>
  <div class="input-wrapper">
    <input class="main-input" bind:value={browserInput} onkeyup={() => debounceBrowserList()} />
  </div>
  <div class="result">
    {#await loadWasm()}
      <div class="loader-wrapper">
        <div class="loader-spinner"></div>
        <div class="loader-text">Load wasm module...</div>
      </div>
    {:then}
      {#if browsersResult}
        <div class="results-list">
          {#each browsersResult as browserInfo (browserInfo.key)}
            <BrowserInfo browserInfo={browserInfo} />
          {/each}
        </div>
      {:else}
        <div class="empty-results-wrapper">
          <div class="empty-results-text">No browsers for provided browserslist</div>
        </div>
      {/if}
    {:catch error}
      <div class="error-wrapper">
        <div class="error-text">Error to load wasm module: {error.message}</div>
      </div>
    {/await}
  </div>
</main>
