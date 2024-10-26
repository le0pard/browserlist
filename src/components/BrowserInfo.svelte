<script>
  let { browserInfo } = $props()
</script>

<style>
  .browser-wrapper {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    page-break-inside: avoid;
    break-inside: avoid;
    margin: 0 0.5rem 1rem;
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
  <img class="browser-icon" src={browserInfo.icon} alt={browserInfo.name} />
  <span class="browser-name">{browserInfo.name}</span>
</div>
