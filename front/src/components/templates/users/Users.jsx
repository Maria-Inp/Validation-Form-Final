import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';

import "./styles/users.scss";
import left from "./images/left.svg";
import right from "./images/right.svg";

import Table from "../../modules/Table";

import { getUsersService } from '../../../services/userService';
import { showErrorMessage } from '../../../services/httpService';

import { columns } from "../../../data/userTable";

const Users = () => {

   const [search, setSearch] = useState("");
   const [users, setUsers] = useState([]);
   const [offset, setOffset] = useState(1);
   const [countUsers, setCountUsers] = useState(0);

   const initialMount = useRef(true);

   useEffect(() => {
      getUsers();
   }, []);
   useEffect(() => {
      const myTimeOut = setTimeout(() => {
         if (initialMount.current) {
            initialMount.current = false;
         } else {
            getUsers(search.trim(), offset);
         }
      }, 700);

      return () => clearTimeout(myTimeOut);
   }, [search, offset]);

   const getUsers = async (q = "", offset = 1) => {
      const result = await getUsersService(q, offset);

      if (result.error) {
         showErrorMessage(result);
      } else {
         setUsers(result.data.users);
         setCountUsers(result.data.count);
      }
   };
   const handelNextPage = () => {
      offset < Math.ceil(countUsers / 5) &&
         setOffset(prev => prev + 1);
   };
   const handelPrevPage = () => {
      offset > 1 &&
         setOffset(prev => prev - 1);
   };

   return (
      <div className="users__container">
         <Helmet>
            <title>Users</title>
         </Helmet>

         <input
            type="text"
            className="users__input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی کاربر (بر اساس نام)"
         />
         
         <Table columns={columns} data={users} />

         <div className="pagination">
            <img src={right} className="prev" onClick={handelPrevPage} />
            <span>{Math.ceil(countUsers / 5)} از {offset}</span>
            <img src={left} className="next" onClick={handelNextPage} />
         </div>
      </div>
   );
};

export default Users;
