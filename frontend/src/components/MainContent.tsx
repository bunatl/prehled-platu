import React, { useState, useEffect } from 'react';

import SearchSection from './SearchSection';
import SalaryEntry from './SalaryEntry';

const axios = require('axios');

export interface ISalary {
    id: string;
    position: string;
    company: string;
    technologies: string[];
    description: string;
    location: string;
    salary: number;
    firstWorkDay: Date;
    yearsWorked: number;
}

interface IMainContent {
    fetchDatabase: boolean;
}

const MainContent: React.FC<IMainContent> = ({ fetchDatabase }) => {
    const [ salaries, setSalaries ] = useState<ISalary[]>([]);

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/salary/all`);
                const updatedResponse = response.data.result.map((x: any) => ({
                    ...x,
                    // technologies: x.technologies[ 0 ].split(','),
                    id: x._id
                }))
                setSalaries(updatedResponse);
            } catch (error) {
                console.error(error.err);
            }
        }
        fetchSalaries();
    }, [ fetchDatabase ])

    return (
        <main>
            <SearchSection />
            {salaries.map((record, i) => (
                <SalaryEntry key={i} salary={record} />
            ))}
        </main>
    );
}

export default MainContent;
