//routes/games/+page.js
export const load = async ({ fetch }) => {
  const api_games = await fetch("https://satansplaybook.byu.edu/cms/api/games");
  const cms_collection_games = await api_games.json();

  const api_gamepage = await fetch(
    "https://satansplaybook.byu.edu/cms/api/games-page"
  );
  const cms_page_game = await api_gamepage.json();

  return {
    games: cms_collection_games.data,
    page: cms_page_game.data,
  };
};
