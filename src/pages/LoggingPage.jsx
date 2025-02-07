// pages/LogWorkoutDetailsPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent,
  TextField,
  Button,
  Grid,
  IconButton
} from '@mui/material';
import { Plus, Minus, ArrowLeft, Dumbbell } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function LoggingPage() {
  const { splitId } = useParams();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [exerciseLogs, setExerciseLogs] = useState({});
const navigate = useNavigate();
    const images=[
        "https://res.cloudinary.com/dh0ypvr7a/image/upload/v1738857929/Be_Better_nmkywq.jpg",
        "https://res.cloudinary.com/dh0ypvr7a/image/upload/v1738857865/era_bplxjl.jpg",
        "https://res.cloudinary.com/dh0ypvr7a/image/upload/v1738857768/download_hgqpza.jpg",
        "https://res.cloudinary.com/dh0ypvr7a/image/upload/v1738858365/can_rlpysa.jpg",
        "https://res.cloudinary.com/dh0ypvr7a/image/upload/v1738857476/Just_a_quick_reminder_for_you_toftyk.jpg"
    ]

  useEffect(() => {
    fetchWorkouts();
  }, [splitId]);

function randompic() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
};
const usedImages = new Set();

function randompic() {
    if (usedImages.size === images.length) {
        usedImages.clear();
    }
    
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * images.length);
    } while (usedImages.has(randomIndex));
    
    usedImages.add(randomIndex);
    return images[randomIndex];
}
  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(`https://gymdiary.onrender.com/api/splits/${splitId}/workouts`);
      setWorkouts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(workout);
    // Initialize exercise logs
    const initialLogs = {};
    workout.exercises.forEach(exercise => {
      initialLogs[exercise.id] = [{ weight: '', reps: '' }];
    });
    setExerciseLogs(initialLogs);
  };

  const addSet = (exerciseId) => {
    setExerciseLogs(prev => ({
      ...prev,
      [exerciseId]: [...prev[exerciseId], { weight: '', reps: '' }]
    }));
  };

  const removeSet = (exerciseId, setIndex) => {
    setExerciseLogs(prev => ({
      ...prev,
      [exerciseId]: prev[exerciseId].filter((_, index) => index !== setIndex)
    }));
  };

  const updateSet = (exerciseId, setIndex, field, value) => {
    setExerciseLogs(prev => ({
      ...prev,
      [exerciseId]: prev[exerciseId].map((set, index) => 
        index === setIndex ? { ...set, [field]: value } : set
      )
    }));
  };

  const handleSubmitLog = async () => {
    try {
      const logData = {
        exerciseLogs: Object.entries(exerciseLogs).map(([exerciseId, sets]) => ({
          exercise: {
            id: exerciseId
          },
          sets: sets.map((set, index) => ({
            setNumber: index + 1,
            reps: parseInt(set.reps),
            weight: parseFloat(set.weight)
          }))
        }))
      };

      await axios.post(`https://gymdiary.onrender.com/api/workouts/${selectedWorkout.id}/logs`, logData);
      
      // Show success message and navigate
      toast.success('Workout logged successfully!', {
        duration: 3000,
        style: {
          background: '#2a2a2a',
          color: '#fff',
          border: '1px solid #333'
        }
      });
      
      // Navigate after a short delay
      setTimeout(() => {
        navigate('/log-workout');
      }, 1500);

    } catch (err) {
      console.error('Error logging workout:', err);
      toast.error('Failed to log workout. Please try again.', {
        duration: 4000,
        style: {
          background: '#2a2a2a',
          color: '#fff',
          border: '1px solid #333'
        }
      });
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    
    <div className="min-h-screen bg-[#1a1a1a] text-white px-4 py-8">
    <Toaster position="top-right" />
      {!selectedWorkout ? (
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Select Your Workout</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                onClick={() => handleWorkoutSelect(workout)}
                className="bg-[#2a2a2a] rounded-xl hover:bg-[#333333] transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                {/* Image Container */}
                <div className="h-48 bg-[#333333] relative overflow-hidden">
                  <img 
                    src={randompic()} 
                    alt="workout"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] to-transparent" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Dumbbell className="text-blue-500" size={20} />
                    <h3 className="text-xl font-bold text-white">{workout.title}</h3>
                  </div>
                  <p className="text-gray-400">{workout.exercises.length} exercises</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => setSelectedWorkout(null)}
              className="mr-4 p-2 hover:bg-[#2a2a2a] rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-white">{selectedWorkout.title}</h1>
          </div>

          {selectedWorkout.exercises.map((exercise) => (
            <div key={exercise.id} className="bg-[#2a2a2a] rounded-xl mb-6 p-6">
              <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                <Dumbbell className="text-blue-500" size={20} />
                {exercise.name}
              </h2>
              
              {exerciseLogs[exercise.id].map((set, setIndex) => (
                <div 
                  key={setIndex}
                  className="flex items-center gap-4 mb-4"
                >
                  <span className="text-gray-400 font-medium w-20">Set {setIndex + 1}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="0"
                      value={set.weight}
                      onChange={(e) => updateSet(exercise.id, setIndex, 'weight', e.target.value)}
                      className="w-24 px-4 py-2 bg-[#333333] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white"
                    />
                    <span className="text-gray-400">kg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="0"
                      value={set.reps}
                      onChange={(e) => updateSet(exercise.id, setIndex, 'reps', e.target.value)}
                      className="w-24 px-4 py-2 bg-[#333333] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white"
                    />
                    <span className="text-gray-400">reps</span>
                  </div>
                  <button 
                    onClick={() => removeSet(exercise.id, setIndex)}
                    disabled={exerciseLogs[exercise.id].length === 1}
                    className={`p-2 rounded-full ${
                      exerciseLogs[exercise.id].length === 1 
                        ? 'text-gray-600' 
                        : 'text-red-500 hover:bg-[#333333]'
                    }`}
                  >
                    <Minus size={20} />
                  </button>
                </div>
              ))}
              
              <button 
                onClick={() => addSet(exercise.id)}
                className="flex items-center text-blue-500 hover:text-blue-400 font-medium mt-4 px-4 py-2 rounded-lg hover:bg-[#333333] transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Add Set
              </button>
            </div>
          ))}
          
          <div className="mt-8 flex gap-4">
            <button 
              onClick={() => setSelectedWorkout(null)}
              className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-[#2a2a2a] font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmitLog}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Complete Workout
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default LoggingPage;