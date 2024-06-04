<script>
  // Import components
  import Card from '$lib/components/Card.svelte';
  import { timer, time, isRunning, isComplete } from "$lib/stores/countdown-timer";
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

  // Get Cards data
  export let cards;
  export let game;

  // Helper Functions
  const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  };
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  // Tracker variables
  let counter = 40;
  
  // Settings variables
  let cardDrawn = false;
  let gameFinished = false;
  
  // CUSTOM CARD ORDER
  let cardOrder;
  function newCardOrder() {
    cardOrder = [];
    for (let i = 0; i < cards.length; i++) {
      cardOrder.push(i);
    }
    cardOrder = shuffle(cardOrder);  
  }
  
  // Initialize Game
  newCardOrder();
  let currCard = cards[cardOrder[counter]].attributes;
  
  // SCORE
  function drawCard() {
    cardDrawn = true;
  }
  
  function nextRound() {
    console.log(counter, currCard);
    if($isRunning) {
      timer.pause();
    }
    timer.reset();
    
    if(counter+1 >= cardOrder.length) {
      newCardOrder();
      counter = 0;
      currCard = cards[cardOrder[counter]].attributes;
    } else {
      counter++;
      currCard = cards[cardOrder[counter]].attributes;
    }
  }
  
  function restartGame() {
    
  }
</script>

<main class="font-body flex flex-col lg:gap-x-4 lg:flex-row tracking-wide text-lg container px-8 lg:px-4 mx-auto md:mt-10">
    <!-- TITLE -->
    <section class="rounded-xl bg-slate-800 p-4 mt-4 lg:my-0 lg:w-[40%]">
      <h1 class="h1 font-heading tracking-wider uppercase text-3xl lg:text-4xl mb-5 text-white text-center">{game.attributes.title}</h1>
      <Accordion>
        <AccordionItem>
            <svelte:fragment slot="lead"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
              </svg>
              </svelte:fragment>
            <svelte:fragment slot="summary">Instructions</svelte:fragment>
            <svelte:fragment slot="content">{game.attributes.description}</svelte:fragment>
        </AccordionItem>
      </Accordion>
      <div class="flex flex-col border border-white border-dashed p-3 mt-4 rounded-xl">
        <div class="flex flex-col gap-y-4">
          <div class={`${!$isRunning ? "hidden" : ''} ${$isComplete ? 'bg-success-800' : 'bg-primary-500'} self-justify-center w-full text-center p-2 rounded-md`}>
            <span class={!$isRunning ? "hidden" : ''}>{$time}</span>
            <span class={!$isComplete ? "hidden" : ''}>Finished</span>
          </div>
            <button type="button" on:click={drawCard} class={cardDrawn ? "hidden" : "btn w-full md:w-auto variant-filled"}>Draw Card</button>
            <button type="button" on:click={() => {
                if($isRunning) {
                  timer.pause();
                } else {
                  timer.start();
                }
              }} class={!cardDrawn ? 'hidden' : 'btn w-full md:w-auto variant-filled'}>{$isRunning ? "Pause" : "Start"} Timer</button>
            <button type="button" disabled={!cardDrawn || gameFinished} on:click={nextRound} class="btn w-full md:w-auto variant-filled">Next Round</button>
        </div>
      </div>
    </section>
    <!-- Game -->
    <section class="mt-4 lg:mt-0 lg:ml-16">
      <div class={!cardDrawn ? "hidden" : "flex justify-center"}>
        <Card
          id={cards[cardOrder[counter]].id}
          title={currCard.title}
          idea={currCard.idea_short}
          example={currCard.example_short}
          solution={currCard.solution_short}
          clickable={false}
          hoverScale={false}
          hideOnMobile={false}
          singleCardResponsive={true}
          strictHeight={false}
        />
      </div>
    </section>
</main>