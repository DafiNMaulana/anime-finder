// * setup variable ygy
const baseUrl = "https://api.jikan.moe/v4/anime";
const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");
const contentWraper = document.querySelector(".content-wraper");

// * setup function
const getAnime = (url, inpuVal) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      const data = res.data;
      const paginate = res.pagination;
      console.log(paginate)
      let card = "";
      if (data.length >= 1) {
        data.forEach((anime) => {
          card += animeCard(anime);
        });
      } else {
        card = `<h1 class="text-center">Whoops, <strong>"${inpuVal}"</strong> Not Found</h1>`;
      }
      contentWraper.innerHTML = card;
    })
    .catch((err) => {
      console.log(err);
    });
};

btnSearch.addEventListener("click", () => {
  getAnime(baseUrl + "?q=" + inputSearch.value, inputSearch.value);
});
getAnime(baseUrl);

const animeCard = (data) => {
  const textSlice = (text, batas) => {
    if (text === null) {
      return "Tidak ada sinopsis";
    }

    const textSliced = text.slice(0, batas);
    if (text.length > batas) {
      return `${textSliced} ...`;
    }
    return textSliced;
  };
  return `
    <div class="col-lg-3 col-md-4 my-3">
      <div class="card">
        <img src="${
          data.images.webp.image_url
        }" class="card-img-top" alt="..." style="object-fit: cover; object-position: center" width="100%" height="350px" />
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 12px;">${data.title_japanese}</h6>
          <p class="card-text">${textSlice(data.synopsis, 100)}</p>
          <a href="${data.url}" class="btn btn-primary">Details</a>
        </div>
      </div>
    </div>
  `;
};
