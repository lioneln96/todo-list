// Add task function
function addTask() {
  var taskName = prompt("Enter task name:");
  if (taskName) {
    // Create a new task card element
    var cardContent = document.createElement("div");
    cardContent.className = "card-content";
    cardContent.draggable = true;
    cardContent.innerText = taskName;

    // Determine the current card list
    var currentCardList = event.target.closest(".card").querySelector(".card-body");

    // Set background color based on the current card list
    if (currentCardList.id === "todo-list") {
      cardContent.style.backgroundColor = "#ff6347"; // Red for To Do
    } else if (currentCardList.id === "inprogress-list") {
      cardContent.style.backgroundColor = "#ffa500"; // Orange for In Progress
    } else if (currentCardList.id === "done-list") {
      cardContent.style.backgroundColor = "#32cd32"; // Green for Done
    }

    // Append the new task card to the current card list
    currentCardList.appendChild(cardContent);

    // Add drag event listener to the new card
    cardContent.addEventListener('dragstart', drag);
  }
}

// Allow drop function
function allowDrop(event) {
  event.preventDefault();
}

// Drag function
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

// Drop function
function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var targetCard = event.target.closest(".card-body");

  // Set background color of the dropped card based on the target card list
  if (targetCard.id === "todo-list") {
    document.getElementById(data).style.backgroundColor = "#ff6347";
  } else if (targetCard.id === "inprogress-list") {
    document.getElementById(data).style.backgroundColor = "#ffa500";
  } else if (targetCard.id === "done-list") {
    document.getElementById(data).style.backgroundColor = "#32cd32";
  }

  // Append the dropped card to the target card list
  targetCard.appendChild(document.getElementById(data));
}

// Event listeners
document.querySelectorAll('.card-body').forEach(function(cardBody) {
  cardBody.addEventListener('drop', drop);
  cardBody.addEventListener('dragover', allowDrop);
});





