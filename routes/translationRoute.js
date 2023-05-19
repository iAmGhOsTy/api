const express = require("express");
const router = express.Router();
const { translateText, languageTable } = require("../middleware/functions");

router.get("/", (req, res) => {
const { text, source, target } = req.query;
if(!text || !source || !target){
    return res.status(400).json({ message: "Missing Parameters",data: "use /translate?text=yourtext&source=yourlanguage&target=yourTargetLanguage", LanguageList:languageTable });
}
translateText(text, source, target)
.then((translation) => {
    try{
    res.status(200).json({ translation });
    } catch(err){
    res.status(500).json({ message: "Translation Failed" });
    }
})
});

module.exports = router;
