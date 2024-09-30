import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import database from "../appwrite/database";
import bucketService from "../appwrite/bucket";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
useSelector;

export default function Post() {
  const [imageSrc, setImageSrc] = useState("");
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      database
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log("Post:: Error:: ", error);
        });
    } else {
      navigate("/");
    }
  }, [navigate, slug]);

  useEffect(() => {
    if (post) {
      let isMounted = true; //track whether the component is mounted
      bucketService.getFilePreview(post.featuredImage).then((data) => {
        if (isMounted) {
          setImageSrc(data);
        }
      });
      return () => {
        isMounted = false;
      }; // cleanup function to set isMounted to false
    }
  }, [post]);

  const deletePost = () => {
    database.deletePost(post.$id).then((status) => {
      if (status) {
        bucketService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {imageSrc ? (
            <img src={imageSrc} alt={post.title} className="rounded-xl" />
          ) : (
            <div className="w-full h-32 bg-gray-300 rounded-xl"></div> // placeholder
          )}

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
