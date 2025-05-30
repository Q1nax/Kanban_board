import React, { useEffect, useState } from 'react';
import { List_Types, FooterProps } from '../types';
import UserAvatar from "../images/user-avatar.png";

function useDelayUnmount(isMounted: boolean, delayTime: number): boolean {
    const [showDiv, setShowDiv] = useState<boolean>(false);
    
    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      if (isMounted && !showDiv) {
        setShowDiv(true);
      } else if (!isMounted && showDiv) {
        timeoutId = setTimeout(() => setShowDiv(false), delayTime);
      }
      return () => clearTimeout(timeoutId);
    }, [isMounted, delayTime, showDiv]);
    
    return showDiv;
}

const mountedcss: React.CSSProperties = { animation: "inAnimation 250ms" };
const unmountedcss: React.CSSProperties = { animation: "outAnimation 270ms" };

export const User: React.FC = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const showDiv = useDelayUnmount(isMounted, 250);

    const handleClick = () => {
        setIsMounted(!isMounted);
    };

    return (
      <div className="login_wrapper" onClick={handleClick}>
        <img src={UserAvatar} alt="user avatar" className="user_avatar" />
        <div className={isMounted ? 'icon isopen' : 'icon'} />
        {showDiv &&
          <div
            className="login_dropdown"
            style={isMounted ? mountedcss : unmountedcss}
          >
            <button className="login_dropdown_button">Profile</button>
            <button className="login_dropdown_button">Log Out</button>
          </div>
        }
      </div>
    );
};

export const Header: React.FC = () => {
    return(
        <header className="header">
            <h1 className="heading">Awesome Kanban Board</h1>
            <User />
        </header>
    );
};

export const Footer: React.FC<FooterProps> = ({ tasks }) => {
  const activeTasks = tasks.filter((task) => task.status === List_Types.Backlog);
  const finishedTasks = tasks.filter((task) => task.status === List_Types.Finished);
  
  return (
    <footer className="footer">
      <div className="footer_info">
        <div className="info">
          <p className="count">Active tasks: {activeTasks.length}</p>
          <p className="count">Finished tasks: {finishedTasks.length}</p>
        </div>
        <p className="info">Kanban board by Yurii, 2025</p>
      </div>
    </footer>
  );
};