import { Card, CardContent, Typography,Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

function WorkoutCardLog({ workout }) {
  const navigate = useNavigate();

  return (
    <>
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '210px', width:'300px' }}>
     <CardContent sx={{ flexGrow: 1 }}>
       <Typography variant="h5" component="h2" gutterBottom>
         {workout.title}
       </Typography>
       
       <Typography color="text.secondary" gutterBottom>
         {workout.exercises.length} exercises
       </Typography>

       {/* List first few exercises */}
       <Box sx={{ mt: 2 }}>
         {workout.exercises.slice(0, 3).map((exercise) => (
           <Typography key={exercise.id} variant="body2" color="text.secondary">
             • {exercise.name}
           </Typography>
         ))}
         {workout.exercises.length > 3 && (
           <Typography variant="body2" color="text.secondary">
             And {workout.exercises.length - 3} more...
           </Typography>
         )}
       </Box>
     </CardContent>

     
   </Card>

    
    </>  
    
  );
}

export default WorkoutCardLog;