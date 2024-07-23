const URL = "https://expenses.codeschool.cloud";

Vue.createApp({
  data() {
    return {
      expenses: [
        { description: "test", amount: "14", category: "bill" },
        { description: "test", amount: "14", category: "bill" },
      ],
      search: "",
      sortOrder: "",
      modalOpen: false,
      modal: {
        index: -1,
        description: "",
        amount: "",
        category: "",
      },
      newExpense: {
        description: "",
        amount: "",
        category: "",
      },
    };
  },
  methods: {
    getExpenses: function () {
      fetch(URL + "/expenses")
        .then((response) => response.json())
        .then((data) => {
          this.expenses = data;
        });
    },

    resetSearch: function () {
      this.search = "";
    },

    sortExpenses: function () {
      if (this.sortOrder == "asc") {
        function compare(a, b) {
          if (a.amount > b.amount) return -1;
          if (a.amount < b.amount) return 1;
          return 0;
        }
        this.sortOrder = "desc";
      } else {
        function compare(a, b) {
          if (a.amount < b.amount) return -1;
          if (a.amount > b.amount) return 1;
          return 0;
        }
        this.sortOrder = "asc";
      }
      this.expenses.sort(compare);
    },

    toggleModal: function (index = null) {
      console.log(index);
      this.modalOpen = !this.modalOpen;
      if (index !== null) {
        let exp = this.expenses[index];
        this.modal.index = index;
        this.modal.description = exp.description;
        this.modal.amount = exp.amount;
        this.modal.category = exp.category;
      }
    },
    updateExpense: function () {
      myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let encodedData =
        "description=" +
        encodeURIComponent(this.modal.description) +
        "&amount=" +
        encodeURIComponent(this.modal.amount) +
        "&category=" +
        encodeURIComponent(this.modal.category);

      let requestOptions = {
        method: "PUT",
        body: encodedData,
        headers: myHeaders,
      };

      let expId = this.expenses[this.modal.index]._id;
      fetch(`${URL}/expenses/${expId}`, requestOptions).then((response) => {
        if (response.status === 204) {
          this.expenses[this.modal.index].description = this.modal.description;
          this.expenses[this.modal.index].amount = parseFloat(
            this.modal.amount
          );
          this.expenses[this.modal.index].category = this.modal.category;
        } else {
          alert("Not able to add expense");
        }
        this.toggleModal();
      });
    },

    addExpense: function () {
      myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let encodedData =
        "description=" +
        encodeURIComponent(this.newExpense.description) +
        "&amount=" +
        encodeURIComponent(this.newExpense.amount) +
        "&category=" +
        encodeURIComponent(this.newExpense.category);

      let requestOptions = {
        method: "POST",
        body: encodedData,
        headers: myHeaders,
      };

      fetch(`${URL}/expenses`, requestOptions).then((response) => {
        if (response.status === 201) {
          // If you do it this way make sure you're returning the new object from your server
          // The "data" that we get is in the response from the server's POST request handler
          response.json().then((data) => {
            this.expenses.push(data);
            this.newExpense = {};
          });
        } else {
          alert("Not able to add expense");
        }
      });
    },

    deleteExpense: function (index) {
      let expId = this.expenses[index]._id;
      let requestOptions = {
        method: "DELETE",
      };
      fetch(`${URL}/expenses/${expId}`, requestOptions).then((response) => {
        if (response.status === 204) {
          console.log("success");
          this.expenses.splice(index, 1);
        } else {
          alert("Unable to delete expense");
        }
      });
    },
  },
  computed: {
    filterExpenses: function () {
      return this.expenses.filter((expense) => {
        return expense.description
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },

    balance: function () {
      let total = 0;
      for (expense of this.filterExpenses) {
        total += expense.amount;
      }
      return total;
    },
  },
  created: function () {
    this.getExpenses();
  },
}).mount("#app");
