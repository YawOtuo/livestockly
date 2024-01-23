import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useIsLoggedInReRoute(status? : boolean, url? : string) {
    const userData = useSelector((state) => state?.users?.userData);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter();

    

    useEffect(()=> {
        console.log(userData)
        if (userData){  
            status && router.push(url)
            setIsLoggedIn(true)
        }
        else{
            !status && router?.push(url)
        }
    }, [userData])


    return isLoggedIn;
}

export default useIsLoggedInReRoute;