Vue.createApp({
  data() {
    return {
      inputValue: "",
      title: "заметки",
      plchldr: "ввести заметку",
      notes: [],
    };
  },
  mounted() {
    this.notes = JSON.parse(localStorage.getItem("note")) || [];
  },
  watch: {
    notes: {
      handler: function () {
        localStorage.setItem("note", JSON.stringify(this.notes));
      },
      deep: true,
    },
  },
  methods: {
    newTask() {
      if (this.inputValue != "") {
        this.notes.push(this.inputValue);
        this.inputValue = "";
      }
    },
    deleteTask(i) {
      this.notes.splice(i, 1);
    },
    deleteAll(i) {
      this.notes.splice(i);
    },
  },
}).mount("#app");
