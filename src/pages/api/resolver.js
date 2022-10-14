import axios from "axios";

export default async function handler(req, res) {
  const { method, query } = req;
  const url = query.url;
  const config = {
    method,
    url,
  };

  try {
    const response = await axios(config);
    res.status(200).json(response.data);
  } catch (error) {
    const { response } = error;
    res.status(response?.status || 500).json(response?.data);
  }
}
