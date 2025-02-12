const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUxoZnFySEMwbHZ0UEtSaCtDN0ttSytBVHpjZWk5UmJqSSs4THp1Y1VYVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHZlbEhUOG1CWEo0T0hqUHpsSG5kamFtN1Bjek55bjA5VkpEKzlQRVduaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDUFBYdWJJOEZLcGdyOGpnVGE0UzVQVVhoMkZqajZOaFdnU0xJbW9kNlZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmSXdDdzhWVmwvSEpyWDNSNGZMczZPbUZnNHk0bFhaWENmenNuMkFJR2xJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNPODc3TkpkQlZkdWZGcktCbFp0ZVFFWHJaZkZiaGpYUWM4WlpsMkJSbjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBZN0dvc2lrei96VnYwNWRFNEkzSkxUanlldm8vT21lZUhiQThlbFdhbU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0hsaG1IY2VyOU5LMExXK0Rpejg1L1pzRlVLM2VuQzdYazZYZFlNTmkzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQS80YmZDK2ZTaFQwc2tFcWlDVm1HNklmb2xjYnJ1UlU5MEtWb1lrdjVTVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkUvd3pKMWt5SGZGdjh3YVo0SElaS1Zqay92alA4ZDBNZXdScXFMREg1ZllCZ3crSzNTM29sMkhSb1FhZUZOUlo1VHNERmlJZHNYc0l6MGhRSzNxSmlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg1LCJhZHZTZWNyZXRLZXkiOiJUcmgwQjNNTElNa2lNcW9PSjFsNlRnRk9OVnE2aE0vMGRvM3BrUzNvMnFBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzE0MjgxNzc2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3RkMwMjBGMDZDMUMxNjM2RjFDQkREOEZGNUI5QkI4NiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM5MzUyMTc3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJieFFxSjg5TlR6aXEyTGJxNlBSTDdnIiwicGhvbmVJZCI6IjEyMzBkNDI3LTAwNjAtNGVkYy04NGJlLTM0M2NjN2NmYTViZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxaGF2bTZWeUtwUWNFUDJMZTB0MTV5V25HR3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUFkS05HeC9sVnRJNVRQT3JHNi9zUGYxRGlzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlM5QzZYUzJLIiwibWUiOnsiaWQiOiI5MjMxNDI4MTc3NjM6MjBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU2FtaXVsbGFoIERldGhvIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQbjc1L3dCRU9IUXNiMEdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJKdjBZd1ZYei9waWhGVUw5Y0JMZ29DdlRQVmJkR1ZJNjVtRHJ2aVVHR0V3PSIsImFjY291bnRTaWduYXR1cmUiOiJLTVk3YlpxU2dJVjkrVUJ4WStwU1BzQ29BSFFKSkxLL1R2ZGNRMzFuMkRxVzY5dDJPemt6YmJGQmUwT1EvYVBKMjcxbzN6cXlmVURhYmtRYXlqTU1BQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTHowU0RqT0U0RDZ4cVUzejlQYkR0d2dhNUZOTTVQYVhFcFhzTEsxdG1QdDQrRFhEUVR0L2NEVmdqeVg3bzZiWE1mb1BwMjcwYnpMUHhEbnBuMXV5alE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMxNDI4MTc3NjM6MjBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU2I5R01GVjgvNllvUlZDL1hBUzRLQXIwejFXM1JsU091Wmc2NzRsQmhoTSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczOTM1MjE3MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPcUMifQ==',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/',
    OWNER_NAME : process.env.OWNER_NAME || "SAMM",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "92142817768",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "true",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'true',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by alpha md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'no',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || 'none',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "✧⁠LUCKY_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠LUCKY_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Aisa/karachi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'no', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

