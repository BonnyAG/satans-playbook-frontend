<script>
  // Import components
  import Card from '$lib/components/Card.svelte';
  import { Accordion, AccordionItem, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

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
  let counter = 0;
  let score = 0;
  
  // Settings variables
  let gameFinished = false;
  let solutions = [];
  let disableButtons = false;
  let buttonFeedback = null;
  
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

  // SOLUTIONS
  function getNewAnswers() {
    // First Wrong Answer
    let random = getRandomInt(cards.length);
    while(random === counter) {
      random = getRandomInt(cards.length);
    }
    let wrongAnswer1 = cards[cardOrder[random]].attributes.title;
    
    // Second Wrong Answer
    let random2 = getRandomInt(cards.length);
    while(random2 === counter || random2 === random ) {
      random2 = getRandomInt(cards.length);
    }
    let wrongAnswer2 = cards[cardOrder[random2]].attributes.title;
    
    solutions = shuffle([currCard.title, wrongAnswer1, wrongAnswer2]);
    console.log(currCard);
  }
  getNewAnswers();
  
  // SCORE
  function checkAnswer(position) {
    let correctIndex = solutions.findIndex(o => o === currCard.title);
    disableButtons = true;
    
    if (position === correctIndex) {
      buttonFeedback = {position: position, style: "variant-filled-success", icon: "check"};
      score += difficultyLevel === "easy" ? 1 : (difficultyLevel === "medium" ? 2 : 3);
    } else {
      buttonFeedback = {position: position, style: "variant-filled-error", icon: "xmark"};
    }
    
    hideOnCard=[];
    disableButtons = true;
  }
  
  // DIFFICULTY LEVEL
  let difficultyLevel = "easy";
  let hideOnCard = ["title"];

  $: if (difficultyLevel === "easy") {
    hideOnCard = ["title"];
  } else if ( difficultyLevel === "medium") {
    hideOnCard = ["title", "idea"];
  } else {
    hideOnCard = ["title", "idea", "solution"]
  }

  function nextRound() {
    counter++;
    buttonFeedback = null;
    disableButtons = !disableButtons;
    
    if(counter >= cardOrder.length) {
      console.log('Game finished!')
      gameFinished = true;  
    } else {
      currCard = cards[cardOrder[counter]].attributes;
      getNewAnswers();
    }

    if (difficultyLevel === "easy") {
      hideOnCard = ["title"];
    } else if ( difficultyLevel === "medium") {
      hideOnCard = ["title", "idea"];
    } else {
      hideOnCard = ["title", "idea", "solution"]
    }
  }
  
  function restartGame() {
    newCardOrder();
    solutions = [];
    getNewAnswers();
    
    counter = 0;
    score = 0;
    gameFinished = false;
    disableButtons = false;
    buttonFeedback = null;
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
            <div class={`${!gameFinished ? 'bg-primary-500' : 'bg-success-800'} self-justify-center w-full text-center p-2 rounded-md`}>
              <span class="font-bold">My Score: {score}</span>  
            </div>
            <span class="font-bold ml-2 mb-1">Card {counter+1}/{cardOrder.length+1}</span>
            <div class="flex flex-col items-start">
                <span class="font-bold ml-2 mb-1">Difficulty Level</span>
                <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                  <RadioItem bind:group={difficultyLevel} name="difficulty" value={"easy"}>Easy (+1)</RadioItem>
                  <RadioItem bind:group={difficultyLevel} name="difficulty" value={"medium"}>Medium (+2)</RadioItem>
                  <RadioItem bind:group={difficultyLevel} name="difficulty" value={"hard"}>Hard (+3)</RadioItem>
                </RadioGroup>
            </div>
            <button type="button" disabled={!disableButtons} on:click={nextRound} class="btn w-full md:w-auto variant-filled">Next Round</button>
            <button type="button" on:click={restartGame} class={!gameFinished ? 'hidden' : 'btn w-full md:w-auto variant-filled'}>Restart Game</button>
        </div>
      </div>
    </section>
    <!-- Game -->
    <section class="lg:ml-12">
      <div class="flex justify-center mt-4 lg:mt-0">
        <Card
          id={cards[cardOrder[counter]].id}
          title={currCard.title}
          idea={currCard.idea_short}
          example={currCard.example_short}
          solution={currCard.solution_short}
          clickable={false}
          hoverScale={false}
          hideOnMobile={false}
          itemsToHide={hideOnCard}
          singleCardResponsive={true}
          strictHeight={false}
        />
      </div>
      <div class="flex flex-col gap-y-4 justify-center mt-8">
          <button type="button" disabled={disableButtons} on:click={() => checkAnswer(0)} class={`btn ${buttonFeedback?.position === 0 ? buttonFeedback?.style : "variant-filled"}`}>
            <span>{solutions[0]}</span>
            <span>
            {#if buttonFeedback?.position === 0}
              {#if buttonFeedback?.icon === "check"}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              {:else if buttonFeedback?.icon === "xmark"}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" x2="9" y1="9" y2="15" />
                  <line x1="9" x2="15" y1="9" y2="15" />
                </svg>
              {/if}
            {/if}
            </span>
          </button>
          <button type="button" disabled={disableButtons} on:click={() => checkAnswer(1)} class={`btn ${buttonFeedback?.position === 1 ? buttonFeedback?.style : "variant-filled"}`}>
            <span>{solutions[1]}</span>
            <span>
            {#if buttonFeedback?.position === 1}
              {#if buttonFeedback?.icon === "check"}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              {:else if buttonFeedback?.icon === "xmark"}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" x2="9" y1="9" y2="15" />
                  <line x1="9" x2="15" y1="9" y2="15" />
                </svg>
              {/if}
            {/if}
          </button>
          <button type="button" disabled={disableButtons} on:click={() => checkAnswer(2)} class={`btn ${buttonFeedback?.position === 2 ? buttonFeedback?.style : "variant-filled"}`}>
            <span>{solutions[2]}</span>
            <span>
            {#if buttonFeedback?.position === 2}
              {#if buttonFeedback?.icon === "check"}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              {:else if buttonFeedback?.icon === "xmark"}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" x2="9" y1="9" y2="15" />
                  <line x1="9" x2="15" y1="9" y2="15" />
                </svg>
              {/if}
            {/if}
          </button>
      </div>
    </section>
</main>