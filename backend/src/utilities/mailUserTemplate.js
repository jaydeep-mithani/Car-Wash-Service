const mailUserTemplate = (
      user,
      email,
      contact,
      carsNo,
      carNames,
      carModels,
      carYears,
      bodyStyle,
      slotTime,
      services,
      outlet,
      today
) =>
      `<!DOCTYPE html>
      <html lang="en">
            <head>
                  <meta charset="UTF-8" />
                  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Car wash</title>
                  <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
                        crossorigin="anonymous"
                        referrerpolicy="no-referrer"
                  />
                  <style>
                        a.logo {
                              text-decoration: none;
                              color: black;
                              font-size: x-large;
                              font-weight: 600;
                              margin: 10px;
                        }
                        body {
                              font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                        }
                        .container {
                              max-width: 600px;
                              margin: 50px auto 0;
                              background-color: rgb(245, 245, 245);
                              padding-top: 20px;
                              box-shadow: -8px 8px 15px 0px #00000022;
                        }
                        .content {
                              margin: 30px 20px 40px 40px;
                        }
                        .list {
                              margin: 30px 10px;
                        }
                        .f {
                              position: absolute;
                              top: 0;
                              background-color: #00ffff;
                              height: 1px;
                              width: 100%;
                        }
                        .foot {
                              position: relative;
                              background-color: #212529;
                              height: 50px;
                              display: flex;
                              align-items: center;
                        }
                        .links {
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              justify-content: flex-start;
                              gap: 12px;
                              padding-left: 20px;
                              color: #00ffff;
                        }
                        table {
                              text-align: left;
                        }
                  </style>
            </head>
            <body>
                  <div class="container">
                        <a href="#home" class="logo">
                              <span class="fs-2 fw-bold">Car-wash</span>
                        </a>
                        <div class="content">
                              <p>Hello ${user}!</p>
                              <p>Greetings from ______________ car washing service.</p>
                              <p>
                                    We have recorded your booking for car washing on date ${today} at
                                    ${slotTime}
                              </p>
                        </div>
                        <hr />
                        <div class="list">
                              <p>The details of your booking are as mentioned below:</p>
                              <table>
                                    <tbody>
                                          <tr>
                                                <th>Name</th>
                                                <th>:</th>
                                                <td>${user}</td>
                                          </tr>
                                          <tr>
                                                <th>Email</th>
                                                <th>:</th>
                                                <td>${email}</td>
                                          </tr>
                                          <tr>
                                                <th>Contact</th>
                                                <th>:</th>
                                                <td>${contact}</td>
                                          </tr>
                                          <tr>
                                                <th>Total Cars</th>
                                                <th>:</th>
                                                <td>${carsNo}</td>
                                          </tr>
                                          <tr>
                                                <th>Car Names:</th>
                                                <th>:</th>
                                                <td>${carNames}</td>
                                          </tr>
                                          <tr>
                                                <th>Car Models:</th>
                                                <th>:</th>
                                                <td>${carModels}</td>
                                          </tr>
                                          <tr>
                                                <th>Car Model Year:</th>
                                                <th>:</th>
                                                <td>${carYears}</td>
                                          </tr>
                                          <tr>
                                                <th>Car Body Styles</th>
                                                <th>:</th>
                                                <td>${bodyStyle}</td>
                                          </tr>
                                          <tr>
                                                <th>Time of Day</th>
                                                <th>:</th>
                                                <td>${slotTime}</td>
                                          </tr>
                                          <tr>
                                                <th>Services</th>
                                                <th>:</th>
                                                <td>${services}</td>
                                          </tr>
                                          <tr>
                                                <th>Exterior water outlet?</th>
                                                <th>:</th>
                                                <td>${outlet}</td>
                                          </tr>
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </body>
      </html>
      `;

module.exports = mailUserTemplate;
