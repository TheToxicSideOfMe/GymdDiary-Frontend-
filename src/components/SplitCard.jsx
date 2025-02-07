import { useState, useEffect } from 'react';
import { Dumbbell, Trash2, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeletePopup from './DeletePopup';
import axios from 'axios';

function SplitCard({ split, onDelete }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [workoutCount, setWorkoutCount] = useState(0);
  const navigate = useNavigate();

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

          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <button 
              onClick={() => navigate(`/splits/${split.id}/workouts`)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
            >
              <ClipboardList size={18} />
              <span>View Workouts</span>
            </button>
            
            <button 
              onClick={() => setOpenDelete(true)}
              className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <DeletePopup 
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          onDelete(split.id);
          setOpenDelete(false);
        }}
        itemName={split.name}
      />
    </>
  );
}

export default SplitCard;