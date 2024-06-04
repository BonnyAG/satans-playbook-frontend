//routes/cards/id/+page.js
export const load = async ({ fetch, params }) => {
  /* GET Card with id
    `populate=*` -> includes all related fields to the Cards component (like references)
  */
  const result = await fetch(`https://satansplaybook.byu.edu/cms/api/cards/${params.id}?populate=*`);
    const data = await result.json();
    return {
        cardid: data.data?.id,
        card: data.data?.attributes
    }
}
