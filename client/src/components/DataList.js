import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import IconButton from '@mui/material/IconButton';
import Cookies from 'js-cookie';

// function formatDate(date) {
//   return dayjs(date).format('DD MMM, YYYY');
// }

// async function remove(_id) {
//   const token = Cookies.get('token');
//   if (!window.confirm('Are you sure')) return;
//   const res = await fetch(`${process.env.REACT_APP_API_URL}/expense/${_id}`, {
//     method: 'DELETE',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (res.ok) {
//     fetchExpenses();
//   }
// }

// const columns = [
//   // { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'empName', headerName: 'Employee Name', width: 130 },
//   { field: 'empId', headerName: 'Employee Id', width: 130 },
//   { field: 'projName', headerName: 'Project Name', width: 130 },
//   { field: 'projId', headerName: 'Project Id', width: 130 },
//   { field: 'billProof', headerName: 'Bill Proofs', width: 130 },
//   { field: 'status', headerName: 'Status', width: 130 },
//   {
//     field: 'amount',
//     headerName: 'Amount',
//     type: 'number',
//     width: 90,
//   },
//   { field: 'description', headerName: 'Description', width: 130 },
//   {
//     field: 'date',
//     headerName: 'Date',
//     width: 130,
//     options: {
//       customBodyRenderLite: () => {
//         return (
//           <IconButton
//             color="warning"
//             component="label"
//             onClick={(row) => remove(row._id)}
//           >
//             <DeleteSharpIcon />
//           </IconButton>
//         );
//       },
//     },
//   },
//   { field: '', headerName: 'Action', width: 130 },

//   // {
//   //   field: 'fullName',
//   //   headerName: 'Full name',
//   //   description: 'This column has a value getter and is not sortable.',
//   //   sortable: false,
//   //   width: 160,
//   //   valueGetter: (params) =>
//   //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   // },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function DataTable({ data, fetchExpenses }) {
  function formatDate(date) {
    return dayjs(date).format('DD MMM, YYYY');
  }

  async function remove(_id) {
    const token = Cookies.get('token');
    if (!window.confirm('Are you sure')) return;
    const res = await fetch(`${process.env.REACT_APP_API_URL}/expense/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      fetchExpenses();
    }
  }

  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'empName', headerName: 'Employee Name', width: 130 },
    { field: 'empId', headerName: 'Employee Id', width: 130 },
    { field: 'projName', headerName: 'Project Name', width: 130 },
    { field: 'projId', headerName: 'Project Id', width: 130 },
    { field: 'billProof', headerName: 'Bill Proofs', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 90,
    },
    { field: 'description', headerName: 'Description', width: 130 },
    {
      field: 'date',
      headerName: 'Date',
      width: 130,
      // options: {
      //   customBodyRenderLite: (row) => {
      //     // return formatDate(row.date);
      //     return 'test';
      //   },
      // },
    },
    // {
    //   field: '',
    //   headerName: 'Action',
    //   width: 130,
    //   options: {
    //     customBodyRenderLite: (row) => {
    //       return (
    //         <IconButton
    //           color="warning"
    //           component="label"
    //           onClick={(row) => remove(row._id)}
    //         >
    //           <DeleteSharpIcon />
    //         </IconButton>
    //       );
    //     },
    //   },
    // },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
}
