import { useEffect, useState } from "react";
import {
  getUserLikes,
  getUserRepliedTweets,
  getUserTweets,
} from "../../api/tweets";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../component/header/Header";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import TabBar from "../../component/tabBar/TabBar";
import UserInfo from "../../component/userInfo/UserInfo";
import UserTweetsList from "../../component/userTweetList/UserTweetList";
import UserRepliesList from "../../component/userRepliesList/UserRepliesList";
import UserLikesList from "../../component/userLikesList/UserLikesList";
import "./UserSelf.scss";
import { getPopularList } from "../../api/popularList";

const UserSelf = () => {
  const { currentMember } = useAuth();
  const [activeTab, setActiveTab] = useState("tweets");
  const [tweets, setTweets] = useState([]);
  const [replies, setReplies] = useState([]);
  const [likes, setLikes] = useState([]);
  const [popularCards, setPopularCards] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!currentMember || !currentMember.id) {
        return;
      }
      const { id } = currentMember;

      try {
        const userTweets = await getUserTweets(id);
        //console.log(userTweets);
        setTweets(userTweets.map((tweet) => ({ ...tweet })));
      } catch (error) {
        console.error("获取用户推文失败：", error);
      }

      try {
        const userReplies = await getUserRepliedTweets(id);
        //console.log(userReplies);
        setReplies(userReplies.map((reply) => ({ ...reply })));
      } catch (error) {
        console.error("獲取用戶資料失败：", error);
      }

      try {
        const userLikes = await getUserLikes(id);
        //console.log(userLikes);
        setLikes(userLikes.map((like) => ({ ...like })));
      } catch (error) {
        console.error("获取用户喜欢的推文失败：", error);
      }
      try {
        const popularCards = await getPopularList();
        setPopularCards(popularCards.map((users) => ({ ...users })));
      } catch (error) {
        console.error("获取热门列表失败：", error);
      }
    };
    fetchData();
  }, [currentMember]);

  return (
    <div className="mainContainer">
      <Navbar />
      <div className="mainContent">
        <Header username="John Doe" tweetCount={25} />
        <div className="postSection">
          <UserInfo
            username="John Doe"
            accountName="heyjohn"
            bio="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. "
            followingCount={34}
            followersCount={59}
          />
        </div>
        <TabBar
          activePage="UserSelf"
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <hr />
        <div className="tweetsSection">
          {activeTab === "tweets" && (
            <UserTweetsList tweets={tweets} className="tweetsSection" />
          )}
          {activeTab === "replies" && (
            <UserRepliesList replies={replies} className="tweetsSection" />
          )}
          {activeTab === "likes" && (
            <UserLikesList likes={likes} className="tweetsSection" />
          )}
        </div>
      </div>
      <PopularList popularCards={popularCards} />
    </div>
  );
};

export default UserSelf;
