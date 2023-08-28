import { styled } from "@stitches/react"

const data = [
    'ama', 'sdfgs', 'sdfgsd'
]

const RecentRecords = (props) => {
    return (
        <Root>
            <div className="title text-left mb-2">
                {props.title}
            </div>
            {data.map((r) => (
                <div className="w-full text-left  capitalize py-4 px-2">
                    {r}
                </div>
            ))}
        </Root>
    )
}

const Root = styled('div', {
    "& .title":{
        width:"100%",
        maxHeight:"30px",
        height:"100%",
        borderBottom:"1px solid #0FA958",
    },
})

export default RecentRecords