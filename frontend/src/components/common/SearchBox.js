import React from 'react'

const SearchBox = ({ value, placeholder, onChange, icon, innerLabel, style }) => {
    return (

        <div className="search-box" style={style} >
            <div>
                <label style={{ minWidth: "0" }} htmlFor=""><b>{innerLabel}</b></label>
            </div>
            <div className="input-search">
                <input onChange={(e) => onChange(e.currentTarget.value)} type="text" placeholder={placeholder} value={value} />
            </div>
            <div>
                {icon}
            </div>
        </div>
    )
}

export default SearchBox
