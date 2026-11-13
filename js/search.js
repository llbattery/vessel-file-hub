
// VESSEL FILE HUB - DOCUMENT DATABASE

const documents = [
    // Add your documents here.
    // Example:
    // {
    //     name: "MV Example - Vessel Particulars.pdf",
    //     category: "vessel-files",
    //     path: "files/vessel-files/MV Example - Vessel Particulars.pdf"
    // }
];

const searchInput = document.getElementById("searchInput");
const resultsSection = document.getElementById("resultsSection");
const resultsTitle = document.getElementById("resultsTitle");
const fileList = document.getElementById("fileList");
const backButton = document.getElementById("backButton");
const statusMessage = document.getElementById("statusMessage");
const categories = document.querySelector(".categories");

let selectedCategory = null;

function showDocuments(category = null, search = "") {
    selectedCategory = category;

    const query = search.trim().toLowerCase();

    const filtered = documents.filter(file => {
        const matchesCategory =
            !category || file.category === category;

        const matchesSearch =
            file.name.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    categories.hidden = true;
    resultsSection.hidden = false;
    statusMessage.hidden = true;

    if (query && !category) {
        resultsTitle.textContent = "Search Results";
    } else {
        const titles = {
            "vessel-files": "Vessel Files",
            "voyage-plans": "Voyage Plans",
            "misc-excels": "Miscellaneous Files"
        };

        resultsTitle.textContent =
            titles[category] || "All Documents";
    }

    fileList.replaceChildren();

    if (filtered.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-message";
        empty.textContent = query
            ? "No matching documents found."
            : "No documents available in this category yet.";

        fileList.appendChild(empty);
        return;
    }

    filtered.forEach(file => {
        const item = document.createElement("div");
        item.className = "file-item";

        const name = document.createElement("a");
        name.textContent = "📄 " + file.name;
        name.href = file.path;
        name.target = "_blank";
        name.rel = "noopener";

        const type = document.createElement("span");
        type.className = "file-type";
        type.textContent = file.name.split(".").pop().toUpperCase();

        item.append(name, type);
        fileList.appendChild(item);
    });
}

// Category selection

document.querySelectorAll(".category-card").forEach(button => {
    button.addEventListener("click", () => {
        searchInput.value = "";
        showDocuments(button.dataset.category);
    });
});

// Search documents

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();

    if (query) {
        showDocuments(null, query);
    } else {
        resultsSection.hidden = true;
        categories.hidden = false;
        statusMessage.hidden = false;
    }
});

// Back button

backButton.addEventListener("click", () => {
    selectedCategory = null;
    searchInput.value = "";
    resultsSection.hidden = true;
    categories.hidden = false;
    statusMessage.hidden = false;
});
