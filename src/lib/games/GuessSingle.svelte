<script>
  // Import components
  import Card from '$lib/components/Card.svelte';
  import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

  // Get Cards data
  export let cards;
  export let game;

  // CUSTOM CARD ORDER
  let cardOrder = [];
  for (let i = 0; i < cards.length; i++) {
    cardOrder.push(i);
  }
  
  // SHUFFLE FUNCTION
  const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  };
  cardOrder = shuffle(cardOrder);

  // PAGINATION
  let counter = 0;
  let currCard = cards[cardOrder[counter]].attributes;
  let solutions = [];
  
  // SOLUTIONS
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
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
  }
  getNewAnswers();
  
  // SCORE
  let score = 0;
  let disableButtons = false;
  let buttonFeedback = null;

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
    currCard = cards[cardOrder[counter]].attributes;
    getNewAnswers();
    
    if (difficultyLevel === "easy") {
      hideOnCard = ["title"];
    } else if ( difficultyLevel === "medium") {
      hideOnCard = ["title", "idea"];
    } else {
      hideOnCard = ["title", "idea", "solution"]
    }
  }
</script>

<main class="font-body flex flex-col md:gap-x-4 md:flex-row tracking-wide text-lg container px-8 lg:px-4 mx-auto md:mt-10">
  <!-- TITLE -->
  <section class="rounded-md bg-slate-700 p-4 my-4 md:my-0 md:w-1/3 text-center">
    <h1 class="h1 font-heading tracking-wider uppercase text-3xl lg:text-4xl mb-5 text-white text-center">{game.attributes.title}</h1>
    <p>{game.attributes.description}</p>
  </section>
  <div>
    <section>
      <div class="flex flex-col gap-y-3 md:gap-y-0 md:flex-row justify-center gap-x-6 mb-2">
        <h2 class="font-heading tracking-wider uppercase text-4xl font-bold text-white text-center">Score: {score}</h2>
      </div>
      <div class="flex flex-col md:flex-row  items-center justify-center gap-x-4">
        <h2 class="font-heading tracking-wider uppercase text-4xl font-bold mt-4 text-white text-center mb-4">Difficulty Level</h2>
        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
          <RadioItem bind:group={difficultyLevel} name="difficulty" value={"easy"}>Easy (+1)</RadioItem>
          <RadioItem bind:group={difficultyLevel} name="difficulty" value={"medium"}>Medium (+2)</RadioItem>
          <RadioItem bind:group={difficultyLevel} name="difficulty" value={"hard"}>Hard (+3)</RadioItem>
        </RadioGroup>
      </div>
      
      <div class="flex justify-center">
        <Card
          id={cards[cardOrder[counter]]}
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
      <div class="flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-center mt-8 flex gap-x-4">
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
      <div class="flex justify-center mt-8 flex gap-x-4">
          <button type="button" disabled={!disableButtons} on:click={nextRound} class="btn w-full md:w-auto variant-filled">Next Round</button>
      </div>
    </section>
  </div>
</main>

