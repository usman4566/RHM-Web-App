// import React, { useState } from 'react';
// import { Button, Grid, Typography, TextField } from '@mui/material';
// import { DatePicker } from '@mui/lab'

// const Calendar = () => {
//   const currentDate = new Date();
//   const [selectedDate, setSelectedDate] = useState(currentDate);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const getCalendarDays = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDayOfMonth = new Date(year, month, 1);
//     const lastDayOfMonth = new Date(year, month + 1, 0);
//     const prevMonthDays = firstDayOfMonth.getDay();
//     const nextMonthDays = 6 - lastDayOfMonth.getDay();

//     const days = [];
//     const startDate = new Date(year, month, 1 - prevMonthDays);

//     for (let i = 0; i < prevMonthDays; i++) {
//       days.push({
//         date: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i),
//         isInCurrentMonth: false,
//       });
//     }

//     for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
//       days.push({
//         date: new Date(year, month, i),
//         isInCurrentMonth: true,
//       });
//     }

//     for (let i = 1; i <= nextMonthDays; i++) {
//       days.push({
//         date: new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDayOfMonth.getDate() + i),
//         isInCurrentMonth: false,
//       });
//     }

//     return days;
//   };

//   const renderCalendarDays = (days) => {
//     return days.map((day) => {
//       const dayClasses = day.isInCurrentMonth ? 'calendar-day' : 'calendar-day other-month';

//       return (
//         <Grid item key={day.date.toISOString()}>
//           <Button className={dayClasses} onClick={() => handleDateChange(day.date)}>
//             {day.date.getDate()}
//           </Button>
//         </Grid>
//       );
//     });
//   };

//   const calendarDays = getCalendarDays(selectedDate);

//   return (
//     <div>
//       <Typography variant="h6" gutterBottom>
//         Current Year: {currentDate.getFullYear()}
//       </Typography>
//       <DatePicker
//         label="Select a date"
//         value={selectedDate}
//         onChange={handleDateChange}
//         renderInput={(params) => <TextField {...params} />}
//       />
//       <Grid container spacing={1} justifyContent="center">
//         {renderCalendarDays(calendarDays)}
//       </Grid>
//       <Button variant="contained" color="primary" onClick={() => handleDateChange(currentDate)}>
//         Go to Today
//       </Button>
//     </div>
//   );
// };

// export default Calendar;
