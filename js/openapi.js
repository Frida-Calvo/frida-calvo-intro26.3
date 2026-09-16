document
  .querySelector("#btn-artworks")
  .addEventListener("click", fetchArtCards);

document.querySelector("#btn-artists").addEventListener("click", fetchMonet);

//https://api.artic.edu/api/v1/artworks?search?=mexican&limit=10
//https://api.artic.edu/api/v1/artworks?page=2&limit=10
//https://api.artic.edu/api/v1/artworks

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function fetchArtCards() {
  const display = document.querySelector("#display");

  display.innerHTML = "";
  document.querySelector("h1").innerText = "";

  display.innerHTML = `<div id="loading">Loading artworks...</div>`;

  const randomPage = getRandomIntInclusive(1, 9398);
  //the Art Institute of Chicago API states that the total number of pages is 9398, but the later pages have no image_ids

  fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=9`)
    .then((response) => response.json())
    .then((data) => {
      const artists = data.data;
      console.log(artists);
      console.log(randomPage);

      const h1 = document.querySelector("h1");
      h1.classList.add("header");
      h1.textContent = `Random Selection of Artwork from the Art Institute of Chicago`;

      artists.forEach((artist) => {
        const { image_id, title, artist_title, date_display, place_of_origin } =
          artist;
        console.log(
          image_id,
          title,
          artist_title,
          date_display,
          place_of_origin,
        );

        const card_container = document.createElement("div");
        card_container.classList.add("card", "random");

        //add title, set as "Untitled" by default, replace with actual title if value is not null
        const artwork_name = document.createElement("h2");
        artwork_name.classList.add("title");

        let artworkName = "Untitled";

        if (title !== null) {
          artworkName = title;
        }

        artwork_name.textContent = artworkName;

        // create image element
        const image_element = document.createElement("img");

        //set image_element to placeholder image by default
        let source = "photos/palestine_placeholder_image.jpg";
        image_element.src = source;

        //if image_id exists, create the url path for the image retrieval
        if (image_id !== null) {
          const image_url = `https://www.artic.edu/iiif/2/${image_id}/full/400,/0/default.jpg`;
          // const image_url = `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2023%2F05%2FGettyImages-1341465008.jpg&f=1&nofb=1&ipt=6bc78a08fa0b3aec3f26c0c0ccf1e34e9a1af0e7f58914fff783c90b454ca80d`;
          console.log(image_url);
          //create temporary Image() object set to image_url
          //this goes inside the if statement bc if image_id is null, no need to try temporary load
          const tempImage = new Image();

          //set up the event handlers for success and failure before starting image request (tempImage.src = image_url)

          //if successful: change visible image_element src to image_url
          tempImage.onload = function () {
            image_element.src = image_url;
          };

          //if failed: console log there was an error; image_element stays with placeholder
          tempImage.onerror = function () {
            console.log("error");
          };

          //start the image request, program already has handler instructions
          tempImage.src = image_url;
        }

        // create artist name element, set to Unknown by default, replace with actual name if not null
        const artist_name = document.createElement("p");
        artist_name.classList.add("artist");

        let artistName = "Unknown";

        if (artist_title !== null) {
          artistName = artist_title;
        }

        artist_name.textContent = artistName;

        // create year element, set to "N/A" by default, set to actual year if known
        const year = document.createElement("p");
        year.classList.add("year");

        let yearArtwork = "N/A";

        if (date_display !== null) {
          yearArtwork = date_display;
        }

        year.textContent = yearArtwork;

        //create place element, set to "" by default, set to actual place_of_origin if known
        const place = document.createElement("p");
        place.classList.add("description");

        let placeArt = "Unknown";

        if (place_of_origin !== null) {
          placeArt = place_of_origin;
        }

        place.textContent = placeArt;

        card_container.append(artwork_name);
        card_container.append(image_element);
        card_container.append(artist_name);
        card_container.append(year);
        card_container.append(place);

        display.append(card_container);
      });
      document.getElementById("loading").remove();
    })
    .catch((error) => {
      document.querySelector("#display").innerHTML =
        `ERROR: fetchArtCards did not work because of ${error}`;
    });
}

// making an HTML string (works best for static content but since image retrieval is more complex, not the best choice)
// instead, create each element separately using DOM and then append
// content += `
//   <div class="card">
//     <h2 class="title">${artist.title}</h2>
//     <img src = "${source}" crossorigin="anonymous">
//     <p class="artist">Artist: ${artist.artist_title || "Unknown"}</p>
//     <p class="year">Year: ${artist.date_display || "N/A"}</p>
//     <p class="description">${artist.short_description || ""}</p>
//   </div>`;

