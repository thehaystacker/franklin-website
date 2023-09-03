const pagination = (block, response) => {
  const page = Math.ceil(response.total / response.limit);
  const activePage = response.offset / response.limit + 1;

  console.log(`[page]`, page);

  const ul = document.createElement("ul");
  ul.classList.add("pagination-wrapper");
  for (let i = 0; i < page; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.appendChild(document.createTextNode(i + 1));
    if (i === activePage) {
      button.classList.add("active");
    }
    li.append(button);
    ul.append(li);
  }

  block.append(ul);
};

const renderItems = async (block, offset = 0, limit = 20) => {
  const response = await fetch(
    `/list-items.json?limit=${limit}&offset=${offset}`
  ).then((r) => r.json());

  if (response?.total > 0 && response?.data) {
    const data = response.data;

    const ul = document.createElement("ul");
    ul.classList.add("list-wrapper");
    data.map((item) => {
      const li = document.createElement("li");
      const text = document.createTextNode(item?.Destination || "");
      li.appendChild(text);
      ul.append(li);
    });
    block.append(ul);

    pagination(block, response);
  }
};

export default function decorate(block) {
  renderItems(block);
}
