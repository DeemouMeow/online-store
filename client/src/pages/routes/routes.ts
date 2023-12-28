import AdminPanel from "../AdminPanel";
import Authorization from "../Authorization";
import Basket from "../Basket";
import Device from "../Device";
import Shop from "../Shop";

export const routes = {
    basket: "/basket",
    admin: "/admin",
    shop: "/shop",
    device: "/device/:id",
    login: "/login",
    registration: "/registration"
};

export const authRoutes = [
    { path: routes.basket, element: Basket },
    { path: routes.admin, element: AdminPanel }
];

export const publicRoutes = [
    { path: routes.shop, element: Shop },
    { path: routes.device, element: Device },
    { path: routes.login, element: Authorization },
    { path: routes.registration, element: Authorization },
];
