import { Link } from "react-router-dom";

const Back = () => {
    return (
      <Link className="fixed bottom-4 right-4 ic bg-gray-600 hover:bg-gray-400 rounded-full py-2 px-3" to="/"><i className="fa-solid fa-backward"></i></Link>
    )
};

export default Back;
