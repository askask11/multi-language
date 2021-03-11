# Multi-language.js
A JS library for easily adding multiple languages to your site.  
ZERO dependency!

## Why do I use this?
1. Globalization is important for any websites. Don't let language barrier bounce your customers away!
2. Fast, seamless experience. The light weight lightening-fast translator helps your website to win more likes! 
3. One-click translate whole page in less than a second.
4. Easy to maintain. No more duplicating pages for different pages! The under development system for auto generating translation sheet will makes it even easier for you to maintain you site!
5. Self controlled translation. Get rid of the uncertainty and inaccuracy from automatic translators! You define what's on your website for each language!
6. Robost. Even if a step failed, your site content won't be affected!
7. Deep Translating. You may even translate attributes of elements! In the future, you may even define actions when translating!
8. Flexible language support, if you did not define a language for an element, a backup will be shown instead of leave it blank!
9. Secure! SHA256 signed encryption helps your customers to keep away from MIMA(Main In the Middle Attack).
10. Easy to learn. Look at our example page to get a quick start!
11. Easy to use, flexible API enables you to define your own translator behaviors, or directly bind a combobox!
12. The detailed documentation and support helps you to smash any problems you met! 

## How To Install

To apply multi-language.js to your website/apps, you may either:
### Use a CDN service (recommended)
Copy the code below and paste it inside your ```<head>``` element.
```
<script src="https://cdn.jsdelivr.net/gh/askask11/multi-language@0.1.4/dist/multi-language.min.js" integrity="sha256-xL5PbSBwYLKYaUvdDP2S/lnF9s3oAPm/92GnACZBe2c=" crossorigin="anonymous"></script>
```
OR  
### Serve it yourself
2. Download multi-language.js and serve it from your origin. Check out the releases of this repository to download the source code.  Unzip it when finished.
Go to directory ```dist``` in the root folder, put file ```multi-language.js``` or ```multi-language.min.js``` in your own web project folder and include it in your website. Example:
```
<script src="js/multi-language.min.js"></script>
```
## How To Use

### 1. Define Language Codes
Define a short code to represent each language.
For example, "zh" can stand for Chinese, and "en" stands for English. 
<br><strong>Keep the documentation</strong> for your record.
<br>Example:
<table>
  <tr>
    <td>
      Code
    </td>
    <td>
      Language
    </td>
  </tr>
  <tr>
    <td>
      zh
    </td>
    <td>
      Chinese
    </td>
  </tr>
  <tr>
    <td>
      en
    </td>
    <td>
      English
    </td>
  </tr>
  <tr>
    <td>
      ...
    </td>
    <td>
      ...
    </td>
  </tr>
</table>


Use them consistently once you defined them.
They don't have to follow the standard guide but you may visit <a href="https://re.85vocab.com/y2x">here</a> for a reference.

### 2. Index your webpage

Give id to all of the elements that will directly touch the text.  
You may wrap your text with <code>span</code> element. For example,
```
  
  <!--The id will be used to locate the element.-->
  <div id="c1">Internationalization is very important, indeed.</div>
  
  <!--You should label text-only children elements, and use their id for reference later.-->
  <div>
    <img src="img/image.png" >
    
    <!--Label the element that is directly in contact with the text.-->
    <span id="c2">
      Do you really want to translate me?
    </span>
    
    <!--You may also include simple mark-ups for the text-->
    <span id="c3">
      Yes, because <strong>you<strong> are <u>not</u> fancy enough.
    </span>
    
  </div>
  
```

### 3. Create JSON Translation Sheet(s)

A translation sheet is a JSON Array containing the element IDs of the document and their respective inner texts in different languages.
This library will read the translation sheet and apply it to the document accordingly.  
You may write the sheet in an external JSON file, or write it in a tag like ```<script id="translation-sheet" type="application/json">**YOUR TRANSLATION SHEET GOES HERE**</script>``` in the HTML page to be translated.   Write it before the script activation.
  
