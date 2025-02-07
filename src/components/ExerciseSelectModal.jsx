// components/ExerciseSelectModal.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, X } from 'lucide-react';

function ExerciseSelectModal({ open, onClose, onSelect, selectedExercises }) {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const muscleGroups = ['all', ...new Set(exercises.map(ex => ex.muscleGroup))];

    useEffect(() => {
        fetchExercises();
    }, []);

    const fetchExercises = async () => {
        try {
            const response = await axios.get('https://gymdiary.onrender.com/api/exercises');
            setExercises(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching exercises:', err);
            setLoading(false);
        }
    };

    const filteredExercises = exercises.filter(exercise => {
        const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || exercise.muscleGroup === filter;
        return matchesSearch && matchesFilter;
    });

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#2a2a2a] rounded-xl w-full max-w-2xl mx-4">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Select Exercise</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search exercises..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-[#1a1a1a] text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-[#1a1a1a] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        >
                            {muscleGroups.map(group => (
                                <option key={group} value={group}>
                                    {group === 'all' ? 'All Groups' : group}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {filteredExercises.map(exercise => (
                            <button
                                key={exercise.id}
                                onClick={() => onSelect(exercise)}
                                disabled={selectedExercises.some(ex => ex.id === exercise.id)}
                                className={`w-full text-left p-4 rounded-lg mb-2 transition-colors ${
                                    selectedExercises.some(ex => ex.id === exercise.id)
                                        ? 'bg-blue-900 bg-opacity-50 cursor-not-allowed'
                                        : 'bg-[#1a1a1a] hover:bg-[#333333]'
                                }`}
                            >
                                <h3 className="font-medium">{exercise.name}</h3>
                                <p className="text-sm text-gray-400">{exercise.muscleGroup}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExerciseSelectModal;