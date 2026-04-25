export const marketData = [
  { id: 1, crop: "Tomato", price: 20, location: "Jaipur", date: "2026-03-20", trend: "+2.5%", type: "Vegetable" },
  { id: 2, crop: "Potato", price: 15, location: "Indore", date: "2026-03-20", trend: "-1.2%", type: "Vegetable" },
  { id: 3, crop: "Onion", price: 30, location: "Nashik", date: "2026-03-20", trend: "+5.0%", type: "Vegetable" },
  { id: 4, crop: "Mango", price: 80, location: "Ratnagiri", date: "2026-03-20", trend: "+10.2%", type: "Fruit" },
  { id: 5, crop: "Apple", price: 120, location: "Shimla", date: "2026-03-20", trend: "-3.5%", type: "Fruit" },
  { id: 6, crop: "Carrot", price: 40, location: "Ooty", date: "2026-03-20", trend: "+1.5%", type: "Vegetable" },
];

export const storageData = [
  { id: 1, name: "Cold Storage A", location: "Jaipur", capacity: 1000, pricePerDay: 50, distance: "5 km", rating: 4.5 },
  { id: 2, name: "Farmers Hub", location: "Ajmer", capacity: 5000, pricePerDay: 45, distance: "12 km", rating: 4.2 },
  { id: 3, name: "Green Keepers", location: "Dausa", capacity: 2000, pricePerDay: 60, distance: "8 km", rating: 4.8 },
];

export const predictionData = [
  { month: "Jan", price: 25 },
  { month: "Feb", price: 28 },
  { month: "Mar", price: 32 },
  { month: "Apr", price: 30 },
  { month: "May", price: 35 },
  { month: "Jun", price: 40 },
  { month: "Jul", price: 38 },
  { month: "Aug", price: 42 },
  { month: "Sep", price: 45 },
  { month: "Oct", price: 48 },
  { month: "Nov", price: 44 },
  { month: "Dec", price: 50 },
];

export const valueAdditionSuggestions = [
  {
    crop: "Tomato",
    products: ["Puree", "Ketchup", "Sun-dried Tomatoes"],
    rawPrice: 20,
    processedPrice: 120,
    profitIncrease: "500%"
  },
  {
    crop: "Mango",
    products: ["Juice", "Pickle", "Amchur"],
    rawPrice: 80,
    processedPrice: 250,
    profitIncrease: "212%"
  },
  {
    crop: "Potato",
    products: ["Chips", "Starch", "French Fries"],
    rawPrice: 15,
    processedPrice: 90,
    profitIncrease: "500%"
  }
];

export const notifications = [
  { id: 1, type: "price", message: "Tomato prices in Jaipur expected to rise by 15% next week.", time: "2 hours ago" },
  { id: 2, type: "tip", message: "Consider processing your mango harvest into pulp for 2x profit.", time: "5 hours ago" },
  { id: 3, type: "storage", message: "Cold Storage A has 20% discount on new bookings.", time: "1 day ago" },
];
