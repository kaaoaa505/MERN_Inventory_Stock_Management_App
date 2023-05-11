import "./LoadingPartial.scss";

import LoadingImage from "../Loading/loading.gif";

const LoadingPartial = () => {
    return (
        <div className="LoadingPartialComponent --center-all">
            <img src={LoadingImage} alt="Loading..." />
        </div>
    );
  }
  
  export default LoadingPartial;