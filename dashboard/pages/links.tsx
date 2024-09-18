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
