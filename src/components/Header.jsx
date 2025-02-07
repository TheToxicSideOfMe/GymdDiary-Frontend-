// components/Header.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell, Home, ClipboardList, LineChart, Info } from 'lucide-react';

function Header() {
 const navigate = useNavigate();
 const location = useLocation();
 const [isScrolled, setIsScrolled] = useState(false);
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 useEffect(() => {
   const handleScroll = () => {
     setIsScrolled(window.scrollY > 20);
   };
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const navItems = [
   { name: 'Home', path: '/', icon: <Home className="stroke-2" /> },
   { name: 'My Splits', path: '/splits', icon: <Dumbbell className="stroke-2" /> },
   { name: 'Log Workout', path: '/log-workout', icon: <ClipboardList className="stroke-2" /> },
   { name: 'Track Progress', path: '/track-progress', icon: <LineChart className="stroke-2" /> },
   { name: 'About', path: '/about', icon: <Info className="stroke-2" /> }
 ];

 const isActive = (path) => location.pathname === path;

 return (
   <header 
     className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
       isScrolled 
         ? 'bg-[#1a1a1a]/95 shadow-lg shadow-black/20 backdrop-blur-md' 
         : 'bg-transparent'
     }`}
   >
     <div className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-300 ${
       isScrolled ? 'bg-white/5 opacity-100' : 'opacity-0'
     }`} />

     <div className="max-w-7xl mx-auto px-4 lg:px-8">
       <div className="flex items-center justify-between h-20">
         {/* Logo */}
         <div 
           onClick={() => navigate('/')}
           className="flex items-center gap-3 cursor-pointer group select-none"
         >
           <div className="p-2 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
             <Dumbbell 
               className="h-8 w-8 text-blue-500 transform group-hover:rotate-12 transition-all duration-500 stroke-2" 
             />
           </div>
           <span className="text-2xl font-bold text-white tracking-tight">
             Gym<span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">Diary</span>
           </span>
         </div>

         {/* Desktop Navigation */}
         <nav className="hidden md:flex items-center gap-1">
           {navItems.map((item) => (
             <button
               key={item.name}
               onClick={() => navigate(item.path)}
               className={`
                 flex items-center gap-2 px-4 py-2.5 rounded-lg outline-none relative
                 transition-all duration-300 select-none focus:outline-none
                 ${isActive(item.path)
                   ? 'text-blue-500 bg-blue-500/10'
                   : 'text-gray-300 hover:text-white hover:bg-white/5'
                 }
               `}
             >
               <span className={`transition-transform duration-300 ${
                 isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'
               }`}>
                 {item.icon}
               </span>
               <span className="font-medium tracking-wide">{item.name}</span>
               
               {/* Bottom Border Indicator */}
               <span className={`
                 absolute bottom-0 left-0 w-full h-0.5 rounded-full
                 bg-gradient-to-r from-blue-500 to-blue-400
                 transform origin-left transition-transform duration-300
                 ${isActive(item.path) ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'}
               `} />
             </button>
           ))}
         </nav>

         {/* Mobile Menu Button */}
         <button
           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white
             hover:bg-white/5 transition-colors focus:outline-none"
         >
           {isMobileMenuOpen ? <X size={24} className="stroke-2" /> : <Menu size={24} className="stroke-2" />}
         </button>
       </div>
     </div>

     {/* Mobile Menu */}
     <div className={`
       md:hidden absolute w-full bg-[#1a1a1a]/98 backdrop-blur-lg
       shadow-xl shadow-black/20 border-t border-white/5 
       transition-all duration-300
       ${isMobileMenuOpen 
         ? 'opacity-100 translate-y-0' 
         : 'opacity-0 -translate-y-4 pointer-events-none'
       }
     `}>
       <div className="px-4 py-3 space-y-1">
         {navItems.map((item) => (
           <button
             key={item.name}
             onClick={() => {
               navigate(item.path);
               setIsMobileMenuOpen(false);
             }}
             className={`
               w-full flex items-center gap-3 px-4 py-3 rounded-lg
               transition-all duration-300 outline-none focus:outline-none
               ${isActive(item.path)
                 ? 'text-blue-500 bg-blue-500/10'
                 : 'text-gray-300 hover:text-white hover:bg-white/5'
               }
             `}
           >
             <span className={`transition-transform duration-300 ${
               isActive(item.path) ? 'scale-110' : ''
             }`}>
               {item.icon}
             </span>
             <span className="font-medium">{item.name}</span>
           </button>
         ))}
       </div>
     </div>
   </header>
 );
}

export default Header;