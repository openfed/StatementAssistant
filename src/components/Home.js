import React, { useState, useEffect } from "react";
import { Trans, t } from "@lingui/macro";
import { withI18n } from "@lingui/react";
import { Link, useHistory } from "react-router-dom";
import { form as formAtom, language, languageDisplay } from "../datas/atoms";
import { useSetRecoilState } from "recoil";
import Header from "./Header";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import CloseIcon from "./icons/close";

const InfoBox = withI18n()(({ i18n }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="info-box">
        <p>
          <Trans>
            Attention, some sites are not subject to the accessibility legislation. In this case, you do not need to fill out this declaration.
          </Trans>{" "}
          <a
            href="/modal"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            <Trans>Click here to check if this is your case.</Trans>
          </a>
        </p>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        closeIcon={CloseIcon}
        ariaLabelledby="modal-title"
      >
        <h2 id="modal-title">
          <Trans>Information</Trans>
        </h2>

        <div
          dangerouslySetInnerHTML={{
            __html: i18n._(t`
            <p>
              The Directive does not apply to the following sites and mobile
              applications:
            </p>
            <ul class="lower-alpha">
              <li>
                sites and mobile applications of public service broadcasters
                and their subsidiaries and of other bodies or their subsidiaries
                carrying out a public service broadcasting remit;
              </li>
              <li>
                sites and mobile applications of NGOs that do not provide
                essential services to the public, or services that specifically
                address the needs of or for persons with disabilities.
              </li>
            </ul>
            <p>
              If this is your case, you are not subject to the European directive
              and therefore not required to complete an accessibility declaration.
            </p>
            `),
          }}
        ></div>
      </Modal>
    </>
  );
});

const Home = ({ i18n }) => {
  let history = useHistory();
  const setForm = useSetRecoilState(formAtom);
  const setLang = useSetRecoilState(language);
  const setlanguageDisplay = useSetRecoilState(languageDisplay);

  function upload(e) {
    readFile(e.target.files[0])
      .then((content) => {
        setForm(JSON.parse(content));
        history.push("/step1");
      })
      .catch((error) => {
        alert("Error: this file is corrupted");
        console.log(error);
      });
  }

  function readFile(file) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  useEffect(() => {
    const location = window.location.href;
    const langUrl= location.split("?");

    // if we force the language, we also hide the language switcher
    if(langUrl.length > 1){
      setLang(langUrl[1]);
      setlanguageDisplay(false);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <InfoBox />
      <div className="home container-fluid">
        <Header />
        <p className="text-center presentation">
          <Trans>
            Welcome to your assistant! In a few clicks, you can now create the
            accessibility statement of your site or mobile application.
          </Trans>
        </p>

        <div className="wrapper">
          <h2>
            <Trans>Create your accessibility statement</Trans>
          </h2>
          <Link to="/step1" className="btn">
            <Trans>Create your statement</Trans>
          </Link>

          <form style={{ display: "none" }}>
            <label
              htmlFor="upload-as"
              className="db pt-0"
              style={{ lineHeight: 1 }}
            >
              <Trans>Upload an accessibility statement</Trans>
            </label>
            <input
              type="file"
              name="upload-as"
              id="upload-as"
              onChange={upload}
            />
            <input type="submit" value="upload" className="visually-hidden" />
          </form>
        </div>
      </div>
    </>
  );
}

export default withI18n()(Home);
