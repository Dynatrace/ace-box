/**
 * Copyright 2024 Dynatrace LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
