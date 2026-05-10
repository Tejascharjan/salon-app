import {ThemeProvider} from "@mui/material/styles";
import greenTheme from "./theme/greenTheme";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import CustomerRoutes from "./Routes/CustomerRoutes";
import SalonDashboard from "./Salon/SalonDashboard";
import Auth from "./Auth/Auth";
import BecomePartner from "./Salon/BecomePartner/BecomePartner";

function App() {
     return (
          <ThemeProvider theme={greenTheme}>
               <Routes>
                    <Route path='/salon-dashboard/*' element={<SalonDashboard />} />
                    <Route path='/register' element={<Auth />} />
                    <Route path='/login' element={<Auth />} />
                    <Route path='/become-partner' element={<BecomePartner />} />
                    <Route path='*' element={<CustomerRoutes />} />
               </Routes>
          </ThemeProvider>
     );
}

export default App;
