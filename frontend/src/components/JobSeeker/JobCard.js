import React from 'react'

const JobCard = () => {



    let cards = [];
    for (let i = 0; i < 10; i++) {
        cards.push(
            <div className="job-card-wrapper">
                <div className="job-title">
                    <div><span>Product Designer</span></div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                    </div>

                </div>

                <div className="job-card-company-details">

                    <span>Moxtra <b> 4.3 </b> <svg width='18' height='18' fill='currentColor' viewBox="5 0 18 22"
                        xmlns='http://www.w3.org/2000/svg'>
                        <path d='M8.805 4.134a.206.206 0 01.385 0l1.312 3.203 3.307.317c.184.018.258.257.12.385l-2.498 2.298.732 3.394c.04.188-.154.336-.312.238l-2.854-1.777-2.853 1.776c-.158.099-.352-.05-.311-.238l.736-3.393-2.497-2.298c-.139-.128-.065-.367.119-.385l3.307-.317 1.307-3.203z' />
                    </svg>
                    </span>
                </div>
                <div>
                    <p>
                        <span>
                            Cupertino, CA 95104
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 20">
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            </svg>
                            Remote</span>

                    </p>
                </div>
                <div className="job-card-salary">
                    <span>$ 135,000 a year</span>

                </div>
                <div className="job-card-role-summary">
                    <ul>

                        <li>

                            Refine ideas and come up with new ones to design a
                            highly polished visual experience.
                        </li>
                        <li>
                            Collaborate with other designers to help build a
                            strong design team and culture.
                        </li>

                    </ul>


                </div>

                <div className="job-card-posted-ago">
                    7 days ago
                </div>

            </div >
        )
    }

    return (
        <div className="cards-wrapper" >
            {
                cards.map(card => {
                    return card
                })
            }
        </div>
    )
}

export default JobCard
