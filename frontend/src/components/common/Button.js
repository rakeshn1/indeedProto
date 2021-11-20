import React from 'react'

const Button = ({ text, onClick, style }) => {
    return (
        <div>
            <div className="button">
                <button style={style} onClick={onClick}>{text}</button>
            </div>
        </div>
    )
}

export default Button
