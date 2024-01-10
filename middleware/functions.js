require('dotenv').config()
const fetch = require('node-fetch')


async function translateText(text, source, target) {
    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${text}&langpair=${source}|${target}&key=${process.env.translation_api_key}`)
        const data = await response.json()

        if (data.responseData && data.responseData.translatedText) {
            return data.responseData.translatedText
        } else {
            throw new Error('Translation Failed')
        }

    } catch (err) {
        console.log(err)
    }
}

const languageTable = [
    { "language": "Afrikaans", "code": "af" },
    { "language": "Albanian", "code": "sq" },
    { "language": "Amharic", "code": "am" },
    { "language": "Arabic", "code": "ar" },
    { "language": "Armenian", "code": "hy" },
    { "language": "Azerbaijani", "code": "az" },
    { "language": "Bengali", "code": "bn" },
    { "language": "Bosnian", "code": "bs" },
    { "language": "Bulgarian", "code": "bg" },
    { "language": "Catalan", "code": "ca" },
    { "language": "Chinese (Simplified)", "code": "zh" },
    { "language": "Chinese (Traditional)", "code": "zh-TW" },
    { "language": "Croatian", "code": "hr" },
    { "language": "Czech", "code": "cs" },
    { "language": "Danish", "code": "da" },
    { "language": "Dari", "code": "fa-AF" },
    { "language": "Dutch", "code": "nl" },
    { "language": "English", "code": "en" },
    { "language": "Estonian", "code": "et" },
    { "language": "Farsi (Persian)", "code": "fa" },
    { "language": "Filipino, Tagalog", "code": "tl" },
    { "language": "Finnish", "code": "fi" },
    { "language": "French", "code": "fr" },
    { "language": "French (Canada)", "code": "fr-CA" },
    { "language": "Georgian", "code": "ka" },
    { "language": "German", "code": "de" },
    { "language": "Greek", "code": "el" },
    { "language": "Gujarati", "code": "gu" },
    { "language": "Haitian Creole", "code": "ht" },
    { "language": "Hausa", "code": "ha" },
    { "language": "Hebrew", "code": "he" },
    { "language": "Hindi", "code": "hi" },
    { "language": "Hungarian", "code": "hu" },
    { "language": "Icelandic", "code": "is" },
    { "language": "Indonesian", "code": "id" },
    { "language": "Irish", "code": "ga" },
    { "language": "Italian", "code": "it" },
    { "language": "Japanese", "code": "ja" },
    { "language": "Kannada", "code": "kn" },
    { "language": "Kazakh", "code": "kk" },
    { "language": "Korean", "code": "ko" },
    { "language": "Latvian", "code": "lv" },
    { "language": "Lithuanian", "code": "lt" },
    { "language": "Macedonian", "code": "mk" },
    { "language": "Malay", "code": "ms" },
    { "language": "Malayalam", "code": "ml" },
    { "language": "Maltese", "code": "mt" },
    { "language": "Marathi", "code": "mr" },
    { "language": "Mongolian", "code": "mn" },
    { "language": "Norwegian (Bokmål)", "code": "no" },
    { "language": "Pashto", "code": "ps" },
    { "language": "Polish", "code": "pl" },
    { "language": "Portuguese (Brazil)", "code": "pt" },
    { "language": "Portuguese (Portugal)", "code": "pt-PT" },
    { "language": "Punjabi", "code": "pa" },
    { "language": "Romanian", "code": "ro" },
    { "language": "Russian", "code": "ru" },
    { "language": "Serbian", "code": "sr" },
    { "language": "Sinhala", "code": "si" },
    { "language": "Slovak", "code": "sk" },
    { "language": "Slovenian", "code": "sl" },
    { "language": "Somali", "code": "so" },
    { "language": "Spanish", "code": "es" },
    { "language": "Spanish (Mexico)", "code": "es-MX" },
    { "language": "Swahili", "code": "sw" },
    { "language": "Swedish", "code": "sv" },
    { "language": "Tamil", "code": "ta" },
    { "language": "Telugu", "code": "te" },
    { "language": "Thai", "code": "th" },
    { "language": "Turkish", "code": "tr" },
    { "language": "Ukrainian", "code": "uk" },
    { "language": "Urdu", "code": "ur" },
    { "language": "Uzbek", "code": "uz" },
    { "language": "Vietnamese", "code": "vi" },
    { "language": "Welsh", "code": "cy" }
]

const categories = {
    "Any Category": 0,
    "General Knowledge": 9,
    "Entertainment: Books": 10,
    "Entertainment: Film": 11,
    "Entertainment: Music": 12,
    "Entertainment: Musicals & Theatres": 13,
    "Entertainment: Television": 14,
    "Entertainment: Video Games": 15,
    "Entertainment: Board Games": 16,
    "Science & Nature": 17,
    "Science: Computers": 18,
    "Science: Mathematics": 19,
    "Mythology": 20,
    "Sports": 21,
    "Geography": 22,
    "History": 23,
    "Politics": 24,
    "Art": 25,
    "Celebrities": 26,
    "Animals": 27,
    "Vehicles": 28,
    "Entertainment: Comics": 29,
    "Science: Gadgets": 30,
    "Entertainment: Japanese Anime & Manga": 31,
    "Entertainment: Cartoon & Animations": 32
}

const CountryCode = ["USD", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"]
module.exports = { translateText, languageTable, categories, CountryCode }