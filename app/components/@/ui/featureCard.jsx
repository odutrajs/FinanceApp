import React from "react";

const FeatureCard = ({ title, icon: Icon, description }) => {
  return (
    <div className="rounded-2xl text-card-foreground w-full max-w-md p-4 flex items-center justify-between gap-3 bg-white/80 backdrop-blur-sm shadow-md">
      <div className="flex gap-3">
        <div className="h-8 w-8 rounded-full flex items-center justify-center">
          <Icon className="h-8 w-8 text-green-700" />
        </div>
        <div className="space-y-0.5">
          <div className="text-lg font-semibold">{title}</div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};
export default FeatureCard;
