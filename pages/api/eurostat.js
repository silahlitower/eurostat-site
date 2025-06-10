export default async function handler(req, res) {
  const response = await fetch("https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nama_10_gdp?format=json&lang=en");
  const data = await response.json();
  res.status(200).json(data);
}
