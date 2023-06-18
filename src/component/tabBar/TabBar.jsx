import './TabBar.scss';

const tabOptions = [
  { id: 'tweets', label: '推文' },
  { id: 'replies', label: '回復' },
  { id: 'likes', label: '喜歡的內容' },
];

const tabOptionsFollow = [
  { id: 'followers', label: '跟隨者' },
  { id: 'following', label: '正在追隨' },
];

const TabBar = ({ activePage, activeTab, onTabClick }) => {

  const options =
    activePage === "UserSelf" || "UserOther" ? tabOptions : tabOptionsFollow;


  return (
    <div className="tabBar">
      {options.map((option) => (
        <button
          key={option.id}
          className={`tabButton ${activeTab === option.id ? 'active' : ''}`}
          onClick={() => onTabClick(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
