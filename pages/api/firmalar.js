import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { urun } = req.query;

  // 1. TİM'den Türk firmalarını çek
  // TİM yerine alternatif kaynak
const firmalar = [{
  ad: "Örnek Firma",
  sektor: "Makina",
  ihracat: "1.2M €"
}];


  const firmalar = [];
  $('.exporter-card').each((i, el) => {
    firmalar.push({
      ad: $(el).find('.company-name').text().trim(),
      sektor: $(el).find('.sector').text().trim(),
      ihracat: $(el).find('.export-value').text().trim()
    });
  });

  // 2. Eurostat'tan AB verileri
  const eurostat = await axios.get(
    `https://ec.europa.eu/eurostat/api/trade/partners?product=${urun}&country=TR`
  );

  res.status(200).json({
    turkFirmalari: firmalar,
    abPartnerleri: eurostat.data.partners
  });
}
