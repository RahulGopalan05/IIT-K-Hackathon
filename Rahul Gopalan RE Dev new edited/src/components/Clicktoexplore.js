import { useNavigate } from 'react-router-dom';
import "./Clicktoexplore.css";

const Clicktoexplore = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/market');
  };

  return (
    <div className="frame55">
      <button className="click-to-explore" onClick={handleClick}>Click To Explore</button>
    </div>
  );
};

export default Clicktoexplore;