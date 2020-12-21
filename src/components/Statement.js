import React from "react";
import { Trans, Select, t } from "@lingui/macro";
import { withI18n } from "@lingui/react";

const Statement = ({ i18n, form, raw }) => {
  let apps = "MultipleAppsMultipleSites";

  knowHowManyAppsAndSites(form.step1.apps);

  function knowHowManyAppsAndSites(array) {
    let appCounter = 0;
    let siteCounter = 0;

    array.map((item) => {
      if (item.app === "app") {
        appCounter++;
      } else {
        siteCounter++;
      }
      return false;
    });

    if (appCounter === 1 && siteCounter === 0) {
      apps = "oneApp";
    } else if (appCounter > 1 && siteCounter === 0) {
      apps = "MultipleApps";
    } else if (appCounter === 0 && siteCounter === 1) {
      apps = "oneSite";
    } else if (appCounter === 0 && siteCounter > 1) {
      apps = "MultipleSites";
    } else if (appCounter === 1 && siteCounter === 1) {
      apps = "OneAppOneSite";
    } else if (appCounter === 1 && siteCounter > 1) {
      apps = "OneAppMultipleSites";
    } else if (appCounter > 1 && siteCounter === 1) {
      apps = "MultipleAppsOneSite";
    } else if (appCounter > 1 && siteCounter > 1) {
      apps = "MultipleAppsMultipleSites";
    } else {
      apps = "ERROR";
    }
  }

  function dateFormat(date) {
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(date);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    return `${da}/${mo}/${ye}`;
  }

  /*
    Every Heading are remplaced with <span class="h2"> for the preview to avoid error in the a11y checker
  */
  return (
    <>
      <h1>
        <Trans>Accessibility Statement</Trans>
      </h1>
      <p>
        <Select
          value={apps}
          oneApp={`${form.step1.organization}, undertakes to make this mobile application accessible, in accordance with the following legislation:`}
          MultipleApps={`${form.step1.organization}, undertakes to make these mobile applications accessible, in accordance with the following legislation:`}
          oneSite={`${form.step1.organization}, undertakes to make this site accessible, in accordance with the following legislation:`}
          MultipleSites={`${form.step1.organization}, undertakes to make these sites accessible, in accordance with the following legislation:`}
          OneAppOneSite={`${form.step1.organization}, undertakes to make this site and mobile application accessible, in accordance with the following legislation:`}
          OneAppMultipleSites={`${form.step1.organization}, undertakes to make these sites and mobile application accessible, in accordance with the following legislation:`}
          MultipleAppsOneSite={`${form.step1.organization}, undertakes to make this site and mobile applications accessible, in accordance with the following legislation:`}
          MultipleAppsMultipleSites={`${form.step1.organization}, undertakes to make these sites and mobile applications accessible, in accordance with the following legislation:`}
          other="Error"
        />{" "}
        {form.step1.guardianshipAuthority === "fed" && (
          <Trans>
            Law of July 19th 2018 regarding the accessibility of websites and
            mobile applications for government organisations
          </Trans>
        )}
        {form.step1.guardianshipAuthority === "flemReg" && (
          <Trans>Governing decree from December 7th 2018 (Flanders)</Trans>
        )}
        {form.step1.guardianshipAuthority === "walReg" && (
          <Trans>
            Decree of May 2nd 2019 regarding the accessibility of websites and
            mobile applications for government bodies (Walloon region)
          </Trans>
        )}
        {form.step1.guardianshipAuthority === "bruReg" && (
          <Trans>
            Ordinance regarding the accessibility of websites and mobile
            applications for regional government bodies and the municipalities
            (Brussels Capital Region)
          </Trans>
        )}
        {form.step1.guardianshipAuthority === "walBruFed" && (
          <Trans>
            Decree of May 3rd 2019 regarding the accessibility of websites and
            mobile applications for government organisations (Wallonia-Brussels
            Federation)
          </Trans>
        )}
        {form.step1.guardianshipAuthority === "freComCom" && (
          <Trans>
            Decree of May 9th 2019 regarding the accessibility of websites and
            mobile applications for government organisations of the French
            Community Commission
          </Trans>
        )}
        {form.step1.guardianshipAuthority === "gerCom" && (
          <Trans>
            Decree regarding the non-public and public electronic communication
            for governing bodies in the German speaking territory
          </Trans>
        )}
        .
      </p>
      <p>
        <Trans>This accessibility statement applies to:</Trans>
      </p>

      <ul>
        {form.step1.apps.map((app, index) => {
          return (
            <li key={index}>
              {app.app === "site" ? (
                <Trans>Site</Trans>
              ) : (
                <Trans>Mobile application</Trans>
              )}
              : <a href={app.url}>{app.url}</a>
            </li>
          );
        })}
      </ul>

      <h2>
        <Trans>Level of compliance</Trans>
      </h2>
      <p>
        {form.step2.complianceStatus === "full-compliance" && (
          <Select
            value={apps}
            oneApp="This mobile application is fully compliant as described below."
            MultipleApps="These mobile applications are fully compliant as described below."
            oneSite="This site is fully compliant as described below."
            MultipleSites="These sites are fully compliant as described below."
            OneAppOneSite="This site and mobile application are fully compliant as described below."
            OneAppMultipleSites="These sites and mobile application are fully compliant as described below."
            MultipleAppsOneSite="This site and mobile applications are fully compliant as described below."
            MultipleAppsMultipleSites="These sites and mobile applications are fully compliant as described below."
            other="Error"
          />
        )}

        {form.step2.complianceStatus === "partial-compliance" && (
          <Select
            value={apps}
            oneApp="This mobile application is in partial compliance as described below, due to the non-conformities and exemptions listed below."
            MultipleApps="These mobile applications are in partial compliance as described below, due to the non-conformities and exemptions listed below."
            oneSite="This site is in partial compliance as described below, due to the non-conformities and exemptions listed below."
            MultipleSites="These sites are in partial compliance as described below, due to the non-conformities and exemptions listed below."
            OneAppOneSite="This site and mobile application are in partial compliance as described below, due to the non-conformities and exemptions listed below."
            OneAppMultipleSites="These sites and mobile application are in partial compliance as described below, due to the non-conformities and exemptions listed below."
            MultipleAppsOneSite="This site and mobile applications are in partial compliance as described below, due to the non-conformities and exemptions listed below."
            MultipleAppsMultipleSites="These sites and mobile applications are in partial compliance as described below, due to the non-conformities and exemptions listed below."
            other="Error"
          />
        )}

        {form.step2.complianceStatus === "no-compliance" && (
          <Select
            value={apps}
            oneApp="This mobile application is not in compliance as described below. Non-compliances and exemptions are listed below."
            MultipleApps="These mobile applications are not in compliance as described below. Non-compliances and exemptions are listed below."
            oneSite="This site is not in compliance as described below. Non-compliances and exemptions are listed below."
            MultipleSites="These sites are not in compliance as described below. Non-compliances and exemptions are listed below."
            OneAppOneSite="This site and mobile application are not in compliance as described below. Non-compliances and exemptions are listed below."
            OneAppMultipleSites="These sites and mobile application are not in compliance as described below. Non-compliances and exemptions are listed below."
            MultipleAppsOneSite="This site and mobile applications are not in compliance as described below. Non-compliances and exemptions are listed below."
            MultipleAppsMultipleSites="These sites and mobile applications are not in compliance as described below. Non-compliances and exemptions are listed below."
            other="Error"
          />
        )}
      </p>

      {form.step2.audit !== "" && (
        <>
          <h2>
            <Trans>Preparing your statement</Trans>
          </h2>
          <p>
            <Select
              value={form.step2.audit}
              internal="An internal audit of the accessiblity has been made."
              external="An external audit of the accessiblity has been made."
              other="Error"
            />{" "}
            <Select
              value={form.step2.auditDepth}
              inDepth="This audit was an in depth analysis."
              simplified="This audit was a simplified analysis."
              other="Error"
            />
            {form.step2.auditUrl && (
              <>
                {" "}
                <Trans>You can review the report here:</Trans>{" "}
                <a href={form.step2.auditUrl}>{form.step2.auditUrl}</a>
              </>
            )}
          </p>
        </>
      )}

      {form.step2.workloadOrBurden === "yes" && (
        <>
          <h2>
            <Trans>Disproportionate burden</Trans>
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: form.step2.workloadOrBurdenReason,
            }}
          ></div>
        </>
      )}

      {form.hasOwnProperty("step3") && (
        <>
          <h2>
            <Trans>Non-accessible content</Trans>
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: form.step3.nonAccesiblePart,
            }}
          ></div>

          <h2>
            <Trans>Suggested alternatives</Trans>
          </h2>

          <div
            dangerouslySetInnerHTML={{
              __html: form.step3.nonAccesiblePartAlternative,
            }}
          ></div>
        </>
      )}

      {form.step4.exemptionsBenefit === "yes" && (
        <>
          <h2>
            <Trans>Exemptions</Trans>
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: form.step4.listNotScopeLigislation,
            }}
          ></div>
        </>
      )}

      {form.step5.contactInfos !== "" && (
        <>
          <h2>
            <Trans>Contact information</Trans>
          </h2>
          <p>
            <Trans>
              If you have any questions or thoughts about the accessibility of
              our website/application, please contact us:
            </Trans>
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: form.step5.contactInfos,
            }}
          ></div>
        </>
      )}

      {form.step5.backupContactInfos !== "" && (
        <>
          <p>
            <Trans>
              If the above service does not respond, you should contact the
              following organisation:
            </Trans>
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: form.step5.backupContactInfos,
            }}
          ></div>
        </>
      )}

      {form.step6.futurImprovementPlan !== "" && (
        <>
          <h2>
            <Trans>Improvement plan</Trans>
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: form.step6.futurImprovementPlan,
            }}
          ></div>
        </>
      )}

      {form.step6.freeText !== "" && (
        <div
          dangerouslySetInnerHTML={{
            __html: form.step6.freeText,
          }}
        ></div>
      )}

      <p>
        <Trans
          id="This statement was prepared on {date}"
          values={{
            date: dateFormat(new Date(form.step1.dateCreationStatement)),
          }}
        />
      </p>
      <div
        dangerouslySetInnerHTML={{
          __html: form.step2.describePreparation,
        }}
      ></div>

      {form.step1.dateUpdateStatement !== form.step1.dateCreationStatement && (
        <p>
          <Trans
            id="The last review of the declaration was made on {date}"
            values={{
              date: dateFormat(new Date(form.step1.dateUpdateStatement)),
            }}
          />
        </p>
      )}
    </>
  );
};

export default withI18n()(Statement);
