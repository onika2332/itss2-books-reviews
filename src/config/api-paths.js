const base_url = '/api'

export const API_PATHS = {
    login: `${base_url}/user/login`,
    signup: `${base_url}/user/signup`,
    reactComment: `${base_url}/user/react-comment`,
    likedComment: `${base_url}/user/liked-comment`,
    updateProfile: `${base_url}/user/update-profile`,
    favorite: `${base_url}/user/favorite`,
    profile: `${base_url}/user/profile`

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

