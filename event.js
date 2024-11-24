function createEventElem(event) {
    const eventItemElem = document.createElement("tr");
    // event elem
    const eventElem = document.createElement("td");
    const startDateElem = document.createElement("td");
    const endDateElem = document.createElement("td");
    //add input field
    // create td node
    const tdEventInput = document.createElement("td");
    const eventInput = document.createElement("input");
    tdEventInput.appendChild(eventInput);
    //add start date input field
    const tdStartDateInput = document.createElement("td");
    const startDateInput = document.createElement("input");
    startDateInput.type = "date";
    tdStartDateInput.appendChild(startDateInput);
    //add end date input field
    const tdEndDateInput = document.createElement("td");
    const endDateInput = document.createElement("input");
    endDateInput.type = "date";
    tdEndDateInput.appendChild(endDateInput);
    //set the input fields
    if (event !== undefined) {
        endDateElem.textContent = `${event.endDate}`;
        eventElem.textContent = `${event.eventName}`;
        startDateElem.textContent = `${event.startDate}`;
        startDateInput.value = event.startDate;
        eventInput.value = event.eventName;
        endDateInput.value = event.endDate;
    }
    //save button
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const newEvent = {
            eventName: eventInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
        };
        const res = await eventAPI.editEvent(event.id, newEvent);
        eventElem.textContent = `${newEvent.eventName}`;
        startDateElem.textContent = `${newEvent.startDate}`;
        endDateElem.textContent = `${newEvent.endDate}`;
        eventItemElem.appendChild(eventElem);
        eventItemElem.appendChild(startDateElem);
        eventItemElem.appendChild(endDateElem);
        eventItemElem.appendChild(deleteButton);
        eventItemElem.appendChild(editButton);
        tdEventInput.remove();
        tdStartDateInput.remove();
        tdEndDateInput.remove();
        saveButton.remove();
        cancelButton.remove();

        //const events = await eventAPI.getEvents();
        //renderEvents(events, 'event-list');
        return res.json;
    });
    //cancel button
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    // add event listener to the cancel button
    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        tdEventInput.remove();
        tdStartDateInput.remove();
        tdEndDateInput.remove();
        saveButton.remove();
        cancelButton.remove();

        eventItemElem.appendChild(eventElem);
        eventItemElem.appendChild(startDateElem);
        eventItemElem.appendChild(endDateElem);
        eventItemElem.appendChild(deleteButton);
        eventItemElem.appendChild(editButton);
    });
    //add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const res = await eventAPI.deleteEvent(event.id);
        const events = await eventAPI.getEvents();
        eventItemElem.remove();
        return event.id;
    });
    //add edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", async (e) => {
        e.preventDefault();
        eventElem.remove();
        startDateElem.remove();
        endDateElem.remove();
        editButton.remove();
        deleteButton.remove();
        // const eventItemElem = document.createElement("tr");
        eventItemElem.appendChild(tdEventInput);
        eventItemElem.appendChild(tdStartDateInput);
        eventItemElem.appendChild(tdEndDateInput);
        eventItemElem.appendChild(saveButton);
        eventItemElem.appendChild(cancelButton);
    });

    //append all elements
    eventItemElem.appendChild(eventElem);
    eventItemElem.appendChild(startDateElem);
    eventItemElem.appendChild(endDateElem);
    eventItemElem.appendChild(deleteButton);
    eventItemElem.appendChild(editButton);

    return eventItemElem;
}
function createNewEvent() {
    //add new event button
    const addNewEvent = document.getElementById("addNew");
    const eventNew = document.createElement("tr");
    const eventListElem = document.getElementById("event-new");
    const eventInputAdd = document.createElement("input");
    eventInputAdd.placeholder = "Event Name";
    eventInputAdd.type = "text";
    const tdEventInputAdd = document.createElement("td");
    tdEventInputAdd.appendChild(eventInputAdd);
    const startDateInputAdd = document.createElement("input");
    startDateInputAdd.placeholder = "Start Date";
    startDateInputAdd.type = "date";
    const tdStartDateInputAdd = document.createElement("td");
    tdStartDateInputAdd.appendChild(startDateInputAdd);
    const endDateInputAdd = document.createElement("input");
    endDateInputAdd.placeholder = "End Date";
    endDateInputAdd.type = "date";
    const tdEndDateInputAdd = document.createElement("td");
    tdEndDateInputAdd.appendChild(endDateInputAdd);
    const tdButtons = document.createElement("td");
    const addButton = document.createElement("button");
    addButton.textContent = "+";
    tdButtons.appendChild(addButton);
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        eventNew.remove();
        eventListElem.innerHTML = "";
        console.log(eventListElem.innerHTML);

    });
    tdButtons.appendChild(cancelButton);
    //add event listener to the add button
    addButton.addEventListener("click", async (e) => {
        e.preventDefault();
        if (eventInputAdd.value === "" || startDateInputAdd.value === "" || endDateInputAdd.value === "") {
            alert("Please fill in all fields");
            return;
        }
        const newEvent = { eventName: eventInputAdd.value, startDate: startDateInputAdd.value, endDate: endDateInputAdd.value };

        const res = await eventAPI.postEvent(newEvent);
        const events = await eventAPI.getEvents();
        //remove all elements
        eventNew.remove(eventInputAdd);
        eventNew.remove(startDateInputAdd);
        eventNew.remove(endDateInputAdd);
        eventNew.remove(addButton);
        eventNew.remove(cancelButton);
        renderEvents(events, "event-list");
        return res.json;
    });
    addNewEvent.addEventListener("click", async (e) => {
        e.preventDefault();

        eventNew.appendChild(tdEventInputAdd);
        eventNew.appendChild(tdStartDateInputAdd);
        eventNew.appendChild(tdEndDateInputAdd);
        eventNew.appendChild(tdButtons);

        eventListElem.innerHTML = "";
        eventListElem.appendChild(eventNew);

    });
}
//render the todos
function renderEvents(events, type) {
    try {
        const eventListElem = document.getElementById(type);

        eventListElem.innerHTML = ""; // clear the list

        for (const event of events) {
            const eventElem = createEventElem(event);
            eventListElem.appendChild(eventElem);
        }
    } catch (e) {
        console.error(e);
    }
}
//initialize the app
(function initApp() {
    //setFormElements();
    createEventElem();
    createNewEvent();
    eventAPI.getEvents().then((events) => {
        renderEvents(events, "event-list");
    });
})();
