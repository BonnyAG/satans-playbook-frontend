<script lang="ts">
    export let title: string;
    export let description: string;
</script>

<!-- CARD START -->
<div class="bg-green-50 border-4 border-green-500 text-green-900 p-4 w-80 rounded-lg col-auto transition flex flex-col text-center h-[27rem]">
    <!-- Card Title -->
    <h2 class="font-heading italic text-2xl self-center uppercase mb-6">Situation Card</h2>
    <h2 class="font-heading text-3xl self-center uppercase">{title}</h2>
  
    <!-- CONTENT START -->
    <!-- Description -->
    <p class="font-body text-md my-2">{description}</p>
  </div>
  <!-- CARD END -->