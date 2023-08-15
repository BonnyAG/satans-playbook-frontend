//routes/games/+page.js
export const load = async ({ fetch }) => {
  const gamesResult = await fetch('https://satansplaybook.byu.edu/cms/api/games');
  const gamesData = await gamesResult.json();

  const gamesPageResult = await fetch('https://satansplaybook.byu.edu/cms/api/games-page');
  const pageData = await gamesPageResult.json();

  return {
    games: gamesData.data,
    page: pageData.data,
  }
}