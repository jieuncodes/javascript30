const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];
const unCheckAllBtn = document.querySelector(".uncheck-all");
const checkAllBtn = document.querySelector(".check-all");

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  this.reset();
  updateLocalStorageAndList();
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;

  items[index].done = !items[index].done;

  updateLocalStorageAndList();
}

function handleUncheckAll(e) {
  for (let i = 0; i < items.length; i++) {
    items[i].done = false;
  }

  updateLocalStorageAndList();
}

function handleCheckAll(e) {
  for (let i = 0; i < items.length; i++) {
    items[i].done = true;
  }
  updateLocalStorageAndList();
}

function updateLocalStorageAndList() {
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li> 
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      } />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
    })
    .join("");
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
unCheckAllBtn.addEventListener("click", handleUncheckAll);
checkAllBtn.addEventListener("click", handleCheckAll);

populateList(items, itemsList);
