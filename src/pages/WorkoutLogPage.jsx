import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SplitCard from "../components/SplitCard"
import { Button, Grid } from '@mui/material';
import { Plus } from 'lucide-react';
import SplitCardLog from '../components/LogWorkoutComponents/SplitCardLog';
import { useNavigate } from 'react-router-dom';


const WorkoutLogPage = () => {
    const [splits,setSplits]=useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 
    

    const fetchSplits = async () => {
        try {
          const response = await axios.get('https://gymdiary.onrender.com/api/splits');
          setSplits(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

    useEffect(()=>{
        fetchSplits();
    },[])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Pick a Split</h1>
              
            </div>
    
            {/* No splits message */}
            {splits.length === 0 ? (
              <div className="text-center py-16 bg-[#2a2a2a] rounded-xl">
                <h2 className="text-2xl font-bold mb-2">No Splits Yet</h2>
                <p className="text-gray-400 mb-6">Create your first workout split to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {splits.map((split) => (
                  <Button key={split.id} onClick={()=> navigate(`/log-workout/${split.id}/workouts`)}>
                  <SplitCardLog
                    key={split.id}
                    split={split}
                  />
                  </Button>
                  
                ))}
              </div>
            )}
    
            
          </div>
        </div>
      );
};

export default WorkoutLogPage;