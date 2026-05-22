import type { GearListing, Owner } from "../types";

export const owners: Owner[] = [
  {
    id: "owner-boulder-cycle",
    name: "Boulder Cycle Works",
    type: "shop",
    rating: 4.9,
    verified: true,
    responseTime: "Usually replies within 20 minutes",
    location: "Boulder, CO",
  },
  {
    id: "owner-front-range",
    name: "Front Range Adventure Co.",
    type: "shop",
    rating: 4.8,
    verified: true,
    responseTime: "Usually replies within 1 hour",
    location: "Fort Collins, CO",
  },
  {
    id: "owner-redrock",
    name: "Redrock Bike & Trail",
    type: "shop",
    rating: 4.9,
    verified: true,
    responseTime: "Usually replies within 30 minutes",
    location: "Moab, UT",
  },
  {
    id: "owner-cascade",
    name: "Cascade Electric Rides",
    type: "shop",
    rating: 4.7,
    verified: true,
    responseTime: "Usually replies same day",
    location: "Bend, OR",
  },
  {
    id: "owner-summit",
    name: "Summit Snow Rentals",
    type: "shop",
    rating: 4.8,
    verified: true,
    responseTime: "Usually replies within 45 minutes",
    location: "Park City, UT",
  },
  {
    id: "owner-alpine",
    name: "Alpine Basecamp Rentals",
    type: "shop",
    rating: 4.9,
    verified: true,
    responseTime: "Usually replies within 25 minutes",
    location: "Breckenridge, CO",
  },
  {
    id: "owner-maya",
    name: "Maya R.",
    type: "individual",
    rating: 4.7,
    verified: false,
    responseTime: "Usually replies same day",
    location: "Santa Cruz, CA",
  },
  {
    id: "owner-ladybird",
    name: "Lady Bird Paddle Co.",
    type: "shop",
    rating: 4.8,
    verified: true,
    responseTime: "Usually replies within 35 minutes",
    location: "Austin, TX",
  },
  {
    id: "owner-blue-ridge",
    name: "Blue Ridge River Outfitters",
    type: "shop",
    rating: 4.7,
    verified: true,
    responseTime: "Usually replies within 1 hour",
    location: "Asheville, NC",
  },
  {
    id: "owner-cam",
    name: "Cam D.",
    type: "individual",
    rating: 4.6,
    verified: false,
    responseTime: "Usually replies in a few hours",
    location: "Denver, CO",
  },
  {
    id: "owner-jordan",
    name: "Jordan P.",
    type: "individual",
    rating: 4.8,
    verified: false,
    responseTime: "Usually replies same day",
    location: "Boulder, CO",
  },
  {
    id: "owner-trailhead",
    name: "Trailhead Gear Library",
    type: "shop",
    rating: 4.8,
    verified: true,
    responseTime: "Usually replies within 30 minutes",
    location: "Boulder, CO",
  },
];

