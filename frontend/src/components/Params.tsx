import React, { useState, useRef, useReducer } from 'react';

type ToogleActions =
    | { type: 'technologies' }
    | { type: 'companies' }
    | { type: 'map' }

interface Toogles {
    technologies: boolean;
    company: boolean;
    map: boolean;
}

const initToogle: Toogles = {
    technologies: false,
    company: false,
    map: false
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
        default:
            return initToogle;
    }
}

const Params: React.FC = () => {
    const [ toogle, dispatch ] = useReducer(handleToogles, initToogle)

    const [ technologies ] = useState<string[]>([
        "ReactJS", "Node.js", "C++", "JAVA"
    ]);
    const wrappertechnologies = useRef<HTMLDivElement>(null);

    return (
        <div id="parameters">
            <div id="technologies">
                <span
                    className="name-placeholder-technologies"
                    onClick={() => dispatch({ type: 'technologies' })}
                >Technologies</span>
                {toogle.technologies === true
                    ?
                    technologies.map((tech, i) => (
                        <div className="custom-control custom-checkbox" ref={wrappertechnologies}>
                            <input type="checkbox" className="custom-control-input" id={`checkbox-${tech}`} />
                            <label className="custom-control-label" htmlFor={`checkbox-${tech}`}>{tech}</label>
                        </div>
                    ))
                    : ''
                }
            </div>
        </div>
    );
}

export default Params;
