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

const Step6 = ({ i18n }) => {
  let history = useHistory();
  const [form, setForm] = useRecoilState(formAtom);
  const ckeditorToolbar = useRecoilValue(ckeditorToolbarAtom);

  const { register, getValues, setValue, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setForm({ ...form, step6: data });
    history.push("/result");
  };

  function saveForm() {
    setForm({ ...form, step6: getValues() });
  }

  useEffect(() => {
    register("futurImprovementPlan", { required: true });
    register("freeText");

    if (form.hasOwnProperty("step6")) {
      setForm({ ...form, step6: form.step6 });
      setValue("futurImprovementPlan", form.step6.futurImprovementPlan, {
        shouldValidate: true,
      });
      setValue("freeText", form.step6.freeText, {
        shouldValidate: true,
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="steps step-7 container-fluid">
      <Header />
      <Steps step={6} />
      <h2>
        <span>6. </span>
        <Trans>In conclusion</Trans>
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
                What changes do you plan to make to improve the level of
                accessibility of your site?
              </Trans>
            </label>
            <Modal>
              <div
                dangerouslySetInnerHTML={{
                  __html: i18n._(t`
                  <p>
                  If you are planning to update your site or some of its
                  contents in the coming months, this will be an opportunity to
                  improve the accessibility of your site. It is interesting to
                  be able to communicate this to the citizens who visit your
                  site and thus show them your willingness to make your
                  information accessible to all.
                  </p>
                  `),
                }}
              ></div>
            </Modal>
          </div>
          <div className="col-sm-7 col-md-9">
            <CKEditor
              data={
                form.hasOwnProperty("step6") &&
                form.step6.futurImprovementPlan &&
                form.step6.futurImprovementPlan
              }
              type="classic"
              config={{
                toolbar: ckeditorToolbar,
                removePlugins : 'elementspath',
                startupFocus : true,
              }}
              onChange={(e) => {
                setValue("futurImprovementPlan", e.editor.getData());
              }}
            />
            {errors.futurImprovementPlan &&
              errors.futurImprovementPlan.type === "required" && (
                <span className="error">
                  <Trans>This field is required</Trans>
                </span>
              )}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-5 col-md-3">
            <Trans>
              Would you like to add something about the accessibility of your
              site that has not been addressed previously?
            </Trans>
          </label>

          <div className="col-sm-7 col-md-9">
            <CKEditor
              data={
                form.hasOwnProperty("step6") &&
                form.step6.freeText &&
                form.step6.freeText
              }
              type="classic"
              config={{
                toolbar: ckeditorToolbar,
                removePlugins : 'elementspath'
              }}
              onChange={(e) => {
                setValue("freeText", e.editor.getData());
              }}
            />
          </div>
        </div>

        <div className="controls">
          <div>
            <Link to="/step5" className="btn prev">
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

export default withI18n()(Step6);
