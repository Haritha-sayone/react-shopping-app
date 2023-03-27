import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Dashboard from './components/admin/Dashboard';
import AddProducts from './components/admin/AddProducts';
import ViewProducts from './components/admin/ViewProducts';
import EditProduct from './components/admin/EditProduct';
import Orders from './components/admin/Orders';
import OrderDetails from './components/admin/OrderDetails';
import Cart from './components/cart/Cart';
import Home from './pages/Home/Home';
import Products from './pages/Shop/Products';
import ProductDetails from './pages/Shop/ProductDetails';
import MyOrders from './pages/Orders/MyOrders';
import Checkout from './pages/Checkout/Checkout';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './pages/ProtectedPages/PrivateRoute';
import AdminRoute from './pages/ProtectedPages/AdminRoute';
import Restricted from './pages/ProtectedPages/Restricted';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="app">
      <Header />
      <ToastContainer style={{ marginTop: "78px" }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id/details' element={<ProductDetails />} />
        <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path='/my-orders' element={<PrivateRoute><MyOrders /></PrivateRoute>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/*' element={<PageNotFound />} />
        {/* Admin Section */}
        <Route path='/admin' element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path='/products/add' element={<AdminRoute><AddProducts /></AdminRoute>} />
        <Route path='/products/list' element={<AdminRoute><ViewProducts /></AdminRoute>} />
        <Route path='/product/:id/edit' element={<AdminRoute><EditProduct /></AdminRoute>} />
        <Route path='/orders' element={<AdminRoute><Orders /></AdminRoute>} />
        <Route path='/users/:uid/order/:id/details' element={<AdminRoute><OrderDetails /></AdminRoute>} />
        <Route path='/restricted' element={<Restricted />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
