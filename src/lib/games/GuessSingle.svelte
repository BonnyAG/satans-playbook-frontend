<script>
  // Import components
  import Card from '$lib/components/Card.svelte';
  import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

  // Get Cards data
  export let cards;

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
  let result = "";
  let disableButtons = false;  

  function checkAnswer(position) {
    let correctIndex = solutions.findIndex(o => o === currCard.title);
    disableButtons = true;
    
    if (position === correctIndex) {
      result = "(CONGRATS)";
      score += difficultyLevel === "easy" ? 1 : (difficultyLevel === "medium" ? 2 : 3);
    } else {
      result = "(INCORRECT)";
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
    result = "";
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

<section>
  <div class="flex flex-col gap-y-3 md:gap-y-0 md:flex-row justify-center gap-x-6 mb-2">
    <h2 class="font-heading tracking-wider uppercase text-4xl font-bold text-white text-center">Score: {score}</h2>
    <h2 class="font-heading tracking-wider uppercase text-4xl font-bold text-white text-center">{result}</h2>
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
    />
  </div>
  <div class="flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-center mt-8 flex gap-x-4">
      <button type="button" disabled={disableButtons} on:click={() => checkAnswer(0)} class="btn variant-filled-primary">{solutions[0]}</button>
      <button type="button" disabled={disableButtons} on:click={() => checkAnswer(1)} class="btn variant-filled-primary">{solutions[1]}</button>
      <button type="button" disabled={disableButtons} on:click={() => checkAnswer(2)} class="btn variant-filled-primary">{solutions[2]}</button>
  </div>
  <div class="flex justify-center mt-8 flex gap-x-4">
      <button type="button" disabled={!disableButtons} on:click={nextRound} class="btn w-full md:w-auto variant-filled">Next Round</button>
  </div>
</section>