import { RecordCard } from "../components/record-card"

export const Dashboard = () => {
    return (
        <div>
            <div className="grid grid-cols-4">
                <div></div>
                <div className="col-span-2"><RecordCard type="GOAT" /></div>
                <div></div>
            </div>
            <div className="grid grid-cols-4">
                <div></div>
                <div className="col-span-2"><RecordCard type="SHEEP" /></div>
                <div></div>
            </div>
            <div className="grid grid-cols-4">
                <div></div>
                <div className="col-span-2"><RecordCard type="CATTLE" /></div>
                <div></div>
            </div>
        </div>

    )
}