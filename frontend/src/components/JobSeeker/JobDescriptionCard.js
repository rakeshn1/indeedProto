import React from 'react'
import Button from '../common/Button'

const JobDescriptionCard = () => {
    return (
        <div className="job-description-card-wrapper">
            <div className="job-description-header">
                <div className="job-title">
                    <div><span>Product Designer</span></div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="m15.536 7.8987c-0.1953-0.19526-0.5119-0.19526-0.7071 0l-2.8284 2.8284-2.8285-2.8284c-0.19526-0.19527-0.51185-0.19527-0.70711 0l-0.56568 0.56568c-0.19527 0.19526-0.19526 0.51185 0 0.70711l2.8285 2.8284-2.8285 2.8285c-0.19526 0.1952-0.19526 0.5118 0 0.7071l0.56568 0.5657c0.19527 0.1952 0.51185 0.1952 0.70711 0l2.8285-2.8285 2.8284 2.8284c0.1952 0.1953 0.5118 0.1953 0.7071 0l0.5657-0.5657c0.1952-0.1953 0.1952-0.5118 0-0.7071l-2.8284-2.8284 2.8283-2.8284c0.1953-0.19526 0.1953-0.51184 0-0.70711l-0.5656-0.56568z" />
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
                <div className="buttons-in-a-line-wrapper">

                    <Button
                        text="Apply now"
                        style={{
                            height: "40px",
                            width: "120px",
                            fontSize: "15px"
                        }}
                    />
                    <div className="heart-button">

                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="38" fill="currentColor" class="bi bi-heart" viewBox="-5 -3 25 25">
                                <path d="M12.38,2.25A4.49,4.49,0,0,0,9,3.82,4.49,4.49,0,0,0,5.63,2.25,4.08,4.08,0,0,0,1.5,6.38c0,2.83,2.55,5.15,6.41,8.66L9,16l1.09-1C14,11.52,16.5,9.21,16.5,6.38A4.08,4.08,0,0,0,12.38,2.25ZM9.08,13.91L9,14l-0.08-.08C5.35,10.68,3,8.54,3,6.38A2.56,2.56,0,0,1,5.63,3.75,2.93,2.93,0,0,1,8.3,5.52H9.7a2.91,2.91,0,0,1,2.67-1.77A2.56,2.56,0,0,1,15,6.38C15,8.54,12.65,10.68,9.08,13.91Z" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
            <div className="job-description-content-wrapper">

                <div>
                    <h6><b>Job details</b></h6>
                </div>

                <div>
                    <h6><b>Qualifications</b></h6>
                </div>

                <div>
                    <h6><b>Benifits</b></h6>
                </div>


                <div>
                    <h4><b>Full Job Description</b></h4>
                    <p>Moxtra provides a client engagement platform designed for the mobile era. Moxtra solutions deliver high-touch and personalized digital experiences to enhance client engagement and accelerate transactions. Founded by former WebEx co-founder and CEO Subrah Iyar and WebEx veteran Stanley Huang, Moxtra comes from a rich heritage in the collaboration space.</p>

                    <h6><b>Role</b></h6>
                    <h6><b>Responsibilities</b></h6>
                    <h6><b>Requirements</b></h6>
                    <h6><b>Perks</b></h6>
                    <h6><b>Pay</b></h6>

                    <h4><b>Full Job Description</b></h4>
                    <p>Moxtra provides a client engagement platform designed for the mobile era. Moxtra solutions deliver high-touch and personalized digital experiences to enhance client engagement and accelerate transactions. Founded by former WebEx co-founder and CEO Subrah Iyar and WebEx veteran Stanley Huang, Moxtra comes from a rich heritage in the collaboration space.</p>

                    <h6><b>Role</b></h6>
                    <h6><b>Responsibilities</b></h6>
                    <h6><b>Requirements</b></h6>
                    <h6><b>Perks</b></h6>
                    <h6><b>Pay</b></h6> <h4><b>Full Job Description</b></h4>
                    <p>Moxtra provides a client engagement platform designed for the mobile era. Moxtra solutions deliver high-touch and personalized digital experiences to enhance client engagement and accelerate transactions. Founded by former WebEx co-founder and CEO Subrah Iyar and WebEx veteran Stanley Huang, Moxtra comes from a rich heritage in the collaboration space.</p>

                    <h6><b>Role</b></h6>
                    <h6><b>Responsibilities</b></h6>
                    <h6><b>Requirements</b></h6>
                    <h6><b>Perks</b></h6>
                    <h6><b>Pay</b></h6>

                    <h4><b>Full Job Description</b></h4>
                    <p>Moxtra provides a client engagement platform designed for the mobile era. Moxtra solutions deliver high-touch and personalized digital experiences to enhance client engagement and accelerate transactions. Founded by former WebEx co-founder and CEO Subrah Iyar and WebEx veteran Stanley Huang, Moxtra comes from a rich heritage in the collaboration space.</p>

                    <h6><b>Role</b></h6>
                    <h6><b>Responsibilities</b></h6>
                    <h6><b>Requirements</b></h6>
                    <h6><b>Perks</b></h6>
                    <h6><b>Pay</b></h6>

                    <h4><b>Full Job Description</b></h4>
                    <p>Moxtra provides a client engagement platform designed for the mobile era. Moxtra solutions deliver high-touch and personalized digital experiences to enhance client engagement and accelerate transactions. Founded by former WebEx co-founder and CEO Subrah Iyar and WebEx veteran Stanley Huang, Moxtra comes from a rich heritage in the collaboration space.</p>

                    <h6><b>Role</b></h6>
                    <h6><b>Responsibilities</b></h6>
                    <h6><b>Requirements</b></h6>
                    <h6><b>Perks</b></h6>
                    <h6><b>Pay</b></h6>

                    <h4><b>Full Job Description</b></h4>
                    <p>Moxtra provides a client engagement platform designed for the mobile era. Moxtra solutions deliver high-touch and personalized digital experiences to enhance client engagement and accelerate transactions. Founded by former WebEx co-founder and CEO Subrah Iyar and WebEx veteran Stanley Huang, Moxtra comes from a rich heritage in the collaboration space.</p>

                    <h6><b>Role</b></h6>
                    <h6><b>Responsibilities</b></h6>
                    <h6><b>Requirements</b></h6>
                    <h6><b>Perks</b></h6>
                    <h6><b>Pay</b></h6>

                    <h4><b>Full Job Description</b></h4>
                    <p>Moxtra provides a client engagement platform designed for the mobile era. Moxtra solutions deliver high-touch and personalized digital experiences to enhance client engagement and accelerate transactions. Founded by former WebEx co-founder and CEO Subrah Iyar and WebEx veteran Stanley Huang, Moxtra comes from a rich heritage in the collaboration space.</p>

                    <h6><b>Role</b></h6>
                    <h6><b>Responsibilities</b></h6>
                    <h6><b>Requirements</b></h6>
                    <h6><b>Perks</b></h6>
                    <h6><b>Pay</b></h6>

                    <h4><b>Full Job Description</b></h4>
                    <p>Moxtra provides a client engagement platform designed for the mobile era. Moxtra solutions deliver high-touch and personalized digital experiences to enhance client engagement and accelerate transactions. Founded by former WebEx co-founder and CEO Subrah Iyar and WebEx veteran Stanley Huang, Moxtra comes from a rich heritage in the collaboration space.</p>

                    <h6><b>Role</b></h6>
                    <h6><b>Responsibilities</b></h6>
                    <h6><b>Requirements</b></h6>
                    <h6><b>Perks</b></h6>
                    <h6><b>Pay</b></h6>

                    <h4><b>Full Job Description</b></h4>
                    <p>Moxtra provides a client engagement platform designed for the mobile era. Moxtra solutions deliver high-touch and personalized digital experiences to enhance client engagement and accelerate transactions. Founded by former WebEx co-founder and CEO Subrah Iyar and WebEx veteran Stanley Huang, Moxtra comes from a rich heritage in the collaboration space.</p>

                    <h6><b>Role</b></h6>
                    <h6><b>Responsibilities</b></h6>
                    <h6><b>Requirements</b></h6>
                    <h6><b>Perks</b></h6>
                    <h6><b>Pay</b></h6>




                </div>

            </div>
        </div>
    )
}

export default JobDescriptionCard

//Liked Button
{/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 20 20">
<path d="M12,21.35L10.55,20C5.4,15.36,2,12.28,2,8.5A5.45,5.45,0,0,1,7.5,3,6,6,0,0,1,12,5.09,6,6,0,0,1,16.5,3,5.45,5.45,0,0,1,22,8.5c0,3.78-3.4,6.86-8.55,11.54Z" />
</svg> */}