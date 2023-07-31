import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResultForm from './results/ResultForm';
import { getResultById, updateResult } from '../modules/resultManager';

const ResultEditPage = () => {
    const { resultId } = useParams();
    const [retrievedResult, setResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the result data based on the resultId from the URL
        getResultById(resultId)
            .then((result) => {
                // Once the result is fetched, set the content in the state
                setResult(result);
            })
            .catch((error) => {
                console.error('Error retrieving the result:', error.message);
            });
    }, [resultId]);

    const handleContentChange = (value) => {
        setResult((prevResult) => ({ ...prevResult, content: value }));
    };

    const handleUpdateResult = () => {
        // Call your API function to update the result
        updateResult(retrievedResult)
            .then(() => {
                navigate(`/challenge/${retrievedResult.challengeId}`);
            })
    };

    return (
        <div>
            <h2>Edit Result</h2>
            <ResultForm result={retrievedResult} onContentChange={handleContentChange} />
            <button onClick={handleUpdateResult}>Update</button>
        </div>
    );
};

export default ResultEditPage;
