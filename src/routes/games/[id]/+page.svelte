<script>
  // Import components
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  // Import games
  import GuessSingle from "$lib/games/GuessSingle.svelte";
  import FieryDoodles from "$lib/games/FieryDoodles.svelte";
  import ShoulderAngel from "$lib/games/ShoulderAngel.svelte";

  // Get Cards data
  export let data;
  const { cards } = data;
  const { game } = data;
  const { situationCards } = data;
</script>

<svelte:head>
  <title>Satan's Playbook - {game.title}</title>
</svelte:head>

<Header selectedPage="" />
{#if game.id === 1}
  <ShoulderAngel {cards} {game} {situationCards} />
{:else if game.id === 2}
  <FieryDoodles {cards} {game} />
{:else if game.id === 3}
  <GuessSingle {cards} {game} />
{/if}
<Footer />
