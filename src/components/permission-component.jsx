import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const PermissionComponent = (props) => {
    const user = useSelector((state) => state?.users)

    const [display, setDisplay] = useState(true)
    useEffect(()=>{
       
        if (props.level.includes(user.user.permission)){
            setDisplay(true)
        
        }
        else{
            setDisplay(false)
        }
    }, [])
    return (
        <div>
            {display && props.children}

        </div>
    )
}

