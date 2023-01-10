const base_url = 'http://localhost:8080/api'

export const API_PATHS = {
  login: `${base_url}/user/login`,
  signup: `${base_url}/user/signup`,
  reactComment: `${base_url}/user/react-comment`,
  likedComment: `${base_url}/user/liked-comment`,
  updateProfile:`${base_url}/user/update-profile`,
  profile:`${base_url}/user/profile`

};

export const BOOK_API_PATH = {
  book: `${base_url}/book`,
  compare: `${base_url}/book/compare`,
  rating: `${base_url}/book/rating`,
  rated: `${base_url}/book/is-rated`
}

export const COMMENT_API_PATH = {
  comment: `${base_url}/comment`,

}

