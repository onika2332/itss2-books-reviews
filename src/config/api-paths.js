export const base_url = "http://localhost:8000/api";

export const API_PATHS = {
  login: `${base_url}/user/login`,
  signup: `${base_url}/user/signup`,
  
};

export const BOOK_API_PATH = {
  book: `${base_url}/book`,
  compare:`${base_url}/book/compare`,
  rating: `${base_url}/book/rating`,
}

export const COMMENT_API_PATH = {
  comment: `${base_url}/comment`,
  
}