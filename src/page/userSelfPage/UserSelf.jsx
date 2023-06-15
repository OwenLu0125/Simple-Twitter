import { useEffect, useState } from "react";
import { getUserTweets } from "../../api/tweets";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../component/header/Header";
import Navbar from "../../component/navbar/Navbar";
import PopularList from "../../component/popularList/PopularList";
import TabBar from "../../component/tabBar/TabBar";
import UserInfo from "../../component/userInfo/UserInfo";
import UserTweetsList from "../../component/userTweetList/UserTweetList";
import "./UserSelf.scss";

const UserSelf = () => {
  const { currentMember } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [activeTab, setActiveTab] = useState("tweets");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (!currentMember || !currentMember.id) {
      return;
    }
    
    const { id } = currentMember;

    const fetchUserTweets = async () => {
      try {
        const userTweets = await getUserTweets(id);
        console.log(userTweets);
        setTweets(userTweets.map((tweet) => ({ ...tweet })));
      } catch (error) {
        console.error("获取用户推文失败：", error);
      }
    };

    fetchUserTweets();
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
          <UserTweetsList tweets={tweets} className="tweetsSection" />
        </div>
      </div>
      <PopularList />
    </div>
  );
};

export default UserSelf;
