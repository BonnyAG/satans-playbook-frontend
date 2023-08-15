<script lang="ts">
  async function getFooterData() {
    const result = await fetch('https://satansplaybook.byu.edu/cms/api/footer');
    const data = await result.json();
    
    return data.data.attributes;
  }

  let footerPromise = getFooterData();
</script>

<footer class="mx-auto my-12 container px-2 font-body text-md tracking-wide text-center sm:text-start flex flex-col xl:flex-row xl:justify-between">
  {#await footerPromise}
    <p>Loading footer...</p>
  {:then footer}
    <p>{footer.copyright}</p>
    <p>{footer.license_prefix} <a rel="license" class="text-maroon hover:underline" target="_blank" href={footer.license_url}>{footer.license_name}</a>.</p>
  {:catch error}
    <p class="text-red">{error.message}</p>
  {/await}
</footer>
