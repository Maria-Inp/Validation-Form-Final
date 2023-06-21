import { useState } from 'react';
import { Helmet } from 'react-helmet';

import "./styles/userForm.scss";

import { addUserService } from '../../../services/userService';
import { showErrorMessage } from '../../../services/httpService';
import { errorMessage, successMessage } from '../../../utils/messages';
import { isValidNumericInput } from '../../../utils/controlInput';
import {
   isEmailValid,
   isPasswordSecure,
   correctCharacters,
   isNumber
} from '../../../utils/validation';

const UserForm = () => {

   const [fullName, setFullName] = useState("");
   const [studentNumber, setStudentNumber] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [repeatPass, setRepeatPass] = useState("");
   // const [address, setAddress] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const isBetween = (length, min, max) => length < min || length > max ? false : true;

   const handelSubmitForm = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      if (validateForm()) {
         const result = await addUserService({
            fullName, studentNumber, email, password, repeatPass
         });

         if (result.error || result.data.error) {
            showErrorMessage(result);
         } else {
            successMessage("کاربر موردنظر باموفقیت اضافه شد :)");
         }
      }

      setIsLoading(false);
   };

   const validateForm = () => {
      
      if(!email.trim() || !password.trim() || !repeatPass.trim() || !studentNumber.trim() || !fullName.trim()) {
         errorMessage("هیچ فیلدی نمیتواند خالی باشد!");
         return false;
      }

      // email
      if (!isEmailValid(correctCharacters(email))) {
         errorMessage("ایمیل وارد شده معتبر نمی باشد");
         return false;
      }
      
      // password
      if (!isPasswordSecure(password)) {
         errorMessage("رمز عبور میبایست حداقل دارای 8 کاراکتر شامل حداقل یک حرف کوچک، حداقل یک حرف بزرگ، حداقل یک عدد و یک کاراکتر خاص از (!@#$%^&*) باشد");
         return false;
      }

      // repeat password
      if (password !== repeatPass) {
         errorMessage("رمز عبور تطابق ندارد");
         return false;
      }
      
      // student number
      if (!isNumber(correctCharacters(studentNumber))) {
         errorMessage("شماره دانشجویی نامعتبر");
         return false;
      }

      // username
      if (!isBetween(correctCharacters(fullName).length, 3, 25)) {
         errorMessage("طول نام کاربری باید بین 3 و 25 کاراکتر لاتین باشد");
         return false;
      }
      
      return true;
   };

   return (
      <div className="form__container">
         <Helmet>
            <title>Add User</title>
         </Helmet>

         <form className="form" onSubmit={handelSubmitForm}>
            <div className="col-3 input-effect">
               <input
                  type="text"
                  className="effect-16"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
               />
               <label>نام کاربری:</label>
               <span className="focus-border"></span>
            </div>
            <div className="col-3 input-effect">
               <input
                  type="text"
                  className="effect-16"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  onKeyDown={(e) => isValidNumericInput(e)}
               />
               <label>شماره دانشجویی :</label>
               <span className="focus-border"></span>
            </div>
            <div className="col-3 input-effect">
               <input
                  type="email"
                  className="effect-16"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <label>ایمیل :</label>
               <span className="focus-border"></span>
            </div>
            <div className="col-3 input-effect">
               <input
                  type="password"
                  className="effect-16"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <label>رمز عبور:</label>
               <span className="focus-border"></span>
            </div>
            <div className="col-3 input-effect">
               <input
                  type="password"
                  className="effect-16"
                  value={repeatPass}
                  onChange={(e) => setRepeatPass(e.target.value)}
               />
               <label>تکرار رمز عبور:</label>
               <span className="focus-border"></span>
            </div>
            <button type="submit" className="form__btn">
               {isLoading ? <span className="loader"></span> : "ثبت"}
            </button>
         </form>
      </div>
   );
};

export default UserForm;

