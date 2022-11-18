# ev.energy

Welcome to my submission of the ev.energy take-home challenge!

## Overview

Overall, my solution consists of a single view, plus two classes to handle the API logic. Inside `/App.tsx`, we can find the main app logic, including getting current location and invoking the relevant API methods. We also render the main UI here.

Inside the `/classes` directory, I've created two classes that reflect the two APIs used in this project--OpenChargeMap and the ev.energy API. The goal of these classes is to create a scalable interface for communicating with these APIs without making network requests directly inside app views. Each class currently only supports one endpoint for each API, but they are designed to allow developers to easily add support for more endpoints in the future if needed.