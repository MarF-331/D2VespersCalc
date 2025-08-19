import "../Styles/Card.css"
import {useState, useRef} from "react";
import {
    chooseRandomCombination,
    decomposeNumberIntoValidIntegerFactors,
    getCombinationsForAddition, getCombinationsForMultiplication
} from "../Calculation/Calculation.tsx";


export default function Card() {
    const [activeMode, setActiveMode] = useState<number>(1)
    const [solution1, setSolution1] = useState<number[]>([])
    const [solution2, setSolution2] = useState<number[]>([])

    const numberRef = useRef<HTMLInputElement>(null)

    function handleClick(_mode: number) {
        setActiveMode(_mode)
        setSolution1([])
        setSolution2([])
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        resetSolutions()

        const input = numberRef.current?.value
        if (input) {
            const n = parseInt(input)
            console.log(n)
            if (activeMode === 1) {
                const solution= chooseRandomCombination(getCombinationsForAddition(n))
                setSolution1(solution)
            } else if (activeMode === 2) {
                const solution= chooseRandomCombination(getCombinationsForMultiplication(n))
                setSolution1(solution)
            } else if (activeMode === 3) {
                const entry = decomposeNumberIntoValidIntegerFactors(n).entries().next().value
                if (entry) {
                    const [factor1, factor2] = entry
                    const solution1 = chooseRandomCombination(getCombinationsForAddition(factor1))
                    const solution2 = chooseRandomCombination(getCombinationsForAddition(factor2))
                    setSolution1(solution1)
                    setSolution2(solution2)
                }
            }
        }
    }

    function resetSolutions(): void {
        setSolution1([])
        setSolution2([])
    }

    return (
        <section className={"card"}>
            <div className={"mode-selection"}>
                <div className={"mode-text"}>
                    <p>Select a mode</p>
                </div>
                <div className={"mode-buttons"}>
                    <button className={activeMode == 1 ? "active": ""} onClick={() => handleClick(1)}>Mode 1</button>
                    <button className={activeMode == 2 ? "active": ""} onClick={() => handleClick(2)}>Mode 2</button>
                    <button className={activeMode == 3 ? "active": ""} onClick={() => handleClick(3)}>Mode 3</button>
                </div>
            </div>
            <div className={"user-input"}>
                <div className={"user-input-text"}>
                    <p>Enter a number</p>
                </div>
                <div className={"user-input-entry"}>
                    <form onSubmit={handleSubmit}>
                        <input type={"number"} ref={numberRef}></input>
                        <button type={"submit"}>Calculate</button>
                    </form>
                </div>
            </div>
            <div className={"solution"}>
                <div className={"solution-text"}>
                    <p>Solution</p>
                </div>
                <SolutionCard solution1={solution1} solution2={solution2}/>
            </div>
        </section>
    );
}

function SolutionCard({solution1, solution2}: {solution1: number[], solution2: number[]}) {
    return (
        <div className={"solution-card"}>
            <p>You have to shoot:</p>
            {solution1 && solution1[0] ? <p>{solution1[0]}, {solution1[1]}, {solution1[2]}, {solution1[3]}</p> : <p>No combination found!</p>}
            {solution2 && solution2[0] && <p>{solution2[0]}, {solution2[1]}, {solution2[2]}, {solution2[3]}</p>}
        </div>
    );
}