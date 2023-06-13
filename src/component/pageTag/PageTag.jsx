import './PageTag.scss';

const PageTag = ({ title }) => {
  return (
    <div className="titleContainer">
      <h4 className="medium">{title}</h4>
    </div>
  );
};

export default PageTag;
