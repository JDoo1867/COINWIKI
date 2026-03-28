export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { address } = req.query;
  if (!address) return res.status(400).json({ error: 'address required' });

  try {
    const r = await fetch(`https://blockchain.info/rawaddr/${address}?limit=3`);
    if (!r.ok) return res.status(200).json({ txs: [] });
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({ txs: [] });
  }
}
