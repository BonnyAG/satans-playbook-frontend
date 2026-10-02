//routes/quotes/+page.js
export const load = async ({ fetch }) => {
  /* GET Cards collection from Strapi
    `pagination[limit]=100` -> 100 is max amount of cards that can be returned by the API
    `populate=*` -> includes all related fields to the Cards component (like references)
    `sort[0]=title` -> Sorts the returned array alphabetically by title
  */
  const api_cards = await fetch(
    "https://satansplaybook.byu.edu/cms/api/cards?pagination[limit]=100&populate=*&sort[0]=title"
  );
  const cms_collection_cards = await api_cards.json();

  const api_homepage = await fetch(
    "https://satansplaybook.byu.edu/cms/api/homepage?populate=*"
  );
  const cms_page_home = await api_homepage.json();

  // console.log(cms_collection_cards, cms_page_home);

  return {
    cards: cms_collection_cards.data,
    homepage: cms_page_home.data,
  };
};
