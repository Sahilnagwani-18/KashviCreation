// export const registerFormControls = [
//   {
//     name: "userName",
//     label: "User Name",
//     placeholder: "Enter your user name",
//     componentType: "input",
//     type: "text",
//   },
//   {
//     name: "email",
//     label: "Email",
//     placeholder: "Enter your email",
//     componentType: "input",
//     type: "email",
//   },
//   {
//     name: "password",
//     label: "Password",
//     placeholder: "Enter your password",
//     componentType: "input",
//     type: "password",
//   },
// ];


export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    componentType: "input",
    type: "tel", // Use 'tel' for phone numbers
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

// export const loginFormControls = [
//   {
//     name: "email",
//     label: "Email",
//     placeholder: "Enter your email",
//     componentType: "input",
//     type: "email",
//   },
//   {
//     name: "password",
//     label: "Password",
//     placeholder: "Enter your password",
//     componentType: "input",
//     type: "password",
//   },
// ];


export const loginFormControls = [
  {
    name: "email",
    label: "Email or Phone Number",
    placeholder: "Enter your email or phone number",
    componentType: "input",
    type: "text", // Use 'text' to allow both email and phone number
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "silk", label: "Silk" },
      { id: "wool", label: "Wool" },
      { id: "cotton", label: "Cotton" },
      { id: "polyester", label: "Polyester" },
      { id: "nylon", label: "Nylon" },
    ],
  },
  {
    label: "Color",
    name: "brand",
    componentType: "select",
    options: [
      { id: "pink", label: "Pink" },
      { id: "green", label: "Green" },
      { id: "red", label: "Red" },
      { id: "yellow", label: "Yellow" },
      { id: "white", label: "White" },
      { id: "blue", label: "Blue" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "about",
    label: "About Us",
    path: "/shop/about-us",
  },
  {
    id: "store",
    label: "Find Store",
    path: "/shop/store",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  silk: "Silk",
  wool: "Wool",
  cotton: "Cotton",
  polyester: "Polyester",
  nylon: "Nylon",
};

export const brandOptionsMap = {
  pink: "Pink",
  green: "Green",
  red: "Red",
  yellow: "Yellow",
  white: "White",
  blue: "Blue",
};

export const filterOptions = {
  category: [
    { id: "silk", label: "Silk" },
    { id: "wool", label: "Wool" },
    { id: "cotton", label: "Cotton" },
    { id: "polyester", label: "Ployester" },
    { id: "nylon", label: "Nylon" },
  ],
  brand: [
    { id: "pink", label: "Pink" },
    { id: "green", label: "Green" },
    { id: "red", label: "Red" },
    { id: "yellow", label: "Yellow" },
    { id: "white", label: "White" },
    { id: "blue", label: "Blue" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
