// pages/WorkoutsPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../index.css"
import toast, { Toaster } from 'react-hot-toast';
import { Plus, ArrowLeft } from 'lucide-react';
import CreateWorkoutPopup from '../components/CreateWorkoutPopup';
import WorkoutCard from '../components/WorkoutCard';
import { Trash2 } from 'lucide-react';
import ExerciseSelectModal from '../components/ExerciseSelectModal';

function WorkoutsPage() {
  const { splitId } = useParams();
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [splitName, setSplitName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCreateWorkout, setOpenCreateWorkout] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [openExerciseSelect, setOpenExerciseSelect] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, [splitId]);

  const handleMoveExercise = (index, direction) => {
    const newExercises = [...selectedWorkout.exercises];
    if (direction === 'up' && index > 0) {
      [newExercises[index], newExercises[index - 1]] = [newExercises[index - 1], newExercises[index]];
    } else if (direction === 'down' && index < newExercises.length - 1) {
      [newExercises[index], newExercises[index + 1]] = [newExercises[index + 1], newExercises[index]];
    }
    setSelectedWorkout({
      ...selectedWorkout,
      exercises: newExercises
    });
  };

  const handleRemoveExercise = (exerciseId) => {
    setSelectedWorkout({
      ...selectedWorkout,
      exercises: selectedWorkout.exercises.filter(ex => ex.id !== exerciseId)
    });
  };

  const handleAddExercise = (exercise) => {
    if (!selectedWorkout.exercises.find(ex => ex.id === exercise.id)) {
      setSelectedWorkout({
        ...selectedWorkout,
        exercises: [...selectedWorkout.exercises, {
          id: exercise.id,
          name: exercise.name,
          type: exercise.type,
          muscleGroup: exercise.muscleGroup,
          description: exercise.description
        }]
      });
    }
    setOpenExerciseSelect(false);
  };

  const handleSaveWorkout = async () => {
    try {
      await handleUpdateWorkout({
        id: selectedWorkout.id,
        title: selectedWorkout.title,
        exercises: selectedWorkout.exercises.map(ex => ({
          id: ex.id,
          name: ex.name,
          type: ex.type,
          muscleGroup: ex.muscleGroup,
          description: ex.description
        }))
      });

      // Show success message
      toast.success('Workout updated successfully!', {
        duration: 3000,
        style: {
          background: '#2a2a2a',
          color: '#fff',
          border: '1px solid #333'
        }
      });

      // Navigate after a short delay
      setTimeout(() => {
        setSelectedWorkout(null);
      }, 1500);

    } catch (error) {
      console.error('Error saving workout:', error);
      toast.error('Failed to update workout. Please try again.', {
        duration: 4000,
        style: {
          background: '#2a2a2a',
          color: '#fff',
          border: '1px solid #333'
        }
      });
    }
  };

  const fetchWorkouts = async () => {
    try {
      const [splitResponse, workoutsResponse] = await Promise.all([
        axios.get(`https://gymdiary.onrender.com/api/splits/${splitId}`),
        axios.get(`https://gymdiary.onrender.com/api/splits/${splitId}/workouts`)
      ]);
      setSplitName(splitResponse.data.name);
      setWorkouts(workoutsResponse.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEdit = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleDelete = async (workoutId) => {
    try {
      await axios.delete(`https://gymdiary.onrender.com/api/splits/${splitId}/workouts/${workoutId}`);
      fetchWorkouts();
    } catch (err) {
      console.error('Error deleting Workout:', err);
    }
  };

  const handleUpdateWorkout = async (updatedWorkout) => {
    try {
      await axios.put(`https://gymdiary.onrender.com/api/splits/${splitId}/workouts/${updatedWorkout.id}`, updatedWorkout);
      fetchWorkouts();
      setSelectedWorkout(null);
    } catch (err) {
      console.error('Error updating workout:', err);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white px-4 py-8">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        {!selectedWorkout ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/splits')}
                  className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors"
                >
                  <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold">{splitName}</h1>
              </div>
              
              <button
                onClick={() => setOpenCreateWorkout(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={20} />
                Add Workout
              </button>
            </div>

            {/* No workouts message */}
            {workouts.length === 0 ? (
              <div className="text-center py-16 bg-[#2a2a2a] rounded-xl">
                <h2 className="text-2xl font-bold mb-2">No Workouts Yet</h2>
                <p className="text-gray-400 mb-6">Start by adding your first workout to this split</p>
                <button
                  onClick={() => setOpenCreateWorkout(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors mx-auto"
                >
                  <Plus size={20} />
                  Add Workout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}

            <CreateWorkoutPopup
              open={openCreateWorkout}
              onClose={() => setOpenCreateWorkout(false)}
              splitId={splitId}
            />
          </>
        ) : (
          // Edit Mode
          <div>
            <div className="flex items-center mb-8">
              <button 
                onClick={() => setSelectedWorkout(null)}
                className="mr-4 p-2 hover:bg-[#2a2a2a] rounded-full transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-3xl font-bold">Edit {selectedWorkout.title}</h1>
            </div>
       
            {/* Exercise Selection UI */}
            <div className="bg-[#2a2a2a] rounded-xl p-6">
              <div className="flex flex-col space-y-6">
                {/* Workout Title */}
                <div>
                  <label className="block text-gray-400 mb-2">Workout Title</label>
                  <input
                    type="text"
                    value={selectedWorkout.title}
                    onChange={(e) => setSelectedWorkout({
                      ...selectedWorkout,
                      title: e.target.value
                    })}
                    className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Exercise Selection */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Exercises</h2>
                    <button
                      onClick={() => setOpenExerciseSelect(true)}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
                    >
                      <Plus size={20} />
                      Add Exercise
                    </button>
                  </div>

                  {/* Selected Exercises List */}
                  <div className="space-y-4">
                    {selectedWorkout.exercises.map((exercise, index) => (
                      <div 
                        key={exercise.id}
                        className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400">{index + 1}</span>
                          <span>{exercise.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleMoveExercise(index, 'up')}
                            disabled={index === 0}
                            className={`p-1 rounded ${index === 0 ? 'text-gray-600' : 'text-blue-500 hover:text-blue-400'}`}
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => handleMoveExercise(index, 'down')}
                            disabled={index === selectedWorkout.exercises.length - 1}
                            className={`p-1 rounded ${
                              index === selectedWorkout.exercises.length - 1 
                                ? 'text-gray-600' 
                                : 'text-blue-500 hover:text-blue-400'
                            }`}
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => handleRemoveExercise(exercise.id)}
                            className="p-1 rounded text-red-500 hover:text-red-400"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setSelectedWorkout(null)}
                    className="px-6 py-2 rounded-lg border border-gray-700 hover:bg-[#1a1a1a] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveWorkout}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Exercise Selection Modal */}
            <ExerciseSelectModal
              open={openExerciseSelect}
              onClose={() => setOpenExerciseSelect(false)}
              onSelect={handleAddExercise}
              selectedExercises={selectedWorkout.exercises}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkoutsPage;
