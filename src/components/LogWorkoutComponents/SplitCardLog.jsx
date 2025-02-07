import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Dumbbell, ClipboardList } from 'lucide-react';
import axios from 'axios';

function SplitCardLog({ split }) {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [workoutCount, setWorkoutCount] = useState(0);
  
  useEffect(() => {
    const fetchWorkoutCount = async () => {
      try {
        const response = await axios.get(`https://gymdiary.onrender.com/api/splits/${split.id}/workouts`);
        setWorkoutCount(response.data.length);
      } catch (err) {
        console.error('Error fetching workouts:', err);
      }
    };

    fetchWorkoutCount();
  }, [split.id]);

  return (
    <>
      <div className="bg-[#2a2a2a] rounded-xl overflow-hidden hover:bg-[#333333] transition-all duration-300 h-full">
        {/* Image Container */}
        <div className="h-48 relative overflow-hidden">
          <img 
            src="https://res.cloudinary.com/dh0ypvr7a/image/upload/v1738842903/gym_m3bpea.jpg" 
            alt="split"
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="text-blue-500" size={20} />
            <h3 className="text-xl font-bold text-white">{split.name}</h3>
          </div>

          <div className="space-y-2 mb-6">
            <p className="text-gray-400 text-sm">
              Click to manage workouts for this split
            </p>
            <p className="text-blue-500 font-medium">
              {workoutCount} {workoutCount === 1 ? 'workout' : 'workouts'}
            </p>
          </div>

         
        </div>
      </div>

      
    </>
  );
}

export default SplitCardLog;