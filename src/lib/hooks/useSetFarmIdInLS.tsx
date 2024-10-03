import { useLocalStorage } from "@uidotdev/usehooks";
import { Farm } from "../types/farm";

function useSetFarmIdInLS() {
  const [farm, setFarm] = useLocalStorage<Farm | null>("livestockly-farm", null);
  return {
    farm, 
    setFarm,
  };
}

export default useSetFarmIdInLS;
