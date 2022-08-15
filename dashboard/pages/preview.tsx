import { FunctionComponent } from 'react'
import Head from 'next/head'
import PreviewComponent from '../components/preview/index'
import { getUseCases } from '../components/use-cases/lib'
import { UseCaseContextProvider } from '../components/use-cases/Context'

const Preview: FunctionComponent<any> = ({ useCases }) =>
  <UseCaseContextProvider value={useCases}>
    <Head>
      <title>ACE Dashboard - Preview</title>
      <meta name="description" content="ACE Dashboard" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <PreviewComponent />
  </UseCaseContextProvider>

const getServerSideProps = async () => {
  const useCases = getUseCases()

  return {
    props: {
      useCases
    }
  }
}

export { Preview as default, getServerSideProps }
