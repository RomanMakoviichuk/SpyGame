import React from "react";
import "./AppLayout.css";

export default function AppLayout({ children }) {
    return (
        <div className="app-layout">
            <video
                className="background-video"
                autoPlay
                loop
                muted
                playsInline
                src="public/assets/img/back-video.mp4"
                type="video/mp4"
            />
            <div className="content">{children}</div>
        </div>
    );
}
