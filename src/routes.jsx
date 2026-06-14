import AllProductPage from "./Pages/Products/AllProduct/AllProduct.jsx";
import Dashborad from "./Pages/Dashborad/Dashborad.jsx";
import DiscountEdit from "./Pages/Discounts/DiscountEdit/DiscountEdit.jsx";
import DiscountNew from "./Pages/Discounts/DiscountNew/DiscountNew.jsx";
import Discounts from "./Pages/Discounts/Alldiscounts/Discounts.jsx";
import EditProduct from "./Pages/Products/EditPage/EditProduct.jsx";
import NewProductPage from "./Pages/Products/NewProduct/NewProduct.jsx";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage.jsx";
import OrderView from "./Pages/Orders/OrderView/OrderView.jsx";
import OrdersList from "./Pages/Orders/OrdersList/OrdersList.jsx";
import DetailsProduct from "./Pages/Products/DetailsProduct/DetailsProduct.jsx";
let routes = [
    { path: '/dashborad', element: <Dashborad /> },
    { path: '/product', element: <AllProductPage /> },
    { path: '/product/new', element: <NewProductPage /> },
    { path: '/product/edit/:productId', element: <EditProduct /> },
    { path: '/product/:detailsProduct', element: <DetailsProduct /> },
    { path: '/orders', element: <OrdersList /> },
    { path: '/orders/view/:orderId', element: <OrderView /> },
    { path: '/discounts', element: <Discounts /> },
    { path: '/discounts/new', element: <DiscountNew /> },
    { path: '/discount/edit/:discountEdit', element: <DiscountEdit /> },
    { path: '*', element: <NotFoundPage /> },
]
export default routes;