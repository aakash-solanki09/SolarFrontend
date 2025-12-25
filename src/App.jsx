import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import EditProfile from './pages/EditProfile';
import Chat from './pages/Chat';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNotifications from './pages/admin/AdminNotifications';
import ManageProducts from './pages/admin/ManageProducts';
import EditProduct from './pages/admin/EditProduct';
import ManageUsers from './pages/admin/ManageUsers';
import UserDetails from './pages/admin/UserDetails';
import AdminChat from './pages/admin/AdminChat';
import AdminProductDetails from './pages/admin/AdminProductDetails';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminInquiryDetails from './pages/admin/AdminInquiryDetails';
import AdminSettings from './pages/admin/AdminSettings';

// Protected Route Components
const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
};

import DynamicFavicon from './components/common/DynamicFavicon';

function App() {
  return (
    <>
    <DynamicFavicon />
    <Routes>
      {/* Public & User Routes - Wrapped in MainLayout */}
      {/* Admin Login - Standalone Layout */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Public & User Routes - Wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Route>

      {/* Admin Protected Routes - Wrapped in AdminLayout */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/products/:id" element={<AdminProductDetails />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/products/new" element={<EditProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/users/:id" element={<UserDetails />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />
          <Route path="/admin/inquiries/:id" element={<AdminInquiryDetails />} />
          <Route path="/admin/chat" element={<AdminChat />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
