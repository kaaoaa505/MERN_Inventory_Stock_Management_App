import './InfoBox.scss';

const InfoBox = ({ color, title, count, icon }) => {
    return (
      <div className={`InfoBoxComponent ${color}`}>
        <span className="info-icon --color">{icon}</span>
        <span className="info-text">
          <p>{title}</p>
          <h4>{count}</h4>
        </span>
      </div>
    );
  };
  
  export default InfoBox;
  