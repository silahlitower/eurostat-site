import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/eurostat')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>EUROSTAT VERİLERİ</h1>
      {data ? (
        <div style={{marginTop: '20px'}}>
  {data && Object.entries(data).map(([key, value]) => (
    <div key={key} style={{marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
      <h3>{key}</h3>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  ))}
</div>

      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
}