Structure of the translation sheet:  
A translation sheet is a JSON Array composed of multiple JSON Objects, and each them represents one element to be translated.  
Simple Example of a translation sheet:
```
[

  {
    "id":"**THE ID OF THE TEXT ELEMENT**",
    "langs":{
      "en":"Hello!",
      "es":"¡Hola!",
      "zh":"你好(nihao)！"
    }
  },
  
  {
    "id":"**THE ID OF ANOTHER TEXT ELEMENT**",
    "langs":{
      "en":"Goodbye",
      "es":"Adiós",
      "zh":"再见"
    }
  },
  {...},
  {...},
  
  ......
  
]
```
Each of the JSON Object contains:
|Key|Datatype|Required|Explaination|
|---|--------|---|------------|
|id|String|Yes|The ID of the text element to be translated. When translating, all innerHTML or value of the targeted element will be updated. The ID should be unique across one document.|
|langs|JSON Object|No|The available translations for this element. It corresponds to 'innerHTML' property for normal elements, and 'value' attribute for ```<input />``` and ```<textarea></textarea>```. Note: Skip this part if you only wish to translate the attribute of an element, not its text on the UI.  More details below|
|attr|JSON Object|No|Optionally, You may translate the attributes of an element. (ex. ```placeholder``` or ```title```). This is an object containing what attribute should be translated and their respective translations.   More details below|

Explaination for <code>langs</code> Object mentioned above,  
for each <code>langs</code> JSON Object inside of the main object,
```
"lang":{
  "**LANGUAGE**":"***TRANSLATION***",
  "**LANGUAGE**":"***TRANSLATION***",
  ...
}
```
  
Explaination for <code>attr</code> object mentioned above,
```
"attr":
{
  "**ATTRIBUTE NAME**":
  {
      "**LANGUAGE**":"***TRANSLATION***",
      "**LANGUAGE**":"***TRANSLATION***",
      ....
  },
  "**ATTRIBUTE NAME**":
  {
      "**LANGUAGE**":"***TRANSLATION***",
      "**LANGUAGE**":"***TRANSLATION***",
      ....
  },
  {...},
  {...},
  ....
}
```

-------
Complete example of a translation sheet:  
Example HTML:  
```

 <img src="welcome.png">

 <div id="welcome-txt">
  Hello! (I am the default text)
 </div>


<br>
...
<br>
<input placeholder="Enter Your Name" id="name-input">

<button id="farewell-btn" title="Thank you for visiting!" onclick="alert('Have a good day!');">
  Goodbye!
</button>

```
Example JSON Translation sheet:
```
[
  {
    "id":"welcome-txt",
    "langs":
    {
      "en":"Hello!",
      "es":"¡Hola!",
      "zh":"你好(nihao)！"
    }
  },
  {
    "id":"name-input",
    "attr":
    {
      "placeholder":
      {
        "en":"Please enter your name",
        "es":"Por favor ingrese su nombre aquí",
        "zh":"请输入您的姓名"
      }
    }
  },
  {
    "id":"farewell-btn",
    "langs":
    {
      "en":"Goodbye",
      "es":"Adiós",
      "zh":"再见"
    },"attr":
    {
      "title":
      { 
        "en":"Thank you for visiting.",
        "es":"Gracias por su visita.",
        "zh":"谢谢访问！"
      },"onclick":
      {
        "en":"alert('Have a good day!');",
        "es":"alert('¡Que tenga un buen día!');",
        "zh":"alert('祝您有美好的一天！');",
        "ko":"alert('좋은 하루 되세요！');",
        "vi":"alert('Chúc bạn ngày mới tốt lành');"
      }
    }
  }
]
  
```

### 4. Construct a MultiLanguage instance

