src/ui.tsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [html, setHtml] = React.useState('');
  return (
    <div style={{ padding: 16, width: 300 }}>
      <textarea
        style={{ width: '100%', height: 150 }}
        placeholder="Paste Klaviyo email HTML"
        value={html}
        onChange={e => setHtml(e.target.value)}
      />
      <button
        style={{ marginTop: 12 }}
        onClick={() => parent.postMessage({ pluginMessage: { type: 'render-html', html } }, '*')}
      >
        Render Wireframe
      </button>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
