import TheSubtleArt from "../assets/TheSubtleArt.jpg";
import ZeroToOne from "../assets/ZeroToOne.jpg";
import ElonMusk from "../assets/ElonMusk.jpg";
import DoItToday from "../assets/DoItToday.jpg";
import DontBelieve from "../assets/DontBelieve.jpg";
import DopamineDetox from "../assets/DopamineDetox.jpg";
import StopOverThinking from "../assets/StopOverThinking.jpg";
import TheMountainIsYou from "../assets/TheMountainIsYou.jpg";

import { RefreshCcw, Banknote, HandHeart } from 'lucide-react';

export const bookGenres = ["Fiction", "Non-Fiction", "Fantasy", "Science Fiction", "Romance",
  "Mystery", "Thriller", "Horror", "Historical", "Biography", "Autobiography", "Self-Help",
  "Philosophy", "Poetry", "Adventure", "Comics", "Young Adult", "Children", "Religion",
  "Spirituality", "Science", "Technology", "Business", "Economics", "Politics", "Health",
  "Travel", "Cooking", "Art", "Education"];

export const books = [
  {
    image: TheSubtleArt,
    author: "Mark Manson",
    owner: "Aarav",
    purpose: "SWAP",
  },
  {
    image: ElonMusk,
    author: "Walter Isaacson",
    owner: "Rohit",
    purpose: "LENT",
  },
  {
    image: ZeroToOne,
    author: "Peter Thiel",
    owner: "Ananya",
    purpose: "SWAP",
  },
  {
    image: DoItToday,
    author: "Darius Foroux",
    owner: "Kunal",
    purpose: "LENT",
  },
  {
    image: DontBelieve,
    author: "Ryan Holiday",
    owner: "Priya",
    purpose: "SWAP",
  },
  {
    image: DopamineDetox,
    author: "Thibaut Meurisse",
    owner: "Sneha",
    purpose: "LENT",
  },
  {
    image: StopOverThinking,
    author: "Nick Trenton",
    owner: "Aditya",
    purpose: "SWAP",
  },
  {
    image: TheMountainIsYou,
    author: "Brianna Wiest",
    owner: "Ishaan",
    purpose: "LENT",
  },
];

export const CONDITIONS = ["New", "Like New", "Good", "Fair", "Decent", "Poor"];
export const AVAILABILITY = ["Available", "Swapped", "Reserved", "Wishlist Only"];
export const SORT_OPTIONS = ["Newest First", "Oldest First", "Price: Low to High", "Price: High to Low", "Distance: Nearest"];

import { BadgeCheck, AlertCircle, Sparkles } from 'lucide-react';

export const booksData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    category: "DESIGN",
    title: "Thinking with Type",
    author: "Ellen Lupton",
    distance: "0.8 miles away",
    actionType: "view",
    tag: {
      text: "Good",
      variant: "orange",
      Icon: null
    }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800",
    category: "SCI-FI",
    title: "Dune",
    author: "Frank Herbert",
    distance: "5.2 miles away",
    actionType: "swap",
    tag: {
      text: "New",
      variant: "green",
      Icon: BadgeCheck
    }
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=800",
    category: "FINANCE",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    distance: "1.2 miles away",
    actionType: "swap",
    tag: {
      text: "Mint",
      variant: "green",
      Icon: Sparkles
    }
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    category: "SELF HELP",
    title: "Atomic Habits",
    author: "James Clear",
    distance: "2.4 miles away",
    actionType: "view",
    tag: {
      text: "Fair",
      variant: "orange",
      Icon: AlertCircle
    }
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800",
    category: "BIOGRAPHY",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    distance: "0.5 miles away",
    actionType: "view",
    tag: {
      text: "Used",
      variant: "orange",
      Icon: null
    }
  },
  {
    id: 6,
    image: "https://m.media-amazon.com/images/I/81E3ArTwSnL._SL1500_.jpg",
    category: "FANTASY",
    title: "Harry Potter",
    author: "J.K. Rowling",
    distance: "10 miles away",
    actionType: "swap",
    tag: {
      text: "New",
      variant: "green",
      Icon: BadgeCheck
    }
  }
];


export const getAvailabilityBadge = (type) => {
  switch (type) {
    case 'lend':
      return {
        color: 'bg-blue-500',
        text: 'Available to Lend',
        icon: Banknote
      };
    case 'donate':
      return {
        color: 'bg-pink-500',
        text: 'For Donation',
        icon: HandHeart
      };
    case 'swap':
    default:
      return {
        color: 'bg-emerald-500',
        text: 'Available for Swap',
        icon: RefreshCcw
      };
  }
};