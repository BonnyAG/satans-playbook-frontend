<script lang="ts">
    export let devilTitle: string;
    export let devilDescription: string;
    export let angelTitle: string;
    export let angelDescription: string;
</script>

<!-- CARD START -->
<div class="bg-white border-4 border-primary-500 max-w-[320px] rounded-2xl col-auto transition inline-flex flex-col text-center h-[30rem]">
    <!-- Devil Section -->
    
    <div class="rounded-t-xl px-3 h-1/2 flex flex-col justify-center text-primary-900 bg-primary-300">
        <h2 class="font-heading italic text-xl self-center uppercase mb-1">Shoulder Devil</h2>
        <h2 class="font-heading text-3xl self-center uppercase">{devilTitle}</h2>
        <p class="font-body text-md my-1">{devilDescription}</p>
    </div>
    <!-- Angel Section -->
    <div class="rounded-b-xl p-3 h-1/2 flex flex-col justify-center text-blue-900 items-center bg-blue-300">
        <h2 class="font-heading text-3xl self-center uppercase">{angelTitle}</h2>
        <p class="font-body text-md my-1">{angelDescription}</p>
        <h2 class="font-heading italic text-xl self-center mt-1 uppercase">Shoulder Angel</h2>
    </div>
    
  </div>
  <!-- CARD END -->