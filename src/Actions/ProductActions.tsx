
import { ThunkAction,ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { GET_PRODUCT_REQUEST, GET_PRODUCT_FAILURE, GET_PRODUCT_SUCCESS} from '../Constants/ProductConstants'
import { RootState } from '../store'
import ProductsService from '../Services/ProductsService'
import SearchProducts from '../Types/searchProducts'


/**
 * Get Products
 * @returns {Promise<void>}
 */
export const getProducts = (filter:boolean, filterArray:SearchProducts|null): ThunkAction<Promise<void>,RootState,unknown,AnyAction> => 
    async (dispatch: ThunkDispatch<RootState,unknown,AnyAction>): Promise<void> => {
    try {
        dispatch({ 

            type: GET_PRODUCT_REQUEST 
        
        })

        const response = await ProductsService.getAll();
        
            if (response) {
                const searchData = searchArray(response, filterArray);
                console.log("filtered",searchData)
                if(searchData){
                    dispatch({
                        type: GET_PRODUCT_SUCCESS,
                        payload: searchData
                    })
                }else{
                    dispatch({
                        type: GET_PRODUCT_SUCCESS,
                        payload: response
                    })
                }
               

            } 
       
    } catch (error) {
        dispatch({
            type: GET_PRODUCT_FAILURE,
            payload: error
        })

    }
    

}


function searchArray(data, input) {
    let filtered : any = [];
    let returnData : any = {};
    if (input &&  typeof input === 'object' &&
    !Array.isArray(input)) {
       
        const searchParam = input;
        console.log(searchParam);
        for (let search in searchParam) {
            if(Array.isArray(searchParam[search]) && searchParam[search]?.length !== 0){
                console.log("Array coming Here", searchParam[search]?.length !== 0);
                searchParam[search].map((arrayData) => {
                    returnData =  data.filter((arrayEL) => {
                        return Object.values(arrayEL).some((val) =>
                          String(val).toLowerCase().includes(arrayData.toLowerCase())
                        );
                    });
                    console.log("after filtered", returnData[0]);
                    filtered.push(returnData[0])
                })

                if(filtered.length >= 0 && filtered.length <= data.length){
                    console.log("get here")
                    return filtered.filter((v,i,a)=>a.findIndex(v2=>['itemNumber'].every(k=>v2[k] ===v[k]))===i);
                }
            }
            
            if(searchParam[search] !== "") {                
                const splitSearch = searchParam[search].split(',');
                splitSearch.map((searchArray) => {
                  returnData = data.filter((el) => {
                    console.log("val", el, searchArray)
                      return Object.values(el).some((val) =>
                     
                        String(val).toLowerCase().includes(searchArray.toLowerCase())
                      );
                    }); 
                    console.log("pre filtered", returnData[0]);
                    filtered.push(returnData[0])
                })
               console.log("break", filtered)
            }   
            console.log("before here", filtered)
            if(filtered.length >= 1 && filtered.length <= data.length){
                console.log("get here")
                return filtered.filter((v,i,a)=>a.findIndex(v2=>['itemNumber'].every(k=>v2[k] ===v[k]))===i);
            }
        }
       
      }
    }




