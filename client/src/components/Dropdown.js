import React, { useState } from "react";

export const Dropdown = (props) => {
  const themes = [
    "red",
    "blue",
    "green",
    "violet"
  ];

  const [showDrop, setShowDrop] = useState(false);
  const handleDropdown = () => {
    setShowDrop(!showDrop);
  };
  const handleSelect = (clr) =>{
    props.onChange(clr)
  }
  return (
    <div className="pos-rel">
      <button className="clr" data-clr={props.theme || "blue"} onClick={handleDropdown}></button>
      {showDrop && (
        <ul>
          {themes.map((item, idx)=>{
             return <li data-clr={item} key={item+idx} onClick={()=>handleSelect(item)} className={item}>
              </li>
          })}
        </ul>
      )}
    </div>
  );
};
