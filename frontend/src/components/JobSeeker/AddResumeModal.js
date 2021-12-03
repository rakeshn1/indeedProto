import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
const AddResumeModal = (props) => {
    const [show, setShow] = useState(props.see);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Resume </Modal.Title>
                </Modal.Header>
                <Modal.Body>You do not have an uploaded resume. Please add a resume from the profile page.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setShow(false)}>
                        Add Resume
                    </Button>
                </Modal.Footer>
            </Modal>
            );
        </div>
    )
}

export default AddResumeModal
