<script lang="ts">
  // IMPORTS
  // FUNCTIONS
  import { goto } from '$app/navigation';
  // IMAGES
  import logo from '$lib/images/logo.png';

  // PROPS
  export let selectedPage: string;

  // STATES
  let mobileMenuState = false;
</script>

<!-- NAVIGATION START -->
<nav class="font-body">

  <!-- MENU START -->
  <div class="mx-auto container px-2 mt-2">
    <div class="relative flex h-16 items-center justify-between">

      <!-- MOBILE MENU BUTTON START -->
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" on:click={() => mobileMenuState = !mobileMenuState} aria-controls="mobile-menu" aria-expanded="false">
          <span class="sr-only">Open navigation menu</span>
          <!-- Closed menu icon -->
          <svg class="{!mobileMenuState ? 'block' : 'hidden'} h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <!-- Open menu icon -->
          <svg class="{mobileMenuState ? 'block' : 'hidden'} h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <!-- MOBILE MENU BUTTON END -->

      <!-- DESKTOP MENU START -->
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

        <!-- SITE LOGO START -->
        <a href="/" class="flex flex-shrink-0 items-center hover:bg-gray-700 transition p-3 rounded-full">
          <img class="h-8 w-auto" src={logo} alt="Satan's Playbook Logo">
        </a>
        <!-- SITE LOGO END -->

        <!-- MENU LINKS START -->
        <div class="hidden sm:ml-6 sm:block self-center">
          <div class="flex space-x-6 text-md font-normal tracking-wider">

          <!-- Home Page -->
            {#if selectedPage === 'index'}
              <a href="/" class="text-white bg-maroon hover:bg-primary-700 rounded-3xl px-3 py-2" aria-current="page">Home</a>
            {:else}
              <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-3xl px-3 py-2">Home</a>
            {/if}

            <!-- Games Page -->
            {#if selectedPage === 'games'}
              <a href="/games" class="text-white bg-maroon hover:bg-primary-700 rounded-3xl px-3 py-2" aria-current="page">Games</a>
            {:else}
              <a href="/games" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-3xl px-3 py-2">Games</a>
            {/if}

            <!-- About Page -->
            {#if selectedPage === 'about'}
              <a href="/about" class="text-white bg-maroon hover:bg-primary-700 rounded-3xl px-3 py-2" aria-current="page">About</a>
            {:else}
              <a href="/about" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-3xl px-3 py-2">About</a>
            {/if}

          </div>
        </div>
        <!-- MENU LINKS START -->

      </div>
      <!-- DESKTOP MENU END -->

      <!-- GET CARDS BUTTON START -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 hidden sm:block sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button type="button" class="btn variant-filled tracking-wider" on:click={() => goto('/get-cards')}>Get Cards</button>
      </div>
      <!-- GET CARDS BUTTON END -->

    </div>
  </div>
  <!-- MENU END -->

  <!-- MOBILE MENU START -->
  <div class="{!mobileMenuState ? 'hidden' : ''} sm:hidden" id="mobile-menu">
    <div class="space-y-2 px-2 pb-3 pt-2 tracking-wider">
      <!-- Home Page -->
      {#if selectedPage === 'index'}
        <a href="/" class="text-white bg-maroon hover:bg-primary-700 block rounded-md px-3 py-2" aria-current="page">Home</a>
      {:else}
        <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2">Home</a>
      {/if}

      <!-- Games Page -->
      {#if selectedPage === 'games'}
        <a href="/games" class="text-white bg-maroon hover:bg-primary-700 block rounded-md px-3 py-2" aria-current="page">Games</a>
      {:else}
        <a href="/games" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2">Games</a>
      {/if}

      <!-- About Page -->
      {#if selectedPage === 'about'}
        <a href="/about" class="text-white bg-maroon hover:bg-primary-700 block rounded-md px-3 py-2" aria-current="page">About</a>
      {:else}
        <a href="/about" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2">About</a>
      {/if}

      <!-- Get Cards Button -->
      <button type="button" class="btn w-full variant-filled tracking-wider" on:click={() => goto('/get-cards')}>Get Cards</button>
    </div>
  </div>
  <!-- MOBILE MENU END -->

</nav>
<!-- NAVIGATION END -->