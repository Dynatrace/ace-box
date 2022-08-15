import React, { useState, FunctionComponent, useEffect } from 'react'
import { useExtRefs } from '../ext-refs/lib'
import Awx from './awx'
import Cloudautomation from './cloudautomation'
import Dynatrace from './dynatrace'
import Gitea from './gitea'
import Gitlab from './gitlab'
import Jenkins from './jenkins'
import Kubernetes from './kubernetes'

type ToolTabsProps = {}

const ToolTabs: FunctionComponent<ToolTabsProps> = () => {
  const { extRefs } = useExtRefs()

  const [activeTab, setActiveTab] = useState<any>(null)

  useEffect(() => {
    const isExtRefsDefined = Object.keys(extRefs).length > 0
    if (isExtRefsDefined) {
      const defaultExtRefName = Object.keys(extRefs)[0]
      setActiveTab(defaultExtRefName)
    }
  }, [extRefs])

  const howTos: {[key:string]:any} = {
    AWX: (
      <Awx />
    ),
    'CLOUD AUTOMATION': (
      <Cloudautomation />
    ),
    DYNATRACE: (
      <Dynatrace />
    ),
    GITEA: (
      <Gitea />
    ),
    GITLAB: (
      <Gitlab />
    ),
    JENKINS: (
      <Jenkins />
    ),
    KUBERNETES: (
      <Kubernetes />
    )
  }

  const isBuiltInHowTo = !!activeTab && activeTab.toUpperCase() in howTos

  return (
    <>
      <div className="tabs" style={{ marginBottom: "13px" }}>
        {
          Object.keys(extRefs).map((extRefName, key) => {
            const isActive = extRefName === activeTab

            return (
              <button
                key={key}
                className={`tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveTab(extRefName)}
              >
                {extRefName}
              </button>
            )
          })
        }
      </div>
      <div>
        {
          activeTab
            ? isBuiltInHowTo
              ? howTos[activeTab.toUpperCase()]
              : <div>
                  <p dangerouslySetInnerHTML={{ __html: extRefs[activeTab].description }} />
                </div>
            : <>No tools set up yet...</>
        }
      </div>
    </>
  )
}

type HowToProps = {}

const HowTo: FunctionComponent<HowToProps> = () => {
  return (
    <div>
      <>
        <h2>How-To</h2>
        <p>Welcome to your personal ACE Box! It comes with a set of already configured tools, code, pipelines, etc. to showcase a selection of cloud automation use cases.</p>
        <p>
          Before you get started, please familiarize yourself with the Dashboard you&apos;re currently looking at:
        </p>
        <ul>
          <li>A <b>How-To</b> gives you step-by-step instructions for each use case.</li>
          <li>As the name indicates, <b>Deployment Preview</b> shows you the currently deployed version of a demo application up in each stage. Don&apos;t worry, the error you&apos;re seeing is fine for now as the application is not deployed yet. You will fix this as part of one the first use cases.</li>
          <li><b>Links</b> lists tools and credentials that you will need while going through the use cases.</li>
        </ul>
        <p>
          In addition he following tools have been set up and configured (click on each tab to get an overview of what&apos;s been configured):
        </p>
      </>
      <ToolTabs />
    </div>
  )
}

export { HowTo as default }
