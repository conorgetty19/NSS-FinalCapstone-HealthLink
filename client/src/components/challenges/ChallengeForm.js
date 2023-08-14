import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

// Style for the form container
const pageStyle = {
    width: "300px",
    margin: "auto",
    marginTop: "40px",
    boxShadow: "0 10px 15px rgba(179, 179, 179, 0.7)",
    padding: "15px"
}

const ChallengeForm = ({ challenge, groups, onTitleChange, onDescriptionChange, onEndDateChange, onGroupChange, onSubmit }) => {
    return (
        <Form style={pageStyle}>
            <FormGroup>
                <Label htmlFor="title">Title:</Label>
                <Input
                    type="text"
                    id="title"
                    value={challenge.title}
                    onChange={(e) => onTitleChange(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description">Description:</Label>
                <Input
                    type="textarea"
                    id="description"
                    value={challenge.description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="endDate">End Date:</Label>
                <Input
                    type="datetime-local"
                    id="endDate"
                    value={challenge.endDateTime}
                    onChange={(e) => onEndDateChange(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="group">Select Group:</Label>
                <select id="group" onChange={(e) => onGroupChange(e.target.value)} value={challenge.groupId}>
                    <option value="">Select a group</option>
                    {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                            {group.title}
                        </option>
                    ))}
                </select>
            </FormGroup>
            <Button onClick={onSubmit} color="primary">Submit</Button>
        </Form>
    );
};

export default ChallengeForm;
