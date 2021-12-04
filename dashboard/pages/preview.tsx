import { FunctionComponent } from 'react'
import Head from 'next/head'
import PreviewComponent from '../components/preview/index'
import PreviewProvider from '../components/preview/provider'
import CredentialProvider from '../components/credentials/provider'
import { getAwxCredentials } from '../libs/credentials'

const Preview: FunctionComponent<any> = ({ awx, staging, production, canary }) =>
  <PreviewProvider.Provider value={{ staging, production, canary }}>
    <CredentialProvider.Provider value={{ jenkins: {}, gitea: {}, gitlab: {}, awx, keptnBridge: {}, keptnApi: {}, dynatrace: {} ,vscodeserver:{} }}>
      <Head>
        <title>ACE Dashboard - Preview</title>
        <meta name="description" content="ACE Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PreviewComponent />
    </CredentialProvider.Provider>
  </PreviewProvider.Provider>

const getServerSideProps = async () => {
	const awx = getAwxCredentials()

  return {
    props: {
      awx,
      staging: {
        href: process.env.SIMPLENODEAPP_URL_STAGING
      },
      production: {
        href: process.env.SIMPLENODEAPP_URL_PRODUCTION
      },
      canary: {
        href: process.env.SIMPLENODEAPP_URL_CANARY
      }
    }
  }
}

export { Preview as default, getServerSideProps }