To activate translation feature on your website, you must construct a translator at the buttom of your HTML <code>body</code>.
The constructor of class MultiLanguage accepts 3 parameters, none of them is required.
```
var translator = new MultiLanguage(defaultLanguage(Optional), externalJSON(Optional), select(Optional));
```
|Sequence|Name|Datatype|Required|Default Value|Description|
|-----|-----|---|-----|-----|-----|
|1|defaultLanguage|```String```|No|<code>en</code>|The default language for a user that has not defined any language preferences. This language must be available across ALL elements. You must assign a value here if the default language code is not "en".|
|2|externalJSON|```JSONArray```|No|<code>[]</code>|The translation sheet to load into the translator. The translator will load an empty array by default. You may load multiple sheets after it is constructed by calling method ```addSheet(translationSheet)```|
|3|select|<code>Element</code>|No|<code>null</code>|An ```<select>``` element that has options containing supported languages. The current language will be changed to the <code>value</code> attribute of the ```<option>``` selected. You may register multiple selects later by calling method ```registerSelect(select)```|

### 5. Load translation sheet into the instance
To load an external sheet file to the element, you can follow this example:
```
var xhr = new XMLHttpRequest();  //Create an xhr instance
var translator = new MultiLanguage(); // define translator, create a default instance

xhr.open("***LINK TO YOUR SHEET.json***","***HTTP METHOD TO USE***"); // Define target file and HTTP method to use.

xhr.onreadystatechange=(e)=>{
  if(xhr.readyState === 4 && xhr.status === 200)
  {
    var jsonResponse = JSON.parse(xhr.responseText); // get response text and parse it into JSON.
    translator.addSheet(jsonResponse);
  }
}
```
If you have written your translation sheet inside your HTML, you may follow this example
```
var json = JSON.parse(document.getElementById("translation-sheet").innerHTML);
var translator = new MultiLanguage("en",json);
```
You may repeat the steps above to load multiple sheets, but you may NOT load the same sheet more than once.
### 6. Register Select Elements
You can let user control the page language by defining a ```<select>``` element in your page. Then, register the ```<select>``` to the translator or pass the ```Element``` object of that select to the constructor. You may call function ```translate(language)``` manually too.  
Example HTML Select
```
<select id="languages">
  <option value="en">
  English (Default)
  </option>
  <option value="zh">
  简体中文
  </option>
</select>
```
To Register(bind) this select to the translator instance:
```
var translator = new MultiLanguage(select=document.getElementById("languages")); // you may pass it to the constructor 
```
or
```
var translator = new MultiLanguage();
translator.registerSelect(document.getElementById("languages")) // You may call method "registerSelect" to register it
```
Call the method above again, you may register multiple select elements. You may NOT register the same element more than once.   
The register select element can control the global language settings, and will change accordingly when the language setting changes.

### Congratulations! Your website can speak multiple languages now!


## Functions Reference Sheet

```
translate(json=this.externalJSON, target)
```
Translate all the elements on the translation sheet to target language. This will trigger all registered selects to select the "target" language.
|Parameter|Datatype|Required|Default Value|Description|
|------|------|------|------|------|
|json|JSONArray|No|```this.externalJSON```|The translation sheet to run. By default, it will run the translaton sheet stored with the instance. Please call ```addSheet``` to add additional translation sheets.|
|target|```String```|Yes|N/A|The target language code to translate to. If the language is not defined for a specifit element, the element or its attribute will be translated to the default language| 

***   
```
addSheet(jsonArray)
```
Add an additional sheet to the multilanguage translator. The sheet will be concatnated to the sheet added before. If there are duplicated entries, the one added later will override those added before. It will also invoke ```translate``` method to translate the elements indicated in the new sheet.
|Parameter|Datatype|Required|Default Value|Description|
|------|------|------|------|------|
|jsonArray|JSONArray|Yes|N/A|The JSONArray object of the sheet to be added.|

***   
```
registerSelect(select)
```
Add a new select to the binding list. This select will also be able to control the global language and follow any changes.
|Parameter|Datatype|Required|Default Value|Description|
|------|------|------|------|------|
|select|<code>Element</code>|Yes|N/A|The <code>Element</code> object of the select|

### Example
Find example.html in the root of the repo.

## About Author
Jianqing Gao <br>
Contact: vip@jianqinggao.com


