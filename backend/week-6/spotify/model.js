const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.DATABASE);

const SongSchema = Schema({
  name: {
    type: String,
    required: [true, "Song must have an name"],
  },
  aritst: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: [true, "A song needs a artist"],
  },
  length: {
    type: Number,
  },
  streams: {
    type: Number,
    required: [true, "A song needs a streams"],
  },
  genre: {
    type: String,
    enum: ["Rock", "Pop", "Rap", "Country", "Indie"],
  },
});

const ArtistSchema = Schema({
  name: {
    type: String,
    // do cool things later like get song streams and guess pay
    required: [true, "Artist must have an name"],
  },
});

const PlaylistSchema = Schema({
  name: {
    type: String,
    required: [true, "Playlist must have an name"],
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

const Song = mongoose.model("Song", SongSchema);
const Artist = mongoose.model("Artist", ArtistSchema);
const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = {
  Song,
  Playlist,
  Artist,
};
