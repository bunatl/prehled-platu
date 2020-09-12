import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner'

import SearchSection from './SearchSection';
import SalaryEntry from './SalaryEntry';

const axios = require('axios');

export interface ISalary {
    _id: string;
    position: string;
    company: string;
    technologies: string[];
    description: string;
    location: string;
    salary: number;
    firstWorkDay: Date;
    monthsWorked: number;
}

interface IMainContent {
    fetchDatabase: boolean;
}

const MainContent: React.FC<IMainContent> = ({ fetchDatabase }) => {
    const [ salaries, setSalaries ] = useState<ISalary[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/salary/all`);

                setSalaries(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error(error.err);
            }
        }
        fetchSalaries();
    }, [ fetchDatabase ])

    return (
        <main>
            <SearchSection />
            {loading
                ? <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                : salaries.map((record, i) => (
                    <SalaryEntry key={i} salary={record} />
                ))}
        </main>
    );
}

export default MainContent;
