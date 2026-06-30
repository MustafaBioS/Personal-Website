import ReactMarkdown from "react-markdown"
import { useParams } from "react-router-dom";
import NotFound from "./404.jsx";

export default function BlogPage() {

    const { slug } = useParams();

    const blogs = import.meta.glob("../blogs/*.md", {
        eager: true,
        query: "?raw",
        import: "default",
    });

    const markdown = blogs[`../blogs/${slug}.md`];

    if (!markdown) {
        return <NotFound />;
    }

    return (
        <ReactMarkdown>
            {markdown}
        </ReactMarkdown>
    )
}