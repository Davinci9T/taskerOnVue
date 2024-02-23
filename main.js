const input = document.getElementById("new-task")
const addBtn = document.getElementById("add-btn")
const noteList = document.getElementById("note-list")
const clearBtn = document.getElementById("clear-btn")
const noteCount = document.getElementById("note-count")

let notes = JSON.parse(localStorage.getItem("note")) || []

function updateNoteCount() {
  noteCount.textContent = notes.length
  clearBtn.disabled = notes.length === 0
}

updateNoteCount()

addBtn.addEventListener("click", function () {
  if (input.value !== "") {
    notes.push(input.value)
    localStorage.setItem("note", JSON.stringify(notes))
    renderNotes()
    input.value = ""
  }
})

function renderNotes() {
  noteList.innerHTML = ""
  notes.forEach((note, index) => {
    const listItem = document.createElement("li")
    listItem.classList.add("item")
    listItem.innerHTML = `
      <p>${note}</p>
      <button class="btn danger" data-index="${index}">X</button>
    `
    noteList.appendChild(listItem)
  })
}

renderNotes()

noteList.addEventListener("click", function (event) {
  if (event.target.classList.contains("danger")) {
    const index = Number(event.target.dataset.index)
    notes.splice(index, 1)
    localStorage.setItem("note", JSON.stringify(notes))
    renderNotes()
    updateNoteCount()
  }
})

clearBtn.addEventListener("click", function () {
  notes = []
  localStorage.removeItem("note")
  renderNotes()
  updateNoteCount()
})
// Vue.createApp({
//   data() {
//     return {
//       inputValue: "",
//       title: "заметки",
//       plchldr: "ввести заметку",
//       notes: [],
//     }
//   },
//   mounted() {
//     this.notes = JSON.parse(localStorage.getItem("note")) || []
//   },
//   watch: {
//     notes: {
//       handler: function () {
//         localStorage.setItem("note", JSON.stringify(this.notes))
//       },
//       deep: true,
//     },
//   },
//   methods: {
//     newTask() {
//       if (this.inputValue != "") {
//         this.notes.push(this.inputValue)
//         this.inputValue = ""
//       }
//     },
//     deleteTask(i) {
//       this.notes.splice(i, 1)
//     },
//     deleteAll(i) {
//       this.notes.splice(0, this.notes.length)
//     },
//   },
// }).mount("#app")
