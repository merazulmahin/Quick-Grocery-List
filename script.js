
    let input = document.getElementById("item-input");
    let addBtn = document.getElementById("add-btn");
    let listEl = document.getElementById("list");
    let emptyMessageEl = document.getElementById("empty-message");
    let countTextEl = document.getElementById("count-text");
    let clearBtn = document.getElementById("clear-btn");

    let items = [];

    function addItem() {
      let text = input.value.trim();
      if (text === "") return;
      items.push({ text: text, done: false });
      input.value = "";
      renderList();
    }

    function toggleItem(index) {
      items[index].done = !items[index].done;
      renderList();
    }

    function deleteItem(index) {
      items.splice(index, 1);
      renderList();
    }

    function clearAll() {
      if (!confirm("Clear all items?")) return;
      items = [];
      renderList();
    }

    function renderList() {
      listEl.innerHTML = "";
      emptyMessageEl.style.display = items.length === 0 ? "block" : "none";

      items.forEach(function (item, index) {
        let li = document.createElement("li");
        li.className = "item" + (item.done ? " completed" : "");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.done;
        checkbox.addEventListener("change", function () {
          toggleItem(index);
        });

        let span = document.createElement("span");
        span.className = "item-text";
        span.textContent = item.text;

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "✕";
        deleteBtn.addEventListener("click", function () {
          deleteItem(index);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        listEl.appendChild(li);
      });

      countTextEl.textContent =
        items.length + (items.length === 1 ? " item" : " items");
    }

    addBtn.addEventListener("click", addItem);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") addItem();
    });
    clearBtn.addEventListener("click", clearAll);
