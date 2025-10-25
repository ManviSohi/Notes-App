//elements
const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to save notes to localStorage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}


function renderNotes() {
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        const noteContent = document.createElement("textarea");
        noteContent.value = note;
        noteContent.addEventListener("input", () => {
            notes[index] = noteContent.value;
            saveNotes(); // Auto-save on edit
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });

        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(deleteBtn);
        notesList.appendChild(noteDiv);
    });
}

// Adding  new note
addNoteBtn.addEventListener("click", () => {
    const text = noteText.value.trim();
    if (text) {
        notes.push(text);
        noteText.value = "";
        saveNotes();
        renderNotes();
    } else {
        alert("Please write something before adding a note.");
    }
});


renderNotes();
