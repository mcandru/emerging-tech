## Dublin Coffee Map Canvas Outputs

A collection of single-page HTML web apps for a "Dublin Coffee Map" site. Take a look at both the shared links to the conversations and the hosted canvas links to see what they produced.

All three examples used the [Leaflet](https://leafletjs.com/) javaScript

The Gemini response was my favourite. It has the most number of coffee locations, and the most complete UI to me. It also chose a cleaner map tile design that matches the colour scheme of the page.

### ChatGPT Canvas

Used free ChatGPT account. [ChatGPT does not allow you to switch models](https://help.openai.com/fr-ca/articles/6825453-chatgpt-release-notes). Instead it defaults to **GPT-5.2 Instant**:

> We’re removing automatic model switching for reasoning in ChatGPT. Previously, some questions were automatically routed to the Thinking model when ChatGPT determined it might help. To maximize choice, free users will now use GPT-5.2 Instant by default, and can still choose to use reasoning anytime by selecting Thinking from the tools menu in the message composer.

- [ChatGPT Conversation Link](https://chatgpt.com/share/6972af1c-8ab0-8009-84c4-69e2a6365451)
- [ChatGPT Canvas Link](https://chatgpt.com/canvas/shared/6972ace08ff481919b42ad74e47a14db)

### Gemini Canvas

Used **Gemini 3 Pro**.

- [Gemini Conversation Link](https://gemini.google.com/share/cf9ba7cbf599)
- [Gemini Canvas Link](https://gemini.google.com/share/a0d14b237f47)

### Claude Artifact

Used **Claude Sonnet 4.5**.

An interesting note about this implementation is that it attempts to load the Leaflet package from `unpkg.com` but Claude Artifacts has a strict [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) which does not allow libraries from `unpkg.com` from being loaded. This is a nice example of the **fallibility of LLMs without the right context**. The model was not aware in this case of the limitation in Artifacts. When asked why the Artifact loaded with an error, it diagnosed the incorrect issue:

> The error occurs because the Leaflet JavaScript library (L) is being used before it's fully loaded. The script that initializes the map runs immediately, but the Leaflet library loaded from the CDN might not be ready yet. Let me fix this by wrapping the map initialization code in a DOMContentLoaded event listener

In this case, an experienced developer can check the developer console and network requests to diagnose the issue themselves and propose a fix.

- [Claude Conversation Link](https://claude.ai/share/baf8d8d6-41c3-466f-a221-de01010dc869)
- [Claude Artifact Link](https://claude.ai/public/artifacts/fcf4281d-47f9-4803-a907-2d86a18d4f5a)
