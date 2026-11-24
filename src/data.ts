import hero from "./assets/hero-pizza.jpg";
import restaurant from "./assets/restaurant.jpg";
import dining from "./assets/dining.jpg";
import pepperoni from "./assets/pepperoni.jpg";
import pasta from "./assets/pasta.jpg";
import mushroom from "./assets/mushroom.jpg";
import tiramisu from "./assets/tiramisu.jpg";
import salad from "./assets/salad.jpg";
import appetizer from "./assets/appetizer.jpg";
import drinks from "./assets/drinks.jpg";

export const img = {
  hero,
  restaurant,
  dining,
  pepperoni,
  pasta,
  mushroom,
  tiramisu,
  salad,
  appetizer,
  drinks,
};

export const navLinks = [
  { label: "Home", id: "home" },
  { label: "Menu", id: "menu" },
  { label: "Our Story", id: "story" },
  { label: "Locations", id: "locations" },
  { label: "Events", id: "events" },
  { label: "Contact", id: "contact" },
];

export const categories = [
  { name: "Pizzas", image: img.hero },
  { name: "Pasta", image: img.pasta },
  { name: "Appetizers", image: img.appetizer },
  { name: "Salads", image: img.salad },
  { name: "Desserts", image: img.tiramisu },
  { name: "Beverages", image: img.drinks },
];

export type Dish = {
  id: number;
  name: string;
  desc: string;
  price: number;
  cat: string;
  image: string;
  flip?: boolean;
  zoom?: boolean;
};

export const dishes: Dish[] = [
  { id: 1, name: "Margherita Pizza", desc: "Classic tomato, mozzarella, fresh basil", price: 449, cat: "Pizzas", image: img.hero },
  { id: 2, name: "Pepperoni Pizza", desc: "Loaded with pepperoni and mozzarella", price: 549, cat: "Pizzas", image: img.pepperoni },
  { id: 3, name: "Truffle Mushroom Pizza", desc: "Wild mushrooms, truffle oil, parmesan", price: 679, cat: "Pizzas", image: img.mushroom },
  { id: 4, name: "Spaghetti Aglio e Olio", desc: "Olive oil, garlic, chilli, parsley", price: 499, cat: "Pasta", image: img.pasta },
  { id: 5, name: "Chicken Alfredo Pasta", desc: "Creamy sauce, grilled chicken, herbs", price: 599, cat: "Pasta", image: img.pasta, flip: true, zoom: true },
  { id: 6, name: "Bruschetta Trio", desc: "Toasted bread, tomato, basil, balsamic", price: 299, cat: "Appetizers", image: img.appetizer },
  { id: 7, name: "Garlic Focaccia", desc: "Rosemary, sea salt, roasted garlic butter", price: 249, cat: "Appetizers", image: img.appetizer, flip: true, zoom: true },
  { id: 8, name: "Caprese Salad", desc: "Buffalo mozzarella, tomato, basil, olive oil", price: 329, cat: "Salads", image: img.salad },
  { id: 9, name: "Aperol Spritz", desc: "Prosecco, aperol, soda, orange slice", price: 399, cat: "Beverages", image: img.drinks },
  { id: 10, name: "Blood Orange Fizz", desc: "Fresh orange, rosemary, sparkling water", price: 279, cat: "Beverages", image: img.drinks, flip: true, zoom: true },
  { id: 11, name: "Tiramisu", desc: "Classic Italian dessert with mascarpone", price: 349, cat: "Desserts", image: img.tiramisu },
  { id: 12, name: "Mocha Tiramisu", desc: "Espresso-soaked savoiardi, dark cocoa", price: 369, cat: "Desserts", image: img.tiramisu, flip: true, zoom: true },
];

export const tabs = ["All", "Pizzas", "Pasta", "Appetizers", "Salads", "Desserts", "Beverages"];

export const stats = [
  { value: 50, suffix: "+", decimals: 0, label: "Signature Dishes" },
  { value: 10, suffix: "K+", decimals: 0, label: "Happy Customers" },
  { value: 4.8, suffix: "/5", decimals: 1, label: "Average Rating" },
  { value: 5, suffix: "+", decimals: 0, label: "Locations in India" },
];

export const reviews = [
  { name: "Ananya Kapoor", initials: "AK", text: "Absolutely loved the wood-fired pizza! The flavours, ambience and service were all exceptional.", color: "#b3261e" },
  { name: "Rohit Mehta", initials: "RM", text: "Authentic Italian taste and a beautiful atmosphere. Perfect place for a family dinner. Highly recommended!", color: "#1f3326" },
  { name: "Sneha Verma", initials: "SV", text: "Best pizza in town! Fresh ingredients, amazing service and a lovely ambience. Will definitely visit again.", color: "#a8741a" },
];

export const locations = [
  { city: "Zirakpur", address: "123 Food Street, Zirakpur, Punjab 140603", phone: "+91 98765 43210", hours: "11 AM – 11 PM", flagship: true },
  { city: "Chandigarh", address: "Sector 17 Plaza, Chandigarh 160017", phone: "+91 98765 43211", hours: "11 AM – 11 PM" },
  { city: "New Delhi", address: "Khan Market, Lodhi Road, New Delhi 110003", phone: "+91 98765 43212", hours: "12 PM – 12 AM" },
  { city: "Mumbai", address: "Bandra West, Linking Road, Mumbai 400050", phone: "+91 98765 43213", hours: "12 PM – 12 AM" },
];
