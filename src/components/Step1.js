import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import nl from "date-fns/locale/nl";
import fr from "date-fns/locale/fr";
import de from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";
import { Trans, t } from "@lingui/macro";
import { withI18n } from "@lingui/react";
import { Link, useHistory } from "react-router-dom";
import { language, form as formAtom } from "../datas/atoms";
import Header from "./Header";
import Steps from "./Steps";
import Save from "./Save";

const Step1 = ({ i18n }) => {
  let history = useHistory();

  // Register locale for the calendar
  registerLocale("nl", nl);
  registerLocale("fr", fr);
  registerLocale("de", de);

  const [form, setForm] = useRecoilState(formAtom);
  const lang = useRecoilValue(language);
  const [indexes, setIndexes] = useState([]);
  const [counter, setCounter] = useState(0);

  const {
    register,
    setValue,
    getValues,
    control,
    errors,
    handleSubmit,
  } = useForm({
    defaultValues: {
      guardianshipAuthority: "fed",
      dateCreationStatement: new Date(),
      dateUpdateStatement: new Date(),
    },
  });

  const onSubmit = (data) => {
    setForm({ ...form, step1: data });
    history.push("/step2");
  };

  const addApp = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeApp = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    // This create a bug
    // setCounter((prevCounter) => prevCounter - 1);
  };

  function saveForm() {
    setForm({ ...form, step1: getValues() });
  }

  useEffect(() => {
    if (form.hasOwnProperty("step1")) {
      setForm({ ...form, step1: form.step1 });
      setValue("organization", form.step1.organization, {
        shouldValidate: true,
      });

      const formPromise = form.step1.apps.forEach((i, index) => {
        setIndexes((prevIndexes) => [...prevIndexes, index]);
        setCounter(index + 1);
      });

      Promise.all([formPromise]).then(() => {
        setValue("apps", form.step1.apps, { shouldValidate: true });
      });

      setValue("guardianshipAuthority", form.step1.guardianshipAuthority, {
        shouldValidate: true,
      });
      setValue(
        "dateCreationStatement",
        new Date(form.step1.dateCreationStatement),
        {
          shouldValidate: true,
        }
      );
      setValue(
        "dateUpdateStatement",
        new Date(form.step1.dateUpdateStatement),
        {
          shouldValidate: true,
        }
      );
    } else {
      addApp();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="steps step-1 container-fluid">
      <Header />
      <Steps step={1} />
      <h2>
        <span>1. </span>
        <Trans>Identification</Trans>
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
          <label htmlFor="organization" className="required col-sm-5 col-md-3">
            <Trans>Name of your organization</Trans>
          </label>
          <div className="col-sm-7 col-md-9">
            <input
              autoFocus
              required
              type="text"
              id="organization"
              name="organization"
              ref={register({ required: true })}
              className={errors.organization ? "error" : ""}
            />
            {errors.organization && errors.organization.type === "required" && (
              <span className="error">
                <Trans>This field is required</Trans>
              </span>
            )}
          </div>
        </div>

        <fieldset className="row">
          <legend className="col-sm-12">
            <Trans>Site/Application</Trans>
          </legend>
          <ul className="apps-list col-sm-12">
            {indexes.map((index) => {
              return (
                <li key={index}>
                  <div className="form-group row">
                    <span className="label required col-sm-5 col-md-3 pt-10">
                      <Trans>Type</Trans>
                    </span>
                    <div className="col-sm-7 col-md-9 mb-10">
                      <div className="form-check">
                        <input
                          required
                          className="form-check-input"
                          type="radio"
                          name={`apps[${index}].app`}
                          id={`apps[${index}].site`}
                          value="site"
                          ref={register({ required: true })}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`apps[${index}].site`}
                        >
                          <Trans>Site</Trans>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          required
                          className="form-check-input"
                          type="radio"
                          name={`apps[${index}].app`}
                          id={`apps[${index}].app`}
                          value="app"
                          ref={register({ required: true })}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`apps[${index}].app`}
                        >
                          <Trans>Mobile application</Trans>
                        </label>
                      </div>
                      {errors.apps &&
                        errors.apps[index] &&
                        errors.apps[index].app &&
                        errors.apps[index].app.type === "required" && (
                          <span className="error">
                            <Trans>This field is required</Trans>
                          </span>
                        )}
                    </div>

                    <label
                      htmlFor={`apps[${index}].url`}
                      className="required col-sm-5 col-md-3"
                    >
                      <Trans>URL</Trans>
                    </label>
                    <div className="col-sm-7 col-md-9">
                      <input
                        required
                        type="url"
                        name={`apps[${index}].url`}
                        id={`apps[${index}].url`}
                        className={
                          errors.apps &&
                          errors.apps[index] &&
                          errors.apps[index].url
                            ? "error"
                            : ""
                        }
                        ref={register({
                          required: true,
                        })}
                      />

                      {errors.apps &&
                        errors.apps[index] &&
                        errors.apps[index].url &&
                        errors.apps[index].url.type === "required" && (
                          <span className="error">
                            <Trans>This field is required</Trans>
                          </span>
                        )}
                      {errors.apps &&
                        errors.apps[index] &&
                        errors.apps[index].url &&
                        errors.apps[index].url.type === "pattern" && (
                          <span className="error">
                            <Trans>The URL is invalid</Trans>
                          </span>
                        )}
                    </div>

                    {indexes.length > 1 && (
                      <div className="remove">
                        <button type="button" onClick={removeApp(index)}>
                          <Trans>Remove</Trans>
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="db mb-35">
            <button type="button" className="full" onClick={addApp}>
              <Trans>Add a site or application</Trans>
            </button>
          </div>
        </fieldset>

        <div className="form-group row">
          <label htmlFor="guardianshipAuthority" className="required col-sm-5 col-md-3">
            <Trans>Name of your guardianship authority</Trans>
          </label>

          {/* React doesn't accept an obj in <option> so we need to use the alternative i18n t() */}
          <div className="col-sm-7 col-md-9">
            <select
              required
              name="guardianshipAuthority"
              id="guardianshipAuthority"
              ref={register({ required: true })}
              className={errors.guardianshipAuthority ? "error" : ""}
            >
              <option value="fed">{i18n._(t`Federal State`)}</option>
              <option value="flemReg">{i18n._(t`Flemish Region`)}</option>
              <option value="walReg">{i18n._(t`Walloon Region`)}</option>
              <option value="bruReg">
                {i18n._(t`Brussels-Capital Region`)}
              </option>
              <option value="walBruFed">
                {i18n._(t`Wallonia-Brussels Federation`)}
              </option>
              <option value="freComCom">
                {i18n._(t`French Community Commission `)}
              </option>
              <option value="gerCom">
                {i18n._(t`German-speaking Community`)}
              </option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="dateCreationStatement" className="required col-sm-5 col-md-3">
            <Trans>Date of the creation of your statement</Trans>
          </label>
          <div className="col-sm-7 col-md-9">
            <Controller
              control={control}
              name="dateCreationStatement"
              rules={{ required: true }}
              render={({ onChange, onBlur, value }) => (
                <ReactDatePicker
                  required
                  autocomplete="off"
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  locale={lang}
                  dateFormat="dd/MM/yyyy"
                  id="dateCreationStatement"
                  className={errors.dateCreationStatement ? "error" : ""}
                />
              )}
            />

            {errors.dateCreationStatement &&
              errors.dateCreationStatement.type === "required" && (
                <span className="error">
                  <Trans>This field is required</Trans>
                </span>
              )}
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-5 col-md-3">
            <label htmlFor="dateUpdateStatement" className="required">
              <Trans>Date of the last update of your statement</Trans>
            </label>
            <span className="db pt-25 help">
              <Trans>
                If this is your first statement, note the same date as above.
              </Trans>
            </span>
          </div>
          <div className="col-sm-7 col-md-9">
            <Controller
              control={control}
              name="dateUpdateStatement"
              rules={{ required: true }}
              render={({ onChange, onBlur, value }) => (
                <ReactDatePicker
                  required
                  autocomplete="off"
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                  locale={lang}
                  dateFormat="dd/MM/yyyy"
                  id="dateUpdateStatement"
                  className={errors.dateUpdateStatement ? "error" : ""}
                />
              )}
            />

            {errors.dateUpdateStatement &&
              errors.dateUpdateStatement.type === "required" && (
                <span className="error">
                  <Trans>This field is required</Trans>
                </span>
              )}
          </div>
        </div>
        <div className="controls">
          <div>
            <Link to="/" className="btn prev">
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

export default withI18n()(Step1);
