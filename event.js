let addButton = document.createElement("button");
function createEventElem(event) {
    const eventItemElem = document.createElement("tr");
    
    // event elem
    const eventElem = document.createElement("td");
    eventElem.textContent = `${event.eventName}`;
    const startDateElem = document.createElement("td");
    startDateElem.textContent = `${event.startDate}`;
    const endDateElem = document.createElement("td");
    endDateElem.textContent = `${event.endDate}`;

    //add input field
    // create td node
    const tdEventInput = document.createElement("td");
    const eventInput = document.createElement("input");
    eventInput.value = event.eventName;
    tdEventInput.appendChild(eventInput);
    //add start date input field
    const tdStartDateInput = document.createElement("td");
    const startDateInput = document.createElement("input");
    startDateInput.type = "date";
    startDateInput.value = event.startDate;
    tdStartDateInput.appendChild(startDateInput);
    //add end date input field
    const tdEndDateInput = document.createElement("td");
    const endDateInput = document.createElement("input");
    endDateInput.type = "date";
    endDateInput.value = event.endDate;
    tdEndDateInput.appendChild(endDateInput);
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
        const events = await eventAPI.getEvents();
        renderEvents(events, 'event-list');
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
        addButton.remove();
        
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
        renderEvents(events, "event-list");
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
    //add new event button
    const addNewEvent = document.getElementById("addNew");
    const eventNew = document.createElement("tr");
   
    addNewEvent.addEventListener("click", async (e) => {
        e.preventDefault();
        eventInput.value = "";
        eventNew.appendChild(tdEventInput);
        eventNew.appendChild(tdStartDateInput);
        eventNew.appendChild(tdEndDateInput);
        
        addButton.textContent = "+";
        eventNew.appendChild(addButton);
        //prevent the button from being clicked multiple times
        addButton.replaceWith(addButton.cloneNode(true));
        //reset the button
        addButton = eventNew.querySelector("button"); 
        //add event listener to the add button
        addButton.addEventListener("click", async (e) => {
            e.preventDefault();
            const newEvent = {
                eventName: eventInput.value,
                startDate: startDateInput.value,
                endDate: endDateInput.value,
            };

            const res = await eventAPI.postEvent(newEvent);
            const events = await eventAPI.getEvents();
            //remove all elements
            eventNew.remove(eventInput);
            eventNew.remove(startDateInput);
            eventNew.remove(endDateInput);
            eventNew.remove(addButton);
            eventNew.remove(cancelButton);
            renderEvents(events, "event-list");
            return res.json;
        });
        eventNew.appendChild(addButton);
        eventNew.appendChild(cancelButton);
        const eventListElem = document.getElementById("event-new");
        eventListElem.innerHTML = "";
        eventListElem.appendChild(eventNew);

    });
    //append all elements
    eventItemElem.appendChild(eventElem);
    eventItemElem.appendChild(startDateElem);
    eventItemElem.appendChild(endDateElem);
    eventItemElem.appendChild(deleteButton);
    eventItemElem.appendChild(editButton);

    return eventItemElem;
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
    }catch (e) {
        console.error(e);
    }
}

(function initApp() {
    eventAPI.getEvents().then((events) => {
        renderEvents(events, "event-list");
    });
})();
