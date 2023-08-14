import { FunctionComponent } from "react";
import { useExtRefs } from "../ext-refs/lib";
import AceBoxCredentialInline from "../ext-refs/templates/CredentialInlineTemplate";
import LinkTemplate from "../ext-refs/templates/LinkTemplate";

type KeptnProps = {};

const Keptn: FunctionComponent<KeptnProps> = () => {
  const { findUrl, findCreds } = useExtRefs();

  const url = findUrl("KEPTN");
  const username = findCreds("KEPTN", "USERNAME");
  const password = findCreds("KEPTN", "PASSWORD");

  return (
    <div>
      <p>
        <LinkTemplate href={url} label="Keptn" /> will play a central role in
        most of the use cases. Keptn is a control-plane for DevOps automation of
        cloud-native applications.
        {!!username && !!password && (
          <>
            It&apos;s <LinkTemplate href={url} label="Bridge" /> can be accessed
            using <AceBoxCredentialInline value={username?.value} /> and
            password{" "}
            <AceBoxCredentialInline type="password" value={password?.value} />.
          </>
        )}
      </p>
      <p>
        More infos can be found on{" "}
        <a href="https://keptn.sh" target="_blank" rel="noreferrer">
          keptn.sh
        </a>
        .
      </p>
    </div>
  );
};

export { Keptn as default };
