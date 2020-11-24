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

const Step4 = ({ i18n }) => {
  let history = useHistory();
  const [form, setForm] = useRecoilState(formAtom);
  const ckeditorToolbar = useRecoilValue(ckeditorToolbarAtom);

  const {
    register,
    unregister,
    watch,
    getValues,
    setValue,
    errors,
    handleSubmit,
  } = useForm({
    defaultValues: {
      exemptionsBenefit: "",
      listNotScopeLigislation: "",
    },
  });

  const onSubmit = (data) => {
    setForm({ ...form, step4: data });
    history.push("/step5");
  };

  function saveForm() {
    setForm({ ...form, step4: getValues() });
  }

  const { exemptionsBenefit } = watch();

  useEffect(() => {
    register("exemptionsBenefit");
    register("listNotScopeLigislation");

    if (form.hasOwnProperty("step4")) {
      setForm({ ...form, step4: form.step4 });
      setValue("exemptionsBenefit", form.step4.exemptionsBenefit, {
        shouldValidate: true,
      });

      setTimeout(() => {
        if (form.step4.exemptionsBenefit === "yes") {
          setValue(
            "listNotScopeLigislation",
            form.step4.listNotScopeLigislation,
            {
              shouldValidate: true,
            }
          );
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (exemptionsBenefit === "yes") {
      register("listNotScopeLigislation", { required: true });
    } else {
      unregister("listNotScopeLigislation");
    }
    // eslint-disable-next-line
  }, [exemptionsBenefit]);

  return (
    <div className="steps step-4 container-fluid">
      <Header />
      <Steps step={4} />
      <h2>
        <span>4. </span>
        <Trans>Exemptions</Trans>
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
            <span className="label required pt-0">
              <Trans>
                Do you benefit from exemptions for some content on your site?
              </Trans>
            </span>
            <Modal>
              <div
                dangerouslySetInnerHTML={{
                  __html: i18n._(t`
                  <p>
                  Definition of <strong>exemption</strong>: Certain site content
                  may benefit from an exemption from the directive. For these,
                  you can then consider that they are compliant because they are
                  "non-correctable". It is however necessary to list them and
                  justify their exemption.
                  </p>
                  `),
                }}
              ></div>
            </Modal>
          </div>
          <div className="col-sm-7 col-md-9">
            <div className="form-check">
              <input
                autoFocus
                required
                className="form-check-input"
                type="radio"
                name="exemptionsBenefit"
                id="exemptionsBenefitYes"
                value="yes"
                ref={register({ required: true })}
              />
              <label
                className="form-check-label"
                htmlFor="exemptionsBenefitYes"
              >
                <Trans>Yes</Trans>
              </label>
            </div>
            <div className="form-check">
              <input
                required
                className="form-check-input"
                type="radio"
                name="exemptionsBenefit"
                id="exemptionsBenefitNo"
                value="no"
                ref={register({ required: true })}
              />
              <label className="form-check-label" htmlFor="exemptionsBenefitNo">
                <Trans>No</Trans>
              </label>
            </div>

            {errors.exemptionsBenefit &&
              errors.exemptionsBenefit.type === "required" && (
                <span className="error">
                  <Trans>This field is required</Trans>
                </span>
              )}
          </div>

          {exemptionsBenefit === "yes" && (
            <>
              <div className="col-sm-5 col-md-3 pt-40">
                <label className="required">
                  <Trans>
                    List the different contents of your site that benefit from
                    an exemption and specify the reasons for it
                  </Trans>
                </label>
                <Modal>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: i18n._(t`
                        <p>
                          <strong>Possible reasons for exemptions :</strong>
                        </p>
                        <p>
                          The Directive does not apply to the content of the
                          following sites and mobile applications:
                        </p>
                        <ul class="lower-alpha">
                          <li>
                            Office automation file formats published before
                            September 23, 2018, except where such content is
                            required for the purposes of active business processes
                            relating to tasks performed by the public sector body
                            concerned;
                          </li>
                          <li>
                            Pre-recorded time media published before September 23,
                            2020;
                          </li>
                          <li>Live temporal media ;</li>
                          <li>
                            Maps and online mapping services, as long as the
                            essential information is provided in a digitally
                            accessible form for navigational charts;
                          </li>
                          <li>
                            Third party content that is not funded or developed by,
                            and is not under the control of, the public sector body
                            concerned;
                          </li>
                          <li>
                            Reproductions of pieces from heritage collections that
                            cannot be made fully accessible due to:
                            <ul class="lower-roman">
                              <li>
                                the incompatibility of accessibility requirements
                                with the preservation of the item concerned or the
                                authenticity of the reproduction (e.g. in terms of
                                contrast);
                              </li>
                              <li>
                                the unavailability of automated and cost-effective
                                solutions that would allow the text of manuscripts
                                or other heritage collections to be easily
                                transcribed and rendered as content compatible with
                                accessibility requirements;
                              </li>
                            </ul>
                          </li>
                          <li>
                            The content of extranets and intranets, i.e. sites
                            that are accessible only to a restricted group of people
                            and not to the general public, published before
                            September 23, 2019 until such time as these sites are
                            substantially revised;
                          </li>
                          <li>
                            content of sites and mobile applications that are
                            considered to be archives, i.e. they only present
                            content that is not required for the purposes of active
                            business processes, nor updated or modified after
                            September 23, 2019.
                          </li>
                        </ul>
                      `),
                    }}
                  ></div>
                </Modal>
              </div>

              <div className="col-sm-7 col-md-9 pt-40">
                <CKEditor
                  data={
                    form.hasOwnProperty("step4") &&
                    form.step4.listNotScopeLigislation &&
                    form.step4.listNotScopeLigislation
                  }
                  type="classic"
                  config={{
                    toolbar: ckeditorToolbar,
                      removePlugins : 'elementspath'
                  }}
                  onChange={(e) => {
                    setValue("listNotScopeLigislation", e.editor.getData());
                  }}
                />

                {errors.listNotScopeLigislation &&
                  errors.listNotScopeLigislation.type === "required" && (
                    <span className="error">
                      <Trans>This field is required</Trans>
                    </span>
                  )}
              </div>
            </>
          )}
        </div>
        <div className="controls">
          <div>
            <Link
              to={
                form.hasOwnProperty("step2") &&
                form.step2.complianceStatus === "full-compliance"
                  ? "step2"
                  : "step3"
              }
              className="btn prev"
            >
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

export default withI18n()(Step4);
