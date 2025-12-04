import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Loader2 } from 'lucide-react';

// Lazy load pages to reduce initial bundle size
const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <Loader2 className="animate-spin text-orange" size={48} />
    <div className="text-center">
      <p className="text-gray-300 italic text-lg">"Patience. Use the Force. Think."</p>
      <p className="text-orange text-sm mt-2">— Qui-Gon Jinn</p>
    </div>
  </div>
);

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we were redirected from 404.html
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <Router>
        <AppRoutes />
      </Router>
    </GoogleReCaptchaProvider>
  );
}

export default App;
