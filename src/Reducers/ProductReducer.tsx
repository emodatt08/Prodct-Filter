
import { GET_PRODUCT_REQUEST, GET_PRODUCT_FAILURE, GET_PRODUCT_SUCCESS} from '../Constants/ProductConstants'
import IProducts from '../Types/Iproducts'

export interface ProductState{
    isLoading?: boolean,
    error?: boolean,
    productData?: IProducts[],
    products: [],
}

interface Action{
    type: string,
    payload?: string
}

export const ProductReducer = (state:ProductState = {products: []},  action: Action) => {
    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {
                isLoading: true
            }
        case GET_PRODUCT_SUCCESS:
            return {
                isLoading: false,
                productData: action.payload
            }
        case GET_PRODUCT_FAILURE:
            return {
                isLoading: false,
                error: action.payload
            }


        default:
            return state
    }
}
