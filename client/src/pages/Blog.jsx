import md from "../blogs/test.md?raw";
import ReactMarkdown from "react-markdown";

export default function Blog() {
    return (
        <div className="text-white">
            <ReactMarkdown>
                {md}
            </ReactMarkdown>
        </div>
    )
}