export default async function handler(req, res) {
  const response = await fetch(
    "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/DS-045409?product=ALL&partner=TR&format=json"
  );
  const data = await response.json();
  res.status(200).json(data);
}