export const listings: GearListing[] = [
  {
    id: "carbon-road-bike-boulder",
    title: "Specialized Tarmac Carbon Road Bike",
    category: "Bikes",
    subcategory: "Road bikes",
    description:
      "Lightweight carbon road bike with Shimano 105, fresh brake pads, and a professional shop tune before each rental. Ideal for canyon rides or a fast weekend spin.",
    location: "Boulder, CO",
    distanceMiles: 1.4,
    pricePerDay: 64,
    depositAmount: 250,
    replacementValue: 4200,
    rating: 4.9,
    reviewCount: 186,
    ownerName: "Boulder Cycle Works",
    ownerType: "shop",
    availabilityStatus: "available",
    condition: "excellent",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
    features: ["Carbon frame", "Shimano 105", "Flat kit included", "Shop tuned"],
    safetyNotes:
      "Helmet strongly recommended. Shop will confirm sizing and fit before pickup.",
    pickupInstructions:
      "Pick up at the Pearl Street shop desk. Bring a photo ID and the card used for the deposit hold.",
  },
  {
    id: "gravel-bike-front-range",
    title: "Cannondale Topstone Gravel Bike",
    category: "Bikes",
    subcategory: "Gravel bikes",
    description:
      "Stable aluminum gravel bike with 40mm tires, tubeless setup, and mounts for bags. Built for foothill routes, farm roads, and mixed-surface trips.",
    location: "Fort Collins, CO",
    distanceMiles: 3.8,
    pricePerDay: 58,
    depositAmount: 200,
    replacementValue: 2600,
    rating: 4.8,
    reviewCount: 94,
    ownerName: "Front Range Adventure Co.",
    ownerType: "shop",
    availabilityStatus: "limited",
    condition: "excellent",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80",
    features: ["40mm gravel tires", "Tubeless setup", "Bottle cages", "Repair kit"],
    safetyNotes:
      "Rental includes a quick fit check and route guidance for current trail conditions.",
    pickupInstructions:
      "Meet at the rental counter inside Front Range Adventure Co. after confirmation.",
  },
  {
    id: "full-suspension-mtb-moab",
    title: "Santa Cruz Hightower Full-Suspension Mountain Bike",
    category: "Bikes",
    subcategory: "Mountain bikes",
    description:
      "Trail-ready full-suspension mountain bike with dropper post and fresh sealant. A serious rental for slickrock, desert singletrack, and technical day rides.",
    location: "Moab, UT",
    distanceMiles: 2.1,
    pricePerDay: 88,
    depositAmount: 350,
    replacementValue: 5400,
    rating: 4.9,
    reviewCount: 223,
    ownerName: "Redrock Bike & Trail",
    ownerType: "shop",
    availabilityStatus: "available",
    condition: "excellent",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?auto=format&fit=crop&w=1200&q=80",
    features: ["150mm travel", "Dropper post", "Tubeless tires", "Trail map included"],
    safetyNotes:
      "Riders should be comfortable on intermediate trails. Body armor is available at pickup.",
    pickupInstructions:
      "Pick up at the shop garage entrance. Staff will set suspension sag before departure.",
  },
  {
    id: "ebike-bend",
    title: "Trek Allant+ Commuter E-Bike",
    category: "Bikes",
    subcategory: "E-bikes",
    description:
      "Comfortable pedal-assist e-bike with integrated lights, rear rack, and long-range battery. Great for exploring Bend without bringing a car.",
    location: "Bend, OR",
    distanceMiles: 4.2,
    pricePerDay: 72,
    depositAmount: 300,
    replacementValue: 3600,
    rating: 4.7,
    reviewCount: 71,
    ownerName: "Cascade Electric Rides",
    ownerType: "shop",
    availabilityStatus: "limited",
    condition: "good",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=80",
    features: ["Pedal assist", "Integrated lights", "Rear rack", "Lock included"],
    safetyNotes:
      "Class 1 pedal assist. Riders receive a controls walkthrough before pickup.",
    pickupInstructions:
      "Pick up from the downtown Bend storefront. Battery charger included for multi-day rentals.",
  },
  {
    id: "snowboard-package-park-city",
    title: "Burton Snowboard Package",
    category: "Snow Sports",
    subcategory: "Snowboards",
    description:
      "All-mountain snowboard package with board, bindings, and boots. The shop adjusts stance and boot fit before you head to the lifts.",
    location: "Park City, UT",
    distanceMiles: 0.9,
    pricePerDay: 52,
    depositAmount: 175,
    replacementValue: 1100,
    rating: 4.8,
    reviewCount: 158,
    ownerName: "Summit Snow Rentals",
    ownerType: "shop",
    availabilityStatus: "available",
    condition: "good",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=80",
    features: ["Board", "Bindings", "Boots", "Stance adjustment"],
    safetyNotes:
      "Binding setup is checked by shop staff. Helmets can be added at pickup.",
    pickupInstructions:
      "Pickup is two blocks from the town lift. Arrive 20 minutes early for boot fitting.",
  },
  {
    id: "ski-package-breckenridge",
    title: "Rossignol Performance Ski Package",
    category: "Snow Sports",
    subcategory: "Skis",
    description:
      "Performance ski package with skis, boots, poles, and DIN setup by certified technicians. Built for intermediate to advanced resort days.",
    location: "Breckenridge, CO",
    distanceMiles: 1.1,
    pricePerDay: 61,
    depositAmount: 200,
    replacementValue: 1400,
    rating: 4.9,
    reviewCount: 204,
    ownerName: "Alpine Basecamp Rentals",
    ownerType: "shop",
    availabilityStatus: "available",
    condition: "excellent",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=1200&q=80",
    features: ["Skis", "Boots", "Poles", "DIN setup"],
    safetyNotes:
      "DIN settings require height, weight, age, boot sole length, and skier type at pickup.",
    pickupInstructions:
      "Check in at the Main Street tuning desk. Multi-day rentals can be stored overnight.",
  },
  {
    id: "longboard-santa-cruz",
    title: "Loaded Tan Tien Longboard",
    category: "Boards",
    subcategory: "Longboards",
    description:
      "Flexible carving longboard with smooth wheels for cruising the coast or campus paths. Best for relaxed rides and boardwalk sessions.",
    location: "Santa Cruz, CA",
    distanceMiles: 2.6,
    pricePerDay: 18,
    depositAmount: 60,
    replacementValue: 320,
    rating: 4.7,
    reviewCount: 27,
    ownerName: "Maya R.",
    ownerType: "individual",
    availabilityStatus: "available",
    condition: "good",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=1200&q=80",
    features: ["Carving deck", "Soft wheels", "Helmet available", "Beginner friendly"],
    safetyNotes:
      "Avoid steep descents and wet pavement. Helmet available on request.",
    pickupInstructions:
      "Pickup near Westside Santa Cruz after owner confirms the request window.",
  },
  {
    id: "paddleboard-austin",
    title: "Inflatable Paddleboard Kit",
    category: "Water Sports",
    subcategory: "Paddleboards",
    description:
      "Stable inflatable paddleboard with paddle, pump, leash, and personal flotation device. Easy to carry and ideal for Lady Bird Lake.",
    location: "Austin, TX",
    distanceMiles: 1.7,
    pricePerDay: 39,
    depositAmount: 125,
    replacementValue: 780,
    rating: 4.8,
    reviewCount: 132,
    ownerName: "Lady Bird Paddle Co.",
    ownerType: "shop",
    availabilityStatus: "available",
    condition: "excellent",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    features: ["Inflatable board", "Paddle", "Pump", "PFD included"],
    safetyNotes:
      "PFD is included and expected on the water. Do not use during lightning or flood advisories.",
    pickupInstructions:
      "Pick up dockside at the Lady Bird Paddle kiosk. Staff will demonstrate inflation.",
  },
  {
    id: "kayak-asheville",
    title: "Perception Sit-On-Top Kayak",
    category: "Water Sports",
    subcategory: "Kayaks",
    description:
      "Stable recreational kayak for mellow river floats and lake paddles. Includes paddle, PFD, dry bag, and local launch guidance.",
    location: "Asheville, NC",
    distanceMiles: 5.3,
    pricePerDay: 44,
    depositAmount: 150,
    replacementValue: 950,
    rating: 4.7,
    reviewCount: 88,
    ownerName: "Blue Ridge River Outfitters",
    ownerType: "shop",
    availabilityStatus: "limited",
    condition: "good",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1472740378865-80aab8e73251?auto=format&fit=crop&w=1200&q=80",
    features: ["Paddle", "PFD", "Dry bag", "Launch guidance"],
    safetyNotes:
      "Designed for flatwater and mellow flows. Shop may pause rentals during unsafe river levels.",
    pickupInstructions:
      "Pick up from the river outpost. Vehicle straps available with staff installation.",
  },
  {
    id: "two-person-tent-denver",
    title: "Big Agnes Copper Spur 2-Person Tent",
    category: "Camping Gear",
    subcategory: "Camping tents",
    description:
      "Lightweight two-person backpacking tent with footprint, stakes, and repair sleeve. Cleaned and dried after each trip.",
    location: "Denver, CO",
    distanceMiles: 6.4,
    pricePerDay: 24,
    depositAmount: 100,
    replacementValue: 550,
    rating: 4.6,
    reviewCount: 34,
    ownerName: "Cam D.",
    ownerType: "individual",
    availabilityStatus: "available",
    condition: "good",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
    features: ["Sleeps two", "Footprint", "Stakes", "Repair sleeve"],
    safetyNotes:
      "Return dry when possible. If weather prevents drying, note it in the return message.",
    pickupInstructions:
      "Pickup in the Highlands neighborhood after the owner confirms the request.",
  },
  {
    id: "hitch-bike-rack-boulder",
    title: "Thule T2 Pro XTR Hitch Bike Rack",
    category: "Accessories",
    subcategory: "Bike racks",
    description:
      "Two-bike hitch rack that fits 2-inch receivers and carries mountain, gravel, road, and many e-bikes. Great for weekend trail access.",
    location: "Boulder, CO",
    distanceMiles: 2.9,
    pricePerDay: 22,
    depositAmount: 120,
    replacementValue: 800,
    rating: 4.8,
    reviewCount: 41,
    ownerName: "Jordan P.",
    ownerType: "individual",
    availabilityStatus: "available",
    condition: "excellent",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1529422643029-d4585747aaf2?auto=format&fit=crop&w=1200&q=80",
    features: ["2-inch hitch", "Carries two bikes", "Lock cores", "Owner walkthrough"],
    safetyNotes:
      "Renter is responsible for confirming hitch compatibility before pickup.",
    pickupInstructions:
      "Pickup near North Boulder. Owner can help mount and check fit during handoff.",
  },
  {
    id: "helmet-accessory-bundle-boulder",
    title: "Trail Helmet and Accessory Bundle",
    category: "Accessories",
    subcategory: "Helmets and accessory bundles",
    description:
      "Add-on bundle with trail helmet, lock, flat kit, lights, and compact pump. Useful for travelers renting bikes without bringing essentials.",
    location: "Boulder, CO",
    distanceMiles: 1.2,
    pricePerDay: 15,
    depositAmount: 50,
    replacementValue: 260,
    rating: 4.8,
    reviewCount: 112,
    ownerName: "Trailhead Gear Library",
    ownerType: "shop",
    availabilityStatus: "available",
    condition: "excellent",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?auto=format&fit=crop&w=1200&q=80",
    features: ["Helmet", "Lock", "Flat kit", "Lights and pump"],
    safetyNotes:
      "Helmet fit is checked at pickup. Replace after any crash or hard impact.",
    pickupInstructions:
      "Bundle is prepared at the shop counter and can be paired with most bike rentals.",
  },
];

export function findOwnerByName(ownerName: string) {
  return owners.find((owner) => owner.name === ownerName);
}

export function findListingById(id: string) {
  return listings.find((listing) => listing.id === id);
}
