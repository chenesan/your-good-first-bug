import React from 'react';
import ThreeBars from './icons/three-bars';

function MenuButton(props) {
  return (
    <div
      className={`menu-button${props.showSideBarButton ? ' -side' : ' -hide'}`}
      onClick={props.menuButtonClickHandler}
    >
      <ThreeBars width={30} height={40} className="icon" />
    </div>
  );
}

export default MenuButton;
