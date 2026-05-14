const terms = [
  {
    letter: "A",
    name: "Arabesque",
    pronunciation: "[a-ra-BESK]",
    definition:
      "A position in which the dancer stands on one leg while extending the other leg straight behind the body, usually at 90 degrees or higher.",
    image: "/ballet-dictionary/assets/images/arabesque1st.jpeg"
  },
  {
    letter: "R",
    name: "Renversé",
    pronunciation: "[rahn-vehr-SAY]",
    definition:
      "A turning movement in which the dancer lets the body incline in a gentle arc while the working leg sweeps around, creating a smooth off-balance quality before returning upright.",
    image: "/ballet-dictionary/assets/images/renverse.png"
  }
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const termsByLetter = alphabet.reduce((groups, letter) => {
  groups[letter] = terms.filter((term) => term.letter === letter);
  return groups;
}, {});

const alphaNav = document.querySelector("#alphaNav");
const dictionary = document.querySelector("#dictionary");

function createAlphaNav() {
  alphabet.forEach((letter) => {
    const hasTerms = termsByLetter[letter].length > 0;
    const item = document.createElement(hasTerms ? "a" : "span");

    item.textContent = letter;
    item.dataset.letter = letter;

    if (hasTerms) {
      item.href = `#section-${letter}`;
    }

    alphaNav.appendChild(item);
  });
}

function createPhotoSlot(term) {
  const slot = document.createElement("div");
  slot.className = "photo-slot";

  if (term.image) {
    const img = document.createElement("img");
    img.src = term.image;
    img.alt = `Illustration of ${term.name}`;
    img.loading = "lazy";
    slot.appendChild(img);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "photo-placeholder";
    placeholder.textContent = "Image coming soon";
    slot.appendChild(placeholder);
  }

  return slot;
}

function createTermCard(term) {
  const card = document.createElement("article");
  card.className = "term-card";

  const body = document.createElement("div");
  body.className = "term-body";

  const name = document.createElement("h3");
  name.className = "term-name";
  name.textContent = term.name;

  const pronunciation = document.createElement("p");
  pronunciation.className = "term-pronunciation";
  pronunciation.textContent = term.pronunciation;

  const definition = document.createElement("p");
  definition.className = "term-definition";
  definition.textContent = term.definition;

  body.append(name, pronunciation, definition);
  card.append(createPhotoSlot(term), body);

  return card;
}

function createDictionary() {
  alphabet.forEach((letter) => {
    const section = document.createElement("section");
    section.className = "letter-section";
    section.id = `section-${letter}`;

    const heading = document.createElement("h2");
    heading.className = "letter-heading";
    heading.textContent = letter;
    section.appendChild(heading);

    if (termsByLetter[letter].length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-letter";
      empty.textContent = "No terms for this letter.";
      section.appendChild(empty);
    } else {
      termsByLetter[letter].forEach((term) => {
        section.appendChild(createTermCard(term));
      });
    }

    dictionary.appendChild(section);
  });
}

function observeActiveLetter() {
  const sections = document.querySelectorAll(".letter-section");
  const links = document.querySelectorAll(".alpha-nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentLetter = entry.target.id.replace("section-", "");
        links.forEach((link) => {
          link.classList.toggle("active", link.dataset.letter === currentLetter);
        });
      });
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

createAlphaNav();
createDictionary();
observeActiveLetter();
