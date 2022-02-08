import Admin from "../common/components/AdminComponents/Admin"
import Cart from "../common/components/PrivateComponents/Cart/Cart"
import Favorite from "../common/components/PrivateComponents/Favorite/Favorite"
import Profile from "../common/components/PrivateComponents/Profile/Profile"
import About from "../common/components/PublicComponents/About/About"
import Main from "../common/components/PublicComponents/Main/Main"
import Food from "../common/pages/Food"


export const publicRoutes = [
    {path: "/about", component: About, exact: true},
    {path: "/main", component: Main, exact: true},
    {path: "/main/:foodName", component: Food, exact: true},
]

export const privateRoutes = [
    {path: "/main", component: Main, exact: true},
    {path: "/about", component: About, exact: true},
    {path: "/favorite", component: Favorite, exact: true},
    {path: "/cart", component: Cart, exact: true},
    {path: "/profile", component: Profile, exact: true},
]

export const adminRoutes = [
    {path: "/admin", component: Admin, exact: true},
]