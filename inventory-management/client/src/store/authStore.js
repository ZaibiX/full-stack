import { create } from 'zustand'
import axios from '../utils/axiosInstance';

const useAuth = create((set) => ({
  user: null,
  authLoading: false,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),

login: async(data)=>{
    if (typeof data !== "object" || !data.email || !data.password) {
    console.error("❌ Invalid login payload:", data);
    return;
  }
    try{
        set({authLoading:true});
        console.log("auth store login data: ",data)
        const response = await axios.post('/api/auth/login', data);
        console.log("Login response: ", response.data);
        if(response.data?.user)
            set({user: response.data.user, authLoading: false});   
        else
            set({user: null, authLoading: false}); 
    }
    catch(err){ 
        console.error("Login failed", err.response?.data.message|| err.message);
        set({authLoading: false});
    }

},

logout: async()=>{

    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) {
      return;
    }
    try{
        set({authLoading:true});
        const response = await axios.delete('/api/auth/logout');
        console.log("Logout response: ", response.data);
        set({user: null, authLoading: false});
    }
    catch(err){
        console.error("Logout failed", err.response?.data.message|| err.message);
        set({authLoading: false});
    }
},

checkAuth: async()=>{
    try{
        set({authLoading:true});
        const response = await axios.get('/api/auth/check-auth');
        console.log("CheckAuth response: ", response.data);
        if(response.data.user)
            set({user: response.data.user, authLoading: false});    
        else
            set({user: null, authLoading: false});
    }
    catch(err){ 
        console.error("CheckAuth failed", err.response?.data.message|| err.message);
        set({authLoading: false});
    }
},
}));



export default useAuth