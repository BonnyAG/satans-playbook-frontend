export const load = async ({ fetch, params }) => {
  /* GET Cards collection from Strapi
    `pagination[limit]=100` -> 100 is max amount of cards that can be returned by the API
    `populate=*` -> includes all related fields to the Cards component (like references)
    `sort[0]=title` -> Sorts the returned array alphabetically by title
  */
  const cardResult = await fetch('https://satansplaybook.byu.edu/cms/api/cards?pagination[limit]=100&populate=*&sort[0]=title');
  const cardData = await cardResult.json();
  
  const gameResult = await fetch(`https://satansplaybook.byu.edu/cms/api/games/${params.id}?populate=*`);
  const gameData = await gameResult.json();

  if(params.id === '1') {
    const situationCardResult = await fetch('https://satansplaybook.byu.edu/cms/api/situation-cards?pagination[limit]=100&populate=*&sort[0]=title');
    const situationCardData = await situationCardResult.json();

    return {
      cards: cardData.data,
      game: gameData.data,
      situationCards: situationCardData.data
    }
  } else {
    return {
      cards: cardData.data,
      game: gameData.data
    }
  }
}