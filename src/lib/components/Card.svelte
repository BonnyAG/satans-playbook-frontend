<script lang="ts">
  // IMPORTS
  // EXTERNAL FUNCTIONS
  import { goto } from '$app/navigation';

  // PROPS
  // Card Content
  export let id: number;
  export let title: string;
  export let idea: string;
  export let example: string;
  export let solution: string;
  // Utilities
  export let itemsToHide = [];
  export let hoverScale = false;
  export let hideOnMobile = false;
  export let singleCardResponsive = false;
  export let clickable = false; // Set to true to redirect to the individual card page
</script>

<!-- CARD START -->
<div class="{hoverScale ? 'hover:scale-110' : ''} {hideOnMobile ? 'hidden lg:block' : ''} {singleCardResponsive ? 'mt-4 self-center md:self-start' : ''} bg-white border-4 border-surface-500 shadow-md shadow-surface-500 text-slate-900 p-4 w-80 rounded-lg col-auto hover:shadow-maroon hover:shadow-2xl transition flex flex-col text-center h-[27rem] hover:cursor-pointer" on:click={clickable ? () => goto('/cards/' + id) : null} on:keypress={clickable ? () => goto('/cards/' + id) : null}>
  <!-- Card Title -->
  {#if !itemsToHide.includes("title")}
    <h2 class="font-heading text-3xl self-center uppercase">{title}</h2>
  {/if}

  <!-- CONTENT START -->
  <!-- Idea -->
  {#if !itemsToHide.includes("idea")}
    <p class="font-body text-md my-2">{idea}</p>
  {/if}

  <!-- Example-->
  <p class="font-mono text-sm p-3 bg-maroon text-center text-white rounded-2xl my-2">{example}</p>

  <!-- Hide solution if empty -->
  {#if solution !== null && !itemsToHide.includes("solution")}
    <!-- Solution -->
    <span class="font-heading text-lg uppercase mt-1 mb-0.5">Antidote</span>
    <p class="font-body text-md">{solution}</p>
  {/if}
  <!-- CONTENT END -->

</div>
<!-- CARD END -->
