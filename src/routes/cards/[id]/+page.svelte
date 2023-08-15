<svelte:head>
  <!-- Add Dynamic title to the url -->
  <title>Satan's Playbook - {card.title}</title>
  <meta name="description" content={card.idea_short} />
</svelte:head>

<script>
  // Import Components
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Card from '$lib/components/Card.svelte';
  import Reference from '$lib/components/Reference.svelte';

  let badgeColors = [
    {type: "scriptures", name:"Scriptures", style: "bg-primary-300 text-primary-900"},
    {type: "prophets_and_apostles", name:"Prophets & Apostles", style: "bg-secondary-300 text-secondary-900"},
    {type: "social_science", name:"Social Science", style: "bg-tertiary-300 text-tertiary-900"},
    {type: "article", name:"Article", style: "bg-success-300 text-success-900"},
    {type: "research_paper", name:"Research Paper", style: "bg-surface-300 text-surface-900"}
  ]

  // Get Cards data
  export let data;
  const {card} = data;
</script>

<Header selectedPage="" />
<main class="container mx-auto mt-4">
  <!-- Hero Text -->
  <div class="flex flex-col-reverse md:flex-row gap-4 content-end my-12">
    <!-- Card -->
    <Card
      class="self-center md:self-start"
      id={card.id}
      singleCardResponsive={true}
      title={card.title}
      idea={card.idea_short}
      example={card.example_short}
      solution={card.solution_short}
      hideOnMobile={true}
    />

    <!-- Hero Content -->
    <div class="font-body tracking-wider text-lg flex content-end flex-col lg:w-[80%] px-6">
      <!-- Card Title -->
      <div class="flex flex-wrap gap-y-3 justify-between content-end mt-[-1rem]">
        <h1 class="text-4xl font-heading uppercase tracking-wider font-bold self-end">{card.title}</h1>
        <a href="/" type="button" class="btn variant-filled w-36 md:w-48 self-center mb-1">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </span>
          <span class="font-body tracking-wider text-md">Back to Cards</span>
        </a>
      </div>
      <hr class="mt-2 mb-5"/>

      <!-- Definition of the Spiritual Fallacy -->
      <p ><b>Definition: </b>{card.idea_full == null ? card.idea_short : card.idea_full}</p>

      <!-- Example -->
      <div class="text-white bg-maroon rounded-xl p-3 mt-8 ">
        <h2 class="text-2xl mb-2 font-heading tracking-wider uppercase font-bold">What does this look like?</h2>
        <p>{card.example_long == null ? card.example_short : card.example_long}</p>
      </div>

      <!-- Solution -->
      <h2 class="text-2xl mt-8 mb-2 font-heading tracking-wider uppercase font-bold">What do I do about it?</h2>
      <p>{card.solution_long == null ? card.solution_short : card.solution_long}</p>

      <!-- Resources -->
      <h2 class="text-2xl mt-8 mb-2 font-heading tracking-wider uppercase font-bold">More Resources</h2>
      <nav class="lg:list-nav">
        <ul>
          {#if card.link_reference.length > 0}
            {#each card.link_reference as reference}
              <Reference linkType="externalLink" link={reference} />
            {/each}
          {/if}
          {#if card.scripture_references.length > 0}
            {#each card.scripture_references as reference}
              <Reference linkType="scripture" link={reference} />
            {/each}
          {/if}
        </ul>
      </nav>
    </div>
  </div>
</main>

<!-- Footer -->
<Footer />