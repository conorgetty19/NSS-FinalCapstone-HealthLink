import React from 'react';

const ChallengeForm = ({ challenge, groups, onTitleChange, onDescriptionChange, onEndDateChange, onGroupChange, onSubmit }) => {
    return (
        <div>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                value={challenge.title}
                onChange={(e) => onTitleChange(e.target.value)}
            />

            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                value={challenge.description}
                onChange={(e) => onDescriptionChange(e.target.value)}
            />

            <label htmlFor="endDate">End Date:</label>
            <input
                type="datetime-local"
                id="endDate"
                value={challenge.endDateTime}
                onChange={(e) => onEndDateChange(e.target.value)}
            />

            <label htmlFor="group">Select Group:</label>
            <select id="group" onChange={(e) => onGroupChange(e.target.value)} value={challenge.groupId}>
                <option value="">Select a group</option>
                {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                        {group.title}
                    </option>
                ))}
            </select>

            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};

export default ChallengeForm;
