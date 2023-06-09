import React from "react";
import Tweet from "./tweetList/Tweet";
import grayLogo from "../../assets/logoGray.svg";

const TweetsList = () => {
  const tweets = [
    {
      id: 1,
      logo: <img src={grayLogo} alt="Logo" />,
      username: "John Doe",
      accountName: "@johndoe",
      postTime: "3小時",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor semper nisi, a lacinia magna dignissim in.",
      comments: 10,
      likes: 50,
    },
    {
      id: 1,
      logo: <img src={grayLogo} alt="Logo" />,
      username: "John Doe",
      accountName: "@johndoe",
      postTime: "3小時",
      content:
        "Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.",
      comments: 10,
      likes: 50,
    },
    {
      id: 1,
      logo: <img src={grayLogo} alt="Logo" />,
      username: "John Doe",
      accountName: "@johndoe",
      postTime: "3小時",
      content:
        "Quisque placerat odio non tellus pellentesque lacinia. Curabitur semper facilisis lectus.",
      comments: 10,
      likes: 50,
    },
    {
      id: 1,
      logo: <img src={grayLogo} alt="Logo" />,
      username: "John Doe",
      accountName: "@johndoe",
      postTime: "3小時",
      content:
        "Suspendisse ac ipsum ac odio euismod vestibulum ut ut dolor. Duis pulvinar scelerisque elit non fermentum.",
      comments: 10,
      likes: 50,
    },
    // 其他tweet的數據
  ];

  return (
    <div className="tweetsListContainer">
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          logo={tweet.logo}
          username={tweet.username}
          accountName={tweet.accountName}
          postTime={tweet.postTime}
          content={tweet.content}
          comments={tweet.comments}
          likes={tweet.likes}
        />
      ))}
    </div>
  );
};

export default TweetsList;
