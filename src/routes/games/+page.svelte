<svelte:head>
  <title>Satan's Playbook - Games</title>
  <meta name="description" content={page.meta_description} />
</svelte:head>

<script lang="ts">
  // Import functions
  import { goto } from '$app/navigation';

  // Import components
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  export let data;
  const {games} = data;
  const {page} = data;

  function nav(id: number) {
    goto(`/games/${id}`)
  }
</script>

<!-- Display Header: Emphasis on "Games" link -->
<Header selectedPage="games" />

<!-- Main Content -->
<main class="font-body tracking-wide text-lg container px-8 lg:px-2 mx-auto mt-4">
  <!-- Hero Text -->
 <!-- GAMES START -->
 <div class="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-8">
    {#each games as game}
      <div class="bg-primary-200 w-auto h-auto p-12 shadow-2xl shadow-primary-900 hover:shadow-primary-700 transition rounded-3xl basis-1/3">
        <h2 class="text-3xl font-heading tracking-wider uppercase text-maroon mb-2">{game.attributes.title}</h2>
        <p class="text-primary-900">{game.attributes.description}</p>
        <button type="button" on:click={() => nav(game.id)} class="btn variant-filled-primary mt-4">Play Game</button>
      </div>
    {/each}
 </div>
 <!-- GAMES END -->
</main>

<Footer />


