export const isValidNumericInput = (e) => {
   e.ctrlKey && e.key === "a" && e.target.select();

   if ((e.key >= "0" && e.key <= "9") ||
      e.key === "Backspace" || e.key === "Delete" ||
      e.key === "Tab" || e.key === "Enter" ||
      e.key === "ArrowUp" || e.key === "ArrowDown" ||
      e.key === "ArrowRight" || e.key === "ArrowLeft"
   ) {
      return true;
   }
   return e.preventDefault();
}