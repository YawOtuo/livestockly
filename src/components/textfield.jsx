import { Typography } from "@mui/material"

export const TextField = (props) => {
    return (
        <div className='py-2 flex flex-row text-black items-center'>
            <Typography className='flex flex-row items-center capitalize '>
                {props.label}</Typography>
            <input type={props.type}name={props.name} value={props.value}
            className="w-full xxx   mx-3 px-3 record-form-input"
                onChange={e => props.handleOnChange(e)}></input>

        </div>
    )
}