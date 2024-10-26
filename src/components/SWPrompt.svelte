<script>
  import { useRegisterSW } from 'virtual:pwa-register/svelte'

  const { needRefresh, updateServiceWorker } = useRegisterSW({})

  const close = (e) => {
    e.preventDefault()
    needRefresh.set(false)
  }
</script>

<style>
  .sw-message {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sw-wrapper {
    margin-top: 2rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    border: 1px solid var(--inputBorderColor);
  }

  .sw-message-content {
    margin: 0 0.3rem;
    font-size: 1.2rem;
  }

  .sw-button {
    color: var(--buttonColor);
    background-color: var(--buttonBgColor);
    border: 1px solid var(--buttonBorderColor);
    cursor: pointer;
    padding: 0.5rem;
  }

  .sw-button:hover,
  .sw-button:active {
    color: var(--buttonHoverColor);
    background-color: var(--buttonHoverBgColor);
  }

  .sw-reload-button {
    margin: 0 0.5rem;
  }
</style>

{#if $needRefresh}
  <div class="sw-message" role="alert">
    <div class="sw-wrapper">
      <div class="sw-message-content">New content available, click on reload button to update</div>
      <button
        class="sw-button sw-reload-button"
        onclick={(e) => {
          e.preventDefault()
          updateServiceWorker(true)
        }}
      >
        Reload
      </button>
      <button class="sw-button" onclick={close}> Close </button>
    </div>
  </div>
{/if}
