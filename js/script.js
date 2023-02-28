const reminderTitle = document.querySelector(".note-title");
const reminderBody = document.querySelector(".note-textarea");
const saveBtn = document.querySelector(".save-note");
const newBtn = document.querySelector(".new-btn");
let remindersArray = [];
const ulEl = document.getElementById("list-group");

const saveReminder = () => {
    remindersArray = JSON.parse(localStorage.getItem("reminders"))
    
    const titleValue = reminderTitle.value;
    const bodyValue = reminderBody.value;

    const newReminder = {
        title: titleValue,
        reminderBody: bodyValue
    }

    remindersArray.push(newReminder);

    console.log(remindersArray);
    const stringArray = JSON.stringify(remindersArray)
    localStorage.setItem("reminders", stringArray);

    displayReminders();

    reminderTitle.value = "";
    reminderBody.value = "";

}


const displayReminders = () => { 
    ulEl.textContent = "";
    const currentReminders = JSON.parse(localStorage.getItem("reminders"));
    console.log(currentReminders);

    if (currentReminders) {

        console.log(currentReminders);
        currentReminders.forEach(reminder => {
            console.log(reminder);

            const liEl = document.createElement("li");
            const h3El = document.createElement("h3");
            const pEl = document.createElement("p");

            h3El.textContent = reminder.title;
            pEl.textContent = reminder.reminderBody;

            liEl.append(h3El)
            liEl.append(pEl)

            ulEl.append(liEl)
        });
    }

}

displayReminders();

saveBtn.addEventListener("click", saveReminder)