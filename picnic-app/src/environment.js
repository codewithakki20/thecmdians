let IS_PROD = true;
const BASE_URL = IS_PROD
  ? "https://thecmdians.vercel.app "
  : "http://localhost:5000";

export default BASE_URL;