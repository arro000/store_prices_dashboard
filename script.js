// script.js
const config = {
  shopName: "",
  videoId: "GWA6cNhgSs4",
  videoQuality: "hd720",
};
const defaultShopData = {
  "GLASS HOUSE": {
    headers: ["PRODOTTO", "1G", "2G", "5G"],
    products: [
      {
        name: "SKUNK FACE",
        "1g": "8",
        "2g": "15",
        "5g": "25",
        offerta: false,
        new: false,
      },
      {
        name: "BLACK POISON",
        "1g": "5",
        "2g": "10",
        "5g": "20",
        offerta: true,
        new: false,
      },
      {
        name: "LEMON HAZE",
        "1g": "5",
        "2g": "10",
        "5g": "20",
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
        "1g": "10",
        "2g": "15",
        "5g": "28",
        offerta: false,
      },
      {
        name: "OG KUSH",
        "1g": "10",
        "2g": "15",
        "5g": "28",
        offerta: false,
      },
      {
        name: "CARAMEL COOKIES",
        "1g": "10",
        "2g": "15",
        "5g": "28",
        offerta: false,
      },
      {
        name: "TYSON HAZE",
        "1g": "10",
        "2g": "15",
        "5g": "28",
        offerta: false,
      },
    ],
  },
  IDROPONICA: {
    headers: ["PRODOTTO", "1G", "2G", "5G"],
    products: [
      {
        name: "SUNSHINE",
        "1g": "10",
        "2g": "17.5",
        "5g": "30",
        offerta: true,
      },
      { name: "HULK", "1g": "12", "2g": "20", "5g": "36", offerta: false },
      {
        name: "ANDY PUNCH",
        "1g": "12",
        "2g": "20",
        "5g": "36",
        offerta: false,
      },
    ],
  },
  HASHISH: {
    headers: ["PRODOTTO", "1G", "2G", "5G"],
    products: [
      {
        name: "SUPER POLLEN",
        "1g": "10",
        "2g": "15",
        "5g": "30",
        offerta: false,
      },
      { name: "CHARAS", "1g": "10", "2g": "15", "5g": "30", offerta: false },
      {
        name: "SUPER CREME 30%",
        "1g": "12",
        "2g": "20",
        "5g": "36",
        offerta: false,
      },
      {
        name: "CRUMBLE (LEMON PIE 96%)",
        "1g": "15",
        "2g": "23",
        "5g": "40",
        offerta: false,
      },
    ],
  },
  TRINCIATO: {
    headers: ["PRODOTTO", "10G", "20G", "50G"],
    products: [
      {
        name: "TRINCIATO CLASSICO",
        "10g": "10",
        "20g": "20",
        "50g": "50",
        offerta: false,
      },
    ],
  },
};

let shopData = JSON.parse(localStorage.getItem("shopData")) || defaultShopData;

function saveShopData() {
  localStorage.setItem("shopData", JSON.stringify(shopData));
}

// Funzione per aggiungere una nuova categoria
function addCategory(categoryName, headers) {
  if (!shopData[categoryName]) {
    shopData[categoryName] = {
      headers: headers,
      products: []
    };
    saveShopData();
    renderCategories(shopData);
  } else {
    console.error("Categoria già esistente:", categoryName);
  }
}

// Funzione per rimuovere una categoria
function removeCategory(categoryName) {
  if (shopData[categoryName]) {
    delete shopData[categoryName];
    saveShopData();
    renderCategories(shopData);
  } else {
    console.error("Categoria non trovata:", categoryName);
  }
}

// Funzione per aggiornare una categoria
function updateCategory(oldCategoryName, newCategoryName, newHeaders) {
  if (shopData[oldCategoryName]) {
    if (oldCategoryName !== newCategoryName) {
      shopData[newCategoryName] = shopData[oldCategoryName];
      delete shopData[oldCategoryName];
    }
    shopData[newCategoryName].headers = newHeaders;
    saveShopData();
    renderCategories(shopData);
  } else {
    console.error("Categoria non trovata:", oldCategoryName);
  }
}

