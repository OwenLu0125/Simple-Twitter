import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getPopularList } from "../../api/popularlist";
import { getFollowerList, getFollowingList } from "../../api/followship";
import { useUserId } from "../../contexts/UserIdContext";
import Header from "../../component/header/Header";
import TabBar from "../../component/tabBar/TabBar";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import FollowAndFollowerTweet from "../../component/followAndFollowerTweet/FollowAndFollowerTweet";
import "./FollowAndFollower.scss";

const FollowAndFollower = () => {
  const location = useLocation();
  const path = location.pathname;
  const initialTab = path === "/follow" ? "followers" : "following";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [popularCards, setPopularCards] = useState([]);
  const [followShipList, setFollowShipList] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { userId, usernameFromContext } = useUserId();
  const { currentMember } = useAuth();

  useEffect(() => {
    const getFollowShipList = async () => {
      try {
        const list =
          activeTab === "followers"
            ? await getFollowerList(userId)
            : await getFollowingList(userId);

        activeTab === "followers"
          ? setFollowShipList([...list.followers])
          : setFollowShipList([...list.followings]);
      } catch (error) {
        console.error(error);
      }
    };
    getFollowShipList();
  }, [activeTab, userId]);

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        {/* 帶入tweetCount資料 */}
        <Header
          username={usernameFromContext}
          tweetCount={25}
          pageName={
            currentMember.id === userId
              ? "user/self"
              : `/user/${usernameFromContext}`
          }
        />
        <hr />
        <TabBar
          activePage="FollowAndFollower"
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />

        {[...followShipList]?.map((list, i) => {
          if (activeTab === "followers") {
            return (
              <FollowAndFollowerTweet
                key={list?.followerId}
                index={i}
                userName={list?.followerName}
                intro={list?.followerIntroduction}
                avatar={list?.followerAvatar}
                isFollowShip={list?.isFollowed}
                followerId={list?.followerId}
                setList={setFollowShipList}
                allList={[...followShipList]}
                tabStatus={activeTab}
              />
            );
          } else {
            return (
              <FollowAndFollowerTweet
                key={list?.followingId}
                index={i}
                userName={list?.followingName}
                intro={list?.followingIntroduction}
                avatar={list?.followingAvatar}
                isFollowShip={list?.isFollowing}
                followerId={list?.followingId}
                setList={setFollowShipList}
                allList={[...followShipList]}
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
