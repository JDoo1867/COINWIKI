export default async function handler(req, res) {
  // CORS 허용
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { module, action, address, contractaddress, page, offset, sort } = req.query;
  const apiKey = process.env.ETHERSCAN_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const params = new URLSearchParams({
    module, action,
    ...(address && { address }),
    ...(contractaddress && { contractaddress }),
    page: page || '1',
    offset: offset || '5',
    sort: sort || 'desc',
    apikey: apiKey
  });

  try {
    const r = await fetch(`https://api.etherscan.io/api?${params}`);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
