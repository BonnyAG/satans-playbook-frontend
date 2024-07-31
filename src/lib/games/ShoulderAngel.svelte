<script lang="ts">
    // Imports
    import { Accordion, AccordionItem, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import SituationCard from '$lib/components/SituationCard.svelte';
    import Card from '$lib/components/Card.svelte';

    // Helper
    const shuffle = (array: any[]) => { 
        for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array; 
    };

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max);
    }
    
    const getMultipleOptions = (array: any[], numOptions: number) => {
        let optionsLeft = shuffle(array);
        let result = [];

        for (let index = 0; index < numOptions; index++) {
            let randomPosition = getRandomInt(optionsLeft.length-1);
            result.push(optionsLeft[randomPosition]);
            if(typeof optionsLeft[randomPosition] === 'undefined') {
                console.log(optionsLeft, randomPosition);
            }
            optionsLeft = optionsLeft.filter((obj) => obj !== optionsLeft[randomPosition]);
        }

        return result;
    }

    function filterOut(item: any) {
        return item.id !== drawnSituationCard.id;
    }

    function filterMultiple(item: any) {
        return !drawnPlayerCards?.includes(item);
    }

    // Props
    export let cards: any;
    export let situationCards: any;
    export let game: any;

    let availableSituationCards = situationCards;
    let hideOnCard = ["example", "solution"];
    let availableCards = cards;

    // Game options
    let role = "player"
    let numCards = 3;
    let drawnSituationCard: any = null;
    let drawnPlayerCards: any = null;
    let displayCards: any = null 
    let currentRound: string = "devil";
    let cardPlayed: boolean = false;
    let playerWonRound: boolean = false;
    let displayInput: boolean = false;
    let cardId: number|null = null; 
    let initialized: boolean = true;

    // JUDGING
    const pickSituationCard = () => {
        let temp = shuffle(availableSituationCards);
        let index = getRandomInt(temp.length-1);

        drawnSituationCard = temp[index];
        
        if(initialized) {
            if([24, 25, 26, 27, 28, 29, 30].includes(drawnSituationCard?.id)) {
                pickSituationCard();
                initialized = false;
            } else {
                initialized = false;
            }
        }

        if(availableSituationCards.length === 1) {
            availableSituationCards = situationCards;
        } else {
            availableSituationCards = availableSituationCards.filter(filterOut);
        }
    }

    // Player Cards
    const pickPlayerCards = () => {
        let temp = shuffle(availableCards);
        drawnPlayerCards = getMultipleOptions(temp, numCards);

        if(availableCards.length <= numCards+3) {
            availableCards = cards;
        } else {
            availableCards = availableCards.filter(filterMultiple);
        }
        displayCards = drawnPlayerCards;
    }
    
    function playDevilCard(selectedCard: any) {
        function filterCard(item: any) {
            return item !== selectedCard;
        }
        drawnPlayerCards = drawnPlayerCards.filter(filterCard);
        
        displayCards = [selectedCard];
        cardPlayed = true;
    }
</script>

