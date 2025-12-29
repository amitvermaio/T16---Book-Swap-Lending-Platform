// data.js

export const bookData = {
  id: "harry-potter-1",
  title: "Harry Potter and the Sorcerer's Stone",
  author: "J.K. Rowling",
  status: "Available",
  type: "Lend",
  genres: ["Fantasy", "Magic", "Adventure", "Young Adult"],
  owner: {
    name: "test_name",
    rating: 4.8,
    reviews: 12,
    location: "Kolkata, West Bengal",
    active: "2 hours ago",
    avatar: "https://via.placeholder.com/50" // Replace with actual avatar image URL
  },
  mapImage: "https://via.placeholder.com/300x150", // Replace with actual map image URL
  synopsis:
    "Harry Potter has never heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!",
  details: {
    format: "Hardcover",
    pages: 309,
    language: "English",
    publisher: "Scholastic",
    isbn: "978-0-598-35340-3",
  },
  images: [
    "https://via.placeholder.com/400x600", // Main image. Replace with actual book cover URL
    "https://via.placeholder.com/100", // Thumbnail 1
    "https://via.placeholder.com/100", // Thumbnail 2
    "https://via.placeholder.com/100", // Thumbnail 3
  ],
  relatedBooks: [
    { id: 1, cover: "https://via.placeholder.com/150x200" },
    { id: 2, cover: "https://via.placeholder.com/150x200" },
    { id: 3, cover: "https://via.placeholder.com/150x200" },
    { id: 4, cover: "https://via.placeholder.com/150x200" },
  ],
};