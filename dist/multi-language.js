/* 
 * Script Author: Jianqing Gao (vip@jianqinggao.com)
 * Creation Date: Mar 4, 2021
 * Description: This document is created for supporting multilanguage sites.
 */
//each of this object contains one DOM and one of its possible translation
class MultiLanguage
{
    /**
     * Construct a default MultiLanguage translator object. Assign default language and
     * start translationg elements.
     * @param {String} defaultLanguage The language that is default to your site and must be available across all elements.
     * @param {DOM} select The HTML DOM object of the selector to initalize. Optional. 
     * @param {String} external The URL to the external JSON sheet 
     * @param {String} externalJSON The content of external JSON. Note that
     * @returns {MultiLanguage} The construsted multilanguage object.
     */
    constructor(defaultLanguage = "en", externalJSON = JSON.parse("[]"), select = null)
    {
        //The language that is always available to all elements.
        this.defaultLang = defaultLanguage;
        //The external sheet in form of a JSONArray
        this.externalJSON = externalJSON;
        //an array of doms and their translation
        this.registeredSelect = [];
        //Check the default language for this user. I
        //If there is no record, assign the default language code defined.
        this.checkUserLanguage();
        if (select !== null)
        {
            this.registerSelect(select);
        }

        this.translate(this.externalJSON, this.getUserLanguage());
    }

    /**
     * Add a new select to the listner. This select will also be able to control the global language and follow any changes.
     * @param {Element} select the <code>Element</code> object of the select
     * @returns {undefined}
     */
    registerSelect(select)
    {
        if (select !== null && typeof select === "object" && select.tagName === "SELECT")
        {
            var l = this.getUserLanguage();
            this.makeSelect(select, l);
            select.addEventListener("change", (e) => {
                this.translate(this.externalJSON, select.value);
                //console.log(this);
            });
        }
        this.registeredSelect[this.registeredSelect.length] = select;
    }

    makeSelect(select, option)
    {
        var opts = select.options;
        for (var i = 0, max = opts.length; i < max; i++)
        {
            if (opts[i].value == option)
            {
                select.selectedIndex = i;
                return true;
            }
        }
        return false;
    }
    /**
     * Translate all the elements on the translation sheet to target language.This will trigger all registered selects to select the "target" language.
     * @param {JSON} json The JSON Array to be read for translation
     * @param {type} target The desired language code
     * @returns {undefined} None
     */
    translate(json = this.externalJSON, target)
    {
        //save language preference
        this.setUserLanguage(target);
        //go through all elements
        //
        ////onsole.log(json.length)
        for (var i = 0, max = json.length; i < max; i++)
        {
            //get the element to be translated
            var eleJSON = json[i];
            var ele = document.getElementById(eleJSON["id"]);
            
            
            //console.log(ele)
            //console.log(eleJSON);
            //if the element exists on the page
            if (ele !== null)
            {

                //get the desired language for the element inner text
                var eleJSONLang = eleJSON["langs"];
                //make sure the langs object for this element exists, if not ,this element does not have innerhtml
                if (eleJSONLang !== undefined)
                {

                    var targetLanguage = this.getTranslatedLanguage(eleJSONLang, target);
                    this.setElementText(ele, targetLanguage);
                }

                //translate element attribute
                var attrJSON = eleJSON["attr"];
                //see if this element attibute need to be translated.
                if (attrJSON !== undefined)
                {
                    //get what attributes to be translated
                    var attributes = Object.keys(attrJSON);
                    //go through all the attributes need to be translated
                    for (var j = 0, maxj = attributes.length; j < maxj; j++) {
                        //get the attribute to be translated
                        var key = attributes[j];
                        //get the desired language for that attribute
                        targetLanguage = this.getTranslatedLanguage(attrJSON[key]/*The attribute object itself is a lang json*/, target);
                        //Set that attribute to the desired language
                        this.setElementAttribute(ele, key, targetLanguage);
                    }
                }


            }
            
        }


        for (var j = 0, max = this.registeredSelect.length; j < max; j++)
        {
            //change selected index
            this.makeSelect(this.registeredSelect[j], target);
        }


    }

    /**
     * Determine if the element is a form input element
     * @param {type} element The DOM object of that element.
     * @returns {Boolean} true of the element id a kind of input or text area, false otherwise.
     */
    isElementInput(element)
    {
        return element.tagName == "TEXTAREA" || element.tagName == "INPUT";
    }

    /**
     * Get the innter html of the element. If the elment is input, get the value.
     * @param {type} element The DOM object of the element,
     * @returns {unresolved} The inner html or valye of the element.
     */
    getElementText(element)
    {
        if (this.isElementInput(element))
        {
            return element.value;
        } else
        {
            return element.innerHTML;
        }
    }

    /**
     * Get the desired language of the element. If the desired language doesn't exists,
     * use the default language.
     * @param {JSONObject} eleJSONLangs The JSONObject formatted "language code":"content", ex. <code>{"cn":"你好","en":"Hello"}</code>
     * @param {type} target The target language code. The language you want the element to be translated to. If the one doesn't exists, translate to default language.
     * @returns {MultiLanguage.getTranslatedLanguage.eleJSONLangs}
     */
    getTranslatedLanguage(eleJSONLangs, target)
    {
        var targetLanguage = eleJSONLangs[target];
        if (targetLanguage === undefined)
        {
            targetLanguage = eleJSONLangs[this.defaultLang];
        }
        return targetLanguage;
    }

    /**
     * Set the appearent text of the element. For non-input elements, it would be the innerHTML property. 
     * For input elements, it would be "value".
     * If you don't wish the UI text of the element to be translated, please leave the "langs" object undefined.
     * @param {DOMObject} element The DOM object of the element.
     * @param {type} The text to be set.
     * @returns {undefined} None.
     */
    setElementText(element, text)
    {
        if (this.isElementInput(element))
        {
            this.setElementAttribute(element, "value", text);
        } else
        {
            element.innerHTML = text;
        }
    }

    /**
     * Set the attribute of an element
     * @param {type} element The DOM Object of the element.
     * @param {type} attributeName The attribute of the element to be changed
     * @param {type} text The text to place in.
     * @returns {undefined} None
     */
    setElementAttribute(element, attributeName, text)
    {
        element.setAttribute(attributeName, text);
    }

    /**
     * Get the default user language.
     * @returns {DOMString} The user language code in localsorage,
     */
    getUserLanguage()
    {
        return localStorage.getItem("preferred-language");
    }
    /**
     * Check if the user language exists in the localstorage. If it doesn't exists, assign default language.
     * @returns {Boolean}
     */
    checkUserLanguage()
    {
        var l = this.getUserLanguage();
        if (l === null || l === "")
        {
            this.setUserLanguage(this.defaultLang);
            return false;
        }
        return true;
    }

    /**
     * Set the user language.
     * @param {type} target The targeted language code to be set.
     * @returns {undefined} None
     */
    setUserLanguage(target)
    {
        localStorage.setItem("preferred-language", target);
    }

    /**
     * Add an additional sheet to the translator. 
     * Note that when you add the JSON, it will be concatnated to the original sheet.
     * It will also invoke translate method to translate the elements indicated in the new sheet.
     * @param {JSONArray} jsonArray JSONArray of the sheet to be added.
     * @returns {undefined} None
     */
    addSheet(jsonArray)
    {
        this.externalJSON = this.externalJSON.concat(jsonArray);
        this.translate(jsonArray, this.getUserLanguage());
    }
}
