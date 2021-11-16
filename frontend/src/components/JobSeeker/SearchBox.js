import React from 'react'

const SearchBox = () => {
    return (
        <div>
            <div className="search-wrapper">
                <div className="search-box">
                    <div>
                        <label htmlFor=""><b>What</b></label>
                    </div>
                    <div className="input-search">
                        <input type="text" placeholder="job title, keywords, or company" />
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </div>
                </div>
                <div className="search-box">
                    <div>
                        <label htmlFor=""><b>Where</b></label>
                    </div>
                    <div className="input-search">
                        <input type="text" placeholder="San Jose, CA" />
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                        </svg>
                    </div>
                </div>
                <div className="find-jobs-button">
                    <button> Find jobs</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBox
