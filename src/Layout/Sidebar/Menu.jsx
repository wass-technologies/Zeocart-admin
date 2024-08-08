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
      { path: `${process.env.PUBLIC_URL}/subcategories`, icon: "degree", title: "SubCategories", type: "link" },
      { path: `${process.env.PUBLIC_URL}/products`, icon: "degree", title: "Products", type: "link" },
      { path: `${process.env.PUBLIC_URL}/orders`, icon: "degree", title: "Orders", type: "link" },
      { path: `${process.env.PUBLIC_URL}/payments`, icon: "degree", title: "Payments", type: "link" },
    ],
  }, 

  {
    menutitle: "Applications",
    menucontent: "Ready to use Apps",
    Items: [
      { path: `${process.env.PUBLIC_URL}/coupons`, icon: "user", title: "Coupons", type: "link" },
      { path: `${process.env.PUBLIC_URL}/users`, icon: "staff", title: "Users", type: "link" },
    ],
  },

  {
    menutitle: "Images",
    menucontent: "Banners",
    Items: [
      {
        title: "Banners",
        icon: "form",
        type: "sub",
        menutitle: "Banners",
        menucontent: "Banners",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/homepage`, icon: "banner", activeTitle: "homepage", type: "link", active: false, title: "Home Page" },
          { path: `${process.env.PUBLIC_URL}/phonecover`, icon: "slider", type: "link", active: false, title: "PhoneCover" },
          // { path: `${process.env.PUBLIC_URL}/phoneglass`, icon: "faqs", type: "link", active: false, title: "PhoneGlass" },
        ]
      },
      { path: `${process.env.PUBLIC_URL}/slider`, icon: "slider", type: "link", active: false, title: "Slider" },

    ],
  },

  {
    menutitle: "Miscellaneous",
    menucontent: "Bouns Pages & Apps",
    Items: [
      { path: `${process.env.PUBLIC_URL}/advertisement`, icon: "banner", type: "link", active: false, title: "Advertisement" },
      { path: `${process.env.PUBLIC_URL}/blogs`, icon: "banner", type: "link", active: false, title: "Blogs" },
      { path: `${process.env.PUBLIC_URL}/faqs`, icon: "faqs", type: "link", active: false, title: "FAQ" },
      { path: `${process.env.PUBLIC_URL}/pages`, icon: "form", title: "Pages", type: "link" },

    ],
  },
];
