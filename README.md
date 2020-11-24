# Statement Assistant 🧙‍♂️

## Command catalog:

`yarn install`

To install all of the dependencies.

`yarn start`

Starts the development server.

`yarn build`

Bundles the app into static files for production.

`yarn extract --clean`

Extract the texts for locale

--clean to remove unused trans.

`yarn compile`

Compile locales

`yarn add-locale xx xx`

⚠ Do NOT launch this command if you don't know what you're doing!

Add a locale to the app. (EN)/FR/NL/DE are already in the app.

`node-sass -rw ./src/styles/scss/ -o ./src/styles/css/ --output-style compressed`

To modify the SASS

`netlify deploy --prod`

To deploy on netlify for testing purpose.

The app need to be build before that command.

[https://b4y-wizard.netlify.app](https://b4y-wizard.netlify.app)


## How to add a locale?

To add a locale you need to launch the following command:

`yarn add-locale it`

This will for example add the italian locale. After that we need to extract the locale to create the source:

`yarn extract --clean`

You'll have to edit `src\datas\atoms.js` to add your locale to the language swicher :

```js
default: ["nl", "fr", "de", "en", "it"],
```

And when you want to build the app don't forget to compile the locales before compiling the app: `yarn compile`

## How to modify/translate a locale?

In `src\locales` you've all of the locale added to the project. For example if you want to edit the italian you need to edit :
`src\locales\it\messages.po`

You can modify this file via a PO file editor. There's plenty of softwares for that even online. Example :

- https://localise.biz/free/poeditor
- https://poedit.net

### Remark for Select

When we've to translate a text based on a variable we need to do what we call a Select. The Select'll select the right text to display according to the variable. But it can be a bit confusing for a non-technical person to know what to translate and what not to translate. And as a picture is worth a thousand words :

![Select](https://i.imgur.com/nBtTxH2.png)

What is highlighted must be translated the rest need to stay in english.

## How to modify the toolbar from Ckeditor?

You can edit the toolbar here : `src\datas\atoms.js`

Documentation CKEditor 4 toolbar : https://ckeditor.com/docs/ckeditor4/latest/features/toolbar.html

## Code for dev purpose

    function inject() {
	    const json = {
	      version: 1,
	      step1: {
	        organization: "Blue4You",
	        guardianshipAuthority: "flemReg",
	        dateCreationStatement: "2020-05-28T13:12:27.000Z",
	        dateUpdateStatement: "2020-10-14T13:12:27.440Z",
	        apps: [
	          { app: "app", url: "https://blue4you.be" },
	          { app: "site", url: "https://blue4you.be" },
	        ],
	      },
	      step2: {
	        audit: "internal",
	        auditDepth: "inDepth",
	        auditUrl: "http://blue4you.be/report",
	        complianceStatus: "partial-compliance",
	        workloadOrBurden: "yes",
	        workloadOrBurdenReason: "<p>__ WORKLOAD OR BUDERDEN TEXT__</p>\n",
	      },
	      step3: {
	        nonAccesiblePart: "<p>__ NON ACCESSIBLE PART TEXT __</p>\n",
	        nonAccesiblePartAlternative:
	          "<p>__ NON ACCESSIBLE PART ALTERNATIVE __</p>\n",
	      },
	      step4: {
	        exemptionsBenefit: "yes",
	        listNotScopeLigislation:
	          "<ul>\n\t<li>Exempted content 1</li>\n\t<li>Exempted content 2</li>\n\t<li>... 3</li>\n</ul>\n",
	      },
	      step5: {
	        contactInfos: "<p>__ CONTACT INFOS __</p>\n",
	        backupContactInfos: "<p>__ BACKUP CONTACT INFOS __</p>\n",
	      },
	      step6: {
	        futurImprovementPlan: "<p>__ FUTUR IMPROVEMENT PLAN TEXT __</p>\n",
	        freeText: "<p>__ FREE TEXT__</p>\n",
	      },
	    };
	    setForm(json);
	    history.push("/step1");
    }

    <div className="db pt-15">
		<button onClick={inject}>Inject</button>
	</div>