import { FunctionComponent } from 'react'
import Head from 'next/head'
import LinksComponent from '../components/links/index'

import { getExtRefs } from '../components/ext-refs/lib'
import { ExtRefsContextProvider } from '../components/ext-refs/Context'

const Links: FunctionComponent<any> = ({ credentials, extRefs }) =>
  <ExtRefsContextProvider
    value={extRefs}
  >
    <Head>
      <title>ACE Dashboard - Links</title>
      <meta name="description" content="ACE Dashboard" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <LinksComponent />
  </ExtRefsContextProvider>

const getServerSideProps = async () => {

  const extRefs = getExtRefs()

  return {
    props: {
      extRefs
    }
  }
}

export { Links as default, getServerSideProps }
