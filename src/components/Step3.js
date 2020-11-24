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

const Step3 = ({ i18n }) => {
  let history = useHistory();
  const [form, setForm] = useRecoilState(formAtom);
  const ckeditorToolbar = useRecoilValue(ckeditorToolbarAtom);

  const { register, getValues, errors, setValue, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setForm({ ...form, step3: data });
    history.push("/step4");
  };

  function saveForm() {
    setForm({ ...form, step3: getValues() });
  }

  useEffect(() => {
    if (
      form.hasOwnProperty("step2") &&
      form.step2.complianceStatus === "full-compliance"
    ) {
      history.push("/step4");
    }
    register("nonAccesiblePart", { required: true });
    register("nonAccesiblePartAlternative", { required: true });

    if (form.hasOwnProperty("step3")) {
      setForm({ ...form, step3: form.step3 });
      setValue("nonAccesiblePart", form.step3.nonAccesiblePart, {
        shouldValidate: true,
      });
      setValue(
        "nonAccesiblePartAlternative",
        form.step3.nonAccesiblePartAlternative,
        {
          shouldValidate: true,
        }
      );
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="steps step-3 container-fluid">
      <Header />
      <Steps step={3} />
      <h2>
        <span>3. </span>
        <Trans>Non-accessible content</Trans>
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
              Specify how certain parts of your site are not or partially
              compliant with the accessibility criteria
            </Trans>
          </label>
            <Modal>
              <div
                dangerouslySetInnerHTML={{
                  __html: i18n._(t`
                  <p>
                    You can rely on the accessibility audit of your site in order to resume the resulting list of errors. Be careful, this list will appear as is in your declaration. Therefore, please make it as comprehensible as possible.
                  </p>
                  `),
                }}
              ></div>
            </Modal>
          </div>

          <div className="col-sm-7 col-md-9">
            <CKEditor
              data={
                form.hasOwnProperty("step3") &&
                form.step3.nonAccesiblePart &&
                form.step3.nonAccesiblePart
              }
              type="classic"
              config={{
                toolbar: ckeditorToolbar,
                removePlugins : 'elementspath',
                startupFocus : true,
              }}
              onChange={(e) => {
                setValue("nonAccesiblePart", e.editor.getData());
              }}
            />
            {errors.nonAccesiblePart &&
              errors.nonAccesiblePart.type === "required" && (
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
                What alternatives can you offer to the visitors of your
                site/application to allow them to access this content?
              </Trans>
            </label>
            <Modal>
              <div
                dangerouslySetInnerHTML={{
                  __html: i18n._(t`
                  <p>
                  While waiting to be able to correct certain non-compliant
                  content or when you mention an exemption or a disproportionate
                  burden, you can propose <strong>alternatives</strong> to
                  improve the access of any citizen to the information located
                  on your site. These alternatives can be very varied: a
                  different link to the same information, an additional helpline
                  for people with disabilities, help for users of assistive
                  technology, etc.
                  </p>
                  `),
                }}
              ></div>
            </Modal>
          </div>

          <div className="col-sm-7 col-md-9">
            <CKEditor
              data={
                form.hasOwnProperty("step3") &&
                form.step3.nonAccesiblePartAlternative &&
                form.step3.nonAccesiblePartAlternative
              }
              type="classic"
              config={{
                toolbar: ckeditorToolbar,
                removePlugins : 'elementspath'
              }}
              onChange={(e) => {
                setValue("nonAccesiblePartAlternative", e.editor.getData());
              }}
            />
            {errors.nonAccesiblePartAlternative &&
              errors.nonAccesiblePartAlternative.type === "required" && (
                <span className="error">
                  <Trans>This field is required</Trans>
                </span>
              )}
          </div>
        </div>
        <div className="controls">
          <div>
            <Link to="/step2" className="btn prev">
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

export default withI18n()(Step3);
