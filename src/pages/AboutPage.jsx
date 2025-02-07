// pages/AboutPage.jsx
import { Github, Instagram, Facebook, Mail, ArrowRight } from 'lucide-react';

function AboutPage() {
 return (
   <div className="min-h-screen bg-[#1a1a1a] text-white">
     <div className="max-w-6xl mx-auto px-4 py-16">
       {/* Hero Section */}
       <div className="text-center mb-16">
         <h1 className="text-4xl md:text-5xl font-bold mb-4">
           About <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">GymDiary</span>
         </h1>
         <p className="text-lg text-gray-400 max-w-2xl mx-auto">
           A modern workout tracking application designed to help you achieve your fitness goals
         </p>
       </div>

       {/* Features Section */}
       <div className="grid md:grid-cols-2 gap-8 mb-16">
         <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-white/5">
           <h2 className="text-2xl font-bold mb-4">Key Features</h2>
           <ul className="space-y-3">
             <li className="flex items-center gap-2">
               <ArrowRight className="text-blue-500" size={20} />
               <span>Create and manage workout splits</span>
             </li>
             <li className="flex items-center gap-2">
               <ArrowRight className="text-blue-500" size={20} />
               <span>Track workouts and exercises</span>
             </li>
             <li className="flex items-center gap-2">
               <ArrowRight className="text-blue-500" size={20} />
               <span>Monitor progress with visual charts</span>
             </li>
             <li className="flex items-center gap-2">
               <ArrowRight className="text-blue-500" size={20} />
               <span>Personal records tracking</span>
             </li>
           </ul>
         </div>

         <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-white/5">
           <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
           <ul className="space-y-3">
             <li className="flex items-center gap-2">
               <ArrowRight className="text-blue-500" size={20} />
               <span>React for frontend development</span>
             </li>
             <li className="flex items-center gap-2">
               <ArrowRight className="text-blue-500" size={20} />
               <span>Spring Boot for backend API</span>
             </li>
             <li className="flex items-center gap-2">
               <ArrowRight className="text-blue-500" size={20} />
               <span>MongoDB for database management</span>
             </li>
             <li className="flex items-center gap-2">
               <ArrowRight className="text-blue-500" size={20} />
               <span>Tailwind CSS for modern styling</span>
             </li>
           </ul>
         </div>
       </div>

       {/* Developer Section */}
       <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-white/5 mb-16">
         <div className="text-center mb-8">
           <h2 className="text-2xl font-bold mb-2">About the Developer</h2>
           <p className="text-gray-400">
             Hi! I'm Stark, a passionate developer focused on creating useful applications
             that help people achieve their goals.
           </p>
         </div>

         {/* Social Links */}
         <div className="flex flex-wrap justify-center gap-4">
           <a 
             href="https://github.com/TheToxicSideOfMe" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] rounded-lg hover:bg-[#333] transition-colors"
           >
             <Github size={20} />
             <span>GitHub</span>
           </a>
           <a 
             href="https://www.instagram.com/stark.exee/" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] rounded-lg hover:bg-[#333] transition-colors"
           >
             <Instagram size={20} />
             <span>Instagram</span>
           </a>
           <a 
             href="https://www.facebook.com/rayen.alstark" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] rounded-lg hover:bg-[#333] transition-colors"
           >
             <Facebook size={20} />
             <span>Facebook</span>
           </a>
           <a 
             href="mailto:rayenjemmali05@gmail.com" 
             className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] rounded-lg hover:bg-[#333] transition-colors"
           >
             <Mail size={20} />
             <span>Email</span>
           </a>
         </div>
       </div>
     </div>
   </div>
 );
}

export default AboutPage;