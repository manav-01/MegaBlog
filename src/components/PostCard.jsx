/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import bucketService from "../appwrite/bucket";

export default function PostCard({ $id, title, featuredImage }) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    let isMounted = true; // track whether the component is mounted
    bucketService.getFilePreview(featuredImage).then((data) => {
      if (isMounted) {
        setImageSrc(data);
      }
    });
    return () => {
      isMounted = false;
    }; // cleanup function to set isMounted to false
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="rounded-xl" />
          
          ) : (
            <div className="w-full h-32 bg-gray-300 rounded-xl"></div> // placeholder
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

// The issue in your code is that bucketService.getFilePreview(featuredImage) likely returns a promise. You need to wait for the promise to resolve to get the URL for the image. In a functional component, you can handle this with the useState and useEffect hooks to manage the asynchronous logic.
