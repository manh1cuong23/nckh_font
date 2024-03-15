import config from '~/config';

import Home from '~/pages/Home/Home';
import Shop from '~/pages/Shop/Shop';
import Blog from '~/pages/Blog/Blog';
import BlogDetail from '~/pages/BlogDetail/BlogDetail';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import Cart from '~/pages/Cart/Cart';
import ProductDetail from '~/pages/ProductDetail/ProductDetail';
import CheckOut from '~/pages/CheckOut/CheckOut';
import Contact from '~/pages/Contact/Contact';
import FAQ from '~/pages/FAQ/FAQ';
import Profile from '~/pages/Profile/Profile';
import Favourite from '~/pages/Favourite/Favourite';
import ForgetPass from '~/pages/ForgetPass/ForgetPass';
import mainDashboard from '~/pages/mainDashboard/mainDashboard';
import DashboardOverview from '~/pages/mainDashboard/pages/dashboard/DashboardOverview';
import Manaproduct from '~/pages/mainDashboard/pages/Manaproduct/Manaproduct';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.shop, component: Shop },
    { path: config.routes.Shop, component: Shop },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.checkout, component: CheckOut },
    { path: config.routes.checkOut, component: CheckOut },
    { path: config.routes.faq, component: FAQ },
    { path: config.routes.productDetail, component: ProductDetail },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.favourite, component: Favourite },
    { path: config.routes.ForgetPass, component: ForgetPass },
];

const privateRoutes = [
    { path: config.routes.DashboardMain, component: DashboardOverview },
    { path: config.routes.Product, component: Manaproduct},

];

export { privateRoutes, publicRoutes };