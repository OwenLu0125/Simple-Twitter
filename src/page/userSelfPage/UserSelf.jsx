import { useEffect, useState } from "react";
import {
  getUserLikes,
  getUserRepliedTweets,
  getUserTweets,
} from "../../api/tweets";
import { useAuth } from "../../contexts/AuthContext";
import { getPopularList } from "../../api/popularlist";
import { getUserPageById } from "../../api/getUserPage";
import { useNavigate } from "react-router-dom";
import Header from "../../component/header/Header";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import TabBar from "../../component/tabBar/TabBar";
import UserInfo from "../../component/userInfo/UserInfo";
import UserTweetsList from "../../component/userTweetList/UserTweetList";
import UserRepliesList from "../../component/userRepliesList/UserRepliesList";
import UserLikesList from "../../component/userLikesList/UserLikesList";
import "./UserSelf.scss";

const UserSelf = () => {
  const { currentMember, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("tweets");
  const [tweets, setTweets] = useState([]);
  const [replies, setReplies] = useState([]);
  const [likes, setLikes] = useState([]);
  const [popularCards, setPopularCards] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleUserDataUpdate = (updatedData) => {
    const updatedUserData = {
      ...updatedData,
      followingCount: userData.followingCount,
      followerCount: userData.followerCount,
    };
    setUserData(updatedUserData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = currentMember?.id;

      try {
        const userTweets = await getUserTweets(id);
        setTweets(userTweets);
      } catch (error) {
        console.error("獲取用户推文失敗：", error);
      }

      try {
        const userReplies = await getUserRepliedTweets(id);
        setReplies(userReplies);
      } catch (error) {
        console.error("獲取用戶資料失敗：", error);
      }

      try {
        const userLikes = await getUserLikes(id);
        setLikes(userLikes);
      } catch (error) {
        console.error("獲取用户喜歡的推文失敗：", error);
      }
      try {
        const popularCards = await getPopularList();
        setPopularCards(popularCards.map((users) => ({ ...users })));
      } catch (error) {
        console.error("獲取熱門列表失敗：", error);
      }
      try {
        const user = await getUserPageById(id);
        setUserData(user);
      } catch (error) {
        console.error("獲取用户信息失敗：", error);
      }
    };
    fetchData();
  }, [currentMember]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="mainContainer">
      <Navbar setTweetsList={setTweets} />
      <div className="mainContent">
        <Header username={userData?.name} tweetCount={userData?.TweetCount} />
        <div className="postSection">
          <UserInfo
            avatar={userData?.avatar}
            username={userData?.name}
            accountName={userData?.account}
            bio={userData?.introduction}
            followingCount={userData?.followingCount}
            followersCount={userData?.followerCount}
            banner={userData?.banner}
            handleUserDataUpdate={handleUserDataUpdate}
          />
        </div>
        <TabBar
          activePage="UserSelf"
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <div className="tweetsSection">
          {activeTab === "tweets" && (
            <UserTweetsList
              tweets={tweets}
              username={userData?.name}
              userImage={userData?.avatar}
              className="tweetsSection"
              setTweetsList={setTweets}
            />
          )}
          {activeTab === "replies" && (
            <UserRepliesList
              replies={replies}
              username={userData?.name}
              userImage={userData?.avatar}
              className="tweetsSection"
            />
          )}
          {activeTab === "likes" && (
            <UserLikesList
              likes={likes}
              className="tweetsSection"
              setTweetsList={setLikes}
            />
          )}
        </div>
      </div>
      <PopularList popularCards={popularCards} />
    </div>
  );
};

export default UserSelf;
