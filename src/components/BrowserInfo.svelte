<svelte:options immutable="{true}" />

<script>
  export let browserInfo
</script>

<style>
  .browser-wrapper {
    display: table;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .browser-card {
    margin: 0.5rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .browser-icon {
    width: 3rem;
    height: 3rem;
    aspect-ratio: 1/1;
  }

  .browser-name {
    margin: 0 0.2rem;
  }
</style>

<div class="browser-wrapper">
  <div class="browser-card">
    <img class="browser-icon" src="{browserInfo.icon}" alt="{browserInfo.name}" />
    <span class="browser-name">{browserInfo.name}</span>
  </div>
</div>

