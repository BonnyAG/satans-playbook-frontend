<svelte:head>
  <title>Satan's Playbook - {page.meta_title}</title>
  <meta name="description" content={page.meta_description} />
</svelte:head>

<script lang="ts">
  // Import components
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import TeamMemberCard from '$lib/components/TeamCard.svelte';

  export let data;
  const {page} = data;
</script>

<!-- HEADER -->
<Header selectedPage="about" />

<!-- MAIN CONTENT START -->
<main class="font-body tracking-wide text-lg container px-8 lg:px-4 mx-auto mt-10">

  <!-- HERO CONTENT START -->
  <section class="mt-8 mb-14 text-center">
    <h1 class="h1 font-heading tracking-wider uppercase text-5xl mb-5 text-white text-center">{page.heading}</h1>
    <p>{page.hero_content}</p>
  </section>
  <!-- HERO CONTENT START -->

  <!-- TEAM START -->
  <section>
    <!-- Header -->
    <h1 class="h1 font-heading tracking-wider uppercase text-5xl mb-5 text-white text-center">{page.team_heading}</h1>

    <!-- TEAM CARDS START -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 grid-flow-row justify-items-center gap-y-8 gap-x-4 py-4">
      {#each page.team as member}
        <TeamMemberCard
          imgSrc={`https://satansplaybook.byu.edu/cms/${member.profile_image.data.attributes.url}`}
          name={member.name}
          role={member.role}
          description={member.about_text}
        />
      {/each}
    </div>

  </section>
</main>
<!-- MAIN CONTENT START -->

<!-- FOOTER -->
<Footer />