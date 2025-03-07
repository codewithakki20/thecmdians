let IS_PROD = true;
const BASE_URL = IS_PROD
  ? "https://thecmdians-46v9.vercel.app "
  : "http://localhost:5000";

export default BASE_URL;