import { FunctionComponent } from 'react'
import Link from 'next/link'
import { VscodeserverLink, VscodeserverUsername, VscodeserverPassword } from '../credentials/vscodeserver'

type VscodeserverProps = {}

const Vscodeserver: FunctionComponent<VscodeserverProps> = () =>
  <div>
    <p><VscodeserverLink /> is a visual studio code web version. You can login with the password <VscodeserverPassword variant="inline" /> (You can find all 
    credentials under <Link href="/links">Links</Link>).</p>
  </div>

export { Vscodeserver as default }
