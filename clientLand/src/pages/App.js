import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Sign from './Sign';
import PageNotFound from './PageNotFound';
import Services from './Services';
import AllLands from '../components/AllLands';
import LandForm from '../pages/LandForm';
import { LandsProvider } from '../components/LandsProvider';
import Plot from './Plot';
import { AuthProvider } from '../components/AuthContext';
import Profile from './Profile';

const lands = [
  {
    id: 1,
    upi: 12004234,
    type: 'Appartment',
    size: 15000,
    location: 'Bugesera, Ntarama',
    price: 1000000,
    info: 'Located near the main road with access to electricity and water. Ideal for residential development.',
    img: '/images/imgSale1.jpeg',
    purpose: 'rent',
  },
  {
    id: 2,
    upi: 12004235,
    type: 'House',
    size: 12000,
    location: 'Kigali, Kicukiro',
    price: 1500000,
    info: 'Close to schools, hospitals, and shopping centers. Perfect for family homes or apartments.',
    img: '/images/imgSale2.png',
    purpose: 'sale',
  },
  {
    id: 3,
    upi: 12004236,
    type: 'Plot',
    size: 20000,
    location: 'Musanze, Kinigi',
    price: 800000,
    info: 'Scenic views of the Virunga Mountains, great for a resort or eco-lodge. Easy access to hiking trails.',
    img: '/images/imgSale3.jpeg',
    purpose: 'rent',
  },
  {
    id: 4,
    upi: 12004237,
    type: 'Plot',
    size: 18000,
    location: 'Rubavu, Gisenyi',
    price: 1200000,
    info: 'Near Lake Kivu, suitable for commercial or residential projects. Popular tourist destination.',
    img: '/images/imgSale4.jpeg',
    purpose: 'sale',
  },
  {
    id: 5,
    upi: 12004238,
    type: 'Plot',
    size: 25000,
    location: 'Huye, Butare',
    price: 900000,
    info: 'Quiet area, perfect for agricultural purposes. Rich soil and plenty of sunlight for crops.',
    img: '/images/imgSale1.jpeg',
    purpose: 'sale',
  },
  {
    id: 6,
    upi: 12004239,
    type: 'Plot',
    size: 16000,
    location: 'Rwamagana, Kigabiro',
    price: 1100000,
    info: 'Near the city center, excellent for residential development. Proximity to essential amenities.',
    img: '/images/imgSale2.png',
    purpose: 'sale',
  },
  {
    id: 7,
    upi: 12004240,
    type: 'Plot',
    size: 22000,
    location: 'Rusizi, Kamembe',
    price: 950000,
    info: 'Close to the border with DRC, ideal for commercial use. High traffic area with business potential.',
    img: '/images/imgSale3.jpeg',
    purpose: 'sale',
  },
  {
    id: 8,
    upi: 12004241,
    type: 'Plot',
    size: 14000,
    location: 'Nyagatare, Matimba',
    price: 850000,
    info: 'Fertile land, perfect for farming activities. Abundant water supply and good road access.',
    img: '/images/imgSale4.jpeg',
    purpose: 'sale',
  },
  {
    id: 9,
    upi: 12004242,
    type: 'Plot',
    size: 13000,
    location: 'Gicumbi, Byumba',
    price: 700000,
    info: 'Serene environment, ideal for a holiday home. Beautiful views and fresh air all year round.',
    img: '/images/imgSale1.jpeg',
    purpose: 'sale',
  },
  {
    id: 10,
    upi: 12004243,
    type: 'Plot',
    size: 21000,
    location: 'Muhanga, Nyamabuye',
    price: 1050000,
    info: 'Accessible by road, with nearby amenities. Growing community with lots of development potential.',
    img: '/images/imgSale2.png',
    purpose: 'rent',
  },
];

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <LandsProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Sign />} />
              <Route path="/profile/:userName" element={<Profile />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/services/buy/:id" element={<Plot />} />
              <Route path="services" element={<Services />}>
                <Route path="buy" element={<AllLands />} />
                <Route path="sellLand" element={<LandForm />} />
                <Route index element={<Navigate replace to="buy" />} />
              </Route>
            </Routes>
          </LandsProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
