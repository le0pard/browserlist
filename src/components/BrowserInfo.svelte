<svelte:options immutable="{true}" />

<script>
  export let browserInfo
</script>

<style>
  .icon {
    height: 50px;
    width: 50px;
  }
</style>

<div>
  <img class="icon" src="{browserInfo.icon}" alt="{browserInfo.name}" />
  {browserInfo.name}
</div>

