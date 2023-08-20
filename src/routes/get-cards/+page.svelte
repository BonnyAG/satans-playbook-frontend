<svelte:head>
  <title>Satan's Playbook - {page.meta_title}</title>
  <meta name="description" content={page.meta_description} />
</svelte:head>

<script lang="ts">
  // Import functiosn
  import { goto } from '$app/navigation';

  // Import components
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  export let data;
  const {page} = data;

  console.log(page);
</script>

<!-- HEADER -->
<Header selectedPage="" />

<!-- MAIN CONTENT START -->
<main class="font-body text-lg tracking-wide container mx-auto px-8 lg:px-4 mt-10 flex flex-col">
  <!-- HEADING START -->
  <section class="flex flex-col mb-10 lg:w-[40rem] self-center">
    <h1 class="h1 font-heading tracking-wider uppercase text-5xl mb-2 text-white text-center">{page.heading}</h1>
    <p class="text-center self-center">{page.description}</p>
  </section>

  <!-- OPTIONS START -->
  {#each page.options as option}
    <section class="flex flex-col lg:w-[50rem] self-center">
      <!-- Title -->
      <h2 class="h2 font-heading tracking-wider uppercase text-4xl mt-4 text-white text-center mb-4">{option.title}</h2>
      <!-- Explanatory Text -->
      <p class="text-center self-center">{option.details}</p>

      <!-- BUTTONS START -->
      <div class="flex flex-col gap-y-4 md:gap-y-0 md:flex-row self-center gap-x-4 mt-4">
        {#if option.type === 'link'}
          <!-- LINK BUTTON -->
          <button type="button" disabled={option.url === "/"} on:click={() => goto(option.url)} class="btn variant-filled-primary">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>

            </span>
            <span>{option.link_label}</span>
          </button>
        {:else}
          {#each option.downloadable_files as file}
            <!-- DOWNLOAD BUTTON -->
            <a href={`https://satansplaybook.byu.edu/cms/${file.file.data.attributes.url}`} download={file.label} class="btn variant-filled-primary">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </span>
              <span>Download {file.label}</span>
            </a>
          {/each}
        {/if}
      </div>
      <!-- BUTTONS END -->
    {#if option.id < page.options.length}
      <hr class="my-8 border-1 bg-white" style="border-style: dashed;" />
    {/if}

    </section>
  {/each}
  <!-- OPTIONS END -->

</main>
<!-- MAIN CONTENT START -->

<!-- FOOTER -->
<Footer />