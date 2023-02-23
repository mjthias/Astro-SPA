# 842b SPA js-lib for Astro

Demo: https://sprightly-blancmange-1af1ca.netlify.app

### Usage
From *./library*\
Copy *spa.js* to your *public* dir\
Copy *spa-components* to your *src/components*

#### Layout.astro example
```astro
---
// Other imports
import Spa from "../components/spa-compoents/Spa.astro";
import SpaScript from "../components/spa-compoents/SpaScript.astro";
const { title } = Astro.props;
---

<html lang='en'>
    <head>
        ...
    </head>
    <body>
        <Header />
        <Spa pageTitle={title}>
            <slot />
        </Spa>
        <Footer />
        <SpaScript />
    </body>
</html>
```

#### Using the SPA Anchor
```astro
---
import Anchor from "./spa-compoents/Anchor.astro";
---

<header>
    <nav>
        <ul>
            <li><Anchor href='/'>FrontPage</Anchor></li>
            <li><Anchor href='/subpage'>SubPage</Anchor></li>
        </ul>
    </nav>
</header>
```
