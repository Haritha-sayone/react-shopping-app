import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Dashboard from './components/admin/Dashboard';
import AddProducts from './components/admin/AddProducts';
import ViewProducts from './components/admin/ViewProducts';
import EditProduct from './components/admin/EditProduct';
import Cart from './components/cart/Cart';
import Orders from './components/admin/Orders';
import Home from './pages/Home/Home';
import Products from './pages/Shop/Products';
import ProductDetails from './pages/Shop/ProductDetails';
import MyOrders from './pages/Orders/MyOrders';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        {/* Admin Section */}
        <Route path='/admin' element={<Dashboard />} />
        <Route path='/products/add' element={<AddProducts />} />
        <Route path='/products/list' element={<ViewProducts />} />
        <Route path='/product/:id/edit' element={<EditProduct />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
