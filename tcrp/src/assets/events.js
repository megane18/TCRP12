const dummyEvents = [
  {
    name: "Importance of Credit",
    type: "Workshop",
    description:
      "Join us to learn about the importance of credit and how to manage it effectively.",
    start_date: "2024-10-10",
    image:
      "https://static.wixstatic.com/media/07d127_c95a3e2c1c5e4b1a8750f94223e0bf0b~mv2.jpg/v1/fill/w_621,h_462,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/FAC%20Grads.jpg",
    location: "Community Center, Room A",
    featured: false,
    id: 1,
  },
  {
    name: "First-Time Home Buyer Info",
    type: "Seminar",
    description:
      "A comprehensive seminar for first-time home buyers covering essential tips and resources.",
    start_date: "2024-04-15",
    image:
      "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/380830366_682839023878194_3727574057354942455_n.jpg?stp=cp6_dst-jpg&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=yXlcQXo5Pf8Q7kNvgHEMSGT&_nc_ht=scontent-atl3-2.xx&_nc_gid=A6PSyYgNuYtOQCWSB27lJ4y&oh=00_AYBc93sWoPXtcJm04yaR3XKYH1Id2f83IN5deWJkuwKqbg&oe=66F65458",
    location: "Town Hall Auditorium",
    featured: false,
    id: 2,
  },
  {
    name: "Down Payment Assistance",
    type: "Information Session",
    description:
      "Learn about various down payment assistance programs available in our community.",
    start_date: "2024-10-20",
    image:
      "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/354189901_625838479578249_5848154246139961361_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=6rNTD1jWbQMQ7kNvgHVI82h&_nc_ht=scontent-atl3-2.xx&oh=00_AYBCW_rNKqCCWtvpGcXoSWqjL0A8RDNopkCatNhs7QqhTg&oe=66F654AE",
    location: "Local Library, Meeting Room 2",
    featured: false,
    id: 3,
  },
  {
    name: "Home Ownership Process",
    type: "Workshop",
    description:
      "Understand the entire process of home ownership from beginning to the closing table.",
    start_date: "2024-08-01",
    image:
      "https://static.wixstatic.com/media/07d127_58792a955d7f4f38bbd9865118629f3f~mv2.png/v1/fill/w_399,h_275,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Screen%20Shot%202024-04-10%20at%201_38_16%20PM.png",
    location: "Community Center, Room B",
    featured: false,
    id: 4,
  },
  {
    name: "Mortgage Workshop",
    type: "Workshop",
    description:
      "Join us for a detailed discussion on mortgage options and how to secure the best rates.",
    start_date: "2024-11-05",
    image:
      "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/335160932_3489722227977731_2154791852264141978_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=qgvIZTxsOe4Q7kNvgHs9dmq&_nc_ht=scontent-atl3-2.xx&_nc_gid=APLYnVaSSmn69UjFjL0HOC9&oh=00_AYAwQ6m57pDLX3suSa8Mn5B8hX8dnLgPDGKGbwTuGy_RRA&oe=66F66848",
    location: "Financial Achievement Club",
    featured: false,
    id: 5,
  },
  {
    name: "Financial Achievement Club Meetings",
    type: "Regular Meeting",
    description:
      "Monthly meetings focused on improving financial literacy and achieving financial goals.",
    start_date: "2024-11-15",
    image:
      "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/341125160_244726028044712_6163832979561286285_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=poFkgLzODs0Q7kNvgFbGR6T&_nc_ht=scontent-atl3-2.xx&_nc_gid=AtskviyEEIPDLEblhbxQlT1&oh=00_AYDyg41W311xuILyaqhf0lunP3FN3Vp0d781QRI3i4uv0w&oe=66F6433B",
    location: "Community Center, Conference Room",
    featured: true,
    id: 6,
  },
  {
    name: "Investment Strategies for Beginners",
    type: "Workshop",
    description:
      "Learn basic investment strategies to grow your savings and prepare for the future.",
    start_date: "2024-09-20",
    image:
      "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/341122428_1686478025088207_7284350851226380061_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3bOGyCTxV8MQ7kNvgHC4Cl5&_nc_ht=scontent-atl3-2.xx&_nc_gid=A9FnA8sn1rNxGFSTX_r4GNK&oh=00_AYBpOllXhSKhzQou2iByQlYrjatIWL4dxUdem7uA37FE2A&oe=66F661A9",
    location: "Downtown Library, Room 3",
    featured: true,
    id: 7,
  },
  {
    name: "Budgeting Basics",
    type: "Seminar",
    description:
      "A seminar focused on creating and maintaining a budget for financial stability.",
    start_date: "2024-12-01",
    image:
      "https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/352238259_597003202237550_1772016903667726728_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=xZdIOzO8qZkQ7kNvgHoJwkX&_nc_ht=scontent-atl3-2.xx&_nc_gid=A8nBtS82ChcyxkjS452xC8E&oh=00_AYByriIa0XeUElyoo6Gmc4UTK4fAXsboYZV9Df1wB-8nEQ&oe=66F648E3",
    location: "City Hall, Room 101",
    featured: true,
    id: 8,
  },
];

export default dummyEvents;
