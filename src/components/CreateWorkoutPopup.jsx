// components/CreateWorkoutPopup.jsx
import { useState, useEffect } from 'react';
import { X, Plus, Search, ChevronDown } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CreateWorkoutPopup({ open, onClose, splitId }) {
  const [title, setTitle] = useState('');
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [muscleFilter, setMuscleFilter] = useState('all');
  const navigate = useNavigate();

  // Fetch available exercises
  useEffect(() => {
    if (open) {
      fetchExercises();
    }
  }, [open]);

  const fetchExercises = async () => {
    try {
      const response = await axios.get('https://gymdiary.onrender.com/api/exercises');
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  // Get unique muscle groups
  const muscleGroups = ['all', ...new Set(exercises.map(ex => ex.muscleGroup))];

  // Filter exercises based on search and muscle group
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = muscleFilter === 'all' || exercise.muscleGroup === muscleFilter;
    return matchesSearch && matchesMuscle;
  });

  const handleExerciseToggle = (exercise) => {
    if (selectedExercises.find(ex => ex.id === exercise.id)) {
      setSelectedExercises(prev => prev.filter(ex => ex.id !== exercise.id));
    } else {
      setSelectedExercises(prev => [...prev, exercise]);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || selectedExercises.length === 0) {
      toast.error('Please provide a title and select at least one exercise');
      return;
    }

    try {
      await axios.post(`https://gymdiary.onrender.com/api/splits/${splitId}/workouts`, {
        title: title.trim(),
        exercises: selectedExercises
      });

      toast.success('Workout created successfully!', {
        duration: 3000,
        style: {
          background: '#2a2a2a',
          color: '#fff',
          border: '1px solid #333'
        }
      });

      // Reset and close
      setTitle('');
      setSelectedExercises([]);
      setSearchTerm('');
      setMuscleFilter('all');
      onClose();

      // Navigate after delay
      setTimeout(() => {
        navigate(`/splits/${splitId}/workouts`);
      }, 1500);

    } catch (error) {
      console.error('Error creating workout:', error);
      toast.error('Failed to create workout. Please try again.', {
        duration: 4000,
        style: {
          background: '#2a2a2a',
          color: '#fff',
          border: '1px solid #333'
        }
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2a2a2a] rounded-xl w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Create New Workout</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Workout Title */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Workout Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Enter workout title"
            />
          </div>

          {/* Exercise Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <select
              value={muscleFilter}
              onChange={(e) => setMuscleFilter(e.target.value)}
              className="bg-[#1a1a1a] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none pr-10 relative"
              style={{ minWidth: '150px' }}
            >
              {muscleGroups.map(group => (
                <option key={group} value={group}>
                  {group === 'all' ? 'All Groups' : group}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Exercises */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Selected Exercises ({selectedExercises.length})</label>
            <div className="flex flex-wrap gap-2">
              {selectedExercises.map(exercise => (
                <span 
                  key={exercise.id}
                  className="bg-blue-500 bg-opacity-20 text-blue-400 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {exercise.name}
                  <button 
                    onClick={() => handleExerciseToggle(exercise)}
                    className="hover:text-blue-300"
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Exercise List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredExercises.map(exercise => (
              <button
                key={exercise.id}
                onClick={() => handleExerciseToggle(exercise)}
                className={`w-full text-left p-4 rounded-lg mb-2 transition-colors ${
                  selectedExercises.find(ex => ex.id === exercise.id)
                    ? 'bg-blue-900 bg-opacity-50'
                    : 'bg-[#1a1a1a] hover:bg-[#333333]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-white">{exercise.name}</h3>
                    <p className="text-sm text-gray-400">{exercise.muscleGroup}</p>
                  </div>
                  {selectedExercises.find(ex => ex.id === exercise.id) && (
                    <span className="text-blue-400">
                      <Plus className="transform rotate-45" size={20} />
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || selectedExercises.length === 0}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Workout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkoutPopup;