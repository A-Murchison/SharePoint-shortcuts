async function getInternalName() {
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + _spPageContextInfo.listTitle + "')/fields?$select=SchemaXml&$filter=ReadOnlyField%20eq%20false";
    let internalFieldName = prompt("What field do you want the internal name for?");
    await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(function (data) {
        data.text().then(function (response) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(response, "text/xml");
            const schemaXmlTags = doc.children[0].getElementsByTagName("d:SchemaXml");
            var output = "";
            var outputCopy = "";
            for (let schemaTag of schemaXmlTags) {


                const val = schemaTag.childNodes[0].nodeValue;
                const xmlDoc = parser.parseFromString(val, 'text/xml');
                const fieldElement = xmlDoc.getElementsByTagName('Field')[0];

                // Accessing attributes
                const name = fieldElement.getAttribute('Name');
                const displayName = fieldElement.getAttribute('DisplayName');
                const format = fieldElement.getAttribute('Format');
                // Access other attributes in a similar manner
                if (displayName != null && displayName.toLowerCase() == internalFieldName.toLowerCase()) {
                    output += ('DisplayName: ' + displayName + "\n" + 'Name: ' + name + " ") + "\n ";
                    outputCopy = name;
                }
            }
            prompt("Copy to clipboard: Ctrl+C, Enter \n \n" + output, outputCopy);
        });
    });
} getInternalName();
