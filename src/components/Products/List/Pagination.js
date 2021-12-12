import React from "react";
import styles from "./Pagination.module.css";

const Pagination = (props) => {
   const getPages = () => {
      const result = [];
      for (let i = 0; i < props.total; i++) {
         let page = i + 1;
         result.push(
            <a
               onClick={() => props.onChange(page)}
               className={`page ${props.page === page ? "active" : null}`}
            >
               {page}
            </a>
         );
      }
      return result;
   };

   return (
      <div>
         <div>{getPages()}</div>
      </div>
   );
};

export default Pagination;