// display.innerHTML = content;

async function fetchArtMetadata(link) {
  const response = await fetch(link);
  const data = await response.json();

  return data;
}

async function fetchMonet() {
  const display = document.querySelector("#display");
  display.innerHTML = "";
  display.innerHTML = `<div id="loading">Loading artworks...</div>`;

  fetch("https://api.artic.edu/api/v1/artworks/search?q=monet&limit=9")
    .then((response) => response.json())
    .then(async (data) => {
      const artworks = data.data;

      display.innerHTML = "";

      const h1 = document.querySelector("h1");
      let hasArtistTitleUpdated = false;

      //fetch the metadata from each of the artworks under the Monet search query
      for (const artwork of artworks) {
        const { api_link } = artwork;

        const complete_link =
          api_link +
          "?fields=image_id,title,artist_title,date_display,short_description";

        const metadata = await fetchArtMetadata(complete_link);
        console.log(metadata);

        const {
          image_id,
          title,
          artist_title,
          date_display,
          short_description,
        } = metadata.data;

        // const image_source = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`;
        // website warned against hardcoding the url
        const image_source = `${metadata.config.iiif_url}/${image_id}/full/400,/0/default.jpg`;
        console.log(image_source);

        //update header 1 with artist name from the first loop
        if (hasArtistTitleUpdated !== true && artist_title !== null) {
          h1.innerText = artist_title;
          console.log("h1 has been changed");
          hasArtistTitleUpdated = true;
        }

        // display.innerHTML += `
        //   <div class="card">
        //     <h2 class="title">${title}</h2>
        //     <img src = "${image_source}" crossorigin="anonymous">
        //     <p class="year monet">Year: ${date_display || "N/A"}</p>
        //     <p class="description">${short_description || ""}</p>
        //   </div>`;

        const card_container = document.createElement("div");
        card_container.classList.add("card");

        //add title, set as "Untitled" by default, replace with actual title if value is not null
        const artwork_name = document.createElement("h2");
        artwork_name.classList.add("title");

        let artworkName = "Untitled";

        if (title !== null) {
          artworkName = title;
        }

        artwork_name.textContent = artworkName;

        // create image element
        const image_element = document.createElement("img");

        //set image_element to placeholder image by default
        let source = "photos/palestine_placeholder_image.jpg";
        image_element.src = source;

        //if image_id exists, create the url path for the image retrieval
        if (image_id !== null) {
          const image_url = `https://www.artic.edu/iiif/2/${image_id}/full/400,/0/default.jpg`;
          console.log(image_url);
          //create temporary Image() object set to image_url
          //this goes inside the if statement bc if image_id is null, no need to try temporary load
          const tempImage = new Image();

          //set up the event handlers for success and failure before starting image request (tempImage.src = image_url)

          //if successful: change visible image_element src to image_url
          tempImage.onload = function () {
            image_element.src = image_url;
          };

          //if failed: console log there was an error; image_element stays with placeholder
          tempImage.onerror = function () {
            console.log("Image URL was not able to fetch a viable image");
          };

          //start the image request, program already has handler instructions
          tempImage.src = image_url;
        }

        console.log("finished conditional on images");

        // create year element, set to "N/A" by default, set to actual year if known
        const year = document.createElement("p");
        year.classList.add("year");

        let yearArtwork = "N/A";

        if (date_display !== null) {
          yearArtwork = date_display;
        }

        year.textContent = yearArtwork;

        //create description element, set to "" by default, set to actual description if known
        const description = document.createElement("p");
        description.classList.add("description");

        let desc = "";

        if (short_description !== null) {
          desc = short_description;
        }

        description.textContent = desc;

        //appending everything to div card_container

        card_container.append(artwork_name);
        console.log("reached appending artwork_name");
        card_container.append(image_element);
        console.log("reached appending image_element");
        card_container.append(year);
        console.log("reached appending year");
        card_container.append(description);
        console.log("reached appending description");

        //appending div to display
        display.append(card_container);
        console.log("reached appending card_container to display");
      }
      // document.getElementById("loading").remove();
      console.log("removed loading screen");
    })
    .catch((error) => {
      document.querySelector("#display").innerHTML =
        `ERROR: fetchMonet did not work because of ${error}`;
    });
}
