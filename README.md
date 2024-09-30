# MegaBlog – Blogging Web Application

### Overview

MegaBlog is a feature-rich blogging platform built for both **bloggers** and **readers**. The platform allows bloggers to create, edit, and manage their content seamlessly, while providing readers with an engaging and intuitive experience to explore and interact with blogs. Built using modern web development technologies, MegaBlog is designed to be fast, scalable, and user-friendly.

### Key Features

- **Blog Creation and Editing:** Bloggers can create and edit their posts using a rich-text editor.
- **Content Management:** Full CRUD (Create, Read, Update, Delete) operations for blogs.
- **User Authentication:** Secure login and registration with Appwrite.
- **Categories and Tags:** Organize blogs with categories and tags for better discoverability.
- **Reader Interaction:** Allow readers to comment and react to blogs.
- **Responsive Design:** Optimized for both mobile and desktop devices.
- **Efficient State Management:** Powered by `redux-toolkit` for efficient global state management.

### Tech Stack

- **Frontend Framework:** [React](https://reactjs.org/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Authentication & Backend Services:** [Appwrite](https://appwrite.io/)
- **Text Editor:** [TinyMCE](https://www.tiny.cloud/)
- **Form Handling:** [react-hook-form](https://react-hook-form.com/)
- **Routing:** [react-router-dom](https://reactrouter.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)

### Project Structure

```
/src
 ├── components/     # Reusable UI components
 ├── features/       # Redux slices and state management logic
 ├── pages/          # Main application pages (e.g., Home, BlogDetail, CreateBlog)
 ├── services/       # API calls and Appwrite integration
 ├── utils/          # Utility functions
 └── routes/         # Application routing configuration
```

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-link>
   ```

2. Navigate to the project directory:

   ```bash
   cd MegaBlog
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your `.env` file for Appwrite backend configuration and other necessary environment variables.

5. Start the development server:

   ```bash
   npm run dev
   ```

### Key Libraries

- **React**: Frontend library for building the user interface.
- **redux-toolkit**: Efficient state management solution.
- **Appwrite**: Self-hosted backend server for user authentication, database, and storage.
- **TinyMCE**: Rich-text editor used for blog post creation.
- **react-hook-form**: Flexible form handling library for managing forms with validation.
- **react-router-dom**: Routing library for navigating between pages.
- **Vite**: Fast build tool for modern web development.

### Running Locally

To run the project locally:

1. Ensure you have **Node.js** and **Appwrite** set up on your machine.
2. Set up the `.env` file with Appwrite project details and necessary API keys.
3. Use the command `npm run dev` to start the development server and explore the application.

### Contributing

Contributions are welcome! If you'd like to improve the project, feel free to fork the repository, make changes, and submit a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

### Links

- **Appwrite**: [Appwrite.io](https://appwrite.io/)
- **Redux Toolkit**: [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- **TinyMCE**: [TinyMCE Documentation](https://www.tiny.cloud/docs/)
- **Vite**: [Vite Documentation](https://vitejs.dev/)
