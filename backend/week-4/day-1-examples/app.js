const APILINK = "http://localhost:8080/legal-songs";

Vue.createApp({
  data: function () {
    return {
      legal_songs: [],
    };
  },

  // any functions you use
  methods: {
    loadSongs: async function () {
      let resp = await fetch(APILINK);
      this.legal_songs = await resp.json();
    },
  },

  // called once when it loads
  created: function () {
    console.log("Hello, Vue.");
    this.loadSongs();
  },
}).mount("#app");

