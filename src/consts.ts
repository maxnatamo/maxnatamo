interface ContactInfo {
    text: string,
    link: string,
    icon: string
}

export const SITE_TITLE = 'Max T. Kristiansen';
export const SITE_DESCRIPTION = 'Jack of all trades, lawful-good developer';

export const CONTACT_INFO: ContactInfo[] = [
    {
        text: "maxnatamo",
        link: "https://github.com/maxnatamo",
        icon: "fa-brands fa-github"
    },
    {
        text: "me@maxtrier.dk",
        link: "mailto:me@maxtrier.dk",
        icon: "fa-solid fa-envelope"
    },
    {
        text: "+45 60714502",
        link: "tel:+4560714502",
        icon: "fa-solid fa-phone"
    }
]