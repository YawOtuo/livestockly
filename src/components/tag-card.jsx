import { Link } from 'react-router-dom'
import tagIcon from '../icons/tag-outline.png'

export const TagCard = (props) => {
    return (
        <Link to={`/dashboard/goats/${props.tag}`}>

            <div className='flex flex-row text-center w-full items-center justify-center py-5 shadow-md'>
                <img src={tagIcon} width="5%" className='mx-5' />
                {props.tag}
            </div>
        </Link>

    )
}