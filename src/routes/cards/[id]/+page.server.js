//routes/cards/id/+page.js
export const load = async ({ fetch, params }) => {
  /* GET Card with id
    `populate=*` -> includes all related fields to the Cards component (like references)
  */
  const api_card = await fetch(
    `https://satansplaybook.byu.edu/cms/api/cards/${params.id}?populate=*`
  );
  const cms_single_card = await api_card.json();

  console.log(cms_single_card);
  return {
    card: cms_single_card.data,
  };
};
