import { useDispatch, useSelector} from 'react-redux';
import React, { useState } from "react";
import { getProducts } from '../../Actions/ProductActions';
import { ProductState } from '../../Reducers/ProductReducer';
import { RootState } from '../../store';
import IProducts from '../../Types/Iproducts';
import SearchProducts from '../../Types/searchProducts';

export default function () {
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorValue, setErrorValue] = React.useState("");
  const dispatch = useDispatch();
  const {productData} = useSelector<RootState, ProductState>((state) => state.products);
  const [search, setSearch] = useState("");
  const [itemNumber, setItemNumber] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [type, setType] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    console.log(name, value)
    if (name === "search") {
      setSearch(value);
    }
    if (name === "orderNumber") {
      setOrderNumber(value);
    }

    if (name === "itemNumber") {
      setItemNumber(value);
    }

    if(name === "type"){
     // mutate the current Map
     //setType(type.push(value));
     setType(old => [...old, value]);

    }
   
  };

  const checkboxes = [
    {
        name: 'SFO',
        key: 'SFO',
        label: 'SFO',
    },
    {
        name: 'CAO',
        key: 'CAO',
        label: 'CAO',
    },
    {
        name: 'EDF',
        key: 'EDF',
        label: 'EDF',
    }
];

  const filterProductData = (e) => {
    e.preventDefault();
    setIsLoading(false);
    setError(false);
     //Name
     if (itemNumber.length === 0 && type.length === 0) {
      console.log("here");
      setError(true);
      setErrorValue("Item number or type selection cannot be empty");
    }else{
      const searchData = {
        search,
        itemNumber,
        orderNumber,
        type
      }
      console.log("searchData",searchData);
      dispatch<any>(getProducts(false,searchData));
      console.log("searchData",productData);
      setIsLoading(true);
    }
  }

  const resetFields = () => {
    setSearch("");
    setItemNumber("");
    setOrderNumber("");
    setIsLoading(false);
  } 
  return (
    <div>
        {error ? (
                   
                    <div className="alert alert-danger" role="alert">
                      {errorValue}
                    </div>
                  ): ("")}
        <div className="accordion accordion-flush mb-5" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Filter
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">

              <form>
                <div className="form-group">
                <label htmlFor="search">Search</label>
                  <input
                    type="text"
                    style={{width:"250px"}}
                    className="form-control"
                    name="search"
                    value={orderNumber || search}
                    onChange={handleChange} 
                  />
                </div>
                <div className="form-group mt-2">
                <label htmlFor="itemNumber">Item Number</label>
                  <input
                    type="text"
                    style={{width:"250px"}}
                    className="form-control"
                    name="itemNumber"
                    value={itemNumber}
                    onChange={handleChange} 
                  />
                
                  
                 </div>  

                 <div className="form-group mt-2">
                  <label htmlFor="orderNumber">Order Number</label>
                    <input
                      type="text"
                      style={{width:"250px"}}
                      className="form-control"
                      name="orderNumber"
                      value={orderNumber}
                      onChange={handleChange} 
                    />
                 </div>
                 <label className="mt-3" htmlFor="searchType">Choose Type</label>
             

                  {
                      checkboxes.map(item => (
                        <div key={item.key}className="form-group form-check mt-2">
                          <label className="form-check-label" >
                              {item.name}
                              <input className="form-check-input" type="checkbox" value={item.name} name="type"  onChange={handleChange} />
                          </label>
                        </div>
                      ))
                  }

               
                <div className="form-group mt-3 flex-wrap">
                  <button  onClick={filterProductData} className="btn btn-primary btn-large" >
                    <span>Search</span>
                  </button>
                  <button  onClick={resetFields} className="btn btn-primary  mr-3 btn-large" style={{margin:"10px"}} >  <span>Reset</span></button>
                </div>
              </form>
             
              </div>
            </div>
          </div>
        </div>

        {isLoading ? ( 

<table className='table table-striped'>
<thead className='table-dark'>
  <tr>
    <th>Image</th>
    <th>Item Number</th>
    <th>Title</th>
    <th>Type</th>
    <th>Order No</th>
    <th>Type</th>
  </tr>
</thead>
<tbody>
  {productData && productData.map((product: IProducts) => (
    <tr key={product.itemNumber}>
      <td><img style={{height:"50px", width:"50px"}} src={product.img} alt={product.img} /></td>
      <td>{product.itemNumber}</td>
      <td>{product.title}</td>
      <td>{product.type}</td>
      <td>{product.orderNumber}</td>
      <td>{product.type} </td>
    </tr>
  ))}

</tbody>
</table>
         ):("")}
      
    </div>
  )
}
