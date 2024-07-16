const URL = "http://localhost:8080";
const SOCKETPATH = "ws://localhost:8080";

Vue.createApp({
  data: function () {
    return {
      clicks: 0,
      ws: null,
      maxClicks: 0,
    };
  },

  methods: {
    postClick: async function () {
      await fetch(`${URL}/clicks`, { method: "POST" });
      this.ws.send("Click!");
    },
  },

  created: function () {
    this.ws = new WebSocket(SOCKETPATH);
    this.ws.addEventListener("message", (event) => {
      let data = JSON.parse(event.data);
      console.log("Message from server ", data);
      if (data.type === "personal") this.clicks = data.clicks;
      else if (data.type === "max") this.maxClicks = data.clicks;
    });
  },
}).mount("#app");

