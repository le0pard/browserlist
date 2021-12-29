<svelte:options immutable="{true}" />

<script>
  import {browserInfoFromStr} from '@utils/browsers'

  export let browserString = null

  let browserInfo = browserInfoFromStr(browserString)
</script>

<style>
  .icon {
    height: 50px;
    width: 50px;
  }
</style>

<div>
  {#if browserInfo.icon}
    <img class="icon" src="{browserInfo.icon}" alt="{browserInfo.name}" />
  {/if}
  {browserInfo.name}
</div>

