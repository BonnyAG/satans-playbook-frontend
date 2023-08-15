//routes/about/+page.js
export const load = async ({ fetch }) => {
  const result = await fetch('https://satansplaybook.byu.edu/cms/api/get-cards-page?populate[0]=options&populate[1]=options.downloadable_files&populate[2]=options.downloadable_files.file');
  const data = await result.json();

  return {
    page: data.data.attributes,
  }
}