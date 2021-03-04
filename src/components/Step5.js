import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { Trans, t } from "@lingui/macro";
import { withI18n } from "@lingui/react";
import CKEditor from "ckeditor4-react";
import { Link, useHistory } from "react-router-dom";
import {
  form as formAtom,
  ckeditorToolbar as ckeditorToolbarAtom,
} from "../datas/atoms";
import Header from "./Header";
import Steps from "./Steps";
import Save from "./Save";
import Modal from "./Modal";

const Step5 = ({ i18n }) => {
  let history = useHistory();
  const [form, setForm] = useRecoilState(formAtom);
  const ckeditorToolbar = useRecoilValue(ckeditorToolbarAtom);

  const { register, errors, getValues, setValue, handleSubmit } = useForm({
    defaultValues: {
      contactInfos: "",
      backupContactInfos: "",
    },
  });

  const onSubmit = (data) => {
    setForm({ ...form, step5: data });
    history.push("/step6");
  };

  function saveForm() {
    setForm({ ...form, step5: getValues() });
  }

  useEffect(() => {
    register("contactInfos", { required: true });
    register("backupContactInfos", { required: true });

    if (form.hasOwnProperty("step5")) {
      setForm({ ...form, step5: form.step5 });
      setValue("contactInfos", form.step5.contactInfos, {
        shouldValidate: true,
      });
      setValue("backupContactInfos", form.step5.backupContactInfos, {
        shouldValidate: true,
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="steps step-5 container-fluid">
      <Header />
      <Steps step={5} />
      <h2>
        <span>5. </span>
        <Trans>Contact information</Trans>
      </h2>
      <div
        className="col-md-12 pb-15 text-right"
        dangerouslySetInnerHTML={{
          __html: i18n._(
            t`Required fields are marked with an asterisk (<abbr class="red" title="Required fields">*</abbr>).`
          ),
        }}
      ></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <div className="col-sm-5 col-md-3">
            <label className="required">
              <Trans>
                How to contact the service in charge of the accessibility of
                your site?
              </Trans>
            </label>
            <Modal>
              <div
                dangerouslySetInnerHTML={{
                  __html: i18n._(t`
                <p>
                  Visitors to your site may have questions or comments about the
                  accessibility of your site. To give them a voice, you can
                  allow them to contact you in different ways: an e-mail
                  address, a contact form, a postal address or a telephone
                  number of the service in charge.
                </p>
                <p>
                  Remember to update this contact when your service changes or
                  when a contact link is no longer active on your site. If there
                  is no response, they will be able to go to your control
                  organisation.
                  </p>
                  `),
                }}
              ></div>
            </Modal>
          </div>
          <div className="col-sm-7 col-md-9">
            <CKEditor
              data={
                form.hasOwnProperty("step5") &&
                form.step5.contactInfos &&
                form.step5.contactInfos
              }
              type="classic"
              config={{
                toolbar: ckeditorToolbar,
                removePlugins : 'elementspath',
                startupFocus : true,
              }}
              onChange={(e) => {
                setValue("contactInfos", e.editor.getData());
              }}
            />
            {errors.contactInfos && errors.contactInfos.type === "required" && (
              <span className="error">
                <Trans>This field is required</Trans>
              </span>
            )}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-5 col-md-3">
            <label className="required">
              <Trans>
                In case of non-compliance, which organization to contact if this
                service does not respond?
              </Trans>
            </label>
            <Modal>
              <div
                dangerouslySetInnerHTML={{
                  __html: i18n._(t`
                  <p>
                    To find out the name of your guardianship authority, please contact your regulatory authority. For example, for the Federal State, it is the Federal Ombudsman.
                  </p>
                  `),
                }}
              ></div>
            </Modal>
          </div>

          <div className="col-sm-7 col-md-9">
            <CKEditor
              data={
                form.hasOwnProperty("step5") &&
                form.step5.backupContactInfos &&
                form.step5.backupContactInfos
              }
              type="classic"
              config={{
                toolbar: ckeditorToolbar,
                removePlugins : 'elementspath'
              }}
              onChange={(e) => {
                setValue("backupContactInfos", e.editor.getData());
              }}
            />
            {errors.backupContactInfos &&
              errors.backupContactInfos.type === "required" && (
                <span className="error">
                  <Trans>This field is required</Trans>
                </span>
              )}
          </div>
        </div>

        <div className="controls">
          <div>
            <Link to="/step4" className="btn prev">
              <Trans>Previous</Trans>
            </Link>
          </div>
          <div className="text-center">
            <Save saveForm={saveForm} />
          </div>
          <div className="text-right">
            <button type="submit" className="next">
              <Trans>Next</Trans>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withI18n()(Step5);
