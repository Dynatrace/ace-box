import { FunctionComponent } from 'react'
import Head from 'next/head'
import HowToComponent from '../components/how-to/index'
import { UseCasesComponent } from '../components/use-cases/index'

import { getUseCases } from '../components/use-cases/lib'
import { UseCaseContextProvider } from '../components/use-cases/Context'
import { getExtRefs } from '../components/ext-refs/lib'
import { ExtRefsContextProvider } from '../components/ext-refs/Context'

const Home: FunctionComponent<any> = ({ credentials, useCases, extRefs }) =>
  <UseCaseContextProvider
    value={useCases}
  >
    <ExtRefsContextProvider
      value={extRefs}
    >
      <Head>
        <title>ACE Dashboard</title>
        <meta name='description' content='ACE Dashboard' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HowToComponent />
      <UseCasesComponent />
    </ExtRefsContextProvider>
  </UseCaseContextProvider>

const getServerSideProps = async () => {
  const useCases = getUseCases()
  const extRefs = getExtRefs()

  return {
    props: {
      useCases,
      extRefs
    }
  }
}

export {
  Home as default,
  getServerSideProps
}
