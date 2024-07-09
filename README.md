<div align="center">


<h4>This is a great message prompter, it takes up very little memory and space, but provides common usage, and from a modern front-end build, you can use it alone in the project or incorporate it into the base library, it is very useful.</h4>
<h4>
The importance of the message is self-evident, the better way to prompt is better delivery, which is my original intention to create it.🎀🎁
</h4>

</div>


<h2 align="centre">Feature:</h2>
  * ✨Very small space and memory footprint.<br />
  * 🎗Regardless of platform, combine any framework you like.<br />
  * Provides four default message types and supports extension.<br />
  * 🎉You can use element passing.


<h2 align="left">Install</h2>

Install with pnpm:
```
pnpm add @nanometer/nm --save-dev
```

<h2 align="left">Use</h2>

```js
import message from '@nanometer/nm'
import '@nanometer/nm/dist/style.css'

message('Hello World')
```

<h2 align="left">API</h2>

* The pattern of object customization has been added. The previous way of use remains the same, which requires more flexible use of option

|     Name     | Description                                          |
| :----------: | :--------------------------------------------------- |
|     type     | [success,warning,info,error]                         |
| durationTime | Buffer animation duration(The default for 3 seconds) |
|    calss     | CSS state customization                              |
|   content    | [string,node]                                        |
|  postEvent   | A callback after the message has disappeared         |

<h2 align="left">Contact author</h2>
<p> *  Submit issues <a herf="https://github.com/webvs2/-nm-message/issues">https://github.com/webvs2/-nm-message/issues</a> </p>
<p> *  Visit the github address <a herf="https://github.com/webvs2/-nm-message">https://github.com/webvs2/-nm-message</a></p>

