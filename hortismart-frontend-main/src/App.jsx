import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import MarketPrices from './pages/MarketPrices';
import PricePrediction from './pages/PricePrediction';
import StorageLocator from './pages/StorageLocator';
import ValueAddition from './pages/ValueAddition';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Guide from './pages/Guide';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/market" element={<MarketPrices />} />
                <Route path="/prediction" element={<PricePrediction />} />
                <Route path="/storage" element={<StorageLocator />} />
                <Route path="/value-addition" element={<ValueAddition />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/guide" element={<Guide />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
