//routes/quotes/+page.js
export const load = async ({ fetch }) => {
  /* GET Cards collection from Strapi
    `pagination[limit]=100` -> 100 is max amount of cards that can be returned by the API
    `populate=*` -> includes all related fields to the Cards component (like references)
    `sort[0]=title` -> Sorts the returned array alphabetically by title
  */
  const cardResult = await fetch('https://satansplaybook.byu.edu/cms/api/cards?pagination[limit]=100&populate=*&sort[0]=title');
  const cardData = await cardResult.json();
  
  const homepageResult = await fetch('https://satansplaybook.byu.edu/cms/api/homepage?populate=*');
  const homepageData = await homepageResult.json();

  return {
        cards: cardData.data,
        homepage: homepageData.data.attributes,
  }
}
