import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../component/header/Header';
import TabBar from '../../component/tabBar/TabBar';
import Navbar from '../../component/navbar/Navbar';
import PopularList from '../../component/popularList/PopularList';
import FollowAndFollowerTweet from '../../component/followAndFollowerTweet/FollowAndFollowerTweet';
import { getPopularList } from '../../api/popularlist';
import { getFollowerList, getFollowingList } from '../../api/followship';
import './FollowAndFollower.scss';
import { useAuth } from '../../contexts/AuthContext';

const FollowAndFollower = () => {
  const location = useLocation();
  const path = location.pathname;
  const initialTab = path === '/follow' ? 'following' : 'followers';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [popularCards, setPopularCards] = useState([]);
  const [followshipList, setFollowshipList] = useState('');

  const { currentMember } = useAuth();
  const UserId = currentMember?.id;
  console.log(UserId);

  useEffect(() => {
    const getFollowshipList = async () => {
      try {
        const list =
          activeTab === 'followers'
            ? await getFollowerList(UserId)
            : await getFollowingList(UserId);
        console.log(list);

        setFollowshipList([...list]);
      } catch (error) {
        console.error(error);
      }
    };
    getFollowshipList();
  }, [activeTab, UserId]);

  useEffect(() => {
    const getPopularCardsAsync = async () => {
      try {
        const popularCards = await getPopularList();
        setPopularCards(popularCards.map((users) => ({ ...users })));
      } catch (error) {
        console.error(error);
      }
    };
    getPopularCardsAsync();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        {/* Header帶入api資料 */}
        {/* 帶入的pageName可以在優化成其他使用者 */}
        <Header username="John Doe" tweetCount={25} pageName="user/self" />
        <hr />
        <TabBar
          activePage="FollowAndFollower"
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />

        {[...followshipList]?.map((list, i) => {
          if (activeTab === 'followers') {
            return (
              <FollowAndFollowerTweet
                index={i}
                userName={list?.followerName}
                intro="nkjehfhweohfoewho"
                avatar={list?.followerAvatar}
                isFollowship={list?.isFollowed}
                followerId={list?.followerId}
                setList={setFollowshipList}
                allList={[...followshipList]}
                tabStatus={activeTab}
              />
            );
          } else {
            return (
              <FollowAndFollowerTweet
                index={i}
                userName={list?.followingName}
                intro="nkjehfhweohfoewho"
                avatar={list?.followingAvatar}
                isFollowship={list?.isFollowing}
                followerId={list?.followingId}
                setList={setFollowshipList}
                allList={[...followshipList]}
                tabStatus={activeTab}
              />
            );
          }
        })}
      </div>
      <PopularList popularCards={popularCards} />
    </div>
  );
};

export default FollowAndFollower;
