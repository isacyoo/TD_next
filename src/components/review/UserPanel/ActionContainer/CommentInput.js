import { Textarea } from "@/components/ui/textarea"

export default function CommentInput({ comment, setComment }) {
    return (
        <div className="w-full">
            <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full h-24 resize-none mb-4"
            />
        </div>
    )
}