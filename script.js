// script.js
const config = {
  shopName: "",
  videoId: "GWA6cNhgSs4",
  videoQuality: "hd720",
};
const shopData = {
  "GLASS HOUSE": {
    headers: ["PRODOTTO", "1G", "2G", "5G"],
    products: [
      {
        name: "SKUNK FACE",
        "1g": "8€",
        "2g": "15€",
        "5g": "25€",
        offerta: false,
        new: false,
      },
      {
        name: "BLACK POISON",
        "1g": "5€",
        "2g": "10€",
        "5g": "20€",
        offerta: true,
        new: false,
      },
      {
        name: "LEMON HAZE",
        "1g": "5€",
        "2g": "10€",
        "5g": "20€",
        offerta: true,
        new: true,
      },
    ],
  },
  INDOOR: {
    headers: ["PRODOTTO", "1G", "2G", "5G"],
    products: [
      {
        name: "AMNESIA",
        "1g": "10€",
        "2g": "15€",
        "5g": "28€",
        offerta: false,
      },
      {
        name: "OG KUSH",
        "1g": "10€",
        "2g": "15€",
        "5g": "28€",
        offerta: false,
      },
      {
        name: "CARAMEL COOKIES",
        "1g": "10€",
        "2g": "15€",
        "5g": "28€",
        offerta: false,
      },
      {
        name: "TYSON HAZE",
        "1g": "10€",
        "2g": "15€",
        "5g": "28€",
        offerta: false,
      },
    ],
  },
  IDROPONICA: {
    headers: ["PRODOTTO", "1G", "2G", "5G"],
    products: [
      {
        name: "SUNSHINE",
        "1g": "10€",
        "2g": "17.5€",
        "5g": "30€",
        offerta: true,
      },
      { name: "HULK", "1g": "12€", "2g": "20€", "5g": "36€", offerta: false },
      {
        name: "ANDY PUNCH",
        "1g": "12€",
        "2g": "20€",
        "5g": "36€",
        offerta: false,
      },
    ],
  },
  HASHISH: {
    headers: ["PRODOTTO", "1G", "2G", "5G"],
    products: [
      {
        name: "SUPER POLLEN",
        "1g": "10€",
        "2g": "15€",
        "5g": "30€",
        offerta: false,
      },
      { name: "CHARAS", "1g": "10€", "2g": "15€", "5g": "30€", offerta: false },
      {
        name: "SUPER CREME 30%",
        "1g": "12€",
        "2g": "20€",
        "5g": "36€",
        offerta: false,
      },
      {
        name: "CRUMBLE (LEMON PIE 96%)",
        "1g": "15€",
        "2g": "23€",
        "5g": "40€",
        offerta: false,
      },
    ],
  },
  TRINCIATO: {
    headers: ["PRODOTTO", "10G", "20G", "50G"],
    products: [
      {
        name: "TRINCIATO CLASSICO",
        "10g": "10€",
        "20g": "20€",
        "50g": "50€",
        offerta: false,
      },
    ],
  },
};

// script.js
function renderCategories(data) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  for (const [category, categoryData] of Object.entries(data)) {
    const { products, headers, spanRow } = categoryData;

    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";

    const header = document.createElement("div");
    header.className = "category-header glow-text";
    header.textContent = category;
    categoryDiv.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "product-grid";

    // Create custom header row
    const headerRow = document.createElement("div");
    headerRow.className = "grid-row header";
    headers.forEach((text) => {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.textContent = text;
      headerRow.appendChild(cell);
    });
    grid.appendChild(headerRow);

    // Add span row if it exists
    if (spanRow) {
      const spanRowElement = document.createElement("div");
      spanRowElement.className = "grid-row span-row";
      const spanCell = document.createElement("div");
      spanCell.className = "grid-cell";
      spanCell.textContent = spanRow.text;
      spanCell.style.gridColumn = `span ${spanRow.colSpan}`;
      spanRowElement.appendChild(spanCell);
      grid.appendChild(spanRowElement);
    }

    // Create product rows
    products.forEach((product) => {
      const row = document.createElement("div");
      row.className = "grid-row";

      headers.forEach((key) => {
        const cell = document.createElement("div");
        cell.className = "grid-cell";

        if (key.toLowerCase() === "prodotto") {
          const productNameContainer = document.createElement("div");
          productNameContainer.className = "product-name";

          if (product.offerta) {
            const saleIcon = document.createElement("span");
            saleIcon.className = "sale-icon";
            productNameContainer.appendChild(saleIcon);
          }

          if (product.new) {
            const newIcon = document.createElement("span");
            newIcon.className = "new-icon";
            productNameContainer.appendChild(newIcon);
          }

          const nameSpan = document.createElement("span");
          nameSpan.textContent = product.name || "";
          productNameContainer.appendChild(nameSpan);

          cell.appendChild(productNameContainer);
        } else {
          cell.textContent = product[key.toLowerCase()] || "-";
        }

        row.appendChild(cell);
      });

      grid.appendChild(row);
    });

    categoryDiv.appendChild(grid);
    container.appendChild(categoryDiv);
  }
}

function animateLetters() {
  const shopName = document.getElementById("shop-name");
  shopName.innerHTML = "";

  config.shopName.split("").forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    shopName.appendChild(span);

    setTimeout(() => {
      span.classList.add("animated");
    }, 100 * index);
  });
}

// YouTube Player
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-player", {
    videoId: config.videoId,
    playerVars: {
      autoplay: 1,
      loop: 1,
      controls: 0,
      showinfo: 0,
      autohide: 1,
      modestbranding: 1,
      vq: config.videoQuality,
      playlist: config.videoId,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  event.target.mute();
  event.target.playVideo();
}

// Inizializzazione
document.addEventListener("DOMContentLoaded", () => {
  renderCategories(shopData);
  animateLetters();
});

document.querySelectorAll(".category").forEach((el, index) => {
  el.style.setProperty("animation-delay", index + 1 * 6 + "s");
});

// Esporta la funzione per l'API di YouTube
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
