// import { useEffect, useState } from 'react'
// import useConversation from '../zustand/useConversation';
// import toast from 'react-hot-toast';

// const useGetMessages = () => {
//     const[loading,setLoading]=useState(false);
//     const{messages,setMessages,selectedConversation}=useConversation();

//     useEffect(()=>{
//         const getMessages=async()=>{
//             setLoading(true); 
//             try {
//                 const res= await fetch(`/api/messages/${selectedConversation._id}`);
//                 const data=await res.json();
//                 if(data.error) throw new Error(data.error)
//                 setMessages(data);
                
                
//             } catch (error) {
//                 toast.error(error.message)
                
//             }finally{
//                setLoading(false) 
//             }
//         }
//         if(selectedConversation?._id) getMessages();


//     },[selectedConversation?._id,setMessages]
// )
// return {messages,loading};
  
// }

// export default useGetMessages

import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true); // Start loading
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setMessages(data); // Set the fetched messages
            } catch (error) {
                toast.error(error.message); // Show error message
            } finally {
                setLoading(false); // Stop loading immediately
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
