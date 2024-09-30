/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index.js";
import bucketService from "../../appwrite/bucket.js";
import database from "../../appwrite/database.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const [imageSrc, setImageSrc] = useState("");
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (post) {
      let isMounted = true; // track whether the component is mounted
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

  const submit = async (data) => {
    // console.log("\n", data, "\n");

    if (post) {
      const file = data.image[0]
        ? await bucketService.uploadFile(data.image[0])
        : null;
      console.log("\n data image: ", data.image[0], "\n");

      if (file) {
        bucketService.deleteFile(post.featuredImage);
      }
      console.log("file",file)
      console.log("post",post)
      const dbPost = await database.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      console.log("dbPost ",post)
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      

      const file = await bucketService.uploadFile(data.image[0]);

      console.log("\n", userData, "\n");
      
      if (file) {
        
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await database.createPost({
          ...data,
          userId: userData.$id,
        });

        console.log(dbPost)

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            {imageSrc ? (
              <img src={imageSrc} alt={post.title} className="rounded-lg" />
            ) : (
              <div className="w-full h-32 bg-gray-300 rounded-lg">
                {post.title}
              </div> // placeholder
            )}
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
