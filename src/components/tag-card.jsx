import { Link } from 'react-router-dom'
import tagIcon from '../icons/tag-outline.png'

export const TagCard = (props) => {
    return (
        <Link to={`/dashboard/${props.type}/${props.id}`}>

            <div className='flex flex-row text-center w-full items-center 
            justify-center py-5 shadow-sm'>
                <img src={tagIcon} width="9%" className='mx-1 md:mx-3' />
                <span className='capitalize'>{props.name}</span>
            </div>
        </Link>

    )
}