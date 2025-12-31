import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { AppRoutes } from './routes';

function App() {
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
      <AppRoutes />
    </Layout>
  );
}

export default App;
