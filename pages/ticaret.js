import { useState } from 'react';

export default function TicaretArama() {
  const [urun, setUrun] = useState('');
  const [sonuclar, setSonuclar] = useState(null);

  const ara = async () => {
    const response = await fetch(`/api/firmalar?urun=${encodeURIComponent(urun)}`);
    setSonuclar(await response.json());
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: 'red', textAlign: 'center' }}>🇹🇷 TÜRKİYE - AB TİCARET VERİLERİ 🇪🇺</h1>
      
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <input
          type="text"
          value={urun}
          onChange={(e) => setUrun(e.target.value)}
          placeholder="Ürün adı veya HS kodu (Örn: Otomotiv, 8703)"
          style={{ flex: 1, padding: '10px' }}
        />
        <button 
          onClick={ara}
          style={{ background: '#0070f3', color: 'white', border: 'none', padding: '10px 20px' }}
        >
          VERİLERİ ÇEK
        </button>
      </div>

      {sonuclar && (
        <div style={{ display: 'flex', gap: '30px', marginTop: '40px' }}>
          {/* Türk Firmaları */}
          <div style={{ flex: 1, background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
            <h2>🇹🇷 Türk İhracatçılar</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {sonuclar.turkFirmalari.map((firma, i) => (
                <li key={i} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <strong>{firma.ad}</strong> | {firma.sektor} | İhracat: {firma.ihracat}
                </li>
              ))}
            </ul>
          </div>

          {/* AB Firmaları */}
          <div style={{ flex: 1, background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
            <h2>🇪🇺 AB Partnerleri</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {sonuclar.abPartnerleri.map((firma, i) => (
                <li key={i} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <strong>{firma.country}</strong> | {firma.product} | İthalat: {firma.importValue}€
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
