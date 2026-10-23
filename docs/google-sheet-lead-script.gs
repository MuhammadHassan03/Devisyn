/**
 * Devisyn lead webhook. Bound to the "Devisyn Leads" Google Sheet (Extensions > Apps Script).
 * The website POSTs each lead here as JSON; this appends one row.
 *
 * Setup: see "Lead delivery" in the project README. Short version:
 *   1. Project Settings (gear) > Script properties > add SECRET = a long random string.
 *   2. Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone.
 *   3. Copy the Web app URL into SHEET_WEBHOOK_URL and the secret into SHEET_WEBHOOK_SECRET.
 */

var SHEET_NAME = 'Leads';
var HEADERS = ['Date', 'Name', 'Business', 'Type', 'Email', 'Phone', 'Source / UTM', 'Page', 'Status', 'Notes'];

function doPost(e) {
  try {
    var secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    var data = JSON.parse(e.postData.contents);

    // only the website knows the secret
    if (!secret || data.secret !== secret) return reply({ ok: false, error: 'unauthorized' });

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sheet = getSheet();
      sheet.appendRow([
        safe(data.date),
        safe(data.name),
        safe(data.business),
        safe(data.type),
        safe(data.email),
        safe(data.phone),
        safe(data.source),
        safe(data.page),
        'New',
        '',
      ]);
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (error) {
    return reply({ ok: false, error: String(error) });
  }
}

/** Opening the web app URL in a browser is a quick way to check it is deployed. */
function doGet() {
  return reply({ ok: true, service: 'devisyn lead webhook' });
}

function getSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

/** Text that starts with = + - @ would be run as a formula by Sheets, so it is stored as plain text. */
function safe(value) {
  var text = value === undefined || value === null ? '' : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