// Funzione per aggiungere un nuovo prodotto
function addProduct(category, product) {
  if (shopData[category]) {
    shopData[category].products.push(product);
    saveShopData();
    renderCategories(shopData);
  } else {
    console.error("Categoria non trovata:", category);
  }
}

// Funzione per rimuovere un prodotto
function removeProduct(category, productName) {
  if (shopData[category]) {
    const index = shopData[category].products.findIndex(
      (p) => p.name === productName
    );
    if (index !== -1) {
      shopData[category].products.splice(index, 1);
      saveShopData();
      renderCategories(shopData);
    } else {
      console.error("Prodotto non trovato:", productName);
    }
  } else {
    console.error("Categoria non trovata:", category);
  }
}

// Funzione per aggiornare le proprietà di un prodotto
function updateProduct(category, productName, updatedProperties) {
  if (shopData[category]) {
    const product = shopData[category].products.find(
      (p) => p.name === productName
    );
    if (product) {
      Object.assign(product, updatedProperties);
      saveShopData();
      renderCategories(shopData);
    } else {
      console.error("Prodotto non trovato:", productName);
    }
  } else {
    console.error("Categoria non trovata:", category);
  }
}

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

      headers.forEach((key, index) => {
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
          const priceSpan = document.createElement("span");
          priceSpan.className = "price";
          cell.className = cell.className + " price-cell";
          priceSpan.textContent = product[key.toLowerCase()] + "€" || "-";
          cell.appendChild(priceSpan);
        }

        row.appendChild(cell);
        if (index === headers.length - 1 && index != 0) {
          const actionsContainer = document.createElement("div");
          actionsContainer.className = "grid-cell actions-container";

          const editButton = document.createElement("button");
          editButton.textContent = "Modifica";
          editButton.className = "edit-button";
          editButton.onclick = () => editProduct(category, product.name);

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Elimina";
          deleteButton.className = "delete-button";
          deleteButton.onclick = () => deleteProduct(category, product.name);

          actionsContainer.appendChild(editButton);
          row.appendChild(actionsContainer);

          let empty = document.createElement("div");
          empty.className = "grid-cell actions-container";
          row.appendChild(empty);
          empty = document.createElement("div");
          empty.className = "grid-cell actions-container";

          empty.appendChild(deleteButton);
          row.appendChild(empty);
        }
      });

      grid.appendChild(row);
    });

    categoryDiv.appendChild(grid);
    container.appendChild(categoryDiv);
  }
}

function editProduct(category, productName) {
  const product = shopData[category].products.find(
    (p) => p.name === productName
  );
  if (product) {
    const actionElement = document.getElementById("productAction");
    const categoryElement = document.getElementById("category");
    const productNameElement = document.getElementById("productName");
    const price1gElement = document.getElementById("price1g");
    const price2gElement = document.getElementById("price2g");
    const price5gElement = document.getElementById("price5g");
    const offertaElement = document.getElementById("offerta");
    const newElement = document.getElementById("new");
    const productModalElement = document.getElementById("productModal");

    if (actionElement) actionElement.value = "update";
    if (categoryElement) categoryElement.value = category;
    if (productNameElement) productNameElement.value = productName;

    if (category === "TRINCIATO") {
      if (price1gElement) price1gElement.value = product["10g"] || "";
      if (price2gElement) price2gElement.value = product["20g"] || "";
      if (price5gElement) price5gElement.value = product["50g"] || "";
    } else {
      if (price1gElement) price1gElement.value = product["1g"] || "";
      if (price2gElement) price2gElement.value = product["2g"] || "";
      if (price5gElement) price5gElement.value = product["5g"] || "";
    }

    if (offertaElement) offertaElement.checked = product.offerta;
    if (newElement) newElement.checked = product.new;
    if (productModalElement) productModalElement.style.display = "block";
  }
}

