<script>
  import init, {browserslist_wasm as browserslistWasm} from './../browserslist-wasm/pkg'

  init().then(() => {
    console.log(browserslistWasm('>1%, Firefox ESR, not dead, not ie 11, not op_mini all'))
  })
</script>

<style>

</style>

<main>

</main>
