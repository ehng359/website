import React from "react";

interface NotifCardInterface {
    content: String
}

export default function NotifCard({ content }: NotifCardInterface) {
    return (
        <div className="flex flex-col items-center justify-center gap-y-2 ">
            <div className="h-1 w-10/12 bg-main">
            </div>
            {content}
            <div className="h-1 w-10/12 bg-main">
            </div>
        </div>
    )
}