import { FunctionComponent } from 'react'
import JenkinsDetailedLink from '../../components/credentials/jenkins'
import GiteaDetailedLink from '../../components/credentials/gitea'
import GitlabDetailedLink from '../../components/credentials/gitlab'
import AwxDetailedLink from '../../components/credentials/awx'
import VscodeserverDetailedLink from '../../components/credentials/vscodeserver'
import KeptnBridgeDetailedLink from '../../components/credentials/keptn-bridge'
import KeptnApiDetailedLink from '../../components/credentials/keptn-api'
import DynatraceDetailedLink from '../../components/credentials/dynatrace'

const AceBoxLinks: FunctionComponent<any> = () =>
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
          <JenkinsDetailedLink />
          <GiteaDetailedLink />
          <GitlabDetailedLink />
          <AwxDetailedLink />
          <VscodeserverDetailedLink />
          <KeptnBridgeDetailedLink />
          <KeptnApiDetailedLink />
          <DynatraceDetailedLink />
        </table>
      </div>
    </div>

export { AceBoxLinks as default }
