import React, { useState, useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner'

import SearchSection from './SearchSection';
import SalaryEntry from './SalaryEntry';
import ModalContext from './ModalContext';

const axios = require('axios');

export interface ISalary {
    _id: string;
    position: string;
    company: string;
    technologies: string[];
    description: string;
    location: string;
    employmentForm: employmentFormTypes;
    salary: number;
    salaryRate: SalaryRateTypes;
    firstWorkDay: Date;
    monthsWorked: number;
}

export type employmentFormTypes =
    | 'Plný úvazek (HPP)'
    | 'Poloviční úvazek'
    | 'Dohoda o provedení práce (DPP)'
    | 'Dohoda o provedení činnosti (DPČ)'

export type SalaryRateTypes =
    | 'hod'
    | 'MD'
    | 'měs'
    | 'rok'

const MainContent: React.FC = () => {
    const [ salaries, setSalaries ] = useState<ISalary[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);

    const { modal } = useContext(ModalContext);

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
    }, [ modal ])

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
