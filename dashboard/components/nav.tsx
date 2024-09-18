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
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

type NavProps = {}

const Nav: FunctionComponent<NavProps> = () => {
  const { pathname } = useRouter()

  return (
    <div className="nav has-no-secondary">
      <div className="nav__brand nav__logo">
        <Link href='/' passHref>
          <a>
          <Image
            src="https://assets.dynatrace.com/global/logos/dynatrace-logo.svg"
            alt="Dynatrace"
            width="100%"
            height="24px"
          />
          </a>
        </Link>
      </div>
      <nav id="nav-bar-example1" className="nav__bar">
        <ul className="nav__list nav__list--primary">
          <li className={`nav__item ${pathname === '/' ? "is-current" : ""}`}>
            <Link href='/' passHref>
              <a className="nav__link">Home</a>
            </Link>
          </li>
          <li className={`nav__item ${pathname === '/preview' ? "is-current" : ""}`}>
            <Link href='/preview' passHref>
              <a className="nav__link">Deployment Preview</a>
            </Link>
          </li>
          <li className={`nav__item ${pathname === '/links' ? "is-current" : ""}`}>
            <Link href='/links' passHref>
              <a className="nav__link">Links</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export { Nav as default }
