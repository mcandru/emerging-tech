// Playlist data - note the specific property names
const playlist = [
  { songTitle: "Bohemian Rhapsody", artistName: "Queen", durationSecs: 354 },
  { songTitle: "Hotel California", artistName: "Eagles", durationSecs: 391 },
  { songTitle: "Stairway to Heaven", artistName: "Led Zeppelin", durationSecs: 482 },
  { songTitle: "Sweet Child O' Mine", artistName: "Guns N' Roses", durationSecs: 356 },
  { songTitle: "Comfortably Numb", artistName: "Pink Floyd", durationSecs: 382 }
];

// TODO: Implement getTotalDuration()
// Returns the total duration of all songs in seconds

// TODO: Implement findByArtist(name)
// Returns an array of songs by the given artist

// Test the functions
console.log("Total playlist duration:", getTotalDuration(), "seconds");
console.log("Songs by Queen:", findByArtist("Queen"));
console.log("Songs by Eagles:", findByArtist("Eagles"));
console.log("Songs by Beatles:", findByArtist("Beatles"));