<main class="font-body flex flex-col lg:gap-x-4 lg:flex-row tracking-wide text-lg container px-8 lg:px-4 mx-auto md:mt-10">
    <!-- TITLE -->
    <section class="rounded-2xl bg-slate-800 p-4 my-4 lg:my-0 lg:w-[40%]">
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
      <div class="flex flex-col items-start border border-white border-dashed p-3 mt-4 rounded-xl gap-y-3">
        <div class="flex flex-col gap-y-4 md:flex-row md:gap-y-0 md:gap-x-4"> 
            <div class="flex flex-col items-start">
                <span class="font-bold ml-2 mb-1">My Role</span>
                <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                    <RadioItem bind:group={role} name="role" value={"judge"}>Judge</RadioItem>
                    <RadioItem bind:group={role} name="role" value={"player"}>Player</RadioItem>
                </RadioGroup>
            </div>
            <div class={`${role === "judge" ? 'hidden' : ''} flex flex-col items-start`}>
                <span class="font-bold ml-2 mb-1">Cards in Hand</span>
                <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                    <RadioItem bind:group={numCards} name="numCards" value={1}>1</RadioItem>
                    <RadioItem bind:group={numCards} name="numCards" value={3}>3</RadioItem>
                    <RadioItem bind:group={numCards} name="numCards" value={5}>5</RadioItem>
                </RadioGroup>
            </div>
        </div>
        
        <button type="button" class="w-full h-12 btn-icon variant-filled-primary"
            on:click={() => {
                if(role === "judge") {
                    pickSituationCard();
                } else {
                    pickPlayerCards();
                }
            }}
        >
            Draw New Card(s)
        </button>
        <button type="button" class={`${role !== 'player' || drawnPlayerCards === null || drawnPlayerCards.length >= numCards || currentRound === "angel" || cardPlayed ? 'hidden' : ''} w-full h-12 btn-icon variant-filled`}
            on:click={() => {
                let difference = numCards - drawnPlayerCards.length;

                let tempArr = getMultipleOptions(availableCards, difference);
                drawnPlayerCards = [...drawnPlayerCards, ...tempArr];
                displayCards = drawnPlayerCards;

                function filterRefill(item) {
                    return !tempArr?.includes(item);
                }

                if(availableCards.length === 1) {
                    availableCards = cards;
                } else {
                    availableCards = availableCards.filter(filterRefill);
                }
            }}
        >
            Refill Hand
        </button>
      </div>
    </section>
    <!-- Game -->
    <section class="flex flex-col md:w-[60%]">
        <div class="flex flex-col gap-x-4 md:w-full">
            <div class={currentRound === "devil" && drawnPlayerCards ? 'bg-primary-500  self-justify-center w-full text-center p-2 rounded-md' : "hidden"}>
                <span class="font-bold">Be the Devil's Advocate</span><br/>
                <span>Convince the judge to follow Satan</span>
            </div>
            <div class={currentRound === "angel" && drawnPlayerCards ? 'bg-secondary-500 self-justify-center w-full text-center p-2 rounded-md' : "hidden"}>
                <span class="font-bold">Be the Shoulder Angel</span><br/>
                <span>Convince the judge to follow God by countering the card below</span>
            </div>
            <div class={`${role === "player" || drawnSituationCard === null ? 'hidden' : ''} px-4 py-10`}>
                <SituationCard title={drawnSituationCard?.attributes.title} description={drawnSituationCard?.attributes.description_long} />
            </div>
            <div class={`${role === "judge" ? 'hidden' : ''} snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 w-full overflow-x-auto px-4 py-2 rounded-md md:snap-none md:overflow-auto`}>
                {#if displayCards !== null}
                    {#each displayCards as card}
                        <div class="snap-center flex flex-none flex-col align-center">
                            <Card
                              id={card.id}
                              title={card.attributes.title}
                              idea={card.attributes.idea_short}
                              example={card.attributes.example_short}
                              solution={card.attributes.solution_short}
                              clickable={false}
                              hoverScale={false}
                              hideOnMobile={false}
                              itemsToHide={hideOnCard}
                              singleCardResponsive={true}
                              strictHeight={true}
                            />
                            <button type="button" disabled={false} on:click={() => playDevilCard(card)} class={playerWonRound ? "hidden" : "btn w-full variant-filled my-2"}>Play Card</button>
                            <div class={!cardPlayed ? "hidden" : "p-4 bg-surface-700 rounded-sm"}>
                                <span class="font-bold">Did you win this round?</span>
                                <div class="flex gap-x-2 mb-2">
                                    <button type="button" disabled={false} on:click={() => {cardPlayed = false; playerWonRound = true; currentRound = "angel"}} class="btn w-full variant-filled-success">Yes</button>
                                    <button type="button" disabled={false} on:click={() => {displayInput = true;}} class="btn w-full variant-filled-primary">No</button>
                                </div>
                                <div class={!displayInput ? "hidden" : ""}>
                                    <label class="label">
                                        <span>Winning Card #</span>
                                        <input bind:value={cardId} class="input variant-form-material" type="number" />
                                    </label>
                                </div>
                                <button type="button" disabled={!Number.isInteger(cardId)} class={!displayInput ? "hidden" : "btn w-full variant-filled my-2"} on:click={() => {
                                    currentRound = "angel";
                                    let winningCard = cards.find(o => o.id === cardId);
                                    displayCards = [winningCard];
                                    playerWonRound = true;
                                    cardPlayed=false;     
                                }}>Next Round</button>
                            </div>
                            <button type="button" disabled={false} on:click={() => {currentRound = "devil"; displayCards = drawnPlayerCards; playerWonRound = false;}} class={currentRound === "angel" && !cardPlayed ? "btn w-full variant-filled mt-2" : "hidden"} >Finish Angel Round</button>
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
    </section>
</main>