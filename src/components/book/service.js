import axios from "axios"
import { BOOK_API_PATH } from "../../config/api-paths";
import { useAuth } from "../../hooks/useAuth"

 export const getBooks  = async (filter) => 
    {   
       return await axios.get(BOOK_API_PATH.book)
        .then(data => data.data)
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }


