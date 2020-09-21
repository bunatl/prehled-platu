import React, { useState, useRef, useReducer, useEffect } from 'react';

type ToogleActions =
    | { type: 'technologies' }
    | { type: 'companies' }
    | { type: 'map' }
    | { type: 'sort' }

interface Toogles {
    technologies: boolean;
    company: boolean;
    map: boolean;
    sort: boolean;
}

const initToogle: Toogles = {
    technologies: false,
    company: false,
    map: false,
    sort: false
}

const handleToogles = (toogleState: Toogles, actions: ToogleActions) => {
    switch (actions.type) {
        case 'companies':
            return {
                ...toogleState,
                company: !toogleState.company
            };
        case 'technologies':
            return {
                ...toogleState,
                technologies: !toogleState.technologies
            };
        case 'map':
            return {
                ...toogleState,
                map: !toogleState.map
            };
        case 'sort':
            return {
                ...toogleState,
                sort: !toogleState.sort
            };
        default:
            return initToogle;
    }
}

const Params: React.FC = () => {
    const [ toogle, dispatch ] = useReducer(handleToogles, initToogle)

    // technologies
    const [ technologies ] = useState<string[]>([
        "ReactJS", "Node.js", "C++", "JAVA"
    ]);
    useEffect(() => {

    }, [])
    const wrapperTechnologies = useRef<HTMLDivElement>(null);

    // companies
    // companies will fecthed from DB - only top 10
    const [ companies ] = useState<string[]>([
        "Google", "Microsoft", "Oracle", "Tesla"
    ]);
    const wrapperCompanies = useRef<HTMLDivElement>(null);

    // wrapper map
    // const wrapperCompanies = useRef<HTMLDivElement>(null);

    interface Sorts {
        icon: string;
        text: string;
    }

    // sort
    const sorts: Sorts[] = [
        { icon: "", text: "Od nejvyššího" },
        { icon: "", text: "Od nejnižšího" }
    ];
    // const wrapperCompanies = useRef<HTMLDivElement>(null);

    return (
        <div id="parameters">
            <div id="technologies">
                <span
                    className="name-placeholder-technologies"
                    onClick={() => dispatch({ type: 'technologies' })}
                >Technologie</span>
                {toogle.technologies === true
                    ?
                    technologies.map((tech, i) => (
                        <div className="custom-control custom-checkbox" ref={wrapperTechnologies}>
                            <input type="checkbox" className="custom-control-input" id={`checkbox-${tech}`} />
                            <label className="custom-control-label" htmlFor={`checkbox-${tech}`}>{tech}</label>
                        </div>
                    ))
                    : ''
                }
            </div>

            <div id="companies">
                <span
                    className="name-placeholder-companies"
                    onClick={() => dispatch({ type: 'companies' })}
                >Společnosti</span>
                {toogle.company === true
                    ?
                    companies.map((company, i) => (
                        <div className="custom-control custom-checkbox" ref={wrapperCompanies}>
                            <input type="checkbox" className="custom-control-input" id={`checkbox-${company}`} />
                            <label className="custom-control-label" htmlFor={`checkbox-${company}`}>{company}</label>
                        </div>
                    ))
                    : ''
                }
            </div>

            <div id="map">
                <span
                    onClick={() => dispatch({ type: 'map' })}
                >Mapa</span>
                {toogle.map === true ? 'Map' : ''}
            </div>

            <div id="sort">
                <span
                    className="name-placeholder-sort"
                    onClick={() => dispatch({ type: 'sort' })}
                >Řadit</span>
                {toogle.sort === true
                    ?
                    sorts.map((sort, i) => (
                        <div key={i}>{sort.text}</div>
                    ))
                    : ''
                }
            </div>

        </div>
    );
}

export default Params;
