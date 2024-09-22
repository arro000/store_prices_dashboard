// script.js
const config = {
  shopName: "",
  videoId: "GWA6cNhgSs4",
  videoQuality: "hd720",
};
const defaultShopData = {
  "🏠 GLASS HOUSE": {
    headers: ["PRODOTTO", "1G", "2G", "5G"],
    products: [
      {
        name: "SKUNK FACE",
        "1g": "8",
        "2g": "15",
        "5g": "25",
        offerta: false,
      },
      {
        name: "PINK PANTHER",
        "1g": "5",
        "2g": "10",
        "5g": "20",
        new: true,
        offerta: false,
      },
      {
        name: "LEMON HAZE",
        "1g": "5",
        "2g": "10",
        "5g": "20",
        offerta: true,
      },
    ],
  },
  "🌿 INDOOR": {
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
        name: "HONEY CHEESE",
        "1g": "10",
        "2g": "15",
        "5g": "28",
        new: true,
        offerta: false,
      },
      {
        name: "TYSON HAZE",
        "1g": "10",
        "2g": "15",
        "5g": "28",
        offerta: false,
      },
      {
        name: "STRAWBERRY",
        "1g": "10",
        "2g": "15",
        "5g": "28",
        offerta: false,
      },
    ],
  },
  "💧 IDROPONICA": {
    headers: ["PRODOTTO", "1G", "2G", "5G"],
    products: [
      {
        name: "WHITE WIDOW",
        "1g": "10",
        "2g": "17",
        "5g": "30",
        new: true,
        offerta: true,
      },
      {
        name: "AK47",
        "1g": "12",
        "2g": "20",
        "5g": "36",
        offerta: false,
      },
      { name: "HULK", "1g": "12", "2g": "20", "5g": "36", offerta: false },
      {
        name: "CANDY PUNCH",
        "1g": "12",
        "2g": "20",
        "5g": "36",
        offerta: false,
      },
    ],
  },
  "🍫 HASHISH": {
    headers: ["PRODOTTO", "1G", "2G", "5G"],
    products: [
      {
        name: "SUPER POLLEN",
        "1g": "10",
        "2g": "15",
        "5g": "30",
        offerta: false,
      },
      {
        name: "CHARAS",
        "1g": "10",
        "2g": "17.5",
        "5g": "33",
        offerta: false,
      },
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
  "🥦 TRINCIATO": {
    headers: ["PRODOTTO", "20G", "30G", "50G"],
    products: [
      {
        name: "TRINCIATO CLASSICO",
        "20g": "20",
        "30g": "30",
        "50g": "50",
        offerta: false,
      },
    ],
  },
  /*"🌳": {
    headers: ["PRODOTTO", "5G", "10G", "20G"],
    products: [
      {
        name: "SMALL BUDS",
        "5g": "15",
        "10g": "27.5",
        "20g": "50",
        offerta: false,
      },
    ],
  },*/
};

// script.js
function renderCategories(data) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  for (const [category, categoryData] of Object.entries(data)) {
    const { products, headers, spanRow } = categoryData;

    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";

    const headerContainer = document.createElement("div");
    headerContainer.className = "category-header glow-text";

    const categoryName = document.createElement("span");
    categoryName.className = "category-name";
    categoryName.textContent = category;

    const categoryActions = document.createElement("div");
    categoryActions.className = "category-actions";

    const leftButtons = document.createElement("div");
    leftButtons.className = "left-buttons";

    const editButton = document.createElement("button");
    editButton.textContent = "✏️ Modifica";
    editButton.onclick = () => editCategory(category);

    const addButton = document.createElement("button");
    addButton.textContent = "➕ Aggiungi Prodotto";
    addButton.onclick = () => addProductToCategory(category);

    leftButtons.appendChild(editButton);
    leftButtons.appendChild(addButton);

    const rightButtons = document.createElement("div");
    rightButtons.className = "right-buttons";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️ Elimina";
    deleteButton.className = "delete-button";
    deleteButton.onclick = () => deleteCategory(category);

    rightButtons.appendChild(deleteButton);

    categoryActions.appendChild(leftButtons);
    categoryActions.appendChild(rightButtons);

    headerContainer.appendChild(categoryName);
    headerContainer.appendChild(categoryActions);

    categoryDiv.appendChild(headerContainer);

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
      });

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

      const empty = document.createElement("div");
      empty.className = "grid-cell actions-container";
      row.appendChild(empty);

      const deleteContainer = document.createElement("div");
      deleteContainer.className = "grid-cell actions-container";
      deleteContainer.appendChild(deleteButton);
      row.appendChild(deleteContainer);

      grid.appendChild(row);
    });

    categoryDiv.appendChild(grid);
    container.appendChild(categoryDiv);
  }
}

