import React from "react";

const SearchBox = ({
  value,
  placeholder,
  onChange,
  icon,
  innerLabel,
  style,
  onFocus,
  onBlur,
  list,
}) => {
  return (
    <div className="search-box" style={style}>
      <div>
        <label style={{ minWidth: "0" }} htmlFor="">
          <b>{innerLabel}</b>
        </label>
      </div>
      <div className="input-search">
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => onChange(e.currentTarget.value)}
          type="text"
          placeholder={placeholder}
          value={value}
          list={list}
        />
      </div>
      <div>{icon}</div>
    </div>
  );
};

export default SearchBox;
