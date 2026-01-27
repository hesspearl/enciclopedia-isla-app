import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './index.css'
import Home from './Pages/Home.jsx'
import ErrorPage from './Pages/Error-page.jsx';
import Storytelling from './Pages/Story.tsx';
import WhatsAppButton from './components/WhatsAppButton.tsx';

const RootLayout = () => (
  <>
    <WhatsAppButton />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/story/:cardId", element: <Storytelling /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
