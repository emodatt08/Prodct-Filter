import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,
  Routes,
  Route} from "react-router-dom";

import Products from "./Components/Products/Products";
import { Provider } from "react-redux";
import store from "./store";


function App() {
  return (
    <div className="App">
            <div className="container mt-3">
              <Provider store={store}>  
                <Routes>
                  <Route path="/" element={<Products/>} />
                </Routes>
              </Provider>
            </div>
    </div>
  );
}
export default App;