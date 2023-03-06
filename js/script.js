// Selectors for inputs, buttons, and error handling paragraph
const reminderTitle = document.querySelector(".note-title");
const reminderBody = document.querySelector(".note-textarea");
const saveBtn = document.querySelector(".save-note");
const newBtn = document.querySelector(".new-note");
const clearStorageBtn = document.querySelector(".clear-storage");
const notification = document.querySelector(".notify-user");

// remindersArray is either an empty array or the latest array of reminder objects pulled from localStorage
let remindersArray = [];
const ulEl = document.getElementById("list-group");

const saveReminder = () => {
	notification.classList.add("hidden");

	// Local Storage only allows strings to be stored so need to JSON.parse to get it back into an array of reminder objects
	remindersArray = JSON.parse(localStorage.getItem("reminders"))

	// If no reminders, needs to be empty array so we can push on to it later
	if (!remindersArray) {
		remindersArray = [];
	}

	// Grabs text of input and text area field and stores in variables
	const titleValue = reminderTitle.value;
	const bodyValue = reminderBody.value;

	// If the user does not supply a title and text body an error is thrown
	if (titleValue === "" && bodyValue === "") {
		notification.classList.remove("hidden");
		notification.style.color = "red";
		notification.textContent = "Must enter reminder title and text to submit."

		return;
	}

	// New reminder object for easier handling
	const newReminder = {
		title: titleValue,
		reminderBody: bodyValue
	}
	// Array push method to add the new object to the array before adding to st
	remindersArray.push(newReminder);
	// Local Storage only allows strings to be stored so need to JSON.stringify the array before using setItem to store it
	const stringArray = JSON.stringify(remindersArray)
	localStorage.setItem("reminders", stringArray);

	// Call displayReminders to render recently created reminders
	displayReminders();

	// Clear input and text area for next reminder
	reminderTitle.value = "";
	reminderBody.value = "";

}

const displayReminders = () => {
	// Clear unordered list every time we call this function so we can get a fresh retrieval from localStorage each time
	ulEl.textContent = "";

	// Retrieve any reminders from localStorage key for getItem and setItem must match
	const currentReminders = JSON.parse(localStorage.getItem("reminders"));

	// Confirm there are reminders
	if (currentReminders) {

		// Array forEach method 
		currentReminders.forEach(reminder => {
			// for each reminder object in the array create a new list item, h3, and paragraph tag
			const liEl = document.createElement("li");
			const h3El = document.createElement("h3");
			const pEl = document.createElement("p");

			// Access the title and reminderBody text using dot notation
			// then pass in the values using the textContent property
			h3El.textContent = reminder.title;
			pEl.textContent = reminder.reminderBody;

			// Append new DOM elements to list item
			liEl.append(h3El)
			liEl.append(pEl)

			// Append list item to unordered list
			ulEl.append(liEl)
		});
	} else {
		// If there are no reminders, placeholder text
		const h3El = document.createElement("h3");
		h3El.textContent = "Add some reminders to see them here.";
		h3El.style.paddingLeft = "1rem";
		h3El.style.paddingTop = "1rem";
		h3El.style.paddingBottom = "1rem";
		ulEl.append(h3El);
	}

}

const clearReminder = () => {
	// Empties the input and text area to make way for a new note
	reminderTitle.value = "";
	reminderBody.value = "";
}

// Clears localStorage when user hits trash can icon and displays placeholder 
const clearStorage = () => {
	localStorage.clear();
	displayReminders();
}

// Called once on page load to display current reminders if any in localStorage
displayReminders();

// Event Listeners for saving reminders, clearing the input and text area for a fresh reminder, and clearing local storage to start over
saveBtn.addEventListener("click", saveReminder);
newBtn.addEventListener("click", clearReminder);
clearStorageBtn.addEventListener("click", clearStorage);