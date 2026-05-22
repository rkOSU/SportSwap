export const categories = [
  {
    name: "Bikes",
    description: "Road, gravel, mountain, and e-bikes from tuned local fleets.",
    searchValue: "Bikes",
  },
  {
    name: "Snow Sports",
    description: "Skis, snowboards, boots, and mountain-ready packages.",
    searchValue: "Snow Sports",
  },
  {
    name: "Boards",
    description: "Longboards and other ride-ready board rentals.",
    searchValue: "Boards",
  },
  {
    name: "Water Sports",
    description: "Paddleboards, kayaks, and water gear near launch points.",
    searchValue: "Water Sports",
  },
  {
    name: "Camping Gear",
    description: "Tents, racks, helmets, and trip essentials for fast weekends.",
    searchValue: "Camping Gear",
  },
] as const;

export const categoryOptions = [
  "Bikes",
  "Snow Sports",
  "Boards",
  "Water Sports",
  "Camping Gear",
  "Accessories",
];

export const subcategoryOptions = [
  "Road bikes",
  "Gravel bikes",
  "Mountain bikes",
  "E-bikes",
  "Snowboards",
  "Skis",
  "Longboards",
  "Paddleboards",
  "Kayaks",
  "Camping tents",
  "Bike racks",
  "Helmets and accessory bundles",
];
