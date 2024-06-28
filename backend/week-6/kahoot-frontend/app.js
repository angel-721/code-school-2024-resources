// const URL = "http://localhost:8080";
const URL = "https://kahoot.codeschool.cloud";

Vue.createApp({
  data() {
    return {
      page: "loading",
      user: {
        name: "",
        email: "",
        password: "",
      },
      currentUser: "",
      quizzes: [],
      newQuiz: {
        title: "",
        description: "",
        questions: [],
      },
      newQuestions: [
        {
          questionText: "",
          possibleChoices: [{ answerText: "", isCorrect: false }],
        },
      ],
      quizShown: -1,
      currentQuiz: {},
      currentQuizQuestion: 0,
      currentQuizQuestionAnswered: false,
      currentQuizTotalScore: 0,
      editingQuiz: false,
    };
  },
  methods: {
    setPage: function (page) {
      this.page = page;
    },

    loginContainsText: function () {
      return this.user.email.length > 0 && this.user.password.length > 0;
    },

    registerContainsText: function () {
      return (
        this.user.name.length > 0 &&
        this.user.email.length > 0 &&
        this.user.password.length > 0
      );
    },

    registerUser: async function () {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(this.user),
      };

      let response = await fetch(`${URL}/users`, requestOptions);
      if (response.status === 201) {
        this.loginUser();
      } else {
        console.log("failed to register");
      }
    },

    loginUser: async function () {
      console.log("logging in");
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(this.user),
      };

      let response = await fetch(`${URL}/session`, requestOptions);
      let data = await response.json();
      if (response.status === 201) {
        this.getQuizzes();
        this.page = "quizzes";
        this.user = {
          name: "",
          email: "",
          password: "",
        };
        this.currentUser = data;
      } else {
        console.log("failed to login");
      }
    },

    getSession: async function () {
      let response = await fetch(`${URL}/session`, { credentials: "include" });

      if (response.status === 200) {
        let data = await response.json();
        this.currentUser = data;
        this.getQuizzes();
        this.page = "quizzes";
      } else {
        this.page = "login";
      }
    },

    deleteSession: async function () {
      let requestOptions = {
        method: "DELETE",
      };

      let response = await fetch(`${URL}/session`, requestOptions);
      if (response.status === 204) {
        this.page = "login";
        this.currentUser = "";
      }
    },

    getQuizzes: async function () {
      let response = await fetch(`${URL}/quizzes`);
      let data = await response.json();
      this.quizzes = data;
      console.log(data);
    },

    formatQuestionText(length) {
      return `${length} question${length === 1 ? "" : "s"}`;
    },

    addQuestion: function () {
      this.newQuestions.push({
        questionText: "",
        possibleChoices: [{ answerText: "", isCorrect: true }],
      });
    },

    addAnswer: function (index) {
      console.log("Adding answer", index, this.newQuestions[index]);
      this.newQuestions[index].possibleChoices.push({
        answerText: "",
        isCorrect: false,
      });
    },

    createQuiz: async function () {
      // Title, description, list of questions
      // Question: list of answers
      // Answer: text, if correct
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      this.newQuiz.questions = this.newQuestions;

      let requestOptions = {
        method: "POST",
        body: JSON.stringify(this.newQuiz),
        headers: myHeaders,
      };

      let response = await fetch(`${URL}/quizzes`, requestOptions);
      if (response.status === 201) {
        this.getQuizzes();
        this.page = "quizzes";
        this.clearQuiz();
      } else {
        console.log("failed to create quiz");
      }
    },

    clearQuiz: function () {
      this.newQuiz = {
        title: "",
        description: "",
        questions: [],
      };
      this.newQuestions = [
        {
          questionText: "",
          possibleChoices: [{ answerText: "", isCorrect: false }],
        },
      ];
      this.currentQuiz = {};
      this.currentQuizQuestion = 0;
      this.currentQuizQuestionAnswered = false;
      this.currentQuizTotalScore = 0;
      this.editingQuiz = false;
    },

    startQuiz: async function (quizId) {
      let response = await fetch(`${URL}/quizzes/${quizId}`);
      let data = await response.json();
      this.currentQuiz = data[0];
      this.currentQuizQuestion = 0;
      this.page = "single-quiz";
    },

    answerQuestion: function (answer) {
      if (answer.isCorrect) {
        this.currentQuizTotalScore++;
      }
      this.currentQuizQuestionAnswered = true;
    },

    nextQuestion: function () {
      this.currentQuizQuestion++;
      this.currentQuizQuestionAnswered = false;
    },

    deleteQuiz: async function (quizId) {
      let requestOptions = {
        method: "DELETE",
      };

      let response = await fetch(`${URL}/quizzes/${quizId}`, requestOptions);
      if (response.status === 204) {
        this.getQuizzes();
      }
    },

    editQuiz: function (quiz) {
      this.newQuiz = quiz;
      this.newQuestions = quiz.questions;
      this.page = "createQuiz";
      this.editingQuiz = true;
    },

    saveEdit: async function () {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      this.newQuiz.questions = this.newQuestions;

      let requestOptions = {
        method: "PUT",
        body: JSON.stringify(this.newQuiz),
        headers: myHeaders,
      };

      let response = await fetch(
        `${URL}/quizzes/${this.newQuiz._id}`,
        requestOptions,
      );
      if (response.status === 204) {
        this.getQuizzes();
        this.page = "quizzes";
        this.clearQuiz();
        this.editingQuiz = false;
      } else {
        console.log("failed to create quiz");
      }
    },
  },
  created: function () {
    this.getSession();
  },
}).mount("#app");

