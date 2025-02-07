// components/WorkoutCard.jsx
import { Card, CardContent, CardActions, Typography, Button,Box } from '@mui/material';
import { Dumbbell, Trash2, ClipboardList, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DeleteWorkoutPopup from './DeleteWorkoutPopup';

function WorkoutCard({ workout, onDelete, onEdit}) {
 const navigate = useNavigate();
 const [openDelete, setOpenDelete] = useState(false);
 const images=[
  "https://res.cloudinary.com/dh0ypvr7a/image/upload/v1738857929/Be_Better_nmkywq.jpg",
  "https://res.cloudinary.com/dh0ypvr7a/image/upload/v1738857865/era_bplxjl.jpg",
  "https://res.cloudinary.com/dh0ypvr7a/image/upload/v1738857768/download_hgqpza.jpg",
  "https://res.cloudinary.com/dh0ypvr7a/image/upload/v1738858365/can_rlpysa.jpg",
  "https://res.cloudinary.com/dh0ypvr7a/image/upload/v1738857476/Just_a_quick_reminder_for_you_toftyk.jpg"
]

const getRandomImage = (() => {
  const usedImages = new Set();
  return () => {
    if (usedImages.size >= images.length) {
      usedImages.clear();
    }
    let image;
    do {
      image = images[Math.floor(Math.random() * images.length)];
    } while (usedImages.has(image));
    usedImages.add(image);
    return image;
  };
})();

const image = getRandomImage();
 
 return (
  <>
   <div className="bg-[#2a2a2a] rounded-xl overflow-hidden hover:bg-[#333333] transition-all duration-300 h-full">
        <div className="h-48 relative overflow-hidden">
          <img 
            src={image} 
            alt="workout"
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="text-blue-500" size={20} />
            <h3 className="text-xl font-bold text-white">{workout.title}</h3>
          </div>

          <div className="space-y-2 mb-6">
            {workout.exercises.slice(0, 3).map((exercise) => (
              <p key={exercise.id} className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                {exercise.name}
              </p>
            ))}
            {workout.exercises.length > 3 && (
              <p className="text-gray-500 text-sm italic">
                +{workout.exercises.length - 3} more exercises
              </p>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <button 
              onClick={() => onEdit(workout)} // Changed to edit function
              className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
            >
              <Edit2 size={18} />
              <span>Edit Workout</span>
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

      <DeleteWorkoutPopup
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          onDelete(workout.id);
          setOpenDelete(false);
        }}
        itemName={workout.title}
      />
  </>
);

}

export default WorkoutCard;