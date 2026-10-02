<script lang="ts">
  async function getFooterData() {
    const api_footer = await fetch(
      "https://satansplaybook.byu.edu/cms/api/footer"
    );
    const cms_page_footer = await api_footer.json();

    return cms_page_footer.data;
  }

  let footerPromise = getFooterData();
</script>

<footer
  class="mx-auto my-12 container px-2 font-body text-md tracking-wide text-center sm:text-start flex flex-col xl:flex-row xl:justify-between"
>
  {#await footerPromise}
    <p>Loading footer...</p>
  {:then footer}
    <p>{footer.copyright}</p>
    <p>
      {footer.license_prefix}
      <a
        rel="license"
        class="text-white hover:text-maroon underline"
        target="_blank"
        href={footer.license_url}>{footer.license_name}</a
      >.
    </p>
  {:catch error}
    <p class="text-red">{error.message}</p>
  {/await}
</footer>
