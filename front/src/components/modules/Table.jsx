import { useTable } from "react-table";
import "./styles/table.scss";

const Table = ({ columns, data }) => {

   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
   } = useTable({ columns, data });

   return (
      <table {...getTableProps()}>
         <thead>
            {headerGroups.map(headerGroup => (
               <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                     <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
               </tr>
            ))}
         </thead>
         <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
               prepareRow(row);
               return (
                  <tr key={index} {...row.getRowProps()}>
                     {row.cells.map(cell =>
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                     )}
                  </tr>
               );
            })}
         </tbody>
      </table>
   );
};

export default Table;
