import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Axio = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
                setError('Failed to fetch data. Please try again later.'); // Set error state
            }
        };
    
        fetchData();
    }, []);
    
    return (
        <div>
            <h1>Data from NestJS</h1>
            {error ? (
                <p>{error}</p> // Display error message
            ) : data ? (
                <p>{data.message}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Axio;