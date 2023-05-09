import './Card.scss';

const Card = ({ children, cardClasses }) => {
  return <div className={`CardComponent card ${cardClasses}`}>{children}</div>;
};

export default Card;
