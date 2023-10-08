const mainContainer = document.getElementById("container");
const mainHeading = document.getElementById("main-header");
const formItem = document.getElementById("item-form");

const formItemInput = document.getElementById("item-input");
const onSubmitItem = document.getElementById("form-control-btn");
const filterItems = document.getElementById("filter-items");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");

//add event listeners:
formItem.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(formItemInput.value);

  if (formItemInput.value === "") {
    alert("Please Enter Item");
    return;
  }
  const li = createNewLi(formItemInput.value);
  //inserted elemnt display at top
  itemList.insertBefore(li, itemList.firstChild);
  //itemList.appendChild(li);
  formItemInput.value = "";
  displaySearchBar();
});

const createNewLi = (value) => {
  //create new Li element
  const li = document.createElement("li");
  const val =
    value.toUpperCase().charAt(0) + value.toLowerCase().slice(1) + " ";

  //append text inside Li
  li.appendChild(document.createTextNode(val));

  //create button element
  const button = document.createElement("button");
  //add className in button
  button.className = "remove-item btn-link text-red";

  //create i element
  const i = document.createElement("i");
  //add className into i
  i.className = "fa-solid fa-remove";

  li.appendChild(button);
  button.appendChild(i);

  return li;
};

const onRemoveItem = (e) => {
  console.log("Parent element:" + e.target.parentElement);
  console.log(e.target.parentElement.classList.contains("remove-item"));
  if (e.target.parentElement.classList.contains("remove-item")) {
    console.log(
      "Parent element>>Parent Element:: " + e.target.parentElement.parentElement
    );
    if (
      confirm(
        "do you want to remove: " +
          e.target.parentElement.parentElement.innerText +
          " ?"
      )
    ) {
      e.target.parentElement.parentElement.remove();
    }
  }
  displaySearchBar();
};

const clearItems = () => {
  console.log("object");
  console.log(itemList.firstChild);
  alert("do you want to remove all items?");
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  displaySearchBar();
};

const searchItem = (e) => {
  const searchedText = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();

    if (itemName.indexOf(searchedText) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

const displaySearchBar = () => {
  const allItems = itemList.querySelectorAll("li");
  if (allItems.length === 0) {
    console.log("display searchbar: off");
    clearBtn.style.display = "none";
    filterItems.style.display = "none";
  } else {
    console.log("display searchbar: on");
    clearBtn.style.display = "block";
    filterItems.style.display = "block";
  }
};

itemList.addEventListener("click", onRemoveItem);
clearBtn.addEventListener("click", clearItems);
filterItems.addEventListener("input", searchItem);

displaySearchBar();
