export const MENUITEMS = [
  {
    menutitle: "Dashboard",
    menucontent: "Dashboards",
    Items: [
      { path: `${process.env.PUBLIC_URL}/dashboard/social`, icon: "home", title: "Dashboard", type: "link" },

    ],
  },
  {
    menutitle: "General",
    menucontent: "Dashboards,Widgets",
    Items: [
      { path: `${process.env.PUBLIC_URL}/brands`, icon: "degree", title: "Brands", type: "link" },
      { path: `${process.env.PUBLIC_URL}/category`, icon: "degree", title: "Category", type: "link" },
      { path: `${process.env.PUBLIC_URL}/subcategory`, icon: "degree", title: "SubCategory", type: "link" },
      { path: `${process.env.PUBLIC_URL}/products`, icon: "degree", title: "Products", type: "link" },
      { path: `${process.env.PUBLIC_URL}/orders`, icon: "degree", title: "Orders", type: "link" },
      // { path: `${process.env.PUBLIC_URL}/location/state`, icon: "location", title: "Location", type: "link" },
      // { path: `${process.env.PUBLIC_URL}/diseases`, icon: "diseases", title: "Diseases", type: "link" },
      // { path: `${process.env.PUBLIC_URL}/specialization`, icon: "specialization", title: "Specialization", type: "link" },
      { path: `${process.env.PUBLIC_URL}/pages`, icon: "form", title: "Pages", type: "link" },
      // { path: `${process.env.PUBLIC_URL}/languages`, icon: "language", title: "Languages", type: "link" },
    ],
  }, 

  {
    menutitle: "Applications",
    menucontent: "Ready to use Apps",
    Items: [
      // {
      //   title: "Users",
      //   icon: "user",
      //   path: `${process.env.PUBLIC_URL}/app/users/profile`,
      //   type: "sub",
      //   bookmark: true,
      //   active: false,
      //   children: [
          // { path: `${process.env.PUBLIC_URL}/app/users/profile`, type: "link", title: "User Profile" },
          // { path: `${process.env.PUBLIC_URL}/app/users/edit`, type: "link", title: "User Edit" },
          // { path: `${process.env.PUBLIC_URL}/app/users/cards`, type: "link", title: "User Cards" },
      //   ],
      // },
      { path: `${process.env.PUBLIC_URL}/coupons`, icon: "user", title: "Coupons", type: "link" },
      { path: `${process.env.PUBLIC_URL}/users`, icon: "staff", title: "Users", type: "link" },
    ],
  },

  {
    menutitle: "Banners",
    menucontent: "Bouns Pages & Apps",
    Items: [
      { path: `${process.env.PUBLIC_URL}/banner-home`, icon: "banner", type: "link", active: false, title: "Home Page" },
      { path: `${process.env.PUBLIC_URL}/banner-cover`, icon: "slider", type: "link", active: false, title: "Phone Cover" },
      { path: `${process.env.PUBLIC_URL}/banner-glass`, icon: "faqs", type: "link", active: false, title: "Phone Glass" },
    ],
  },
  {
    menutitle: "Miscellaneous",
    menucontent: "Bouns Pages & Apps",
    Items: [
      { path: `${process.env.PUBLIC_URL}/advertisement`, icon: "banner", type: "link", active: false, title: "Advertisement" },
      { path: `${process.env.PUBLIC_URL}/blogs`, icon: "banner", type: "link", active: false, title: "Blogs" },
      { path: `${process.env.PUBLIC_URL}/slider`, icon: "slider", type: "link", active: false, title: "Slider" },
      { path: `${process.env.PUBLIC_URL}/faqs`, icon: "faqs", type: "link", active: false, title: "FAQ" },
      { path: `${process.env.PUBLIC_URL}/settings`, icon: "setting", type: "link", active: false, title: "Settings" },
    ],
  },
];
