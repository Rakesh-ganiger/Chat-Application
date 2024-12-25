import { createContext, useEffect, useState, useContext} from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client"; // Correct import

export const SocketContext = createContext();

export const useSocketContext = () =>{
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext(); // Correct usage

    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:5000",{
                query:{
                    userId: authUser._id
                }
            });
            setSocket(socket);
    //socket.on() is used to listen the events can be used both for client and server
            socket.on("getOnlineUsers",(users) =>{
                setOnlineUsers(users)
            }) 

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]); 

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}> {/* Corrected typo */}
            {children}
        </SocketContext.Provider>
    );
};
