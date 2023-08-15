/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Apply the dark mode class setting:
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    // 2. Append the path for the Skeleton NPM package and files:
    require('path').join(require.resolve(
      '@skeletonlabs/skeleton'),
      '../**/*.{html,js,svelte,ts}'
    )
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"American Typewriter"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        'heading': ['Impact', 'ui-sans-serif', 'system-ui'],
        'body': ['"Avenir Next Condensed"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        maroon: '#D22229',
      },
    },
  },
  plugins: [
    // 3. Append the Skeleton plugin to the end of this list
    ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
  ]
}
