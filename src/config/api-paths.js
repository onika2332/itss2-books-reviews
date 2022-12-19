
const base_url = process.env.NODE_ENV === 'production' ?
    'http://itss-ecs-loadbalancer-1714898168.ap-southeast-1.elb.amazonaws.com/api':
    'localhost:8080'

export const API_PATHS = {
  login: `${base_url}/user/login`,
  signup: `${base_url}/user/signup`,

};

export const BOOK_API_PATH = {
  book: `${base_url}/book`,
  compare:`${base_url}/book/compare`
}

export const COMMENT_API_PATH = {
  comment: `${base_url}/comment`,

}