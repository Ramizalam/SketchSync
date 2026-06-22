import React, { ReactElement } from "react";

interface Props {
  children: ReactElement;
  open: boolean
}

const Notification: React.FC<Props> = ({ children, open }) => {
  if (!open) return null;

  return (
    <div className="notification-overlay">
      <div className="notification-card">
        <h2 className="notification-title">✨ Event</h2>
        <div className="notification-body">
          {children}
        </div>
      </div>
    </div>
  );
}


export default React.memo(Notification);