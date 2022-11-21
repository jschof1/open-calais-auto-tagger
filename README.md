# PermId Tagger

This package takes a JSON object and returns the object with AI tags added.

This is a wrapper for the OpenCalais API which is a machine learning API that can tag text using AI and natural language processing (NLP) techniques to identify entities, topics, themes, and sentiment in text and social media content using this package you will be able to find out more about your content, the entities it contains and how each entity relates to each other this is useful for content analysis, content discovery, and content enrichment.

You can find out more about the OpenCalais API here: https://www.opencalais.com/

The function takes a file path, the key of the value you want to analyse and your API token which can be acquired from the OpenCalais website.

# Usage

### file.json:

```js

[
  {
    "id": 1,
    "description": "This is a description of a thing"
  },
  {
    "id": 2,
    "description": "This is a description of another thing"
  }
]
```

### index.js

```js

const { tagger } = require('permid-tagger')
const fileToCheck = require("./file.json");
const apiToken = "YOUR API TOKEN HERE";

tagger(fileToCheck, "description", "YOUR_API_TOKEN"); `


```

### file.json output

```
[
  {
    "id": 1,
    "description": "This is a description of a thing",
    "tags": [
      "Entertainment Culture",
      "Hospitality Recreation",
      "Thing",
      "Book:The Thing",
      "Dhati in islamic philosophy"
    ]
  },
  {
    "id": 2,
    "description": "This is a description of another thing",
    "tags": [
      "Entertainment Culture",
      "Hospitality Recreation",
      "Creative works",
      "Thing",
      "Films",
      "Book:The Thing",
      "English-language films",
      "And Another Thing"
    ]
  }
]
```

# API limits 
The free tier of the OpenCalais API allows for 500 requests per day. If you need more requests you can upgrade to a paid tier. 


