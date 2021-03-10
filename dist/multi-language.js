/* 
 * Author: Jianqing Gao 
 * vip@jianqinggao.com
 * Date: Mar 4, 2021
 * Description: This document is created for supporting multilanguage sites.
 */
//each of this object contains one DOM and one of its possible translation
class TranslatableElement
{
    constructor(e, arr)
    {
        this.element = e;
        this.languages = arr;
    }
}
class MultiLanguage
{
    /**
     * Construct a default MultiLanguage translator object. Assign default language and
     * replace all JSONs marked with localized.
     * @param {String} defaultLanguage The language that is default to your site and must be available across all elements.
     * @param {DOM} select The HTML DOM object of the selector to initalize. Optional. 
     * @param {String} external The URL to the external JSON sheet 
     * @param {String} externalJSON The content of external JSON. Note that
     * @returns {MultiLanguage} The construsted multilanguage object.
     */
    constructor(defaultLanguage, externalJSON, select = null)
    {
        this.defaultLang = defaultLanguage;
        this.externalJSON = externalJSON;
        //an array of doms and their translation
        //this.localizedArr = [];
        this.registeredSelect = [];
        this.checkUserLanguage();
        this.registerSelect(select);
        
        this.translate(this.externalJSON,this.getUserLanguage());
    }
   
    /**
     * Add a new select to the listner. This select will also be able to control the global language and follow any changes.
     * @param {type} select
     * @returns {undefined}
     */
    registerSelect(select)
    {
        if (select !== null && typeof select === "object")
        {
            var l = this.getUserLanguage();
            this.makeSelect(select, l);
            select.addEventListener("change", (e) => {
                this.translate(select.value);
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
     * Translate all the supported elements to target language
     * @param {type} target
     * @returns {undefined}
     */
    translate(json,target)
    {
        //save language preference
        this.setUserLanguage(target);
        //go through all elements
        //
        for(var i=0, max = json.length; i<max;i++)
        {
            //get the element to be translated
            var eleJSON = json[i];
            var ele = document.getElementById(eleJSON["id"]);
            if(ele!==null)
            {
               var targetLanguage = eleJSON["langs"][target];
               if(targetLanguage!==undefined)
               {
                   this.setElementText(ele,targetLanguage);
               }else
               {
                   this.setElementText(ele,eleJSON["langs"][this.defaultLang]);
               }
            }
        }

        if (this.registeredSelect.length > 1)
        {
            for (var i = 0, max = this.registeredSelect.length; i < max; i++)
            {
                this.makeSelect(this.registeredSelect[i], target);
            }
        }

    }

    isElementInput(element)
    {
        return element.tagName == "TEXTAREA" || element.tagName == "INPUT";
    }

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
    setElementText(element, text)
    {
        if (this.isElementInput(element))
        {
            element.value = text;
        } else
        {
            element.innerHTML = text;
        }
    }

    getUserLanguage()
    {
        return localStorage.getItem("preferred-language");
    }

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

    setUserLanguage(target)
    {
        localStorage.setItem("preferred-language", target);
    }
    
    addSheet(json)
    {
        this.translate(json,this.getUserLanguage());
        this.externalJSON.concat(json);
    }
}


