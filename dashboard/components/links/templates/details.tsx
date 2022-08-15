import { useState, FunctionComponent } from 'react'

type DetailsProps = {
  title: string
  href: string
  credentials?: any[]
}

const Details: FunctionComponent<DetailsProps> = ({ title, href, credentials }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isCredentialsPresent = !!credentials && Array.isArray(credentials) && credentials.length > 0 || false

  return (
    <tbody className={`expandable ${isExpanded ? "is-active" : ""}`}>
      <tr>
        <td>{title}</td>
        <td><a href={href} target="_blank" rel="noreferrer">{href}</a></td>
        <td>
          {
            isCredentialsPresent &&
              <button className="expandable__trigger" style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }} onClick={() => setIsExpanded(isExpanded => !isExpanded)}>more</button>
          }
        </td>
      </tr>
      <tr className="">
        {
          isExpanded &&
            <td colSpan={3}>
              <div style={{ display: "grid", gridTemplateColumns: "auto", rowGap: "10px" }}>
                {
                  isCredentialsPresent && (credentials || []).map((Credential, key) =>
                    Credential
                  )
                }
              </div>
            </td>
        }
      </tr>
    </tbody>
  )
}

export { Details as default }
