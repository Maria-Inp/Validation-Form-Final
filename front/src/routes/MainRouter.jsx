import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Welcome from "../components/pages/welcome/Welcome";
import Users from "../components/templates/users/Users";
import UserForm from "../components/templates/users/UserForm";
import NotFound from "../components/pages/404/NotFound";

const MainRouter = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/users">
               <Route index element={<Users />} />
               <Route path="add" element={<UserForm />} />
            </Route>
            <Route path="*" element={<NotFound />} />
         </Routes>
      </BrowserRouter>
   );
};

export default MainRouter;
