import AdminTweet from './adminTweet/AdminTweet';
import './AdminTweetList.scss';
import profileImg from '../../assets/img/canadian-girl.jpg';

const AdminTweetList = () => {
  const tweets = [
    {
      id: 1,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
    },
    {
      id: 2,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
    },
    {
      id: 3,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
    },
    {
      id: 4,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
    },
    {
      id: 5,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
    },
    {
      id: 6,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
    },
    {
      id: 7,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
    },
    {
      id: 8,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
    },
  ];

  return (
    <div className="adminTweetsListContainer">
      {tweets.map((tweet) => (
        <AdminTweet
          key={tweet.id}
          img={tweet.img}
          username={tweet.username}
          accountName={tweet.accountName}
          postTime={tweet.postTime}
          content={tweet.content}
        />
      ))}
    </div>
  );
};

export default AdminTweetList;
