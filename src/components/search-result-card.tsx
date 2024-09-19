type Props = {
    name:string
}

export const SearchResultCard = ({name} : Props) => {
    return(
        <div>
            <div className=" w-full px-2 py-2 shadow-sm text-center">
                {name}
            </div>
    
        </div>
    )
} 