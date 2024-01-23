import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const PermissionComponent = (props) => {
    const userSqlData = useSelector((state) => state?.users?.userSqlData);
    const [display, setDisplay] = useState(true)

    useEffect(()=>{
        // console.log(userSqlData?.permission)
        if (Number(userSqlData?.permission) >= props?.level){
            setDisplay(true)
            
        }
        else{
            setDisplay(false)
        }
    }, [userSqlData])

    return (
        <div className="">
            {display && props.children}

        </div>
    )
}

