import user from "../reducers/user";
import { useSelector } from "react-redux";
import diyTourScreen from "./diyTourScreen";
import announceScreen from "./announceScreen";

export default function AddScreen() {
  const userIsArtist = useSelector((state) => state.user.value.isArtist);
  const userIsHost = useSelector((state) => state.user.value.isHost);

  return (
    <>
      {userIsArtist && <diyTourScreen />}
      {userIsHost && <announceScreen />}
    </>
  );
}
