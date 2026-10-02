export const load = async ({ fetch, params }) => {
  /* GET Cards collection from Strapi
    `pagination[limit]=100` -> 100 is max amount of cards that can be returned by the API
    `populate=*` -> includes all related fields to the Cards component (like references)
    `sort[0]=title` -> Sorts the returned array alphabetically by title
  */
  const api_cards = await fetch(
    "https://satansplaybook.byu.edu/cms/api/cards?pagination[limit]=100&populate=*&sort[0]=title"
  );
  const cms_collection_cards = await api_cards.json();

  const api_game = await fetch(
    `https://satansplaybook.byu.edu/cms/api/games/${params.id}?populate=*`
  );
  const cms_single_game = await api_game.json();

  const REQUIRES_SITUATION_CARDS = "x0d741a18o7tmqeaps9v0k6u";
  if (params.id === REQUIRES_SITUATION_CARDS) {
    const api_situationCards = await fetch(
      "https://satansplaybook.byu.edu/cms/api/situation-cards?populate=*&sort[0]=title"
    );
    const cms_collection_situationCards = await api_situationCards.json();

    return {
      cards: cms_collection_cards.data,
      game: cms_single_game.data,
      situationCards: cms_collection_situationCards.data,
    };
  } else {
    return {
      cards: cms_collection_cards.data,
      game: cms_single_game.data,
    };
  }
};
