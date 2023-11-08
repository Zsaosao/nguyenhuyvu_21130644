let arrayBook = [];
let currentId = 0;
const findEmptyId = () => {
    let id = 1;
    while (arrayBook.find((book) => book.id === id)) {
        id++;
    }
    return id;
};
const fechtData = async () => {
    fetch("./hardcodedata.json")
        .then((response) => response.json())
        .then((data) => {
            data.listBook.forEach((book) => {
                arrayBook.push(book);
            });
        })
        .then(() => {
            renderListBook();
        });
};
fechtData();
const renderListBook = () => {
    const listBook = document.getElementById("list-book");
    listBook.innerHTML = "";
    arrayBook.forEach((book) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td class="displayNoneOnPhoneAndTablet">${book.author}</td>
            <td class="displayNoneOnPhoneAndTablet">${book.publishingYear}</td>
            <td>${book.price}</td>
            
            <td>${book.quantity}</td>
            <td  class="displayNoneOnPhone">
                <img src="${book.image}" alt="" style="width="40px; height=60px" "/>
            </td>

            <td>
                <button class="btn btn-primary btn-sm">Edit</button>
            </td>
            <td>
                <button class="btn btn-danger btn-sm">Delete</button>
            </td>
        `;
        row.querySelector(".btn-danger").addEventListener("click", () => {
            deleteBook(book.id);
        });
        row.querySelector(".btn-primary").addEventListener("click", () => {
            editBook(book.id);
        });

        listBook.appendChild(row);
    });
};
const addBook = () => {
    const title = document.getElementById("title-input").value || "No title";
    const publishingYear =
        document.getElementById("publishingYear-input").value || 0;
    const author = document.getElementById("author-input").value || "No author";
    const price = document.getElementById("price-input").value || 0;
    const quantity = document.getElementById("quantity-input").value || 0;

    const image =
        document.getElementById("image-preview").src ||
        "assets/images/imgaenotavailable.png";

    const newBook = {
        id: findEmptyId(),
        title,
        publishingYear: parseInt(publishingYear),
        author,
        price: parseInt(price),
        quantity: parseInt(quantity),
        image,
    };
    arrayBook.push(newBook);
    clearInputAndPreview();
    renderListBook();
};

const addBookAddEventListener = () => {
    const addBtn = document.getElementById("add-book");
    addBtn.addEventListener("click", addBook);
};
addBookAddEventListener();

const previewBook = () => {
    const img = document.getElementById("image-preview");

    const title = document.getElementById("title-input");
    const publishingYear = document.getElementById("publishingYear-input");
    const author = document.getElementById("author-input");
    const price = document.getElementById("price-input");
    const quantity = document.getElementById("quantity-input");

    const titlePreview = document.getElementById("title-preview");
    const publishingYearPreview = document.getElementById(
        "publishingYear-preview"
    );
    const authorPreview = document.getElementById("author-preview");
    const pricePreview = document.getElementById("price-preview");
    const quantityPreview = document.getElementById("quantity-preview");
    const id = document.getElementById("id-preview");

    document.getElementById("image-input").addEventListener("change", (e) => {
        id.innerHTML =
            currentId !== 0 ? "ID: " + currentId : "ID: " + findEmptyId();
        img.src = URL.createObjectURL(e.target.files[0]);
    });

    title.addEventListener("input", () => {
        id.innerHTML =
            currentId !== 0 ? "ID: " + currentId : "ID: " + findEmptyId();
        titlePreview.innerHTML = "Tên quyển sách: " + title.value;
    });
    publishingYear.addEventListener("input", () => {
        id.innerHTML =
            currentId !== 0 ? "ID: " + currentId : "ID: " + findEmptyId();
        publishingYearPreview.innerHTML =
            "Năm xuất bản::" + publishingYear.value;
    });
    author.addEventListener("input", () => {
        id.innerHTML =
            currentId !== 0 ? "ID: " + currentId : "ID: " + findEmptyId();
        authorPreview.innerHTML = "Tên tác giả: " + author.value;
    });
    price.addEventListener("input", () => {
        id.innerHTML =
            currentId !== 0 ? "ID: " + currentId : "ID: " + findEmptyId();
        pricePreview.innerHTML = "Giá bán: " + price.value;
    });
    quantity.addEventListener("input", () => {
        id.innerHTML =
            currentId !== 0 ? "ID: " + currentId : "ID: " + findEmptyId();
        quantityPreview.innerHTML = "Số lượng: " + quantity.value;
    });
};

previewBook();

const deleteBook = (id) => {
    arrayBook = arrayBook.filter((book) => book.id !== id);
    renderListBook();
};
const clearInputAndPreview = () => {
    document.getElementById("title-input").value = "";
    document.getElementById("publishingYear-input").value = "";
    document.getElementById("author-input").value = "";
    document.getElementById("price-input").value = "";
    document.getElementById("quantity-input").value = "";
    document.getElementById("image-preview").src = "";

    document.getElementById("title-preview").innerHTML = "Tên quyển sách: ";
    document.getElementById("publishingYear-preview").innerHTML =
        "Năm xuất bản:";
    document.getElementById("author-preview").innerHTML = "Tên tác giả:";
    document.getElementById("price-preview").innerHTML = "Giá bán:";
    document.getElementById("quantity-preview").innerHTML = "Số lượng:";
    document.getElementById("id-preview").innerHTML = "ID:";
    document.getElementById("image-preview").src =
        "assets/images/imgaenotavailable.png";
};
const editBook = (id) => {
    const book = arrayBook.find((book) => book.id === id);
    document.getElementById("title-input").value = book.title;
    document.getElementById("publishingYear-input").value = book.publishingYear;
    document.getElementById("author-input").value = book.author;
    document.getElementById("price-input").value = book.price;
    document.getElementById("quantity-input").value = book.quantity;
    document.getElementById("image-input").setAttribute("src", book.image);

    document.getElementById("title-preview").innerHTML =
        "Tên quyển sách: " + book.title;
    document.getElementById("publishingYear-preview").innerHTML =
        "Năm xuất bản: " + book.publishingYear;
    document.getElementById("author-preview").innerHTML =
        "Tên tác giả: " + book.author;
    document.getElementById("price-preview").innerHTML =
        "Giá bán: " + book.price;
    document.getElementById("quantity-preview").innerHTML =
        "Số lượng: " + book.quantity;
    currentId = book.id;
    document.getElementById("id-preview").innerHTML = "ID: " + book.id;

    document.getElementById("image-preview").src = book.image;
    updateBook();
};

const updateBook = () => {
    const btnAdd = document.getElementById("add-book");
    btnAdd.setAttribute("style", "display: none");
    const btnUpdate = document.getElementById("update-book");
    btnUpdate.setAttribute("style", "display: inline-block");

    btnUpdate.addEventListener("click", () => {
        const title = document.getElementById("title-input").value;
        const publishingYear = document.getElementById(
            "publishingYear-input"
        ).value;
        const author = document.getElementById("author-input").value;
        const price = document.getElementById("price-input").value;
        const quantity = document.getElementById("quantity-input").value;
        const image = document.getElementById("image-preview").src;

        const book = arrayBook.find((book) => book.id === currentId);
        book.title = title;
        book.publishingYear = publishingYear;
        book.author = author;
        book.price = price;
        book.quantity = quantity;
        book.image = image;

        clearInputAndPreview();
        renderListBook();
        btnAdd.setAttribute("style", "display: inline-block");
        btnUpdate.setAttribute("style", "display: none");
        currentId = 0;
    });
};

const searchBook = () => {
    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value;
        const searchResult = arrayBook.filter((book) => {
            if (Number(searchValue)) {
                return book.id == searchValue;
            }
            const bookTitleRemoveAccents = removeAccents(book.title);
            const bookAuthorRemoveAccents = removeAccents(book.author);

            const searchValueRemoveAccents = removeAccents(searchValue);
            return (
                bookTitleRemoveAccents
                    .toLowerCase()
                    .includes(searchValueRemoveAccents.toLowerCase()) ||
                bookAuthorRemoveAccents
                    .toLowerCase()
                    .includes(searchValueRemoveAccents.toLowerCase())
            );
        });
        if (searchValue !== "") {
            renderSearchResult(searchResult);
        } else {
            clearSearchResult();
        }
    });
};
const clearSearchResult = () => {
    const searchList = document.getElementById("search_list");
    searchList.innerHTML = "";
};
const renderSearchResult = (searchResult) => {
    const searchList = document.getElementById("search_list");
    searchList.innerHTML = "";
    searchResult.forEach((book) => {
        const row = document.createElement("div");
        row.classList.add("col-2");
        row.classList.add("my-2");
        row.classList.add("p-0");
        row.classList.add("rounded");
        row.classList.add("overflow-hidden");
        row.classList.add("me-2");
        row.classList.add("bg-dark");

        row.innerHTML = `
                <div
                    style="background-color: black"
                    class="d-flex justify-content-center align-items-center overflow-hidden"
                >
                    <img
                        class="object-fit-cover d-block w-100 "
                        src="${book.image}"
                        alt=""
                        style="border-radius: 0.5rem ; height: 100px"
                    />
                </div>
                <div class="p-1">
                    <div class="text-white" style="font-size: 0.625rem">
                        <div class="fw-bold">Tên sách: ${book.title}</div>
                        <div class="fw-bold">Tác giả ${book.author}</div>

                        <div class="fw-bold displayNoneOnPhoneAndTablet">Giá: ${book.price} VND và còn ${book.quantity} quyển</div>

                        <div class="fw-bold">ID ${book.id}</div>
                    </div>
                </div>`;

        searchList.appendChild(row);
    });
};

searchBook();
function removeAccents(str) {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ",
        "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
}
