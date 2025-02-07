import { useNavigate } from 'react-router-dom';
import wallpaper from '../assets/Wallpaper.png'; // adjust path

function Home() {
 const navigate = useNavigate();

 return (
   <div className="relative min-h-screen">
     {/* Background Image */}
     <div 
       className="absolute inset-0 z-0"
       style={{
         backgroundImage: `url(${wallpaper})`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
       }}
     />
     
     {/* Content */}
     <div className="relative z-10 pt-20 px-4 text-white">
       <div className="max-w-3xl mx-auto">
         <h1 className="text-5xl font-bold mb-6">Transform Your Fitness Journey</h1>
         <p className="text-xl mb-8">Track your workouts, monitor progress, and achieve your fitness goals with GymDiary.</p>
         
         <div className="flex gap-4">
           <button 
             onClick={() => navigate('/splits')}
             className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
           >
             Start Your Split
           </button>
           <button 
             onClick={() => navigate('/track-progress')}
             className="bg-transparent border-2 border-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold"
           >
             Track Progress
           </button>
         </div>
       </div>
     </div>
   </div>
 );
}

export default Home;