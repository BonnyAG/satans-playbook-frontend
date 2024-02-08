<script lang="ts">
    // Imports
    import { Accordion, AccordionItem, RadioGroup, RadioItem, filter } from '@skeletonlabs/skeleton';
    import SituationCard from '$lib/components/SituationCard.svelte';
    import AngelCard from '$lib/components/AngelCard.svelte';

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

    let availableCards = cards;

    // Game options
    let role = "player"
    let numCards = 3;
    let drawnSituationCard: any = null;
    let drawnPlayerCards: any = null;

    // JUDGING
    const pickSituationCard = () => {
        let temp = shuffle(availableSituationCards);
        let index = getRandomInt(temp.length-1);

        drawnSituationCard = temp[index];

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
        console.log(numCards, availableCards);
    }
</script>

<main class="font-body flex flex-col lg:gap-x-4 lg:flex-row tracking-wide text-lg container px-8 lg:px-4 mx-auto md:mt-10">
    <!-- TITLE -->
    <section class="rounded-2xl bg-slate-800 p-4 my-4 lg:my-0 lg:w-[40%] text-center">
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
      <div class="flex flex-col items-start border border-white border-dashed p-3 mt-4 rounded-xl">
        <div class="flex gap-x-4">
            <div class="flex flex-col items-start">
                <span class="font-bold ml-2 mb-1">My Role</span>
                <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                    <RadioItem bind:group={role} name="role" value={"judge"}>Judge</RadioItem>
                    <RadioItem bind:group={role} name="role" value={"player"}>Player</RadioItem>
                </RadioGroup>
            </div>
            <div class="{role === "judge" ? 'hidden' : ''} flex flex-col items-start">
                <span class="font-bold ml-2 mb-1">Cards in Hand</span>
                <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                    <RadioItem bind:group={numCards} name="numCards" value={1}>1</RadioItem>
                    <RadioItem bind:group={numCards} name="numCards" value={3}>3</RadioItem>
                    <RadioItem bind:group={numCards} name="numCards" value={5}>5</RadioItem>
                </RadioGroup>
            </div>
        </div>
        
        <button type="button" class="mt-4 w-full h-12 btn-icon variant-filled-primary"
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
        <button type="button" class="{role !== 'player' || drawnPlayerCards === null || drawnPlayerCards.length >= numCards ? 'hidden' : ''} mt-4 w-full h-12 btn-icon variant-filled"
            on:click={() => {
                let difference = numCards - drawnPlayerCards.length;

                let tempArr = getMultipleOptions(availableCards, difference);
                drawnPlayerCards = [...drawnPlayerCards, ...tempArr];

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
    <div class="flex gap-x-4 lg:w-[60%]">
        <div class="{role === "player" || drawnSituationCard === null ? 'hidden' : ''}">
            <SituationCard title={drawnSituationCard?.attributes.title} description={drawnSituationCard?.attributes.description} />
        </div>
        <div class="{role === "judge" ? 'hidden' : ''} snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10">
            {#if drawnPlayerCards !== null}
                {#each drawnPlayerCards as card}
                    <div class="flex flex-none flex-col align-center">
                        <AngelCard devilTitle={card.attributes.title} devilDescription={card.attributes.idea_short} angelTitle={card.attributes.angel_title} angelDescription={card.attributes.solution_short} />
                        <button type="button" class="mt-3 btn variant-filled"
                        on:click={() => {
                            function filterCard(item) {
                                return item !== card;
                            }

                            drawnPlayerCards = drawnPlayerCards.filter(filterCard);
                        }}>
                        Play this card</button>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</main>