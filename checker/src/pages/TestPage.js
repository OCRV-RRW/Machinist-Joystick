import { useEffect, useState } from "react"

export function TestPage()
{
    const [number, setNumber] = useState(0)

    useEffect(() => {
        setNumber(localStorage.getItem('number'))
    },[])

    return (
        <>
        <div>It's test page.</div>
        <div>Current number: {number}</div>
        </>
    )
}