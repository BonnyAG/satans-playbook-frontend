<script>
  // Import games
  import GuessSingle from '$lib/games/GuessSingle.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  // Get Cards data
  export let data;
  const {cards} = data;
  const {game} = data;
</script>

<Header selectedPage="" />
<main class="font-body tracking-wide text-lg container px-8 lg:px-4 mx-auto mt-10">
  <section class="my-4 text-center">
    <h1 class="h1 font-heading tracking-wider uppercase text-5xl mb-5 text-white text-center">{game.attributes.title}</h1>
    <p>{game.attributes.description}</p>
  </section>
  <GuessSingle cards={cards} />
</main>
<Footer />
