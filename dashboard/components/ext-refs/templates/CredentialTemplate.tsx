import { useEffect, useState, FunctionComponent } from "react"
import copy from "clipboard-copy"

const copyToClipboard = (value: any, setIsCopied: any): void => {
  copy(value)
  setIsCopied(true)
}

type AceBoxCredentialProps = {
  value: string | undefined
  type?: string
  name: string
}

const AceBoxCredential: FunctionComponent<AceBoxCredentialProps> = ({ name, value, type }) => {
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
    <div>
      <label htmlFor={name} className="label" style={{ display: "flex", width: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          {name}
        </div>
        {
          isSecret &&
            <div style={{ marginLeft: "5px" }}>
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
            </div>
        }
        <div style={{ marginLeft: "5px" }}>
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
        </div>
      </label>
      <input disabled type={isShown ? "text" : "password"} className="inputfield" value={value} style={{ color: "inherit" }} id={name} />
    </div>
  )
}

export { AceBoxCredential as default }
