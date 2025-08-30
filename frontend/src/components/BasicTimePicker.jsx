import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';

export default function BasicTimePicker({ label, time, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={time ? dayjs(`2001-01-01T${time}`) : null}
        onChange={onChange}
        ampm={false}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}