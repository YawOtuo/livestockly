
import { Farm } from "../types/farm";
import { useLocalStorage } from "usehooks-ts";

function useSetFarmIdInLS() {

  const [farm, setFarm] = useLocalStorage<Farm | null>(
    "livestockly-farm",
    null
  );

  return {
    farm,
    setFarm,
  };
}

export default useSetFarmIdInLS;
