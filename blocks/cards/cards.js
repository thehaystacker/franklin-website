import {
  createOptimizedPicture,
  fetchPlaceholders,
} from "../../scripts/lib-franklin.js";

export default async function decorate(block) {
  // fetch placeholders from the 'en' folder
  const placeholders = await fetchPlaceholders("en");
  const { more } = placeholders;
  console.log(`[more]`, more);

  /* change to ul, li */
  const ul = document.createElement("ul");
  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector("picture"))
        div.className = "cards-card-image";
      else {
        const aEl = document.createElement("a");
        aEl.href = "#";
        aEl.textContent = `-- ${more}` || "";
        div.appendChild(aEl);
        div.className = "cards-card-body";
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll("img").forEach((img) =>
    img
      .closest("picture")
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }])
      )
  );
  block.textContent = "";
  block.append(ul);
}
