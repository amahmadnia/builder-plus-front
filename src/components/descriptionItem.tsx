import React from "react";

export const DescriptionItem = ({title, content}: { title: string, content: React.ReactNode }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);