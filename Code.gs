/**
 * AlHuda Quran Academy - Google Sheets Form Handler with Email Notification
 * 
 * Setup:
 * 1. Open sheet: https://docs.google.com/spreadsheets/d/1ik3_fUnApDt-bDjDKUhpjIZlr-MH3vbT5ttQSMHWl-Q/edit
 * 2. Extensions > Apps Script
 * 3. Is code ko paste karein aur save karein
 * 4. Deploy > New Deployment > Web App
 * 5. Execute as: Me, Who has access: Anyone
 * 6. URL copy karein aur index.html mein "YAHAN_APNA_NEW_WEB_APP_URL_DALEIN" ki jagah paste karein
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = e.parameter;

    const name = data['Full Name'] || '';
    const email = data['Email Address'] || '';
    const phone = data['Phone Number'] || '';
    const course = data['Course Interested In'] || '';
    const message = data['Message'] || '';
    const timestamp = new Date();

    // Data sheet mein save karo
    sheet.appendRow([name, email, phone, course, message, timestamp]);

    // Email notification bhejo
    const recipient = 'shahzaibzaman465@gmail.com';
    const subject = 'New Enrollment - AlHuda Quran Academy';
    const body = `
New student enrolled!

Full Name: ${name}
Email: ${email}
Phone: ${phone}
Course: ${course}
Message: ${message}
Timestamp: ${timestamp}
    `;

    MailApp.sendEmail(recipient, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'AlHuda Quran Academy Form Handler is active' }))
    .setMimeType(ContentService.MimeType.JSON);
}
