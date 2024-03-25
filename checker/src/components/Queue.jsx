import "./Queue.css"

export function Queue({spotInLine})
{
    return(
        <>
        <div id="header-queue">Oчередь</div>
        <div className="spot-in-line-container">
        <p>
            Место в очереди:
        </p>
        <p id="spot-in-line">{spotInLine}</p>
        </div>
        </>
)
}