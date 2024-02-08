<script>
  // Import games
  import GuessSingle from '$lib/games/GuessSingle.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ShoulderAngel from '$lib/games/ShoulderAngel.svelte';

  // Get Cards data
  export let data;
  const {cards} = data;
  const {game} = data;
  const {situationCards} = data;
</script>

<svelte:head>
  <title>Satan's Playbook - {game.attributes.title}</title>
</svelte:head>

<Header selectedPage="" />
  {#if game.id === 1}
    <ShoulderAngel cards={cards} game={game} situationCards={situationCards}/>
  {:else if game.id === 3}
    <GuessSingle cards={cards} game={game}/>
  {/if}
<Footer />
