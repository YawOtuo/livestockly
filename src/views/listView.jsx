import { Navbar } from "../components/navbar"
import { TagCard } from "../components/tag-card"

export const ListView = () => {

    const animals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const renderList = () => {
        return animals.map((item) => {
            return <div className="col-start-2 col-span-10 md:col-span-3 items-center">
                <TagCard tag={item} />
            </div>

        })
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <div>
                    <p>Displaying all</p>
                </div>
                <div className="">
                    <div className="grid grid-cols-12 
                    gap-4 justify-center items-center">
                        {renderList()}
                    </div>
                </div>
            </div>
        </div>
    )
}