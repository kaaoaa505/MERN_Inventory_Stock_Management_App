import { React } from "react";
import ReactDOM from "react-dom";

import "./Loading.scss";

import LoadingImage from "./loading.gif";

const Loading = () => {
  return ReactDOM.createPortal(
    <div className="LoadingComponent">
        <img src={LoadingImage} alt="Loading..." />
    </div>,
    document.getElementById('loading')
  );
};

export default Loading;
