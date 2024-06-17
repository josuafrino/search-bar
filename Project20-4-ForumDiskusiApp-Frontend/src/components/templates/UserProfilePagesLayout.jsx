import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserByUsername } from "../../api/userApi.js";
import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import HeadingText from "../atoms/HeadingText/index.jsx";
import AvatarPlaceHolder from "../atoms/AvatarPlaceholder/index.jsx";
import { getQuestionByUser } from "../../api/questionApi.js";
import Card from "../molecules/Card/index.jsx";
import CardPost from "../organisms/CardPost/index.jsx";
import Button from "../atoms/Button/index.jsx";
import { getCommentsByPostId } from "../../api/commentApi.js";
import {
  followUser,
  getFollowersUser,
  getFollowingUser,
  unfollowUser,
} from "../../api/followApi.js";
import Toasts from "../molecules/Toasts/index.jsx";
import Cookies from "js-cookie";

export default function UserProfilePagesLayout() {
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState({});
  const [follow, setFollow] = useState([]);
  const [getFollowers, setGetFollowers] = useState([]);
  const [getFollowing, setGetFollowing] = useState([]);
  const [showFollowSuccessToast, setShowFollowSuccessToast] = useState(false);
  const [showUnfollowSuccessToast, setShowUnfollowSuccessToast] =
    useState(false);
  const [showGuestToast, setShowGuestToast] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await getUserByUsername(id);
        const comments = {};
        const getFollowers = await getFollowersUser(fetchedUser.uuid);
        const getFollowing = await getFollowingUser(fetchedUser.uuid);
        for (let question of questions) {
          comments[question.uuid] = await getCommentsByPostId(question.uuid);
        }
        setFollow(follow);
        setGetFollowers(getFollowers);
        setGetFollowing(getFollowing);
        setComments(comments);
        setUser(fetchedUser);
        if (fetchedUser) {
          const fetchedQuestions = await getQuestionByUser(fetchedUser.uuid);
          setQuestions(fetchedQuestions);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id, questions]);

  const handleFollow = async () => {
    const token = Cookies.get("jwt");
    if (!token) {
      setShowGuestToast(true);
      return;
    }
    try {
      await followUser(user.uuid);
      setShowFollowSuccessToast(true);
      console.log("Followed user" + user.username);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    const token = Cookies.get("jwt");
    if (!token) {
      setShowGuestToast(true);
      return;
    }
    try {
      await unfollowUser(user.uuid);
      setShowUnfollowSuccessToast(true);
      console.log("Unfollowed user" + user.username);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <>
      <PagesLayout>
        <ContainerLayout>
          {user ? (
            <>
              <Card key={user.uuid} className="p-3 mb-3">
                <div className="d-md-flex justify-content-between">
                  <div className="d-grid d-md-flex gap-4 text-center text-md-start">
                    <AvatarPlaceHolder
                      src={user.avatar}
                      alt={user.username}
                      heightAvatar={150}
                      widthAvatar={150}
                      className="border border-2 rounded-circle border-primary img-fluid mx-auto mx-md-0"
                    />
                    <div>
                      <Card.Title className="fw-semibold text-primary mb-2">
                        {user.username}
                      </Card.Title>
                      <Card.Description className="fw-lighter mb-3 mb-md-0">
                        {user.name ? user.name : "(No name)"}
                      </Card.Description>
                      <div className="d-flex align-items-center mt-3 mb-3 gap-3 justify-content-center">
                        <Button
                          variant={`primary`}
                          className="rounded-3 pe-none btn-sm"
                        >
                          {getFollowers.count || 0} followers
                        </Button>
                        <Button
                          variant={`primary`}
                          className="rounded-3 pe-none btn-sm"
                        >
                          {getFollowing.count || 0} following
                        </Button>
                      </div>
                      <Card.Description className="fw-lighter mb-3 mb-md-0">
                        {user.bio ? user.bio : "No bio available"}
                      </Card.Description>
                    </div>
                  </div>
                  <div className="">
                    <Button
                      variant={"outline-primary"}
                      className="w-100 w-md-auto"
                      onClick={handleUnfollow}
                    >
                      Unfollow
                    </Button>
                  </div>
                  <div className="">
                    <Button
                      variant={"primary"}
                      className="w-100 w-md-auto"
                      onClick={handleFollow}
                    >
                      Follow
                    </Button>
                  </div>
                </div>
              </Card>
              {questions.length > 0 ? (
                questions.map((question) => (
                  <CardPost
                    key={question.uuid}
                    title={
                      <Link
                        to={`/question/${question.uuid}`}
                        className="text-decoration-none"
                      >
                        {question.title}
                      </Link>
                    }
                    topic={question.topic?.name}
                    description={question.body}
                    createdAt={new Date(question.createdAt).toLocaleString()}
                    username={question.createdBy.username}
                    avatarSrc={question.createdBy.avatar}
                    avatarAlt={question.createdBy.username}
                    votes={question.QuestionVotes.length}
                    answers={
                      comments[question.uuid]
                        ? comments[question.uuid].length
                        : 0
                    }
                    views={question.views || 0}
                    showImage={false}
                    showButtons={false}
                    className={"mb-3"}
                  />
                ))
              ) : (
                <Card>
                  <Card.Title className="d-flex align-items-center justify-content-center fw-semibold">
                    No posts available
                  </Card.Title>
                </Card>
              )}
            </>
          ) : (
            <HeadingText>User not found</HeadingText>
          )}
        </ContainerLayout>
      </PagesLayout>
      {showFollowSuccessToast && (
        <Toasts
          onClose={() => setShowFollowSuccessToast(false)}
          variant={"success"}
          variantBody={"success-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={"Follow successful."}
        />
      )}
      {showUnfollowSuccessToast && (
        <Toasts
          onClose={() => setShowUnfollowSuccessToast(false)}
          variant={"success"}
          variantBody={"success-subtle"}
          title={"Success"}
          titleColor={"white"}
          description={"Unfollow successful."}
        />
      )}
      {showGuestToast && (
        <Toasts
          onClose={() => setShowGuestToast(false)}
          variant={"danger"}
          variantBody={"danger-subtle"}
          title={"Failure"}
          titleColor={"white"}
          description={"Please log in to follow or unfollow."}
        />
      )}
    </>
  );
}
