const base_url = 'web:8080'

export const API_PATHS = {
  login: `${base_url}/user/login`,
  signup: `${base_url}/user/signup`,

};

export const BOOK_API_PATH = {
  book: `${base_url}/book`,
  compare:`${base_url}/book/compare`,
  rating: `${base_url}/book/rating`,
  rated: `${base_url}/book/is-rated`
}

export const COMMENT_API_PATH = {
  comment: `${base_url}/comment`,

}