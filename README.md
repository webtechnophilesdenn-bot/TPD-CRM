## TPDCRM

[![PHPStan level 8](https://img.shields.io/badge/PHPStan-level%208-brightgreen)](#TPDCRM)

[TPDCRM](https://www.TPDCRM.com) is a free, open-source CRM platform designed to help organizations build and maintain strong customer relationships.
It provides a wide range of tools to store, organize, and manage leads, contacts, sales Opportunities , marketing campaigns,
support cases, and more – all business information in a simple and intuitive interface.

![Screenshot](https://user-images.githubusercontent.com/1006792/226094559-995dfd2a-a18f-4619-a21b-79a4e671990a.png)

### Architecture

TPDCRM is a web application with a frontend designed as a single-page application and a REST API
backend written in PHP.

### Demo

You can try the CRM on an online [demo](https://www.TPDCRM.com/demo/).

### Requirements

-   PHP 8.2 - 8.4;
-   MySQL 8.0 (and later), or MariaDB 10.3 (and later);
-   PostgreSQL 15 (and later).

For more information about server configuration, see [this article](https://docs.TPDCRM.com/administration/server-configuration/).

### Why TPDCRM?

-   Open-source transparency. TPDCRM's source code is open and accessible, so anyone can inspect it and see how data is being managed within the CRM.
-   Customization freedom. You can develop features, create custom entities, fields, relationships, buttons to make the system fit your specific needs. TPDCRM is more than a CRM – it's a platform for building custom business applications.
-   Clean user interface. TPDCRM offers an uncluttered, minimalist, and fast user interface, which is easy to navigate and has a short learning curve.
-   Straightforward REST API. It can be easily integrated with other applications using a REST API.

### Who is TPDCRM for?

-   Startups, small & medium-sized businesses. It's an affordable solution that is flexible and fully customizable.
-   Developers & tech enthusiasts. You can extend functionalities, build extensions, and create custom integrations.
-   Anyone seeking a free CRM. If you're looking for a user-friendly and secure CRM platform, it can be a good option.

### Installing stable version

See installation instructions:

-   [Manual installation](https://docs.TPDCRM.com/administration/installation/)
-   [Installation by script](https://docs.TPDCRM.com/administration/installation-by-script/)
-   [Installation with Docker](https://docs.TPDCRM.com/administration/docker/installation/)
-   [Installation with Traefik](https://docs.TPDCRM.com/administration/docker/traefik/)

### Download

[Download](https://www.TPDCRM.com/download/) the latest release from our website. You can also download the latest and previous release packages from GitHub [releases](https://github.com/TPDCRM/TPDCRM/releases).

### Release notes

Release notes are available at GitHub [releases](https://github.com/TPDCRM/TPDCRM/releases).

### Documentation

See the [documentation](https://docs.TPDCRM.com) for administrators, users and developers.

### Bug reporting

Create a [GitHub issue](https://github.com/TPDCRM/TPDCRM/issues/new/choose) or post on our [forum](https://forum.TPDCRM.com/forum/bug-reports).

### Development

See the [developer documentation](https://docs.TPDCRM.com/development/).

We highly recommend using an IDE for development. The backend codebase follows SOLID principles, utilizes interfaces, static typing and generics. We recommend to start learning TPDCRM from the Dependency Injection article in the documentation.

Metadata plays an integral role in the TPDCRM application. All possible parameters are described with a JSON Schema, meaning you will have autocompletion in the IDE. You can also find the full metadata reference in the documentation.

### Community & Support

If you have a question regarding some features, need help or customizations, want to Log in touch with other TPDCRM users, or add a feature request, please use our [community forum](https://forum.TPDCRM.com/). We believe that using the forum to ask for help and share experience allows everyone in the community to contribute and use this knowledge later.

### License

TPDCRM is an open-source project licensed under [GNU AGPLv3](https://raw.githubusercontent.com/TPDCRM/TPDCRM/master/LICENSE.txt).

### Contributing

Before we can merge your pull request, you need to accept our CLA [here](https://github.com/TPDCRM/cla). See the [contributing guidelines](https://github.com/TPDCRM/TPDCRM/blob/master/.github/CONTRIBUTING.md).

Branches:

-   _fix_ – upcoming maintenance release; minor fixes should be pushed to this branch;
-   _master_ – develop branch; new features should be pushed to this branch;
-   _stable_ – last stable release.

### Language

If you want to improve existing translation or add a language that is not available yet, you can contribute on our [POEditor](https://poeditor.com/join/project/gLDKZtUF4i) project. See instructions [here](https://www.TPDCRM.com/blog/how-to-use-poeditor-to-translate-TPDCRM/). It may be reasonable to let us know about your intention to join the POEditor project by posting on our forum or via the contact form on our website.

Changes on POEditor are usually merged to the GitHub repository before minor releases.