function editCategory(category) {
  const categoryData = shopData[category];
  if (categoryData) {
    const actionElement = document.getElementById("categoryAction");
    const categoryNameElement = document.getElementById("categoryName");
    const oldCategoryNameElement = document.getElementById("oldCategoryName");
    const categoryHeadersElement = document.getElementById("categoryHeaders");
    const categoryModalElement = document.getElementById("categoryModal");

    if (actionElement) actionElement.value = "update";
    if (categoryNameElement) categoryNameElement.value = category;
    if (oldCategoryNameElement) oldCategoryNameElement.value = category;
    if (categoryHeadersElement)
      categoryHeadersElement.value = categoryData.headers.join(", ");
    if (categoryModalElement) categoryModalElement.style.display = "block";
  }
}
function addCategoryModal() {
  const actionElement = document.getElementById("categoryAction");
  const categoryNameElement = document.getElementById("categoryName");
  const oldCategoryNameElement = document.getElementById("oldCategoryName");
  const categoryHeadersElement = document.getElementById("categoryHeaders");
  const categoryModalElement = document.getElementById("categoryModal");

  if (actionElement) actionElement.value = "add";
  if (categoryNameElement) categoryNameElement.value = "";
  if (oldCategoryNameElement) oldCategoryNameElement.value = "";
  if (categoryHeadersElement) categoryHeadersElement.value = "";
  if (categoryModalElement) categoryModalElement.style.display = "block";
}

function deleteCategory(category) {
  if (confirm(`Sei sicuro di voler eliminare la categoria ${category}?`)) {
    delete shopData[category];
    saveShopData();
    renderCategories(shopData);
  }
}

