import { hydrate, render } from 'preact';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './i18n';

if (typeof window !== 'undefined') {
  // Use render instead of hydrate to prevent hydration mismatches 
  // with react-router-dom v7 + preact/compat during initial path detection.
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );
}

export async function prerender(data) {
  const { renderToStringAsync } = await import('preact-render-to-string');
  const { StaticRouter } = await import('react-router-dom');

  return await renderToStringAsync(
    <StaticRouter location={data.url}>
      <App />
    </StaticRouter>
  );
}
