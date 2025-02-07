import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import CreateSplitPopup from '../components/CreateSplitPopup';
import SplitCard from '../components/SplitCard';
import { Toaster } from 'react-hot-toast';

function SplitsPage() {
  const [splits, setSplits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    fetchSplits();
  }, []);

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

  const handleDelete = async (splitId) => {
    try {
      await axios.delete(`https://gymdiary.onrender.com/api/splits/${splitId}`);
      fetchSplits();
    } catch (err) {
      console.error('Error deleting split:', err);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white px-4 py-8">
    <Toaster position="top-right"/>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Splits</h1>
          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Create Split
          </button>
        </div>

        {/* No splits message */}
        {splits.length === 0 ? (
          <div className="text-center py-16 bg-[#2a2a2a] rounded-xl">
            <h2 className="text-2xl font-bold mb-2">No Splits Yet</h2>
            <p className="text-gray-400 mb-6">Create your first workout split to get started</p>
            <button
              onClick={() => setOpenCreate(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors mx-auto"
            >
              <Plus size={20} />
              Create Split
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {splits.map((split) => (
              <SplitCard
                key={split.id}
                split={split}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <CreateSplitPopup
          open={openCreate}
          onClose={() => setOpenCreate(false)}

        />
      </div>
    </div>
  );
}

export default SplitsPage;