function saveShopData() {
  localStorage.setItem("shopData", JSON.stringify(shopData));
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

function addProductToCategory(category) {
  const actionElement = document.getElementById("productAction");
  const categoryElement = document.getElementById("category");
  const productModalElement = document.getElementById("productModal");
  updateCategorySelect();

  if (actionElement) actionElement.value = "add";
  if (categoryElement) {
    categoryElement.value = category;
  }
  if (productModalElement) productModalElement.style.display = "block";

  updateProductForm(category);
}

function updateCategorySelect() {
  const categorySelect = document.getElementById("category");
  categorySelect.innerHTML = "";
  Object.keys(shopData).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
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
  document.getElementById("resetBtn").addEventListener("click", resetToDefault);
  document
    .getElementById("clearLocalStorageBtn")
    .addEventListener("click", clearLocalStorage);
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
  const categorySelect = document.getElementById("category");
  updateCategorySelect();

  productBtn.onclick = () => {
    updateCategorySelect();
    modal.style.display = "block";
  };
  categoryBtn.onclick = () => addCategoryModal();

  Array.from(spans).forEach((span) => {
    span.onclick = () => {
      modal.style.display = "none";
      categoryModal.style.display = "none";
    };
  });

  window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
    if (event.target == categoryModal) categoryModal.style.display = "none";
  };

  productAction.onchange = () => {
    productDetails.style.display =
      productAction.value === "remove" ? "none" : "flex";
  };

  categoryAction.onchange = () => {
    categoryDetails.style.display =
      categoryAction.value === "remove" ? "none" : "flex";
  };

  function updateCategorySelect() {
    categorySelect.innerHTML = "";
    Object.keys(shopData).forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  }

  productForm.onsubmit = (e) => {
    e.preventDefault();
    const category = document.getElementById("category").value;
    const productName = document.getElementById("productName").value;

    const getProductData = () => {
      const data = {
        name: productName,
        offerta: document.getElementById("offerta").checked,
        new: document.getElementById("new").checked,
      };

      const headers = shopData[category].headers.slice(1); // Exclude "PRODOTTO"
      headers.forEach((header) => {
        const inputId = `price${header.toLowerCase()}`;
        const input = document.getElementById(inputId);
        if (input) {
          data[header.toLowerCase()] = input.value;
        }
      });

      return data;
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
    const headers = "PRODOTTO, 1G, 2G, 5G" // document
      //   .getElementById("categoryHeaders")
      // .value
      .split(",")
      .map((h) => h.trim());

    switch (categoryAction.value) {
      case "add":
        addCategory(categoryName, headers);
        break;
      case "remove":
        removeCategory(categoryName);
        break;
      case "update":
        const oldCategoryName =
          document.getElementById("oldCategoryName").value;
        updateCategory(oldCategoryName, categoryName, headers);
        break;
    }

    categoryModal.style.display = "none";
    categoryForm.reset();
  };
}

function updateProductForm(category) {
  const productDetails = document.getElementById("productDetails");
  productDetails.innerHTML = "";

  const headers = shopData[category].headers.slice(1); // Exclude "PRODOTTO"
  headers.forEach((header) => {
    const input = document.createElement("input");
    input.type = "text";
    input.id = `price${header.toLowerCase()}`;
    input.placeholder = `Prezzo ${header}`;
    productDetails.appendChild(input);
  });

  const offertaLabel = document.createElement("label");
  offertaLabel.innerHTML = '<input type="checkbox" id="offerta"> Offerta';
  productDetails.appendChild(offertaLabel);

  const newLabel = document.createElement("label");
  newLabel.innerHTML = '<input type="checkbox" id="new"> Nuovo';
  productDetails.appendChild(newLabel);
}

// Add this to your existing event listeners
document.getElementById("category").addEventListener("change", function () {
  updateProductForm(this.value);
});

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

function resetToDefault() {
  if (
    confirm(
      "Sei sicuro di voler ripristinare la configurazione predefinita? Tutti i dati personalizzati saranno persi."
    )
  ) {
    localStorage.removeItem("shopData");
    shopData = JSON.parse(JSON.stringify(defaultShopData));
    renderCategories(shopData);
    alert("Configurazione predefinita ripristinata con successo!");
  }
}

function clearLocalStorage() {
  if (
    confirm(
      "Sei sicuro di voler eliminare tutti i dati locali? Questa azione non può essere annullata."
    )
  ) {
    localStorage.clear();
    shopData = JSON.parse(JSON.stringify(defaultShopData));
    renderCategories(shopData);
    alert(
      "Dati locali eliminati con successo. L'applicazione sta utilizzando la configurazione predefinita."
    );
  }
}

document.querySelectorAll(".category").forEach((el, index) => {
  el.style.setProperty("animation-delay", index + 1 * 6 + "s");
});

// Esporta la funzione per l'API di YouTube
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
function updateCategory(oldCategoryName, newCategoryName, headers) {
  if (oldCategoryName !== newCategoryName) {
    shopData[newCategoryName] = shopData[oldCategoryName];
    delete shopData[oldCategoryName];
  }
  shopData[newCategoryName].headers = headers;
  saveShopData();
  renderCategories(shopData);
}
function addCategory(newCategoryName, headers) {
  shopData[newCategoryName] = { products: [], headers };
  saveShopData();
  renderCategories(shopData);
}

function addProduct(category, productData) {
  shopData[category].products.push(productData);
  saveShopData();
  renderCategories(shopData);
}

function updateProduct(category, productName, updatedData) {
  const productIndex = shopData[category].products.findIndex(
    (p) => p.name === productName
  );
  if (productIndex !== -1) {
    shopData[category].products[productIndex] = {
      ...shopData[category].products[productIndex],
      ...updatedData,
    };
    saveShopData();
    renderCategories(shopData);
  }
}

function removeProduct(category, productName) {
  const productIndex = shopData[category].products.findIndex(
    (p) => p.name === productName
  );
  if (productIndex !== -1) {
    shopData[category].products.splice(productIndex, 1);
    saveShopData();
    renderCategories(shopData);
  }
}
