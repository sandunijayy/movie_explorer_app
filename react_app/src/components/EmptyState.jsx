import { Link } from "react-router-dom"
import { Film } from "lucide-react"

function EmptyState({ title, description, link, linkText }) {
    return (
        <div className="empty-state">
            <Film className="w-12 h-12 mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-muted-foreground">{description}</p>
            {link && linkText && (
                <Link to={link}>
                    <button className="px-4 py-2 mt-6 text-white rounded-md bg-primary">{linkText}</button>
                </Link>
            )}
        </div>
    )
}

export default EmptyState
