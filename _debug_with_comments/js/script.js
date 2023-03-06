const reminderTitle = document.querySelector(".note-title");
const reminderBody = document.querySelector(".note-textarea");
// save-note is a class not an id, wrong selector
// ANSWER: const saveBtn = document.querySelector(".save-note"); 
const saveBtn = document.querySelector("#save-note"); 
const newBtn = document.querySelector(".new-note");
const clearStorageBtn = document.querySelector(".clear-storage");
const notification = document.querySelector(".notify-user");

let remindersArray = [];
// getElementById already assumes you are passing it an id so it doesn't need the # in front of it
// ANSWER: const ulEl = document.getElementById("list-group");
const ulEl = document.getElementById("#list-group");

const saveReminder = () => {
    notification.classList.add("hidden");

    // Need to JSON.parse after retrieving from localStorage since it can only store string representations of arrays, objects, etc.
    // remindersArray = JSON.parse(localStorage.getItem("reminders"));
    remindersArray = localStorage.getItem("reminders");

    // Potential Question: "Saw this online somewhere, why do I need this?"
    // ANSWER: If we don't get any reminders back from local storage on line 20
    //  we need remindersArray to be an empty array vs null so we can push to it later
    if (!remindersArray) {
        remindersArray = [];
    }

    
    const titleValue = reminderTitle.value;
    const bodyValue = reminderBody.value;

    if (titleValue === "" && bodyValue === "") {
        notification.classList.remove("hidden");
        notification.style.color = "red";
        notification.textContent = "Must enter reminder title and text to submit."

        return;
    }

    const newReminder = {
        title: titleValue,
        reminderBody: bodyValue
    }

    remindersArray.push(newReminder);
    const stringArray = JSON.stringify(remindersArray)
    // Must be consistent with name of keys in localStorage
    // ANSWER: localStorage.setItem("reminders", stringArray);
    // Plural or singular is fine but must match what you are setting and getting
    localStorage.setItem("reminder", stringArray);

    displayReminders();

    reminderTitle.value = "";
    reminderBody.value = "";

}


const displayReminders = () => { 
    // If you don't clear the ulEl it will continue to append all previous items along with the new one
    // ANSWER: 
    // ulEl.textContent = "";
    const currentReminders = JSON.parse(localStorage.getItem("reminders"));

    if (currentReminders) {

        currentReminders.forEach(reminder => {

            const liEl = document.createElement("li");
            const h3El = document.createElement("h3");
            const pEl = document.createElement("p");

            h3El.textContent = reminder.title;
            pEl.textContent = reminder.reminderBody;

            liEl.append(h3El)
            liEl.append(pEl)

            ulEl.append(liEl)
        });
    } else {
        const h3El = document.createElement("h3");
        h3El.textContent = "Add some reminders to see them here.";
        h3El.style.paddingLeft = "1rem";
        h3El.style.paddingTop = "1rem";
        h3El.style.paddingBottom = "1rem";
        ulEl.append(h3El);
    }

}

const clearReminder = () => {
    reminderTitle.value = "";
    reminderBody.value = "";
}

const clearStorage = () => {
    console.log("here");
    localStorage.clear();
    displayReminders();
}

displayReminders();

saveBtn.addEventListener("click", saveReminder);
newBtn.addEventListener("click", clearReminder);
// If you call a function in an eventListener it runs/executes once at runtime vs waiting for the user to click to perform the
// functionality
// PROMPT: "It looks like my localStorage clears every time I load the page."
// ANSWER: get rid of parentheses after clearStorage
// clearStorageBtn.addEventListener("click", clearStorage);
clearStorageBtn.addEventListener("click", clearStorage());