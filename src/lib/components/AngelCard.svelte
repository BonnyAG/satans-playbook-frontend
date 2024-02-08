<script lang="ts">
    export let devilTitle: string;
    export let devilDescription: string;
    export let angelTitle: string;
    export let angelDescription: string;
</script>

<!-- CARD START -->
<div class="bg-white border-4 border-primary-500 max-w-[320px] rounded-2xl col-auto transition inline-flex flex-col text-center h-[27rem]">
    <!-- Devil Section -->
    <div class="rounded-t-xl p-3 h-1/2 flex flex-col justify-center text-primary-900 bg-primary-300">
        <h2 class="font-heading text-3xl self-center uppercase">{devilTitle}</h2>
        <p class="font-body text-md my-2">{devilDescription}</p>
    </div>
    <!-- Angel Section -->
    <div class="rounded-b-xl p-3 h-1/2 flex flex-col justify-center text-blue-900 items-center bg-blue-300">
        <h2 class="font-heading text-3xl self-center uppercase">{angelTitle}</h2>
        <p class="font-body text-md my-2">{angelDescription}</p>
    </div>
    
  </div>
  <!-- CARD END -->