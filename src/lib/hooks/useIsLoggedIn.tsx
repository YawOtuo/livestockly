"use client"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useIsLoggedIn() {
    const userData = useSelector((state) => state?.users?.userData);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    

    useEffect(()=> {
        if (userData){  
            setIsLoggedIn(true)
        }
        else{
        }
    }, [userData])


    return isLoggedIn;
}

export default useIsLoggedIn;