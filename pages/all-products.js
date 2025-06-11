import { useState, useEffect } from 'react';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/all-products')
      .then(res => res.json())
      .then(data => {
        // Veriyi düzenle: { code, name, export, import }
        const formattedData = Object.values(data.dataset).map(item => ({
          code: item.product,
          name: item.productName,
          export: item.exportValue,
          import: item.importValue
        }));
        setProducts(formattedData);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>TÜRKİYE TÜM ÜRÜN İTHALAT/İHRACAT VERİLERİ</h1>
      
      {loading ? (
        <p>Veriler yükleniyor...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#333', color: 'white' }}>
              <th style={{ padding: '10px' }}>Ürün Kodu</th>
              <th style={{ padding: '10px' }}>Ürün Adı</th>
              <th style={{ padding: '10px' }}>İhracat (€)</th>
              <th style={{ padding: '10px' }}>İthalat (€)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{product.code}</td>
                <td style={{ padding: '10px' }}>{product.name}</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>
                  {product.export.toLocaleString('tr-TR')}
                </td>
                <td style={{ padding: '10px', textAlign: 'right' }}>
                  {product.import.toLocaleString('tr-TR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
