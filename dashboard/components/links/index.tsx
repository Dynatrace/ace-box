import { FunctionComponent } from 'react'
import { useExtRefs } from '../ext-refs/lib'
import AceBoxCredential from '../ext-refs/templates/CredentialTemplate'
import Details from './templates/details'

const AceBoxLinks: FunctionComponent<any> = () => {
  const { extRefs } = useExtRefs()

  return (
    <div>
      <h2>Links</h2>
      <div className="section">
        <table className="table table--expandable">
          <thead>
            <tr>
              <th></th>
              <th>URL</th>
              <th>Details</th>
            </tr>
          </thead>
          {
            Object.keys(extRefs).map((extRefName, key) => {
              const extRef = extRefs[extRefName]

              const credentials = extRef.creds?.map((credentialSet, credentialSetKey) => {
                return (
                  <AceBoxCredential
                    key={`${key}-${credentialSetKey}`}
                    name={credentialSet.description}
                    type={credentialSet.type}
                    value={credentialSet.value}
                  />
                )
              })

              return (
                <Details
                  key={key}
                  title={extRefName}
                  href={extRef.url}
                  credentials={credentials}
                />
              )
            })
          }
        </table>
      </div>
    </div>
  )
}

export { AceBoxLinks as default }
