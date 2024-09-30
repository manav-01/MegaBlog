import { PostCard, Container } from "../components/index";
import { useState, useEffect } from "react";
import database from "../appwrite/database";

export default function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    database
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        } else {
          console.log("Page:: AllPost:: error:: Not get all  posts data ");
        }
      })
      .catch((error) => {
        console.log("AllPost:: error:: ", error);
      });
  }, [setPosts]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
