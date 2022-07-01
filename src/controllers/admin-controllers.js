const {
  adminLoginSchema,
  adminSendForgetSchema,
  adminResetPasswordSchema,
  addAdminSchema,
} = require("../helpers/schema-validation");
const database = require("../config").promise();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const moment = require("moment");

module.exports.getAdmins = async (req, res) => {
  try {
    const GET_ADMINS = `SELECT * FROM admins`;
    let [ADMINS] = await database.execute(GET_ADMINS);

    res.status(200).send(ADMINS);
  } catch (error) {
    console.log("error : ", error);
    res.status(500).send("Internal service error");
  }
};

module.exports.getAdminById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const GET_ADMIN = `SELECT * FROM admins WHERE id = ?`;
    let [ADMIN] = await database.execute(GET_ADMIN, [id]);
    res.status(200).send(ADMIN[0]);
  } catch (error) {
    console.log("error : ", error);
    res.status(500).send("Internal service error");
  }
};

module.exports.getReportData = async (req, res) => {
  const pDate = req.body.date;
  const resp = {};

  const dbArgs = [
    pDate,
    moment(pDate).add(1, "days").format("YYYY-MM-DD"),
    "Approved",
  ];
  //   profit
  try {
    const queryProfit = `select SUM(ti.price-p.capital_price) as profit from transactions t
    join transaction_statuses ts on(t.id=ts.id)
    join transaction_items ti on(t.id=ti.transaction_id)
    join products p on(ti.product_id =p.id)
    where t.created_at>= ? and t.created_at < ?
    and ts.name = ?`;
    let [rowProfit] = await database.execute(queryProfit, dbArgs);
    console.log("rowProfit");
    console.log(rowProfit);

    if (rowProfit[0].profit === null) {
      rowProfit[0].profit = 0;
    }

    resp.profit = rowProfit[0].profit;

    //   total transactions
    const queryTotalTrn = `select count(t.id) as total_trn from transactions t 
    join transaction_statuses ts on(t.id=ts.id)
    where t.created_at>=? and t.created_at <?
    and ts.name =?; 
    `;
    let [totalTrnRow] = await database.execute(queryTotalTrn, dbArgs);
    console.log("totalTrnRow");
    console.log(totalTrnRow);

    if (totalTrnRow[0].total_trn === null) {
      totalTrnRow[0].total_trn = 0;
    }

    resp.total_transactions = totalTrnRow[0].total_trn;

    //   total transactions
    const queryTop3Product = `
        select SUM(ti.volume) as vol, p.name as product_name
        from transactions t 
        join transaction_statuses ts on(t.id=ts.id)
        join transaction_items ti on(t.id=ti.transaction_id)
        join products p on(p.id=ti.product_id)
        where t.created_at>=? and t.created_at < ?
        and ts.name =?
        group by ti.product_id order by vol desc limit 3; `;
    let [top3ProductRow] = await database.execute(queryTop3Product, dbArgs);
    console.log("top3ProductRow");
    console.log(top3ProductRow);

    resp.top_products = top3ProductRow;

    res.status(200).send(resp);
  } catch (error) {
    console.log("error : ", error);
    res.status(500).send("Internal service error");
  }
};

module.exports.addNewAdmin = async (req, res) => {
  const body = req.body;
  try {
    const { error } = addAdminSchema.validate(body);
    if (error) {
      return res.status(400).send(error.message);
    }

    //check if username already exists
    const GET_ADMIN = `SELECT * FROM admins WHERE username = ?`;
    let [ADMIN] = await database.execute(GET_ADMIN, [body.username]);
    if (ADMIN.length) {
      return res.status(400).send("Username already used");
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(body.password, salt);

    const ADD_ADMIN = `INSERT INTO admins(name, username, email, password) VALUES (?,?,?,?)`;
    await database.execute(ADD_ADMIN, [
      body.name,
      body.username,
      body.email,
      hashpassword,
    ]);

    res.status(201).send("Create Admin Success");
  } catch (error) {
    console.log("error : ", error);
    res.status(500).send("Internal service error");
  }
};

module.exports.login = async (req, res) => {
  const body = req.body;
  try {
    const { error } = adminLoginSchema.validate(body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const GET_ADMIN_BY_EMAIL = `SELECT * FROM admins WHERE email = ?`;
    const [ADMIN] = await database.execute(GET_ADMIN_BY_EMAIL, [body.email]);

    if (!ADMIN.length) {
      return res.status(404).send("Username or Password is inccorect");
    }

    const hashpassword = await bcrypt.compare(body.password, ADMIN[0].password);

    if (!hashpassword) {
      return res.status(404).send("Username or Password is inccorect");
    } else {
      delete ADMIN[0].password;
      res.status(200).send(ADMIN[0]);
    }
  } catch (error) {
    console.log("error : ", error);
    res.status(500).send("Internal service error");
  }
};

module.exports.sendForgetEmail = async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const { error } = adminSendForgetSchema.validate(body);
    if (error) {
      return res.status(400).send(error.message);
    }
    const email = body.email;

    const GET_ADMIN = `SELECT * FROM admins WHERE email = ?`;
    const [ADMIN] = await database.execute(GET_ADMIN, [email]);

    if (!ADMIN.length) {
      return res.status(404).send(`User not found.`);
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${email}`,
        pass: "nyxbegqqntyfvbob",
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: "<admin/> sevilenfilbert@gmail.com",
      to: `${email}`,
      subject: "Pharmacy Admin Forget Password",
      html: `
                <p>please verify your account using this link.</p>
                <p>link : <a href="http://localhost:3000/admin/reset-password/${ADMIN[0].id}">Verification Link</a></p>
                <p>NOTE : do not share this code.</p>
            `,
    });
    res
      .status(200)
      .send("An Forget Password Link Email has been sent to your email.");
  } catch (error) {
    console.log("error : ", error);
    res.status(500).send("Internal service error");
  }
};

module.exports.resetPassword = async (req, res) => {
  const body = req.body; //email, password
  try {
    console.log("test");
    const { error } = adminResetPasswordSchema.validate(body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(body.password, salt);

    const CHANGE_PASSWORD = `UPDATE admins SET password = ? WHERE id = ?`;
    const [INFO] = await database.execute(CHANGE_PASSWORD, [
      hashpassword,
      body.id,
    ]);

    res.status(200).send("Change Password Success");
  } catch (error) {
    console.log("error : ", error);
    res.status(500).send("Internal service error");
  }
};
