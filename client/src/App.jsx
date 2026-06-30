import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import NotFound from "./pages/404.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPage />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App