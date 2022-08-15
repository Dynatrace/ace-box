import { useEffect, useState, FunctionComponent } from "react"
import copy from "clipboard-copy"

const copyToClipboard = (value: any, setIsCopied: any): void => {
  copy(value)
  setIsCopied(true)
}

type AceBoxCredentialProps = {
  value: string | undefined
  type?: string
}

const AceBoxCredentialInline: FunctionComponent<AceBoxCredentialProps> = ({ value, type }) => {
  const isSecret = type === "password"

  const [isShown, setIsShown] = useState(!isSecret)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    let timeoutId: any = null

    if (isCopied) {
      timeoutId = setTimeout(() => {
        setIsCopied(false)
      }, 800)
    }
    
    return () => clearTimeout(timeoutId)
  }, [isCopied])

  return (
    <>
      <span style={{ backgroundColor: "#f2f2f2", padding: "4px 6px", borderRadius: "2px" }}>
        {
          isShown
            ? <>{value}</>
            : <>&bull;&bull;&bull;&bull;&bull;</>
        }
      </span>
      {
        isSecret &&
          <span style={{ marginLeft: "5px" }}>
            <button
              type="button"
              className="btn btn--secondary"
              style={{ border: "none", background: "none", padding: "0px", margin: "0px", height: "12px", lineHeight: "12px", fontSize: "12px" }}
              onClick={() => setIsShown(isShown => !isShown)}
            >
              {
                isShown
                  ? "Hide"
                  : "Show"
              } 
            </button>
          </span>
      }
      <span style={{ marginLeft: "5px" }}>
        <button
          type="button"
          className="btn btn--secondary"
          style={{ border: "none", background: "none", padding: "0px", margin: "0px", height: "12px", lineHeight: "12px", fontSize: "12px" }}
          onClick={() => copyToClipboard(value, setIsCopied)}
        >
          {
            isCopied
              ? "Copied!"
              : "Copy"
          }
        </button>
      </span>
    </>
  )

}

export { AceBoxCredentialInline as default }
