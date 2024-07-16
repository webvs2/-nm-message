<h2 align="centre">Introduce:</h2>
<h4>
This is a great message prompter, it takes up very little memory and space, but provides common usage, and from a modern front-end build, you can use it alone in the project or incorporate it into the base library, it is very useful.
</h4>

<h2 align="centre">Feature:</h2>
  * ✨Very small space and memory footprint.<br />
  * 🎗Regardless of platform, combine any framework you like.<br />
  * 🧪Provides four default message types and supports extension.<br />
  * 🎉You can use element passing.
<h2 align="left">Install:</h2>

Install with pnpm:

```
pnpm add @nanometer/nm --save-dev
```

<h2 align="left">Use:</h2>

```js
import message from "@nanometer/nm";
import "@nanometer/nm/dist/style.css";
message({type:"success",durationTime:3000,content:"Hello World"}); 
or
message("Hello World");
```

<h2 align="left">API:</h2>

- Parameter mode or use directly

|       Name        | Description                        |
| :---------------: | :--------------------------------- |
|       type        | [success,warning,info,error]       |
|   durationTime    | Duration (Default: 3 seconds)      |
|       calss       | CSS state customization            |
|      content      | [string,node]                      |
|     postEvent     | Prompts for post-completion events |
| beforeEvent [new] | Pre-close event                    |
|   suffix [new]    | [string] postcontent               |
| suffixEvent [new] | suffix click events                |

<h2 align="left">Contact author:</h2>
<h4>
The importance of the message is self-evident, the better way to prompt is better delivery, which is my original intention to create it.Light a little star if you want🎀🎁
</h4>

<p> *  Submit issues <a herf="https://github.com/webvs2/-nm-message/issues">https://github.com/webvs2/-nm-message/issues</a> </p>
<p> *  Visit the github address <a herf="https://github.com/webvs2/-nm-message">https://github.com/webvs2/-nm-message</a></p>
