GoogleSheetAPI_TUTORIAL

```
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
// Create an JWT client to authorize the API call
const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  scopes,
);

client.authorize((err, tokens) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected');
  }
});

async function gsrun(client) {
  const gsapi = google.sheets({ version: 'v4', auth: client });
  const opt = {
    spreadsheetId: '10gvHUWTPJ9-omNXBsFHvNn65xYTfJYNRoSm1efNOe4k',
    range: 'A2:B5',
  };

  const data = await gsapi.spreadsheets.values.get(opt);
  const records = data.data.values;
  return records;
}

async function gsadd(client, newData) {
  const gsapi = google.sheets({ version: 'v4', auth: client });

  const updateOptions = {
    spreadsheetId: '10gvHUWTPJ9-omNXBsFHvNn65xYTfJYNRoSm1efNOe4k',
    range: 'A:B',
    valueInputOption: 'USER_ENTERED',
    resource: { values: newData },
  };
  const res = await gsapi.spreadsheets.values.append(updateOptions);
  console.log(res);
}

/* To get data from Google Sheet use function gsrun(client) */

app.get('/../..', async (req, res) => {
  records = await gsrun(client);
  console.log(records);
  res.render('task2-partA', { items: records });
});

/* To Add data to Google Sheet use function gsadd(client) */

app.post('/.../.../...', async (req, res) => {
  const data = [[req.body.add_name, req.body.add_link]];
  await gsadd(client, data);

});
```
