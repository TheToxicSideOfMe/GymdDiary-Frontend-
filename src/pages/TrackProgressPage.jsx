import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend 
} from 'recharts';
import { ChevronDown } from 'lucide-react';

function TrackProgressPage() {
  const [logs, setLogs] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [logsResponse, exercisesResponse] = await Promise.all([
        axios.get('https://gymdiary.onrender.com/api/logs'),
        axios.get('https://gymdiary.onrender.com/api/exercises')
      ]);
      setLogs(logsResponse.data);
      setExercises(exercisesResponse.data);
      setSelectedExercise(exercisesResponse.data[0]?.id);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Process data for weight progression chart
  const getProgressionData = () => {
    if (!selectedExercise) return [];
    
    return logs
      .filter(log => log.exerciseLogs.some(ex => ex.exercise.id === selectedExercise))
      .map(log => {
        const exerciseLog = log.exerciseLogs.find(ex => ex.exercise.id === selectedExercise);
        const maxWeight = Math.max(...exerciseLog.sets.map(set => set.weight));
        return {
          date: new Date(log.date).toLocaleDateString(),
          weight: maxWeight
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Get PRs data
  const getPRsData = () => {
    if (!selectedExercise) return [];
    
    const prs = logs
      .filter(log => log.exerciseLogs.some(ex => ex.exercise.id === selectedExercise))
      .map(log => {
        const exerciseLog = log.exerciseLogs.find(ex => ex.exercise.id === selectedExercise);
        return {
          date: new Date(log.date).toLocaleDateString(),
          weight: Math.max(...exerciseLog.sets.map(set => set.weight)),
          reps: Math.max(...exerciseLog.sets.map(set => set.reps))
        };
      })
      .reduce((acc, curr) => {
        if (!acc.length || curr.weight > acc[acc.length - 1].weight) {
          acc.push(curr);
        }
        return acc;
      }, []);

    return prs.slice(-5); // Last 5 PRs
  };

  // Get exercise name
  const getExerciseName = (exerciseId) => {
    const log = logs.find(log => 
      log.exerciseLogs.some(ex => ex.exercise.id === exerciseId)
    );
    return log?.exerciseLogs.find(ex => ex.exercise.id === exerciseId)?.exercise.name || '';
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Track Progress</h1>

        {/* Exercise Selector */}
        <div className="mb-8">
          <select
            value={selectedExercise || ''}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="bg-[#2a2a2a] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            {exercises.map(exercise => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </div>

        {/* Weight Progression Chart */}
        <div className="bg-[#2a2a2a] rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">
            Weight Progression - {getExerciseName(selectedExercise)}
          </h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getProgressionData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="date" 
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                />
                <YAxis 
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                  label={{ 
                    value: 'Weight (kg)', 
                    angle: -90, 
                    position: 'insideLeft',
                    fill: '#fff'
                  }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Personal Records */}
        <div className="bg-[#2a2a2a] rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Personal Records History</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getPRsData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="date" 
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                />
                <YAxis 
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                  label={{ 
                    value: 'Weight (kg)', 
                    angle: -90, 
                    position: 'insideLeft',
                    fill: '#fff'
                  }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="weight" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PRs List */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Latest PRs</h3>
            <div className="space-y-2">
              {getPRsData().reverse().map((pr, index) => (
                <div 
                  key={index}
                  className="bg-[#1a1a1a] p-4 rounded-lg flex justify-between items-center"
                >
                  <span>{pr.date}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-blue-400">{pr.weight}kg</span>
                    <span className="text-gray-400">×</span>
                    <span className="text-blue-400">{pr.reps} reps</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackProgressPage;