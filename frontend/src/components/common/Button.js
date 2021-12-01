import React from 'react'

const Button = ({ text, onClick, style, disabled }) => {
    return (
        <div>
            <div className="button">
                <button disabled={disabled ? "disabled" : ""} style={style} onClick={onClick}>{text}</button>
            </div>
        </div>
    )
}

export default Button
// (e) => onChange(e.currentTarget.value)