import AlertDialogSlide from "../components/add-record-modal"
import { Navbar } from "../components/navbar"
import { RecordCard } from "../components/record-card"
import { Search } from "../components/search"
import cattleIcon from '../icons/cattle.png'
import goatIcon from '../icons/goat.png'
import sheepIcon from '../icons/sheep.png'

export const Dashboard = () => {
    
    return (
        <div>
            <Navbar/>

          <div className="flex flex-col justify-center items-center h-full">
                <div className="w-4/5 md:w-1/4 ">
                   <div className=""> <Search/></div>
                </div>
             <div className=" w-4/5 md:w-3/5" >
                    <div className="mb-10 md:mb-0">
        
                        <div className=""><RecordCard type="goats" icon={goatIcon}/></div>
                    </div>
                    <div className="mb-10 md:mb-0">
                        <div className=""><RecordCard type="sheep" icon={sheepIcon} /></div>
                    </div>
                    <div className="mb-10 md:mb-0">
                        <div className=""><RecordCard type="cattle" icon={cattleIcon} /></div>
                    </div>
             </div>
          </div>
        </div>

    )
}