# Multi-language.js
A JS library for easily adding multiple languages to your site.  
ZERO dependency!
## How To Install

To apply multi-language.js to your website/apps, you may either:
### Use a CDN service (recommended)
Copy the code below and paste it inside your ```<head>``` element.
```
<script src="https://cdn.jsdelivr.net/gh/askask11/multi-language@0.1.3/dist/multi-language.min.js" integrity="sha256-3p2C5uJwaOCmFwD0AGJwhaVH4awaPOYm/kKknZCb+Mo=" crossorigin="anonymous"></script>
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
You may write the sheet in an external JSON file, or write it in a tag like ```<script id="translation-sheet" type="application/json">**YOUR TRANSLATION SHEET GOES HERE**</script>``` in the ```<head>``` of the HTML page to be translated.   
  
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
  },
  {...},
  {...},
  
```

### 4. Construct a MultiLanguage instance

To activate translation feature on your website, you must construct a translator at the buttom of your HTML <code>body</code>.
The constructor of class MultiLanguage accepts 3 parameters, two of them is required.
```
var translator = new MultiLanguage(defaultLanguage, externalJSON(Optional), select(Optional));
```
|Sequence|Name|Datatype|Required|Default Value|Description|
|-----|-----|---|-----|-----|-----|
|1|defaultLanguage|String|Yes|N/A|The default language for a user that has not defined any language preferences. This language must be available across ALL elements|
|2|externalJSON|JSONArray|No|<code>[]</code>|The translation sheet to load into the translator. The translator will load an empty array by default. You may load multiple sheets after it is constructed by calling method ```addSheet(translationSheet)```|
|3|select|<code>Element</code>|No|<code>null</code>|An ```<select>``` element that has options containing supported languages. The current language will be changed to the <code>value</code> attribute of the ```<option>``` selected. You may register multiple selects later by calling method ```registerSelect(select)```|

### 5. Load translation sheet into the instance
To load an external sheet file to the element without dependency, you may follow this example:
```
var xhr = new XMLHttpRequest();  //Create an xhr instance
var translator = null; // define translator

xhr.open("***LINK TO YOUR SHEET.json***","***HTTP METHOD TO USE***"); // Define target file and HTTP method to use.

xhr.onreadystatechange=(e)=>{
  if(xhr.readyState === 4 && xhr.status === 200)
  {
    var jsonResponse = JSON.parse(xhr.responseText); // get response text and parse it into JSON.
    translator = new MultiLanguage("***DEFAULT LANGUAGE***",jsonResponse);
  }
}

```








