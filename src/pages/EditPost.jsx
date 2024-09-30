import { PostForm, Container } from "../components/index";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import database from "../appwrite/database";

export default function EditPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      database
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            console.log(
              "EditPost:: error:: Not get Post data From the database"
            );
          }
        })
        .catch((error) => {
          console.log("EditPost:: error:: ", error);
        });
    } else {
      navigate("/");
    }
  }, [slug, setPost, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}
