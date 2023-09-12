import { useNavigate } from "react-router-dom";

const usePathMove = () => {
  const navigate = useNavigate();

  const pathMove = (location, stateValue, pathProps = false) => {
    if (pathProps) {
      return navigate(location, {
        state: { ...stateValue },
      });
    } else {
      navigate(location);
    }
  };
  return pathMove;
};

export default usePathMove;
