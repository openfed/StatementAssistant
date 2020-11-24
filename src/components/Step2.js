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

const Step2 = ({ i18n }) => {
  let history = useHistory();
  const [form, setForm] = useRecoilState(formAtom);
  const ckeditorToolbar = useRecoilValue(ckeditorToolbarAtom);

  const {
    register,
    unregister,
    getValues,
    watch,
    errors,
    setValue,
    handleSubmit,
  } = useForm();

  const { workloadOrBurden, complianceStatus } = watch();

  const onSubmit = (data) => {
    setForm({ ...form, step2: data });
    history.push("/step3");
  };

  function saveForm() {
    setForm({ ...form, step2: getValues() });
  }

  useEffect(() => {
    register("workloadOrBurdenReason", { required: true });

    if (form.hasOwnProperty("step2")) {
      setForm({ ...form, step2: form.step2 });
      setValue("audit", form.step2.audit, {
        shouldValidate: true,
      });
      setValue("auditDepth", form.step2.auditDepth, {
        shouldValidate: true,
      });
      setValue("auditUrl", form.step2.auditUrl, {
        shouldValidate: true,
      });
      setValue("complianceStatus", form.step2.complianceStatus, {
        shouldValidate: true,
      });

      setTimeout(() => {
        if (form.step2.complianceStatus !== "full-compliance") {
          setValue("workloadOrBurden", form.step2.workloadOrBurden, {
            shouldValidate: true,
          });
          if (form.step2.workloadOrBurden === "yes") {
            setValue(
              "workloadOrBurdenReason",
              form.step2.workloadOrBurdenReason,
              {
                shouldValidate: true,
              }
            );
          }
        }
      }, 300);
    }

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (workloadOrBurden === "yes") {
      register("workloadOrBurdenReason", { required: true });
    } else {
      unregister("workloadOrBurdenReason");
    }
    // eslint-disable-next-line
  }, [workloadOrBurden]);

  useEffect(() => {
    if (complianceStatus !== "full-compliance") {
      register("workloadOrBurdenReason", { required: true });
    } else {
      unregister("workloadOrBurdenReason");
    }
    // eslint-disable-next-line
  }, [complianceStatus]);

  return (
    <div className="steps step-2 container-fluid">
      <Header />
      <Steps step={2} />
      <h2>
        <span>2. </span>
        <Trans>Level of compliance</Trans>
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
          <span className="label required col-sm-5 col-md-3 pt-0">
            <Trans>How did you analyze the accessibility of your site?</Trans>
          </span>

          <div className="col-sm-7 col-md-9">
            <div className="form-check">
              <input
                autoFocus
                required
                className="form-check-input"
                type="radio"
                name="audit"
                id="auditInternal"
                value="internal"
                ref={register({ required: true })}
              />
              <label className="form-check-label" htmlFor="auditInternal">
                <Trans>Internal audit</Trans>
              </label>
            </div>

            <div className="form-check">
              <input
                required
                className="form-check-input"
                type="radio"
                name="audit"
                id="auditExternal"
                value="external"
                ref={register({ required: true })}
              />
              <label className="form-check-label" htmlFor="auditExternal">
                <Trans>External audit</Trans>
              </label>
            </div>
            {errors.audit && errors.audit.type === "required" && (
              <span className="error">
                <Trans>This field is required</Trans>
              </span>
            )}
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-5 col-md-3">
            <span className="label required pt-0">
              <Trans>Was it a simplified or an in-depth audit?</Trans>
            </span>
            <span className="db help pt-25 pb-25">
              <Trans>
                Note that full compliance can only be verified through an audit
                in-depth
              </Trans>
            </span>
          </div>
          <div className="col-sm-7 col-md-9 mb-20">
            <div className="form-check">
              <input
                required
                className="form-check-input"
                type="radio"
                name="auditDepth"
                id="auditSimplified"
                value="simplified"
                ref={register({ required: true })}
              />
              <label className="form-check-label" htmlFor="auditSimplified">
                <Trans>Simplified</Trans>
              </label>
            </div>
            <div className="form-check">
              <input
                required
                className="form-check-input"
                type="radio"
                name="auditDepth"
                id="auditInDepth"
                value="inDepth"
                ref={register({ required: true })}
              />
              <label className="form-check-label" htmlFor="auditInDepth">
                <Trans>In-depth</Trans>
              </label>
            </div>
            {errors.auditDepth && errors.auditDepth.type === "required" && (
              <span className="error">
                <Trans>This field is required</Trans>
              </span>
            )}
          </div>
          <label htmlFor="auditUrl" className="required col-sm-5 col-md-3">
            <Trans>Link to your audit report</Trans>
          </label>
          <div className="col-sm-7 col-md-9">
            <input
              required
              type="text"
              id="auditUrl"
              name="auditUrl"
              ref={register({
                required: true,
                pattern: {
                  value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i,
                },
              })}
              className={errors.auditUrl ? "error" : ""}
            />
            {errors.auditUrl && errors.auditUrl.type === "required" && (
              <span className="error">
                <Trans>This field is required</Trans>
              </span>
            )}
            {errors.auditUrl && errors.auditUrl.type === "pattern" && (
              <span className="error">
                <Trans>The URL is invalid</Trans>
              </span>
            )}
          </div>
        </div>

        <div className="form-group row">
          <span className="label required col-sm-5 col-md-3 pt-0">
            <Trans>
              At what level of compliance with legislation your site has been
              evaluated?
            </Trans>
          </span>
          <div className="col-sm-7 col-md-9">
            <div className="form-check">
              <input
                required
                className="form-check-input"
                type="radio"
                name="complianceStatus"
                id="no-compliance"
                value="no-compliance"
                ref={register({ required: true })}
              />
              <label className="form-check-label" htmlFor="no-compliance">
                <Trans>Not in compliance</Trans>
              </label>
            </div>

            <div className="form-check">
              <input
                required
                className="form-check-input"
                type="radio"
                name="complianceStatus"
                id="partial-compliance"
                value="partial-compliance"
                ref={register({ required: true })}
              />
              <label className="form-check-label" htmlFor="partial-compliance">
                <Trans>In partial compliance</Trans>
              </label>
            </div>

            <div className="form-check">
              <input
                required
                className="form-check-input"
                type="radio"
                name="complianceStatus"
                id="full-compliance"
                value="full-compliance"
                ref={register({ required: true })}
              />
              <label className="form-check-label" htmlFor="full-compliance">
                <Trans>Full compliance</Trans>
              </label>
            </div>

            {errors.complianceStatus &&
              errors.complianceStatus.type === "required" && (
                <span className="error">
                  <Trans>This field is required</Trans>
                </span>
              )}
          </div>
        </div>

        {complianceStatus !== "full-compliance" && (
          <div className="form-group row">
            <div className="col-sm-5 col-md-3">
              <span className="label required pt-0">
                <Trans>
                  Does some of the non-accessible contents of your site
                  justified by an excessive workload or financial burden?
                </Trans>
              </span>
              <Modal>
                <div
                  dangerouslySetInnerHTML={{
                    __html: i18n._(t`
                  <p>
                    When the compliance of a site's content represents too great
                    a cost, too great a workload in view of the benefits it
                    could bring, we talk about a <strong>disproportionate burden</strong>. This
                    disproportionate burden cannot be mentioned lightly. Indeed,
                    Member States shall ensure that the public sector body
                    concerned takes into account relevant circumstances,
                    including the following:
                  </p>
                  <ul class="lower-alpha">
                    <li>
                      The size, resources and nature of the public sector body
                      concerned;
                    </li>
                    <li>
                      The estimated costs and benefits to the public sector body
                      concerned in relation to the estimated benefit to people
                      with disabilities, taking into account the frequency and
                      duration of use of the specific site or mobile
                      application.
                    </li>
                  </ul>
                  <p>
                    This information should therefore be assessed and provided
                    in their declaration.
                  </p>
                  `),
                  }}
                ></div>
              </Modal>
            </div>
            <div
              className={
                workloadOrBurden === "yes"
                  ? "col-sm-7 col-md-9 mb-20"
                  : "col-sm-7 col-md-9"
              }
            >
              <div className="form-check">
                <input
                  required
                  className="form-check-input"
                  type="radio"
                  name="workloadOrBurden"
                  id="workloadOrBurdenYes"
                  value="yes"
                  ref={register({ required: true })}
                />
                <label
                  className="form-check-label"
                  htmlFor="workloadOrBurdenYes"
                >
                  <Trans>Yes</Trans>
                </label>
              </div>
              <div className="form-check">
                <input
                  required
                  className="form-check-input"
                  type="radio"
                  name="workloadOrBurden"
                  id="workloadOrBurdenNo"
                  value="no"
                  ref={register({ required: true })}
                />
                <label
                  className="form-check-label"
                  htmlFor="workloadOrBurdenNo"
                >
                  <Trans>No</Trans>
                </label>
              </div>
              {errors.workloadOrBurden &&
                errors.workloadOrBurden.type === "required" && (
                  <span className="error">
                    <Trans>This field is required</Trans>
                  </span>
                )}
            </div>

            {workloadOrBurden === "yes" && (
              <>
                <label className="required col-sm-5 col-md-3 pt-40">
                  <Trans>
                    How do you explain the disproportionate burden of complying
                    with this content?
                  </Trans>
                </label>
                <div className="col-sm-7 col-md-9 pt-40">
                  <CKEditor
                    data={
                      form.hasOwnProperty("step2") &&
                      form.step2.workloadOrBurdenReason &&
                      form.step2.workloadOrBurdenReason
                    }
                    type="classic"
                    config={{
                      toolbar: ckeditorToolbar,
                      removePlugins: "elementspath",
                    }}
                    onChange={(e) => {
                      setValue("workloadOrBurdenReason", e.editor.getData());
                    }}
                  />
                  {errors.workloadOrBurdenReason &&
                    errors.workloadOrBurdenReason.type === "required" && (
                      <span className="error">
                        <Trans>This field is required</Trans>
                      </span>
                    )}
                </div>
              </>
            )}
          </div>
        )}
        <div className="controls">
          <div>
            <Link to="/step1" className="btn prev">
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

export default withI18n()(Step2);
