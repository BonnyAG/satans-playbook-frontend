<svelte:head>
  <title>Satan's Playbook - {homepage.meta_title}</title>
  <meta name="description" content={homepage.meta_description} />
</svelte:head>

<script lang="ts">
  // Import functions
  import { goto } from '$app/navigation';
  import { createSearchStore, searchHandler } from '$lib/stores/search';
  import { onDestroy } from 'svelte';

  // Import components
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Card from '$lib/components/Card.svelte';

  // Get Cards data
  export let data;
  const {cards} = data;
  const {homepage} = data;

  let heroImg: string = "https://satansplaybook.byu.edu/cms/" + homepage.hero_image.data.attributes.formats.medium.url;
  
  const searchItems: any[] = cards.map((card: any) => ({
    ...card,
    searchTerms: `${card.id} ${card.attributes.title} ${card.attributes.idea_short} ${card.attributes.example_short} ${card.attributes.solution_short}`
  }));
  
  const searchStore = createSearchStore(searchItems);
  const unsubscribe = searchStore.subscribe(
    (model) => searchHandler(model)
  );
  
  onDestroy(() => {
    unsubscribe();
  });
</script>

<!-- HEADER -->
<Header selectedPage="index" />

<!-- MAIN CONTENT START -->
<main class="container mx-auto px-6 md:px-4 lg:px-2">

  <!-- Hero Heading -->
  <div class="flex flex-col md:flex-row gap-4 content-end pt-8 pb-16">
    <!-- Hero image -->
    <div style="background-image: url({heroImg});" alt={homepage.hero_image_alt_text} class="bg-cover w-full mb-4 md:mb-0 md:w-96 h-80 md:self-center shadow-2xl shadow-primary-900 hover:shadow-maroon transition rounded-3xl md:basis-1/2 lg:basis-1/3"></div>

    <!-- Hero Content -->
    <div class="flex content-end self-center text-center md:text-left flex-col basis-full md:basis-1/2 lg:basis-2/3 md:px-6 py-6">
      <h1 class="h1 font-heading tracking-wider uppercase text-4xl mb-4 text-white">{homepage.heading}</h1>
      <p class="font-body tracking-wide text-xl">{homepage.hero_content}</p>
      <button type="button" class="font-body self-center md:self-start tracking-wider text-lg btn w-32 mt-5 variant-filled" on:click={() => goto('/get-cards')}>Get Cards</button>
    </div>
  </div>

  <!-- Cards Heading -->
  <div class="flex flex-col mb-4 md:flex-row md:items-center">
    <h2 class=" self-center h2 font-heading uppercase tracking-wider text-3xl mb-2 md:mb-0 text-white md:w-[30%]">{homepage.card_heading}</h2>
    <input class="input h-10 p-4 md:w-[70%]" bind:value={$searchStore.search} title="Input (search)" type="search" placeholder="Search cards..." />
  </div>
  <hr />

  <!-- Display Cards in 4x4 Grid -->
  <div class="grid grid-cols-1 gap-x-24 sm:gap-x-16 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-y-4 lg:gap-y-8 py-4">
    {#each $searchStore.filtered as card}
        <Card
          id={card.id}
          title={card.attributes.title}
          idea={card.attributes.idea_short}
          example={card.attributes.example_short}
          solution={card.attributes.solution_short}
          hoverScale={true}
          clickable={true}
        />
    {/each}
  </div>
</main>
<!-- MAIN CONTENT END -->

<!-- FOOTER -->
<Footer />