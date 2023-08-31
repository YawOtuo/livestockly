import axios from "axios";
import { url } from "../weburl";

export const getRecordSp = async (type) => {

    switch (type) {
        case "sheep":
            let response = await fetch(`${url}records/sheep`);
            return response.json();
            break
        case "goats":
            let responseS = await fetch(`${url}records/goats`);
            // const responseText = await responseS.text(); // Read the response body as text
            return responseS.json();
            break

        case "cattle":
            let responseC = await fetch(`${url}records/cattle`);
            return responseC.json();
            break
        default:
            break;

    }


}

