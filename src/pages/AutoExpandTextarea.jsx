import React, { useState, useRef, useEffect } from "react";

const AutoExpandTextarea = () => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    // This function adjusts the textarea height based on content
    const adjustTextareaHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height based on scrollHeight
      }
    };

    adjustTextareaHeight(); // Adjust height on initial render
  }, [content]); // Run useEffect whenever content changes

  const handleInput = (e) => {
    setContent(e.target.value); // Update the content state
  };

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={handleInput}
      rows="1" // Set an initial number of rows
      className="auto-expand-textarea" // You can add your custom class here
      style={{
        overflow: "hidden", // Prevents scrollbars from appearing
        resize: "none", // Disables manual resizing by the user
      }}
      placeholder="Type your text here..."
    />
  );
};

export default AutoExpandTextarea;