function deleteProduct(category, productName) {
  if (
    confirm(
      `Sei sicuro di voler eliminare ${productName} dalla categoria ${category}?`
    )
  ) {
    removeProduct(category, productName);
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
  shopData = JSON.parse(localStorage.getItem("shopData")) || defaultShopData;
  renderCategories(shopData);
  animateLetters();
  setupModal();

  document.getElementById("exportBtn").addEventListener("click", exportConfig);
  document.getElementById("importBtn").addEventListener("click", importConfig);
});

function setupModal() {
  const modal = document.getElementById("productModal");
  const categoryModal = document.getElementById("categoryModal");
  const productBtn = document.getElementById("openProductModalBtn");
  const categoryBtn = document.getElementById("openCategoryModalBtn");
  const spans = document.getElementsByClassName("close");
  const productForm = document.getElementById("productForm");
  const categoryForm = document.getElementById("categoryForm");
  const productAction = document.getElementById("productAction");
  const categoryAction = document.getElementById("categoryAction");
  const productDetails = document.getElementById("productDetails");
  const categoryDetails = document.getElementById("categoryDetails");

  productBtn.onclick = () => (modal.style.display = "block");
  categoryBtn.onclick = () => (categoryModal.style.display = "block");
  
  Array.from(spans).forEach(span => {
    span.onclick = () => {
      modal.style.display = "none";
      categoryModal.style.display = "none";
    }
  });

  window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
    if (event.target == categoryModal) categoryModal.style.display = "none";
  };

  productAction.onchange = () => {
    productDetails.style.display = productAction.value === "remove" ? "none" : "flex";
  };

  categoryAction.onchange = () => {
    categoryDetails.style.display = categoryAction.value === "remove" ? "none" : "flex";
  };

  productForm.onsubmit = (e) => {
    e.preventDefault();
    const category = document.getElementById("category").value;
    const productName = document.getElementById("productName").value;

    const getProductData = () => {
      if (category === "TRINCIATO") {
        return {
          name: productName,
          "10g": document.getElementById("price1g").value,
          "20g": document.getElementById("price2g").value,
          "50g": document.getElementById("price5g").value,
          offerta: document.getElementById("offerta").checked,
          new: document.getElementById("new").checked,
        };
      } else {
        return {
          name: productName,
          "1g": document.getElementById("price1g").value,
          "2g": document.getElementById("price2g").value,
          "5g": document.getElementById("price5g").value,
          offerta: document.getElementById("offerta").checked,
          new: document.getElementById("new").checked,
        };
      }
    };

    switch (productAction.value) {
      case "add":
        addProduct(category, getProductData());
        break;
      case "remove":
        removeProduct(category, productName);
        break;
      case "update":
        updateProduct(category, productName, getProductData());
        break;
    }

    modal.style.display = "none";
    productForm.reset();
  };

  categoryForm.onsubmit = (e) => {
    e.preventDefault();
    const categoryName = document.getElementById("categoryName").value;
    const headers = document.getElementById("categoryHeaders").value.split(',').map(h => h.trim());

    switch (categoryAction.value) {
      case "add":
        addCategory(categoryName, headers);
        break;
      case "remove":
        removeCategory(categoryName);
        break;
      case "update":
        const oldCategoryName = document.getElementById("oldCategoryName").value;
        updateCategory(oldCategoryName, categoryName, headers);
        break;
    }

    categoryModal.style.display = "none";
    categoryForm.reset();
  };
}

function exportConfig() {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(shopData));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "shop_config.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function importConfig() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const importedData = JSON.parse(e.target.result);
        shopData = importedData;
        saveShopData();
        renderCategories(shopData);
        alert("Configurazione importata con successo!");
      } catch (error) {
        alert(
          "Errore durante l'importazione della configurazione: " + error.message
        );
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

document.querySelectorAll(".category").forEach((el, index) => {
  el.style.setProperty("animation-delay", index + 1 * 6 + "s");
});

// Esporta la funzione per l'API di YouTube
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
