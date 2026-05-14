# Ballet Terminology Dictionary

A small static ballet terminology reference site designed for GitHub Pages.

## File structure

```text
ballet-dictionary/
├── index.html
├── styles.css
├── script.js
└── assets/
    └── images/
        ├── arabesque.jpg
        └── renverse.jpg
```

## Adding photos

Upload your image files to `assets/images/` in GitHub first. Then update the `image` field for each term in `script.js`.

Example:

```js
{
  letter: "R",
  name: "Renversé",
  pronunciation: "[rahn-vehr-SAY]",
  definition: "...",
  image: "assets/images/renverse.jpg"
}
```

Use simple lowercase filenames with no spaces, such as `renverse.jpg`, `arabesque.png`, or `developpe-devant.jpg`.

## GitHub Pages

1. Push these files to your GitHub repo.
2. Go to **Settings → Pages**.
3. Choose **Deploy from branch**.
4. Select the `main` branch and `/root` folder.
5. Save.
