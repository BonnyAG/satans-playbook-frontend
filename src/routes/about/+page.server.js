//routes/about/+page.js
export const load = async ({ fetch }) => {
  const result = await fetch('https://satansplaybook.byu.edu/cms/api/about?populate[0]=team&populate[1]=team.profile_image');
  const data = await result.json();

  return {
    page: data.data.attributes,
  }
}