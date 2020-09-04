import React, { useState, useEffect } from 'react';

import SearchSection from './SearchSection'
import SalaryEntry from './SalaryEntry'

const axios = require('axios');

export interface ISalary {
    id: string;
    position: string;
    company: string;
    technologies: string[];
    description: string;
    location: string;
    salary: number;
    firstWorkDay: string;
    yearsWorked: number;
}

const MainContent: React.FC = () => {
    const [ salaries, setSalaries ] = useState<ISalary[]>([]);

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await axios.get('http://localhost:3333/api/salary/all');

                const updatedResponse = response.data.result.map((x: any) => ({
                    ...x,
                    technologies: [ "react", "test" ],
                    id: x._id,
                    company: "test company"
                }))

                setSalaries(updatedResponse);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSalaries();
    }, [])

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
