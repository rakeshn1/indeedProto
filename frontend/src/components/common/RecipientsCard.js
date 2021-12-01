import React, { useState } from 'react'
import Modal from "@material-ui/core/Modal";
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    ListItemText,
    Grid,
    MenuItem
} from '@material-ui/core';
import axios from 'axios';
import Button from '../common/Button'
const RecipientsCard = (props) => {
    const [open, setOpen] = useState(false);
    const [messageText, setMessageText] = useState([])
    const [recipientData, setRecipientData] = useState([]);
    const data = props.data

    const handleCompose = (e) => {
        setMessageText(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(messageText)
        const message = {
            from: recipientData.companyId,
            details: messageText,
            timestamp: new Date().toISOString()
        }
        console.log(message)
        axios.put(`http://localhost:3900/employer/api/updateConversation/${recipientData._id}`, {
            message
        }).then(response => {
            console.log(response)
            if (response.status != 200) {
                alert({ html: response.statusText, classes: "#c62828 red darken-3" })
            }
            else {
                const datanew = Object.assign({}, recipientData, response.data)
                setRecipientData(datanew)
                setOpen(true)
            }
        })
        setMessageText([])
    }



    const handleOpen = (recipient) => {
        axios.get(`http://localhost:3900/employer/api/getConversation/${recipient._id}`, {
        }).then(response => {
            console.log(response)
            if (response.status != 200) {
                alert({ html: response.statusText, classes: "#c62828 red darken-3" })
            }
            else {
                setRecipientData(response.data[0]);
                setOpen(true)
                console.log(response.data[0].messages)
            }
        })
    };





    return (

        <div>
            <Grid
                container
                spacing={3}
                style={{ width: "1200px" }}
            >
                <Grid
                    item
                    lg={4}
                    md={4}
                    xs={12}
                >
                    {
                        data.map(recipient => {
                            return (
                                <div className="job-card-wrapper" onClick={() => handleOpen(recipient)}>
                                    <div className="job-title">
                                        <div><span>{recipient.firstName + " " + recipient.lastName}</span></div>
                                    </div>
                                    <div className="job-card-company-details">
                                        <span> <b> {new Date(recipient.updatedAt).toDateString()}</b>
                                        </span>
                                    </div>
                                </div >
                            )
                        })
                    }
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={8}
                    xs={12}
                >
                    <div>
                        <div className="recipient-description-card-wrapper">
                            {open && recipientData.length != 0 && recipientData.messages.map(message => {
                                return (

                                    <div style={{ textAlign: message.from == "619dbd6007f15d4f6bdd601e" ? "right" : "left" }}>

                                        <div>
                                            <div><b>{message.from == "619dbd6007f15d4f6bdd601e" ? "You" : recipientData.firstName + recipientData.lastName}</b>  <label size="small">{new Date(message.timestamp).toDateString()}</label></div>
                                        </div>
                                        <span >
                                            {message.details}
                                        </span>
                                    </div>
                                )
                            }

                            )}
                        </div>

                    </div>
                    <table>
                        <tr style={{ maxWidth: "100" }}>
                            <td>
                                <div className="chat-composer">
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            className="form-control"
                                            placeholder="Type & hit enter"
                                            onChange={handleCompose}
                                            value={messageText}
                                        />
                                    </form>
                                </div>
                            </td>
                            <td>
                                <Button type="submit" text="Send" ></Button>
                            </td>
                        </tr>
                    </table>
                </Grid>
            </Grid>
        </div >
    )
}

export default RecipientsCard