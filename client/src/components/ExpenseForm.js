// import Autocomplete from "@mui/material/Autocomplete";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
// import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { useSelector } from "react-redux";

const InitialForm = {
  empName: '',
  empId: '',
  projName: '',
  projId: '',
  billProof: '',
  status: 'InProcess',
  amount: 0,
  description: '',
  // date: new Date(),
  date: null,
};

export default function ExpenseForm({ fetchExpenses, editTransaction }) {
  // const { categories } = useSelector((state) => state.auth.user);
  const token = Cookies.get('token');
  const [form, setForm] = useState(InitialForm);

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    editTransaction.amount === undefined ? create() : update();
  }

  function reload(res) {
    if (res.ok) {
      setForm(InitialForm);
      fetchExpenses();
    }
  }

  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/expense`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    reload(res);
  }

  async function update() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/expense/${editTransaction._id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(form),
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    reload(res);
  }

  // function getCategoryNameById() {
  //   return (
  //     categories.find((category) => category._id === form.category_id) ?? ""
  //   );
  // }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add New Expense</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex' }}>
          {/* <Autocomplete
            value={form.type}
            onChange={(event, newValue) => {
              setForm({ ...form, type: newValue });
            }}
            id="type"
            options={types}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Type" />
            )}
          /> */}
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Employee Name"
            size="small"
            name="empName"
            variant="outlined"
            value={form.empName}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Employee Id"
            size="small"
            name="empId"
            variant="outlined"
            value={form.empId}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Project Name"
            size="small"
            name="projName"
            variant="outlined"
            value={form.projName}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Project Id"
            size="small"
            name="projId"
            variant="outlined"
            value={form.projId}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Bill Proofs"
            size="small"
            name="billProof"
            variant="outlined"
            value={form.billProof}
            onChange={handleChange}
          />

          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Amount"
            type="number"
            size="small"
            name="amount"
            variant="outlined"
            value={form.amount}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Description"
            size="small"
            name="description"
            variant="outlined"
            value={form.description}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Expense Date"
              onChange={handleDate}
              value={form.date}
              slotProps={{
                textField: {
                  // helperText: 'MM/DD/YYYY',
                  size: 'small',
                  sx: { marginRight: 5 },
                },
              }}
            />
            {/* <DesktopDatePicker
              label="Transaction Date"
              inputFormat="MM/DD/YYYY"
              value={form.date}
              onChange={handleDate}
              // renderInput={(params) => (
              //   <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              // )}
              slotProps={{ textField: { variant: 'outlined' } }}
            /> */}
          </LocalizationProvider>

          {/* <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({ ...form, category_id: newValue._id });
            }}
            id="controllable-states-demo"
            options={categories}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Category" />
            )}
          /> */}

          {editTransaction.amount !== undefined && (
            <Button type="submit" variant="secondary">
              Update
            </Button>
          )}

          {editTransaction.amount === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
