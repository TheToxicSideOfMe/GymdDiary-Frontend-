// components/CreateSplitPopup.jsx
import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function CreateSplitPopup({ open, onClose }) {
  const [splitName, setSplitName] = useState('');
  const inputRef = useRef(null);
  const navigate=useNavigate();


  useEffect(() => {
    if (open) {
      // Wait for the modal to be visible
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  const handleSubmit = async () => {
    if (splitName.trim()) {
      try {
        const response = await axios.post('https://gymdiary.onrender.com/api/splits', {
          name: splitName
        });
 
        // Show success notification
        toast.success('Split created successfully!', {
          duration: 3000,
          style: {
            background: '#2a2a2a',
            color: '#fff',
            border: '1px solid #333'
          }
        });
 
        // Navigate to the new split's workouts page after a short delay
        setTimeout(() => {
          navigate(`/splits/${response.data.id}/workouts`);
        }, 1500);
 
        setSplitName('');
        onClose();
      } catch (error) {
        console.error('Error creating split:', error);
        toast.error('Failed to create split. Please try again.', {
          duration: 4000,
          style: {
            background: '#2a2a2a',
            color: '#fff',
            border: '1px solid #333'
          }
        });
      }
    }
  };
  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-[#2a2a2a] rounded-xl w-full max-w-md mx-4 p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-xl font-bold">Create New Split</h2>

          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Split Name"
          value={splitName}
          onChange={(e) => setSplitName(e.target.value)}
          className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none mb-6"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!splitName.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSplitPopup;